
import React, { useState, useEffect, useRef } from 'react';
import emailjs from "@emailjs/browser"; // ✅ correct package


import { portfolioData, mockFormSubmit, mockResumeDownload } from '../mock';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faInstagram, faGithub, faTwitter, faBehance, faDribbble } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhone, faMapMarkerAlt, faDownload, faExternalLinkAlt, faBars, faTimes, faCode, faAward, faUsers, faGraduationCap, faHeart, faSearch, faPalette, faLayerGroup, faPuzzlePiece, faMedal } from "@fortawesome/free-solid-svg-icons";

const Portfolio = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [visibleProjects, setVisibleProjects] = useState(6);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [toasts, setToasts] = useState([]);

  const sectionRefs = {
    about: useRef(null),
    skills: useRef(null),
    portfolio: useRef(null),
    contact: useRef(null),
    experience: useRef(null)
  };

  // Toast functionality
  const showToast = (title, description, variant = 'default') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, title, description, variant }]);
    
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 3000);
  };

  // Scroll animations and section tracking
  useEffect(() => {
    const handleScroll = () => {
      // Fade-in elements on scroll
      const elements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
      elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.85 && rect.bottom > 0) {
          el.style.opacity = '1';
          el.style.transform = 'translate(0)';
        }
      });

      // Section tracking for active navigation
      const scrollPosition = window.scrollY + 100;
      
      // Find which section is currently in view
      Object.entries(sectionRefs).forEach(([section, ref]) => {
        if (ref.current) {
          const sectionTop = ref.current.offsetTop;
          const sectionHeight = ref.current.offsetHeight;
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveSection(section);
          }
        }
      });

      // Back to top button
      const backToTop = document.querySelector('.back-to-top');
      if (backToTop) {
        if (window.scrollY > 500) {
          backToTop.classList.add('show');
        } else {
          backToTop.classList.remove('show');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    // Initialize typing animation for hero section
    const typingElements = document.querySelectorAll('.typing-animation');
    typingElements.forEach(el => {
      const text = el.textContent;
      el.textContent = '';
      let i = 0;
      
      const typeWriter = () => {
        if (i < text.length) {
          el.textContent += text.charAt(i);
          i++;
          setTimeout(typeWriter, 50);
        }
      };
      
      // Start typing after a short delay
      setTimeout(typeWriter, 200);
    });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

const handleFormSubmit = (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  const serviceId = "service_aixp4jm";      // 👈 your real service ID
  const templateId = "template_dsfrseo";    // 👈 your real template ID
  const publicKey = "W_g8xgkNLhgZITS77";    // 👈 your real public key

  const templateParams = {
    from_name: formData.name,
    from_email: formData.email,
    to_name: "gowrav",       // or whatever you set in template
    message: formData.message,
    reply_to: formData.email,
  };

  emailjs
    .send(serviceId, templateId, templateParams, publicKey)
    .then(() => {
      showToast("Message Sent!", "I'll reply soon.");
      setFormData({ name: "", email: "", message: "" });
    })
    .catch((error) => {
      console.error("EmailJS Error:", error);
      showToast("Error", "Message failed. Try again.", "destructive");
    })
    .finally(() => {
      setIsSubmitting(false);
    });
};



  const handleResumeDownload = () => {
    mockResumeDownload();
    showToast("Resume Downloaded!", "Your resume download has started.");
  };

  const getSkillsByCategory = (category) => {
    return portfolioData.skills.filter(skill => skill.category === category);
  };

  // Scroll to section function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
    setMobileMenuOpen(false);
  };

  // Social media icon mapping
  const getSocialIcon = (name) => {
    switch (name.toLowerCase()) {
      case 'linkedin':
        return <FontAwesomeIcon icon={faLinkedin} className="w-5 h-5" />;
      case 'instagram':
        return <FontAwesomeIcon icon={faInstagram} className="w-5 h-5" />;
      case 'github':
        return <FontAwesomeIcon icon={faGithub} className="w-5 h-5" />;
      case 'twitter':
        return <FontAwesomeIcon icon={faTwitter} className="w-5 h-5" />;
      case 'behance':
        return <FontAwesomeIcon icon={faBehance} className="w-5 h-5" />;
      case 'dribbble':
        return <FontAwesomeIcon icon={faDribbble} className="w-5 h-5" />;
      default:
        return <FontAwesomeIcon icon={faExternalLinkAlt} className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold gradient-text">
              {portfolioData.personal.fullName.split(' ')[0]}
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {['about', 'skills', 'portfolio', 'experience', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`nav-link font-medium ${activeSection === item ? 'text-purple-600' : 'text-gray-600 hover:text-purple-600'}`}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <FontAwesomeIcon icon={faTimes} className="w-6 h-6" />
              ) : (
                <FontAwesomeIcon icon={faBars} className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 space-y-4 pb-4">
              {['about', 'skills', 'portfolio', 'experience', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`block w-full text-left py-2 font-medium ${activeSection === item ? 'text-purple-600' : 'text-gray-600'}`}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="floating-shapes">
          <div className="shape-1 animate-blob animation-delay-2000"></div>
          <div className="shape-2 animate-blob animation-delay-3000"></div>
          <div className="shape-3 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 fade-in-up">
              Hi, I'm{' '}
              <span className="gradient-text typing-animation">
                {portfolioData.personal.fullName}
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 fade-in-up animation-delay-2000">
              {portfolioData.personal.title}
            </p>
            
            <p className="text-lg text-gray-500 mb-12 fade-in-up animation-delay-3000">
              {portfolioData.personal.tagline}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center fade-in-up animation-delay-4000">
            <a
  href="/Professional Resume.pdf"
  download="My_Resume.pdf"
  className="creative-btn px-8 py-4 rounded-full text-white font-semibold flex items-center justify-center gap-2"
>
  <FontAwesomeIcon icon={faDownload} className="w-5 h-5" />
  Download Resume
</a>

              
              <button
                onClick={() => scrollToSection('contact')}
                className="creative-btn-outline px-8 py-4 rounded-full font-semibold"
              >
                Get In Touch
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" ref={sectionRefs.about} className="section-creative section-bg-1">
        <div className="container mx-auto">
          <h2 className="section-title fade-in-up">About Me</h2>
          <p className="section-subtitle fade-in-up animation-delay-2000">
            Get to know more about my background, education, and passion for design
          </p>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="fade-in-left">
              <div className="creative-card p-8">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6">
                  <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-purple-300 shadow-lg">
                    <img 
                      src={portfolioData.personal.profileImage || "mypic.jpg"} 
                      alt={portfolioData.personal.fullName}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl font-bold mb-2 gradient-text">Background</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {portfolioData.personal.bio}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={faEnvelope} className="w-5 h-5 text-purple-600 mr-3" />
                    <span className="text-gray-600">{portfolioData.personal.email}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={faPhone} className="w-5 h-5 text-purple-600 mr-3" />
                    <span className="text-gray-600">{portfolioData.personal.phone}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="w-5 h-5 text-purple-600 mr-3" />
                    <span className="text-gray-600">{portfolioData.personal.location}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="fade-in-right">
              <div className="creative-card p-8">
                <h3 className="text-2xl font-bold mb-4 gradient-text">Education</h3>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-lg">{portfolioData.personal.education.degree}</h4>
                  <p className="text-gray-600">{portfolioData.personal.education.college}</p>
                  <p className="text-purple-600 font-medium">CGPA: {portfolioData.personal.education.cgpa}</p>
                  <p className="text-sm text-gray-500">{portfolioData.personal.education.duration}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-lg">Pre-University Education</h4>
                  <p className="text-gray-600">{portfolioData.personal.education.previousEducation}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" ref={sectionRefs.skills} className="section-creative">
        <div className="container mx-auto">
          <h2 className="section-title fade-in-up">Skills & Expertise</h2>
          <p className="section-subtitle fade-in-up animation-delay-2000">
            My technical skills and design expertise that help bring ideas to life
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {['design', 'research', 'development', 'tools'].map((category, index) => (
              <div 
                key={category} 
                className={`fade-in-up animation-delay-${(index + 1) * 200}`}
              >
                <div className="creative-card p-6 h-full skill-category-card">
                  <div className="skill-category-icon mb-4">
                    {category === 'design' && <FontAwesomeIcon icon={faPalette} className="w-8 h-8 text-purple-600" />}
                    {category === 'research' && <FontAwesomeIcon icon={faSearch} className="w-8 h-8 text-purple-600" />}
                    {category === 'development' && <FontAwesomeIcon icon={faCode} className="w-8 h-8 text-purple-600" />}
                    {category === 'tools' && <FontAwesomeIcon icon={faPuzzlePiece} className="w-8 h-8 text-purple-600" />}
                  </div>
                  
                  <h3 className="text-xl font-bold mb-4 gradient-text capitalize">
                    {category}
                  </h3>
                  
                  <div className="space-y-4">
                    {getSkillsByCategory(category).map((skill) => (
                      <div key={skill.name} className="skill-item">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">{skill.name}</span>
                          <span className="text-sm text-gray-500">{skill.level}%</span>
                        </div>
                        <div className="skill-bar">
                          <div 
                            className="skill-progress" 
                            style={{ width: `${skill.level}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section
        id="portfolio"
        ref={sectionRefs.portfolio}
        className="section-creative section-bg-2"
      >
        <div className="container mx-auto">
          <h2 className="section-title fade-in-up">My Portfolio</h2>
          <p className="section-subtitle fade-in-up animation-delay-2000">
            A collection of my recent projects and design work
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioData.projects.slice(0, visibleProjects).map((project, index) => (
              <div
                key={project.id}
                className={`fade-in-up animation-delay-${(index % 3) * 200}`}
              >
                <div className="project-card creative-card overflow-hidden group">
                  <div className="project-card-inner">
                    <div className="relative overflow-hidden">
                      {/* Project Image */}
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={project.title}
                          className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div
                          className={`h-48 bg-portfolio-${project.bgColor} flex items-center justify-center`}
                        >
                          <div className="text-4xl font-bold text-portfolio-black">
                            {project.title.split(" ")[0].charAt(0)}
                          </div>
                        </div>
                      )}

                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.category.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">
                            {project.duration}
                          </span>
                          
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {visibleProjects < portfolioData.projects.length && (
            <div className="text-center mt-12 fade-in-up">
              <button
                onClick={() => setVisibleProjects((prev) => prev + 3)}
                className="creative-btn-outline px-8 py-3 rounded-full font-semibold"
              >
                Load More Projects
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" ref={sectionRefs.experience} className="section-creative">
        <div className="container mx-auto">
          <h2 className="section-title fade-in-up">Experience & Achievements</h2>
          <p className="section-subtitle fade-in-up animation-delay-2000">
            My professional journey and notable accomplishments
          </p>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* Experience */}
            <div className="fade-in-left">
              <h3 className="text-2xl font-bold mb-8 gradient-text">Work Experience</h3>
              
              <div className="space-y-8">
                {portfolioData.experience.map((exp, index) => (
                  <div key={index} className="timeline-item">
                    <div className="timeline-dot"></div>
                    
                    <div className="creative-card p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="font-bold text-lg">{exp.title}</h4>
                          <p className="text-purple-600 font-medium">{exp.company}</p>
                        </div>
                        <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">
                          {exp.type}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-500 mb-4">{exp.duration}</p>
                      
                      <ul className="space-y-2 mb-4">
                        {exp.description.map((item, i) => (
                          <li key={i} className="flex items-start">
                            <FontAwesomeIcon icon={faMedal} className="w-4 h-4 text-purple-600 mt-1 mr-2 flex-shrink-0" />
                            <span className="text-gray-600">{item}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <span 
                            key={tech} 
                            className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Achievements */}
            <div className="fade-in-right">
              <h3 className="text-2xl font-bold mb-8 gradient-text">Achievements</h3>
              
              <div className="space-y-6">
                {portfolioData.achievements.map((achievement, index) => (
                  <div key={index} className="creative-card p-6">
                    <div className="flex items-start mb-4">
                      <div className="p-3 bg-purple-100 rounded-lg mr-4">
                        <FontAwesomeIcon icon={faAward} className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">{achievement.title}</h4>
                        <p className="text-purple-600 text-sm">{achievement.category}</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-3">{achievement.description}</p>
                    <p className="text-sm text-gray-500">{achievement.year}</p>
                  </div>
                ))}
                
                {/* NCC Achievements Section */}
                <div className="creative-card p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-500">
                  <div className="flex items-start mb-4">
                    <div className="p-3 bg-blue-100 rounded-lg mr-4">
                      <FontAwesomeIcon icon={faMedal} className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">NCC Certificates & Achievements</h4>
                      <p className="text-blue-600 text-sm">National Cadet Corps</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-semibold">Certificates Earned:</h5>
                      <ul className="list-disc list-inside text-gray-600 ml-4">
                        <li>NCC 'A' Certificate</li>
                        <li>NCC 'B' Certificate</li>
                        <li>NCC 'C' Certificate</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="font-semibold">Rank Achieved:</h5>
                      <p className="text-gray-600">Leading Cadet (Naval Wing)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" ref={sectionRefs.contact} className="section-creative section-bg-1">
        <div className="container mx-auto">
          <h2 className="section-title fade-in-up">Get In Touch</h2>
          <p className="section-subtitle fade-in-up animation-delay-2000">
            Ready to start your next project? Let's talk about how I can help
          </p>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="fade-in-left">
              <div className="creative-card p-8">
                <h3 className="text-2xl font-bold mb-6 gradient-text">Contact Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className="p-3 bg-purple-100 rounded-lg mr-4">
                      <FontAwesomeIcon icon={faEnvelope} className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Email</h4>
                      <p className="text-gray-600">{portfolioData.personal.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="p-3 bg-purple-100 rounded-lg mr-4">
                      <FontAwesomeIcon icon={faPhone} className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Phone</h4>
                      <p className="text-gray-600">{portfolioData.personal.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="p-3 bg-purple-100 rounded-lg mr-4">
                      <FontAwesomeIcon icon={faMapMarkerAlt} className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Location</h4>
                      <p className="text-gray-600">{portfolioData.personal.location}</p>
                    </div>
                  </div>
                  
                  <div className="pt-6">
                    <h4 className="font-semibold mb-4">Connect with me</h4>
                    <div className="flex space-x-4">
                      {portfolioData.socialLinks.map((social, index) => (
                        <a
                          key={index}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-gray-100 rounded-lg hover:bg-purple-100 transition-colors"
                          aria-label={social.name}
                        >
                          {getSocialIcon(social.name)}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="fade-in-right">
              <div className="creative-card p-8">
                <h3 className="text-2xl font-bold mb-6 gradient-text">Send a Message</h3>
                
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleFormChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                      placeholder="Tell me about your project..."
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full creative-btn py-4 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="text-2xl font-bold mb-4 gradient-text">
              {portfolioData.personal.fullName}
            </div>
            
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              {portfolioData.personal.tagline}
            </p>
            
            <div className="flex justify-center space-x-6 mb-8">
              {portfolioData.socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-800 rounded-lg hover:bg-purple-600 transition-colors"
                  aria-label={social.name}
                >
                  {getSocialIcon(social.name)}
                </a>
              ))}
            </div>
            
            <div className="border-t border-gray-800 pt-8">
              <p className="text-gray-400">
                © {new Date().getFullYear()} {portfolioData.personal.fullName}. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <button
        className="back-to-top fixed bottom-8 right-8 p-3 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 transition-all opacity-0"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
        </svg>
      </button>

      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`p-4 rounded-lg shadow-lg border transform transition-all duration-300 ease-in-out ${
              toast.variant === 'destructive'
                ? 'bg-red-100 border-red-200 text-red-800'
                : 'bg-green-100 border-green-200 text-green-800'
            }`}
          >
            <div className="font-semibold">{toast.title}</div>
            <div className="text-sm">{toast.description}</div>
          </div>
        ))}
      </div>

      {/* CSS Styles */}
      <style >{`
        /* Global Styles */
        .gradient-text {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .creative-btn {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          transition: all 0.3s ease;
        }
        
        .creative-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
        }
        
        .creative-btn-outline {
          border: 2px solid #667eea;
          color: #667eea;
          transition: all 0.3s ease;
        }
        
        .creative-btn-outline:hover {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          transform: translateY(-2px);
        }
        
        /* Section Styles */
        .section-creative {
          padding: 5rem 1rem;
        }
        
        .section-bg-1 {
          background: linear-gradient(to bottom right, #f7fafc, #edf2f7);
        }
        
        .section-bg-2 {
          background: linear-gradient(to bottom right, #ffffff, #f8fafc);
        }
        
        .section-title {
          font-size: 2.5rem;
          font-weight: bold;
          text-align: center;
          margin-bottom: 1rem;
          color: #2d3748;
        }
        
        .section-subtitle {
          font-size: 1.125rem;
          text-align: center;
          color: #718096;
          margin-bottom: 3rem;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
        }
        
        /* Card Styles */
        .creative-card {
          background: white;
          border-radius: 1rem;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
        }
        
        .creative-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
        }
        
        /* Animation Classes */
        .fade-in-up {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .fade-in-left {
          opacity: 0;
          transform: translateX(-20px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .fade-in-right {
          opacity: 0;
          transform: translateX(20px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .animation-delay-200 {
          transition-delay: 0.2s;
        }
        
        .animation-delay-400 {
          transition-delay: 0.4s;
        }
        
        .animation-delay-600 {
          transition-delay: 0.6s;
        }
        
        .animation-delay-800 {
          transition-delay: 0.8s;
        }
        
        .animation-delay-1000 {
          transition-delay: 1s;
        }
        
        .animation-delay-2000 {
          transition-delay: 2s;
        }
        
        .animation-delay-3000 {
          transition-delay: 3s;
        }
        
        .animation-delay-4000 {
          transition-delay: 4s;
        }
        
        /* Skill Bars */
        .skill-bar {
          height: 8px;
          background-color: #e2e8f0;
          border-radius: 4px;
          overflow: hidden;
        }
        
        .skill-progress {
          height: 100%;
          background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
          border-radius: 4px;
          transition: width 1s ease-in-out;
        }
        
        /* Floating Shapes */
        .floating-shapes {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: 0;
        }
        
        .shape-1, .shape-2, .shape-3 {
          position: absolute;
          border-radius: 50%;        .shape-1 {
          width: 300px;
          height: 300px;
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
          top: 10%;
          left: 5%;
        }
        
        .shape-2 {
          width: 200px;
          height: 200px;
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 100%);
          bottom: 20%;
          right: 10%;
        }
        
        .shape-3 {
          width: 150px;
          height: 150px;
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
          top: 40%;
          right: 20%;
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-3000 {
          animation-delay: 3s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        
        /* Project Card Styles */
        .project-card {
          position: relative;
          overflow: hidden;
          height: 100%;
        }
        
        .project-card-inner {
          transition: transform 0.3s ease;
        }
        
        .project-card:hover .project-card-inner {
          transform: translateY(-5px);
        }
        
        /* Timeline Styles */
        .timeline-item {
          position: relative;
          padding-left: 2rem;
        }
        
        .timeline-item:before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 2px;
          background: linear-gradient(to bottom, #667eea, #764ba2);
        }
        
        .timeline-dot {
          position: absolute;
          left: -6px;
          top: 1rem;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #667eea;
          z-index: 1;
        }
        
        /* Skill Category Cards */
        .skill-category-card {
          text-align: center;
        }
        
        .skill-category-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: rgba(102, 126, 234, 0.1);
        }
        
        /* Back to Top Button */
        .back-to-top {
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
        }
        
        .back-to-top.show {
          opacity: 1;
          visibility: visible;
        }
        
        /* Line clamp utility */
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        /* Portfolio background colors */
        .bg-portfolio-blue { background-color: #EBF5FF; }
        .bg-portfolio-green { background-color: #E6FFFA; }
        .bg-portfolio-purple { background-color: #FAF5FF; }
        .bg-portfolio-yellow { background-color: #FFFBEB; }
        .bg-portfolio-pink { background-color: #FFF5F7; }
        .text-portfolio-black { color: #2D3748; }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
          .section-creative {
            padding: 3rem 1rem;
          }
          
          .section-title {
            font-size: 2rem;
          }
          
          .shape-1, .shape-2, .shape-3 {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default Portfolio;