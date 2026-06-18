import mongoose from 'mongoose';

const portfolioSchema = new mongoose.Schema(
  {
    settings: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    about: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    projects: {
      type: [mongoose.Schema.Types.Mixed],
      default: [],
    },
    certifications: {
      type: [mongoose.Schema.Types.Mixed],
      default: [],
    },
    education: {
      type: [mongoose.Schema.Types.Mixed],
      default: [],
    },
    experience: {
      type: [mongoose.Schema.Types.Mixed],
      default: [],
    },
    achievements: {
      type: mongoose.Schema.Types.Mixed,
      default: { stats: [], highlights: [] },
    },
    projectCategories: {
      type: [mongoose.Schema.Types.Mixed],
      default: [],
    },
    skillCategories: {
      type: [mongoose.Schema.Types.Mixed],
      default: [],
    },
    skills: {
      type: [mongoose.Schema.Types.Mixed],
      default: [],
    },
  },
  { timestamps: true }
);

const Portfolio = mongoose.model('Portfolio', portfolioSchema);

export default Portfolio;
