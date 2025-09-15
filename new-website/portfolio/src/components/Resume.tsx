import React from 'react';
import { useNavigate } from 'react-router-dom';

const Resume: React.FC = () => {
  const navigate = useNavigate();

  const handleDownloadPDF = () => {
    const link = document.createElement('a');
    link.href = '/assets/Ace_Maharjan_Resume.pdf';
    link.download = 'Ace_Maharjan_Resume.pdf';
    link.click();
  };

  const handleBackToPortfolio = () => {
    navigate('/');
  };

  const projects = [
    {
      title: "Nimbus Notes (MESAU Hackathon 2.0 Winner)",
      subtitle: "Full-Stack AI-Powered Cloud Study-Buddy",
      points: [
        "Built a full-stack AI-powered cloud study-buddy with a team, allowing student groups to generate a master summary, flashcards, and a tailored quiz from collective handwritten and digital notes.",
        "Integrated AWS (S3, IAM) and GPT 4.1 min for cloud storage and AI integration.",
        "Implemented GitHub Actions CI/CD pipelines with Docker to automate testing and deployments."
      ]
    },
    {
      title: "Baymax: AI Healthcare Assistant",
      subtitle: "AI-powered virtual healthcare assistant with medical Q&A and voice recognition.",
      points: [
        "Collaborated virtually with teammates in Texas and Sydney using Git version control, with validation support from a medical student in Texas.",
        "Integrating with NVIDIA Newton's GPU-accelerated physics simulation to prototype assistive behaviors (e.g., navigation, item hand-offs) before transferring to a physical robot.",
        "Powered by PyTorch and OpenAI APIs for medical Q&A and voice recognition."
      ]
    },
    {
      title: "Odyssey",
      subtitle: "Dynamic AI adventure game based on Greek mythology.",
      points: [
        "Engineered a narrative-driven adventure game with OpenAI LLM, LangChain RAG, and Astra Cassandra Vector DB for context-aware storytelling.",
        "Implemented semantic search pipelines to dynamically adapt story branches, improving narrative coherence and replayability.",
        "Deployed on Kubernetes to enable scalable multi-user collaboration and testing across environments."
      ]
    }
  ];

  const experience = [
    {
      title: "ChatGPT Ambassador (Inaugural Pilot Cohort)",
      company: "OpenAI",
      period: "08/2025 - Present",
      location: "Hayward, CA",
      points: [
        "Selected as one of the first ambassadors across the CSU system to lead AI adoption in education.",
        "Organized and hosted student-focused events showcasing innovative applications of ChatGPT for learning and collaboration.",
        "Shared tips, use cases, and best practices with peers while collaborating with OpenAI and fellow ambassadors across campuses."
      ]
    },
    {
      title: "Senior Staff",
      company: "Student Leadership and Involvement Center",
      period: "08/2025 - Present",
      location: "California State University East Bay, Hayward, CA",
      points: [
        "Hired, trained, and mentored 20 student leaders supporting approximately 1,000 incoming students, strengthening onboarding experiences and fostering teamwork across campus organizations.",
        "Partnered with student government, clubs, and departments to coordinate campus-wide initiatives, increasing student engagement by 70% and demonstrating leadership in execution."
      ]
    },
    {
      title: "Learning Assistant - Data Structures & Algorithms",
      company: "STEM LAB",
      period: "01/2024 - Present",
      location: "California State University East Bay, Hayward, CA",
      points: [
        "Provided support and mentorship to 30+ students per semester, focusing on driving results through clear communication",
        "Guided problem-solving, coding assignments, and mathematical reasoning"
      ]
    }
  ];

  const skills = [
    "AWS", "Cassandra", "Data Structures", "Django", "Docker", "Git", "GitHub",
    "GIT Version Control", "IAM", "Java", "JavaScript", "Kubernetes", "Leadership",
    "Pandas", "Python", "PyTorch", "React", "S3", "SQL", "Tableau", "TensorFlow",
    "TypeScript", "GitHub Actions", "Node.js", "Express.js", "Machine Learning", "Scikit-learn"
  ];

  const achievements = [
    {
      title: "Leadership and Training",
      description: "Recruited and trained 20 student leaders to prepare organizing events for 1000+ students",
      icon: "👥"
    },
    {
      title: "Hackathon Winner",
      description: "Won MESAU Hackathon 2.0 with an AI-powered Cloud study-buddy with over 120 students and 30 teams",
      icon: "🏆"
    },
    {
      title: "Effective Tutoring",
      description: "Assisted over 30 students per semester in mastering data structures and algorithms",
      icon: "📚"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-800">
      {/* Navigation Header */}
      <nav className="liquid-glass sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <button
              onClick={handleBackToPortfolio}
              className="inline-flex items-center text-secondary hover:text-secondary/80 font-semibold transition-colors duration-300"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Portfolio
            </button>
            <h1 className="text-2xl font-heading font-bold text-white">Resume</h1>
            <div className="w-32"></div> {/* Spacer for centering */}
          </div>
        </div>
      </nav>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="liquid-glass-card overflow-hidden mb-8 animate-on-scroll">
          <div className="liquid-glass p-8">
            <div className="text-center text-white">
              <h1 className="text-4xl sm:text-5xl font-heading font-bold mb-4">
                ACE (ABHILEKH) MAHARJAN
              </h1>
              <p className="text-xl sm:text-2xl mb-6 opacity-95">
                Senior Staff | Student Leadership | AI Development | Full-Stack Development
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm sm:text-base">
                <span>📞 +15108813380</span>
                <span>✉️ ace.maharjan@csueastbay.edu</span>
                <span>🔗 linkedin.com/in/acemzn/</span>
                <span>🌐 aceforwork.com</span>
                <span>📍 San Ramon, CA, 94582</span>
              </div>
            </div>
          </div>

          {/* Download Button */}
          <div className="p-6 border-b">
            <div className="text-center">
              <button
                onClick={handleDownloadPDF}
                className="inline-flex items-center px-6 py-3 liquid-glass-btn font-semibold"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-4-4m4 4l4-4m-4-4V3" />
                </svg>
                Download PDF Resume
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-6">
            {/* Summary */}
            <div className="liquid-glass-card p-6">
              <h2 className="text-2xl font-heading font-bold text-white mb-4 flex items-center">
                <span className="w-8 h-8 bg-secondary/10 text-secondary rounded-lg flex items-center justify-center mr-3 text-lg">
                  📋
                </span>
                Summary
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Software engineer with strong AI/ML and data science skills, experienced in building scalable
                full-stack systems and award-winning AI applications using Python, PyTorch, TensorFlow, AWS,
                Docker, and Kubernetes. Proven leader with experience in team building, mentorship, and
                cross-functional collaboration.
              </p>
            </div>

            {/* Education */}
            <div className="liquid-glass-card p-6">
              <h2 className="text-2xl font-heading font-bold text-white mb-4 flex items-center">
                <span className="w-8 h-8 bg-secondary/10 text-secondary rounded-lg flex items-center justify-center mr-3 text-lg">
                  🎓
                </span>
                Education
              </h2>
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-white">Bachelors in Computer Science</h3>
                <p className="text-secondary font-medium">California State University East Bay</p>
                <div className="text-sm text-gray-300 space-y-1">
                  <p>📅 08/2023 - Present | Expected: December 2026</p>
                  <p>📍 Hayward, California</p>
                  <p className="font-semibold text-secondary">🏅 GPA 3.76, Dean's List (All Terms)</p>
                </div>
              </div>
            </div>

            {/* Key Achievements */}
            <div className="liquid-glass-card p-6">
              <h2 className="text-2xl font-heading font-bold text-white mb-4 flex items-center">
                <span className="w-8 h-8 bg-secondary/10 text-secondary rounded-lg flex items-center justify-center mr-3 text-lg">
                  ⭐
                </span>
                Key Achievements
              </h2>
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="border-l-4 border-primary pl-4">
                    <div className="flex items-start space-x-3">
                      <span className="text-2xl">{achievement.icon}</span>
                      <div>
                        <h3 className="font-semibold text-white">{achievement.title}</h3>
                        <p className="text-sm text-gray-300 mt-1">{achievement.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="liquid-glass-card p-6">
              <h2 className="text-2xl font-heading font-bold text-white mb-4 flex items-center">
                <span className="w-8 h-8 bg-secondary/10 text-secondary rounded-lg flex items-center justify-center mr-3 text-lg">
                  ⚡
                </span>
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 liquid-glass text-gray-300 rounded-full text-sm font-medium hover:bg-secondary/10 hover:text-secondary transition-colors duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Experience */}
            <div className="liquid-glass-card p-6">
              <h2 className="text-2xl font-heading font-bold text-white mb-6 flex items-center">
                <span className="w-8 h-8 bg-secondary/10 text-secondary rounded-lg flex items-center justify-center mr-3 text-lg">
                  💼
                </span>
                Experience
              </h2>
              <div className="space-y-6">
                {experience.map((exp, index) => (
                  <div key={index} className="border-l-4 border-primary pl-6 relative">
                    <div className="absolute -left-2 top-0 w-4 h-4 bg-primary rounded-full"></div>
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold text-white">{exp.title}</h3>
                      <p className="text-secondary font-medium">{exp.company}</p>
                      <p className="text-sm text-gray-300">{exp.period} | {exp.location}</p>
                    </div>
                    <ul className="space-y-2">
                      {exp.points.map((point, pointIndex) => (
                        <li key={pointIndex} className="text-gray-300 text-sm leading-relaxed flex items-start">
                          <span className="text-secondary mr-2 mt-1 flex-shrink-0">•</span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Projects */}
            <div className="liquid-glass-card p-6">
              <h2 className="text-2xl font-heading font-bold text-white mb-6 flex items-center">
                <span className="w-8 h-8 bg-secondary/10 text-secondary rounded-lg flex items-center justify-center mr-3 text-lg">
                  🚀
                </span>
                Projects
              </h2>
              <div className="space-y-6">
                {projects.map((project, index) => (
                  <div key={index} className="border-l-4 border-secondary pl-6 relative">
                    <div className="absolute -left-2 top-0 w-4 h-4 bg-secondary rounded-full"></div>
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                      <p className="text-secondary font-medium italic">{project.subtitle}</p>
                    </div>
                    <ul className="space-y-2">
                      {project.points.map((point, pointIndex) => (
                        <li key={pointIndex} className="text-gray-300 text-sm leading-relaxed flex items-start">
                          <span className="text-secondary mr-2 mt-1 flex-shrink-0">•</span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>
    </div>
  );
};

export default Resume;