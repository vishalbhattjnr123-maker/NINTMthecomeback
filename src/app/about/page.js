import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function About() {
    const companyRegistry = {
        legalName: 'NINTM FASHION AND MODEL HUNT PRIVATE LIMITED',
        business: 'Event Management, Talent Management, Fashion Shows, Media Curation, Brand Consulting',
        location: 'DLF Phase 5, Sector 43, Gurugram, Haryana – 122002',
        director: 'Prasant Sharrma, Director – Creativatorss'
    };

    const companyStory = [
        {
            title: 'Our Vision',
            desc: 'To establish a global benchmark for modeling discovery in India. We aim to break regional barriers, matching talents from diverse backdrops with premier national fashion labels, ensuring equal, meritocratic access to stardom.'
        },
        {
            title: 'Our Experience',
            desc: 'Over 12 years of core industry operations. Since launching in 2012, our team has steered major live runways, casting portfolios, commercial design catalogs, public relations, and celebrity model management assignments.'
        },
        {
            title: 'Talent Discovery',
            desc: 'Nurturing models from the ground up. We believe modeling transcends traditional standards, relying on self-assurance, screen posture, camera confidence, runway walk pace, and individualist character representations.'
        },
        {
            title: 'Event Production',
            desc: 'High-end production backing. Powered by Creativatorss, we have a robust production pipeline—handling lighting architecture, designer catalog wardrobes, choreography curation, backstage logistics, and high-definition event broadcasting.'
        },
        {
            title: 'Brand & Media',
            desc: 'Direct routes to advertising. We maintain long-term channels with brand marketing agencies, commercial production firms, television directors, online media, and magazine publications to create immediate post-finale jobs.'
        },
        {
            title: 'Global Aspirations',
            desc: 'Taking Indian talents to international platforms. We structure our training, styling, and communication drills in alignment with global agency standards, grooming candidates to confidently walk runways anywhere in the world.'
        },
        {
            title: 'Our Mission',
            desc: 'To build career infrastructure. We don’t merely conduct pageants or hand out participation certificates. We draft legally backed work contracts and offer continuous, professional advisory management for modeling careers.'
        }
    ];

    const timelineEvents = [
        {
            year: '2012',
            title: 'NINTM Brand Established',
            desc: 'Launched the inaugural season of North India’s Next Top Model search, pioneering organized regional casting auditions across North India.'
        },
        {
            year: '2012–2020',
            title: 'Model Hunt & Talent Development',
            desc: 'Successfully held consecutive annual runway seasons, discovering rising stars like Sara Gurpal, Sabby Suri, and Abhinav Dhir while expanding our training camps.'
        },
        {
            year: 'COVID-19',
            title: 'Temporary Break',
            desc: 'Auditions and live physical pageants paused globally. Our team focused on digital modeling sessions and restructured event templates.'
        },
        {
            year: '2026',
            title: 'NINTM – The Comeback',
            desc: 'Refreshed, bolder, and more rewarding restart: introducing the ₹15 Lakhs work contract and a fully automated registry portal managed by Creativatorss.'
        },
        {
            year: 'Dec 2026',
            title: 'Grand Finale',
            desc: 'The ultimate stage. Elite finalists from North Indian states compete under the spotlight of global casting agencies and designers.'
        }
    ];

    return (
        <div className="flex flex-col min-h-screen bg-[#081C3A] text-white font-sans selection:bg-[#D4AF37] selection:text-[#081C3A]">
            <Navbar />

            {/* Hero Header */}
            <section className="relative pt-44 pb-24 bg-[#081C3A] border-b border-[#D4AF37]/20 overflow-hidden flex items-center">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200"
                        alt="About NINTM Editorial Banner"
                        fill
                        sizes="100vw"
                        quality={80}
                        className="object-cover object-top opacity-10 grayscale"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#081C3A] via-[#081C3A]/80 to-transparent" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full text-center">
                    <span className="text-xs uppercase tracking-[0.4em] text-[#D4AF37] font-bold font-sans mb-3 block">
                        THE COMEBACK STORY
                    </span>
                    <h1 className="font-serif text-4xl md:text-6xl font-light tracking-tight text-white mb-4 uppercase">
                        North India&apos;s Next Top Model
                    </h1>
                    <p className="text-xs tracking-[0.25em] text-[#D9E1EC]/60 font-sans uppercase font-bold">
                        BY CREATIVATORSS
                    </p>
                </div>
            </section>

            {/* What We Are Section */}
            <section className="py-24 max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-6">
                    <span className="text-[11px] text-[#D4AF37] tracking-[0.3em] font-sans font-bold uppercase">
                        WHO WE ARE
                    </span>
                    <h2 className="font-serif text-3xl md:text-5xl font-light leading-tight text-white uppercase">
                        Discovering Future Icons
                    </h2>
                    <div className="w-16 h-[2px] bg-[#D4AF37]" />

                    <p className="text-[#D9E1EC] text-xs md:text-sm leading-relaxed font-sans font-normal">
                        North India’s Next Top Model, powered by Creativatorss, is a premier modeling and talent platform dedicated to discovering, nurturing and showcasing the next generation of fashion talent across North India.
                    </p>
                    <p className="text-[#D9E1EC] text-xs md:text-sm leading-relaxed font-sans font-normal">
                        We go beyond traditional beauty pageants and modeling contests by creating opportunities for aspiring models to build confidence, develop their professional identity, work with leading industry professionals and step into the world of fashion, entertainment and commercial modeling.
                    </p>
                </div>

                <div className="relative aspect-[4/3] border border-[#D4AF37]/25 overflow-hidden group p-2 bg-[#102B52]">
                    <div className="relative w-full h-full overflow-hidden">
                        <Image
                            src="/uploads/nintmcomeback.jpeg"
                            alt="Fashion Model Editorial Shooting Close Up"
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            quality={75}
                            className="object-cover transition-transform duration-[1.5s] group-hover:scale-105 "
                        />
                    </div>
                </div>
            </section>

            {/* Founder Biography - Prasant Sharrma (No Image, Elegant Luxury Editorial Card) */}
            <section className="py-24 bg-[#0B2347] border-y border-[#D4AF37]/20 relative overflow-hidden">
                {/* Decorative background grid/gradients for extra premium feel */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.05),transparent_70%)] pointer-events-none" />
                <div className="absolute -left-32 -bottom-32 w-96 h-96 bg-[#D4AF37]/2 rounded-full blur-[120px] pointer-events-none" />

                <div className="max-w-4xl mx-auto px-6 md:px-12 text-center relative z-10">
                    <span className="text-[11px] text-[#D4AF37] tracking-[0.4em] font-sans font-bold uppercase block mb-4">
                        Founder & Visionary Mentor
                    </span>
                    <h2 className="font-serif text-4xl md:text-6xl font-light leading-tight text-white uppercase tracking-wide mb-6">
                        Prasant Sharrma   
                    </h2>
                    <div className="w-24 h-[1.5px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mb-10" />

                    <div className="space-y-6 text-[#D9E1EC]/90 text-xs md:text-sm leading-relaxed font-sans font-light max-w-3xl mx-auto text-center">
                        <p className="font-medium text-white text-sm md:text-base leading-relaxed mb-4">
                            Prasant Sharrma is a renowned entrepreneur, fashion promoter, talent mentor, and lifestyle industry professional with over a decade of experience in discovering, grooming, and promoting emerging talent across India and international markets.
                        </p>
                        <p>
                            As the Founder of North India’s Next Top Models (NINTMTheComeBack) and Creativatorss Event & Production he has successfully created platforms that connect aspiring models, influencers, and fashion professionals with leading brands, designers, photographers, and entertainment companies.
                        </p>
                        <p>
                            Known for his passion for talent development and innovation, Prasant has been instrumental in organizing fashion weeks, modeling competitions, influencer campaigns, lifestyle events, and brand activations across India and overseas. His vision is to provide deserving talent with genuine opportunities, professional guidance, and a pathway to build successful careers in the fashion and entertainment industry.
                        </p>
                        <p>
                            Through NINTM The Comeback Prasant Sharrma aims to redefine the modeling landscape by creating a transparent, professional, and inclusive platform where talent is recognized on merit, confidence, personality, and dedication.
                        </p>
                        <p>
                            His commitment to excellence, creativity, and industry growth continues to inspire thousands of aspiring models and creators across the country.
                        </p>
                    </div>

                    <div className="mt-12 max-w-xl mx-auto border-t border-[#D4AF37]/20 pt-8">
                        <blockquote className="italic font-serif text-lg md:text-2xl text-[#D4AF37]">
                            &ldquo;Talent deserves a stage. NINTM The comeback is that stage.&rdquo;
                        </blockquote>
                    </div>
                </div>
            </section>

            {/* Company registry information & Story segments */}
            <section className="py-24 max-w-7xl mx-auto px-6 md:px-12 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

                    {/* Registry information block */}
                    <div className="lg:col-span-1 space-y-8 lg:sticky lg:top-32 h-fit">
                        <div className="border border-[#D4AF37]/25 bg-[#0B2347] p-8">
                            <span className="text-[10px] tracking-[0.25em] text-[#D4AF37] font-extrabold font-sans uppercase mb-4 block">
                                BUSINESS ENTITY PROFILE
                            </span>
                            <h3 className="font-serif text-xl font-bold text-white mb-6 uppercase leading-snug">
                                NINTM REGISTRY INFO
                            </h3>

                            <div className="space-y-5 text-xs font-sans font-semibold text-[#D9E1EC]/80">
                                <div>
                                    <span className="text-[#D9E1EC]/70 font-bold block uppercase mb-1">
                                        PRIMARY OPERATIONS:
                                    </span>
                                    <span className="text-white leading-relaxed block font-medium">
                                        {companyRegistry.business}
                                    </span>
                                </div>

                                <div>
                                    <span className="text-[#D9E1EC]/70 font-bold block uppercase mb-1">
                                        OFFICIAL HEADQUARTERS:
                                    </span>
                                    <span className="text-white leading-relaxed block font-medium">
                                        {companyRegistry.location}
                                    </span>
                                </div>

                                <div>
                                    <span className="text-[#D9E1EC]/70 font-bold block uppercase mb-1">
                                        FOUNDING DIRECTOR:
                                    </span>
                                    <span className="text-[#D4AF37] font-bold block">
                                        {companyRegistry.director}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="text-xs text-[#D9E1EC]/50 leading-relaxed font-sans italic border-l border-[#D4AF37]/20 pl-4 py-1">
                            * Official candidate applications, scheduling audits, and grooming services under NINTM are powered by NINTM FASHION AND MODEL HUNT PRIVATE LIMITED.
                        </div>
                    </div>

                    {/* Company story segmented */}
                    <div className="lg:col-span-2 space-y-12">
                        <div className="space-y-4">
                            <span className="text-[11px] text-[#D4AF37] tracking-[0.3em] font-sans font-bold uppercase">
                                EDITORIAL BREAKDOWN
                            </span>
                            <h2 className="font-serif text-2xl md:text-4xl font-light text-white uppercase">
                                The Infrastructure of Fashion
                            </h2>
                            <div className="w-12 h-[1px] bg-[#D4AF37]" />
                        </div>

                        <div className="space-y-10">
                            {companyStory.map((story, i) => (
                                <div key={i} className="flex gap-6 border-b border-[#D4AF37]/20 pb-8 last:border-b-0 font-sans">
                                    <span className="font-serif text-2xl text-[#D4AF37] font-bold shrink-0 w-8">
                                        {String(i + 1).padStart(2, '0')}
                                    </span>
                                    <div>
                                        <h4 className="font-serif text-lg text-white font-bold mb-2 uppercase">
                                            {story.title}
                                        </h4>
                                        <p className="text-[#D9E1EC] text-xs md:text-sm leading-relaxed font-sans font-normal">
                                            {story.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </section>

            {/* Legacy Timeline Section */}
            <section className="py-24 bg-[#06162F] border-t border-[#D4AF37]/20 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 md:px-12">

                    <div className="text-center mb-16">
                        <span className="text-[11px] text-[#D4AF37] tracking-[0.3em] font-sans font-bold uppercase block mb-2">
                            TIMELINE PROFILE
                        </span>
                        <h2 className="font-serif text-3xl md:text-5xl font-light text-white uppercase">
                            NINTM Legacy Timeline
                        </h2>
                        <div className="w-12 h-[1px] bg-[#D4AF37] mx-auto mt-4" />
                    </div>

                    <div className="relative max-w-4xl mx-auto pt-8">
                        {/* Center Line on desktop, Left Line on mobile */}
                        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-[#D4AF37]/20 -translate-x-1/2" />

                        <div className="space-y-16">
                            {timelineEvents.map((ev, index) => {
                                const isEven = index % 2 === 0;
                                return (
                                    <div key={index} className="relative flex flex-col md:flex-row items-start md:items-center">

                                        {/* Circle Node indicator */}
                                        <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-[#081C3A] border-2 border-[#D4AF37] rounded-full z-10 -translate-x-1/2 pointer-events-none" />

                                        {/* Left Column for Odd timeline boxes, Spacer for Even */}
                                        <div className={`w-full md:w-1/2 pl-12 md:pl-0 md:pr-12 text-left md:text-right ${isEven ? 'block' : 'hidden md:block md:invisible'}`}>
                                            {isEven && (
                                                <div className="space-y-2">
                                                    <span className="font-serif text-3xl md:text-4xl text-[#D4AF37] font-extrabold block">
                                                        {ev.year}
                                                    </span>
                                                    <h4 className="font-serif text-sm font-bold text-white uppercase">
                                                        {ev.title}
                                                    </h4>
                                                    <p className="text-[#D9E1EC] text-xs font-sans leading-relaxed">
                                                        {ev.desc}
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Right Column for Even timeline boxes, Spacer for Odd */}
                                        <div className={`w-full md:w-1/2 pl-12 md:pl-12 text-left ${!isEven ? 'block' : 'hidden md:block md:invisible'}`}>
                                            {!isEven && (
                                                <div className="space-y-2">
                                                    <span className="font-serif text-3xl md:text-4xl text-[#D4AF37] font-extrabold block">
                                                        {ev.year}
                                                    </span>
                                                    <h4 className="font-serif text-sm font-bold text-white uppercase">
                                                        {ev.title}
                                                    </h4>
                                                    <p className="text-[#D9E1EC] text-xs font-sans leading-relaxed">
                                                        {ev.desc}
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                    </div>
                                );
                            })}
                        </div>

                    </div>

                </div>
            </section>

            {/* CTA Footer Wrapper */}
            <section className="py-24 bg-[#0B2347] text-center flex flex-col items-center justify-center border-t border-[#D4AF37]/20">
                <h2 className="font-serif text-xl md:text-3xl font-light text-white mb-6 uppercase">
                    BECOME PART OF OUR LEGACY
                </h2>
                <Link
                    href="/register"
                    className="px-8 py-3.5 bg-[#D4AF37] border border-transparent text-[#081C3A] hover:bg-[#081C3A] hover:text-[#D4AF37] hover:border-[#D4AF37] font-sans font-bold text-xs tracking-[0.2em] transition-all duration-300"
                >
                    START REGISTRATION NOW
                </Link>
            </section>

            <Footer />
        </div>
    );
}
