import React from 'react';

export function VideoGuide() {
  return (
    <div className="mt-16 mb-8 animate-fade-in">
      <div className="relative w-full max-w-3xl mx-auto overflow-hidden pt-[56.25%]">
        <iframe
          className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
          title="Certificate Verification Guide"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
