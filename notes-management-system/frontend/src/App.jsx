import { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';
import { getNotes, createNote, updateNote, deleteNote, formatDate } from './services/noteService';
import { X, Calendar, Edit3, Trash2, AlertCircle, CheckCircle2 } from 'lucide-react';
import './App.css';

export default function App() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [viewingNote, setViewingNote] = useState(null);
  const [deletingNote, setDeletingNote] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3200);
  };

  const fetchNotes = useCallback(async (query) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getNotes(query);
      setNotes(data || []);
    } catch (err) {
      setError('Unable to load notes. Please verify your backend server is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchNotes(searchQuery);
    }, 250);

    return () => clearTimeout(timer);
  }, [searchQuery, fetchNotes]);

  const handleOpenAdd = () => {
    setEditingNote(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (note) => {
    setEditingNote(note);
    setIsFormOpen(true);
    if (viewingNote?.id === note.id) {
      setViewingNote(null);
    }
  };

  const handleSaveNote = async (formData) => {
    try {
      setIsSaving(true);
      if (editingNote) {
        const updated = await updateNote(editingNote.id, formData);
        setNotes((prev) =>
          prev.map((item) => (item.id === editingNote.id ? updated : item))
        );
        showNotification('Note updated successfully');
      } else {
        const created = await createNote(formData);
        setNotes((prev) => [created, ...prev]);
        showNotification('Note created successfully');
      }
      setIsFormOpen(false);
      setEditingNote(null);
    } catch (err) {
      console.error(err);
      showNotification('Failed to save note. Please try again.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeletePrompt = (note) => {
    setDeletingNote(note);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingNote) return;
    try {
      await deleteNote(deletingNote.id);
      setNotes((prev) => prev.filter((item) => item.id !== deletingNote.id));
      if (viewingNote?.id === deletingNote.id) {
        setViewingNote(null);
      }
      setDeletingNote(null);
      showNotification('Note deleted successfully');
    } catch (err) {
      console.error(err);
      showNotification('Failed to delete note.', 'error');
    }
  };

  return (
    <div className="nn-app">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenAdd={handleOpenAdd}
      />

      {notification && (
        <div className={`nn-toast ${notification.type}`}>
          {notification.type === 'error' ? (
            <AlertCircle size={18} />
          ) : (
            <CheckCircle2 size={18} />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      <main className="nn-main">
        <div className="nn-container">
          <div className="nn-section-header">
            <div>
              <h1 className="nn-section-title">My Notes</h1>
              <p className="nn-section-subtitle">
                {notes.length} {notes.length === 1 ? 'note' : 'notes'} available
              </p>
            </div>
          </div>

          {loading ? (
            <div className="nn-loading-state">
              <div className="nn-spinner"></div>
              <p>Loading your notes...</p>
            </div>
          ) : error ? (
            <div className="nn-error-state">
              <AlertCircle size={36} />
              <p>{error}</p>
              <button
                type="button"
                className="nn-btn nn-btn-primary"
                onClick={() => fetchNotes(searchQuery)}
              >
                Retry
              </button>
            </div>
          ) : (
            <NoteList
              notes={notes}
              onView={(note) => setViewingNote(note)}
              onEdit={handleOpenEdit}
              onDelete={handleDeletePrompt}
              onOpenAdd={handleOpenAdd}
              searchQuery={searchQuery}
            />
          )}
        </div>
      </main>

      {isFormOpen && (
        <NoteForm
          key={editingNote ? editingNote.id : 'new'}
          note={editingNote}
          onClose={() => {
            setIsFormOpen(false);
            setEditingNote(null);
          }}
          onSave={handleSaveNote}
          isSaving={isSaving}
        />
      )}

      {viewingNote && (
        <div className="nn-modal-overlay" onClick={() => setViewingNote(null)}>
          <div className="nn-modal nn-view-modal" onClick={(e) => e.stopPropagation()}>
            <div className="nn-modal-header">
              <h2 className="nn-view-title">{viewingNote.title}</h2>
              <button
                type="button"
                className="nn-modal-close"
                onClick={() => setViewingNote(null)}
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            <div className="nn-view-metadata">
              <div className="nn-view-date-item">
                <Calendar size={14} />
                <span>Created: {formatDate(viewingNote.created_at)}</span>
              </div>
              {viewingNote.updated_at && viewingNote.updated_at !== viewingNote.created_at && (
                <div className="nn-view-date-item">
                  <Calendar size={14} />
                  <span>Updated: {formatDate(viewingNote.updated_at)}</span>
                </div>
              )}
            </div>

            <div className="nn-view-content">
              {viewingNote.content}
            </div>

            <div className="nn-modal-actions nn-view-actions">
              <button
                type="button"
                className="nn-btn nn-btn-secondary"
                onClick={() => setViewingNote(null)}
              >
                Close
              </button>
              <button
                type="button"
                className="nn-btn nn-btn-secondary"
                onClick={() => handleOpenEdit(viewingNote)}
              >
                <Edit3 size={16} />
                <span>Edit</span>
              </button>
              <button
                type="button"
                className="nn-btn nn-btn-danger"
                onClick={() => handleDeletePrompt(viewingNote)}
              >
                <Trash2 size={16} />
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {deletingNote && (
        <div className="nn-modal-overlay" onClick={() => setDeletingNote(null)}>
          <div className="nn-modal nn-delete-modal" onClick={(e) => e.stopPropagation()}>
            <div className="nn-modal-header">
              <h2 className="nn-modal-title">Delete Note</h2>
              <button
                type="button"
                className="nn-modal-close"
                onClick={() => setDeletingNote(null)}
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            <div className="nn-delete-body">
              <p>
                Are you sure you want to delete <strong>"{deletingNote.title}"</strong>?
              </p>
              <p className="nn-delete-warning">
                This action cannot be undone.
              </p>
            </div>

            <div className="nn-modal-actions">
              <button
                type="button"
                className="nn-btn nn-btn-secondary"
                onClick={() => setDeletingNote(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="nn-btn nn-btn-danger"
                onClick={handleDeleteConfirm}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
