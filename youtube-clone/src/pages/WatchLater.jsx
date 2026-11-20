import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock } from 'lucide-react';
import VideoGrid from '../components/VideoGrid';
import EmptyState from '../components/EmptyState';
import { SAMPLE_VIDEOS } from '../data/videos';

export default function WatchLater({ watchLaterIds, onToggleWatchLater }) {
  const navigate = useNavigate();

  const watchLaterVideos = useMemo(() => {
    if (!watchLaterIds || watchLaterIds.length === 0) return [];
    return SAMPLE_VIDEOS.filter((v) => watchLaterIds.includes(v.id));
  }, [watchLaterIds]);

  return (
    <div className="yt-page-container">
      <div className="yt-page-header">
        <div className="yt-page-header-icon watchlater">
          <Clock size={24} />
        </div>
        <div>
          <h1 className="yt-page-title">Watch Later</h1>
          <p className="yt-page-subtitle">
            {watchLaterVideos.length > 0
              ? `${watchLaterVideos.length} saved video${watchLaterVideos.length > 1 ? 's' : ''}`
              : 'Save videos to watch whenever you have time'}
          </p>
        </div>
      </div>

      {watchLaterVideos.length === 0 ? (
        <EmptyState
          icon={Clock}
          title="Save Videos for Later"
          description="Found something you want to watch later? Click the watch later icon on any video card to save it right here."
          actionLabel="Browse Videos"
          onAction={() => navigate('/')}
        />
      ) : (
        <VideoGrid
          videos={watchLaterVideos}
          watchLaterIds={watchLaterIds}
          onToggleWatchLater={onToggleWatchLater}
        />
      )}
    </div>
  );
}
