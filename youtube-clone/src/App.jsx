import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Trending from './pages/Trending';
import Subscriptions from './pages/Subscriptions';
import History from './pages/History';
import WatchLater from './pages/WatchLater';
import LikedVideos from './pages/LikedVideos';
import VideoPage from './pages/VideoPage';
import { useLocalStorage } from './hooks/useLocalStorage';

export default function App() {
  const [theme, setTheme] = useLocalStorage('yt_theme', 'dark');
  const [likedVideos, setLikedVideos] = useLocalStorage('yt_liked_videos', []);
  const [watchLaterIds, setWatchLaterIds] = useLocalStorage('yt_watch_later', []);
  const [subscriptions, setSubscriptions] = useLocalStorage('yt_subscriptions', []);
  const [history, setHistory] = useLocalStorage('yt_history', []);

  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 992 : false
  );
  const [sidebarOpen, setSidebarOpen] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth >= 992 : true
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 992;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleToggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const handleCloseMobileSidebar = () => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const handleToggleLike = (id) => {
    setLikedVideos((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleToggleSubscription = (channelName) => {
    setSubscriptions((prev) =>
      prev.includes(channelName)
        ? prev.filter((c) => c !== channelName)
        : [...prev, channelName]
    );
  };

  const handleToggleWatchLater = (id) => {
    setWatchLaterIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleAddToHistory = useCallback((id) => {
    setHistory((prev) => [id, ...prev.filter((item) => item !== id)]);
  }, [setHistory]);

  const handleClearHistory = () => {
    setHistory([]);
  };

  return (
    <div className={`yt-app-layout ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <Header
        sidebarOpen={sidebarOpen}
        onToggleSidebar={handleToggleSidebar}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      <div className="yt-body-layout">
        <Sidebar
          sidebarOpen={sidebarOpen}
          isMobile={isMobile}
          onCloseMobile={handleCloseMobileSidebar}
        />

        <main className="yt-main-content">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  watchLaterIds={watchLaterIds}
                  onToggleWatchLater={handleToggleWatchLater}
                />
              }
            />
            <Route
              path="/trending"
              element={
                <Trending
                  watchLaterIds={watchLaterIds}
                  onToggleWatchLater={handleToggleWatchLater}
                />
              }
            />
            <Route
              path="/subscriptions"
              element={
                <Subscriptions
                  subscriptions={subscriptions}
                  watchLaterIds={watchLaterIds}
                  onToggleWatchLater={handleToggleWatchLater}
                />
              }
            />
            <Route
              path="/history"
              element={
                <History
                  history={history}
                  onClearHistory={handleClearHistory}
                  watchLaterIds={watchLaterIds}
                  onToggleWatchLater={handleToggleWatchLater}
                />
              }
            />
            <Route
              path="/watch-later"
              element={
                <WatchLater
                  watchLaterIds={watchLaterIds}
                  onToggleWatchLater={handleToggleWatchLater}
                />
              }
            />
            <Route
              path="/liked"
              element={
                <LikedVideos
                  likedVideos={likedVideos}
                  watchLaterIds={watchLaterIds}
                  onToggleWatchLater={handleToggleWatchLater}
                />
              }
            />
            <Route
              path="/video/:id"
              element={
                <VideoPage
                  likedVideos={likedVideos}
                  onToggleLike={handleToggleLike}
                  subscriptions={subscriptions}
                  onToggleSubscription={handleToggleSubscription}
                  watchLaterIds={watchLaterIds}
                  onToggleWatchLater={handleToggleWatchLater}
                  onAddToHistory={handleAddToHistory}
                />
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
