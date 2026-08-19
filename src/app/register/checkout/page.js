'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CreditCard, Shield, Landmark, AlertTriangle, ArrowRight, RotateCcw, PhoneCall, MessageSquare } from 'lucide-react';

function CheckoutContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const regId = searchParams.get('id');

    const [applicant, setApplicant] = useState(null);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);
    const [paymentFailed, setPaymentFailed] = useState(false);
    const [paymentError, setPaymentError] = useState('');

    const baseFee = 699;
    const [gstRate, setGstRate] = useState(0);
    const [gstAmount, setGstAmount] = useState(0);
    const [totalAmount, setTotalAmount] = useState(699);

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
                    const match = data.registrations[0];
                    setApplicant(match);

                    const calculatedGst = 0;
                    setGstAmount(calculatedGst);
                    setTotalAmount(baseFee + calculatedGst);
                }
                setLoading(false)
            })
            .catch((err) => {
                console.error('Error fetching checkout candidate details:', err);
                setLoading(false);
            });
    }, [regId]);

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            if (window.Razorpay) {
                resolve(true);
                return;
            }
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handleRazorpayPayment = async () => {
        setProcessing(true);
        setPaymentError('');
        setPaymentFailed(false);

        const isLoaded = await loadRazorpayScript();
        if (!isLoaded) {
            setPaymentError('Razorpay SDK failed to load. Please verify your internet connection.');
            setProcessing(false);
            return;
        }

        try {
            const apiBase = '';
            const orderRes = await fetch(`${apiBase}/api/payment/create-order`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ registrationId: regId })
            });

            const orderData = await orderRes.json();

            if (!orderRes.ok || !orderData.success) {
                throw new Error(orderData.error || 'Failed to initialize server-side payment order.');
            }

            setGstRate(orderData.gstRate);
            setGstAmount(orderData.gstAmount);
            setTotalAmount(orderData.totalAmount);

            const options = {
                key: orderData.keyId,
                amount: orderData.amount,
                currency: orderData.currency,
                name: "NINTM – The Comeback 2026",
                description: "NINTM Model Registration – The Comeback 2026",
                order_id: orderData.orderId,
                handler: async function (response) {
                    setProcessing(true);
                    try {
                        const verifyRes = await fetch(`${apiBase}/api/payment/verify`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature
                            })
                        });

                        const verifyData = await verifyRes.json();

                        if (verifyRes.ok && verifyData.success) {
                            router.push(`/success?id=${regId}&payId=${response.razorpay_payment_id}&date=${new Date().toISOString()}`);
                        } else {
                            throw new Error(verifyData.error || 'Payment validation failed.');
                        }
                    } catch (verifyErr) {
                        console.error('Payment verification routing error:', verifyErr);
                        setPaymentFailed(true);
                        setPaymentError(verifyErr.message || 'Signature verification failed.');
                        setProcessing(false);
                    }
                },
                modal: {
                    ondismiss: function () {
                        console.log('Payment modal dismissed by user.');
                        setProcessing(false);
                    }
                },
                prefill: {
                    name: orderData.candidate.name,
                    email: orderData.candidate.email,
                    contact: orderData.candidate.phone,
                },
                theme: {
                    color: '#D4AF37',
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();

        } catch (err) {
            console.error('Checkout error:', err);
            setPaymentError(err.message || 'Payment initiation failed.');
            setPaymentFailed(true);
            setProcessing(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#081C3A] flex items-center justify-center text-[#D9E1EC]/60 font-sans">
                <div className="text-center space-y-4">
                    <div className="w-12 h-12 border-t-2 border-[#D4AF37] border-r-2 border-r-[#D4AF37]/20 rounded-full animate-spin mx-auto" />
                    <p className="text-xs uppercase tracking-widest font-bold font-sans">Fetching registration details...</p>
                </div>
            </div>
        );
    }

    if (!regId || !applicant) {
        return (
            <div className="min-h-screen bg-[#081C3A] flex flex-col justify-between">
                <Navbar />
                <main className="max-w-md mx-auto px-6 py-40 text-center space-y-6 text-white font-sans text-xs">
                    <AlertTriangle className="w-12 h-12 text-[#D4AF37] mx-auto" />
                    <h2 className="font-serif text-2xl text-white uppercase font-light">Invalid Registration</h2>
                    <p className="text-xs text-[#D9E1EC]/70 leading-relaxed font-normal">
                        No registration record was located matching the provided ID reference code. Please restart.
                    </p>
                    <Link href="/register" className="px-6 py-2.5 bg-[#D4AF37] hover:bg-[#081C3A] text-[#081C3A] hover:text-[#D4AF37] border border-transparent hover:border-[#D4AF37] text-xs font-bold tracking-wider inline-block transition-all duration-300 font-sans uppercase">
                        GOTO REGISTRATION FORM
                    </Link>
                </main>
                <Footer />
            </div>
        );
    }

    if (paymentFailed) {
        return (
            <div className="max-w-md mx-auto px-6 pt-40 pb-24 text-center space-y-8 font-sans text-xs text-white">
                <AlertTriangle className="w-16 h-16 text-[#8B1E2D] mx-auto animate-pulse" />

                <div className="space-y-3">
                    <span className="text-[10px] tracking-[0.25em] text-red-500 font-extrabold uppercase block">
                        TRANSACTION ERROR
                    </span>
                    <h1 className="font-serif text-3xl text-white font-light uppercase">
                        PAYMENT FAILED
                    </h1>
                    <p className="text-xs text-[#D9E1EC]/70 leading-relaxed font-normal">
                        Your registration information has been saved successfully, but the transaction could not be processed.
                        {paymentError && <span className="block mt-2 text-[#8B1E2D]/90 font-bold bg-[#8B1E2D]/10 py-1">{paymentError}</span>}
                    </p>
                </div>

                <div className="bg-[#0B2347] border border-[#D4AF37]/20 p-4 text-xs font-mono text-center">
                    <span className="text-[#D9E1EC]/50 block text-[9.5px] uppercase font-sans mb-1 font-bold">Registration ID</span>
                    <span className="text-[#D4AF37] font-bold">{regId}</span>
                </div>

                <div className="flex flex-col gap-3 font-sans">
                    <button
                        onClick={handleRazorpayPayment}
                        disabled={processing}
                        className="w-full py-3 bg-[#D4AF37] hover:bg-[#081C3A] text-[#081C3A] hover:text-[#D4AF37] border border-transparent hover:border-[#D4AF37] font-bold text-xs tracking-wider transition-all duration-300 flex items-center justify-center gap-2 uppercase"
                    >
                        <RotateCcw className="w-4 h-4" /> RETRY PAYMENT
                    </button>

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
                        <h4 className="font-bold text-[#D4AF37] uppercase text-[9.5px]">Email Details</h4>
                        <p className="text-[10px] text-[#D9E1EC]/65 font-normal leading-relaxed">
                            Write details to <strong className="text-white">NintmTheComeBack@gmail.com</strong>.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-5 gap-12 pt-40 pb-24 font-sans text-xs text-white">

            <div className="lg:col-span-2 space-y-6 text-[#D9E1EC]/70 font-sans">
                <div className="border border-[#D4AF37]/15 bg-[#102B52]/40 p-6 space-y-4">
                    <span className="text-[9px] tracking-[0.2em] text-[#D4AF37] font-extrabold uppercase block border-b border-[#D4AF37]/15 pb-2">
                        COMPLETE YOUR REGISTRATION
                    </span>
                    <p className="text-[#D9E1EC]/80 leading-relaxed">
                        Your application has been successfully submitted. Please complete your transaction to secure audition slots.
                    </p>
                    <div className="space-y-3 pt-2">
                        <div>
                            <span className="text-[#D9E1EC]/50 text-[9px] font-bold block mb-1">CANDIDATE NAME</span>
                            <span className="text-white font-bold text-sm block">{applicant.name || applicant.fullName}</span>
                        </div>
                        <div>
                            <span className="text-[#D9E1EC]/50 text-[9px] font-bold block mb-1">REGISTRATION ID</span>
                            <span className="text-[#D4AF37] font-bold font-mono text-sm block">{applicant.registrationId || applicant.id}</span>
                        </div>
                        <div>
                            <span className="text-[#D9E1EC]/50 text-[9px] font-bold block mb-1">CONTACT EMAIL</span>
                            <span className="text-white block font-mono">{applicant.email}</span>
                        </div>
                    </div>
                </div>

                <div className="p-4 bg-[#102B52]/20 border border-[#D4AF37]/10 text-[#D9E1EC]/60 leading-relaxed text-[10px]">
                    <span className="font-bold text-[#D4AF37] block mb-1 uppercase">AUTHENTIC PAYMENT CHECKS:</span>
                    Payments are handled securely under Razorpay 256-bit encryption. The server dynamically registers payment state updates independently. Keep your Registration ID handy.
                </div>
            </div>

            <div className="lg:col-span-3 border border-[#D4AF37]/20 bg-[#0B2347] p-8 flex flex-col justify-between shadow-2xl relative">

                {processing && (
                    <div className="absolute inset-0 bg-[#0B2347]/95 backdrop-blur-sm z-30 flex items-center justify-center text-center">
                        <div className="space-y-4">
                            <div className="w-10 h-10 border-t-2 border-[#D4AF37] border-r-2 border-r-[#D4AF37]/20 rounded-full animate-spin mx-auto" />
                            <p className="text-[10px] uppercase text-[#D4AF37] tracking-widest font-sans font-bold">Verifying Signature Credentials...</p>
                        </div>
                    </div>
                )}

                <div className="space-y-6">
                    <div className="flex justify-between items-center border-b border-[#D4AF37]/15 pb-4 mb-2">
                        <div className="flex items-center gap-2">
                            <Shield className="w-4 h-4 text-[#D4AF37]" />
                            <span className="text-xs uppercase tracking-wider text-white font-sans font-bold">
                                Razorpay Secure Terminal
                            </span>
                        </div>
                    </div>

                    <div className="bg-[#081C3A] border border-[#D4AF37]/15 p-6 space-y-4">
                        <span className="text-[9px] tracking-[0.25em] text-[#D4AF37] font-bold uppercase block">
                            FEE SUMMARY CALCULATIONS
                        </span>

                        <div className="space-y-2 text-xs font-sans text-[#D9E1EC]/70">
                            <div className="flex justify-between border-b border-[#D4AF37]/15 pb-2">
                                <span>Application Fee:</span>
                                <span className="text-white font-semibold font-mono">₹{baseFee.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-sm pt-2 text-[#D4AF37] font-bold">
                                <span>Total Amount Payable:</span>
                                <span className="font-mono">₹{totalAmount.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    <p className="text-[9.5px] text-[#D9E1EC]/50 leading-relaxed italic">
                        * Note: This fee goes towards scheduling review casting, regional auditions training, and assessment dossiers.
                    </p>
                </div>

                <div className="mt-8 pt-6 border-t border-[#D4AF37]/15 space-y-2">
                    <button
                        onClick={handleRazorpayPayment}
                        disabled={processing}
                        className="w-full py-4 bg-[#D4AF37] hover:bg-[#081C3A] text-[#081C3A] hover:text-[#D4AF37] border border-transparent hover:border-[#D4AF37] font-sans font-bold text-xs tracking-wider transition-all duration-300 uppercase flex items-center justify-center gap-2"
                    >
                        <CreditCard className="w-4 h-4" /> SECURE LAUNCH TO CHECKOUT
                    </button>

                    <Link
                        href="/register"
                        className="w-full py-2 bg-transparent text-[#D9E1EC]/60 hover:text-white transition-colors text-center block text-[10px] uppercase tracking-wider font-semibold"
                    >
                        Change Registration Details
                    </Link>
                </div>

            </div>
        </div>
    );
}

export default function CheckoutPage() {
    return (
        <div className="flex flex-col min-h-screen bg-[#081C3A]">
            <Navbar />

            <main className="flex-grow">
                <Suspense fallback={
                    <div className="min-h-screen bg-[#081C3A] flex items-center justify-center text-[#D9E1EC]/60 font-sans">
                        <div className="text-center space-y-4">
                            <div className="w-12 h-12 border-t-2 border-[#D4AF37] border-r-2 border-r-[#D4AF37]/20 rounded-full animate-spin mx-auto" />
                            <p className="text-xs uppercase tracking-widest font-bold">Loading secure checkpoint...</p>
                        </div>
                    </div>
                }>
                    <CheckoutContent />
                </Suspense>
            </main>

            <Footer />
        </div>
    );
}