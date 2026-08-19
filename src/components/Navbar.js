'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [hash, setHash] = useState('');
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        setHash(window.location.hash);

        const handleHashChange = () => {
            setHash(window.location.hash);
        };

        const handleLinkClick = () => {
            setTimeout(() => {
                setHash(window.location.hash);
            }, 50);
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('hashchange', handleHashChange);
        window.addEventListener('click', handleLinkClick);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('hashchange', handleHashChange);
            window.removeEventListener('click', handleLinkClick);
        };
    }, []);

    useEffect(() => {
        setHash(window.location.hash);
    }, [pathname]);

    const navLinks = [
        { name: 'HOME', href: '/' },
        { name: 'ABOUT US', href: '/about' },
        { name: 'CONTACT', href: '/#contact' },
    ];

    return (
        <>
            <header
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b border-[#D4AF37]/20 ${isScrolled ? 'py-2 shadow-lg shadow-[#06162F]/50 bg-[#081C3A]/95 backdrop-blur-md' : 'py-4 bg-[#081C3A]'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">

                    {/* Logo Area */}
                    <Link href="/" className="flex items-center group">
                        <Image
                            src="/uploads/logo.png"
                            alt="NINTM Logo"
                            width={140}
                            height={50}
                            className="h-13 sm:h-12 md:h-14 w-auto object-contain"
                            priority
                        />
                    </Link>

                    {/* Centered Navigation */}
                    <nav className="hidden lg:flex items-center space-x-7">
                        {navLinks.map((link) => {
                            const isHashMatch = link.href.includes('#') && hash === link.href.substring(link.href.indexOf('#'));
                            const isActive = (link.href === '/' && pathname === '/' && !hash) ||
                                (link.href === '/about' && pathname === '/about') ||
                                isHashMatch;
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`text-[10px] tracking-[0.2em] font-sans font-semibold transition-colors duration-300 relative py-1 hover:text-[#D4AF37] ${isActive ? 'text-[#D4AF37]' : 'text-[#D9E1EC]/80'
                                        }`}
                                >
                                    {link.name}
                                    {isActive && (
                                        <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#D4AF37]" />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Action CTA */}
                    <div className="hidden lg:flex items-center space-x-5">
                        <Link
                            href="/register"
                            className="px-6 py-2.5 bg-[#D4AF37] border border-transparent text-[#081C3A] hover:bg-[#081C3A] hover:text-[#D4AF37] hover:border-[#D4AF37] font-sans font-bold text-[10px] tracking-[0.2em] transition-all duration-300 rounded-none uppercase"
                        >
                            REGISTER NOW
                        </Link>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-[#D9E1EC] hover:text-[#D4AF37] transition-colors p-1 cursor-pointer"
                            aria-label="Toggle Menu"
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Mobile Actions */}
                    <div className="flex items-center space-x-3 lg:hidden">
                        <Link
                            href="/register"
                            className="px-4 py-2 bg-[#D4AF37] border border-transparent hover:bg-[#081C3A] hover:text-[#D4AF37] hover:border-[#D4AF37] text-[#081C3A] font-sans font-extrabold text-[10px] tracking-wider transition-all duration-300 rounded-none"
                        >
                            REGISTER NOW
                        </Link>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-[#D9E1EC] hover:text-[#D4AF37] transition-colors p-1"
                            aria-label="Toggle Menu"
                        >
                            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>

                </div>
            </header>

            {/* Mobile Drawer */}
            <div
                className={`fixed inset-0 z-40 bg-[#06162F]/98 backdrop-blur-lg flex flex-col justify-center items-center transition-all duration-500 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
            >
                <div className="absolute top-6 right-6">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-[#D9E1EC] hover:text-[#D4AF37] transition-colors p-2"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <nav className="flex flex-col items-center space-y-6 text-center">
                    <Link href="/" className="mb-6 flex flex-col items-center" onClick={() => setIsOpen(false)}>
                        <Image
                            src="/uploads/logo.png"
                            alt="NINTM Logo"
                            width={160}
                            height={60}
                            className="h-16 w-auto object-contain mb-2"
                        />
                        <span className="text-[9px] font-sans tracking-[0.4em] text-[#C9A24D] font-bold mt-1">
                            THE COMEBACK 2026
                        </span>
                    </Link>

                    {navLinks.map((link) => {
                        const isHashMatch = link.href.includes('#') && hash === link.href.substring(link.href.indexOf('#'));
                        const isActive = (link.href === '/' && pathname === '/' && !hash) ||
                            (link.href === '/about' && pathname === '/about') ||
                            isHashMatch;
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className={`text-sm tracking-[0.25em] font-sans font-semibold transition-colors duration-300 ${isActive ? 'text-[#D4AF37]' : 'text-[#D9E1EC]/85 hover:text-[#D4AF37]'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        );
                    })}

                    <Link
                        href="/register"
                        onClick={() => setIsOpen(false)}
                        className="mt-6 px-8 py-3 bg-[#D4AF37] border border-transparent hover:bg-[#081C3A] hover:text-[#D4AF37] hover:border-[#D4AF37] text-[#081C3A] font-sans font-bold text-xs tracking-[0.2em] transition-all duration-300 rounded-none w-56 text-center"
                    >
                        REGISTER NOW
                    </Link>
                </nav>
            </div>
        </>
    );
}