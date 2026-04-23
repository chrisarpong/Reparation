import React from "react";
import Link from "next/link";
import RegistrationForm from "@/components/RegistrationForm"; 

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      
      {/* --- LEFT COLUMN: BRANDING (Hidden on mobile, takes 40% of screen on desktop) --- */}
      <div className="hidden lg:flex lg:w-2/5 bg-[#051121] relative flex-col justify-between p-12 overflow-hidden border-r border-white/10">
        
        {/* Subtle Background Accent */}
        <div className="absolute top-0 left-0 w-full h-1 bg-orange-500"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top: Logo */}
        <div className="relative z-10">
          <Link href="/en" className="inline-block">
            {/* IMPORTANT: Ensure this filename exactly matches the one working on your landing page! */}
            <img 
              src="/assets/MFA Logo 2.png" 
              alt="Ministry of Foreign Affairs" 
              className="h-10 md:h-12 w-auto object-contain drop-shadow-md scale-[1.5] md:scale-[2.0] origin-left"
            />
          </Link>
        </div>

        {/* Middle: Contextual Text */}
        <div className="relative z-10 my-auto pt-20">
          <h1 className="text-3xl xl:text-4xl font-light text-white font-serif leading-tight mb-6">
            Official Delegate <br />
            <span className="font-extrabold font-sans text-slate-200">Registration</span>
          </h1>
          <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
            Please complete the form with your official credentials. All applications are subject to review by the Ministry's protocol directorate prior to final accreditation.
          </p>
        </div>

        {/* Bottom: Support Link */}
        <div className="relative z-10 text-xs text-slate-500">
          Need assistance? Contact <a href="mailto:protocol@mfa.gov.gh" className="text-orange-500 hover:underline">protocol@mfa.gov.gh</a>
        </div>
      </div>

      {/* --- RIGHT COLUMN: THE FORM (Takes 100% on mobile, 60% on desktop) --- */}
      <div className="w-full lg:w-3/5 flex flex-col items-center justify-center p-6 sm:p-12 md:p-20 relative">
        
        {/* Mobile-only Back Button */}
        <div className="w-full max-w-2xl lg:hidden flex justify-end items-center mb-6">
          <Link href="/en" className="text-xs font-bold text-slate-500 uppercase tracking-widest hover:text-orange-500 transition-colors">
            &larr; Back to Home
          </Link>
        </div>

        {/* The White Registration Card */}
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          
          <div className="p-8 sm:p-12">
            
            {/* --- NEW: FORM HEADER WITH SCALED LOGO --- */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-8 pb-8 border-b border-slate-100 gap-6">
              <div>
                <h2 className="text-2xl font-bold text-[#051121] mb-2">Submit Credentials</h2>
                <p className="text-slate-500 text-sm">
                  Ensure all information matches your official travel documents.
                </p>
              </div>
              
              {/* Logo on the Forms Side */}
              <div className="shrink-0 pt-2">
                 {/* IMPORTANT: Ensure this filename exactly matches the one working on your landing page! */}
                 <img 
                   src="/assets/MFA Logo.png" 
                   alt="MFA Logo" 
                   className="h-8 md:h-10 w-auto object-contain scale-[1.5] origin-left sm:origin-right" 
                 />
              </div>
            </div>

            {/* HERE WE MOUNT YOUR EXISTING 2-STEP FORM COMPONENT */}
            <RegistrationForm />
            
          </div>
          
        </div>

      </div>
    </div>
  );
}