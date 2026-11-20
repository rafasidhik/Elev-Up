import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tv, Compass } from 'lucide-react';
import VideoGrid from '../components/VideoGrid';
import EmptyState from '../components/EmptyState';
import { SAMPLE_VIDEOS } from '../data/videos';

export default function Subscriptions({ subscriptions, watchLaterIds, onToggleWatchLater }) {
  const navigate = useNavigate();

  const subscribedVideos = useMemo(() => {
    if (!subscriptions || subscriptions.length === 0) return [];
    return SAMPLE_VIDEOS.filter((v) => subscriptions.includes(v.channel));
  }, [subscriptions]);

  return (
    <div className="yt-page-container">
      <div className="yt-page-header">
        <div className="yt-page-header-icon subscriptions">
          <Tv size={24} />
        </div>
        <div>
          <h1 className="yt-page-title">Subscriptions</h1>
          <p className="yt-page-subtitle">
            {subscriptions.length > 0
              ? `Updates from ${subscriptions.length} channel${subscriptions.length > 1 ? 's' : ''} you follow`
              : 'Keep up with your favorite channels'}
          </p>
        </div>
      </div>

      {subscriptions.length > 0 && (
        <div className="yt-channels-chip-list">
          {subscriptions.map((ch) => (
            <span key={ch} className="yt-channel-chip">
              {ch}
            </span>
          ))}
        </div>
      )}

      {subscribedVideos.length === 0 ? (
        <EmptyState
          icon={subscriptions.length === 0 ? Tv : Compass}
          title={
            subscriptions.length === 0
              ? "Don't miss new videos"
              : 'No Recent Videos from Your Subscriptions'
          }
          description={
            subscriptions.length === 0
              ? 'Subscribe to channels you enjoy to see all of their newly released videos in this feed.'
              : 'The channels you follow have not uploaded new content recently. Discover more creators on ViewTube!'
          }
          actionLabel="Explore Videos"
          onAction={() => navigate('/')}
        />
      ) : (
        <VideoGrid
          videos={subscribedVideos}
          watchLaterIds={watchLaterIds}
          onToggleWatchLater={onToggleWatchLater}
        />
      )}
    </div>
  );
}
