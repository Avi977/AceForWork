// Global counter service with local-first approach and periodic cloud sync
const JSONBIN_BIN_ID = process.env.REACT_APP_JSONBIN_BIN_ID;
const JSONBIN_URL = `https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}`;
const API_KEY = process.env.REACT_APP_JSONBIN_API_KEY;
const SYNC_INTERVAL = 5000; // 5 seconds
const REFRESH_INTERVAL = 10000; // 10 seconds - refresh from cloud
const LOCAL_STORAGE_KEY = 'aceClickCounter';
const PENDING_SYNC_KEY = 'aceClickCounterPendingSync';

interface CounterData {
  count: number;
  lastUpdated: string;
}

type SyncStatus = 'synced' | 'syncing' | 'pending' | 'error';

class CounterService {
  private syncInterval: NodeJS.Timeout | null = null;
  private refreshInterval: NodeJS.Timeout | null = null;
  private syncStatus: SyncStatus = 'synced';
  private statusCallbacks: Set<(status: SyncStatus) => void> = new Set();
  private countCallbacks: Set<(count: number) => void> = new Set();

  constructor() {
    this.startPeriodicSync();
    this.startPeriodicRefresh();
  }

  // Get current local count (instant)
  getLocalCount(): number {
    const localCount = localStorage.getItem(LOCAL_STORAGE_KEY);
    return localCount ? parseInt(localCount, 10) : 0;
  }

  // Increment count locally (instant)
  incrementLocalCount(): number {
    const currentCount = this.getLocalCount();
    const newCount = currentCount + 1;

    // Store immediately in localStorage
    localStorage.setItem(LOCAL_STORAGE_KEY, newCount.toString());

    // Mark as needing sync
    localStorage.setItem(PENDING_SYNC_KEY, 'true');
    this.updateSyncStatus('pending');

    return newCount;
  }

  // Get count from cloud (for initial load)
  async getCloudCount(): Promise<number | null> {
    // Skip cloud operations if environment variables are missing
    if (!API_KEY || !JSONBIN_BIN_ID) {
      console.warn('JSONBin credentials not configured - running in local-only mode');
      return null;
    }

    try {
      const response = await fetch(JSONBIN_URL, {
        method: 'GET',
        headers: {
          'X-Master-Key': API_KEY,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        return data.record?.count || 0;
      }
    } catch (error) {
      console.warn('Failed to fetch cloud count:', error);
    }
    return null;
  }

  // Create a new bin if current one is unauthorized
  async createNewBin(): Promise<string | null> {
    // Skip if credentials are missing
    if (!API_KEY) {
      console.warn('API key not configured - cannot create new bin');
      return null;
    }

    try {
      const response = await fetch('https://api.jsonbin.io/v3/b', {
        method: 'POST',
        headers: {
          'X-Master-Key': API_KEY,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          count: 0,
          lastUpdated: new Date().toISOString()
        })
      });

      if (response.ok) {
        const data = await response.json();
        return data.metadata.id;
      }
    } catch (error) {
      console.error('Failed to create new bin:', error);
    }
    return null;
  }

  // Initialize counter (merges cloud and local)
  async initializeCounter(): Promise<number> {
    const localCount = this.getLocalCount();
    const cloudCount = await this.getCloudCount();

    if (cloudCount !== null && cloudCount > localCount) {
      // Cloud has higher count, use that
      localStorage.setItem(LOCAL_STORAGE_KEY, cloudCount.toString());
      return cloudCount;
    }

    // Use local count (either higher or cloud failed)
    if (cloudCount !== null && localCount > cloudCount) {
      // Local is higher, mark for sync
      localStorage.setItem(PENDING_SYNC_KEY, 'true');
      this.updateSyncStatus('pending');
    }

    return localCount;
  }

  // Sync local count to cloud
  private async syncToCloud(): Promise<boolean> {
    const pendingSync = localStorage.getItem(PENDING_SYNC_KEY);
    if (pendingSync !== 'true') {
      this.updateSyncStatus('synced');
      return true;
    }

    // Skip cloud sync if credentials are missing
    if (!API_KEY || !JSONBIN_BIN_ID) {
      localStorage.removeItem(PENDING_SYNC_KEY);
      this.updateSyncStatus('synced'); // Consider it "synced" in local-only mode
      return true;
    }

    this.updateSyncStatus('syncing');

    try {
      const localCount = this.getLocalCount();
      const updateData: CounterData = {
        count: localCount,
        lastUpdated: new Date().toISOString()
      };

      const response = await fetch(JSONBIN_URL, {
        method: 'PUT',
        headers: {
          'X-Master-Key': API_KEY,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
      });

      if (response.ok) {
        localStorage.removeItem(PENDING_SYNC_KEY);
        this.updateSyncStatus('synced');
        return true;
      }
    } catch (error) {
      console.warn('Failed to sync to cloud:', error);
    }

    this.updateSyncStatus('error');
    return false;
  }

  // Start periodic sync
  private startPeriodicSync(): void {
    if (this.syncInterval) return;

    this.syncInterval = setInterval(() => {
      this.syncToCloud();
    }, SYNC_INTERVAL);
  }

  // Start periodic refresh from cloud
  private startPeriodicRefresh(): void {
    if (this.refreshInterval) return;

    this.refreshInterval = setInterval(async () => {
      await this.refreshFromCloud();
    }, REFRESH_INTERVAL);
  }

  // Refresh count from cloud (updates local if cloud is higher)
  private async refreshFromCloud(): Promise<void> {
    const cloudCount = await this.getCloudCount();
    if (cloudCount !== null) {
      const localCount = this.getLocalCount();
      if (cloudCount > localCount) {
        // Update local storage with higher cloud count
        localStorage.setItem(LOCAL_STORAGE_KEY, cloudCount.toString());
        // Notify listeners about the count change
        this.countCallbacks.forEach(callback => callback(cloudCount));
      }
    }
  }

  // Stop periodic operations
  stopSync(): void {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
      this.syncInterval = null;
    }
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
      this.refreshInterval = null;
    }
  }

  // Sync status management
  private updateSyncStatus(status: SyncStatus): void {
    this.syncStatus = status;
    this.statusCallbacks.forEach(callback => callback(status));
  }

  getSyncStatus(): SyncStatus {
    return this.syncStatus;
  }

  onSyncStatusChange(callback: (status: SyncStatus) => void): () => void {
    this.statusCallbacks.add(callback);
    return () => this.statusCallbacks.delete(callback);
  }

  // Subscribe to count changes (from cloud refreshes)
  onCountChange(callback: (count: number) => void): () => void {
    this.countCallbacks.add(callback);
    return () => this.countCallbacks.delete(callback);
  }

  // Force immediate sync
  async forcSync(): Promise<boolean> {
    return await this.syncToCloud();
  }

  // Force immediate refresh
  async forceRefresh(): Promise<void> {
    await this.refreshFromCloud();
  }
}

export const counterService = new CounterService();