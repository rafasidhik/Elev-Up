import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Check } from 'lucide-react';

const FALLBACK_THUMBNAIL = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80';
const FALLBACK_AVATAR = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill="%23606060"/><circle cx="16" cy="12" r="6" fill="%23ffffff"/><path d="M6 28c0-5.5 4.5-8 10-8s10 2.5 10 8" fill="%23ffffff"/></svg>';

export default function VideoCard({ video, isWatchLater, onToggleWatchLater }) {
  const navigate = useNavigate();
  const [thumbSrc, setThumbSrc] = useState(video.thumbnail);
  const [avatarSrc, setAvatarSrc] = useState(video.channelAvatar);

  const handleClick = () => {
    navigate(`/video/${video.id}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  const handleWatchLaterClick = (e) => {
    e.stopPropagation();
    if (onToggleWatchLater) {
      onToggleWatchLater(video.id);
    }
  };

  return (
    <article
      className="yt-video-card"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      <div className="yt-card-thumbnail-wrap">
        <img
          src={thumbSrc}
          alt={video.title}
          className="yt-card-thumbnail"
          loading="lazy"
          onError={() => setThumbSrc(FALLBACK_THUMBNAIL)}
        />
        <span className="yt-card-duration">{video.duration}</span>

        {onToggleWatchLater && (
          <button
            type="button"
            className={`yt-watchlater-quick-btn ${isWatchLater ? 'active' : ''}`}
            onClick={handleWatchLaterClick}
            title={isWatchLater ? 'Remove from Watch Later' : 'Watch Later'}
            aria-label={isWatchLater ? 'Remove from Watch Later' : 'Watch Later'}
          >
            {isWatchLater ? <Check size={16} /> : <Clock size={16} />}
          </button>
        )}
      </div>

      <div className="yt-card-details">
        <div className="yt-card-avatar-wrap">
          <img
            src={avatarSrc}
            alt={video.channel}
            className="yt-card-avatar"
            onError={() => setAvatarSrc(FALLBACK_AVATAR)}
          />
        </div>

        <div className="yt-card-info">
          <h3 className="yt-card-title" title={video.title}>
            {video.title}
          </h3>
          <p className="yt-card-channel" title={video.channel}>
            {video.channel}
          </p>
          <div className="yt-card-metadata">
            <span>{video.viewsFormatted}</span>
            <span className="yt-meta-dot">•</span>
            <span>{video.uploadDate}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
