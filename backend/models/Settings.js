import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema(
  {
    settings: { type: mongoose.Schema.Types.Mixed, default: {} },
    about: { type: mongoose.Schema.Types.Mixed, default: {} },
    maintenanceMode: { type: Boolean, default: false },
    globalBlast: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Settings = mongoose.model('Settings', settingsSchema);
export default Settings;
