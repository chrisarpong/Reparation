import React from 'react';

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-[#001b3d] z-[9999] flex flex-col items-center justify-center">
      <div className="relative">
        {/* Pulsing Ministry Crest Placeholder */}
        <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center animate-pulse">
          <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center">
            <div className="w-8 h-8 bg-accent rounded-sm rotate-45 animate-spin duration-[3000ms]"></div>
          </div>
        </div>
        
        {/* Spinning Ring */}
        <div className="absolute inset-0 border-4 border-accent/20 border-t-accent rounded-full animate-spin"></div>
      </div>
      
      <div className="mt-8 text-white/60 text-xs font-bold uppercase tracking-[0.3em] animate-pulse">
        Ministry of Foreign Affairs
      </div>
    </div>
  );
}
