import { Router } from 'express';
import { fileURLToPath } from 'url';
import { dirname, join, extname } from 'path';
import { existsSync, mkdirSync } from 'fs';
import multer from 'multer';
import auth from '../middleware/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ASSETS_DIR = join(__dirname, '..', 'assets');

// Ensure assets directory exists
if (!existsSync(ASSETS_DIR)) {
  mkdirSync(ASSETS_DIR, { recursive: true });
}

// Configure multer for disk storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const subDir = req.query.folder || 'uploads';
    const dir = join(ASSETS_DIR, subDir);
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e6)}${extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
  fileFilter: (req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml', 'application/pdf'];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only images and PDFs are allowed.'), false);
    }
  },
});

const router = Router();

// POST /api/upload — admin only, upload a single file
router.post('/', auth, upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }
    const folder = req.query.folder || 'uploads';
    const fileUrl = `/assets/${folder}/${req.file.filename}`;
    res.json({
      message: 'File uploaded successfully.',
      url: fileUrl,
      filename: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size,
      mimetype: req.file.mimetype,
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Failed to upload file.' });
  }
});

// POST /api/upload/multiple — admin only, upload multiple files
router.post('/multiple', auth, upload.array('files', 10), (req, res) => {
  try {
    if (!req.files?.length) {
      return res.status(400).json({ message: 'No files uploaded.' });
    }
    const folder = req.query.folder || 'uploads';
    const files = req.files.map((f) => ({
      url: `/assets/${folder}/${f.filename}`,
      filename: f.filename,
      originalName: f.originalname,
      size: f.size,
    }));
    res.json({ message: `${files.length} files uploaded.`, files });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Failed to upload files.' });
  }
});

export default router;
