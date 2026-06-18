import { Router } from 'express';
import { body, param, validationResult } from 'express-validator';
import auth from '../middleware/auth.js';
import Project from '../models/Project.js';
import Skill from '../models/Skill.js';
import Certification from '../models/Certification.js';
import Education from '../models/Education.js';
import ExperienceItem from '../models/ExperienceItem.js';
import Achievement from '../models/Achievement.js';
import Settings from '../models/Settings.js';
import Category from '../models/Category.js';

const router = Router();

const getSettingsDoc = async () => Settings.findOne().sort({ updatedAt: -1 });

const patchSettingsDoc = async (fields) =>
  Settings.findOneAndUpdate(
    {},
    { $set: fields, $setOnInsert: { settings: {}, about: {} } },
    { upsert: true, new: true, sort: { updatedAt: -1 } }
  );

// Validation error handler
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg, errors: errors.array() });
  }
  next();
};

const idValidator = [param('id').isMongoId().withMessage('Invalid ID'), validate];

// ═══════════════════════════════════════════════════════
//  COMPOSITE GET — fetch everything for frontend
// ═══════════════════════════════════════════════════════
router.get('/all', async (req, res) => {
  try {
    const [
      projects,
      skills,
      certifications,
      education,
      experience,
      achievementDoc,
      settingsDoc,
      categories,
    ] = await Promise.all([
      Project.find().sort({ createdAt: -1 }),
      Skill.find().sort({ createdAt: -1 }),
      Certification.find().sort({ createdAt: -1 }),
      Education.find().sort({ createdAt: -1 }),
      ExperienceItem.find().sort({ createdAt: -1 }),
      Achievement.findOne(),
      Settings.findOne(),
      Category.find().sort({ type: 1, name: 1 }),
    ]);

    const skillCategories = categories
      .filter((c) => c.type === 'skill')
      .map((c) => ({ id: c.slug, name: c.name, _id: c._id }));

    const projectCategories = categories
      .filter((c) => c.type === 'project')
      .map((c) => ({ id: c.slug, name: c.name, _id: c._id }));

    // Map _id to id for frontend compatibility
    const mapId = (doc) => {
      const obj = doc.toObject();
      obj.id = obj._id.toString();
      return obj;
    };

    res.json({
      settings: settingsDoc?.settings ?? {},
      about: settingsDoc?.about ?? {},
      maintenanceMode: settingsDoc?.maintenanceMode ?? false,
      globalBlast: settingsDoc?.globalBlast ?? false,
      projects: projects.map(mapId),
      skills: skills.map(mapId),
      certifications: certifications.map(mapId),
      education: education.map(mapId),
      experience: experience.map(mapId),
      achievements: achievementDoc
        ? { stats: achievementDoc.stats ?? [], highlights: achievementDoc.highlights ?? [] }
        : { stats: [], highlights: [] },
      skillCategories,
      projectCategories,
    });
  } catch (error) {
    console.error('Composite fetch error:', error);
    res.status(500).json({ message: 'Failed to fetch portfolio data.' });
  }
});

// ═══════════════════════════════════════════════════════
//  MAINTENANCE MODE
// ═══════════════════════════════════════════════════════
router.get('/maintenance', async (req, res) => {
  try {
    const doc = await Settings.findOne();
    res.json({ maintenanceMode: doc?.maintenanceMode ?? false });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch maintenance status.' });
  }
});

router.put('/maintenance', auth, async (req, res) => {
  try {
    const { maintenanceMode } = req.body;
    const doc = await patchSettingsDoc({ maintenanceMode: !!maintenanceMode });
    res.json({ maintenanceMode: doc.maintenanceMode ?? false });
  } catch (error) {
    console.error('Maintenance update error:', error);
    res.status(500).json({ message: 'Failed to update maintenance mode.' });
  }
});

router.get('/global-blast', async (req, res) => {
  try {
    const doc = await getSettingsDoc();
    res.json({ globalBlast: doc?.globalBlast ?? false });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch global blast status.' });
  }
});

