import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Flame, Tv, History, Clock, ThumbsUp } from 'lucide-react';

export default function Sidebar({ sidebarOpen, isMobile, onCloseMobile }) {
  const location = useLocation();

  const navItems = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Trending', path: '/trending', icon: Flame },
    { label: 'Subscriptions', path: '/subscriptions', icon: Tv },
    { label: 'History', path: '/history', icon: History },
    { label: 'Watch Later', path: '/watch-later', icon: Clock },
    { label: 'Liked Videos', path: '/liked', icon: ThumbsUp },
  ];

  return (
    <>
      {isMobile && sidebarOpen && (
        <div
          className="yt-sidebar-backdrop"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      <aside
        className={`yt-sidebar ${sidebarOpen ? 'expanded' : 'collapsed'} ${
          isMobile ? 'mobile-drawer' : ''
        }`}
        aria-label="Navigation sidebar"
      >
        <nav className="yt-nav-list">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`yt-nav-item ${isActive ? 'active' : ''}`}
                onClick={() => {
                  if (isMobile) onCloseMobile();
                }}
                title={item.label}
              >
                <span className="yt-nav-icon">
                  <Icon size={20} />
                </span>
                <span className="yt-nav-label">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
