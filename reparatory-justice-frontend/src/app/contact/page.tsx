"use client";

import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Inquiry sent successfully.');
    }, 1000);
  };

  return (
    <main className="bg-slate-50 min-h-screen pt-32 pb-24">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-[#051121] mb-6 tracking-tight font-serif">
          Contact the Ministry
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto font-light">
          We are here to assist you. Please reach out to our headquarters or submit an online inquiry.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            
            {/* Left Column: Contact Info */}
            <div className="bg-[#0b1f3a] p-12 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#001b3d] rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
              
              <h2 className="text-3xl font-bold mb-8 relative z-10 font-serif">Headquarters</h2>
              
              <div className="space-y-8 relative z-10">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 text-[#001b3d]">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-1">Physical Address</h4>
                    <p className="font-light leading-relaxed">
                      Ministry of Foreign Affairs and Regional Integration<br/>
                      Airport City Area, GL-059-4561<br/>
                      Accra, Ghana
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 text-[#001b3d]">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-1">Phone</h4>
                    <p className="font-light leading-relaxed">
                      +233 (0) 30 274 8100<br/>
                      +233 (0) 30 274 8101
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 text-[#001b3d]">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-1">Email</h4>
                    <p className="font-light leading-relaxed">
                      info@mfa.gov.gh<br/>
                      consular@mfa.gov.gh
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 text-[#001b3d]">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-1">Working Hours</h4>
                    <p className="font-light leading-relaxed">
                      Monday - Friday: 08:30 AM - 04:30 PM<br/>
                      Weekends & Public Holidays: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="p-12">
              <h2 className="text-3xl font-bold text-[#051121] mb-2 font-serif">Send an Inquiry</h2>
              <p className="text-slate-500 mb-8 font-light">Please fill out the form below and our team will get back to you shortly.</p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                    <input 
                      type="text" 
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:border-[#001b3d] focus:ring-1 focus:ring-[#001b3d] transition-colors"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                    <input 
                      type="email" 
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:border-[#001b3d] focus:ring-1 focus:ring-[#001b3d] transition-colors"
                      placeholder="jane@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Subject</label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:border-[#001b3d] focus:ring-1 focus:ring-[#001b3d] transition-colors text-slate-700">
                    <option>Consular Inquiry</option>
                    <option>Media Inquiry</option>
                    <option>Protocol & Protocol Services</option>
                    <option>General Information</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Message</label>
                  <textarea 
                    required
                    rows={5}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:border-[#001b3d] focus:ring-1 focus:ring-[#001b3d] transition-colors resize-none"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-[#051121] hover:bg-blue-900 text-white font-bold py-4 rounded-lg transition-colors shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending..." : "Submit Inquiry"}
                </button>

                {isSuccess && (
                  <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm font-medium">
                    Your inquiry has been sent successfully. We will contact you soon.
                  </div>
                )}
              </form>
            </div>
            
          </div>
        </div>
      </div>
    </main>
  );
}
