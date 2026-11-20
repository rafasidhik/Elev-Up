import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ThumbsUp,
  Clock,
  Share2,
  Check,
  Bell,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { SAMPLE_VIDEOS } from '../data/videos';
import EmptyState from '../components/EmptyState';

const FALLBACK_AVATAR =
  'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill="%23606060"/><circle cx="16" cy="12" r="6" fill="%23ffffff"/><path d="M6 28c0-5.5 4.5-8 10-8s10 2.5 10 8" fill="%23ffffff"/></svg>';

export default function VideoPage({
  likedVideos,
  onToggleLike,
  subscriptions,
  onToggleSubscription,
  watchLaterIds,
  onToggleWatchLater,
  onAddToHistory,
}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [descExpanded, setDescExpanded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const video = useMemo(() => {
    return SAMPLE_VIDEOS.find((v) => v.id === id);
  }, [id]);

  useEffect(() => {
    if (video) {
      onAddToHistory(video.id);
      window.scrollTo(0, 0);
    }
  }, [video, onAddToHistory]);

  const relatedVideos = useMemo(() => {
    if (!video) return [];
    return SAMPLE_VIDEOS.filter((v) => v.id !== video.id);
  }, [video]);

  if (!video) {
    return (
      <div className="yt-page-container">
        <EmptyState
          title="Video Not Found"
          description="The video you are looking for does not exist or has been removed."
          actionLabel="Back to Home"
          onAction={() => navigate('/')}
        />
      </div>
    );
  }

  const isLiked = likedVideos.includes(video.id);
  const isSubscribed = subscriptions.includes(video.channel);
  const isWatchLater = watchLaterIds.includes(video.id);
  const currentLikeCount = isLiked ? video.likes + 1 : video.likes;

  const handleShare = () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(window.location.href);
      }
    } catch {
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="yt-watch-layout">
      <div className="yt-watch-primary">
        <div className="yt-player-container">
          {videoError ? (
            <div className="yt-player-fallback">
              <AlertTriangle size={48} className="yt-fallback-icon" />
              <h3>Playback Error</h3>
              <p>Unable to load the video stream. Please check your internet connection.</p>
              <button
                type="button"
                className="yt-retry-btn"
                onClick={() => setVideoError(false)}
              >
                Retry
              </button>
            </div>
          ) : (
            <video
              key={video.id}
              controls
              playsInline
              poster={video.thumbnail}
              src={video.videoUrl}
              className="yt-main-player"
              onError={() => setVideoError(true)}
            >
              Your browser does not support the video tag.
            </video>
          )}
        </div>

        <h1 className="yt-watch-title">{video.title}</h1>

        <div className="yt-watch-bar">
          <div className="yt-watch-channel-info">
            <div className="yt-watch-avatar-wrap">
              <img
                src={video.channelAvatar}
                alt={video.channel}
                className="yt-watch-avatar"
                onError={(e) => {
                  e.currentTarget.src = FALLBACK_AVATAR;
                }}
              />
            </div>
            <div className="yt-watch-channel-text">
              <h2 className="yt-watch-channel-name">{video.channel}</h2>
              <span className="yt-watch-channel-subs">{video.subscribers}</span>
            </div>

            <button
              type="button"
              className={`yt-subscribe-btn ${isSubscribed ? 'subscribed' : ''}`}
              onClick={() => onToggleSubscription(video.channel)}
            >
              {isSubscribed ? (
                <>
                  <Check size={16} />
                  <span>Subscribed</span>
                </>
              ) : (
                <>
                  <Bell size={16} />
                  <span>Subscribe</span>
                </>
              )}
            </button>
          </div>

          <div className="yt-watch-actions">
            <button
              type="button"
              className={`yt-watch-action-pill ${isLiked ? 'active' : ''}`}
              onClick={() => onToggleLike(video.id)}
              title="Like this video"
            >
              <ThumbsUp size={18} fill={isLiked ? 'currentColor' : 'none'} />
              <span>{currentLikeCount.toLocaleString()}</span>
            </button>

            <button
              type="button"
              className={`yt-watch-action-pill ${isWatchLater ? 'active' : ''}`}
              onClick={() => onToggleWatchLater(video.id)}
              title="Save to Watch Later"
            >
              {isWatchLater ? <Check size={18} /> : <Clock size={18} />}
              <span>{isWatchLater ? 'Saved' : 'Watch Later'}</span>
            </button>

            <button
              type="button"
              className="yt-watch-action-pill yt-share-btn"
              onClick={handleShare}
              title="Share video"
            >
              {copied ? <Check size={18} /> : <Share2 size={18} />}
              <span>{copied ? 'Link Copied!' : 'Share'}</span>
            </button>
          </div>
        </div>

        <div className="yt-watch-description-box">
          <div className="yt-watch-meta-row">
            <span className="yt-meta-highlight">{video.viewsFormatted}</span>
            <span className="yt-meta-dot">•</span>
            <span className="yt-meta-highlight">{video.uploadDate}</span>
            <span className="yt-badge-category">{video.category}</span>
          </div>

          <p className={`yt-watch-desc-text ${descExpanded ? 'expanded' : ''}`}>
            {video.description}
          </p>

          <button
            type="button"
            className="yt-desc-toggle-btn"
            onClick={() => setDescExpanded(!descExpanded)}
          >
            <span>{descExpanded ? 'Show less' : 'Show more'}</span>
            {descExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      </div>

      <div className="yt-watch-secondary">
        <h3 className="yt-related-heading">Related Videos</h3>
        <div className="yt-related-list">
          {relatedVideos.map((item) => (
            <div
              key={item.id}
              className="yt-related-item"
              onClick={() => navigate(`/video/${item.id}`)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  navigate(`/video/${item.id}`);
                }
              }}
              role="button"
              tabIndex={0}
            >
              <div className="yt-related-thumb-wrap">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="yt-related-thumb"
                  loading="lazy"
                />
                <span className="yt-related-duration">{item.duration}</span>
              </div>
              <div className="yt-related-info">
                <h4 className="yt-related-title" title={item.title}>
                  {item.title}
                </h4>
                <p className="yt-related-channel">{item.channel}</p>
                <div className="yt-related-meta">
                  <span>{item.viewsFormatted}</span>
                  <span className="yt-meta-dot">•</span>
                  <span>{item.uploadDate}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
