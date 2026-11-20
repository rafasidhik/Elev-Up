import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { History as HistoryIcon, Trash2, PlayCircle } from 'lucide-react';
import VideoGrid from '../components/VideoGrid';
import EmptyState from '../components/EmptyState';
import { SAMPLE_VIDEOS } from '../data/videos';

export default function History({ history, onClearHistory, watchLaterIds, onToggleWatchLater }) {
  const navigate = useNavigate();

  const historyVideos = useMemo(() => {
    if (!history || history.length === 0) return [];
    const videoMap = new Map(SAMPLE_VIDEOS.map((v) => [v.id, v]));
    return history.map((id) => videoMap.get(id)).filter(Boolean);
  }, [history]);

  return (
    <div className="yt-page-container">
      <div className="yt-page-header">
        <div className="yt-page-header-icon history">
          <HistoryIcon size={24} />
        </div>
        <div className="yt-page-header-text">
          <h1 className="yt-page-title">Watch History</h1>
          <p className="yt-page-subtitle">
            {historyVideos.length > 0
              ? `${historyVideos.length} video${historyVideos.length > 1 ? 's' : ''} in your history`
              : 'Track what you have been watching'}
          </p>
        </div>

        {historyVideos.length > 0 && (
          <button
            type="button"
            className="yt-action-header-btn danger"
            onClick={onClearHistory}
            title="Clear all watch history"
          >
            <Trash2 size={16} />
            <span>Clear History</span>
          </button>
        )}
      </div>

      {historyVideos.length === 0 ? (
        <EmptyState
          icon={PlayCircle}
          title="Keep Track of What You Watch"
          description="Watch history isn't viewable when you haven't watched any videos yet. Start browsing to populate your list."
          actionLabel="Start Watching"
          onAction={() => navigate('/')}
        />
      ) : (
        <VideoGrid
          videos={historyVideos}
          watchLaterIds={watchLaterIds}
          onToggleWatchLater={onToggleWatchLater}
        />
      )}
    </div>
  );
}
