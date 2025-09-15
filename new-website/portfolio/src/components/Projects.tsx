import React, { useState } from 'react';
import { projects } from '../data/projects';

const Projects: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'featured'>('all');
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const filteredProjects = filter === 'featured'
    ? projects.filter(project => project.featured)
    : projects;

  const openProjectModal = (projectId: string) => {
    setSelectedProject(projectId);
    document.body.style.overflow = 'hidden';
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'unset';
  };

  const selectedProjectData = projects.find(p => p.id === selectedProject);

  return (
    <section id="projects" className="py-20 bg-gradient-to-b from-gray-800 via-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-4">
            My Projects
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            A collection of projects that showcase my journey through different technologies and challenges
          </p>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center mb-12 animate-on-scroll">
          <div className="liquid-glass p-1 inline-flex">
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-2 font-medium transition-all duration-300 ${
                filter === 'all'
                  ? 'liquid-glass-btn'
                  : 'liquid-glass-btn-outline'
              }`}
            >
              All Projects ({projects.length})
            </button>
            <button
              onClick={() => setFilter('featured')}
              className={`px-6 py-2 font-medium transition-all duration-300 ${
                filter === 'featured'
                  ? 'liquid-glass-btn'
                  : 'liquid-glass-btn-outline'
              }`}
            >
              Featured ({projects.filter(p => p.featured).length})
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-on-scroll">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group liquid-glass-card overflow-hidden"
            >
              {/* Project Image */}
              <div className="relative h-48 bg-gradient-to-br from-primary to-secondary overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-6xl">
                    {project.title === 'Monke OS' && '🐵'}
                    {project.title.includes('Nimbus Notes') && '☁️'}
                    {project.title === 'Type-test' && '⚡'}
                    {project.title.includes('Baymax') && '🏥'}
                    {project.title === 'Odyssey' && '⚔️'}
                  </span>
                </div>
                {project.featured && (
                  <div className="absolute top-4 right-4 bg-secondary text-white px-3 py-1 rounded-full text-sm font-medium">
                    Featured
                  </div>
                )}
              </div>

              {/* Project Content */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-white group-hover:text-secondary transition-colors duration-300">
                    {project.title}
                  </h3>
                  <span className="text-sm text-secondary font-medium bg-secondary/10 px-2 py-1 rounded">
                    {project.year}
                  </span>
                </div>

                <p className="text-gray-300 mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="liquid-glass text-gray-300 px-2 py-1 text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="liquid-glass text-gray-300 px-2 py-1 text-xs font-medium">
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button
                    onClick={() => openProjectModal(project.id)}
                    className="flex-1 liquid-glass-btn font-medium py-2 px-4"
                  >
                    View Details
                  </button>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="liquid-glass-btn-outline font-medium py-2 px-4 text-center flex items-center justify-center"
                    title="View on GitHub"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Project Modal */}
        {selectedProject && selectedProjectData && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {selectedProjectData.title}
                    </h3>
                    <span className="text-secondary font-medium">
                      {selectedProjectData.year}
                    </span>
                  </div>
                  <button
                    onClick={closeProjectModal}
                    className="text-gray-400 hover:text-gray-600 p-2"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  {selectedProjectData.description}
                </p>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProjectData.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-4">
                  <a
                    href={selectedProjectData.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 liquid-glass-btn font-medium py-3 px-6 text-center"
                  >
                    View on GitHub
                  </a>
                  {selectedProjectData.demoUrl && (
                    <a
                      href={selectedProjectData.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 liquid-glass-btn-outline font-medium py-3 px-6 text-center"
                    >
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;