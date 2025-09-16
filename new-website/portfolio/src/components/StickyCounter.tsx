import React, { useEffect, useState } from 'react';
import { counterService } from '../services/counterService';
import ScrollingDigits from './ScrollingDigits';

type SyncStatus = 'synced' | 'syncing' | 'pending' | 'error';

const StickyCounter: React.FC = () => {
  const [clickCount, setClickCount] = useState(0);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('synced');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCountUpdated, setIsCountUpdated] = useState(false);

  // Initialize counter and sync status
  useEffect(() => {
    const initializeCounter = async () => {
      try {
        // Initialize with merged cloud/local data
        const initialCount = await counterService.initializeCounter();
        setClickCount(initialCount);
      } catch (error) {
        console.error('Failed to initialize counter:', error);
        // Fallback to local count
        setClickCount(counterService.getLocalCount());
      }
    };

    // Subscribe to sync status changes
    const unsubscribeStatus = counterService.onSyncStatusChange((status) => {
      setSyncStatus(status);
    });

    // Subscribe to count changes (from cloud refreshes)
    const unsubscribeCount = counterService.onCountChange((count) => {
      // Trigger animation when count is updated from cloud
      setIsCountUpdated(true);
      setClickCount(count);

      // Reset animation flag after animation completes
      setTimeout(() => setIsCountUpdated(false), 1000);
    });

    initializeCounter();

    // Cleanup on unmount
    return () => {
      unsubscribeStatus();
      unsubscribeCount();
    };
  }, []);

  // Handle click counter with instant local storage
  const handleCounterClick = () => {
    // Instant local update
    const newCount = counterService.incrementLocalCount();
    setClickCount(newCount);
    // Cloud sync happens automatically in background
  };

  // Get status color and icon
  const getStatusIndicator = () => {
    switch (syncStatus) {
      case 'synced':
        return <div className="w-2 h-2 bg-green-400 rounded-full"></div>;
      case 'syncing':
        return <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>;
      case 'pending':
        return <div className="w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>;
      case 'error':
        return <div className="w-2 h-2 bg-red-400 rounded-full"></div>;
      default:
        return <div className="w-2 h-2 bg-gray-400 rounded-full"></div>;
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div
        className="relative transition-all duration-300"
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        {/* Glass Button */}
        <button
          onClick={handleCounterClick}
          className={`
            group relative overflow-hidden rounded-lg transition-all duration-300
            px-4 py-3

            /* Glass effect similar to other buttons */
            bg-white/5 backdrop-blur-sm border border-white/10
            shadow-lg hover:shadow-xl

            /* Glass shine effect */
            before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:via-transparent before:to-transparent
            before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300

            /* Hover effects */
            hover:bg-white/10 hover:border-white/20 hover:scale-105 active:scale-95

            /* Animation when updated from API */
            ${isCountUpdated ? 'ring-2 ring-blue-400/50 ring-offset-1 ring-offset-transparent bg-blue-500/20' : ''}

            /* Animation */
            transform transition-all duration-300 ease-out
          `}
        >
          {/* Content */}
          <div className="relative flex items-center gap-2 text-white font-medium">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
            </svg>
            <ScrollingDigits
              value={clickCount}
              duration={800}
              className="text-sm"
            />
            {getStatusIndicator()}
          </div>
        </button>

        {/* Tooltip on hover */}
        {isExpanded && (
          <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-black/80 text-white text-xs rounded-lg whitespace-nowrap backdrop-blur-sm">
            Global Clicks • {syncStatus === 'synced' ? 'Synced' : syncStatus === 'syncing' ? 'Syncing...' : syncStatus === 'pending' ? 'Pending' : 'Error'}
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/80"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StickyCounter;