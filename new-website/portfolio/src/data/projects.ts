import { Project } from '../types';

export const projects: Project[] = [
  {
    id: '1',
    title: 'Monke OS',
    year: '2025',
    description: 'An Operating System built from scratch. Partnered with a fellow bright mind and made this painfully difficult operating system from the ground up.',
    technologies: ['C', 'Assembly', 'Operating Systems', 'Low-level Programming'],
    githubUrl: 'https://github.com/Avi977/MonkeOS',
    image: '/assets/python.webp'
  },
  {
    id: '2',
    title: 'Nimbus Notes (MESAU Hackathon 2.0 Winner)',
    year: '2024',
    description: 'Built a full-stack AI-powered cloud study-buddy with a team, allowing student groups to generate a master summary, flashcards, and a tailored quiz from collective handwritten and digital notes.',
    technologies: ['React', 'Node.js', 'AWS S3', 'IAM', 'GPT-4', 'Docker', 'GitHub Actions'],
    githubUrl: 'https://github.com/Avi977/nimbus-notes',
    demoUrl: 'https://nimbus-notes-demo.com',
    image: '/assets/Kivy_logo.png',
    featured: true
  },
  {
    id: '3',
    title: 'Type-test',
    year: '2024',
    description: 'Designed and built a typing speed tester. Uses real-time input from user to accurately calculate WPM. Includes a GUI. Helped me get to 90WPM!',
    technologies: ['Python', 'GUI', 'Real-time Processing', 'Performance Metrics'],
    githubUrl: 'https://github.com/Avi977/type-test',
    demoUrl: 'https://type-test-demo.com',
    image: '/assets/fire.png'
  },
  {
    id: '4',
    title: 'Baymax: AI Healthcare Assistant',
    year: '2024',
    description: 'AI-powered virtual healthcare assistant with medical Q&A and voice recognition. Collaborated virtually with teammates in Texas and Sydney using Git version control.',
    technologies: ['Python', 'PyTorch', 'OpenAI API', 'NVIDIA Newton', 'Voice Recognition', 'Medical AI'],
    githubUrl: 'https://github.com/Avi977/baymax-healthcare',
    image: '/assets/mysql.png'
  },
  {
    id: '5',
    title: 'Odyssey',
    year: '2024',
    description: 'Dynamic AI adventure game based on Greek mythology. Engineered a narrative-driven adventure game with OpenAI LLM, LangChain RAG, and Astra Cassandra Vector DB for context-aware storytelling.',
    technologies: ['Python', 'OpenAI LLM', 'LangChain', 'Cassandra Vector DB', 'Kubernetes', 'RAG'],
    githubUrl: 'https://github.com/Avi977/odyssey-game',
    image: '/assets/langchain.png',
    featured: true
  }
];