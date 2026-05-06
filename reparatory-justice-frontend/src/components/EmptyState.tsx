import React from 'react';
import { FaSearch } from 'react-icons/fa';

interface EmptyStateProps {
  title: string;
  description: string;
}

const EmptyState = ({ title, description }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-6 bg-white rounded-3xl border border-slate-100 shadow-sm text-center">
      <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6 text-slate-300">
        <FaSearch className="text-3xl" />
      </div>
      <h3 className="text-2xl font-bold text-[#001b3d] mb-3 font-serif">
        {title}
      </h3>
      <p className="text-slate-500 max-w-sm mx-auto font-light leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default EmptyState;
