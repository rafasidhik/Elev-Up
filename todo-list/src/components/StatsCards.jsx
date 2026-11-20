import React from 'react';
import { Layers, Clock, CheckCircle2 } from 'lucide-react';

export default function StatsCards({ total, active, completed }) {
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <section className="tf-dashboard-section" aria-label="Task Overview & Statistics">
      <div className="tf-welcome-header">
        <h2 className="tf-welcome-title">Today's Overview</h2>
        <p className="tf-welcome-subtitle">
          {total === 0
            ? 'Plan your day and achieve your goals one step at a time.'
            : percentage === 100
            ? 'Outstanding work! All tasks are checked off.'
            : percentage >= 50
            ? 'You are making steady progress! Keep the momentum going.'
            : 'Get started on your tasks and make today productive.'}
        </p>
      </div>

      <div className="tf-stats-grid">
        <div className="tf-stat-card">
          <div className="tf-stat-header">
            <span className="tf-stat-label">Total Tasks</span>
            <div className="tf-stat-icon-wrap total">
              <Layers size={17} />
            </div>
          </div>
          <div className="tf-stat-value">{total}</div>
        </div>

        <div className="tf-stat-card">
          <div className="tf-stat-header">
            <span className="tf-stat-label">Active Tasks</span>
            <div className="tf-stat-icon-wrap active">
              <Clock size={17} />
            </div>
          </div>
          <div className="tf-stat-value">{active}</div>
        </div>

        <div className="tf-stat-card">
          <div className="tf-stat-header">
            <span className="tf-stat-label">Completed Tasks</span>
            <div className="tf-stat-icon-wrap completed">
              <CheckCircle2 size={17} />
            </div>
          </div>
          <div className="tf-stat-value">{completed}</div>
        </div>
      </div>

      <div className="tf-progress-card">
        <div className="tf-progress-meta">
          <span className="tf-progress-label">Task Completion</span>
          <span className="tf-progress-percentage">{percentage}%</span>
        </div>
        <div
          className="tf-progress-track"
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          <div
            className="tf-progress-fill"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </section>
  );
}
