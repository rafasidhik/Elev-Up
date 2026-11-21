import { useState } from 'react';
import { X } from 'lucide-react';

export default function NoteForm({ note, onClose, onSave, isSaving }) {
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!content.trim()) {
      newErrors.content = 'Content is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave({
      title: title.trim(),
      content: content.trim()
    });
  };

  return (
    <div className="nn-modal-overlay" onClick={onClose}>
      <div className="nn-modal" onClick={(e) => e.stopPropagation()}>
        <div className="nn-modal-header">
          <h2 className="nn-modal-title">{note ? 'Edit Note' : 'Create New Note'}</h2>
          <button
            type="button"
            className="nn-modal-close"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="nn-form">
          <div className="nn-form-group">
            <label htmlFor="note-title" className="nn-label">
              Title <span className="nn-required">*</span>
            </label>
            <input
              id="note-title"
              type="text"
              className={`nn-input ${errors.title ? 'is-invalid' : ''}`}
              placeholder="e.g., Project Roadmap & Ideas"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errors.title) setErrors((prev) => ({ ...prev, title: null }));
              }}
              autoFocus
            />
            {errors.title && <span className="nn-error-text">{errors.title}</span>}
          </div>

          <div className="nn-form-group">
            <label htmlFor="note-content" className="nn-label">
              Content <span className="nn-required">*</span>
            </label>
            <textarea
              id="note-content"
              rows={8}
              className={`nn-textarea ${errors.content ? 'is-invalid' : ''}`}
              placeholder="Write your note content here..."
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                if (errors.content) setErrors((prev) => ({ ...prev, content: null }));
              }}
            />
            {errors.content && <span className="nn-error-text">{errors.content}</span>}
          </div>

          <div className="nn-modal-actions">
            <button
              type="button"
              className="nn-btn nn-btn-secondary"
              onClick={onClose}
              disabled={isSaving}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="nn-btn nn-btn-primary"
              disabled={isSaving}
            >
              {isSaving ? 'Saving...' : note ? 'Update Note' : 'Save Note'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
