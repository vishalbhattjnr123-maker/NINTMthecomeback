'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CheckCircle2, ShieldCheck, Mail, ArrowRight, Printer, AlertTriangle } from 'lucide-react';

function SuccessContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const regId = searchParams.get('id');
    const payId = searchParams.get('payId');
    const dateStr = searchParams.get('date');

    const [candidate, setCandidate] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showEmailNotice, setShowEmailNotice] = useState(false);

    useEffect(() => {
        if (!regId) {
            setLoading(false);
            return;
        }

        const apiBase = '';
        fetch(`${apiBase}/api/admin?search=${regId}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.success && data.registrations.length > 0) {
                    setCandidate(data.registrations[0]);
                    setShowEmailNotice(true);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error('Success fetch error:', err);
                setLoading(false);
            });
    }, [regId]);

    const handlePrintReceipt = () => {
        window.print();
    };

    if (loading) {
        return (
            <div className="text-center py-20">
                <div className="w-10 h-10 border-t-2 border-[#D4AF37] rounded-full animate-spin mx-auto mb-2" />
                <span className="text-xs uppercase text-[#D9E1EC]/50 tracking-wider">Verifying transaction log...</span>
            </div>
        );
    }

    if (!candidate) {
        return (
            <div className="text-center py-20 max-w-sm mx-auto space-y-4 font-sans text-xs">
                <AlertTriangle className="w-12 h-12 text-[#D4AF37] mx-auto animate-pulse" />
                <h2 className="font-serif text-xl text-white uppercase font-light">Transaction Record Invalid</h2>
                <p className="text-xs text-[#D9E1EC]/70 leading-relaxed font-normal">
                    The payment succeeded, but we couldn&apos;t retrieve the applicant file. Please contact NINTM support coordinates.
                </p>
                <Link href="/" className="px-6 py-2 bg-[#D4AF37] hover:bg-[#081C3A] text-[#081C3A] hover:text-[#D4AF37] border border-transparent hover:border-[#D4AF37] text-xs font-bold tracking-wider inline-block transition-all">
                    RETURN TO HOME
                </Link>
            </div>
        );
    }

    const formattedDate = dateStr
        ? new Date(dateStr).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })
        : new Date().toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        });

    return (
        <div className="max-w-2xl mx-auto space-y-8 animate-fade-in font-sans text-xs">

            {/* Email Dispatch Notice */}
            {showEmailNotice && (
                <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] px-4 py-3 flex items-center justify-between gap-3 text-xs mb-6 font-semibold">
                    <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 shrink-0" />
                        <span>
                            Confirmation email sent to <strong>{candidate.email}</strong>.
                        </span>
                    </div>
                    <button
                        onClick={() => setShowEmailNotice(false)}
                        className="text-white hover:text-[#D4AF37] text-[10px] font-bold tracking-wider"
                    >
                        DISMISS
                    </button>
                </div>
            )}

            {/* Main Success message */}
            <div className="text-center space-y-4">
                <CheckCircle2 className="w-16 h-16 text-[#D4AF37] mx-auto" />
                <span className="text-[10px] tracking-[0.3em] text-[#D4AF37] font-extrabold uppercase block">
                    TRANSACTION APPROVED
                </span>
                <h1 className="font-serif text-3xl md:text-4xl text-white font-light uppercase">
                    Registration Successful
                </h1>
                <p className="text-xs text-[#D9E1EC]/70 max-w-md mx-auto leading-relaxed font-normal">
                    Your profile application has been cached. Regional scouts from Creativatorss will start evaluating your pictures.
                </p>
            </div>

            {/* Audit Invoice Details card */}
            <div className="bg-[#0B2347] border border-[#D4AF37]/25 p-8 space-y-6 print:border-black print:bg-white print:text-black shadow-2xl">
                <div className="flex justify-between items-baseline border-b border-[#D4AF37]/20 pb-4 print:border-black">
                    <div>
                        <span className="font-serif text-xl text-white font-bold tracking-widest print:text-black text-left block">NINTM</span>
                        <span className="text-[8px] font-sans tracking-widest text-[#D4AF37] font-semibold block uppercase text-left">
                            THE COMEBACK 2026
                        </span>
                    </div>
                    <span className="text-[9px] uppercase tracking-wider text-green-400 font-bold bg-[#102B52] border border-[#D4AF37]/20 px-2 py-0.5 print:text-black print:border-black">
                        PAID SUCCESS
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs leading-relaxed text-[#D9E1EC]/90 font-normal text-left">
                    <div>
                        <span className="text-[#D9E1EC]/50 text-[9.5px] font-bold block uppercase print:text-zinc-500">Candidate Name</span>
                        <strong className="text-white print:text-black font-serif text-sm block">{candidate.name || candidate.fullName}</strong>
                    </div>
                    <div>
                        <span className="text-[#D9E1EC]/50 text-[9.5px] font-bold block uppercase print:text-zinc-500">Contact Email</span>
                        <span className="text-white print:text-black block">{candidate.email}</span>
                    </div>
                    <div>
                        <span className="text-[#D9E1EC]/50 text-[9.5px] font-bold block uppercase print:text-zinc-500">Registration ID</span>
                        <strong className="text-[#D4AF37] print:text-black font-mono block">{candidate.registrationId || candidate.id}</strong>
                    </div>
                    <div>
                        <span className="text-[#D9E1EC]/50 text-[9.5px] font-bold block uppercase print:text-zinc-500">Transaction ID</span>
                        <span className="text-white print:text-black font-mono block">{payId || candidate.razorpayPaymentId || 'N/A'}</span>
                    </div>
                    <div>
                        <span className="text-[#D9E1EC]/50 text-[9.5px] font-bold block uppercase print:text-zinc-500">Total Paid Amount</span>
                        <strong className="text-white print:text-black font-mono block">
                            ₹{candidate.paymentAmount || '8,258.82'} INR
                        </strong>
                    </div>
                    <div>
                        <span className="text-[#D9E1EC]/50 text-[9.5px] font-bold block uppercase print:text-zinc-500">Payment Date</span>
                        <span className="text-white print:text-black block">{formattedDate}</span>
                    </div>
                </div>

                <div className="pt-6 border-t border-[#D4AF37]/20 border-dashed text-[10px] text-[#D9E1EC]/70 flex items-start gap-2 leading-relaxed print:text-zinc-500 print:border-black font-normal text-left">
                    <ShieldCheck className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5 print:text-black" />
                    <p>
                        Your application folder will now travel to our agency review queue. Shortlisted candidates will be communicated dates for physical look tests via their registered mobile coordinates. Keep credentials saved.
                    </p>
                </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center font-sans print:hidden">
                <button
                    onClick={handlePrintReceipt}
                    className="px-8 py-3 bg-[#D4AF37] hover:bg-[#081C3A] text-[#081C3A] hover:text-[#D4AF37] border border-transparent hover:border-[#D4AF37] text-xs font-bold tracking-wider transition-all duration-300 inline-flex items-center justify-center gap-2 w-full sm:w-auto uppercase"
                >
                    <Printer className="w-4 h-4" /> DOWNLOAD RECEIPT
                </button>
                <Link
                    href="/contact"
                    className="px-8 py-3 bg-transparent border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#081C3A] text-xs font-bold tracking-wider transition-all duration-300 inline-flex items-center justify-center gap-2 w-full sm:w-auto uppercase"
                >
                    CONTACT NINTM
                </Link>
            </div>

        </div>
    );
}

export default function SuccessPage() {
    return (
        <div className="flex flex-col min-h-screen bg-[#081C3A] text-white selection:bg-[#D4AF37] selection:text-[#081C3A] print:bg-white print:text-black">
            {/* Header hidden on print */}
            <div className="print:hidden">
                <Navbar />
            </div>

            <main className="flex-grow pt-40 pb-24 px-6">
                <Suspense fallback={
                    <div className="text-center py-20">
                        <div className="w-10 h-10 border-t-2 border-[#D4AF37] rounded-full animate-spin mx-auto mb-2" />
                        <span className="text-xs uppercase text-[#D9E1EC]/50 tracking-wider">Loading...</span>
                    </div>
                }>
                    <SuccessContent />
                </Suspense>
            </main>

            {/* Footer hidden on print */}
            <div className="print:hidden">
                <Footer />
            </div>
        </div>
    );
}
