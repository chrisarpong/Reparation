import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-slate-900 px-4 text-center">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Ministry or Official Emblem placeholder could go here */}
        <div className="w-20 h-20 bg-[#D4AF37]/20 rounded-full flex items-center justify-center mb-8 border border-[#D4AF37]/50">
          <svg className="w-10 h-10 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 21v-4m22 4v-4M5.5 17h13M5.5 17L3 13.5m2.5 3.5h13m0 0L21 13.5m-18 0l2.5-9h11l2.5 9m-16 0h16" />
          </svg>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-tight">
          Global Reparatory <br className="hidden md:block" /> Justice Programme
        </h1>
        
        <p className="mt-8 text-xl text-slate-400 max-w-2xl font-light">
          Official portal convened by the Ministry of Foreign Affairs, Republic of Ghana.
        </p>

        <div className="mt-12">
          <Link 
            href="/en/register"
            className="inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-white bg-[#003865] rounded-full shadow-2xl hover:bg-[#002140] hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#003865]/50"
          >
            Register to Participate
            <svg className="ml-3 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}
