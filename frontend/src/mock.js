// Mock data for P M Gowrav Ganapathy's Portfolio

export const portfolioData = {
  personal: {
    fullName: "P M Gowrav Ganapathy",
    title: "UI/UX Designer & Computer Science Student",
    tagline: "UI/UX-focused Computer Science student with a passion for crafting clean, user-centered interfaces",
    email: "parlakotigowrav@gmail.com",
    phone: "8618002667",
    location: "Mangaluru, Karnataka",
    bio: "I'm a passionate UI/UX designer and Computer Science student (CGPA: 9.31) with expertise in crafting clean, user-centered interfaces. Skilled in Figma, HTML, CSS, Python, and JavaScript, I specialize in designing responsive, accessible, and visually engaging web experiences. My approach combines technical knowledge with creative design thinking to deliver impactful digital products.",
    resumeUrl: "Professional_Resume.pdf",
    education: {
      degree: "BE in Computer Science and Engineering",
      cgpa: "9.31",
      college: "St Joseph Engineering College, Mangaluru",
      duration: "2022-Present",
      previousEducation: "PUC (PCMC) - 95% | St Michael's Composite PU College, Madikeri (2020-2022)"
    }
  },
  
  socialLinks: [
  { 
    name: "LinkedIn", 
    url: "https://www.linkedin.com/in/gowrav-ganapathy", 
    icon: "Linkedin",
    image: "linedin.png"   // 👈 add logo image
  },
  { 
    name: "Instagram", 
    url: "https://www.instagram.com/parlakoti_gowrav?igsh=djVsanRiYXZsNzRm", 
    icon: "Instagram",
    image: "instagram.png"  // 👈 add logo image
  },
  { 
    name: "GitHub", 
    url: "https://github.com/PMGowravGanapathy", 
    icon: "Github",
    image: "github.png"     // 👈 add logo image
  }
],


  
  skills: [
    // Design Skills
    { name: "Figma", level: 95, category: "design" },
    { name: "UI/UX Design", level: 90, category: "design" },
    { name: "Prototyping", level: 88, category: "design" },
    { name: "Responsive Design", level: 85, category: "design" },
    
    // Research Skills
    { name: "User Research", level: 80, category: "research" },
    { name: "Wireframing", level: 90, category: "research" },
    
    // Development Skills - Frontend
    { name: "HTML", level: 85, category: "development" },
    { name: "CSS", level: 85, category: "development" },
    { name: "Bootstrap", level: 80, category: "development" },
    { name: "JavaScript", level: 75, category: "development" },
    { name: "React.js", level: 70, category: "development" },
    
    // Development Skills - Backend
    { name: "Node.js", level: 65, category: "development" },
    { name: "Python", level: 80, category: "development" },
    { name: "Java", level: 75, category: "development" },
    
    // Tools
    { name: "VS Code", level: 90, category: "tools" },
    { name: "Android Studio", level: 70, category: "tools" },
    { name: "Canva", level: 85, category: "tools" },
    { name: "TensorFlow", level: 65, category: "tools" }
  ],
  
  services: [
    {
      title: "UX Research & Strategy",
      description: "User interviews, personas, journey mapping, and strategic design planning",
      color: "mid-purple",
      icon: "Search"
    },
    {
      title: "UI Design",
      description: "Interface design, design systems, and visual identity creation",
      color: "mid-blue",
      icon: "Palette"
    },
    {
      title: "Prototyping",
      description: "Interactive prototypes, usability testing, and design validation",
      color: "light-yellow",
      icon: "Layout"
    },
    {
      title: "Design Systems",
      description: "Component libraries, style guides, and scalable design frameworks",
      color: "mid-orange",
      icon: "Components"
    }
  ],
  
  projects: [
    {
      id: 1,
      title: "Grocery App UI/UX Design",
      description: "Comprehensive grocery app design in Figma with product browsing, cart management, secure payment, and delivery tracking. Features interactive prototypes for complete user flow simulation.",
      category: ["Mobile Design", "UX Research", "Figma", "E-commerce"],
      bgColor: "light-pink",
      textColor: "black",
      image: "grocerry app.png",
      duration: "2025",
      role: "UI/UX Designer",
      tech: "Figma, Prototyping",
      link: "#",
      featured: true
    },
    {
      id: 2,
      title: "Arecanut Disease Detection App",
      description: "ML-powered mobile app using MobileNetV2 to classify arecanut crop diseases. Designed user-friendly interface in Figma for farmers to get real-time disease detection and management advice.",
      category: ["Machine Learning", "Mobile Design", "Agricultural Tech"],
      bgColor: "mid-green",
      textColor: "white",
      image: "arecabhandu.png",
      duration: "2025-Present",
      role: "ML Developer & UI Designer",
      tech: "Python, TensorFlow, MobileNetV2, OpenCV, Figma",
      link: "#",
      featured: true
    },
    {
      id: 3,
      title: "Torq Company Website",
      description: "Led design team at Experimind Labs to create high-fidelity website prototypes for client company Torq. Developed responsive interfaces using React and Next.js.",
      category: ["Web Design", "Team Leadership", "Client Project"],
      bgColor: "mid-blue",
      textColor: "white",
      image: "torq.png",
      duration: "June-July 2025",
      role: "Team Lead & UI/UX Designer",
      tech: "Figma, React, Next.js, Node.js, JavaScript, MongoDB",
      link: "#",
      featured: true
    },
    {
      id: 4,
      title: "Restaurant Menu UI/UX Design",
      description: "An intuitive and visually appealing restaurant menu app designed in Figma. Features include interactive dish browsing, category-based filtering, nutritional details, and seamless ordering flow with a focus on enhancing user dining experiences.",
      category: ["Mobile Design", "UX Research", "Figma", "E-commerce"],
      bgColor: "light-pink",
      textColor: "black",
      image: "menu.png",
      duration: "2025",
      role: "UI/UX Designer",
      tech: "Figma, Prototyping",
      link: "#",
      featured: false
    },
    {
      id: 5,
      title: "Skin Care Homepage UI/UX Design",
      description: "A modern and elegant skin care product homepage designed in Figma. Focuses on clean layouts, soothing color schemes, and user-friendly navigation. Features product highlights, testimonials, and a smooth shopping flow to enhance user trust and engagement.",
      category: ["Web Design", "UI/UX", "Figma", "E-commerce"],
      bgColor: "light-yellow",
      textColor: "black",
      image: "skincare.png",
      duration: "2025",
      role: "UI/UX Designer",
      tech: "Figma, Prototyping, Wireframing",
      link: "#",
      featured: false
    }
  ],
  
  experience: [
    {
      title: "Team Lead & UI/UX Designer",
      company: "Experimind Labs",
      duration: "June 2025 - July 2025",
      type: "Internship",
      description: [
        "Led a design team in creating high-fidelity website prototypes in Figma for client company Torq",
        "Developed responsive interfaces using React, Next.js, JavaScript, and MongoDB",
        "Refined UI/UX through iterative design feedback and delivered polished, client-ready web solutions",
        "Coordinated cross-functional team collaboration and project timelines"
      ],
      technologies: ["Figma", "React", "Next.js", "Node.js", "JavaScript", "MongoDB"],
      icon: "Code",
      featured: true
    },
    {
      title: "Naval NCC Wing Leadership",
      company: "National Cadet Corps (NCC)",
      duration: "2020 - 2024",
      type: "Leadership & Training",
      description: [
        "Served as Senior Cadet with the rank of Leading Cadet (LC)",
        "Completed NCC 'A', 'B' and 'C' certificates with distinction",
        "Developed leadership, teamwork, and discipline through naval training",
        "Participated in parades, camps, and national-level leadership programs"
      ],
      technologies: ["Leadership", "Teamwork", "Discipline", "Time Management"],
      icon: "Award",
      featured: true
    },
    {
      title: "Volunteer - TEDx SJEC Creative Team",
      company: "TEDx St Joseph Engineering College",
      duration: "2024",
      type: "Volunteer Work",
      description: [
        "Worked with the creative team to design digital posters and event branding",
        "Collaborated with cross-functional volunteers to ensure cohesive event design",
        "Contributed to stage design and audience experience enhancements"
      ],
      technologies: ["Canva", "Figma", "Teamwork"],
      icon: "Users",
      featured: false
    }
  ],

  achievements: [
    {
      title: "Academic Excellence",
      description: "Maintaining CGPA of 9.31 in Computer Science and Engineering",
      category: "Academic",
      icon: "GraduationCap",
      year: "2022-Present"
    },
    {
      title: "NCC 'C' Certificate",
      description: "Completed NCC 'C' certificate with distinction",
      category: "Leadership",
      icon: "Award",
      year: "2024"
    },
    {
      title: "TEDx Volunteer Recognition",
      description: "Recognized for contributions to TEDx SJEC event design",
      category: "Volunteer Work",
      icon: "Heart",
      year: "2024"
    }
  ]
};

// Form submission mock handler
export const mockFormSubmit = (formData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Form submitted:', formData);
      resolve({ success: true, message: 'Thank you! Your message has been sent successfully.' });
    }, 1000);
  });
};

// Resume download handler
export const mockResumeDownload = () => {
  const resumeUrl = "Professional_Resume.pdf"; // Update with the actual resume URL
  
  const link = document.createElement('a');
  link.href = resumeUrl;
  link.download = 'P_M_Gowrav_Ganapathy_Resume.pdf';
  link.target = '_blank';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};