"use client";

import React, { useState } from 'react';

interface ServiceAccordionProps {
  question: string;
  answer: string;
}

export default function ServiceAccordion({ question, answer }: ServiceAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-[#003865]/20 rounded-lg overflow-hidden bg-[#003865] text-white">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors focus:outline-none"
      >
        <span className="font-bold text-lg pr-8">{question}</span>
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center transition-transform duration-300">
          <svg 
            className={`w-5 h-5 text-[#001b3d] transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            )}
          </svg>
        </div>
      </button>
      
      <div 
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-6 pt-0 text-slate-300 font-light leading-relaxed border-t border-white/10 mt-2 mx-6 pb-6">
          {answer}
        </div>
      </div>
    </div>
  );
}
