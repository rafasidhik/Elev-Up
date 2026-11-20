import React, { useState } from 'react';
import { CheckSquare, Moon, Sun, Calendar } from 'lucide-react';

export default function Header({ theme, onToggleTheme }) {
  const [currentDate] = useState(() => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
    }).format(new Date());
  });

  return (
    <header className="tf-header">
      <div className="tf-brand">
        <div className="tf-logo-box">
          <CheckSquare className="tf-logo-icon" size={20} />
        </div>
        <div className="tf-brand-info">
          <h1 className="tf-app-title">TaskFlow</h1>
          <p className="tf-app-subtitle">Focus, organize, and accomplish your goals</p>
        </div>
      </div>

      <div className="tf-header-actions">
        <div className="tf-date-chip">
          <Calendar size={14} className="tf-date-icon" />
          <span>{currentDate}</span>
        </div>

        <button
          type="button"
          className="tf-theme-btn"
          onClick={onToggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? (
            <Sun size={18} className="tf-theme-icon sun" />
          ) : (
            <Moon size={18} className="tf-theme-icon moon" />
          )}
        </button>
      </div>
    </header>
  );
}
