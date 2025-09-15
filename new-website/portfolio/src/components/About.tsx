import React, { useState, useEffect } from 'react';

const About: React.FC = () => {
  const [imageSrc, setImageSrc] = useState<string>('');
  const [hoverImageSrc, setHoverImageSrc] = useState<string>('');
  const [isHovered, setIsHovered] = useState<boolean>(false);

  useEffect(() => {
    // Try different file extensions for 'self' and 'self_hover' images
    const imageExtensions = ['png', 'jpg', 'jpeg', 'webp', 'gif', 'bmp', 'svg'];

    const findImages = () => {
      // Find main image
      const tryNextImage = (index: number) => {
        if (index >= imageExtensions.length) {
          setImageSrc(''); // No image found
          return;
        }

        const img = new Image();
        const imagePath = `/images/self.${imageExtensions[index]}`;

        img.onload = () => {
          setImageSrc(imagePath);
          // After finding main image, try to find hover image
          findHoverImage();
        };

        img.onerror = () => {
          tryNextImage(index + 1);
        };

        img.src = imagePath;
      };

      // Find hover image
      const findHoverImage = () => {
        const tryNextHoverImage = (index: number) => {
          if (index >= imageExtensions.length) {
            setHoverImageSrc(''); // No hover image found
            return;
          }

          const img = new Image();
          const imagePath = `/images/self_hover.${imageExtensions[index]}`;

          img.onload = () => {
            setHoverImageSrc(imagePath);
          };

          img.onerror = () => {
            tryNextHoverImage(index + 1);
          };

          img.src = imagePath;
        };

        tryNextHoverImage(0);
      };

      tryNextImage(0);
    };

    findImages();
  }, []);

  const skills = [
    { category: 'Languages', items: ['Python', 'JavaScript', 'TypeScript', 'Java', 'SQL'] },
    { category: 'Frameworks', items: ['React', 'Node.js', 'Express.js', 'Django', 'PyTorch', 'TensorFlow'] },
    { category: 'Cloud & DevOps', items: ['AWS', 'Docker', 'Kubernetes', 'GitHub Actions', 'S3', 'IAM'] },
    { category: 'AI/ML & Data', items: ['Machine Learning', 'Scikit-learn', 'LangChain', 'Pandas', 'Tableau'] }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-black via-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 animate-on-scroll">
          <h2 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-4">
            About Me
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-start lg:items-center animate-on-scroll">
          {/* Profile Photo */}
          <div className="flex justify-center lg:justify-end order-1 lg:order-none mb-8 lg:mb-0">
            <div
              className="relative group"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Gradient Border */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-secondary rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>

              {/* Photo Container */}
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80 rounded-full overflow-hidden bg-white p-2">
                {imageSrc ? (
                  <div className="relative w-full h-full">
                    {/* Main Image */}
                    <img
                      src={imageSrc}
                      alt="Abhilekh 'Ace' Maharjan"
                      className={`absolute inset-0 w-full h-full object-cover rounded-full transform group-hover:scale-105 transition-all duration-500 ${
                        isHovered && hoverImageSrc ? 'opacity-0' : 'opacity-100'
                      }`}
                      onError={() => setImageSrc('')}
                    />

                    {/* Hover Image */}
                    {hoverImageSrc && (
                      <img
                        src={hoverImageSrc}
                        alt="Abhilekh 'Ace' Maharjan - Hover"
                        className={`absolute inset-0 w-full h-full object-cover rounded-full transform group-hover:scale-105 transition-all duration-500 ${
                          isHovered ? 'opacity-100' : 'opacity-0'
                        }`}
                        onError={() => setHoverImageSrc('')}
                      />
                    )}
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 rounded-full">
                    <div className="text-center text-gray-500 p-8">
                      <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.1 3.89 23 5 23H19C20.1 23 21 22.1 21 21V9M12 7C14.21 7 16 8.79 16 11V12.5L19 15.5V21H5V15.5L8 12.5V11C8 8.79 9.79 7 12 7Z"/>
                      </svg>
                      <p className="text-sm font-medium">Add 'self' image</p>
                      <p className="text-xs opacity-70 mt-1">Any format supported</p>
                    </div>
                  </div>
                )}

                {/* Floating Elements */}
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full animate-bounce opacity-80"></div>
                <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-secondary rounded-full animate-pulse opacity-60"></div>
                <div className="absolute top-1/4 -left-4 w-4 h-4 bg-secondary rounded-full animate-ping opacity-40"></div>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-6 order-2 lg:order-none">
            <div className="space-y-4 text-lg text-gray-300 leading-relaxed">
              <p>
                Hi there! I'm <span className="text-secondary font-semibold">Abhilekh "Ace" Maharjan</span>,
                a Computer Science student at Cal State East Bay with a <span className="text-secondary font-semibold">3.76 GPA</span>
                and <span className="text-secondary font-semibold">Dean's List honors</span> every term.
              </p>

              <p>
                As an <span className="text-secondary font-semibold">OpenAI ChatGPT Ambassador</span> and
                <span className="text-secondary font-semibold"> MESAU Hackathon 2.0 Winner</span>, I'm passionate about
                building AI-powered solutions that make a real impact. I've led teams to victory in hackathons and
                currently mentor <span className="text-secondary font-semibold">20+ student leaders</span> supporting
                over 1,000 incoming students.
              </p>

              <p>
                My expertise spans full-stack development, AI/ML engineering, and cloud technologies. From building
                award-winning AI healthcare assistants to deploying scalable applications on Kubernetes, I combine
                technical excellence with proven leadership to create innovative solutions.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <div className="bg-secondary/10 text-secondary px-4 py-2 rounded-full font-medium">
                🤖 OpenAI Ambassador
              </div>
              <div className="bg-secondary/10 text-secondary px-4 py-2 rounded-full font-medium">
                🏆 Hackathon Winner
              </div>
              <div className="bg-secondary/10 text-secondary px-4 py-2 rounded-full font-medium">
                👥 Student Leader
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center px-6 py-3 liquid-glass-btn font-semibold"
              >
                Check out my Projects
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
              <button
                onClick={() => window.open('/resume', '_blank')}
                className="inline-flex items-center px-6 py-3 liquid-glass-btn-outline font-semibold"
              >
                View Full Resume
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Technical Skills Section */}
        <div className="mt-16 animate-on-scroll">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-heading font-bold text-white">
              Technical Skills
            </h3>
            <div className="w-16 h-1 bg-primary mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {skills.map((skillGroup) => (
              <div
                key={skillGroup.category}
                className="liquid-glass-card p-6"
              >
                <h4 className="text-lg font-semibold text-white mb-4 text-center">
                  {skillGroup.category}
                </h4>
                <div className="space-y-2">
                  {skillGroup.items.map((skill) => (
                    <div
                      key={skill}
                      className="liquid-glass px-3 py-2 text-sm font-medium text-center text-gray-300 hover:text-white"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[
            { number: '20+', label: 'Students Mentored', icon: '👥' },
            { number: '3.76', label: 'GPA (Dean\'s List)', icon: '🎓' },
            { number: '1000+', label: 'Students Impacted', icon: '🚀' }
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 liquid-glass-card"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold text-secondary mb-2">{stat.number}</div>
              <div className="text-gray-300 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;