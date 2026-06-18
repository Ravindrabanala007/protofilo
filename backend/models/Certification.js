import mongoose from 'mongoose';

const certificationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    issuerOrg: { type: String, default: '', trim: true },
    date: { type: String, default: '' },
    badgeEmoji: { type: String, default: '🏅' },
    themeColor: { type: String, default: '#6366f1' },
    skills: { type: [String], default: [] },
    certificateLinkUrl: { type: String, default: '' },
    fileData: { type: String, default: '' },
  },
  { timestamps: true }
);

const Certification = mongoose.model('Certification', certificationSchema);
export default Certification;
