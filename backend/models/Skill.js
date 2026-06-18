import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    level: { type: Number, default: 90, min: 0, max: 100 },
    category: { type: String, default: 'frontend' },
    imageUrl: { type: String, default: '' },
    imageData: { type: String, default: '' },
    assistaPath: { type: String, default: '' },
  },
  { timestamps: true }
);

const Skill = mongoose.model('Skill', skillSchema);
export default Skill;
