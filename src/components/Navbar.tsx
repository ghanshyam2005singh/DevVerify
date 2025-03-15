import React from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, Home } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-xl font-semibold text-primary">DevRhylme Foundation</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <a
              href="https://www.devrhylme.org/contact"
              className="flex items-center space-x-1 text-gray-600 hover:text-primary transition-colors"
            >
              <HelpCircle className="w-5 h-5" />
              <span>Contact Support</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}