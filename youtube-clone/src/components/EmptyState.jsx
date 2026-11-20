import React from 'react';
import { Film } from 'lucide-react';

export default function EmptyState({
  icon: Icon = Film,
  title = 'No Videos Found',
  description = 'Try searching for something else or explore our suggested categories.',
  actionLabel,
  onAction,
}) {
  return (
    <div className="yt-empty-state">
      <div className="yt-empty-icon-wrap">
        <Icon size={44} />
      </div>
      <h3 className="yt-empty-title">{title}</h3>
      <p className="yt-empty-desc">{description}</p>
      {actionLabel && onAction && (
        <button type="button" className="yt-empty-btn" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}
