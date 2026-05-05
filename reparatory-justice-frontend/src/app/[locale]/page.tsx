"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import React from "react";
import { useTranslations, useLocale } from "next-intl";

export default function LandingPage() {
  const t = useTranslations("Index");
  const locale = useLocale();
  const [isScrolled, setIsScrolled] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // 3. State for the FAQ Accordion
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: t('faq_q1'),
      answer: t('faq_a1')
    },
    {
      question: t('faq_q2'),
      answer: t('faq_a2')
    },
    {
      question: t('faq_q3'),
      answer: t('faq_a3')
    },
    {
      question: t('faq_q4'),
      answer: t('faq_a4')
    }
  ];

  useEffect(() => {
    // Handle the Header Scroll Effect
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);

    // Handle Countdown Timer (Targeting April 24, 2026)
    // NOTE: We will hook this up to the Django API later so the admin can change it!
    const targetDate = new Date("2026-04-24T09:00:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
    };
  }, []);

  return (
    <main className="bg-white text-gray-900 overflow-x-hidden">
      {/* Inline styles for the infinite Marquee animation */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: 200%;
          animation: marquee 20s linear infinite;
        }
      `}} />

      {/* SMART HEADER */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? "bg-[#0b1f3a]/95 backdrop-blur-md py-3 shadow-lg border-b border-white/10" 
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* Official Ministry Logo */}
          <Link href="/" className="flex items-center z-50">
            <img 
              src="/assets/MFA LOGO 2.png" 
              alt="Ministry of Foreign Affairs, Republic of Ghana" 
              className="h-12 md:h-16 w-auto object-contain drop-shadow-md scale-[1.0] md:scale-[1.5] origin-left"
            />
          </Link>

          {/* Desktop Navigation & Actions */}
          <div className="hidden lg:flex items-center gap-8">
            <nav className="flex items-center gap-6 text-sm font-medium text-slate-300">
              <a href="#about" className="hover:text-white transition-colors">{t('nav_about')}</a>
              <a href="#focus" className="hover:text-white transition-colors">{t('nav_focus')}</a>
              <a href="#participate" className="hover:text-white transition-colors">{t('nav_participate')}</a>
            </nav>
            
            <div className="flex items-center gap-6 border-l border-white/10 pl-6">
              
              {/* --- NEW: LANGUAGE SWITCHER --- */}
              <div className="flex items-center gap-3 text-xs font-bold tracking-widest">
                <Link href="/en" className="text-orange-500 hover:text-orange-400 transition-colors">EN</Link>
                <span className="text-white/20">|</span>
                <Link href="/fr" className="text-slate-400 hover:text-white transition-colors">FR</Link>
              </div>

              <Link 
                href={`/${locale}/register`} 
                className="bg-orange-600 hover:bg-orange-500 text-white px-6 py-2.5 rounded shadow-[0_0_15px_rgba(234,88,12,0.3)] transition-all font-semibold tracking-wide"
              >
                {t('nav_register')}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-[#0b1f3a] via-[#0e2a52] to-[#08172b] text-white overflow-hidden pt-20">
        
        {/* Decorative gradient shapes */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-orange-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-[-200px] left-[-200px] w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col justify-center">
          
          {/* Meta badge */}
          <div className="inline-flex items-center gap-3 bg-white/10 border border-white/10 px-4 py-2 rounded-full text-sm text-gray-200 mb-8 w-fit">
            <span className="text-orange-400">📍 {t('location_badge').split(' • ')[0]}</span>
            <span className="opacity-50">•</span>
            <span>{t('location_badge').split(' • ')[1]}</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight max-w-4xl mb-6 tracking-tight">
            {t('title')}
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-10 font-light leading-relaxed">
            {t('subtitle')}
          </p>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-6">
            <Link
              href={`/${locale}/register`}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-md font-bold text-lg transition-all shadow-[0_0_20px_rgba(249,115,22,0.4)] flex items-center gap-2 group"
            >
              {t('cta_register')}
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>

            <a href="#about" className="text-sm font-semibold tracking-widest uppercase hover:text-orange-400 transition-colors flex items-center gap-2">
              {t('cta_learn')}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* COUNTDOWN */}
      <section className="bg-[#08172b] py-12 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 flex justify-center gap-8 md:gap-16 text-center">
          <div className="flex flex-col items-center">
            <span className="text-4xl md:text-6xl font-light text-orange-500 font-serif tabular-nums tracking-tighter">
              {String(timeLeft.days).padStart(2, '0')}
            </span>
            <span className="text-xs tracking-[0.2em] text-gray-400 mt-3 font-semibold uppercase">{t('countdown_days')}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl md:text-6xl font-light text-orange-500 font-serif tabular-nums tracking-tighter">
              {String(timeLeft.hours).padStart(2, '0')}
            </span>
            <span className="text-xs tracking-[0.2em] text-gray-400 mt-3 font-semibold uppercase">{t('countdown_hours')}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl md:text-6xl font-light text-orange-500 font-serif tabular-nums tracking-tighter">
              {String(timeLeft.minutes).padStart(2, '0')}
            </span>
            <span className="text-xs tracking-[0.2em] text-gray-400 mt-3 font-semibold uppercase">{t('countdown_minutes')}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl md:text-6xl font-light text-orange-500 font-serif tabular-nums tracking-tighter">
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
            <span className="text-xs tracking-[0.2em] text-gray-400 mt-3 font-semibold uppercase">{t('countdown_seconds')}</span>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="bg-[#051121] border-y border-white/5 py-4 overflow-hidden flex whitespace-nowrap">
        <div className="animate-marquee flex items-center text-xs font-bold tracking-[0.2em] text-gray-400 uppercase">
          {[1, 2].map((loopIndex) => (
            <React.Fragment key={loopIndex}>
              <span className="mx-6 text-orange-500">✦</span>
              <span>Diplomacy</span>
              <span className="mx-6 text-orange-500">✦</span>
              <span>Justice Frameworks</span>
              <span className="mx-6 text-orange-500">✦</span>
              <span>Pan-Africanism</span>
              <span className="mx-6 text-orange-500">✦</span>
              <span>Global Dialogue</span>
              <span className="mx-6 text-orange-500">✦</span>
              <span>Reparations</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* --- LEADERSHIP & DISTINGUISHED GUESTS --- */}
      <section className="bg-[#051121] py-28 text-white border-t border-white/5 relative overflow-hidden">
        
        {/* Subtle decorative accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          
          <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-20 tracking-tight leading-tight">
            {t('leadership_title_1')}<span className="text-orange-500">{t('leadership_title_2')}</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-16">

            {/* CARD 1 - H.E. THE PRESIDENT (John Dramani Mahama) */}
            <div className="flex flex-col items-center group">
              {/* Substantial Tall Block with Subtle Interactivity */}
              <div className="w-80 h-96 mb-10 overflow-hidden rounded-xl border border-white/10 shadow-xl group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-orange-500/20 transition-all duration-300 relative bg-slate-800">
                
                {/* Subtle internal border glow on hover */}
                <div className="absolute inset-0 rounded-xl border border-orange-500/0 group-hover:border-orange-500/30 transition-all duration-300 z-10"></div>
                
                {/* Photo */}
                <div className="w-full h-full">
                  <img 
                    src="/assets/2.png" 
                    alt="His Excellency John Dramani Mahama" 
                    className="w-full h-full object-cover object-top transition-all duration-300" 
                  />
                </div>
              </div>
              
              {/* Details (Centered below the new square frame) */}
              <h4 className="font-extrabold text-2xl tracking-tight mb-2 text-center text-white">H.E. John Dramani Mahama</h4>
              <p className="text-orange-400 font-semibold text-sm tracking-widest uppercase text-center">{t('president_title')}</p>
            </div>

            {/* CARD 2 - H.E. THE VICE PRESIDENT (Naana Jane Opoku-Agyemang) */}
            <div className="flex flex-col items-center group">
              <div className="w-80 h-96 mb-10 overflow-hidden rounded-xl border border-white/10 shadow-xl group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-orange-500/20 transition-all duration-300 relative bg-slate-800">
                <div className="absolute inset-0 rounded-xl border border-orange-500/0 group-hover:border-orange-500/30 transition-all duration-300 z-10"></div>
                <div className="w-full h-full">
                  <img 
                    src="/assets/1.png" 
                    alt="Her Excellency Naana Jane Opoku-Agyemang" 
                    className="w-full h-full object-cover object-top transition-all duration-300" 
                  />
                </div>
              </div>
              
              <h4 className="font-extrabold text-2xl tracking-tight mb-2 text-center text-white">H.E. Naana Jane Opoku-Agyemang</h4>
              <p className="text-orange-400 font-semibold text-sm tracking-widest uppercase text-center">{t('vp_title')}</p>
            </div>

            {/* CARD 3 - THE HON. MINISTER (Hon. Samuel Okudzeto Ablakwa) */}
            <div className="flex flex-col items-center group">
              <div className="w-80 h-96 mb-10 overflow-hidden rounded-xl border border-white/10 shadow-xl group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-orange-500/20 transition-all duration-300 relative bg-slate-800">
                <div className="absolute inset-0 rounded-xl border border-orange-500/0 group-hover:border-orange-500/30 transition-all duration-300 z-10"></div>
                <div className="w-full h-full">
                  <img 
                    src="/assets/3.jpg" 
                    alt="Hon. Samuel Okudzeto Ablakwa" 
                    className="w-full h-full object-cover object-top transition-all duration-300" 
                  />
                </div>
              </div>
              
              <h4 className="font-extrabold text-2xl tracking-tight mb-2 text-center text-white leading-tight">Hon. Samuel Okudzeto Ablakwa</h4>
              <p className="text-orange-400 font-semibold text-sm tracking-widest uppercase text-center leading-tight">{t('minister_title')}</p>
            </div>

          </div>
        </div>
      </section>

      {/* --- ABOUT THE PROGRAMME (Diaspora Summit Style) --- */}
      <section id="about" className="bg-gradient-to-br from-[#0b1f3a] to-[#051121] py-28 border-t border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          {/* Section Heading */}
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white uppercase tracking-widest mb-4 drop-shadow-md">
              {t('about_title')}
            </h2>
            {/* Subtle decorative line matching our theme colors */}
            <div className="h-1 w-24 mx-auto flex rounded-full overflow-hidden shadow-[0_0_10px_rgba(249,115,22,0.5)]">
              <div className="h-full w-1/2 bg-orange-500"></div>
              <div className="h-full w-1/2 bg-blue-500"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Column: Minister's Polaroid Card (Spans 5 columns) */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="bg-white p-5 rounded-xl shadow-2xl max-w-sm w-full transform hover:-translate-y-2 transition-transform duration-300">
                <div className="rounded-lg overflow-hidden mb-6 bg-slate-100 aspect-[4/5] border border-gray-200">
                  <img 
                    src="/assets/3.jpg" 
                    alt="Hon. Samuel Okudzeto Ablakwa" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center pb-2">
                  <h3 className="text-xl font-extrabold text-[#051121] tracking-tight mb-1">
                    HON. SAMUEL OKUDZETO ABLAKWA
                  </h3>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
                    {t('minister_title')}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Text Content (Spans 7 columns) */}
            <div className="lg:col-span-7 space-y-6 text-slate-300 text-lg md:text-xl font-light leading-relaxed max-w-2xl">
              <p>
                {t('about_p1')}
              </p>
              <p>
                {t('about_p2')}
              </p>
              
              <div className="pt-8">
                <a 
                  href="#focus" 
                  className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm tracking-wide px-8 py-3.5 rounded-full transition-all shadow-[0_0_15px_rgba(249,115,22,0.3)] hover:shadow-[0_0_25px_rgba(249,115,22,0.5)]"
                >
                  {t('about_read_more')}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="bg-[#030914] py-28 border-t border-white/5 relative z-10">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-16">
          
          {/* Left Column: Heading (Matches 3i Africa Style) */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-0.5 bg-orange-500"></div>
              <span className="text-orange-500 text-xs font-bold tracking-[0.2em] uppercase">
                {t('faq_eyebrow')}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-light text-white tracking-tight font-serif">
              {t('faq_title_1')}<br />
              <span className="font-extrabold text-slate-300 font-sans">{t('faq_title_2')}</span>
            </h2>
          </div>

          {/* Right Column: Accordion List */}
          <div className="md:col-span-7 flex flex-col justify-center">
            <div className="border-t border-white/10">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-white/10">
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full py-6 flex items-center justify-between text-left focus:outline-none group"
                  >
                    <span className="text-lg font-medium text-white group-hover:text-orange-400 transition-colors">
                      {faq.question}
                    </span>
                    <span className={`ml-6 flex-shrink-0 text-orange-500 transition-transform duration-300 ${openFaq === index ? "rotate-180" : ""}`}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>
                  
                  {/* Expanding Answer Section */}
                  <div 
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      openFaq === index ? "max-h-40 opacity-100 pb-6" : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="text-slate-400 font-light leading-relaxed pr-8">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* --- STAY IN THE LOOP / NEWSLETTER --- */}
      <section className="bg-[#051121] py-24 border-t border-white/5 relative z-10 text-center">
        <div className="max-w-3xl mx-auto px-6">

          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-8 h-0.5 bg-orange-500"></div>
              <span className="text-orange-500 text-xs font-bold tracking-[0.2em] uppercase">
                {t('newsletter_eyebrow')}
              </span>
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-light text-white tracking-tight font-serif mb-4 drop-shadow-sm">
            {t('newsletter_title_1')}<span className="font-extrabold font-sans text-slate-200">{t('newsletter_title_2')}</span>
          </h2>

          {/* Subheading */}
          <p className="text-slate-400 mb-10 text-lg font-light leading-relaxed">
            {t('newsletter_subtitle')}
          </p>

          {/* Form Container */}
          <form className="max-w-xl mx-auto flex flex-col items-center gap-6" onSubmit={(e) => e.preventDefault()}>
            
            {/* Input & Button Row */}
            <div className="flex flex-col sm:flex-row w-full gap-4">
              <input
                type="email"
                placeholder={t('newsletter_placeholder')}
                className="flex-1 bg-[#030914] border border-white/10 rounded-lg px-6 py-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all shadow-inner"
                required
              />
              <button
                type="submit"
                className="bg-orange-600 hover:bg-orange-500 text-white font-bold tracking-wide px-10 py-4 rounded-lg shadow-[0_0_15px_rgba(234,88,12,0.2)] hover:shadow-[0_0_25px_rgba(234,88,12,0.4)] transition-all whitespace-nowrap"
              >
                {t('newsletter_button')}
              </button>
            </div>

            {/* Checkbox */}
            <div className="flex items-center gap-3 text-slate-300 text-sm mt-2">
              <input
                type="checkbox"
                id="updates"
                className="w-4 h-4 rounded border-white/20 bg-[#030914] text-orange-500 focus:ring-orange-500 focus:ring-offset-0 cursor-pointer"
                defaultChecked
              />
              <label htmlFor="updates" className="cursor-pointer select-none">
                {t('newsletter_checkbox')}
              </label>
            </div>

            {/* Disclaimer */}
            <p className="text-xs text-slate-500 mt-2">
              {t('newsletter_disclaimer_1')}<a href="#" className="underline hover:text-slate-300 transition-colors">{t('newsletter_disclaimer_privacy')}</a>{t('newsletter_disclaimer_2')}<a href="#" className="underline hover:text-slate-300 transition-colors">{t('newsletter_disclaimer_terms')}</a>{t('newsletter_disclaimer_3')}
            </p>
          </form>

        </div>
      </section>

      {/* --- COMPREHENSIVE FOOTER --- */}
      <footer className="bg-[#030914] pt-20 pb-8 border-t border-white/10 text-slate-300 relative overflow-hidden">
        
        {/* Blended Background Image Container */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img 
            src="/assets/footer 2.png" 
            alt="Background texture" 
            className="w-full h-full object-cover opacity-40 mix-blend-luminosity"
          />
          {/* Gradient overlay to smoothly fade the image into the dark background */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#030914] via-[#030914]/50 to-[#030914]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          {/* Top Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            
            {/* Column 1: Brand & Socials */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-white drop-shadow-md">
                <div className="w-10 h-10 bg-orange-500 rounded flex items-center justify-center font-bold text-xs text-[#051121]">
                  GH
                </div>
                <div className="font-bold text-lg leading-tight">
                  {t('footer_title')}
                </div>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed pr-4 drop-shadow-sm">
                {t('footer_desc')}
              </p>
              
              {/* Social Media Buttons */}
              <div className="flex gap-3 pt-2">
                {[
                  { name: 'In', url: 'https://gh.linkedin.com/company/mfarighana' },
                  { name: 'X', url: 'https://x.com/GhanaMFA' },
                  { name: 'Fb', url: 'https://web.facebook.com/mfarighana/?_rdc=1&_rdr#' },
                  { name: 'Ig', url: 'https://www.instagram.com/ghanamfa/' }
                ].map(social => (
                  <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-orange-500 hover:border-orange-500 hover:text-white transition-all text-sm font-medium bg-[#030914]/50 backdrop-blur-sm">
                    {social.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2: The Agenda Links */}
            <div>
              <h4 className="text-white font-semibold mb-6 drop-shadow-md">{t('footer_agenda')}</h4>
              <ul className="space-y-4 text-sm">
                <li><a href="#" className="hover:text-orange-500 transition-colors drop-shadow-sm">{t('footer_overview')}</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors drop-shadow-sm">{t('footer_speakers')}</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors drop-shadow-sm">{t('footer_tracks')}</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors drop-shadow-sm">{t('footer_schedule')}</a></li>
              </ul>
            </div>

            {/* Column 3: Get Involved Links */}
            <div>
              <h4 className="text-white font-semibold mb-6 drop-shadow-md">{t('footer_involved')}</h4>
              <ul className="space-y-4 text-sm">
                <li><Link href={`/${locale}/register`} className="hover:text-orange-500 transition-colors drop-shadow-sm">{t('footer_del_reg')}</Link></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors drop-shadow-sm">{t('footer_media')}</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors drop-shadow-sm">{t('footer_travel')}</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors drop-shadow-sm">{t('footer_protocol')}</a></li>
              </ul>
            </div>

            {/* Column 4: Contact Information */}
            <div>
              <h4 className="text-white font-semibold mb-6 drop-shadow-md">{t('footer_contact')}</h4>
              <ul className="space-y-4 text-sm text-slate-400">
                <li className="flex items-start gap-3 drop-shadow-sm">
                  <svg className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  <span>{t('footer_address_1')}<br/>{t('footer_address_2')}<br/>{t('footer_address_3')}</span>
                </li>
                <li className="flex items-center gap-3 drop-shadow-sm">
                  <svg className="w-5 h-5 text-orange-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  <span>+233 (0) 30 274 8100</span>
                </li>
                <li className="flex items-center gap-3 drop-shadow-sm">
                  <svg className="w-5 h-5 text-orange-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  <span>protocol@mfa.gov.gh</span>
                </li>
                <li className="flex items-center gap-3 drop-shadow-sm">
                  <svg className="w-5 h-5 text-orange-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  <span>24th April 2026</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom Copyright & Legal Bar */}
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 relative z-10">
            <div>&copy; {new Date().getFullYear()}{t('footer_copyright')}</div>
            
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">{t('newsletter_disclaimer_privacy')}</a>
              <a href="#" className="hover:text-white transition-colors">{t('newsletter_disclaimer_terms')}</a>
            </div>

            <div className="flex items-center gap-2">
              {t('footer_engineered')}<span className="text-slate-300 font-medium tracking-wide">{t('footer_ict')}</span>
            </div>
          </div>

        </div>
      </footer>

    </main>
  );
}