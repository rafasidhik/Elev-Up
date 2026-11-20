import React from 'react';
import { CheckCircle2, Info, AlertTriangle } from 'lucide-react';

export default function Toast({ toast }) {
  if (!toast) return null;

  const getIcon = () => {
    switch (toast.type) {
      case 'danger':
        return <AlertTriangle size={16} />;
      case 'info':
        return <Info size={16} />;
      default:
        return <CheckCircle2 size={16} />;
    }
  };

  return (
    <div className={`tf-toast-container ${toast.type || 'success'}`} role="status">
      <div className="tf-toast-icon">{getIcon()}</div>
      <span className="tf-toast-message">{toast.message}</span>
    </div>
  );
}
