'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
    Users,
    Search,
    Filter,
    Download,
    Check,
    X,
    AlertCircle,
    Lock,
    Mail,
    Smartphone,
    ExternalLink
} from 'lucide-react';

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [passphrase, setPassphrase] = useState('');
    const [authError, setAuthError] = useState('');

    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [stateFilter, setStateFilter] = useState('');
    const [paymentStatusFilter, setPaymentStatusFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    // Selected candidate for details pane
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [adminNotesText, setAdminNotesText] = useState('');

    const indianStates = [
        'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana',
        'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
        'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana',
        'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi (NCR)', 'Chandigarh (UT)', 'Jammu & Kashmir', 'Other'
    ];

    const handleLogin = (e) => {
        e.preventDefault();
        if (passphrase === 'nintmadmin2026' || passphrase === 'creativatorss') {
            setIsAuthenticated(true);
            fetchRegistrations();
        } else {
            setAuthError('Invalid administrator credentials.');
        }
    };

    const fetchRegistrations = () => {
        setLoading(true);
        const apiBase = '';
        let query = `${apiBase}/api/admin?search=${searchTerm}&state=${stateFilter}&status=${statusFilter}&paymentStatus=${paymentStatusFilter}`;
        fetch(query)
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setRegistrations(data.registrations);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching registrations:', err);
                setLoading(false);
            });
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchRegistrations();
        }
    }, [searchTerm, stateFilter, statusFilter, paymentStatusFilter, isAuthenticated]);

    const handleStatusUpdate = async (id, status) => {
        try {
            const apiBase = '';
            const res = await fetch(`${apiBase}/api/admin`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id,
                    action: 'updateStatus',
                    applicationStatus: status
                }),
            });
            const data = await res.json();
            if (data.success) {
                fetchRegistrations();
                if (selectedCandidate && (selectedCandidate.id === id || selectedCandidate.registrationId === id)) {
                    setSelectedCandidate({ ...selectedCandidate, applicationStatus: status });
                }
            } else {
                alert('Failed to modify status.');
            }
        } catch (e) {
            console.error(e);
            alert('Error updating status.');
        }
    };

    const handleSaveNotes = async (id) => {
        try {
            const apiBase = '';
            const res = await fetch(`${apiBase}/api/admin`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id,
                    adminNotes: adminNotesText
                }),
            });
            const data = await res.json();
            if (data.success) {
                alert('Director feedback saved successfully!');
                fetchRegistrations();
                if (selectedCandidate && (selectedCandidate.id === id || selectedCandidate.registrationId === id)) {
                    setSelectedCandidate({ ...selectedCandidate, adminNotes: adminNotesText });
                }
            } else {
                alert('Failed to save assessment feedback.');
            }
        } catch (e) {
            console.error(e);
            alert('Error saving notes.');
        }
    };

    const handleExportCSV = () => {
        if (registrations.length === 0) return;

        const apiBase = '';
        const photoUrlBase = apiBase || window.location.origin;

        const headers = [
            'Registration ID', 'Name', 'Instagram Username', 'Date of Birth', 'Email', 'Phone', 'WhatsApp',
            'Height (CM)', 'State', 'City', 'Pincode', 'Full Length Photo', 'Close-Up Photo', 'Payment Status', 'Payment Amount', 'Razorpay Payment ID', 'Registration Date'
        ];

        const rows = registrations.map(r => [
            r.registrationId || r.id,
            r.name || r.fullName,
            r.instagramUsername || '',
            r.dateOfBirth || r.dob || '',
            r.email || '',
            r.phone || '',
            r.whatsapp || '',
            r.height || '',
            r.state || '',
            r.city || '',
            r.pincode || '',
            r.fullLengthPhoto ? (`${photoUrlBase}/api/photo?url=${encodeURIComponent(r.fullLengthPhoto)}`) : '',
            r.closeUpPhoto ? (`${photoUrlBase}/api/photo?url=${encodeURIComponent(r.closeUpPhoto)}`) : '',
            r.paymentStatus || '',
            r.paymentAmount || 0,
            r.razorpayPaymentId || '',
            r.createdAt || ''
        ]);

        let csvContent = "data:text/csv;charset=utf-8,"
            + [headers.join(","), ...rows.map(e => e.map(val => `"${String(val).replace(/"/g, '""')}"`).join(","))].join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `nintm_registrations_${new Date().toISOString().slice(0, 10)}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#081C3A] text-white selection:bg-[#D4AF37] selection:text-[#081C3A]">
            <Navbar />

            <main className="flex-grow pt-40 pb-24 px-6 md:px-12 max-w-7xl mx-auto w-full">
                {!isAuthenticated ? (
                    <div className="max-w-md mx-auto bg-[#0B2347] border border-[#D4AF37]/25 p-8 md:p-10 text-center space-y-6 animate-fade-in my-8 shadow-2xl">
                        <Lock className="w-10 h-10 text-[#D4AF37] mx-auto" />
                        <div className="space-y-2">
                            <h2 className="font-serif text-2xl text-white font-light uppercase">NINTM Admin Portal</h2>
                            <p className="text-[10px] text-[#D9E1EC]/70 leading-relaxed font-sans font-normal">
                                Access is restricted to authorized representatives. Enter the administration passphrase to access candidate records.
                            </p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-4 pt-2">
                            <div className="space-y-2 text-left">
                                <label className="text-[9px] uppercase tracking-wider text-[#D9E1EC]/70 font-bold block">
                                    ADMINISTRATOR PASSPHRASE
                                </label>
                                <input
                                    type="password"
                                    value={passphrase}
                                    onChange={(e) => setPassphrase(e.target.value)}
                                    placeholder="Enter panel passcode"
                                    className="w-full bg-[#081C3A] border border-[#D4AF37]/20 focus:border-[#D4AF37] py-3 px-4 text-center tracking-widest text-white outline-none text-xs transition-all animate-none"
                                    required
                                />
                            </div>
                            {authError && (
                                <p className="text-red-400 text-[10px] font-bold">{authError}</p>
                            )}
                            <button
                                type="submit"
                                className="w-full py-3 bg-[#D4AF37] hover:bg-[#081C3A] text-[#081C3A] hover:text-[#D4AF37] border border-transparent hover:border-[#D4AF37] font-bold text-xs tracking-wider transition-all duration-300 uppercase"
                            >
                                DECRYPT ARCHIVES
                            </button>
                        </form>
                        <div className="pt-4 text-[9px] text-[#D9E1EC]/50 font-sans leading-relaxed border-t border-[#D4AF37]/20 font-normal">
                            Passphrase: <code className="text-[#D4AF37] font-mono font-bold">creativatorss</code> or <code className="text-[#D4AF37] font-mono font-bold">nintmadmin2026</code>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-8 animate-fade-in font-sans text-xs">
                        {/* Header info */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-[#D4AF37]/25 pb-6">
                            <div>
                                <span className="text-[10px] text-[#D4AF37] tracking-[0.2em] font-extrabold uppercase font-sans">
                                    CREATIVATORSS BACKOFFICE
                                </span>
                                <h1 className="font-serif text-3xl font-light uppercase text-white mt-1">
                                    Director Management Panel
                                </h1>
                                <span className="text-[#D9E1EC]/65 text-[10px] block mt-1 font-normal font-sans">
                                    Auditions dashboard for NINTM – The Comeback 2026. Verified registry database logs.
                                </span>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={handleExportCSV}
                                    disabled={registrations.length === 0}
                                    className="px-5 py-2.5 bg-transparent border border-[#D4AF37] hover:bg-[#D4AF37] text-[#D4AF37] hover:text-[#081C3A] transition-all duration-300 text-[11px] tracking-wider inline-flex items-center gap-2 font-bold"
                                >
                                    <Download className="w-3.5 h-3.5" /> EXPORT SPREADSHEET (CSV)
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsAuthenticated(false)}
                                    className="px-4 py-2.5 bg-red-950/20 text-red-400 border border-red-500/30 hover:bg-red-500/20 hover:text-red-200 text-[10px] font-bold uppercase transition-colors"
                                >
                                    LOGOUT
                                </button>
                            </div>
                        </div>

                        {/* Filter ribbons */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-5 bg-[#0B2347] border border-[#D4AF37]/25 w-full items-end">
                            <div className="space-y-1">
                                <label className="text-[9px] uppercase tracking-wider text-[#D9E1EC]/70 block font-bold">Search Candidate</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-2 text-[#D9E1EC]/50"><Search className="w-4 h-4" /></span>
                                    <input
                                        type="text"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        placeholder="Search ID, Name, Phone, Email..."
                                        className="w-full bg-[#081C3A] border border-[#D4AF37]/20 focus:border-[#D4AF37] pl-10 pr-4 py-2 outline-none text-white text-xs transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-[9px] uppercase tracking-wider text-[#D9E1EC]/70 block font-bold">Audition State</label>
                                <select
                                    value={stateFilter}
                                    onChange={(e) => setStateFilter(e.target.value)}
                                    className="w-full bg-[#081C3A] border border-[#D4AF37]/20 focus:border-[#D4AF37] py-2 px-3 text-white outline-none transition-all"
                                >
                                    <option value="" className="bg-[#081C3A]">All States</option>
                                    {indianStates.map(st => (
                                        <option key={st} value={st} className="bg-[#081C3A] text-white">{st}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-1">
                                <label className="text-[9px] uppercase tracking-wider text-[#D9E1EC]/70 block font-bold">Payment Status</label>
                                <select
                                    value={paymentStatusFilter}
                                    onChange={(e) => setPaymentStatusFilter(e.target.value)}
                                    className="w-full bg-[#081C3A] border border-[#D4AF37]/20 focus:border-[#D4AF37] py-2 px-3 text-white outline-none transition-all"
                                >
                                    <option value="" className="bg-[#081C3A]">All Payments</option>
                                    <option value="PAID" className="bg-[#081C3A] text-green-400 font-bold">PAID</option>
                                    <option value="PENDING" className="bg-[#081C3A] text-yellow-400 font-bold">PENDING</option>
                                    <option value="FAILED" className="bg-[#081C3A] text-red-400 font-bold">FAILED</option>
                                </select>
                            </div>

                            <div className="space-y-1">
                                <label className="text-[9px] uppercase tracking-wider text-[#D9E1EC]/70 block font-bold">Casting Review Status</label>
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="w-full bg-[#081C3A] border border-[#D4AF37]/20 focus:border-[#D4AF37] py-2 px-3 text-white outline-none transition-all"
                                >
                                    <option value="" className="bg-[#081C3A]">All Statuses</option>
                                    <option value="Payment Pending" className="bg-[#081C3A]">Payment Pending</option>
                                    <option value="Payment Successful" className="bg-[#081C3A]">Payment Successful (PAID)</option>
                                    <option value="Under Review" className="bg-[#081C3A]">Under Review</option>
                                    <option value="Shortlisted" className="bg-[#081C3A]">Shortlisted</option>
                                    <option value="Selected" className="bg-[#081C3A]">Selected Candidates</option>
                                </select>
                            </div>
                        </div>

                        {/* Split layout: Candidates List + Details Drawer */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-white">

                            {/* Left Column: Candidates Table */}
                            <div className="lg:col-span-2 space-y-4">
                                <div className="flex justify-between items-baseline mb-2">
                                    <span className="font-bold text-[#D9E1EC]/60 block text-[10px] uppercase">
                                        Profiles Logged: {registrations.length}
                                    </span>
                                    {loading && <span className="text-[10px] text-[#D4AF37] animate-pulse font-semibold">Updating databases...</span>}
                                </div>

                                {registrations.length === 0 ? (
                                    <div className="border border-[#D4AF37]/25 py-16 text-center text-[#D9E1EC]/70 space-y-2 bg-[#0B2347]">
                                        <AlertCircle className="w-10 h-10 text-[#D4AF37] mx-auto" />
                                        <h3 className="font-serif text-white font-bold uppercaseScale">No records matching</h3>
                                        <p className="text-[#D9E1EC]/60 text-[10px]">No candidate records matched the active search filters.</p>
                                    </div>
                                ) : (
                                    <div className="overflow-x-auto border border-[#D4AF37]/25 bg-[#0B2347]">
                                        <table className="w-full text-left font-sans text-xs border-collapse">
                                            <thead>
                                                <tr className="bg-[#102B52] border-b border-[#D4AF37]/20 text-[#D9E1EC] uppercase font-bold text-[9px] tracking-wider">
                                                    <th className="py-4 px-4">Registry ID</th>
                                                    <th className="py-4 px-4">FullName</th>
                                                    <th className="py-4 px-4">City / State</th>
                                                    <th className="py-4 px-4 font-mono">Height</th>
                                                    <th className="py-4 px-4 text-center">Payment</th>
                                                    <th className="py-4 px-4">Review Status</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-[#D4AF37]/15">
                                                {registrations.map((cand) => {
                                                    const isSelected = selectedCandidate && (selectedCandidate.id === cand.id || selectedCandidate.registrationId === cand.registrationId);
                                                    return (
                                                        <tr
                                                            key={cand.registrationId || cand.id}
                                                            onClick={() => {
                                                                setSelectedCandidate(cand);
                                                                setAdminNotesText(cand.adminNotes || '');
                                                            }}
                                                            className={`cursor-pointer hover:bg-[#102B52]/20 transition-colors uppercase ${isSelected ? 'bg-[#102B52] border-l-2 border-[#D4AF37]' : 'text-[#D9E1EC]/80'
                                                                }`}
                                                        >
                                                            <td className="py-4 px-4 font-mono font-bold text-[#D4AF37]">{cand.registrationId || cand.id}</td>
                                                            <td className="py-4 px-4">
                                                                <div className="font-bold text-white normal-case">{cand.name || cand.fullName}</div>
                                                                <div className="text-[9.5px] text-[#D9E1EC]/50 font-mono lower-case font-normal">{cand.email}</div>
                                                            </td>
                                                            <td className="py-4 px-4 font-normal">
                                                                <div>{cand.city}</div>
                                                                <div className="text-[9.5px] text-[#D9E1EC]/50">{cand.state}</div>
                                                            </td>
                                                            <td className="py-4 px-4 text-[#D9E1EC] font-semibold font-mono">
                                                                {cand.height ? `${cand.height}CM` : 'N/A'}
                                                            </td>
                                                            <td className="py-4 px-4 text-center font-bold font-sans">
                                                                <span className={
                                                                    cand.paymentStatus === 'PAID' ? 'text-green-400' :
                                                                        cand.paymentStatus === 'FAILED' ? 'text-red-400' :
                                                                            'text-yellow-400'
                                                                }>
                                                                    {cand.paymentStatus || 'PENDING'}
                                                                </span>
                                                            </td>
                                                            <td className="py-4 px-4 font-bold text-[10px] tracking-wide">
                                                                <span className={
                                                                    cand.applicationStatus === 'Selected' ? 'text-green-400' :
                                                                        cand.applicationStatus === 'Shortlisted' ? 'text-cyan-400' :
                                                                            'text-[#D4AF37]'
                                                                }>
                                                                    {cand.applicationStatus}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>

                            {/* Right Column: Candidate Parameters Details card */}
                            <div className="lg:col-span-1 space-y-6">
                                {!selectedCandidate ? (
                                    <div className="border border-[#D4AF37]/25 bg-[#0B2347] p-8 text-center text-[#D9E1EC]/65 font-normal italic shadow-none">
                                        Select a candidate row to load the dossier assessment details.
                                    </div>
                                ) : (
                                    <div className="border border-[#D4AF37]/25 bg-[#0B2347] p-6 space-y-6 shadow-sm text-left">
                                        {/* Header info */}
                                        <div className="flex justify-between items-start border-b border-[#D4AF37]/20 pb-4">
                                            <div>
                                                <span className="text-[9px] text-[#D9E1EC]/50 font-mono block font-semibold">
                                                    {selectedCandidate.registrationId || selectedCandidate.id}
                                                </span>
                                                <h3 className="font-serif text-lg text-white font-bold uppercase mt-0.5">
                                                    {selectedCandidate.name || selectedCandidate.fullName}
                                                </h3>
                                            </div>
                                            <button
                                                onClick={() => setSelectedCandidate(null)}
                                                className="text-[#D9E1EC]/50 hover:text-white p-1"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>

                                        {/* Photo Display Grid */}
                                        <div className="space-y-2">
                                            <span className="text-[9px] uppercase tracking-wider text-[#D9E1EC]/70 font-bold block">SUBMITTED PHOTOGRAPHS</span>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <span className="text-[#D9E1EC]/50 block text-[8px] font-bold uppercase mb-1">Full Length</span>
                                                    {selectedCandidate.fullLengthPhoto ? (() => {
                                                        const apiBase = '';
                                                        const proxyUrl = `${apiBase || window.location.origin}/api/photo?url=${encodeURIComponent(selectedCandidate.fullLengthPhoto)}`;
                                                        return (
                                                            <a href={proxyUrl} target="_blank" rel="noopener noreferrer" className="block relative aspect-[3/4] w-full border border-[#D4AF37]/25 hover:border-[#D4AF37] transition-all overflow-hidden bg-black/40">
                                                                <Image src={proxyUrl} alt="Full Length Upload" fill className="object-contain" />
                                                                <div className="absolute right-1 bottom-1 p-0.5 bg-black/70 text-white rounded"><ExternalLink className="w-2.5 h-2.5" /></div>
                                                            </a>
                                                        );
                                                    })() : (
                                                        <div className="aspect-[3/4] bg-black/10 border border-white/5 flex items-center justify-center text-[9px] text-[#D9E1EC]/40 italic">Not available</div>
                                                    )}
                                                </div>
                                                <div>
                                                    <span className="text-[#D9E1EC]/50 block text-[8px] font-bold uppercase mb-1">Close-Up</span>
                                                    {selectedCandidate.closeUpPhoto ? (() => {
                                                        const apiBase = '';
                                                        const proxyUrl = `${apiBase || window.location.origin}/api/photo?url=${encodeURIComponent(selectedCandidate.closeUpPhoto)}`;
                                                        return (
                                                            <a href={proxyUrl} target="_blank" rel="noopener noreferrer" className="block relative aspect-[3/4] w-full border border-[#D4AF37]/25 hover:border-[#D4AF37] transition-all overflow-hidden bg-black/40">
                                                                <Image src={proxyUrl} alt="Close-Up Upload" fill className="object-contain" />
                                                                <div className="absolute right-1 bottom-1 p-0.5 bg-black/70 text-white rounded"><ExternalLink className="w-2.5 h-2.5" /></div>
                                                            </a>
                                                        );
                                                    })() : (
                                                        <div className="aspect-[3/4] bg-black/10 border border-white/5 flex items-center justify-center text-[9px] text-[#D9E1EC]/40 italic">Not available</div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Quick review change actions */}
                                        <div className="space-y-2">
                                            <span className="text-[9px] uppercase tracking-wider text-[#D9E1EC]/70 font-bold block">SET CASTING STAGE</span>
                                            <div className="grid grid-cols-3 gap-1">
                                                {[
                                                    { id: 'Under Review', label: 'Review' },
                                                    { id: 'Shortlisted', label: 'Shortlist' },
                                                    { id: 'Selected', label: 'Select' }
                                                ].map((btn) => (
                                                    <button
                                                        key={btn.id}
                                                        onClick={() => handleStatusUpdate(selectedCandidate.id || selectedCandidate.registrationId, btn.id)}
                                                        className={`py-2 text-[9.5px] font-sans font-bold tracking-wider rounded-none transition-all ${selectedCandidate.applicationStatus === btn.id
                                                            ? 'bg-[#D4AF37] text-[#081C3A]'
                                                            : 'bg-[#081C3A] border border-[#D4AF37]/25 text-[#D9E1EC]/85 hover:text-white hover:bg-[#102B52]/40'
                                                            }`}
                                                    >
                                                        {btn.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Form for Feedback notes */}
                                        <div className="space-y-2">
                                            <span className="text-[9px] uppercase tracking-wider text-[#D9E1EC]/70 font-bold block">DIRECTOR OFFICE FEEDBACK NOTES</span>
                                            <textarea
                                                value={adminNotesText}
                                                onChange={(e) => setAdminNotesText(e.target.value)}
                                                placeholder="Add review feedback, height confirmations, or next steps details..."
                                                rows="3"
                                                className="w-full bg-[#081C3A] border border-[#D4AF37]/25 p-3 text-white text-xs outline-none focus:border-[#D4AF37] transition-all"
                                            />
                                            <button
                                                onClick={() => handleSaveNotes(selectedCandidate.id || selectedCandidate.registrationId)}
                                                className="w-full py-2 bg-[#D4AF37] hover:bg-[#081C3A] text-[#081C3A] hover:text-[#D4AF37] border border-transparent hover:border-[#D4AF37] font-bold text-xs tracking-wider transition-all duration-300 uppercase"
                                            >
                                                SAVE DIRECTOR FEEDBACK
                                            </button>
                                        </div>

                                        {/* Detail listing parameters */}
                                        <div className="space-y-4 border-t border-[#D4AF37]/20 pt-6 text-[#D9E1EC] leading-relaxed font-sans font-normal">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <span className="text-[#D9E1EC]/50 block text-[9.5px] font-bold">DATE OF BIRTH</span>
                                                    <span className="text-white font-mono font-semibold block">{selectedCandidate.dateOfBirth || selectedCandidate.dob || 'N/A'}</span>
                                                </div>
                                                <div>
                                                    <span className="text-[#D9E1EC]/50 block text-[9.5px] font-bold">HEIGHT</span>
                                                    <span className="text-white font-semibold block">{selectedCandidate.height ? `${selectedCandidate.height} CM` : 'N/A'}</span>
                                                </div>
                                                <div>
                                                    <span className="text-[#D9E1EC]/50 block text-[9.5px] font-bold">INSTAGRAM</span>
                                                    {selectedCandidate.instagramUsername ? (
                                                        <a href={`https://instagram.com/${selectedCandidate.instagramUsername}`} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-200 block hover:underline font-mono truncate">
                                                            @{selectedCandidate.instagramUsername}
                                                        </a>
                                                    ) : (
                                                        <span className="text-white">N/A</span>
                                                    )}
                                                </div>
                                                <div>
                                                    <span className="text-[#D9E1EC]/50 block text-[9.5px] font-bold">WHATSAPP</span>
                                                    <span className="text-white font-mono block">{selectedCandidate.whatsapp || 'N/A'}</span>
                                                </div>
                                                <div>
                                                    <span className="text-[#D9E1EC]/50 block text-[9.5px] font-bold">PHONE</span>
                                                    <span className="text-white font-mono block">{selectedCandidate.phone || 'N/A'}</span>
                                                </div>
                                                <div>
                                                    <span className="text-[#D9E1EC]/50 block text-[9.5px] font-bold">EMAIL</span>
                                                    <span className="text-white font-mono block truncate" title={selectedCandidate.email}>{selectedCandidate.email || 'N/A'}</span>
                                                </div>
                                                <div>
                                                    <span className="text-[#D9E1EC]/50 block text-[9.5px] font-bold">PAYMENT STATUS</span>
                                                    <span className={`font-bold block ${selectedCandidate.paymentStatus === 'PAID' ? 'text-green-400' :
                                                        selectedCandidate.paymentStatus === 'FAILED' ? 'text-red-400' :
                                                            'text-yellow-400'
                                                        }`}>{selectedCandidate.paymentStatus || 'PENDING'}</span>
                                                </div>
                                                <div>
                                                    <span className="text-[#D9E1EC]/50 block text-[9.5px] font-bold">AMOUNT PAID</span>
                                                    <span className="text-white font-mono font-semibold block">₹{selectedCandidate.paymentAmount || 0}</span>
                                                </div>
                                                <div className="col-span-2">
                                                    <span className="text-[#D9E1EC]/50 block text-[9.5px] font-bold">RAZORPAY PAYMENT ID</span>
                                                    <span className="text-white font-mono truncate block" title={selectedCandidate.razorpayPaymentId}>
                                                        {selectedCandidate.razorpayPaymentId || 'N/A'}
                                                    </span>
                                                </div>
                                                <div className="col-span-2">
                                                    <span className="text-[#D9E1EC]/50 block text-[9.5px] font-bold">REGISTRATION DATE</span>
                                                    <span className="text-white block font-mono">
                                                        {selectedCandidate.createdAt ? new Date(selectedCandidate.createdAt).toLocaleString('en-IN') : 'N/A'}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="border-t border-[#D4AF37]/20 pt-4 text-left">
                                                <span className="text-[#D9E1EC]/50 block text-[9.5px] font-bold">LOCATION LOCATION SPECIFICS</span>
                                                <div className="text-white text-[10.5px] font-semibold leading-normal mt-1">
                                                    City: {selectedCandidate.city || 'N/A'}<br />
                                                    State: {selectedCandidate.state || 'N/A'}<br />
                                                    Pincode: {selectedCandidate.pincode || 'N/A'}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                        </div>

                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
