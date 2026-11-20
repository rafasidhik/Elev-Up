import React, { useState, useMemo, useEffect, useRef } from 'react';
import Header from './components/Header';
import StatsCards from './components/StatsCards';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Toast from './components/Toast';
import { useLocalStorage } from './hooks/useLocalStorage';
import './App.css';

export default function App() {
  const [tasks, setTasks] = useLocalStorage('taskflow_tasks', []);
  const [theme, setTheme] = useLocalStorage('taskflow_theme', 'light');
  const [filter, setFilter] = useState('all');
  const [toast, setToast] = useState(null);
  const toastTimerRef = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

  const triggerToast = (message, type = 'success') => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast({ message, type });
    toastTimerRef.current = setTimeout(() => {
      setToast(null);
    }, 2800);
  };

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleAddTask = (title) => {
    const newTask = {
      id: `task-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      title,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [newTask, ...prev]);
    triggerToast('Task created successfully');
  };

  const handleToggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === id) {
          const nextCompleted = !task.completed;
          triggerToast(
            nextCompleted ? 'Task marked as completed' : 'Task marked as active',
            nextCompleted ? 'success' : 'info'
          );
          return { ...task, completed: nextCompleted };
        }
        return task;
      })
    );
  };

  const handleEditTask = (id, newTitle) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, title: newTitle } : task))
    );
    triggerToast('Task updated');
  };

  const handleDeleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
    triggerToast('Task deleted', 'info');
  };

  const handleClearCompleted = () => {
    const completedCount = tasks.filter((t) => t.completed).length;
    if (completedCount === 0) return;
    setTasks((prev) => prev.filter((task) => !task.completed));
    triggerToast(`Cleared ${completedCount} completed ${completedCount === 1 ? 'task' : 'tasks'}`, 'info');
  };

  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const active = total - completed;

  const filteredTasks = useMemo(() => {
    if (filter === 'active') return tasks.filter((t) => !t.completed);
    if (filter === 'completed') return tasks.filter((t) => t.completed);
    return tasks;
  }, [tasks, filter]);

  return (
    <div className="tf-app-layout">
      <div className="tf-main-container">
        <Header theme={theme} onToggleTheme={handleToggleTheme} />
        <StatsCards total={total} active={active} completed={completed} />
        <TaskForm onAddTask={handleAddTask} />
        <TaskList
          tasks={filteredTasks}
          filter={filter}
          onFilterChange={setFilter}
          counts={{ total, active, completed }}
          onToggleComplete={handleToggleComplete}
          onDeleteTask={handleDeleteTask}
          onEditTask={handleEditTask}
          onClearCompleted={handleClearCompleted}
        />
      </div>
      <Toast toast={toast} />
    </div>
  );
}
