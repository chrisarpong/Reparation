import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getServiceBySlug } from '@/lib/api';
import Breadcrumb from '@/components/Breadcrumb';

export default async function ConsularServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = await getServiceBySlug(params.slug);

  if (!service) {
    notFound();
  }

  return (
    <main className="bg-slate-50 min-h-screen pt-24 md:pt-32 pb-24">
      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-6 mb-8">
        <Breadcrumb paths={[
          { name: "Consular Services", href: "/consular-services" },
          { name: service.service_name, href: `/consular-services/${params.slug}` }
        ]} />
        
        <Link href="/consular-services" className="inline-flex items-center gap-2 text-sm text-[#001b3d] font-bold hover:text-accent transition-colors mt-4">
          ← Back to Consular Services
        </Link>
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200">
          {/* Header */}
          <div className="bg-[#001b3d] p-12 text-white">
            <h1 className="text-3xl md:text-5xl font-bold font-serif mb-4">
              {service.service_name}
            </h1>
            <p className="text-slate-300 font-light text-lg max-w-2xl">
              Official guidelines and application process for {service.service_name.toLowerCase()} in the Republic of Ghana.
            </p>
          </div>

          <div className="p-12">
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 flex flex-col items-center text-center">
                <span className="text-4xl mb-4">⏱</span>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Processing Time</h4>
                <p className="text-2xl font-bold text-[#001b3d]">{service.processing_time || 'Varies'}</p>
              </div>
              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 flex flex-col items-center text-center">
                <span className="text-4xl mb-4">💳</span>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Service Fee</h4>
                <p className="text-2xl font-bold text-[#001b3d]">{service.fee || 'N/A'}</p>
              </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <h3 className="text-2xl font-bold text-[#001b3d] mb-6 font-serif border-b border-slate-100 pb-4">
                  Service Description
                </h3>
                <div className="prose prose-slate max-w-none text-slate-600 font-light leading-relaxed mb-12 whitespace-pre-wrap">
                  {service.description}
                </div>

                {service.requirements && (
                  <>
                    <h3 className="text-2xl font-bold text-[#001b3d] mb-6 font-serif border-b border-slate-100 pb-4">
                      Required Documents
                    </h3>
                    <div className="prose prose-slate max-w-none text-slate-600 font-light leading-relaxed mb-12 whitespace-pre-wrap">
                      {service.requirements}
                    </div>
                  </>
                )}
              </div>

              <div className="lg:col-span-1">
                <div className="bg-[#001b3d]/5 p-8 rounded-2xl border border-[#001b3d]/10 sticky top-32">
                  <h4 className="text-[#001b3d] font-bold mb-4 uppercase tracking-widest text-xs">Need Assistance?</h4>
                  <p className="text-sm text-slate-600 font-light mb-8">
                    Our consular officers are available to help you with your application. Please contact the nearest diplomatic mission for specific inquiries.
                  </p>
                  
                  <Link 
                    href="/contact" 
                    className="block w-full text-center bg-[#001b3d] text-white font-bold py-4 rounded-xl hover:bg-accent hover:text-[#001b3d] transition-all shadow-lg"
                  >
                    Start Application
                  </Link>
                  
                  <p className="text-[10px] text-slate-400 text-center mt-4 uppercase tracking-tighter">
                    Secure Official Government Portal
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
