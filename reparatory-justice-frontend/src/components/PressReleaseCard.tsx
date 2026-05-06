import React from 'react';
import Link from 'next/link';

interface PressReleaseCardProps {
  title: string;
  date: string;
  excerpt: string;
  imageUrl?: string;
  slug?: string;
}

const PressReleaseCard = ({ title, date, excerpt, imageUrl, slug = "#" }: PressReleaseCardProps) => {
  const defaultImage = "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop";

  return (
    <div className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
      <div className="h-48 overflow-hidden relative">
        <img 
          src={imageUrl || defaultImage} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>
      
      <div className="p-8 flex-1 flex flex-col">
        <p className="text-accent font-bold mb-4 tracking-wider text-xs uppercase">
          {date}
        </p>
        
        <h4 className="text-xl font-bold text-[#001b3d] mb-4 group-hover:text-blue-900 transition-colors leading-snug font-serif">
          {title}
        </h4>
        
        <p className="text-slate-600 leading-relaxed font-light text-sm mb-8 flex-1 line-clamp-3">
          {excerpt}
        </p>
        
        <Link 
          href={slug} 
          className="inline-flex items-center gap-2 text-sm text-[#001b3d] font-bold hover:text-blue-700 transition-colors mt-auto group/link"
        >
          Read Official Statement
          <span className="group-hover/link:translate-x-1 transition-transform">→</span>
        </Link>
      </div>
    </div>
  );
};

export default PressReleaseCard;
