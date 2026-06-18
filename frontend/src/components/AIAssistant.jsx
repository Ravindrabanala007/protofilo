import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaTimes, FaPaperPlane } from 'react-icons/fa';

export const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Hi! I'm Ravindra's AI Assistant. Ask me about his projects, skills, certifications, education, experience, achievements, or anything else!",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);
  const messageIdRef = useRef(2);

  // Auto scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = (text) => {
    if (!text.trim()) return;

    // Add user message
    const userMsg = {
      id: messageIdRef.current++,
      sender: 'user',
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulate bot response after delay
    setTimeout(() => {
      const query = text.toLowerCase();
      let botResponse;

      if (query.includes('project')) {
        botResponse = "Ravindra has built several featured projects including an AI-Powered Product Review System using React.js, Django & NLP, a Product Quality Review Platform on the full MERN stack with Chart.js, a Secure Multi-Campus Network Design using Cisco Packet Tracer with OSPF & VLANs, and a Full Stack E-Commerce Application with React and Context API. Click 'View Projects' to explore them!";
      } else if (query.includes('skill') || query.includes('tech') || query.includes('language') || query.includes('stack')) {
        botResponse = "Ravindra's tech arsenal includes:\n\n🎨 Frontend: React.js (92%), JavaScript ES6+ (90%), HTML5 & CSS3 (95%), Tailwind CSS (90%)\n⚙️ Backend: Python (88%), Django (85%), REST APIs (82%), Node.js (75%)\n🗄️ Databases: MongoDB (80%), MySQL (85%), Mongoose & SQL (82%)\n🚀 DevOps: Git (88%), Docker (75%), Vercel & Netlify (85%)\n🌐 Networking: Cisco Packet Tracer (90%), Routing & Switching (85%), Network Security (78%)";
      } else if (query.includes('resume') || query.includes('cv') || query.includes('download')) {
        botResponse = "You can download Ravindra's professional resume by clicking the 'Download Resume' button in the hero section or the chip below. His resume highlights his B.Tech in CS, CCNA certification, MERN stack expertise, and internship experience.";
      } else if (query.includes('contact') || query.includes('email') || query.includes('hire') || query.includes('reach')) {
        botResponse = "You can reach Ravindra via email at ravindra@example.com, by phone at +91 98765 43210, or through the contact form at the bottom of this page. He's based in Andhra Pradesh, India, and open to internships, freelance work, and full-time roles!";
        scrollToSection('contact');
      } else if (query.includes('education') || query.includes('college') || query.includes('university') || query.includes('degree')) {
        botResponse = "🎓 Ravindra is pursuing a B.Tech in Computer Science (2022–2026) with an outstanding CGPA of 8.9. He's a core member of his university's programming society. He also graduated from Intermediate (MPC) with Distinction and earned Honors in his Secondary School Certificate with multiple academic topper awards.";
      } else if (query.includes('certif') || query.includes('ccna') || query.includes('cisco') || query.includes('aws')) {
        botResponse = "📜 Ravindra holds impressive certifications:\n\n🛡️ Cisco Certified Network Associate (CCNA) – Cisco Systems, 2025\n🎓 Full Stack MERN Developer – Udemy Academy, 2024\n🐍 Python Programming & Django Mastery – Meta Professional, 2024\n☁️ AWS Certified Cloud Practitioner – Amazon Web Services, 2025\n\nThese certifications span networking, full-stack development, and cloud computing!";
      } else if (query.includes('network') || query.includes('routing') || query.includes('vlan') || query.includes('ospf')) {
        botResponse = "🌐 Ravindra is a certified Cisco Network Engineer (CCNA). He's proficient in Cisco Packet Tracer for topology design, OSPF routing protocols, VLAN configuration, ACL security lists, and subnetting. He designed a Secure Multi-Campus Network linking three campuses with redundant topologies. His networking skills score 85-90% proficiency!";
      } else if (query.includes('achievement') || query.includes('score') || query.includes('academic') || query.includes('topper')) {
        botResponse = "🏆 Ravindra's achievements are exceptional:\n\n📊 Academic Score: 97.45% (University Rank Topper)\n💻 LeetCode: 300+ problems solved with 5-star Python on HackerRank\n🏅 Hackathons: Won 3 hackathons, including Smart Campus Hackathon Nexus 2025 (1st among 45 teams) with a face recognition verification system\n📜 Certifications: 10+ across networking, development & cloud";
      } else if (query.includes('experience') || query.includes('intern') || query.includes('work') || query.includes('job')) {
        botResponse = "💼 Ravindra's professional experience:\n\n🔹 Web Development Intern at Innovate Tech Labs (May–Jul 2025, Remote) — Built responsive client dashboards with React.js & Tailwind CSS, reducing load times by 20%. Integrated Django REST APIs with MERN databases.\n\n🔹 Frontend Developer Trainee at Nexus Software Solutions (Jan–Apr 2024, Hyderabad) — Scaffolded client landing pages, implemented semantic HTML & JS animations, and created Figma wireframes for production.";
      } else if (query.includes('hackathon') || query.includes('competition') || query.includes('contest')) {
        botResponse = "🏅 Ravindra is a 3-time hackathon winner! His highlight was the Smart Campus Hackathon (Nexus 2025) where he designed an automated student verification system using face recognition APIs, securing 1st place among 45 collegiate developer teams. He thrives in competitive programming and problem-solving challenges!";
      } else if (query.includes('leetcode') || query.includes('competitive') || query.includes('coding challenge') || query.includes('hackerrank')) {
        botResponse = "💻 Ravindra has solved 300+ LeetCode algorithm problems and earned a 5-star Python programmer badge on HackerRank. He's passionate about data structures, algorithms, and competitive coding, continuously sharpening his problem-solving skills across multiple platforms!";
      } else if (query.includes('hobby') || query.includes('interest') || query.includes('passion') || query.includes('free time')) {
        botResponse = "🎯 Beyond coding, Ravindra is passionate about:\n\n💡 Competitive programming & algorithmic challenges\n🌍 Contributing to open-source projects\n📚 Continuous learning of cutting-edge technologies (AI, cloud, DevOps)\n🔬 Exploring network security and infrastructure design\n🎮 Building side projects to experiment with new frameworks";
      } else if (query.includes('about') || query.includes('who') || query.includes('introduction') || query.includes('tell me about') || query.includes('yourself')) {
        botResponse = "👋 Ravindra Banala is a dedicated Full Stack Developer and React Developer pursuing B.Tech in Computer Science (CGPA 8.9). He excels in MERN stack, Django, Python, and holds a CCNA certification in networking. With 97.45% academic score, 300+ LeetCode solved, 3 hackathon wins, and internship experience at tech companies, he combines strong academic foundations with practical industry skills. He's passionate about clean code, scalable architecture, and cutting-edge tech!";
      } else if (query.includes('linkedin') || query.includes('social') || query.includes('connect') || query.includes('profile')) {
        botResponse = "🔗 Connect with Ravindra on LinkedIn: linkedin.com/in/ravindra-banala-b0a956277/\n\nYou can also find him on GitHub, Instagram, and Twitter. Check the social links in the hero section or footer of this portfolio!";
      } else {
        botResponse = "I'm Ravindra's AI portfolio guide! I can help you learn about his:\n\n📂 Projects (AI, MERN, E-Commerce, Networking)\n🛠️ Technical Skills (React, Python, Django, Node.js)\n🎓 Education (B.Tech CS, CGPA 8.9)\n📜 Certifications (CCNA, AWS, MERN, Django)\n🏆 Achievements (97.45%, 300+ LeetCode, 3 hackathon wins)\n💼 Work Experience (Internships)\n📞 Contact Information\n🔗 LinkedIn & Social Profiles\n\nJust ask about any of these topics!";
      }

      const botMsg = {
        id: messageIdRef.current++,
        sender: 'bot',
        text: botResponse,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1000);
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleQuickAction = (action) => {
    if (action === 'View Projects') {
      scrollToSection('projects');
      handleSendMessage("Show me your projects");
    } else if (action === 'Download Resume') {
      // Create mockup download link
      const link = document.createElement('a');
      link.href = '#';
      link.setAttribute('download', 'Ravindra_Banala_Resume.pdf');
      document.body.appendChild(link);
      // Let's print in chat
      handleSendMessage("Where can I download your resume?");
    } else if (action === 'View Skills') {
      scrollToSection('skills');
      handleSendMessage("What are your skills?");
    } else if (action === 'Contact Me') {
      scrollToSection('contact');
      handleSendMessage("How can I contact you?");
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[999] font-body">
      {/* Expandable Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="w-[320px] sm:w-[360px] h-[480px] rounded-2xl glass-panel shadow-2xl flex flex-col overflow-hidden mb-4 border border-white/10"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-accent-primary to-accent-secondary flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <FaRobot className="text-xl animate-bounce" />
                <div>
                  <h3 className="font-heading font-semibold text-sm">Ravindra's AI Guide</h3>
                  <span className="flex items-center gap-1.5 text-xs text-emerald-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    Online
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white hover:bg-white/10 p-1.5 rounded-full transition-all"
                aria-label="Close chat window"
              >
                <FaTimes />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-bg-secondary/40">
              {messages.map((msg) => (
                <div 
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                      msg.sender === 'user' 
                        ? 'bg-accent-primary text-white rounded-tr-none' 
                        : 'bg-bg-glass text-textColor-primary border border-white/5 rounded-tl-none'
                    }`}
                  >
                    <p className="leading-relaxed whitespace-pre-line">{msg.text}</p>
                    <span className="block text-[10px] text-right mt-1 opacity-60">{msg.time}</span>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-bg-glass border border-white/5 rounded-2xl rounded-tl-none px-4 py-3">
                    <div className="flex gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-accent-primary animate-bounce delay-100" />
                      <span className="w-2 h-2 rounded-full bg-accent-primary animate-bounce delay-200" />
                      <span className="w-2 h-2 rounded-full bg-accent-primary animate-bounce delay-300" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Quick Actions Suggestions */}
            <div className="px-4 py-2 flex flex-wrap gap-1.5 border-t border-white/5 bg-bg-secondary/20">
              {['View Projects', 'Download Resume', 'View Skills', 'Contact Me'].map((action) => (
                <button
                  key={action}
                  onClick={() => handleQuickAction(action)}
                  className="text-xs px-2.5 py-1 rounded-full border border-borderColor-base hover:border-accent-primary bg-bg-glass text-textColor-secondary hover:text-textColor-primary transition-all duration-300"
                >
                  {action}
                </button>
              ))}
            </div>

            {/* Input area */}
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputText); }}
              className="p-3 border-t border-white/5 flex gap-2 bg-bg-secondary"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask me something..."
                className="flex-1 text-sm bg-bg-primary border border-borderColor-base focus:border-accent-primary rounded-xl px-4 py-2 text-textColor-primary outline-none transition-all"
              />
              <button
                type="submit"
                className="w-9 h-9 bg-accent-primary hover:bg-accent-secondary rounded-xl text-white flex items-center justify-center transition-all shadow-md shadow-indigo-500/20"
                aria-label="Send message"
              >
                <FaPaperPlane className="text-xs" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button Trigger */}
      {isOpen ? (
        <motion.button
          onClick={() => setIsOpen(false)}
          className="w-14 h-14 bg-gradient-to-tr from-accent-primary to-accent-secondary hover:from-accent-secondary hover:to-accent-primary rounded-full text-white flex items-center justify-center shadow-lg border border-white/10 cursor-pointer ml-auto"
          aria-label="Close chatbot guide"
        >
          <FaTimes className="text-xl" />
        </motion.button>
      ) : (
        <motion.div
          onClick={() => setIsOpen(true)}
          animate={{ y: [0, -24, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
          className="cursor-pointer select-none filter drop-shadow-[0_8px_16px_rgba(99,102,241,0.25)] hover:scale-105 transition-transform duration-300 relative ml-auto w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center"
        >
          <img src="/assista/AI.png" alt="AI Guide" className="w-full h-full object-contain" />
          <span className="absolute top-2 right-2 w-4.5 h-4.5 rounded-full bg-emerald-400 border-2 border-bg-primary animate-[pulse_2s_infinite]" />
        </motion.div>
      )}
    </div>
  );
};
