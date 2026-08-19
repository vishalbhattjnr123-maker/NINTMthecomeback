'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Mail, MapPin, Phone, Shield, MessageSquare } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const pathname = usePathname();

    const legalLinks = [
        { name: 'TERMS & CONDITIONS', href: '/legal/terms' },
        { name: 'PRIVACY POLICY', href: '/legal/privacy' },
        { name: 'REFUND POLICY', href: '/legal/refund' },
        { name: 'CANCELLATION POLICY', href: '/legal/cancellation' },
        { name: 'DISCLAIMER', href: '/legal/disclaimer' }
    ];

    return (
        <footer className="bg-[#06162F] border-t border-[#D4AF37]/25 pt-16 pb-8 text-[#D9E1EC] font-sans z-10 relative">
            <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                {/* Brand Section */}
                <div className="flex flex-col space-y-4">
                    <Link href="/" className="flex flex-col group">
                        <span className="font-serif text-3xl font-extrabold tracking-widest text-[#D4AF37] group-hover:text-[#C9A24D] transition-colors duration-300">
                            NINTM
                        </span>
                        <span className="text-[9px] font-sans tracking-[0.35em] text-[#C9A24D] font-bold -mt-0.5">
                            THE COMEBACK 2026
                        </span>
                    </Link>
                    <p className="text-xs leading-relaxed text-[#D9E1EC]/70 max-w-sm">
                        North India&apos;s premier fashion model hunt platform discovering, grooming, and empowering modeling talent since 2012.
                    </p>
                    <div className="text-xs text-[#D4AF37] font-bold tracking-wider pt-2">
                        NINTM – The Comeback 2026
                        <div className="text-[#D9E1EC]/60 font-normal">Managed by Creativatorss</div>
                    </div>
                    <div className="flex flex-col items-start gap-2 pt-3">
                        <a
                            href="https://www.instagram.com/Iamcreativator"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-xs font-semibold text-[#D9E1EC] hover:text-[#D4AF37] transition-all bg-[#081C3A] border border-[#D4AF37]/20 hover:border-[#D4AF37] px-3.5 py-2 rounded-full duration-300 shadow-md hover:scale-[1.03] w-fit"
                        >
                            <svg className="w-4 h-4 text-[#D4AF37] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                            </svg>
                            <span>@Iamcreativator</span>
                        </a>
                        <a
                            href="https://www.instagram.com/nintmthecomeback?igsh=MTRlY3BzYzB0aW5jeQ=="
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-xs font-semibold text-[#D9E1EC] hover:text-[#D4AF37] transition-all bg-[#081C3A] border border-[#D4AF37]/20 hover:border-[#D4AF37] px-3.5 py-2 rounded-full duration-300 shadow-md hover:scale-[1.03] w-fit"
                        >
                            <svg className="w-4 h-4 text-[#D4AF37] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                            </svg>
                            <span>@nintmthecomeback</span>
                        </a>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="font-serif text-sm font-bold tracking-[0.2em] text-[#D4AF37] uppercase mb-6 flex items-center">
                        <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-none mr-2" />
                        Navigation
                    </h4>
                    <ul className="space-y-3 text-xs font-semibold tracking-wider text-white">
                        <li>
                            <Link href="/" className="hover:text-[#D4AF37] transition-colors duration-200">HOME</Link>
                        </li>
                        <li>
                            <Link href="/about" className="hover:text-[#D4AF37] transition-colors duration-200">ABOUT NINTM</Link>
                        </li>
                        <li>
                            <Link href="/#faq" className="hover:text-[#D4AF37] transition-colors duration-200">FAQ</Link>
                        </li>
                        <li>
                            <Link href="/#contact" className="hover:text-[#D4AF37] transition-colors duration-200">CONTACT</Link>
                        </li>
                        <li>
                            <Link href="/register" className="hover:text-[#D4AF37] transition-colors duration-200">REGISTER NOW</Link>
                        </li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h4 className="font-serif text-sm font-bold tracking-[0.2em] text-[#D4AF37] uppercase mb-6 flex items-center">
                        <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-none mr-2" />
                        Contact
                    </h4>
                    <ul className="space-y-4 text-xs font-semibold text-[#D9E1EC]/85">
                        <li className="flex items-start gap-3">
                            <Mail className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                            <a href="mailto:NintmTheComeBack@gmail.com" className="hover:text-[#D4AF37] transition-colors duration-200 break-all leading-relaxed">
                                NintmTheComeBack@gmail.com
                            </a>
                        </li>
                        <li className="flex items-start gap-3">
                            <Phone className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                            <a href="tel:+919631596066" className="hover:text-[#D4AF37] transition-colors duration-200 leading-relaxed font-mono">
                                96315-96066
                            </a>
                        </li>
                        <li className="flex items-start gap-3">
                            <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                            <span className="leading-relaxed text-[#D9E1EC]/60 font-normal">
                                DLF Phase 5, Sector 43<br />
                                Gurugram, Haryana – 122002
                            </span>
                        </li>
                    </ul>
                </div>

                {/* Legal Agreements */}
                <div>
                    <h4 className="font-serif text-sm font-bold tracking-[0.2em] text-[#D4AF37] uppercase mb-6 flex items-center">
                        <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-none mr-2" />
                        Legal Info
                    </h4>
                    <ul className="space-y-2.5 text-xs text-[#D9E1EC]/85 font-semibold">
                        {legalLinks.map((link) => (
                            <li key={link.name}>
                                <Link href={link.href} className="hover:text-[#D4AF37] transition-colors duration-150 flex items-center gap-1.5">
                                    <Shield className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Note about placeholders */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 border-t border-[#D4AF37]/20 py-6 text-[10px] text-[#D9E1EC]/50 flex flex-col gap-2">
                <p>
                    <strong>Legal Disclaimer Note:</strong> Registration fee details (₹699), refund policies, model contracts, company credentials (NINTM FASHION AND MODEL HUNT PRIVATE LIMITED, Sector 43 Gurugram), and official payment configurations are static mock representations. Official business setup and legal transactions are pending final certifications.
                </p>
            </div>

            {/* Bottom Bar */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 border-t border-[#D4AF37]/20 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#D9E1EC]/65 text-center sm:text-left gap-4 font-semibold">
                <div>
                    &copy; {currentYear} NINTM – The Comeback. All Rights Reserved.
                </div>
                <div className="text-[10px] uppercase tracking-wider text-[#D4AF37]/70">
                    Created with Prestige & Excellence • Managed by Creativatorss
                </div>
            </div>

            {/* FLOATING WHATSAPP BUTTON (Concierge Assistance widget) */}
            <a
                href="https://wa.me/919631596066"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Concierge WhatsApp Assistance"
                className="fixed bottom-20 md:bottom-6 right-6 z-50 w-11 h-11 bg-[#081C3A] border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#081C3A] rounded-full flex items-center justify-center transition-all duration-300 shadow-[0_4px_20px_rgba(212,175,55,0.25)] hover:scale-105"
            >
                <MessageSquare className="w-5 h-5" />
            </a>

            {/* STICKY BOTTOM MOBILE REGISTER CTA */}
            {pathname !== '/register' && pathname !== '/register/checkout' && (
                <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#06162F]/95 backdrop-blur-md border-t border-[#D4AF37]/30 px-4 py-3 flex md:hidden shadow-[0_-8px_30px_rgba(6,22,47,0.9)]">
                    <Link
                        href="/register"
                        className="w-full py-3 bg-[#D4AF37] text-[#081C3A] text-center font-sans font-extrabold text-xs tracking-[0.2em] uppercase transition-all duration-300 active:scale-[0.98] shadow-lg shadow-[#D4AF37]/10"
                    >
                        REGISTER NOW
                    </Link>
                </div>
            )}
        </footer>
    );
}
