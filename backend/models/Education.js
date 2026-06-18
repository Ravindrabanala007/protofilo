import mongoose from 'mongoose';

const educationSchema = new mongoose.Schema(
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

const Education = mongoose.model('Education', educationSchema);
export default Education;
