'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
    User,
    MapPin,
    Phone,
    Mail,
    Calendar,
    Activity,
    CheckCircle2,
    Clock,
    ShieldAlert,
    Image as ImageIcon,
    Search,
    ChevronRight,
    Sparkles
} from 'lucide-react';

function DashboardContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const searchId = searchParams.get('id') || '';

    const [regIdInput, setRegIdInput] = useState('');
    const [candidate, setCandidate] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const fetchProfile = (id) => {
        if (!id) return;
        loading || setLoading(true);
        setErrorMsg('');

        const apiBase = '';
        fetch(`${apiBase}/api/admin?search=${id.trim()}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.success && data.registrations.length > 0) {
                    const match = data.registrations.find(
                        r => r.id.toLowerCase() === id.trim().toLowerCase() || r.phone === id.trim()
                    );
                    if (match) {
                        setCandidate(match);
                    } else {
                        setCandidate(null);
                        setErrorMsg('Profile reference not found. Check ID or mobile number.');
                    }
                } else {
                    setCandidate(null);
                    setErrorMsg('Profile reference not found.');
                }
                setSearched(true);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setErrorMsg('Error fetching profile.');
                setLoading(false);
            });
    };

    useEffect(() => {
        if (searchId) {
            setRegIdInput(searchId);
            fetchProfile(searchId);
        }
    }, [searchId]);

    const handleLookupSubmit = (e) => {
        e.preventDefault();
        if (!regIdInput.trim()) return;
        router.push(`/dashboard?id=${regIdInput.trim()}`);
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Selected':
                return (
                    <span className="px-3 py-1 text-[9px] font-bold tracking-wider text-green-400 bg-green-950/20 border border-green-500/30 uppercase rounded-none">
                        Selected
                    </span>
                );
            case 'Shortlisted':
                return (
                    <span className="px-3 py-1 text-[9px] font-bold tracking-wider text-cyan-400 bg-cyan-950/20 border border-cyan-500/30 uppercase rounded-none">
                        Shortlisted
                    </span>
                );
            case 'Under Review':
            case 'Payment Successful':
            default:
                return (
                    <span className="px-3 py-1 text-[9px] font-bold tracking-wider text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/30 uppercase rounded-none">
                        Under Review
                    </span>
                );
        }
    };

    const getNextStepsInfo = (status) => {
        switch (status) {
            case 'Selected':
                return {
                    title: 'Finalist Enrollment Phase',
                    desc: 'Congratulations! You are selected as an official finalist of NINTM – The Comeback 2026. Prepare for the runway training camp. The director office will dispatch your contract guidelines and grooming timeline booklet within 7 business days.'
                };
            case 'Shortlisted':
                return {
                    title: 'Audition Look Tests Cues',
                    desc: 'Outstanding profile! You are shortlisted for the NINTM regional physical look tests. Our casting managers are setting audition slots for Gurugram and Chandigarh venues. Check your phone for details.'
                };
            default:
                return {
                    title: 'Screening Evaluation Phase',
                    desc: 'Your application has been received. Our agency review desk is actively screening candidate portfolios and verifying height references. Keep checking this profile tracker to see progress logs.'
                };
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-12 font-sans text-xs">

            {/* Lookup Card when no candidate is loaded */}
            {(!candidate || !searched) && (
                <div className="max-w-md mx-auto bg-[#0B2347] border border-[#D4AF37]/25 p-8 md:p-10 text-center space-y-6 shadow-2xl relative z-10 animate-fade-push">
                    <Sparkles className="w-10 h-10 text-[#D4AF37] mx-auto animate-pulse" />
                    <div className="space-y-2">
                        <h2 className="font-serif text-2xl text-white font-light uppercase">Candidate Tracker</h2>
                        <p className="text-[10px] text-[#D9E1EC]/70 leading-relaxed font-sans font-normal">
                            Enter your unique NINTM Registration ID (e.g. NINTM-2026-1024) or registered phone number to view your profile dashboard & casting progress logs.
                        </p>
                    </div>

                    <form onSubmit={handleLookupSubmit} className="space-y-4 pt-2">
                        <div className="relative">
                            <input
                                type="text"
                                value={regIdInput}
                                onChange={(e) => setRegIdInput(e.target.value)}
                                placeholder="Registration ID or Phone Number"
                                className="w-full bg-[#081C3A] border border-[#D4AF37]/20 focus:border-[#D4AF37] py-3 pl-4 pr-12 text-white outline-none text-xs transition-all"
                                required
                            />
                            <button
                                type="submit"
                                className="absolute right-3 top-2.5 text-[#D9E1EC]/50 hover:text-[#D4AF37] p-1 transition-all"
                                disabled={loading}
                            >
                                <Search className="w-4 h-4" />
                            </button>
                        </div>
                        {errorMsg && (
                            <p className="text-red-400 text-[10px] font-bold text-left">{errorMsg}</p>
                        )}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-[#D4AF37] hover:bg-[#081C3A] text-[#081C3A] hover:text-[#D4AF37] border border-transparent hover:border-[#D4AF37] font-bold text-xs tracking-wider transition-all duration-300 uppercase"
                        >
                            {loading ? 'LOOKING UP ARCHIVES...' : 'ACCESS PROFILE'}
                        </button>
                    </form>

                    <div className="border-t border-[#D4AF37]/15 pt-6">
                        <p className="text-[9px] text-[#D9E1EC]/50 font-normal">
                            Don&apos;t have an application ID?{' '}
                            <Link href="/register" className="text-[#D4AF37] hover:underline font-bold">
                                Apply for auditions now
                            </Link>
                        </p>
                    </div>
                </div>
            )}

            {/* Profile display Dashboard */}
            {candidate && searched && (
                <div className="space-y-8">

                    {/* Dashboard Header Bar */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-[#D4AF37]/20 pb-6">
                        <div>
                            <span className="text-[10px] text-[#D4AF37] tracking-[0.2em] font-extrabold uppercase font-sans">
                                NINTM CANDIDATE PORTAL
                            </span>
                            <h1 className="font-serif text-3xl font-light uppercase text-white mt-1">
                                {candidate.fullName}
                            </h1>
                            <span className="text-[#D9E1EC]/60 font-mono text-[11px] block mt-1">
                                Registry ID: {candidate.id}
                            </span>
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="text-[9px] text-[#D9E1EC]/60 block uppercase font-bold font-sans">Review Status:</span>
                            {getStatusBadge(candidate.applicationStatus)}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* Left Column: Metric summary & profile */}
                        <div className="lg:col-span-2 space-y-8">

                            {/* Profile details grid */}
                            <div className="border border-[#D4AF37]/25 bg-[#0B2347] p-8 space-y-6">
                                <span className="text-[10px] font-bold tracking-[0.15em] text-[#D9E1EC]/50 uppercase block border-b border-[#D4AF37]/20 pb-2 text-left">
                                    PERSONAL DOSSIER
                                </span>

                                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 font-normal text-[#D9E1EC]/80">
                                    <div className="text-left">
                                        <span className="text-[#D9E1EC]/50 text-[9px] font-bold block uppercase mb-1">HEIGHT INDEX</span>
                                        <strong className="text-white text-sm font-serif">{candidate.height} CM</strong>
                                    </div>
                                    <div className="text-left">
                                        <span className="text-[#D9E1EC]/50 text-[9px] font-bold block uppercase mb-1">DRESS SIZE</span>
                                        <span className="text-white font-semibold block">{candidate.dressSize}</span>
                                    </div>
                                    {candidate.vitalStats && (
                                        <div className="text-left">
                                            <span className="text-[#D9E1EC]/50 text-[9px] font-bold block uppercase mb-1">VITAL MEASURES</span>
                                            <span className="text-white font-mono font-semibold block">{candidate.vitalStats}</span>
                                        </div>
                                    )}
                                    <div className="text-left">
                                        <span className="text-[#D9E1EC]/50 text-[9px] font-bold block uppercase mb-1">EXPERIENCE LEVEL</span>
                                        <span className="text-[#D4AF37] font-bold block">{candidate.experience}</span>
                                    </div>
                                    <div className="text-left">
                                        <span className="text-[#D9E1EC]/50 text-[9px] font-bold block uppercase mb-1">AUDITION AREA</span>
                                        <span className="text-white font-semibold block">{candidate.city}, {candidate.state}</span>
                                    </div>
                                    <div className="text-left">
                                        <span className="text-[#D9E1EC]/50 text-[9px] font-bold block uppercase mb-1">PROFESSION</span>
                                        <span className="text-white font-semibold block">{candidate.profession || 'N/A'}</span>
                                    </div>
                                    <div className="text-left">
                                        <span className="text-[#D9E1EC]/50 text-[9px] font-bold block uppercase mb-1">PHONE NUMBER</span>
                                        <span className="text-white font-mono font-semibold block">{candidate.phone}</span>
                                    </div>
                                    <div className="text-left">
                                        <span className="text-[#D9E1EC]/50 text-[9px] font-bold block uppercase mb-1">EMAIL ADDRESS</span>
                                        <span className="text-white font-semibold truncate block" title={candidate.email}>{candidate.email}</span>
                                    </div>
                                    <div className="text-left">
                                        <span className="text-[#D9E1EC]/50 text-[9px] font-bold block uppercase mb-1">MARITAL STATUS</span>
                                        <span className="text-white font-semibold block">{candidate.maritalStatus}</span>
                                    </div>
                                </div>

                                {candidate.wildcardNotes && (
                                    <div className="border-t border-[#D4AF37]/20 pt-6 text-left">
                                        <span className="text-[#D9E1EC]/50 text-[9px] font-bold block uppercase mb-1">WILDCARD OPTIONS / EXTRA NOTES</span>
                                        <p className="text-white font-sans leading-relaxed font-normal">{candidate.wildcardNotes}</p>
                                    </div>
                                )}
                            </div>

                            {/* Uploaded Documents tracker */}
                            <div className="border border-[#D4AF37]/25 bg-[#0B2347] p-8 space-y-6">
                                <span className="text-[10px] font-bold tracking-[0.15em] text-[#D9E1EC]/50 uppercase block border-b border-[#D4AF37]/20 pb-2 text-left">
                                    VERIFIED ATTACHMENTS
                                </span>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {[
                                        { label: 'Government ID', name: candidate.govIdName },
                                        { label: 'Close-Up Photo', name: candidate.closeUpName },
                                        { label: 'Mid-Shot Photo', name: candidate.midShotName },
                                        { label: 'Full-Length Photo', name: candidate.fullLengthName }
                                    ].map((doc, idx) => (
                                        <div key={idx} className="border border-[#D4AF37]/20 p-4 text-center bg-[#081C3A] space-y-3 shadow-none">
                                            <ImageIcon className="w-6 h-6 text-[#D4AF37] mx-auto animate-pulse" />
                                            <div>
                                                <span className="text-[#D9E1EC] font-bold block mb-0.5 text-[9px] uppercase leading-none">{doc.label}</span>
                                                <span className="text-[#D9E1EC]/50 font-mono text-[9px] block truncate px-1 font-semibold" title={doc.name}>
                                                    {doc.name || 'Not Attached'}
                                                </span>
                                            </div>
                                            <span className="text-[9px] py-0.5 px-2 bg-[#102B52] text-white border border-[#D4AF37]/25 uppercase inline-block font-bold">
                                                Cached
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>

                        {/* Right Column: Active Status dashboard steps */}
                        <div className="lg:col-span-1 space-y-6">

                            {/* Review status instructions panel */}
                            <div className="border border-[#D4AF37]/25 bg-[#0B2347] p-6 space-y-4 shadow-sm">
                                <span className="text-[9px] tracking-[0.25em] text-[#D4AF37] font-extrabold uppercase block border-b border-[#D4AF37]/20 pb-2 text-left">
                                    NEXT STEPS OUTLINE
                                </span>

                                <h4 className="font-serif text-sm text-[#D4AF37] font-bold uppercase text-left">
                                    {getNextStepsInfo(candidate.applicationStatus).title}
                                </h4>
                                <p className="text-[#D9E1EC] leading-relaxed font-sans text-left font-normal">
                                    {getNextStepsInfo(candidate.applicationStatus).desc}
                                </p>
                            </div>

                            {/* Admin feedback notes */}
                            {candidate.adminNotes && (
                                <div className="border border-[#D4AF37]/35 bg-[#FAF8F3]/5 p-6 space-y-3 text-left">
                                    <span className="text-[9px] tracking-[0.2em] text-[#D4AF37] font-extrabold uppercase block">
                                        DIRECTOR OFFICE FEEDBACK
                                    </span>
                                    <p className="italic text-white font-serif leading-relaxed text-sm">
                                        &ldquo;{candidate.adminNotes}&rdquo;
                                    </p>
                                </div>
                            )}

                            {/* Quick exit */}
                            <button
                                onClick={() => {
                                    setCandidate(null);
                                    setSearched(false);
                                    router.push('/dashboard');
                                }}
                                className="w-full py-3 bg-transparent border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#081C3A] font-bold tracking-wider transition-all duration-300 uppercase text-center block text-[10px]"
                            >
                                Track Different Profile
                            </button>

                        </div>

                    </div>

                </div>
            )}

        </div>
    );
}

export default function Dashboard() {
    return (
        <div className="flex flex-col min-h-screen bg-[#081C3A] text-white selection:bg-[#D4AF37] selection:text-[#081C3A]">
            <Navbar />

            <main className="flex-grow pt-40 pb-24 px-6">
                <Suspense fallback={
                    <div className="text-center py-20">
                        <div className="w-10 h-10 border-t-2 border-[#D4AF37] rounded-full animate-spin mx-auto mb-2" />
                        <span className="text-xs uppercase text-[#D9E1EC]/50 tracking-wider">Loading...</span>
                    </div>
                }>
                    <DashboardContent />
                </Suspense>
            </main>

            <Footer />
        </div>
    );
}
