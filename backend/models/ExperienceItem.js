import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    org: { type: String, default: '', trim: true },
    timePeriod: { type: String, default: '' },
    location: { type: String, default: '' },
    badge: { type: String, default: '' },
    description: { type: String, default: '' },
  },
  { timestamps: true }
);

const ExperienceItem = mongoose.model('Experience', experienceSchema);
export default ExperienceItem;
