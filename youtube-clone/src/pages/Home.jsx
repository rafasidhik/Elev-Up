import React, { useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import CategoryBar from '../components/CategoryBar';
import VideoGrid from '../components/VideoGrid';
import EmptyState from '../components/EmptyState';
import { SAMPLE_VIDEOS } from '../data/videos';
import { SearchX, X } from 'lucide-react';

export default function Home({ watchLaterIds, onToggleWatchLater }) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredVideos = useMemo(() => {
    let result = SAMPLE_VIDEOS;

    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (v) =>
          v.title.toLowerCase().includes(q) ||
          v.channel.toLowerCase().includes(q) ||
          v.category.toLowerCase().includes(q)
      );
    } else if (selectedCategory !== 'All') {
      result = result.filter((v) => v.category === selectedCategory);
    }

    return result;
  }, [query, selectedCategory]);

  const handleClearSearch = () => {
    navigate('/');
    setSelectedCategory('All');
  };

  return (
    <div className="yt-page-container">
      {query ? (
        <div className="yt-search-results-banner">
          <div className="yt-search-results-info">
            <h2 className="yt-search-results-title">
              Results for <span className="yt-search-query-highlight">"{query}"</span>
            </h2>
            <span className="yt-results-count">{filteredVideos.length} videos found</span>
          </div>
          <button
            type="button"
            className="yt-clear-results-btn"
            onClick={handleClearSearch}
            title="Clear search"
          >
            <X size={16} />
            <span>Clear Filter</span>
          </button>
        </div>
      ) : (
        <CategoryBar
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      )}

      {filteredVideos.length === 0 ? (
        <EmptyState
          icon={SearchX}
          title="No Results Found"
          description={`No videos matched your search for "${query || selectedCategory}". Try checking for typos or searching with different keywords.`}
          actionLabel="Clear Search"
          onAction={handleClearSearch}
        />
      ) : (
        <VideoGrid
          videos={filteredVideos}
          watchLaterIds={watchLaterIds}
          onToggleWatchLater={onToggleWatchLater}
        />
      )}
    </div>
  );
}
