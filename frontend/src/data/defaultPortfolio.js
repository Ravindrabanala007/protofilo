export const PORTFOLIO_STORAGE_KEY = 'portfolio_data';
export const VISITOR_COUNT_KEY = 'portfolio_visit_count';
export const VISITOR_SESSION_KEY = 'portfolio_visit_session';

/** Resolve image: uploaded data > custom URL > assista folder path > fallback */
export const resolveAssetUrl = (imageData, imageUrl, assistaPath, fallback = '') => {
  if (imageData) return imageData;
  if (imageUrl) {
    // If it's a relative backend path like /assets/..., prepend backend URL
    if (imageUrl.startsWith('/assets/')) {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || '';
      return backendUrl ? `${backendUrl}${imageUrl}` : imageUrl;
    }
    return imageUrl;
  }
  if (assistaPath) return assistaPath;
  return fallback;
};

export const defaultPortfolioData = {
  settings: {
    resumeUrl: '/assista/Ravindra_resume.pdf',
    resumeLinkLabel: 'Download Resume',
    photoAssistaPath: '/assista/ravindra image.jpeg',
  },
  about: {
    imageUrl: '',
    imageData: '',
    summary: [
      'I am Ravindra Banala, a dedicated Full Stack Developer and React Developer. I have a deep passion for designing interfaces that engage users and scripting clean, scalable system structures in Django, Node, and Python.',
      'My education in computer science has given me a solid grasp of data structures, algorithms, databases, and network architectures. I love solving complex structural challenges and continuously exploring cutting-edge tech.',
    ],
    objective:
      'To build high-performance products by leveraging my technical skills in MERN/React stack development, Django APIs, and relational databases. I aim to apply my network engineering credentials to configure secure, optimal deployment topologies, contributing to impactful projects.',
  },
  projects: [
    {
      id: 'proj-1',
      title: 'AI-Powered Product Review System',
      description:
        'A machine learning based NLP application analyzing product feedback, extracting user sentiments, and visualizing scores through interactive graphs.',
      techStack: ['React.js', 'Django', 'Python', 'NLTK', 'Tailwind CSS'],
      githubUrl: 'https://github.com',
      liveDemoUrl: 'https://example.com',
      cardLetter: 'AI',
      featured: true,
      category: 'development',
      imageUrl: '',
      imageData: '',
      assistaPath: '',
    },
    {
      id: 'proj-2',
      title: 'Product Quality Review Platform',
      description:
        'MERN stack auditing application enabling managers to score, review, and track product quality metrics against organizational standards.',
      techStack: ['React.js', 'Node.js', 'Express', 'MongoDB', 'Chart.js'],
      githubUrl: 'https://github.com',
      liveDemoUrl: 'https://example.com',
      cardLetter: 'PQ',
      featured: true,
      category: 'development',
      imageUrl: '',
      imageData: '',
      assistaPath: '',
    },
    {
      id: 'proj-3',
      title: 'Secure Multi-Campus Network Design',
      description:
        'Designed a secure and redundant network topology linking three distinct campuses using Cisco Packet Tracer, VLANs, OSPF routing, and ACL lists.',
      techStack: ['Cisco Packet Tracer', 'Subnetting', 'OSPF Routing', 'VLAN', 'ACLs'],
      githubUrl: 'https://github.com',
      liveDemoUrl: 'https://example.com',
      cardLetter: 'SN',
      featured: false,
      category: 'networking',
      imageUrl: '',
      imageData: '',
      assistaPath: '',
    },
    {
      id: 'proj-4',
      title: 'Full Stack E-Commerce Application',
      description:
        'E-Commerce storefront including custom shopping cart, inventory management interface, and secure checkout simulation integrations.',
      techStack: ['React.js', 'Context API', 'Node.js', 'Express', 'Tailwind'],
      githubUrl: 'https://github.com',
      liveDemoUrl: 'https://example.com',
      cardLetter: 'EC',
      featured: true,
      category: 'development',
      imageUrl: '',
      imageData: '',
      assistaPath: '',
    },
  ],
  certifications: [
    {
      id: 'cert-1',
      name: 'Cisco Certified Network Associate (CCNA)',
      issuerOrg: 'Cisco Systems',
      date: '2025',
      badgeEmoji: '🛡️',
      themeColor: '#049fd9',
      skills: ['Networking', 'Routing', 'Security'],
      certificateLinkUrl: '',
      fileData: '',
    },
    {
      id: 'cert-2',
      name: 'Full Stack MERN Developer Certificate',
      issuerOrg: 'Udemy Academy',
      date: '2024',
      badgeEmoji: '🎓',
      themeColor: '#6366f1',
      skills: ['MERN', 'React', 'Node.js'],
      certificateLinkUrl: '/assets/certificate/MERN.pdf',
      fileData: '',
    },
    {
      id: 'cert-3',
      name: 'Python Programming & Django Mastery',
      issuerOrg: 'Meta Professional',
      date: '2024',
      badgeEmoji: '🐍',
      themeColor: '#3776ab',
      skills: ['Python', 'Django', 'APIs'],
      certificateLinkUrl: '',
      fileData: '',
    },
    {
      id: 'cert-4',
      name: 'AWS Certified Cloud Practitioner',
      issuerOrg: 'Amazon Web Services',
      date: '2025',
      badgeEmoji: '☁️',
      themeColor: '#ff9900',
      skills: ['AWS', 'Cloud', 'DevOps'],
      certificateLinkUrl: '',
      fileData: '',
    },
  ],
  education: [
    {
      id: 'edu-1',
      title: 'Bachelor of Technology in Computer Science',
      org: 'State University',
      timePeriod: '2022 - 2026',
      location: 'India',
      badge: 'CGPA: 8.9',
      description:
        'Specializing in Software Engineering and Network Topologies. Maintaining a top-tier CGPA. Core member of the programming society.',
    },
    {
      id: 'edu-2',
      title: 'Intermediate Education (MPC)',
      org: 'Junior College',
      timePeriod: '2020 - 2022',
      location: 'India',
      badge: 'Distinction',
      description:
        'Achieved academic distinction. Specialized in Mathematics, Physics, and Chemistry.',
    },
    {
      id: 'edu-3',
      title: 'Secondary School Certificate',
      org: 'High School',
      timePeriod: '2020',
      location: 'India',
      badge: 'Honors',
      description: 'Graduated with Honors. Recipient of multiple academic toppers awards.',
    },
  ],
  experience: [
    {
      id: 'exp-1',
      title: 'Web Development Intern',
      org: 'Innovate Tech Labs',
      timePeriod: 'May 2025 - July 2025',
      location: 'Remote',
      badge: 'Internship',
      description:
        'Built responsive client dashboard interfaces using React.js and Tailwind CSS, reducing layout load times by 20%. Collaborated with backend engineers to integrate Django REST APIs with MERN application databases.',
    },
    {
      id: 'exp-2',
      title: 'Frontend Developer Trainee',
      org: 'Nexus Software Solutions',
      timePeriod: 'Jan 2024 - Apr 2024',
      location: 'Hyderabad',
      badge: 'Trainee',
      description:
        'Assisted in scaffolding client landing pages, implementing clean semantic HTML and custom JavaScript animations. Created wireframes in Figma and successfully implemented them in production environments.',
    },
  ],
  achievements: {
    stats: [
      { id: 'stat-1', label: 'Academic Score', value: '97.45', suffix: '%', isFloat: true },
      { id: 'stat-2', label: 'LeetCode Solved', value: '300', suffix: '+', isFloat: false },
      { id: 'stat-3', label: 'Hackathons Won', value: '3', suffix: '', isFloat: false },
      { id: 'stat-4', label: 'Certifications', value: '10', suffix: '+', isFloat: false },
    ],
    highlights: [
      {
        id: 'hl-1',
        title: 'Smart Campus Hackathon Winner',
        subtitle: 'Nexus 2025',
        desc: 'Designed an automated student verification system utilizing face recognition APIs, securing first place among 45 participating collegiate developer groups.',
        imageUrl: '',
        imageData: '',
        assistaPath: '',
      },
      {
        id: 'hl-2',
        title: 'LeetCode & Competitive Coding Excellence',
        subtitle: 'LeetCode & HackerRank Profiles',
        desc: 'Solved over 300 algorithm problems. Earned a 5-star python programmer rating badge on HackerRank.',
        imageUrl: '',
        imageData: '',
        assistaPath: '',
      },
      {
        id: 'hl-3',
        title: 'Academic Honor Roll & Distinction',
        subtitle: 'University Rank Topper',
        desc: 'Achieved academic topper recognition with an overall percentage of 97.45%, representing highest academic ranking.',
        imageUrl: '',
        imageData: '',
        assistaPath: '',
      },
    ],
  },
  projectCategories: [
    { id: 'development', name: 'Development' },
    { id: 'networking', name: 'Networking' },
  ],
  skillCategories: [
    { id: 'frontend', name: 'Frontend' },
    { id: 'backend', name: 'Backend' },
    { id: 'databases', name: 'Databases' },
    { id: 'devops', name: 'DevOps' },
    { id: 'networking', name: 'Networking' },
  ],
  skills: [
    { id: 'skill-1', name: 'React.js', level: 92, category: 'frontend', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', imageData: '', assistaPath: '' },
    { id: 'skill-2', name: 'JavaScript (ES6+)', level: 90, category: 'frontend', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', imageData: '', assistaPath: '' },
    { id: 'skill-3', name: 'HTML5 & CSS3', level: 95, category: 'frontend', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', imageData: '', assistaPath: '' },
    { id: 'skill-4', name: 'Tailwind CSS', level: 90, category: 'frontend', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', imageData: '', assistaPath: '' },
    { id: 'skill-5', name: 'Python Programmer', level: 88, category: 'backend', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', imageData: '', assistaPath: '' },
    { id: 'skill-6', name: 'Django framework', level: 85, category: 'backend', imageUrl: 'https://cdn.simpleicons.org/django/092E20', imageData: '', assistaPath: '' },
    { id: 'skill-7', name: 'REST APIs development', level: 82, category: 'backend', imageUrl: 'https://cdn.simpleicons.org/fastapi/009688', imageData: '', assistaPath: '' },
    { id: 'skill-8', name: 'Node.js', level: 75, category: 'backend', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', imageData: '', assistaPath: '' },
    { id: 'skill-9', name: 'MongoDB', level: 80, category: 'databases', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', imageData: '', assistaPath: '' },
    { id: 'skill-10', name: 'MySQL', level: 85, category: 'databases', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', imageData: '', assistaPath: '' },
    { id: 'skill-11', name: 'Mongoose & SQL queries', level: 82, category: 'databases', imageUrl: 'https://cdn.simpleicons.org/postgresql/4169E1', imageData: '', assistaPath: '' },
    { id: 'skill-12', name: 'Git & Version Control', level: 88, category: 'devops', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', imageData: '', assistaPath: '' },
    { id: 'skill-13', name: 'Docker Containers', level: 75, category: 'devops', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', imageData: '', assistaPath: '' },
    { id: 'skill-14', name: 'Vercel & Netlify Deployment', level: 85, category: 'devops', imageUrl: 'https://cdn.simpleicons.org/vercel/000000', imageData: '', assistaPath: '' },
    { id: 'skill-15', name: 'Cisco Packet Tracer (Topology)', level: 90, category: 'networking', imageUrl: 'https://cdn.simpleicons.org/cisco/049FD9', imageData: '', assistaPath: '' },
    { id: 'skill-16', name: 'Routing & Switching protocols', level: 85, category: 'networking', imageUrl: 'https://cdn.simpleicons.org/cisco/049FD9', imageData: '', assistaPath: '' },
    { id: 'skill-17', name: 'Network Security Principles', level: 78, category: 'networking', imageUrl: 'https://cdn.simpleicons.org/cisco/049FD9', imageData: '', assistaPath: '' },
  ],
};

export const loadPortfolioData = () => {
  try {
    const stored = localStorage.getItem(PORTFOLIO_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return deepMerge(defaultPortfolioData, parsed);
    }
  } catch {
    /* use defaults */
  }
  return JSON.parse(JSON.stringify(defaultPortfolioData));
};

const deepMerge = (base, override) => {
  const result = { ...base };
  for (const key of Object.keys(override)) {
    if (
      override[key] &&
      typeof override[key] === 'object' &&
      !Array.isArray(override[key]) &&
      base[key] &&
      typeof base[key] === 'object' &&
      !Array.isArray(base[key])
    ) {
      result[key] = deepMerge(base[key], override[key]);
    } else {
      result[key] = override[key];
    }
  }
  return result;
};

export const savePortfolioData = (data) => {
  localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(data));
};

export const resetPortfolioData = () => {
  localStorage.removeItem(PORTFOLIO_STORAGE_KEY);
  return JSON.parse(JSON.stringify(defaultPortfolioData));
};

export const generateId = (prefix) =>
  `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

export const getVisitorCount = () => {
  const count = parseInt(localStorage.getItem(VISITOR_COUNT_KEY) || '0', 10);
  return Number.isNaN(count) ? 0 : count;
};

/** Increment once per browser session when visiting the public site */
export const trackVisit = () => {
  if (sessionStorage.getItem(VISITOR_SESSION_KEY)) return getVisitorCount();
  sessionStorage.setItem(VISITOR_SESSION_KEY, '1');
  const next = getVisitorCount() + 1;
  localStorage.setItem(VISITOR_COUNT_KEY, String(next));
  return next;
};
