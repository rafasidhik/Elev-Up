import React, { useState, useRef } from 'react';
import { Plus, AlertCircle } from 'lucide-react';

export default function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = title.trim();

    if (!trimmed) {
      setError('Please enter a task description');
      if (inputRef.current) inputRef.current.focus();
      return;
    }

    onAddTask(trimmed);
    setTitle('');
    setError('');
    if (inputRef.current) inputRef.current.focus();
  };

  const handleChange = (e) => {
    setTitle(e.target.value);
    if (error) setError('');
  };

  return (
    <section className="tf-input-section" aria-label="Add Task">
      <form onSubmit={handleSubmit} className="tf-task-form">
        <div className="tf-input-group">
          <input
            ref={inputRef}
            type="text"
            className={`tf-task-input ${error ? 'has-error' : ''}`}
            placeholder="What needs to be accomplished today?"
            value={title}
            onChange={handleChange}
            aria-label="New task title"
          />
          <button type="submit" className="tf-add-btn" aria-label="Add task">
            <Plus size={16} strokeWidth={2.5} />
            <span>Add Task</span>
          </button>
        </div>

        {error && (
          <div className="tf-input-error" role="alert">
            <AlertCircle size={14} />
            <span>{error}</span>
          </div>
        )}
      </form>
    </section>
  );
}
