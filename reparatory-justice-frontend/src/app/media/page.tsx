import React from 'react';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import PressReleaseCard from '@/components/PressReleaseCard';
import EmptyState from '@/components/EmptyState';

export default function MediaPage() {
  const newsItems = [
    {
      date: "May 5, 2026",
      title: "Hon. Minister Attends Global Diplomacy Summit in New York",
      excerpt: "The Minister for Foreign Affairs joined world leaders to discuss emerging security frameworks and multilateral cooperation in the post-digital age.",
      imageUrl: "https://images.unsplash.com/photo-1574001594921-12c8a29b4e54?q=80&w=2070&auto=format&fit=crop",
    },
    {
      date: "May 3, 2026",
      title: "New E-Visa Processing Guidelines Announced for Diaspora",
      excerpt: "The Ministry has launched a streamlined digital portal to reduce processing times for visa applications by 50% for citizens abroad.",
      imageUrl: "https://images.unsplash.com/photo-1555848962-6e79363ec58f?q=80&w=2053&auto=format&fit=crop",
    },
    {
      date: "April 28, 2026",
      title: "Bilateral Trade Agreement Signed with European Partners",
      excerpt: "Ghana and EU member states have finalized a landmark agreement focusing on sustainable energy and tech infrastructure investment.",
      imageUrl: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop",
    },
    {
      date: "April 22, 2026",
      title: "Ministry Launches 'Diplomacy 2030' Strategic Framework",
      excerpt: "A new roadmap for Ghana's foreign policy has been unveiled, focusing on digital diplomacy and climate-resilient international relations.",
      imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
    }
  ];

  return (
    <main className="bg-slate-50 min-h-screen pt-24 md:pt-32 pb-24">
      {/* Breadcrumb */}
      <Breadcrumb paths={[{ name: "Media & Press", href: "/media" }]} />

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-[#001b3d] mb-4 tracking-tight border-l-4 border-accent pl-6 font-serif">
          Official Press Releases
        </h1>
        <p className="text-lg text-slate-600 pl-6 max-w-2xl font-light">
          Stay updated with the latest news, statements, and policy announcements from the Ministry of Foreign Affairs.
        </p>
      </div>

      {/* News Grid */}
      <div className="max-w-7xl mx-auto px-6">
        <h3 className="text-2xl font-bold text-[#001b3d] mb-8 border-b border-slate-200 pb-4 font-serif">
          Recent Announcements
        </h3>
        
        {newsItems.length === 0 ? (
          <EmptyState 
            title="No Announcements Found" 
            description="There are currently no official press releases to display. Please check back later for updates."
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-10">
            {newsItems.map((item, index) => (
              <PressReleaseCard 
                key={index}
                title={item.title}
                date={item.date}
                excerpt={item.excerpt}
                imageUrl={item.imageUrl}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
