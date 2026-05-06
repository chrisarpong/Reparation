"use client";

import { useState } from "react";
import React from "react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import HeroCarousel from "@/components/HeroCarousel";
import MissionCard from "@/components/MissionCard";

export default function LandingPage() {
  // State for the FAQ Accordion
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "What are the requirements for a biometric passport?",
      answer: "Applicants must provide proof of citizenship, a birth certificate, and previous passport details if applicable."
    },
    {
      question: "How long does a visa application take?",
      answer: "Standard visa processing takes 10-15 business days. Expedited services are available for an additional fee."
    },
    {
      question: "Can I apply for dual citizenship?",
      answer: "Yes, Ghana allows dual citizenship. You must apply through the Ministry of Interior via your nearest diplomatic mission."
    },
    {
      question: "Where can I find my nearest embassy?",
      answer: "Please visit our Missions Abroad page to find the directory of all Embassies and High Commissions."
    }
  ];

  // State for the Newsletter Signup
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call to Resend
    console.log("Subscribing email:", email);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    toast.success('Successfully subscribed to official updates.');
    setEmail("");
  };

  return (
    <main className="bg-white text-gray-900 overflow-x-hidden pt-10 md:pt-16">


      {/* HERO CAROUSEL */}
      <HeroCarousel />



      {/* --- GLOBAL DIPLOMATIC FOOTPRINT (CSS DASHBOARD) --- */}
      <section className="bg-[#051121] py-24 border-t border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 tracking-tight text-white">
              Our Global Diplomatic Footprint
            </h2>
            <div className="w-24 h-1 bg-accent mx-auto rounded-full"></div>
          </div>

          {/* Statistics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20 text-center">
            <div>
              <div className="text-6xl font-black text-white mb-4 tracking-tighter">112+</div>
              <div className="text-white font-semibold uppercase tracking-wider text-sm">Diplomatic Missions Worldwide</div>
            </div>
            <div>
              <div className="text-6xl font-black text-white mb-4 tracking-tighter">193</div>
              <div className="text-white font-semibold uppercase tracking-wider text-sm">UN Member States Engaged</div>
            </div>
            <div>
              <div className="text-6xl font-black text-white mb-4 tracking-tighter">5</div>
              <div className="text-white font-semibold uppercase tracking-wider text-sm">Continents with active Consular presence</div>
            </div>
          </div>

          {/* Mission Showcase Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <MissionCard 
              country="United States of America"
              city="Washington, D.C."
              address="3512 International Drive NW, Washington, DC 20008, USA"
              phone="+1 (202) 686-4520"
              email="washington@mfa.gov.gh"
              type="Embassy"
            />
            <MissionCard 
              country="United Kingdom"
              city="London"
              address="13 Belgrave Square, London SW1X 8PN, UK"
              phone="+44 (0) 20 7201 5900"
              email="london@mfa.gov.gh"
              type="High Commission"
            />
            <MissionCard 
              country="China"
              city="Beijing"
              address="No.8 Jian Guo Men Wai Avenue, Chaoyang District, Beijing, China"
              phone="+86 10 6532 1319"
              email="beijing@mfa.gov.gh"
              type="Embassy"
            />
          </div>
        </div>
      </section>

      {/* --- ABOUT SECTION --- */}
      <section id="about" className="bg-gradient-to-br from-[#0b1f3a] to-[#051121] py-28 border-t border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white uppercase tracking-widest mb-4 drop-shadow-md">
              About the Ministry
            </h2>
            <div className="h-1 w-24 mx-auto flex rounded-full overflow-hidden shadow-[0_0_10px_rgba(212,175,55,0.5)]">
              <div className="h-full w-1/2 bg-accent"></div>
              <div className="h-full w-1/2 bg-blue-500"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="bg-white p-5 rounded-xl shadow-2xl max-w-sm w-full transform hover:-translate-y-2 transition-transform duration-300">
                <div className="rounded-lg overflow-hidden mb-6 bg-slate-100 aspect-[4/5] border border-gray-200">
                  <img src="/assets/3.jpg" alt="Minister" className="w-full h-full object-cover" />
                </div>
                <div className="text-center pb-2">
                  <h3 className="text-xl font-extrabold text-[#051121] tracking-tight mb-1">HON. SHIRLEY AYORKOR BOTCHWEY</h3>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Minister for Foreign Affairs</p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7 space-y-6 text-slate-300 text-lg md:text-xl font-light leading-relaxed max-w-2xl">
              <p>The Ministry of Foreign Affairs and Regional Integration is the principal organ of state responsible for the administrative and proactive formulation, co-ordination and execution of Ghana's foreign policy.</p>
              <p>Our vision is to build a prosperous and peaceful Ghana, actively engaged in global affairs, protecting its citizens worldwide, and forging strategic partnerships for sustainable development.</p>
              <div className="pt-8">
                <Link href="/about" className="inline-flex items-center gap-2 bg-white hover:bg-gray-200 text-[#001b3d] font-bold text-sm tracking-wide px-8 py-3.5 rounded-full transition-all shadow-lg">
                  Read More
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="bg-[#030914] py-28 border-t border-white/5 relative z-10">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-16">
          <div className="md:col-span-5">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-0.5 bg-accent"></div>
              <span className="text-accent text-xs font-bold tracking-[0.2em] uppercase">Common Questions</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white tracking-tight">
              Frequently Asked<br />
              <span className="text-slate-300">Questions</span>
            </h2>
          </div>
          <div className="md:col-span-7 flex flex-col justify-center">
            <div className="border-t border-white/10">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-white/10">
                  <button onClick={() => setOpenFaq(openFaq === index ? null : index)} className="w-full py-6 flex items-center justify-between text-left group">
                    <span className="text-lg font-medium text-white group-hover:text-gray-300 transition-colors">{faq.question}</span>
                    <span className={`ml-6 flex-shrink-0 text-white transition-transform duration-300 ${openFaq === index ? "rotate-180" : ""}`}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </span>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === index ? "max-h-40 opacity-100 pb-6" : "max-h-0 opacity-0"}`}>
                    <p className="text-slate-400 font-light leading-relaxed pr-8">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- NEWSLETTER --- */}
      <section className="bg-[#051121] py-24 border-t border-white/5 relative z-10 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-8 h-0.5 bg-accent"></div>
            <span className="text-accent text-xs font-bold tracking-[0.2em] uppercase">Stay Connected</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white tracking-tight mb-4">
            Subscribe to our <span className="text-slate-200">Newsletter</span>
          </h2>
          <p className="text-slate-400 mb-10 text-lg font-light leading-relaxed">Get the latest news, updates, and announcements from the Ministry.</p>
          <form className="max-w-xl mx-auto flex flex-col items-center gap-6" onSubmit={handleNewsletterSubmit}>
            <div className="flex flex-col sm:flex-row w-full gap-4">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-[#030914] border border-white/10 rounded-lg px-6 py-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-white" 
                required 
              />
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-white hover:bg-gray-200 text-[#001b3d] font-bold tracking-wide px-10 py-4 rounded-lg transition-all disabled:opacity-50"
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </button>
            </div>
            {isSuccess && (
              <p className="text-green-500 font-bold animate-fade-in">
                Thank you for subscribing!
              </p>
            )}
            <div className="flex items-center gap-3 text-slate-300 text-sm mt-2">
              <input type="checkbox" id="updates" className="w-4 h-4 rounded border-white/20 bg-[#030914] text-[#001b3d]" defaultChecked />
              <label htmlFor="updates" className="cursor-pointer">I agree to receive updates from the Ministry</label>
            </div>
          </form>
        </div>
      </section>


    </main>
  );
}