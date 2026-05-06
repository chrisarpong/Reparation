"use client";

import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=80&w=2066&auto=format&fit=crop',
      title: "Advancing Ghana's Diplomatic Interests",
      subtitle: "Protecting our citizens worldwide and forging strategic partnerships for sustainable development."
    },
    {
      image: 'https://images.unsplash.com/photo-1552084117-56a987666449?q=80&w=2000&auto=format&fit=crop',
      title: "Global Dialogue & Cooperation",
      subtitle: "Fostering peace, security, and mutually beneficial relationships on the global stage."
    },
    {
      image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=2000&auto=format&fit=crop',
      title: "Dedicated Consular Services",
      subtitle: "Providing efficient and accessible services for Ghanaians home and abroad."
    },
    {
      image: 'https://images.unsplash.com/photo-1541888086925-920a0f914b49?q=80&w=2000&auto=format&fit=crop',
      title: "Promoting Trade & Investment",
      subtitle: "Showcasing Ghana's economic potential to the international community."
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative h-[80vh] md:h-screen w-full overflow-hidden bg-[#001b3d]">
      {slides.map((slide, index) => (
        <div 
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
        >
          {/* Background Image with Overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-black/50" />
          </div>

          {/* Content */}
          <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
            <h1 className="text-4xl md:text-7xl font-extrabold text-white mb-6 max-w-5xl leading-tight">
              {slide.title}
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl font-light">
              {slide.subtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 z-20">
              <button className="bg-[#001b3d] hover:bg-blue-900 border border-[#001b3d] text-white px-10 py-4 rounded font-bold transition-all shadow-lg">
                Consular Services
              </button>
              <button className="border-2 border-white bg-transparent hover:bg-white hover:text-[#001b3d] text-white px-10 py-4 rounded font-bold transition-all">
                Missions Abroad
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Left/Right Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all z-20"
        aria-label="Previous slide"
      >
        <FaChevronLeft className="text-xl" />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all z-20"
        aria-label="Next slide"
      >
        <FaChevronRight className="text-xl" />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
        {slides.map((_, idx) => (
          <button 
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`w-3 h-3 rounded-full transition-all ${idx === currentSlide ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'}`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;
