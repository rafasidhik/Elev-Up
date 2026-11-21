const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const { query, isConfigured } = require('../config/db');

let memoryNotes = [];

const validateNoteInput = (title, content) => {
  if (!title || !title.trim()) return 'Title is required';
  if (!content || !content.trim()) return 'Content is required';
  return null;
};

router.get('/', async (req, res) => {
  try {
    const { search } = req.query;

    if (isConfigured) {
      let sql = 'SELECT * FROM notes';
      const params = [];

      if (search && search.trim()) {
        sql += ' WHERE title ILIKE $1';
        params.push(`%${search.trim()}%`);
      }

      sql += ' ORDER BY created_at DESC';

      const result = await query(sql, params);
      return res.json(result.rows || []);
    }

    let notes = [...memoryNotes].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    if (search && search.trim()) {
      const q = search.trim().toLowerCase();
      notes = notes.filter((n) => n.title.toLowerCase().includes(q));
    }
    return res.json(notes);
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Failed to fetch notes' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (isConfigured) {
      const result = await query('SELECT * FROM notes WHERE id = $1', [id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Note not found' });
      }
      return res.json(result.rows[0]);
    }

    const note = memoryNotes.find((n) => n.id === id);
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    return res.json(note);
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Failed to fetch note' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, content } = req.body;
    const validationError = validateNoteInput(title, content);

    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    const now = new Date().toISOString();

    if (isConfigured) {
      const sql = 'INSERT INTO notes (title, content) VALUES ($1, $2) RETURNING *';
      const result = await query(sql, [title.trim(), content.trim()]);
      return res.status(201).json(result.rows[0]);
    }

    const newNote = {
      id: crypto.randomUUID(),
      title: title.trim(),
      content: content.trim(),
      created_at: now,
      updated_at: now
    };
    memoryNotes.unshift(newNote);
    return res.status(201).json(newNote);
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Failed to create note' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const validationError = validateNoteInput(title, content);

    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    const now = new Date().toISOString();

    if (isConfigured) {
      const sql = 'UPDATE notes SET title = $1, content = $2, updated_at = NOW() WHERE id = $3 RETURNING *';
      const result = await query(sql, [title.trim(), content.trim(), id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Note not found or update failed' });
      }
      return res.json(result.rows[0]);
    }

    const index = memoryNotes.findIndex((n) => n.id === id);
    if (index === -1) {
      return res.status(404).json({ error: 'Note not found' });
    }

    const updatedNote = {
      ...memoryNotes[index],
      title: title.trim(),
      content: content.trim(),
      updated_at: now
    };
    memoryNotes[index] = updatedNote;
    return res.json(updatedNote);
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Failed to update note' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (isConfigured) {
      const result = await query('DELETE FROM notes WHERE id = $1 RETURNING id', [id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Note not found' });
      }
      return res.json({ message: 'Note deleted successfully', id });
    }

    const index = memoryNotes.findIndex((n) => n.id === id);
    if (index === -1) {
      return res.status(404).json({ error: 'Note not found' });
    }
    memoryNotes.splice(index, 1);
    return res.json({ message: 'Note deleted successfully', id });
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Failed to delete note' });
  }
});

module.exports = router;
