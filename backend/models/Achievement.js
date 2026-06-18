import mongoose from 'mongoose';

const achievementSchema = new mongoose.Schema(
  {
    stats: { type: [mongoose.Schema.Types.Mixed], default: [] },
    highlights: { type: [mongoose.Schema.Types.Mixed], default: [] },
  },
  { timestamps: true }
);

const Achievement = mongoose.model('Achievement', achievementSchema);
export default Achievement;
