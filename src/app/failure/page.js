'use client';

import { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { AlertCircle, RotateCcw, MessageSquare, PhoneCall } from 'lucide-react';

function FailureContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const regId = searchParams.get('id');

    return (
        <div className="max-w-md mx-auto text-center space-y-8 animate-fade-in font-sans text-xs">
            <AlertCircle className="w-16 h-16 text-red-400 mx-auto" />

            <div className="space-y-3">
                <span className="text-[10px] tracking-[0.25em] text-red-500 font-extrabold uppercase block">
                    TRANSACTION FAILED
                </span>
                <h1 className="font-serif text-3xl text-white font-light uppercase">
                    PAYMENT FAILED
                </h1>
                <p className="text-xs text-[#D9E1EC]/70 leading-relaxed font-normal">
                    Your registration information has been saved.
                </p>
            </div>

            {regId && (
                <div className="bg-[#0B2347] border border-[#D4AF37]/20 p-4 text-xs font-mono text-center">
                    <span className="text-[#D9E1EC]/50 block text-[9.5px] uppercase font-sans mb-1 font-bold">Registration ID</span>
                    <span className="text-[#D4AF37] font-bold">{regId}</span>
                </div>
            )}

            {/* Action buttons */}
            <div className="flex flex-col gap-3 font-sans">
                <Link
                    href={`/register/checkout?id=${regId}`}
                    className="w-full py-3 bg-[#D4AF37] hover:bg-[#081C3A] text-[#081C3A] hover:text-[#D4AF37] border border-transparent hover:border-[#D4AF37] font-bold text-xs tracking-wider transition-all duration-300 flex items-center justify-center gap-2 uppercase"
                >
                    <RotateCcw className="w-4 h-4" /> RETRY PAYMENT
                </Link>

                <Link
                    href="/contact"
                    className="w-full py-2.5 bg-transparent border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#081C3A] font-bold text-xs tracking-wider transition-all duration-300 uppercase text-center"
                >
                    CONTACT SUPPORT
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-[#D4AF37]/20 text-left text-xs">
                <div className="p-4 border border-[#D4AF37]/15 bg-[#0B2347] space-y-2">
                    <PhoneCall className="w-4 h-4 text-[#D4AF37]" />
                    <h4 className="font-bold text-[#D4AF37] uppercase text-[9.5px]">Call Support</h4>
                    <p className="text-[10px] text-[#D9E1EC]/65 font-normal leading-relaxed">
                        Reach director office at <strong className="text-white">8626-000-002</strong>.
                    </p>
                </div>
                <div className="p-4 border border-[#D4AF37]/15 bg-[#0B2347] space-y-2">
                    <MessageSquare className="w-4 h-4 text-[#D4AF37]" />
                    <h4 className="font-bold text-[#D4AF37] uppercase text-[9.5px]">Email Queries</h4>
                    <p className="text-[10px] text-[#D9E1EC]/65 font-normal leading-relaxed">
                        Write details to <strong className="text-white">NintmTheComeBack@gmail.com</strong>.
                    </p>
                </div>
            </div>

        </div>
    );
}

export default function FailurePage() {
    return (
        <div className="flex flex-col min-h-screen bg-[#081C3A] text-white selection:bg-[#D4AF37] selection:text-[#081C3A]">
            <Navbar />

            <main className="flex-grow pt-40 pb-24 px-6 flex items-center">
                <Suspense fallback={
                    <div className="text-center py-20 mx-auto">
                        <div className="w-10 h-10 border-t-2 border-[#D4AF37] rounded-full animate-spin mx-auto mb-2" />
                        <span className="text-xs uppercase text-[#D9E1EC]/50 tracking-wider">Loading...</span>
                    </div>
                }>
                    <FailureContent />
                </Suspense>
            </main>

            <Footer />
        </div>
    );
}
