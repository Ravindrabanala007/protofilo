import mongoose from 'mongoose';
import dns from 'node:dns';

dns.setServers(['1.1.1.1', '8.8.8.8']);

/** Normalize DB name casing — mixed case breaks writes on Windows/Atlas (code 13297). */
const normalizeMongoUri = (uri) => {
  if (!uri) return uri;
  return uri.replace(/(mongodb(?:\+srv)?:\/\/[^/]+\/)([^/?]+)/, (_, prefix, dbName) => {
    const normalized = dbName.toLowerCase();
    return normalized === dbName ? `${prefix}${dbName}` : `${prefix}${normalized}`;
  });
};

const connectDB = async () => {
  try {
    const uri = normalizeMongoUri(process.env.MONGODB_URI);
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB connected: ${conn.connection.host} / ${conn.connection.name}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;