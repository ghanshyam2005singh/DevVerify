import React from 'react';
import { Link } from 'react-router';

export function Footer() {
  return (
    <footer className="bg-white shadow-md mt-auto">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-gray-500">
            © {new Date().getFullYear()}{' '}
            <a href="https://www.devrhylme.org/" className="hover:text-primary transition-colors">
              DevRhylme Foundation
            </a>. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <a href="https://www.devrhylme.org/about" className="text-sm text-gray-500 hover:text-primary transition-colors">
              About
            </a>
            <a href="mailto:admin@devrhylme.org" className="text-sm text-gray-500 hover:text-primary transition-colors">
              Contacts
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}