router.put('/global-blast', auth, async (req, res) => {
  try {
    const { globalBlast } = req.body;
    const doc = await patchSettingsDoc({ globalBlast: !!globalBlast });
    res.json({ globalBlast: doc.globalBlast ?? false });
  } catch (error) {
    console.error('Global blast update error:', error);
    res.status(500).json({ message: 'Failed to update global blast.' });
  }
});

// ═══════════════════════════════════════════════════════
//  SETTINGS (single document)
// ═══════════════════════════════════════════════════════
router.get('/settings', async (req, res) => {
  try {
    const doc = await Settings.findOne();
    res.json(doc ?? { settings: {}, about: {} });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch settings.' });
  }
});

router.put('/settings', auth, async (req, res) => {
  try {
    const { settings, about } = req.body;
    let doc = await Settings.findOne();
    if (doc) {
      if (settings !== undefined) doc.settings = settings;
      if (about !== undefined) doc.about = about;
      doc.markModified('settings');
      doc.markModified('about');
      await doc.save();
    } else {
      doc = await Settings.create({ settings: settings ?? {}, about: about ?? {} });
    }
    res.json(doc);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update settings.' });
  }
});

// ═══════════════════════════════════════════════════════
//  PROJECTS CRUD
// ═══════════════════════════════════════════════════════
router.get('/projects', async (req, res) => {
  try {
    const items = await Project.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch projects.' });
  }
});

router.post(
  '/projects',
  auth,
  [body('title').notEmpty().withMessage('Title is required').trim(), validate],
  async (req, res) => {
    try {
      const item = await Project.create(req.body);
      res.status(201).json(item);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create project.' });
    }
  }
);

