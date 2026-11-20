import React, { useMemo } from 'react';
import { Flame } from 'lucide-react';
import VideoGrid from '../components/VideoGrid';
import { SAMPLE_VIDEOS } from '../data/videos';

export default function Trending({ watchLaterIds, onToggleWatchLater }) {
  const trendingVideos = useMemo(() => {
    return [...SAMPLE_VIDEOS].sort((a, b) => b.views - a.views);
  }, []);

  return (
    <div className="yt-page-container">
      <div className="yt-page-header">
        <div className="yt-page-header-icon flame">
          <Flame size={24} />
        </div>
        <div>
          <h1 className="yt-page-title">Trending</h1>
          <p className="yt-page-subtitle">The most popular videos on ViewTube right now</p>
        </div>
      </div>

      <VideoGrid
        videos={trendingVideos}
        watchLaterIds={watchLaterIds}
        onToggleWatchLater={onToggleWatchLater}
      />
    </div>
  );
}
