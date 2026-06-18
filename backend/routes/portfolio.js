import { Router } from 'express';
import Portfolio from '../models/Portfolio.js';
import auth from '../middleware/auth.js';

const router = Router();

// GET /api/portfolio — public, returns the portfolio data
router.get('/', async (req, res) => {
  try {
    let portfolio = await Portfolio.findOne();
    if (!portfolio) {
      // Return empty object — frontend will use defaults
      return res.json({});
    }
    // Return as plain object, remove mongoose internals
    const data = portfolio.toObject();
    delete data._id;
    delete data.__v;
    delete data.createdAt;
    delete data.updatedAt;
    res.json(data);
  } catch (error) {
    console.error('Get portfolio error:', error);
    res.status(500).json({ message: 'Failed to fetch portfolio data.' });
  }
});

// PUT /api/portfolio — admin only, replaces the entire portfolio data
router.put('/', auth, async (req, res) => {
  try {
    const updateData = { ...req.body };
    // Remove fields that shouldn't be stored
    delete updateData._id;
    delete updateData.__v;
    delete updateData.createdAt;
    delete updateData.updatedAt;
    delete updateData.visitorCount;

    let portfolio = await Portfolio.findOne();
    if (portfolio) {
      // Update existing document
      Object.assign(portfolio, updateData);
      portfolio.markModified('settings');
      portfolio.markModified('about');
      portfolio.markModified('projects');
      portfolio.markModified('certifications');
      portfolio.markModified('education');
      portfolio.markModified('experience');
      portfolio.markModified('achievements');
      portfolio.markModified('skillCategories');
      portfolio.markModified('skills');
      await portfolio.save();
    } else {
      portfolio = await Portfolio.create(updateData);
    }

    const data = portfolio.toObject();
    delete data._id;
    delete data.__v;
    delete data.createdAt;
    delete data.updatedAt;
    res.json({ message: 'Portfolio updated successfully.', data });
  } catch (error) {
    console.error('Update portfolio error:', error);
    res.status(500).json({ message: 'Failed to update portfolio data.' });
  }
});

export default router;
