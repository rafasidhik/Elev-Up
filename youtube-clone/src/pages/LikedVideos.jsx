import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThumbsUp } from 'lucide-react';
import VideoGrid from '../components/VideoGrid';
import EmptyState from '../components/EmptyState';
import { SAMPLE_VIDEOS } from '../data/videos';

export default function LikedVideos({ likedVideos, watchLaterIds, onToggleWatchLater }) {
  const navigate = useNavigate();

  const likedVideoList = useMemo(() => {
    if (!likedVideos || likedVideos.length === 0) return [];
    return SAMPLE_VIDEOS.filter((v) => likedVideos.includes(v.id));
  }, [likedVideos]);

  return (
    <div className="yt-page-container">
      <div className="yt-page-header">
        <div className="yt-page-header-icon liked">
          <ThumbsUp size={24} />
        </div>
        <div>
          <h1 className="yt-page-title">Liked Videos</h1>
          <p className="yt-page-subtitle">
            {likedVideoList.length > 0
              ? `${likedVideoList.length} video${likedVideoList.length > 1 ? 's' : ''} you have liked`
              : 'Your favorite videos in one place'}
          </p>
        </div>
      </div>

      {likedVideoList.length === 0 ? (
        <EmptyState
          icon={ThumbsUp}
          title="No Liked Videos Yet"
          description="Give a thumbs up to your favorite videos and they will be conveniently collected right here."
          actionLabel="Discover Videos"
          onAction={() => navigate('/')}
        />
      ) : (
        <VideoGrid
          videos={likedVideoList}
          watchLaterIds={watchLaterIds}
          onToggleWatchLater={onToggleWatchLater}
        />
      )}
    </div>
  );
}
