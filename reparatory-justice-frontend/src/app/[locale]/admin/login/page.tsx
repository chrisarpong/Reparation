"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { fetchApi } from "@/lib/apiClient";

export default function AdminLogin() {
  const router = useRouter();
  const locale = useLocale();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await fetchApi('/token/', {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });

      if (data.access && data.refresh) {
        localStorage.setItem("access_token", data.access);
        localStorage.setItem("refresh_token", data.refresh);
        router.push(`/${locale}/admin`);
      } else {
        setError("Invalid response from server.");
      }
    } catch (err: any) {
      setError(err.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#051121] font-sans">
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900 via-[#051121] to-[#051121]"></div>
      
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden z-10 relative">
        <div className="p-8 md:p-10">
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 bg-orange-500 rounded-lg flex items-center justify-center text-[#051121] font-bold text-xl shadow-lg">
              MFA
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-center text-slate-800 mb-2">Protocol Portal</h2>
          <p className="text-center text-slate-500 text-sm mb-8">Sign in to manage delegate registrations.</p>
          
          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-6 border border-red-100 text-center font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Username</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-colors"
                placeholder="Enter your username"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-colors"
                placeholder="••••••••"
                required
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-3.5 rounded-lg shadow-[0_0_15px_rgba(234,88,12,0.3)] transition-all disabled:opacity-70 flex items-center justify-center"
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : "Authenticate"}
            </button>
          </form>
        </div>
        
        <div className="bg-slate-50 px-8 py-4 border-t border-slate-100 text-center text-xs text-slate-500">
          Secure access restricted to authorized personnel only.
        </div>
      </div>
    </div>
  );
}
