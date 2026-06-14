import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaArrowRight } from 'react-icons/fa';
import { usePortfolio } from '../context/PortfolioContext';
import { resolveAssetUrl } from '../data/defaultPortfolio';
import project1 from '../assets/project1.png';
import project2 from '../assets/project2.png';
import project3 from '../assets/project3.png';

export const Projects = ({ limit }) => {
  const { data } = usePortfolio();
  const projectsData = data.projects ?? [];
  const [filter, setFilter] = useState('all');

  const categories = [
    { id: 'all', name: 'All Work' },
    { id: 'development', name: 'Development' },
    { id: 'networking', name: 'Networking' },
  ];

  const filteredProjects =
    filter === 'all'
      ? projectsData
      : projectsData.filter((proj) => proj.category === filter);

  const displayProjects = limit ? filteredProjects.slice(0, limit) : filteredProjects;

  return (
    <section id="projects" className="section bg-bg-secondary/25 py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-accent-primary block mb-2 font-heading">
            Showcase
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-extrabold tracking-tight text-textColor-primary mb-4">
            Featured Projects
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-accent-primary to-accent-secondary mx-auto rounded-full" />
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`text-xs md:text-sm px-5 py-2.5 rounded-full border font-heading font-semibold transition-all duration-300 cursor-pointer ${
                filter === cat.id
                  ? 'bg-accent-primary border-transparent text-white shadow-md shadow-indigo-500/25'
                  : 'bg-bg-glass border-borderColor-base text-textColor-secondary hover:border-accent-primary hover:text-textColor-primary'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {displayProjects.map((project) => {
              const fallbackMap = {
                'proj-1': project1,
                'proj-2': project2,
                'proj-3': project3,
                'proj-4': project1,
              };
              const imageSrc = resolveAssetUrl(
                project.imageData,
                project.imageUrl,
                project.assistaPath,
                fallbackMap[project.id]
              );
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  key={project.id ?? project.title}
                  className="glass-panel border border-borderColor-base rounded-2xl overflow-hidden group hover:shadow-2xl hover:border-borderColor-hover transition-all duration-300 flex flex-col h-full"
                >
                  <div className="relative overflow-hidden aspect-video bg-bg-primary">
                    {imageSrc ? (
                      <img
                        src={imageSrc}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-accent-primary/20 to-accent-secondary/20 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                        <span className="font-heading text-4xl font-extrabold text-accent-primary/40">
                          {project.cardLetter || project.title?.slice(0, 2).toUpperCase()}
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 z-10 backdrop-blur-sm">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-12 h-12 rounded-full bg-white/10 border border-white/20 hover:border-accent-primary hover:text-accent-primary text-white flex items-center justify-center text-xl transition-all duration-300"
                        >
                          <FaGithub />
                        </a>
                      )}
                      {project.liveDemoUrl && (
                        <a
                          href={project.liveDemoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-12 h-12 rounded-full bg-white/10 border border-white/20 hover:border-accent-secondary hover:text-accent-secondary text-white flex items-center justify-center text-lg transition-all duration-300"
                        >
                          <FaExternalLinkAlt />
                        </a>
                      )}
                    </div>
                    {project.featured && (
                      <span className="absolute top-3 right-3 bg-accent-primary text-white text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-md z-10">
                        Featured
                      </span>
                    )}
                    <span className="absolute top-3 left-3 bg-bg-primary/80 border border-borderColor-base text-textColor-primary text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-md z-10 backdrop-blur-md">
                      {project.category}
                    </span>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div className="space-y-3">
                      <h3 className="font-heading text-lg font-bold text-textColor-primary leading-tight group-hover:text-accent-secondary transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="text-textColor-secondary text-sm leading-relaxed font-body">
                        {project.description}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-6">
                      {(project.techStack ?? []).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-semibold bg-bg-primary text-textColor-secondary px-2.5 py-1 rounded-md border border-borderColor-base/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {limit && projectsData.length > limit && (
          <div className="text-center mt-12">
            <Link
              to="/projects"
              className="btn btn-secondary px-8 py-3.5 rounded-xl inline-flex items-center gap-2 cursor-pointer shadow-md text-sm font-semibold tracking-wide border border-borderColor-base hover:border-accent-primary transition-all duration-300"
            >
              View All Projects <FaArrowRight className="text-xs" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};
export default Projects;
