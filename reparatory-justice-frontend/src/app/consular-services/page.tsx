import React from 'react';
import Link from 'next/link';
import { getServices } from '@/lib/api';
import Breadcrumb from '@/components/Breadcrumb';

export default async function ConsularServicesPage() {
  const services = await getServices();

  return (
    <main className="bg-slate-50 min-h-screen pt-24 md:pt-32">
      {/* Breadcrumb */}
      <Breadcrumb paths={[{ name: "Consular Services", href: "/consular-services" }]} />
      {/* Dark Navy Hero Section */}
      <section className="bg-[#001b3d] text-white pt-40 pb-24 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight font-serif">
            Consular Services & Information
          </h1>
          <p className="text-lg text-slate-300 font-light max-w-2xl mx-auto">
            The Ministry of Foreign Affairs provides a range of essential services to Ghanaian citizens and foreign nationals. Access guidelines, processing times, and requirements below.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        {services.length === 0 ? (
          <div className="text-center text-slate-500 py-20">
            <p className="text-xl">No consular services are currently listed.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service: any, index: number) => (
              <div 
                key={index} 
                className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                <div className="mb-6 flex-1">
                  <h3 className="text-2xl font-bold text-[#001b3d] mb-3 font-serif">
                    {service.service_name}
                  </h3>
                  <p className="text-slate-600 leading-relaxed font-light mb-6 whitespace-pre-wrap">
                    {service.description}
                  </p>
                </div>
                
                <div className="border-t border-slate-100 pt-6 mt-auto">
                  <div className="flex flex-col gap-3 mb-6">
                    <div className="flex items-center gap-2">
                      <span className="text-accent font-bold">⏱</span>
                      <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                        {service.processing_time || 'Processing time varies'}
                      </span>
                    </div>
                    {service.fee && (
                      <div className="flex items-center gap-2">
                        <span className="text-accent font-bold">💳</span>
                        <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                          Fee: {service.fee}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <Link href={`/consular-services/${service.id || '#'}`} className="inline-block w-full text-center border-2 border-[#001b3d] text-[#001b3d] font-bold py-3 rounded-lg hover:bg-[#001b3d] hover:text-white transition-colors">
                    Apply / Learn More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
