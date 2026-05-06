import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-[#030914] pt-20 pb-8 border-t border-white/5 text-slate-400 relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img src="/assets/footer 2.png" alt="Background" className="w-full h-full object-cover opacity-20 mix-blend-luminosity" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030914] via-[#030914]/80 to-[#030914]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-white">
              <div className="w-10 h-10 bg-accent rounded flex items-center justify-center font-bold text-xs text-[#001b3d]">GH</div>
              <div className="font-bold text-lg leading-tight">Ministry of<br/>Foreign Affairs</div>
            </div>
            <p className="text-sm leading-relaxed pr-4 font-light">Advancing Ghana's diplomatic interests and protecting her citizens worldwide through excellence in service and strategic international engagement.</p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs border-l-2 border-accent pl-3">Quick Links</h4>
            <ul className="space-y-4 text-sm font-light">
              <li><Link href="/about" className="hover:text-accent transition-colors">About the Ministry</Link></li>
              <li><Link href="/about" className="hover:text-accent transition-colors">Executive Leadership</Link></li>
              <li><Link href="/about" className="hover:text-accent transition-colors">Our Mandate</Link></li>
              <li><Link href="/about" className="hover:text-accent transition-colors">Career Opportunities</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs border-l-2 border-accent pl-3">Services & Info</h4>
            <ul className="space-y-4 text-sm font-light">
              <li><Link href="/consular-services" className="hover:text-accent transition-colors">Consular Services</Link></li>
              <li><Link href="/media" className="hover:text-accent transition-colors">Official Press Releases</Link></li>
              <li><Link href="/missions" className="hover:text-accent transition-colors">Ghana Missions Abroad</Link></li>
              <li><Link href="/contact" className="hover:text-accent transition-colors">Contact & Inquiries</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs border-l-2 border-accent pl-3">Contact Details</h4>
            <ul className="space-y-4 text-sm font-light">
              <li className="flex items-start gap-3">
                <span className="text-accent flex-shrink-0">📍</span>
                <span>Airport City Area,<br/>P. O. Box M53<br/>Accra, Ghana</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-accent flex-shrink-0">📞</span>
                <span>+233 (0) 30 274 8100</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-accent flex-shrink-0">✉️</span>
                <span>info@mfa.gov.gh</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest text-slate-500 relative z-10">
          <div>&copy; {new Date().getFullYear()} Ministry of Foreign Affairs, Republic of Ghana.</div>
          <div className="flex gap-8">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Use</Link>
          </div>
          <div className="flex items-center gap-2">
            Engineered by <span className="text-slate-300 font-bold">MFA ICT</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
