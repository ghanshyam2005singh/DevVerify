import React from 'react';
import { Link } from 'react-router-dom';
import { Settings } from 'lucide-react';
import { cn } from '../lib/utils';

export function AdminButton() {
  return (
    <Link
      to="/admin"
      className={cn(
        "fixed right-8 top-1/2 transform -translate-y-1/2",
        "bg-primary hover:bg-primary-hover text-white",
        "p-3 rounded-full shadow-lg",
        "transition-all duration-300 hover:scale-110",
        "flex items-center justify-center",
        "z-50"
      )}
      title="Admin Dashboard"
    >
      <Settings className="w-6 h-6" />
    </Link>
  );
}