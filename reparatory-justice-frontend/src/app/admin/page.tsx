"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { fetchApi } from "@/lib/apiClient";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("Delegates");
  const [delegates, setDelegates] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Modal states
  const [selectedDelegate, setSelectedDelegate] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchDelegates = () => {
    setLoading(true);
    fetchApi('/registrations/admin-list/')
      .then((data) => {
        setDelegates(data || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch delegates:", error);
        if (error.message && error.message.includes("401") || error.message.toLowerCase().includes("unauthorized") || error.message.toLowerCase().includes("authentication credentials were not provided")) {
          // If unauthorized, redirect to login
          window.location.href = `/admin/login`;
        }
        setLoading(false);
      });
  };

  useEffect(() => {
    if (activeTab === "Delegates") {
      fetchDelegates();
    }
  }, [activeTab]);

  const filteredDelegates = delegates.filter(d => {
    const query = searchQuery.toLowerCase();
    const fullName = `${d.first_name} ${d.last_name}`.toLowerCase();
    const country = (d.country_residence || "").toLowerCase();
    return fullName.includes(query) || country.includes(query);
  });

  const openModal = (delegate: any) => {
    setSelectedDelegate(delegate);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDelegate(null);
  };

  const handleUpdateStatus = async (status: string) => {
    if (!selectedDelegate) return;
    setActionLoading(true);
    try {
      await fetchApi(`/registrations/admin-list/${selectedDelegate.id}/`, {
        method: "PATCH",
        body: JSON.stringify({ status })
      });
      closeModal();
      fetchDelegates();
    } catch (error) {
      console.error("Failed to update status:", error);
      alert("Failed to update the status. Please try again.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleExportCSV = () => {
    // 1. Create CSV headers
    const headers = ['ID', 'First Name', 'Last Name', 'Email', 'Category', 'Country', 'Status'];
    // 2. Map delegate data into CSV rows
    const csvRows = delegates.map(d => 
      [d.id, d.first_name, d.last_name, d.email, d.registration_type, d.country_residence, d.status].join(',')
    );
    // 3. Combine headers and rows
    const csvContent = [headers.join(','), ...csvRows].join('\n');
    
    // 4. Trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'MFA_Delegates_Export.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-800">
      
      {/* Sidebar */}
      <aside className="w-64 bg-[#051121] flex flex-col justify-between border-r border-slate-800 shadow-xl z-10">
        <div>
          <div className="h-20 flex items-center px-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white rounded text-[#051121] font-bold flex items-center justify-center text-xs">
                MFA
              </div>
              <span className="text-white font-bold tracking-wide">Protocol Portal</span>
            </div>
          </div>

          <nav className="p-4 space-y-2">
            <button 
              onClick={() => setActiveTab("Delegates")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeTab === "Delegates" 
                  ? "bg-white/10 text-white" 
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              Delegates
            </button>

            <button 
              onClick={() => setActiveTab("Settings")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeTab === "Settings" 
                  ? "bg-white/10 text-white" 
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              Settings
            </button>
          </nav>
        </div>
        
        <div className="p-4 border-t border-white/10">
          <Link href="/" className="flex items-center gap-3 text-sm text-slate-400 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            Back to Public Site
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 shadow-sm">
          <h1 className="text-xl font-bold text-slate-800">
            {activeTab === "Delegates" ? "Delegate Registrations" : "Portal Settings"}
          </h1>
          
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 font-semibold border border-slate-200">
              A
            </div>
            <div className="text-sm">
              <p className="font-bold text-slate-800">Admin User</p>
              <p className="text-slate-500 text-xs">Ministry Secretariat</p>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-8 relative">
          
          {activeTab === "Delegates" ? (
            <div className="space-y-6">
              
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div className="flex gap-4">
                  <div className="bg-white px-6 py-4 rounded-xl border border-slate-200 shadow-sm min-w-[160px]">
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Total Registrations</p>
                    <p className="text-3xl font-extrabold text-slate-800">{delegates.length}</p>
                  </div>
                  <div className="bg-white px-6 py-4 rounded-xl border border-slate-200 shadow-sm min-w-[160px]">
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Pending Approval</p>
                    <p className="text-3xl font-extrabold text-[#001b3d]">
                      {delegates.filter(d => (d.status || "Pending") === "Pending").length}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <input 
                    type="text" 
                    placeholder="Search delegates..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#001b3d] w-64 shadow-sm"
                  />
                  <button onClick={handleExportCSV} className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 shadow-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                    Export CSV
                  </button>
                </div>
              </div>

              {/* Data Table */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200">
                        <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">ID</th>
                        <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Delegate Info</th>
                        <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Category</th>
                        <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Country</th>
                        <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                        <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                        <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {loading ? (
                        <tr>
                          <td colSpan={7} className="py-12 text-center text-slate-500">Loading delegates...</td>
                        </tr>
                      ) : filteredDelegates.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="py-12 text-center text-slate-500">No delegates found.</td>
                        </tr>
                      ) : filteredDelegates.map((delegate) => (
                        <tr key={delegate.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="py-4 px-6">
                            <span className="text-sm font-mono text-slate-500">{delegate.id.substring(0, 8).toUpperCase()}</span>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex flex-col">
                              <span className="text-sm font-bold text-slate-800">{delegate.first_name} {delegate.last_name}</span>
                              <span className="text-xs text-slate-500">{delegate.email}</span>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                              {delegate.registration_type}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <span className="text-sm text-slate-600 font-medium">{delegate.country_residence}</span>
                          </td>
                          <td className="py-4 px-6">
                            <span className="text-sm text-slate-500">{new Date(delegate.created_at).toLocaleDateString()}</span>
                          </td>
                          <td className="py-4 px-6">
                            {delegate.status === "Approved" ? (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-green-50 text-green-700 border border-green-200">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                Approved
                              </span>
                            ) : delegate.status === "Rejected" ? (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-red-50 text-red-700 border border-red-200">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                                Rejected
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-yellow-50 text-yellow-700 border border-yellow-200">
                                <span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span>
                                {delegate.status || "Pending"}
                              </span>
                            )}
                          </td>
                          <td className="py-4 px-6 text-right">
                            <button 
                              onClick={() => openModal(delegate)}
                              className="text-sm text-[#001b3d] font-bold hover:text-blue-900 transition-colors bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-md"
                            >
                              Review
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center h-64">
              <svg className="w-12 h-12 text-slate-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Settings Portal Offline</h3>
              <p className="text-slate-500 text-sm max-w-sm">
                System configuration is currently restricted to lead administrators. Please contact the ICT Bureau for access.
              </p>
            </div>
          )}

        </div>
        
        {/* Review Modal */}
        {isModalOpen && selectedDelegate && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm overflow-y-auto pt-10 pb-10">
            <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
              
              <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">Review Delegate Registration</h2>
                  <p className="text-sm text-slate-500 mt-1">ID: {selectedDelegate.id}</p>
                </div>
                <button onClick={closeModal} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>

              <div className="p-8 overflow-y-auto flex-1">
                <div className="grid grid-cols-2 gap-y-6 gap-x-8">
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Full Name</p>
                    <p className="text-slate-800 font-semibold">{selectedDelegate.first_name} {selectedDelegate.last_name}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Email Address</p>
                    <p className="text-slate-800 font-semibold">{selectedDelegate.email}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Phone Number</p>
                    <p className="text-slate-800 font-semibold">{selectedDelegate.phone || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Category</p>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100 mt-1">
                      {selectedDelegate.registration_type}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Country of Residence</p>
                    <p className="text-slate-800 font-semibold">{selectedDelegate.country_residence}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Nationality</p>
                    <p className="text-slate-800 font-semibold">{selectedDelegate.nationality}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Organisation</p>
                    <p className="text-slate-800 font-semibold">{selectedDelegate.organisation || "N/A"} {selectedDelegate.designation ? `- ${selectedDelegate.designation}` : ""}</p>
                  </div>
                  {selectedDelegate.notes && (
                    <div className="col-span-2">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Additional Notes</p>
                      <p className="text-slate-700 text-sm bg-slate-50 p-4 rounded-lg border border-slate-100">{selectedDelegate.notes}</p>
                    </div>
                  )}
                  <div className="col-span-2 flex items-center justify-between border-t border-slate-100 pt-6 mt-2">
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Current Status</p>
                      {selectedDelegate.status === "Approved" ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-bold bg-green-50 text-green-700 border border-green-200">
                          <span className="w-2 h-2 rounded-full bg-green-500"></span>
                          Approved
                        </span>
                      ) : selectedDelegate.status === "Rejected" ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-bold bg-red-50 text-red-700 border border-red-200">
                          <span className="w-2 h-2 rounded-full bg-red-500"></span>
                          Rejected
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-bold bg-yellow-50 text-yellow-700 border border-yellow-200">
                          <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                          {selectedDelegate.status || "Pending"}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-8 py-6 bg-slate-50 border-t border-slate-200 flex justify-end gap-4">
                <button 
                  onClick={() => handleUpdateStatus("Rejected")}
                  disabled={actionLoading}
                  className="px-6 py-2.5 rounded-lg font-bold text-red-600 bg-red-50 border border-red-200 hover:bg-red-100 transition-colors disabled:opacity-50"
                >
                  Reject / Waitlist
                </button>
                <button 
                  onClick={() => handleUpdateStatus("Approved")}
                  disabled={actionLoading}
                  className="px-6 py-2.5 rounded-lg font-bold text-white bg-green-600 hover:bg-green-700 shadow-md shadow-green-600/20 transition-all disabled:opacity-50 flex items-center gap-2"
                >
                  {actionLoading ? "Processing..." : "Approve Delegate"}
                </button>
              </div>
              
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
