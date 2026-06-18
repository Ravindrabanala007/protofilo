import { Router } from 'express';
import Contact from '../models/Contact.js';
import auth from '../middleware/auth.js';

const router = Router();

// POST /api/contact — public, submit a contact message
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email, and message are required.' });
    }

    const contact = await Contact.create({ name, email, message });
    res.status(201).json({ message: 'Message sent successfully!', contact });
  } catch (error) {
    console.error('Contact submit error:', error);
    res.status(500).json({ message: 'Failed to send message. Please try again.' });
  }
});

// GET /api/contact — admin only, list all contact messages
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({ message: 'Failed to fetch contact messages.' });
  }
});

// DELETE /api/contact/:id — admin only, delete a contact message
router.delete('/:id', auth, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact message not found.' });
    }
    res.json({ message: 'Contact message deleted.' });
  } catch (error) {
    console.error('Delete contact error:', error);
    res.status(500).json({ message: 'Failed to delete contact message.' });
  }
});

export default router;
