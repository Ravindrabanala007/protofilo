import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaTimes, FaPaperPlane } from 'react-icons/fa';

export const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Hi! I'm Ravindra's AI Assistant. Ask me about projects, skills, certifications, achievements, and experience.",
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
        botResponse = "Ravindra has built several featured projects including an AI-Powered Product Review System, a Full Stack E-Commerce Application, and a Secure Multi-Campus Network Design (Cisco Packet Tracer). Click the 'View Projects' chip to scroll directly to the portfolio grid!";
      } else if (query.includes('skill') || query.includes('tech') || query.includes('language')) {
        botResponse = "Ravindra is skilled in React.js, JavaScript, Python, Django, Tailwind CSS, MySQL, MongoDB, Docker, Git, and Cisco Networking. Click 'View Skills' to scroll down to the skills panel!";
      } else if (query.includes('resume') || query.includes('cv') || query.includes('download')) {
        botResponse = "You can download Ravindra's professional resume by clicking the 'Download Resume' chip. Let me know if you need any other information!";
      } else if (query.includes('contact') || query.includes('email') || query.includes('hire')) {
        botResponse = "You can email Ravindra directly at ravindra@example.com or use the contact form at the bottom of this page. Let me scroll you down to the contact section!";
        scrollToSection('contact');
      } else if (query.includes('achievement') || query.includes('score') || query.includes('academic')) {
        botResponse = "Ravindra is an Academic Topper with an score of 97.45%! He has also excelled in coding challenges, hackathons, and holds Cisco and cloud-computing certifications.";
      } else if (query.includes('experience') || query.includes('intern')) {
        botResponse = "Ravindra has completed internships focusing on Web Development and holds several certifications. Scroll to the 'Experience' section to see the timeline!";
      } else {
        botResponse = "I am a simple AI guide for Ravindra's portfolio! Feel free to ask about his skills, projects, achievements, resume, or contact details, or use the quick action chips below.";
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
                    <p className="leading-relaxed">{msg.text}</p>
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
