import React from 'react';

interface LeadershipCardProps {
  name: string;
  title: string;
  imageUrl: string;
}

export default function LeadershipCard({ name, title, imageUrl }: LeadershipCardProps) {
  return (
    <div className="flex flex-col items-center bg-[#003865] rounded-2xl overflow-hidden shadow-lg border border-white/10 group h-full">
      <div className="w-full aspect-[3/4] overflow-hidden bg-slate-800">
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700" 
        />
      </div>
      <div className="p-8 w-full text-center flex-1 flex flex-col justify-center">
        <h4 className="font-extrabold text-2xl text-white mb-2 tracking-tight">
          {name}
        </h4>
        <p className="text-[#001b3d] font-bold text-sm uppercase tracking-widest">
          {title}
        </p>
      </div>
    </div>
  );
}
