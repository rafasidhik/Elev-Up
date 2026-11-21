import { Eye, Edit3, Trash2, Calendar } from 'lucide-react';
import { formatDate } from '../services/noteService';

export default function NoteCard({ note, onView, onEdit, onDelete }) {
  return (
    <article className="nn-card">
      <div className="nn-card-body" onClick={() => onView(note)}>
        <h3 className="nn-card-title">{note.title}</h3>
        <p className="nn-card-preview">{note.content}</p>
      </div>

      <div className="nn-card-footer">
        <div className="nn-card-date">
          <Calendar size={13} />
          <span>{formatDate(note.updated_at || note.created_at)}</span>
        </div>

        <div className="nn-card-actions">
          <button
            type="button"
            className="nn-action-btn view"
            onClick={() => onView(note)}
            title="View note"
            aria-label="View note"
          >
            <Eye size={16} />
          </button>
          <button
            type="button"
            className="nn-action-btn edit"
            onClick={() => onEdit(note)}
            title="Edit note"
            aria-label="Edit note"
          >
            <Edit3 size={16} />
          </button>
          <button
            type="button"
            className="nn-action-btn delete"
            onClick={() => onDelete(note)}
            title="Delete note"
            aria-label="Delete note"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </article>
  );
}
