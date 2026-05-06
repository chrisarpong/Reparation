import React from 'react';
import { getMissions } from '@/lib/api';
import MissionsSearch from '@/components/MissionsSearch';
import Breadcrumb from '@/components/Breadcrumb';

export default async function MissionsPage() {
  const missions = await getMissions();

  return (
    <main className="bg-slate-50 min-h-screen pt-24 md:pt-32 pb-24">
      {/* Breadcrumb */}
      <Breadcrumb paths={[{ name: "Missions Abroad", href: "/missions" }]} />
      {/* Hero Section & Search Header */}
      <div className="bg-[#051121] text-white py-20 -mt-32 pt-40 mb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight font-serif">
            Ghana's Diplomatic Missions Worldwide
          </h1>
          <p className="text-lg text-slate-300 mb-10 font-light">
            Locate a Ghanaian Embassy, High Commission, or Consulate near you for consular assistance and diplomatic inquiries.
          </p>
          
          <MissionsSearch initialMissions={missions} />
        </div>
      </div>
    </main>
  );
}
