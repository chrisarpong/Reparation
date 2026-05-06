import React from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

interface MissionCardProps {
  country: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  type: string;
}

export default function MissionCard({ country, city, address, phone, email, type }: MissionCardProps) {
  return (
    <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative pt-12 flex flex-col h-full">
      {/* Type Badge */}
      <div className="absolute top-0 left-8 -translate-y-1/2 bg-[#001b3d] text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full shadow-sm">
        {type}
      </div>

      <div className="mb-6 flex-1">
        <h3 className="text-2xl font-bold text-[#003865] mb-1">{country}</h3>
        <p className="text-slate-500 font-medium text-lg">{city}</p>
      </div>

      <div className="space-y-4 text-sm text-slate-600 border-t border-slate-100 pt-6">
        <div className="flex items-start gap-3">
          <FaMapMarkerAlt className="text-[#001b3d] flex-shrink-0 mt-1 text-base" />
          <span className="leading-relaxed">{address}</span>
        </div>
        <div className="flex items-center gap-3">
          <FaPhone className="text-[#001b3d] flex-shrink-0 text-base" />
          <span>{phone}</span>
        </div>
        <div className="flex items-center gap-3">
          <FaEnvelope className="text-[#001b3d] flex-shrink-0 text-base" />
          <a href={`mailto:${email}`} className="hover:text-blue-900 transition-colors">
            {email}
          </a>
        </div>
      </div>
    </div>
  );
}
