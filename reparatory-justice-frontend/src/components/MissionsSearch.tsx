"use client";

import React, { useState } from 'react';
import MissionCard from '@/components/MissionCard';
import EmptyState from '@/components/EmptyState';

interface Mission {
  country: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  type?: string;
  head_of_mission?: string;
}

export default function MissionsSearch({ initialMissions }: { initialMissions: Mission[] }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMissions = initialMissions.filter(mission => 
    mission.country.toLowerCase().includes(searchQuery.toLowerCase()) || 
    mission.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Search Input */}
      <div className="relative max-w-2xl mx-auto mb-16">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input 
          type="text" 
          placeholder="Search by country or city..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white/10 border border-white/20 text-white placeholder:text-slate-400 rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all text-lg backdrop-blur-sm"
        />
      </div>

      {/* Directory List */}
      <div className="max-w-5xl mx-auto">
        {filteredMissions.length === 0 ? (
          <EmptyState 
            title="No Missions Found" 
            description={searchQuery ? `We couldn't find any diplomatic missions matching "${searchQuery}".` : "The diplomatic directory is currently empty."}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredMissions.map((mission, index) => (
              <MissionCard 
                key={index}
                country={mission.country}
                city={mission.city}
                address={mission.address}
                phone={mission.phone}
                email={mission.email}
                type={mission.type || "Embassy"} // Fallback if type is missing
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
