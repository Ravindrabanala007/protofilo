/**
 * Seed Script — Pushes all default portfolio data into separate MongoDB collections.
 *
 * Usage:  node config/seed.js
 *
 * This will:
 * 1. Clear existing data in all portfolio collections
 * 2. Insert default projects, skills, certifications, education, experience, achievements
 * 3. Insert default skill & project categories
 * 4. Insert default settings & about
 */
import 'dotenv/config';
import mongoose from 'mongoose';
import Project from '../models/Project.js';
import Skill from '../models/Skill.js';
import Certification from '../models/Certification.js';
import Education from '../models/Education.js';
import ExperienceItem from '../models/ExperienceItem.js';
import Achievement from '../models/Achievement.js';
import Settings from '../models/Settings.js';
import Category from '../models/Category.js';

import dns from 'node:dns';

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const MONGODB_URI = process.env.MONGODB_URI;



const defaultSettings = {
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
};

const defaultProjects = [
  {
    title: 'AI-Powered Product Review System',
    description: 'A machine learning based NLP application analyzing product feedback, extracting user sentiments, and visualizing scores through interactive graphs.',
    techStack: ['React.js', 'Django', 'Python', 'NLTK', 'Tailwind CSS'],
    githubUrl: 'https://github.com',
    liveDemoUrl: 'https://example.com',
    cardLetter: 'AI',
    featured: true,
    category: 'development',
  },
  {
    title: 'Product Quality Review Platform',
    description: 'MERN stack auditing application enabling managers to score, review, and track product quality metrics against organizational standards.',
    techStack: ['React.js', 'Node.js', 'Express', 'MongoDB', 'Chart.js'],
    githubUrl: 'https://github.com',
    liveDemoUrl: 'https://example.com',
    cardLetter: 'PQ',
    featured: true,
    category: 'development',
  },
  {
    title: 'Secure Multi-Campus Network Design',
    description: 'Designed a secure and redundant network topology linking three distinct campuses using Cisco Packet Tracer, VLANs, OSPF routing, and ACL lists.',
    techStack: ['Cisco Packet Tracer', 'Subnetting', 'OSPF Routing', 'VLAN', 'ACLs'],
    githubUrl: 'https://github.com',
    liveDemoUrl: 'https://example.com',
    cardLetter: 'SN',
    featured: false,
    category: 'networking',
  },
  {
    title: 'Full Stack E-Commerce Application',
    description: 'E-Commerce storefront including custom shopping cart, inventory management interface, and secure checkout simulation integrations.',
    techStack: ['React.js', 'Context API', 'Node.js', 'Express', 'Tailwind'],
    githubUrl: 'https://github.com',
    liveDemoUrl: 'https://example.com',
    cardLetter: 'EC',
    featured: true,
    category: 'development',
  },
];

const defaultCertifications = [
  { name: 'Cisco Certified Network Associate (CCNA)', issuerOrg: 'Cisco Systems', date: '2025', badgeEmoji: '🛡️', themeColor: '#049fd9', skills: ['Networking', 'Routing', 'Security'] },
  { name: 'Full Stack MERN Developer', issuerOrg: 'Udemy Academy', date: '2024', badgeEmoji: '🎓', themeColor: '#6366f1', skills: ['React', 'Node.js', 'MongoDB'] },
  { name: 'Python Programming & Django', issuerOrg: 'Meta Professional', date: '2024', badgeEmoji: '🐍', themeColor: '#306998', skills: ['Python', 'Django', 'REST APIs'] },
  { name: 'AWS Certified Cloud Practitioner', issuerOrg: 'Amazon Web Services', date: '2025', badgeEmoji: '☁️', themeColor: '#ff9900', skills: ['AWS', 'Cloud Computing', 'EC2'] },
];

const defaultEducation = [
  { title: 'Bachelor of Technology (B.Tech) — Computer Science', org: 'University College', timePeriod: '2022 – 2026', location: 'Andhra Pradesh, India', badge: '🎓', description: 'CGPA: 8.9 | Core member of programming society | Focused on software engineering and networking.' },
  { title: 'Intermediate (MPC)', org: 'Junior College', timePeriod: '2020 – 2022', location: 'Andhra Pradesh, India', badge: '📘', description: 'Graduated with Distinction. Strong foundations in Mathematics, Physics, and Chemistry.' },
  { title: 'Secondary School Certificate (SSC)', org: 'High School', timePeriod: '2019 – 2020', location: 'Andhra Pradesh, India', badge: '🏫', description: 'Honors graduate with multiple academic topper awards.' },
];

const defaultExperience = [
  { title: 'Web Development Intern', org: 'Innovate Tech Labs', timePeriod: 'May 2025 – Jul 2025', location: 'Remote', badge: '💼', description: 'Built responsive client dashboards with React.js & Tailwind CSS, reducing load times by 20%. Integrated Django REST APIs with MERN databases.' },
  { title: 'Frontend Developer Trainee', org: 'Nexus Software Solutions', timePeriod: 'Jan 2024 – Apr 2024', location: 'Hyderabad', badge: '🚀', description: 'Scaffolded client landing pages with semantic HTML5, implemented JS animations, and created Figma wireframes for production.' },
];

