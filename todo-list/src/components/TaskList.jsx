import React from 'react';
import TaskItem from './TaskItem';
import EmptyState from './EmptyState';

export default function TaskList({
  tasks,
  filter,
  onFilterChange,
  counts,
  onToggleComplete,
  onDeleteTask,
  onEditTask,
  onClearCompleted,
}) {
  return (
    <section className="tf-management-section" aria-label="Task Management">
      <div className="tf-filter-header">
        <div className="tf-filter-tabs" role="tablist" aria-label="Filter tasks">
          <button
            type="button"
            className={`tf-tab-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => onFilterChange('all')}
            role="tab"
            aria-selected={filter === 'all'}
          >
            <span>All Tasks</span>
            <span className="tf-tab-count">{counts.total}</span>
          </button>

          <button
            type="button"
            className={`tf-tab-btn ${filter === 'active' ? 'active' : ''}`}
            onClick={() => onFilterChange('active')}
            role="tab"
            aria-selected={filter === 'active'}
          >
            <span>Active</span>
            <span className="tf-tab-count">{counts.active}</span>
          </button>

          <button
            type="button"
            className={`tf-tab-btn ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => onFilterChange('completed')}
            role="tab"
            aria-selected={filter === 'completed'}
          >
            <span>Completed</span>
            <span className="tf-tab-count">{counts.completed}</span>
          </button>
        </div>

        {counts.completed > 0 && (
          <button
            type="button"
            className="tf-clear-completed-btn"
            onClick={onClearCompleted}
            title="Clear all completed tasks"
          >
            Clear Completed
          </button>
        )}
      </div>

      {tasks.length === 0 ? (
        <EmptyState filter={filter} />
      ) : (
        <ul className="tf-task-list" aria-label="Task list">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggleComplete={onToggleComplete}
              onDeleteTask={onDeleteTask}
              onEditTask={onEditTask}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
