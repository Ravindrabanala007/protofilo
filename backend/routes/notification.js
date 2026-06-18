import { Router } from 'express';
import { body } from 'express-validator';
import Notification from '../models/Notification.js';
import auth from '../middleware/auth.js';

const router = Router();

// GET /api/notifications/active — public, returns the latest active notification
router.get('/active', async (req, res) => {
  try {
    const notification = await Notification.findOne({ isActive: true }).sort({ createdAt: -1 });
    res.json(notification || null);
  } catch (error) {
    console.error('Get active notification error:', error);
    res.status(500).json({ message: 'Failed to fetch notification.' });
  }
});

// GET /api/notifications — admin only, list all notifications
router.get('/', auth, async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });
    res.json(notifications);
  } catch (error) {
    console.error('Get notifications error:', error);
    res.status(500).json({ message: 'Failed to fetch notifications.' });
  }
});

// POST /api/notifications — admin only, create a new notification
router.post('/', auth, async (req, res) => {
  try {
    const { title, message } = req.body;

    if (!title || !message) {
      return res.status(400).json({ message: 'Title and message are required.' });
    }

    const notification = await Notification.create({
      title,
      message,
      isActive: false,
      isBlast: false,
    });

    res.status(201).json(notification);
  } catch (error) {
    console.error('Create notification error:', error);
    res.status(500).json({ message: 'Failed to create notification.' });
  }
});

// PUT /api/notifications/:id — admin only, toggle isActive/isBlast or update
router.put('/:id', auth, async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found.' });
    }

    // If toggling active, deactivate all others first
    if (req.body.isActive === true) {
      await Notification.updateMany({}, { isActive: false });
    }

    if (req.body.title !== undefined) notification.title = req.body.title;
    if (req.body.message !== undefined) notification.message = req.body.message;
    if (req.body.isActive !== undefined) notification.isActive = req.body.isActive;
    if (req.body.isBlast !== undefined) notification.isBlast = req.body.isBlast;

    await notification.save();
    res.json(notification);
  } catch (error) {
    console.error('Update notification error:', error);
    res.status(500).json({ message: 'Failed to update notification.' });
  }
});

// DELETE /api/notifications/:id — admin only, delete a notification
router.delete('/:id', auth, async (req, res) => {
  try {
    const notification = await Notification.findByIdAndDelete(req.params.id);
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found.' });
    }
    res.json({ message: 'Notification deleted.' });
  } catch (error) {
    console.error('Delete notification error:', error);
    res.status(500).json({ message: 'Failed to delete notification.' });
  }
});

export default router;
