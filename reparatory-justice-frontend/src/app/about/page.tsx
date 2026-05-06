import React from 'react';
import LeadershipCard from '@/components/LeadershipCard';
import Breadcrumb from '@/components/Breadcrumb';

export default function AboutPage() {
  const coreValues = [
    {
      title: "Diplomacy & Dialogue",
      description: "We believe in the power of peaceful negotiation and constructive dialogue to resolve global challenges and build lasting international partnerships.",
      icon: "🤝"
    },
    {
      title: "Integrity & Service",
      description: "We conduct the nation's foreign affairs with the highest standards of professionalism, transparency, and dedication to the Ghanaian people.",
      icon: "⚖️"
    },
    {
      title: "Pan-Africanism",
      description: "We remain deeply committed to the unity, integration, and prosperity of the African continent as a cornerstone of our foreign policy.",
      icon: "🌍"
    }
  ];

  return (
    <main className="bg-white min-h-screen pt-24 md:pt-32">
      {/* Breadcrumb */}
      <Breadcrumb paths={[{ name: "About Us", href: "/about" }]} />

      {/* Hero Section */}
      <section className="bg-[#0b1f3a] text-white pt-40 pb-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight font-serif">
            About the Ministry
          </h1>
          <p className="text-xl text-slate-300 font-light leading-relaxed">
            Advancing Ghana's interests abroad, protecting our citizens, and promoting international peace and security.
          </p>
        </div>
      </section>

      {/* Our Mandate */}
      <section className="py-24 px-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-1 bg-accent"></div>
          <h2 className="text-[#001b3d] font-bold uppercase tracking-widest text-sm">Our Mandate</h2>
        </div>
        <h3 className="text-3xl md:text-4xl font-bold text-[#051121] mb-8 leading-tight font-serif">
          Protecting Ghanaian Interests in a Complex Global Landscape
        </h3>
        <div className="prose prose-lg text-slate-600 prose-p:leading-relaxed max-w-none font-light">
          <p className="mb-6">
            The Ministry of Foreign Affairs and Regional Integration is the principal organ of state responsible for the administrative and policy direction of Ghana's foreign relations. Our primary objective is to safeguard the sovereignty, territorial integrity, and economic prosperity of the Republic of Ghana.
          </p>
          <p>
            Through our network of diplomatic missions worldwide, we provide vital consular assistance to Ghanaians abroad, facilitate international trade and investment, and actively participate in multilateral forums to address global challenges such as climate change, regional security, and sustainable development.
          </p>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-slate-50 py-24 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#051121] mb-4 font-serif">Our Core Values</h2>
            <div className="w-24 h-1 bg-accent mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {coreValues.map((value, index) => (
              <div key={index} className="bg-white p-10 rounded-2xl shadow-sm border border-slate-100 text-center hover:shadow-lg transition-shadow duration-300">
                <div className="text-5xl mb-6">{value.icon}</div>
                <h4 className="text-xl font-bold text-[#051121] mb-4">{value.title}</h4>
                <p className="text-slate-600 font-light leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Directory */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-[#051121] mb-4 font-serif">Executive Leadership</h2>
          <div className="w-24 h-1 bg-accent mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <LeadershipCard 
            name="H.E. John Dramani Mahama" 
            title="President of the Republic" 
            imageUrl="/assets/2.png" 
          />
          <LeadershipCard 
            name="H.E. Naana Jane Opoku-Agyemang" 
            title="Vice President" 
            imageUrl="/assets/1.png" 
          />
          <LeadershipCard 
            name="Hon. Samuel Okudzeto Ablakwa" 
            title="Minister for Foreign Affairs" 
            imageUrl="/assets/3.jpg" 
          />
        </div>
      </section>
    </main>
  );
}
