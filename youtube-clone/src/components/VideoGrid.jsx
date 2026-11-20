import React from 'react';
import VideoCard from './VideoCard';

export default function VideoGrid({ videos, watchLaterIds, onToggleWatchLater }) {
  return (
    <div className="yt-video-grid">
      {videos.map((video) => (
        <VideoCard
          key={video.id}
          video={video}
          isWatchLater={watchLaterIds?.includes(video.id)}
          onToggleWatchLater={onToggleWatchLater}
        />
      ))}
    </div>
  );
}
