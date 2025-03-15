import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { cn } from '../lib/utils';

export function VerificationForm() {
  const [certificateNumber, setCertificateNumber] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (certificateNumber.trim()) {
      navigate(`/${certificateNumber}`);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto animate-fade-in">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="certificate" className="block text-sm font-medium text-gray-700">
            Verify Certificate Number
          </label>
          <div className="mt-1 relative">
            <input
              type="text"
              id="certificate"
              value={certificateNumber}
              onChange={(e) => setCertificateNumber(e.target.value)}
              className={cn(
                "block w-full px-4 py-3 rounded-lg border border-gray-300",
                "focus:ring-2 focus:ring-primary focus:border-primary",
                "placeholder:text-gray-400 text-gray-900",
                "transition-colors duration-200"
              )}
              placeholder="Enter your certificate number"
              required
            />
            <Search className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
          </div>
        </div>
        <button
          type="submit"
          className={cn(
            "w-full flex justify-center py-3 px-4 rounded-lg",
            "bg-primary text-white font-medium",
            "hover:bg-primary-hover transition-colors duration-200",
            "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          )}
        >
          Verify Certificate
        </button>
      </form>
    </div>
  );
}