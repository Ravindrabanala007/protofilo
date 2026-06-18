import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import authRoutes from './routes/auth.js';
import portfolioRoutes from './routes/portfolio.js';
import contactRoutes from './routes/contact.js';
import notificationRoutes from './routes/notification.js';
import sectionsRoutes from './routes/sections.js';
import uploadRoutes from './routes/upload.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.FRONT_END_URL,
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:3000',
].filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);
      const allowed =
        allowedOrigins.includes(origin) ||
        /^https:\/\/[\w-]+\.vercel\.app$/.test(origin);
      callback(null, allowed);
    },
    credentials: true,
  })
);

app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use('/assets', express.static(join(__dirname, 'assets')));

app.use('/api/auth', authRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/sections', sectionsRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use((err, req, res, next) => {
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({ message: 'File too large. Maximum 2MB allowed.' });
  }
  if (err.message) {
    return res.status(400).json({ message: err.message });
  }
  next(err);
});

export default app;
