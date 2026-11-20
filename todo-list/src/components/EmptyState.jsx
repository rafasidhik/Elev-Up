import React from 'react';
import { CheckCircle2, Inbox, ListTodo } from 'lucide-react';

export default function EmptyState({ filter }) {
  const getEmptyStateDetails = () => {
    switch (filter) {
      case 'active':
        return {
          icon: <CheckCircle2 size={36} className="tf-empty-icon success" />,
          title: 'All caught up!',
          description: 'No active tasks left on your list. Enjoy your day or add a new task.',
        };
      case 'completed':
        return {
          icon: <ListTodo size={36} className="tf-empty-icon" />,
          title: 'No completed tasks yet',
          description: 'Mark tasks as completed by checking them off from your list.',
        };
      default:
        return {
          icon: <Inbox size={36} className="tf-empty-icon" />,
          title: 'No tasks yet',
          description: 'Your workspace is clear. Type a task above and press Enter to begin.',
        };
    }
  };

  const { icon, title, description } = getEmptyStateDetails();

  return (
    <div className="tf-empty-state">
      <div className="tf-empty-icon-wrap">{icon}</div>
      <h3 className="tf-empty-title">{title}</h3>
      <p className="tf-empty-desc">{description}</p>
    </div>
  );
}