const defaultAchievements = {
  stats: [
    { id: 'stat-1', label: 'Academic Score', value: '97.45', suffix: '%', isFloat: true },
    { id: 'stat-2', label: 'LeetCode Problems', value: '300', suffix: '+', isFloat: false },
    { id: 'stat-3', label: 'Hackathons Won', value: '3', suffix: '', isFloat: false },
    { id: 'stat-4', label: 'Certifications', value: '10', suffix: '+', isFloat: false },
  ],
  highlights: [
    { id: 'hl-1', title: 'Smart Campus Hackathon — Nexus 2025', subtitle: '1st Place Winner among 45 teams', desc: 'Designed an automated student verification system using face recognition APIs.' },
    { id: 'hl-2', title: '5-Star Python Programmer', subtitle: 'HackerRank Achievement', desc: 'Achieved 5-star badge in Python on HackerRank through competitive challenges.' },
  ],
};

const defaultSkills = [
  { name: 'React.js', level: 92, category: 'frontend', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'JavaScript (ES6+)', level: 90, category: 'frontend', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'HTML5 & CSS3', level: 95, category: 'frontend', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { name: 'Tailwind CSS', level: 90, category: 'frontend', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'Python Programmer', level: 88, category: 'backend', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'Django framework', level: 85, category: 'backend', imageUrl: 'https://cdn.simpleicons.org/django/092E20' },
  { name: 'REST APIs development', level: 82, category: 'backend', imageUrl: 'https://cdn.simpleicons.org/fastapi/009688' },
  { name: 'Node.js', level: 75, category: 'backend', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'MongoDB', level: 80, category: 'databases', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
  { name: 'MySQL', level: 85, category: 'databases', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
  { name: 'Mongoose & SQL queries', level: 82, category: 'databases', imageUrl: 'https://cdn.simpleicons.org/postgresql/4169E1' },
  { name: 'Git & Version Control', level: 88, category: 'devops', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { name: 'Docker Containers', level: 75, category: 'devops', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
  { name: 'Vercel & Netlify Deployment', level: 85, category: 'devops', imageUrl: 'https://cdn.simpleicons.org/vercel/000000' },
  { name: 'Cisco Packet Tracer (Topology)', level: 90, category: 'networking', imageUrl: 'https://cdn.simpleicons.org/cisco/049FD9' },
  { name: 'Routing & Switching protocols', level: 85, category: 'networking', imageUrl: 'https://cdn.simpleicons.org/cisco/049FD9' },
  { name: 'Network Security Principles', level: 78, category: 'networking', imageUrl: 'https://cdn.simpleicons.org/cisco/049FD9' },
];

const defaultCategories = [
  { name: 'Frontend', slug: 'frontend', type: 'skill' },
  { name: 'Backend', slug: 'backend', type: 'skill' },
  { name: 'Databases', slug: 'databases', type: 'skill' },
  { name: 'DevOps', slug: 'devops', type: 'skill' },
  { name: 'Networking', slug: 'networking', type: 'skill' },
  { name: 'Development', slug: 'development', type: 'project' },
  { name: 'Networking', slug: 'networking-proj', type: 'project' },
];

async function seed() {
  try {
    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(
      "mongodb://ravindra:Ravi12345@ac-m8txcjq-shard-00-00.vpqfw67.mongodb.net:27017,ac-m8txcjq-shard-00-01.vpqfw67.mongodb.net:27017,ac-m8txcjq-shard-00-02.vpqfw67.mongodb.net:27017/portfolio?ssl=true&replicaSet=atlas-snafoi-shard-0&authSource=admin&appName=Cluster0");
    console.log('✅ Connected.');

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await Promise.all([
      Project.deleteMany({}),
      Skill.deleteMany({}),
      Certification.deleteMany({}),
      Education.deleteMany({}),
      ExperienceItem.deleteMany({}),
      Achievement.deleteMany({}),
      Settings.deleteMany({}),
      Category.deleteMany({}),
    ]);

    // Insert all data
    console.log('📦 Seeding data...');
    const [projects, skills, certs, edu, exp, cats] = await Promise.all([
      Project.insertMany(defaultProjects),
      Skill.insertMany(defaultSkills),
      Certification.insertMany(defaultCertifications),
      Education.insertMany(defaultEducation),
      ExperienceItem.insertMany(defaultExperience),
      Category.insertMany(defaultCategories),
    ]);

    await Achievement.create(defaultAchievements);
    await Settings.create(defaultSettings);

    console.log(`\n✅ Seed complete!`);
    console.log(`   Projects:       ${projects.length}`);
    console.log(`   Skills:         ${skills.length}`);
    console.log(`   Certifications: ${certs.length}`);
    console.log(`   Education:      ${edu.length}`);
    console.log(`   Experience:     ${exp.length}`);
    console.log(`   Categories:     ${cats.length}`);
    console.log(`   Achievements:   1 document`);
    console.log(`   Settings:       1 document`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
}

seed();
