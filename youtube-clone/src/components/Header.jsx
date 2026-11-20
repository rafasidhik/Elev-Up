import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, Search, Moon, Sun, X, Video } from 'lucide-react';

export default function Header({ sidebarOpen, onToggleSidebar, theme, onToggleTheme }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (query) {
      navigate(`/?q=${encodeURIComponent(query)}`);
    } else {
      navigate('/');
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    if (location.search.includes('q=')) {
      navigate('/');
    }
  };

  const handleLogoKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      navigate('/');
    }
  };

  return (
    <header className="yt-header">
      <div className="yt-header-left">
        <button
          type="button"
          className="yt-icon-btn menu-btn"
          onClick={onToggleSidebar}
          aria-label="Toggle navigation menu"
          aria-expanded={sidebarOpen}
          title="Toggle menu"
        >
          <Menu size={20} />
        </button>

        <div
          className="yt-logo"
          onClick={() => navigate('/')}
          onKeyDown={handleLogoKeyDown}
          role="button"
          tabIndex={0}
        >
          <div className="yt-logo-badge">
            <Video size={18} fill="#ffffff" color="#ffffff" />
          </div>
          <span className="yt-logo-text">ViewTube</span>
        </div>
      </div>

      <div className="yt-header-center">
        <form onSubmit={handleSearchSubmit} className="yt-search-form">
          <div className="yt-search-input-wrap">
            <input
              type="text"
              className="yt-search-input"
              placeholder="Search videos, channels, topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search"
            />
            {searchQuery && (
              <button
                type="button"
                className="yt-clear-btn"
                onClick={handleClearSearch}
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>
          <button type="submit" className="yt-search-btn" aria-label="Search" title="Search">
            <Search size={18} />
          </button>
        </form>
      </div>

      <div className="yt-header-right">
        <button
          type="button"
          className="yt-icon-btn theme-btn"
          onClick={onToggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <div className="yt-avatar-wrap" title="User Account">
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80"
            alt="User avatar"
            className="yt-user-avatar"
            onError={(e) => {
              e.currentTarget.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill="%23606060"/><circle cx="16" cy="12" r="6" fill="%23ffffff"/><path d="M6 28c0-5.5 4.5-8 10-8s10 2.5 10 8" fill="%23ffffff"/></svg>';
            }}
          />
        </div>
      </div>
    </header>
  );
}