router.put('/projects/:id', auth, ...idValidator, async (req, res) => {
  try {
    const item = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!item) return res.status(404).json({ message: 'Project not found.' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update project.' });
  }
});

router.delete('/projects/:id', auth, ...idValidator, async (req, res) => {
  try {
    const item = await Project.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Project not found.' });
    res.json({ message: 'Project deleted.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete project.' });
  }
});

// ═══════════════════════════════════════════════════════
//  SKILLS CRUD
// ═══════════════════════════════════════════════════════
router.get('/skills', async (req, res) => {
  try {
    const items = await Skill.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch skills.' });
  }
});

router.post(
  '/skills',
  auth,
  [body('name').notEmpty().withMessage('Name is required').trim(), validate],
  async (req, res) => {
    try {
      const item = await Skill.create(req.body);
      res.status(201).json(item);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create skill.' });
    }
  }
);

router.put('/skills/:id', auth, ...idValidator, async (req, res) => {
  try {
    const item = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!item) return res.status(404).json({ message: 'Skill not found.' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update skill.' });
  }
});

router.delete('/skills/:id', auth, ...idValidator, async (req, res) => {
  try {
    const item = await Skill.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Skill not found.' });
    res.json({ message: 'Skill deleted.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete skill.' });
  }
});

// ═══════════════════════════════════════════════════════
//  CERTIFICATIONS CRUD
// ═══════════════════════════════════════════════════════
router.get('/certifications', async (req, res) => {
  try {
    const items = await Certification.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch certifications.' });
  }
});

router.post(
  '/certifications',
  auth,
  [body('name').notEmpty().withMessage('Name is required').trim(), validate],
  async (req, res) => {
    try {
      const item = await Certification.create(req.body);
      res.status(201).json(item);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create certification.' });
    }
  }
);

router.put('/certifications/:id', auth, ...idValidator, async (req, res) => {
  try {
    const item = await Certification.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!item) return res.status(404).json({ message: 'Certification not found.' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update certification.' });
  }
});

router.delete('/certifications/:id', auth, ...idValidator, async (req, res) => {
  try {
    const item = await Certification.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Certification not found.' });
    res.json({ message: 'Certification deleted.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete certification.' });
  }
});

// ═══════════════════════════════════════════════════════
//  EDUCATION CRUD
// ═══════════════════════════════════════════════════════
router.get('/education', async (req, res) => {
  try {
    const items = await Education.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch education.' });
  }
});

router.post(
  '/education',
  auth,
  [body('title').notEmpty().withMessage('Title is required').trim(), validate],
  async (req, res) => {
    try {
      const item = await Education.create(req.body);
      res.status(201).json(item);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create education.' });
    }
  }
);

router.put('/education/:id', auth, ...idValidator, async (req, res) => {
  try {
    const item = await Education.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!item) return res.status(404).json({ message: 'Education not found.' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update education.' });
  }
});

router.delete('/education/:id', auth, ...idValidator, async (req, res) => {
  try {
    const item = await Education.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Education not found.' });
    res.json({ message: 'Education deleted.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete education.' });
  }
});

// ═══════════════════════════════════════════════════════
//  EXPERIENCE CRUD
// ═══════════════════════════════════════════════════════
router.get('/experience', async (req, res) => {
  try {
    const items = await ExperienceItem.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch experience.' });
  }
});

router.post(
  '/experience',
  auth,
  [body('title').notEmpty().withMessage('Title is required').trim(), validate],
  async (req, res) => {
    try {
      const item = await ExperienceItem.create(req.body);
      res.status(201).json(item);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create experience.' });
    }
  }
);

router.put('/experience/:id', auth, ...idValidator, async (req, res) => {
  try {
    const item = await ExperienceItem.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!item) return res.status(404).json({ message: 'Experience not found.' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update experience.' });
  }
});

router.delete('/experience/:id', auth, ...idValidator, async (req, res) => {
  try {
    const item = await ExperienceItem.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Experience not found.' });
    res.json({ message: 'Experience deleted.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete experience.' });
  }
});

// ═══════════════════════════════════════════════════════
//  ACHIEVEMENTS (single document)
// ═══════════════════════════════════════════════════════
router.get('/achievements', async (req, res) => {
  try {
    const doc = await Achievement.findOne();
    res.json(doc ?? { stats: [], highlights: [] });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch achievements.' });
  }
});

router.put('/achievements', auth, async (req, res) => {
  try {
    const { stats, highlights } = req.body;
    let doc = await Achievement.findOne();
    if (doc) {
      if (stats !== undefined) doc.stats = stats;
      if (highlights !== undefined) doc.highlights = highlights;
      doc.markModified('stats');
      doc.markModified('highlights');
      await doc.save();
    } else {
      doc = await Achievement.create({ stats: stats ?? [], highlights: highlights ?? [] });
    }
    res.json(doc);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update achievements.' });
  }
});

// ═══════════════════════════════════════════════════════
//  CATEGORIES (skill + project)
// ═══════════════════════════════════════════════════════
router.get('/categories', async (req, res) => {
  try {
    const items = await Category.find().sort({ type: 1, name: 1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch categories.' });
  }
});

router.get('/categories/:type', async (req, res) => {
  try {
    const items = await Category.find({ type: req.params.type }).sort({ name: 1 });
    res.json(items.map((c) => ({ id: c.slug, name: c.name, _id: c._id })));
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch categories.' });
  }
});

router.post(
  '/categories',
  auth,
  [
    body('name').notEmpty().withMessage('Name is required').trim(),
    body('type').isIn(['skill', 'project']).withMessage('Type must be skill or project'),
    validate,
  ],
  async (req, res) => {
    try {
      const slug = req.body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const exists = await Category.findOne({ slug, type: req.body.type });
      if (exists) return res.status(409).json({ message: 'Category already exists.' });
      const item = await Category.create({ name: req.body.name, slug, type: req.body.type });
      res.status(201).json({ id: item.slug, name: item.name, _id: item._id });
    } catch (error) {
      res.status(500).json({ message: 'Failed to create category.' });
    }
  }
);

router.delete('/categories/:id', auth, ...idValidator, async (req, res) => {
  try {
    const item = await Category.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Category not found.' });
    res.json({ message: 'Category deleted.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete category.' });
  }
});

export default router;
