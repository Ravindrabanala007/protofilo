import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '', trim: true },
    techStack: { type: [String], default: [] },
    githubUrl: { type: String, default: '' },
    liveDemoUrl: { type: String, default: '' },
    cardLetter: { type: String, default: '' },
    featured: { type: Boolean, default: false },
    category: { type: String, default: 'development' },
    imageUrl: { type: String, default: '' },
    imageData: { type: String, default: '' },
    assistaPath: { type: String, default: '' },
  },
  { timestamps: true }
);

const Project = mongoose.model('Project', projectSchema);
export default Project;
