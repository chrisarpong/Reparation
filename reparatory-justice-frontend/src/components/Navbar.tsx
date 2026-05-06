"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaSearch, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? "bg-white/95 backdrop-blur-md py-3 shadow-lg border-b border-gray-100 mt-0" 
            : "bg-white backdrop-blur-sm py-6 mt-0 md:mt-10"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* Left: Ministry Crest & Text */}
          <Link href="/" className="flex items-center gap-3 z-50">
            <img 
              src="/assets/MFA LOGO 2.png" 
              alt="Ministry of Foreign Affairs" 
              className="h-10 md:h-12 w-auto object-contain"
            />
            <div className="flex flex-col">
              <span className="text-[#001b3d] font-bold text-sm md:text-base leading-tight">MINISTRY OF</span>
              <span className="text-[#001b3d] font-bold text-sm md:text-base leading-tight text-nowrap">FOREIGN AFFAIRS</span>
            </div>
          </Link>

          {/* Center: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-[#001b3d]">
            <Link href="/" className="hover:text-accent transition-colors uppercase tracking-wider relative group">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-accent transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/about" className="hover:text-accent transition-colors uppercase tracking-wider relative group">
              About
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-accent transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/consular-services" className="hover:text-accent transition-colors uppercase tracking-wider text-nowrap relative group">
              Consular Services
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-accent transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/media" className="hover:text-accent transition-colors uppercase tracking-wider text-nowrap relative group">
              Media & Press
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-accent transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/missions" className="hover:text-accent transition-colors uppercase tracking-wider text-nowrap relative group">
              Missions Abroad
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-accent transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/contact" className="hover:text-accent transition-colors uppercase tracking-wider relative group">
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-accent transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>
          
          {/* Right: Search & Mobile Toggle */}
          <div className="flex items-center gap-4 lg:gap-6 z-50">
            <button className="text-[#001b3d] hover:text-accent transition-colors">
              <FaSearch className="text-lg" />
            </button>
            <Link href="/admin/login" className="hidden md:inline-block border-2 border-[#001b3d] text-[#001b3d] px-6 py-2 font-semibold hover:bg-[#001b3d] hover:text-white transition-colors">Portal Login</Link>
            <button 
              className="lg:hidden text-[#001b3d] hover:text-accent transition-colors text-2xl"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-[#001b3d] z-40 transition-transform duration-300 ease-in-out lg:hidden flex flex-col pt-32 px-8 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <nav className="flex flex-col gap-8 text-xl font-semibold text-white">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-accent transition-colors uppercase tracking-wider">Home</Link>
          <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-accent transition-colors uppercase tracking-wider">About</Link>
          <Link href="/consular-services" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-accent transition-colors uppercase tracking-wider">Consular Services</Link>
          <Link href="/media" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-accent transition-colors uppercase tracking-wider">Media & Press</Link>
          <Link href="/missions" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-accent transition-colors uppercase tracking-wider">Missions Abroad</Link>
          <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-accent transition-colors uppercase tracking-wider">Contact</Link>
          <div className="pt-8 border-t border-white/20 mt-4">
            <Link href="/admin/login" onClick={() => setIsMobileMenuOpen(false)} className="inline-block border-2 border-white text-white px-8 py-4 font-semibold hover:bg-white hover:text-[#001b3d] transition-colors w-full text-center">Portal Login</Link>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
