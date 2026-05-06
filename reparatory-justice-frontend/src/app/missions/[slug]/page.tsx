import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getMissionBySlug } from '@/lib/api';
import Breadcrumb from '@/components/Breadcrumb';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaUserTie } from 'react-icons/fa';

export default async function MissionDetailPage({ params }: { params: { slug: string } }) {
  const mission = await getMissionBySlug(params.slug);

  if (!mission) {
    notFound();
  }

  return (
    <main className="bg-slate-50 min-h-screen pt-24 md:pt-32 pb-24">
      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-6 mb-8">
        <Breadcrumb paths={[
          { name: "Missions Abroad", href: "/missions" },
          { name: `${mission.city}, ${mission.country}`, href: `/missions/${params.slug}` }
        ]} />
        
        <Link href="/missions" className="inline-flex items-center gap-2 text-sm text-[#001b3d] font-bold hover:text-accent transition-colors mt-4">
          ← Back to Directory
        </Link>
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200">
          {/* Hero/Header Section */}
          <div className="bg-[#001b3d] p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl opacity-10 -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="relative z-10">
              <h4 className="text-accent font-bold uppercase tracking-widest text-sm mb-4">
                {mission.type || "Embassy of Ghana"}
              </h4>
              <h1 className="text-4xl md:text-6xl font-bold font-serif mb-6">
                {mission.city}, {mission.country}
              </h1>
              
              {mission.head_of_mission && (
                <div className="flex items-center gap-3 text-slate-300">
                  <FaUserTie className="text-accent" />
                  <span className="font-light">Head of Mission: <strong className="text-white">{mission.head_of_mission}</strong></span>
                </div>
              )}
            </div>
          </div>

          <div className="p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Left Column: Contact Info */}
              <div>
                <h3 className="text-2xl font-bold text-[#001b3d] mb-10 font-serif border-b border-slate-100 pb-4">
                  Contact Information
                </h3>
                
                <div className="space-y-10">
                  <div className="flex items-start gap-6 group">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-[#001b3d] group-hover:bg-accent transition-colors">
                      <FaMapMarkerAlt className="text-xl" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Physical Address</h5>
                      <p className="text-slate-600 font-light leading-relaxed whitespace-pre-wrap">
                        {mission.address}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-6 group">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-[#001b3d] group-hover:bg-accent transition-colors">
                      <FaPhoneAlt className="text-xl" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Telephone</h5>
                      <p className="text-slate-600 font-light leading-relaxed">
                        {mission.phone}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-6 group">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-[#001b3d] group-hover:bg-accent transition-colors">
                      <FaEnvelope className="text-xl" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Email Address</h5>
                      <p className="text-slate-600 font-light leading-relaxed">
                        {mission.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-6 group">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-[#001b3d] group-hover:bg-accent transition-colors">
                      <FaClock className="text-xl" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Working Hours</h5>
                      <p className="text-slate-600 font-light leading-relaxed">
                        Monday - Friday: 09:00 AM - 04:00 PM<br/>
                        Weekends & Holidays: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Visual Placeholder */}
              <div>
                <h3 className="text-2xl font-bold text-[#001b3d] mb-10 font-serif border-b border-slate-100 pb-4">
                  Location & Chancery
                </h3>
                
                <div className="aspect-square bg-slate-100 rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center p-12 text-center group overflow-hidden relative">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1577017040065-650ee4d43339?q=80&w=2070&auto=format&fit=crop')] opacity-10 grayscale group-hover:scale-110 transition-transform duration-700"></div>
                  <FaMapMarkerAlt className="text-6xl text-slate-300 mb-6 relative z-10" />
                  <p className="text-slate-400 font-light relative z-10">
                    Interactive map integration and chancery imagery coming soon to this portal.
                  </p>
                </div>
                
                <div className="mt-12 bg-accent/10 p-8 rounded-2xl border border-accent/20">
                  <p className="text-sm text-[#001b3d] font-medium italic">
                    "Providing first-class consular and diplomatic services to the Ghanaian community and international partners in {mission.city}."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
