import NoteCard from './NoteCard';
import { FileText, Plus } from 'lucide-react';

export default function NoteList({ notes, onView, onEdit, onDelete, onOpenAdd, searchQuery }) {
  if (notes.length === 0) {
    return (
      <div className="nn-empty-state">
        <div className="nn-empty-icon">
          <FileText size={44} />
        </div>
        <h3 className="nn-empty-title">
          {searchQuery ? 'No matching notes found' : 'No notes yet'}
        </h3>
        <p className="nn-empty-desc">
          {searchQuery
            ? `We couldn't find any note titled "${searchQuery}". Try a different keyword.`
            : 'Capture your thoughts, plans, and ideas in one organized place.'}
        </p>
        {!searchQuery && (
          <button type="button" className="nn-btn nn-btn-primary" onClick={onOpenAdd}>
            <Plus size={18} />
            <span>Create First Note</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="nn-grid">
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
