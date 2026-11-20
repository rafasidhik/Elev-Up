import React, { useState, useRef, useEffect } from 'react';
import { Check, Edit2, Trash2, X, AlertCircle } from 'lucide-react';

function formatTaskDate(dateString) {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    const now = new Date();
    const isToday =
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear();

    if (isToday) {
      return `Today, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }

    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return '';
  }
}

export default function TaskItem({
  task,
  onToggleComplete,
  onDeleteTask,
  onEditTask,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.title);
  const [editError, setEditError] = useState('');
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  const editInputRef = useRef(null);

  useEffect(() => {
    if (isEditing && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [isEditing]);

  const handleStartEdit = () => {
    setEditText(task.title);
    setEditError('');
    setIsEditing(true);
    setIsConfirmingDelete(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditText(task.title);
    setEditError('');
  };

  const handleSaveEdit = (e) => {
    if (e) e.preventDefault();
    const trimmed = editText.trim();

    if (!trimmed) {
      setEditError('Task title cannot be empty');
      return;
    }

    onEditTask(task.id, trimmed);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSaveEdit(e);
    } else if (e.key === 'Escape') {
      handleCancelEdit();
    }
  };

  const formattedDate = formatTaskDate(task.createdAt);

  if (isEditing) {
    return (
      <li className="tf-task-item editing">
        <form onSubmit={handleSaveEdit} className="tf-edit-form">
          <div className="tf-edit-input-wrap">
            <input
              ref={editInputRef}
              type="text"
              className={`tf-edit-input ${editError ? 'has-error' : ''}`}
              value={editText}
              onChange={(e) => {
                setEditText(e.target.value);
                if (editError) setEditError('');
              }}
              onKeyDown={handleKeyDown}
              aria-label="Edit task title"
            />
            {editError && (
              <span className="tf-edit-error-hint">
                <AlertCircle size={12} />
                {editError}
              </span>
            )}
          </div>

          <div className="tf-edit-actions">
            <button
              type="submit"
              className="tf-edit-btn save"
              title="Save changes (Enter)"
              aria-label="Save changes"
            >
              <Check size={14} strokeWidth={2.5} />
              <span>Save</span>
            </button>
            <button
              type="button"
              className="tf-edit-btn cancel"
              onClick={handleCancelEdit}
              title="Cancel editing (Esc)"
              aria-label="Cancel editing"
            >
              <X size={14} />
              <span>Cancel</span>
            </button>
          </div>
        </form>
      </li>
    );
  }

  return (
    <li className={`tf-task-item ${task.completed ? 'completed' : ''}`}>
      <button
        type="button"
        className={`tf-checkbox ${task.completed ? 'checked' : ''}`}
        onClick={() => onToggleComplete(task.id)}
        aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
        title={task.completed ? 'Mark as active' : 'Mark as complete'}
      >
        {task.completed && <Check size={13} strokeWidth={3} />}
      </button>

      <div
        className="tf-task-body"
        onDoubleClick={handleStartEdit}
        title="Double-click to edit"
      >
        <span className="tf-task-title">{task.title}</span>
        {formattedDate && (
          <span className="tf-task-metadata">{formattedDate}</span>
        )}
      </div>

      <div className="tf-task-actions">
        {isConfirmingDelete ? (
          <div className="tf-delete-confirm-box">
            <span className="tf-confirm-text">Delete?</span>
            <button
              type="button"
              className="tf-confirm-btn yes"
              onClick={() => onDeleteTask(task.id)}
              aria-label="Confirm delete"
            >
              Yes
            </button>
            <button
              type="button"
              className="tf-confirm-btn no"
              onClick={() => setIsConfirmingDelete(false)}
              aria-label="Cancel delete"
            >
              No
            </button>
          </div>
        ) : (
          <>
            <button
              type="button"
              className="tf-action-btn edit"
              onClick={handleStartEdit}
              title="Edit task"
              aria-label="Edit task"
            >
              <Edit2 size={15} />
            </button>
            <button
              type="button"
              className="tf-action-btn delete"
              onClick={() => setIsConfirmingDelete(true)}
              title="Delete task"
              aria-label="Delete task"
            >
              <Trash2 size={15} />
            </button>
          </>
        )}
      </div>
    </li>
  );
}
