import React from 'react';
import { CATEGORIES } from '../data/videos';

export default function CategoryBar({ selectedCategory, onSelectCategory }) {
  return (
    <div className="yt-category-bar" role="tablist" aria-label="Video categories">
      <div className="yt-category-scroll">
        {CATEGORIES.map((category) => {
          const isSelected = selectedCategory === category;
          return (
            <button
              key={category}
              type="button"
              className={`yt-category-chip ${isSelected ? 'active' : ''}`}
              onClick={() => onSelectCategory(category)}
              role="tab"
              aria-selected={isSelected}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
}
