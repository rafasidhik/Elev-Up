import { Plus, Search, X, BookOpen } from 'lucide-react';

export default function Header({ searchQuery, onSearchChange, onOpenAdd }) {
  return (
    <header className="nn-header">
      <div className="nn-header-container">
        <div className="nn-brand">
          <div className="nn-logo-box">
            <BookOpen size={20} />
          </div>
          <span className="nn-brand-name">NoteNest</span>
        </div>

        <div className="nn-search-wrap">
          <Search size={18} className="nn-search-icon" />
          <input
            type="text"
            className="nn-search-input"
            placeholder="Search notes by title..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              className="nn-search-clear"
              onClick={() => onSearchChange('')}
              aria-label="Clear search"
            >
              <X size={15} />
            </button>
          )}
        </div>

        <button type="button" className="nn-btn nn-btn-primary" onClick={onOpenAdd}>
          <Plus size={18} />
          <span>Add Note</span>
        </button>
      </div>
    </header>
  );
}
