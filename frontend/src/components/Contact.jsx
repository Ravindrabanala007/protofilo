import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaPaperPlane } from 'react-icons/fa';

export const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('Thanks for reaching out! I will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  const contactInfo = [
    { icon: <FaEnvelope />, label: 'Email', value: 'ravindra@example.com' },
    { icon: <FaPhone />, label: 'Phone', value: '+91 98765 43210' },
    { icon: <FaMapMarkerAlt />, label: 'Location', value: 'Andhra Pradesh, India' },
  ];

  return (
    <section id="contact" className="section py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-accent-secondary block mb-2 font-heading">
            Get In Touch
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-extrabold tracking-tight text-textColor-primary mb-4">
            Contact Me
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-accent-primary to-accent-secondary mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            <p className="text-textColor-secondary leading-relaxed font-body">
              Open to internships, freelance projects, and full-time opportunities. Send a message and I will respond as soon as possible.
            </p>
            <div className="space-y-4">
              {contactInfo.map((item) => (
                <div key={item.label} className="flex items-center gap-4 glass-panel p-4 rounded-xl border border-borderColor-base">
                  <div className="w-10 h-10 rounded-lg bg-accent-glow flex items-center justify-center text-accent-primary">
                    {item.icon}
                  </div>
                  <div>
                    <span className="text-xs text-textColor-muted uppercase tracking-wider block">{item.label}</span>
                    <span className="text-sm text-textColor-primary font-medium">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onSubmit={handleSubmit}
            className="lg:col-span-7 glass-panel p-8 rounded-2xl border border-borderColor-base space-y-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                className="w-full bg-bg-primary border border-borderColor-base focus:border-accent-primary rounded-xl px-4 py-3 text-textColor-primary outline-none transition-all text-sm"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                required
                className="w-full bg-bg-primary border border-borderColor-base focus:border-accent-primary rounded-xl px-4 py-3 text-textColor-primary outline-none transition-all text-sm"
              />
            </div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              required
              rows={5}
              className="w-full bg-bg-primary border border-borderColor-base focus:border-accent-primary rounded-xl px-4 py-3 text-textColor-primary outline-none transition-all text-sm resize-none"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-accent-primary to-accent-secondary text-white font-heading font-semibold hover:shadow-neon transition-all duration-300"
            >
              <FaPaperPlane className="text-sm" />
              Send Message
            </button>
            {status && (
              <p className="text-sm text-emerald-400">{status}</p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
};
