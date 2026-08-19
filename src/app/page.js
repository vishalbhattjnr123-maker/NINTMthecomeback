'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ChevronDown,
  ChevronUp,
  MapPin,
  Phone,
  Mail,
  User,
  Send,
  Plus,
  Minus,
  Award,
  Sparkles,
  Trophy,
  Users,
  Compass,
  ArrowRight,
  Calendar
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Home() {
  const [openFaq, setOpenFaq] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [contactData, setContactData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  // Two independent components: one for girls, one for boys.
  // Each has its own image+name pair, so the name always changes together with its image.
  const girlStars = [
    { src: "/uploads/avantikaharival.jpeg", name: "Avantika Hari Nalwa" },
    { src: "/uploads/Sabby Suri.jpeg", name: "Sabby Suri" },
    { src: "/uploads/jasmin.jpeg", name: "Jasmine Kaur" },
    { src: "/uploads/sara kaur.jpeg", name: "Sara Gurpal" },
  ];

  const boyStars = [
    { src: "/uploads/man.jpg.jpeg", name: "Aamir" },
    { src: "/uploads/Jojo.jpeg", name: "Jojo Singh" },
     { src: "/uploads/Malemodel.jpeg", name: "Aamir" },
    { src: "/uploads/Jojo singh.jpeg", name: "Jojo Singh" },
  ];

  const [currentGirl, setCurrentGirl] = useState(0);
  const [currentBoy, setCurrentBoy] = useState(0);

  // Girls card rotates on its own timer.
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGirl((prev) => (prev + 1) % girlStars.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Boys card rotates on its own timer too, but offset so it changes
  // a beat after the girls card — not at the same moment.
  useEffect(() => {
    let interval;
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        setCurrentBoy((prev) => (prev + 1) % boyStars.length);
      }, 2500);
    }, 1250);
    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, []);

  const toggleFaq = (index) => {
    if (openFaq === index) {
      setOpenFaq(null);
    } else {
      setOpenFaq(index);
    }
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();

    if (!contactData.name.trim()) {
      alert("Please enter your name.");
      return;
    }
    if (!contactData.phone.trim()) {
      alert("Please enter your phone number.");
      return;
    }
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactData.email.trim());
    if (!contactData.email.trim() || !isEmailValid) {
      alert("Please enter a valid email address.");
      return;
    }
    if (!contactData.message.trim()) {
      alert("Please enter your inquiry.");
      return;
    }

    const messageText = `Hello NINTM Team,

I have an inquiry regarding North India's Next Top Models – The Comeback 2026.

Name: ${contactData.name.trim()}

Phone: ${contactData.phone.trim()}

Email: ${contactData.email.trim()}

Inquiry:
${contactData.message.trim()}

I would like to know more about NINTM 2026 and the registration process.

Thank you.`;

    const encodedMessage = encodeURIComponent(messageText);
    const whatsappUrl = `https://wa.me/919631596066?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const faqs = [
    { q: "How can I apply?", a: "Go to the Become a Model page, complete the multi-step registration form with your physical details, attach your Government ID proof and photoshoots, and complete the digital application fee." },
    { q: "What are the eligibility requirements?", a: "Review our eligibility checklist (age 16-30, height 5'3\" for females, 5'7\" for males) and keep a Government ID proof and three photographs ready." },
    { q: "Who can participate?", a: "Aspiring male and female models who meet the physical height criteria, age parameters, and are Indian Nationals or NRI status holders." },
    { q: "Can beginners participate?", a: "Yes. NINTM welcomes freshers and aspiring models. The platform discoveries raw potential and guides them to meet global standards." },
    { q: "What happens after registration?", a: "Your candidate dossier will be cached in our database. The director office will dispatch your invitation and audition venue coordinates via SMS/email." },
    { q: "What happens after the audition?", a: "Selected candidates progress through grooming bootcamps, physical look tests, catalog shoots, and styling rounds towards the Grand Finale in Dec 2026." },
    { q: "What kind of training is provided?", a: "Comprehensive grooming covering runway ramp walks, posing guides under directors, confidence drills, communications, diet and style advisory." },
    { q: "Will I get professional exposure?", a: "Yes. Finalists are placed directly in front of lead fashion designers, advertising directors, print media photographers, and casting agents." },
    { q: "What can the winner expect?", a: "The grand winner will receive a professional work contract worth ₹15 Lakhs INR, legally guaranteed on Stamp Paper with Creativatorss." },
    { q: "Where can I get audition updates?", a: "Follow the official NINTM by Creativatorss social media channels and check your profile dashboard for real-time news." }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#081C3A] text-white font-sans selection:bg-[#D4AF37] selection:text-[#081C3A]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[92vh] lg:h-screen w-full flex items-center justify-between overflow-hidden bg-[#081C3A] pt-20 lg:pt-16 pb-8 md:pb-12">
        <div className="absolute inset-0 bg-[#081C3A]/40 z-0" />

        {/* Subtle oversized background text */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] select-none pointer-events-none z-0">
          <span className="font-serif text-[28vw] font-bold tracking-widest text-[#D4AF37]">
            NINTM
          </span>
        </div>

        {/* Decorative thin gold lines and circular arcs */}
        <div className="absolute top-24 left-1/4 w-96 h-96 border border-[#D4AF37]/10 rounded-full pointer-events-none z-0" />
        <div className="absolute bottom-16 right-1/4 w-[500px] h-[500px] border border-[#D4AF37]/5 rounded-full pointer-events-none z-0" />
        <div className="absolute top-1/2 left-10 w-4 h-4 rounded-full bg-[#C9A24D]/15 pointer-events-none z-0" />
        <div className="absolute bottom-1/3 right-12 w-2 h-2 rounded-full bg-[#C9A24D]/35 pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full h-full grid grid-cols-1 lg:grid-cols-10 gap-8 relative z-10 items-center">

          {/* LEFT: Female Model Frame (desktop) */}
          <div className="hidden lg:block lg:col-span-3 h-[72vh] relative">
            {/* Circular gold line behind the female model */}
            <div className="absolute -top-8 -left-8 w-[320px] h-[320px] rounded-full border border-gold-champagne/15 pointer-events-none z-0" />
            <div className="relative w-full h-full overflow-hidden z-10">
              <Image
                src="/uploads/girl.png"
                alt="NINTM Female High-End Model"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 30vw, 25vw"
                quality={80}
                className="object-cover object-top transition-transform duration-700 hover:scale-105"
                priority
              />
            </div>
          </div>

          {/* CENTER: Editorial Typography content */}
          <div className="lg:col-span-4 text-center flex flex-col items-center justify-center space-y-4 lg:space-y-6 py-3 md:py-12 z-20">

            {/* Mobile Model Banner (Only visible on mobile) */}
            <div className="block lg:hidden w-full aspect-[3/4] relative max-w-[190px] sm:max-w-[240px] mx-auto mb-3 border border-[#D4AF37]/35 p-1.5 bg-[#0B2347] shadow-lg">
              <Image
                src="/uploads/poster .jpeg"
                alt="NINTM Model Auditions Poster"
                fill
                sizes="(max-width: 768px) 190px, 240px"
                quality={80}
                className="object-cover object-top"
                priority
              />
            </div>

            <span className="text-[10px] md:text-xs text-[#D4AF37] tracking-[0.45em] font-extrabold uppercase block font-sans">
              NORTH INDIA&apos;S NEXT TOP MODELS
            </span>

            {/* Main Header */}
            <div className="space-y-1">
              <h1 className="font-serif text-2xl sm:text-3xl md:text-[42px] lg:text-[48px] font-light tracking-[0.08em] text-[#D4AF37] uppercase leading-tight">
                THE STAGE IS READY.
              </h1>
              <h1 className="font-serif text-2xl sm:text-3xl md:text-[42px] lg:text-[48px] font-light tracking-[0.08em] text-white uppercase leading-tight">
                THE SPOTLIGHT IS WAITING.
              </h1>
            </div>

            {/* Indian-inspired / Namaste-style tiny diamond separator */}
            <div className="flex items-center gap-3 w-48 justify-center">
              <span className="h-[0.5px] bg-[#D4AF37]/45 flex-grow" />
              <span className="w-1.5 h-1.5 bg-[#D4AF37] rotate-45 shrink-0" />
              <span className="h-[0.5px] bg-[#D4AF37]/45 flex-grow" />
            </div>

            <p className="max-w-xs text-xs sm:text-base text-[#D9E1EC] font-sans tracking-wide leading-relaxed font-normal">
              Discovering, grooming and empowering the next generation of fashion and modeling talent across North India.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 w-full justify-center pt-1 px-4 sm:px-0">
              <Link
                href="/register"
                className="px-8 py-3.5 bg-[#D4AF37] border border-transparent text-[#081C3A] hover:bg-[#081C3A] hover:text-[#D4AF37] hover:border-[#D4AF37] font-sans font-bold text-xs tracking-[0.25em] transition-all duration-300 w-full sm:w-auto uppercase text-center shrink-0 shadow-md active:scale-[0.99]"
              >
                REGISTER NOW
              </Link>
              <Link
                href="/about"
                className="px-8 py-3 bg-transparent border border-[#D4AF37] text-white hover:bg-[#D4AF37] hover:text-[#081C3A] font-sans font-bold text-xs tracking-[0.25em] transition-all duration-300 w-full sm:w-auto uppercase text-center shrink-0 active:scale-[0.99]"
              >
                DISCOVER NINTM
              </Link>
            </div>

            <div className="space-y-3 pt-2 flex flex-col items-center">
              <span className="text-[9px] uppercase tracking-[0.25em] text-white/50 font-bold block">
                Where Talent Meets Opportunity.
              </span>

              {/* Subtle Scroll Indicator */}
              <a href="#stats" className="flex flex-col items-center gap-1.5 text-white/50 hover:text-[#D4AF37] transition-colors mt-2">
                <span className="text-[8px] tracking-[0.3em] uppercase font-bold">EXPLORE MORE ↓</span>
              </a>
            </div>

          </div>

          {/* RIGHT: Male Model Frame (desktop) */}
          <div className="hidden lg:block lg:col-span-3 h-[72vh] relative">
            {/* Circular gold line behind the male model */}
            <div className="absolute -bottom-8 -right-8 w-[320px] h-[320px] rounded-full border border-gold-champagne/15 pointer-events-none z-0" />
            <div className="relative w-full h-full overflow-hidden z-10">
              <Image
                src="/uploads/Malemodel.jpeg"
                alt="NINTM Male High-End Model"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 30vw, 25vw"
                quality={80}
                className="object-cover object-top transition-transform duration-700 hover:scale-105"
                priority
              />
            </div>
          </div>

        </div>
      </section>

      {/* Statistics Section */}
      <section id="stats" className="bg-[#06162F] py-14 border-y border-[#D4AF37]/20 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-[#D4AF37]/20">

          {/* Stat 1: 2012 */}
          <div className="flex flex-col items-center space-y-2.5 text-center md:pb-0 pb-6">
            <div className="text-[#D4AF37]">
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4.5 15.5c-1.5-2.5-1.2-6 .8-8.5" />
                <path d="M4.5 13.5c-.8-1.5-.7-3.5.5-5" />
                <path d="M5.5 10.5c-.5-1-.2-2.3.8-3.2" />
                <path d="M19.5 15.5c1.5-2.5 1.2-6-.8-8.5" />
                <path d="M19.5 13.5c.8-1.5.7-3.5-.5-5" />
                <path d="M18.5 10.5c.5-1 .2-2.3-.8-3.2" />
                <path d="M12 3a9 9 0 00-6.36 15.36M12 3a9 9 0 016.36 15.36" />
                <polygon points="12 8.5 13.5 11.5 16.5 11.5 14 13.5 15 16.5 12 14.5 9 16.5 10 13.5 7.5 11.5 10.5 11.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </div>
            <div className="font-serif text-4xl lg:text-5xl font-light text-[#D4AF37] tracking-wide">
              2012
            </div>
            <div className="text-[10px] tracking-[0.25em] uppercase text-white font-bold font-sans mt-0.5">
              SINCE 2012
            </div>
            <div className="text-[10px] text-[#D9E1EC] font-sans mt-0.5 font-normal">
              14 Years of Legacy
            </div>
          </div>

          {/* Stat 3: 15L+ */}
          <div className="flex flex-col items-center space-y-2.5 text-center pt-6 md:pt-0 pb-6 md:pb-0">
            <div className="text-[#D4AF37]">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M6 9H4.5a2 2 0 01-2-2V6a2 2 0 012-2h15A2 2 0 0121.5 6v1a2 2 0 01-2 2H18" />
                <path d="M6 4v5c0 3 2.5 5.5 6 5.5s6-2.5 6-5.5V4" />
                <path d="M12 14.5v5m-4 0h8m-6 3h4" />
              </svg>
            </div>
            <div className="font-serif text-4xl lg:text-5xl font-light text-[#D4AF37] tracking-wide">
              ₹15 Lacs
            </div>
            <div className="text-[10px] tracking-[0.25em] uppercase text-white font-bold font-sans mt-0.5">
              WINNER WORK CONTRACT
            </div>
            <div className="text-[10px] text-[#D9E1EC] font-sans mt-0.5 font-normal">
              Worth Fifteen Lakhs
            </div>
          </div>

          {/* Stat 4: DEC '26 */}
          <div className="flex flex-col items-center space-y-2.5 text-center pt-6 md:pt-0">
            <div className="text-[#D4AF37]">
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <rect x="3" y="4" width="18" height="17" rx="2" />
                <path d="M3 9h18M16 2v4M8 2v4" />
                <polygon points="12 11.5 13 13.5 15.2 13.5 13.5 15 14 17.2 12 15.7 10 17.2 10.5 15 8.8 13.5 11 13.5" fill="currentColor" />
              </svg>
            </div>
            <div className="font-serif text-4xl lg:text-5xl font-light text-[#D4AF37] tracking-wide">
              DEC &apos;2026
            </div>
            <div className="text-[10px] tracking-[0.25em] uppercase text-white font-bold font-sans mt-0.5">
              DECEMBER 2026
            </div>
            <div className="text-[10px] text-[#D9E1EC] font-sans mt-0.5 font-normal">
              Grand Finale
            </div>
          </div>

        </div>
      </section>

      {/* Our Iconic Stars — 3 synced cards: image + name change together */}
      <section className="bg-[#06162F] py-20 px-6 md:px-10 text-center border-y border-[#D4AF37]/20">
        <span className="text-[10px] tracking-[0.3em] text-[#D4AF37] font-extrabold uppercase font-sans block mb-3">
          NINTM PREVIOUS WINNERS
        </span>
        <h2 className="font-serif text-3xl md:text-5xl font-light text-[#D4AF37] uppercase tracking-wide">

          Our iconic stars, rising from our legacy to shine on the global stage.
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto">

          {/* Component 1: Girls — true crossfade, old image/name fades out as the next fades in on top of it */}
          <div className="flex flex-col items-center">
            <span className="text-[9px] tracking-[0.3em] text-[#D9E1EC]/60 font-bold uppercase font-sans mb-3">
              Female
            </span>
            <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden border border-[#D4AF37]/30 shadow-lg shadow-black/40 bg-[#081C3A]">
              {girlStars.map((star, i) => (
                <img
                  key={star.src}
                  src={star.src}
                  alt={star.name}
                  className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-[1200ms] ease-in-out ${i === currentGirl ? "opacity-100" : "opacity-0"
                    }`}
                />
              ))}
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#081C3A] via-[#081C3A]/60 to-transparent" />
            </div>
            <div className="relative mt-4 h-7 w-full">
              {girlStars.map((star, i) => (
                <span
                  key={star.name + i}
                  className={`absolute inset-0 flex items-center justify-center font-serif text-lg md:text-xl text-[#D4AF37] tracking-wide uppercase transition-opacity duration-[1200ms] ease-in-out ${i === currentGirl ? "opacity-100" : "opacity-0"
                    }`}
                >
                  {star.name}
                </span>
              ))}
            </div>
          </div>

          {/* Component 2: Boys — same crossfade behaviour, on its own independent timer */}
          <div className="flex flex-col items-center">
            <span className="text-[9px] tracking-[0.3em] text-[#D9E1EC]/60 font-bold uppercase font-sans mb-3">
              Male
            </span>
            <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden border border-[#D4AF37]/30 shadow-lg shadow-black/40 bg-[#081C3A]">
              {boyStars.map((star, i) => (
                <img
                  key={star.src}
                  src={star.src}
                  alt={star.name}
                  className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-[1200ms] ease-in-out ${i === currentBoy ? "opacity-100" : "opacity-0"
                    }`}
                />
              ))}
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#081C3A] via-[#081C3A]/60 to-transparent" />
            </div>
            <div className="relative mt-4 h-7 w-full">
              {boyStars.map((star, i) => (
                <span
                  key={star.name + i}
                  className={`absolute inset-0 flex items-center justify-center font-serif text-lg md:text-xl text-[#D4AF37] tracking-wide uppercase transition-opacity duration-[1200ms] ease-in-out ${i === currentBoy ? "opacity-100" : "opacity-0"
                    }`}
                >
                  {star.name}
                </span>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* The Comeback Section */}
      <section className="py-24 max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT: Black and White Fashion Models image */}
          <div className="aspect-[4/3] relative border border-[#D4AF37]/25 p-2 bg-[#102B52]">
            <div className="relative w-full h-full overflow-hidden">
              <Image
                src="/uploads/nintmthecomeback.jpeg"
                alt="NINTM Comeback Campaign Showcase"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px"
                quality={75}
                className="object-cover  hover: transition-all duration-700"
              />
              <div className="absolute inset-0 bg-[#081C3A]/25 pointer-events-none z-10" />
            </div>
          </div>

          {/* RIGHT: Story and details */}
          <div className="space-y-6">
            <span className="text-[10px] text-[#D4AF37] tracking-[0.35em] font-extrabold uppercase font-sans">
              NINTM
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-light text-[#D4AF37] uppercase tracking-wide">
              THE COMEBACK
            </h2>
            <div className="w-16 h-[1px] bg-[#D4AF37]" />

            <div className="text-[#D9E1EC] text-xs md:text-sm font-sans space-y-4 leading-relaxed font-normal">
              <p>
                North India&apos;s Next Top Models (NINTM) has been one of North India&apos;s most successful model hunt platforms for male and female talent since 2012.
              </p>
              <p>
                After a significant break following the COVID-19 pandemic, NINTM – The Comeback marks the return of this iconic model hunt in a bigger and more rewarding format.
              </p>
              <p>
                NINTM is more than just a competition. It is a career-building platform designed to discover, groom and promote the next generation of fashion talent.
              </p>
            </div>

            {/* Winner Opportunity Card */}
            <div className="mt-8 border border-[#D4AF37] bg-[#102B52] p-6 relative max-w-md">
              <span className="absolute top-2 left-6 text-[#D4AF37] font-serif text-4xl opacity-50">&ldquo;</span>
              <div className="pl-6 space-y-2 pt-2">
                <span className="text-[9px] uppercase tracking-widest text-[#9E2335] font-bold block">
                  OFFICIAL WINNER CONTRACT DESIGNATION
                </span>
                <p className="text-xs text-[#D9E1EC]/70">
                  The winner will receive a professional work contract worth
                </p>
                <div className="font-serif text-3xl font-extrabold tracking-wide text-[#D4AF37] py-1">
                  ₹15 LAKHS
                </div>
                <p className="text-[9px] text-white font-bold tracking-wider uppercase font-sans">
                  INR ON STAMP PAPER WITH CREATIVATORSS
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Why NINTM section */}
      <section className="py-24 bg-[#081C3A] border-y border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full text-center space-y-12">
          <div className="space-y-3">
            <h2 className="font-serif text-3xl md:text-5xl font-light text-[#D4AF37] uppercase tracking-wide">
              WHY NINTM?
            </h2>
            <p className="text-[10px] md:text-xs text-[#D4AF37] tracking-[0.25em] font-extrabold uppercase font-sans">
              MORE THAN A COMPETITION. A PLATFORM FOR YOUR CAREER.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-6">
            {[
              {
                num: '01',
                title: 'DISCOVER YOUR POTENTIAL',
                desc: 'A platform to showcase your unique personality, confidence, style and individuality.'
              },
              {
                num: '02',
                title: 'PROFESSIONAL DEVELOPMENT',
                desc: 'Gain exposure to grooming, runway, posing, personality development and industry standards.'
              },
              {
                num: '03',
                title: 'REAL INDUSTRY EXPOSURE',
                desc: 'Experience professional shoots, fashion shows, campaigns, events and networking opportunities.'
              },
              {
                num: '04',
                title: 'CAREER OPPORTUNITIES',
                desc: 'Open doors to modeling, fashion, advertising, media and entertainment projects.'
              }
            ].map((card, idx) => (
              <div
                key={idx}
                className="bg-[#0B2347] border border-[#D4AF37]/25 p-8 text-left transition-all duration-300 hover:-translate-y-2 hover:border-[#D4AF37] hover:shadow-lg hover:shadow-[#0B2347]/50 group"
              >
                <span className="font-serif text-2xl font-bold text-[#D4AF37] block mb-4">
                  {card.num}
                </span>
                <h4 className="font-serif text-sm font-bold text-white group-hover:text-[#D4AF37] transition-all tracking-wide mb-3 uppercase">
                  {card.title}
                </h4>
                <p className="text-[#D9E1EC] text-xs font-sans leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Creativatorss Section */}
      <section className="py-24 bg-[#0B2347] border-y border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-5 gap-12 items-baseline">

          <div className="lg:col-span-2 space-y-4">
            <span className="text-[10px] tracking-[0.3em] font-extrabold text-[#D4AF37] uppercase block">
              MANAGED BY
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-[#D4AF37] uppercase">
              CREATIVATORSS
            </h2>
            <div className="w-12 h-[1px] bg-[#D4AF37]" />
          </div>

          <div className="lg:col-span-3 space-y-8">
            <p className="text-[#D9E1EC] text-xs md:text-sm font-sans leading-relaxed">
              33 Talent Management & Digitech Pvt. Ltd. is a dynamic Event Management, Talent Management, Fashion, Media and Brand Consulting company dedicated to creating impactful experiences and meaningful opportunities. Creativatorss brings a complete talent and production backbone to NINTM.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-[#D4AF37]/20 pt-6">
              {['EVENT MANAGEMENT', 'TALENT MANAGEMENT', 'FASHION & MEDIA'].map((dept) => (
                <div key={dept} className="border border-[#D4AF37]/25 bg-[#081C3A] p-4 text-center">
                  <span className="text-[9.5px] uppercase tracking-widest text-[#D9E1EC] font-bold font-sans hover:text-[#D4AF37] transition-all">
                    {dept}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex gap-2 items-center text-[#D9E1EC]/70 font-sans text-xs pt-2">
              <MapPin className="w-4 h-4 text-[#D4AF37]" />
              <span>DLF Phase 5, Sector 43, Gurugram, Haryana – 122002</span>
            </div>
          </div>

        </div>
      </section>

      {/* Legacy Section */}
      <section className="py-24 max-w-4xl mx-auto px-6 md:px-12 w-full text-center space-y-16">
        <div className="space-y-3">
          <span className="text-[10px] tracking-[0.3em] text-[#D4AF37] font-extrabold uppercase font-sans block">
            OUR HISTORICAL PATH
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-light text-[#D4AF37] uppercase tracking-wide">
            OUR LEGACY TIMELINE
          </h2>
          <div className="w-16 h-[1px] bg-[#D4AF37] mx-auto" />
        </div>

        {/* Vertical Timeline Tree */}
        <div className="relative border-l border-[#D4AF37]/20 text-left pl-8 md:pl-12 space-y-12 max-w-2xl mx-auto font-sans">

          {/* Item 1 */}
          <div className="relative group">
            {/* Timeline Dot */}
            <div className="absolute -left-[37px] md:-left-[53px] top-1.5 w-4 h-4 bg-[#081C3A] border-2 border-[#D4AF37] rounded-full group-hover:bg-[#D4AF37] transition-all duration-300" />
            <div className="space-y-2">
              <span className="font-serif text-3xl font-light text-[#D4AF37] block leading-none">2012</span>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">Brand Established</h4>
              <p className="text-[#D9E1EC] text-[16px] leading-relaxed font-normal">
                Launch of the inaugural season of North India&apos;s Next Top Model search, pioneering organized regional casting auditions across major North Indian cities.
              </p>
            </div>
          </div>

          {/* Item 2 */}
          <div className="relative group">
            <div className="absolute -left-[37px] md:-left-[53px] top-1.5 w-4 h-4 bg-[#081C3A] border-2 border-[#D4AF37] rounded-full group-hover:bg-[#D4AF37] transition-all duration-300" />
            <div className="space-y-2">
              <span className="font-serif text-3xl font-light text-[#D4AF37] block leading-none">2012 – 2020</span>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">The Legacy Runway Journey</h4>
              <p className="text-[#D9E1EC] text-[16px] leading-relaxed font-normal">
                Successfully held consecutive annual runway seasons, discovering rising talent like Sara Gurpal, Sabby Suri, and Abhinav Dhir, training over 1000+ fashion aspirants.
              </p>
            </div>
          </div>

          {/* Item 3 */}
          <div className="relative group">
            <div className="absolute -left-[37px] md:-left-[53px] top-1.5 w-4 h-4 bg-[#081C3A] border-2 border-[#D4AF37] rounded-full group-hover:bg-[#D4AF37] transition-all duration-300" />
            <div className="space-y-2">
              <span className="font-serif text-3xl font-light text-[#D4AF37] block leading-none">2020 – 2025</span>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">Strategic Sabbatical & Covid Pause</h4>
              <p className="text-[#D9E1EC] text-[16px] leading-relaxed font-normal">
                Auditions and live physical pageants paused globally. Our director office focused on digital portfolio masterclasses and revamped the competition model.
              </p>
            </div>
          </div>

          {/* Item 4 */}
          <div className="relative group">
            <div className="absolute -left-[37px] md:-left-[53px] top-1.5 w-4 h-4 bg-[#081C3A] border-2 border-[#D4AF37] rounded-full group-hover:bg-[#D4AF37] transition-all duration-300" />
            <div className="space-y-2">
              <span className="font-serif text-3xl font-light text-[#D4AF37] block leading-none">2026</span>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">NINTM – The Comeback</h4>
              <p className="text-[#D9E1EC] text-[16px] leading-relaxed font-normal">
                Refreshed, bolder, and more rewarding restart: introducing the ₹15 Lakhs work contract and a fully automated registry portal managed by Creativatorss.
              </p>
            </div>
          </div>

          {/* Item 5 */}
          <div className="relative group">
            <div className="absolute -left-[37px] md:-left-[53px] top-1.5 w-4 h-4 bg-[#D4AF37] border-2 border-[#D4AF37] rounded-full" />
            <div className="space-y-2">
              <span className="font-serif text-3xl font-normal text-[#D4AF37] block leading-none">Dec 2026</span>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">Grand Finale</h4>
              <p className="text-[#D9E1EC] text-[16px] leading-relaxed font-normal">
                The ultimate show. Elite finalists from North Indian states compete under the spotlight of global casting agencies, modeling scouts and renowned designers in Gurugram.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Become a Model CTA */}
      <section className="relative py-28 w-full overflow-hidden text-center bg-[#06162F]">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1200"
            alt="Become a Model Background"
            fill
            className="object-cover opacity-20 object-center"
          />
          {/* subtle white/transparent overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#06162F] via-[#06162F]/85 to-transparent" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-6 space-y-6">
          <span className="text-[#D4AF37] text-[11px] tracking-[0.25em] font-extrabold uppercase block font-sans">
            YOUR OPPORTUNITY IS NOW
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-light text-white uppercase tracking-wide leading-tight">
            YOUR JOURNEY STARTS HERE.
          </h2>
          <p className="text-[#D9E1EC] text-xs md:text-sm max-w-md mx-auto leading-relaxed">
            Do you have the confidence, personality and talent to become the next face of North India&apos;s fashion industry?
          </p>

          <div className="flex justify-center gap-3 pt-3">
            <Link
              href="/register"
              className="px-8 py-3.5 bg-[#D4AF37] border border-transparent text-[#081C3A] hover:bg-[#081C3A] hover:text-[#D4AF37] hover:border-[#D4AF37] font-semibold text-xs tracking-wider transition-all duration-300 uppercase"
            >
              REGISTER NOW
            </Link>
            <Link
              href="/about"
              className="px-8 py-3.5 bg-transparent border border-[#D4AF37] text-white hover:bg-[#D4AF37] hover:text-[#081C3A] font-semibold text-xs tracking-wider transition-all duration-300 uppercase"
            >
              LEARN MORE
            </Link>
          </div>
        </div>
      </section>

      {/* Eligibility Checklist Grid Section */}
      <section className="py-24 bg-[#081C3A] border-y border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full text-center space-y-12">
          <div className="space-y-3">
            <h2 className="font-serif text-3xl md:text-4xl font-light text-[#D4AF37] uppercase tracking-wide">
              WHO CAN APPLY?
            </h2>
            <div className="w-12 h-[1px] bg-[#D4AF37] mx-auto" />
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 text-left pt-6 font-sans text-xs">
            <div className="space-y-4">
              <div className="flex justify-between border-b border-[#D4AF37]/20 pb-2">
                <span className="text-[#D9E1EC]/70 uppercase font-bold">Age</span>
                <span className="text-white font-semibold">16–30 Years</span>
              </div>
              <div className="flex justify-between border-b border-[#D4AF37]/20 pb-2">
                <span className="text-[#D9E1EC]/70 uppercase font-bold">Gender</span>
                <span className="text-white font-semibold">Female & Male</span>
              </div>
              <div className="flex justify-between border-b border-[#D4AF37]/20 pb-2">
                <span className="text-[#D9E1EC]/70 uppercase font-bold">Female Height</span>
                <span className="text-white font-semibold">Minimum 5&apos;3&quot; / 160 cm</span>
              </div>
              <div className="flex justify-between border-b border-[#D4AF37]/20 pb-2">
                <span className="text-[#D9E1EC]/70 uppercase font-bold">Male Height</span>
                <span className="text-white font-semibold">Minimum 5&apos;7&quot; / 170 cm</span>
              </div>
              <div className="flex justify-between border-b border-[#D4AF37]/20 pb-2">
                <span className="text-[#D9E1EC]/70 uppercase font-bold">Nationality</span>
                <span className="text-white font-semibold">Indian Nationals & NRI Indians</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between border-b border-[#D4AF37]/20 pb-2">
                <span className="text-[#D9E1EC]/70 uppercase font-bold">Experience</span>
                <span className="text-white font-semibold">Freshers & Experienced Models</span>
              </div>
              <div className="flex justify-between border-b border-[#D4AF37]/20 pb-2">
                <span className="text-[#D9E1EC]/70 uppercase font-bold">Marital Status</span>
                <span className="text-white font-semibold">Married & Unmarried</span>
              </div>
              <div className="flex justify-between border-b border-[#D4AF37]/20 pb-2">
                <span className="text-[#D9E1EC]/70 uppercase font-bold">Education</span>
                <span className="text-white font-semibold">No Minimum Qualification Required</span>
              </div>
              <div className="flex justify-between border-b border-[#D4AF37]/20 pb-2">
                <span className="text-[#D9E1EC]/70 uppercase font-bold">Body Type</span>
                <span className="text-white font-semibold">No Specific Body Measurements Required</span>
              </div>
              <div className="flex justify-between border-b border-[#D4AF37]/20 pb-2">
                <span className="text-[#D9E1EC]/70 uppercase font-bold">Selection Base</span>
                <span className="text-[#D4AF37] font-bold">Personality, Confidence, Attitude & Potential</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Accordion FAQ Section */}
      <section id="faq" className="py-24 max-w-4xl mx-auto px-6 w-full text-center space-y-12 scroll-mt-20">
        <div className="space-y-3">
          <h2 className="font-serif text-3xl md:text-5xl font-light text-[#D4AF37] uppercase tracking-wide">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <div className="w-12 h-[1px] bg-[#D4AF37] mx-auto" />
        </div>

        <div className="space-y-4 text-left pt-6">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div key={index} className={`border transition-all duration-300 ${isOpen ? 'border-[#D4AF37] shadow-lg shadow-[#0B2347]/50' : 'border-[#D4AF37]/25'} bg-[#0B2347]`}>
                <header
                  onClick={() => toggleFaq(index)}
                  className="flex justify-between items-center p-5 cursor-pointer select-none"
                >
                  <span className="font-sans text-xs md:text-sm font-bold tracking-wide text-white">
                    {faq.q}
                  </span>
                  {isOpen ? (
                    <Minus className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  ) : (
                    <Plus className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  )}
                </header>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-[#D9E1EC] font-sans leading-relaxed text-xs border-t border-[#D4AF37]/20 animate-fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-[#06162F] border-t border-[#D4AF37]/20 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-start font-sans text-xs">

          {/* LEFT: Info coordinates */}
          <div className="space-y-8">
            <div className="space-y-3">
              <span className="text-[10px] text-[#D4AF37] tracking-[0.3em] font-extrabold uppercase">
                LET&apos;S CONNECT
              </span>
              <h2 className="font-serif text-3xl font-light uppercase text-white">
                NINTM Official
              </h2>
              <div className="w-12 h-[1px] bg-[#D4AF37]" />
            </div>

            <div className="space-y-6">
              <div className="flex gap-4 items-start p-4 border border-[#D4AF37]/25 bg-[#0B2347] max-w-sm">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif font-bold text-white uppercase tracking-wider">Official Email</h4>
                  <a href="mailto:NintmTheComeBack@gmail.com" className="text-[#D9E1EC] hover:text-[#D4AF37] transition-colors">
                    NintmTheComeBack@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex gap-4 items-start p-4 border border-[#D4AF37]/25 bg-[#0B2347] max-w-sm">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif font-bold text-white uppercase tracking-wider">Scouting Hotline</h4>
                  <a href="tel:+919631596066" className="text-[#D9E1EC] hover:text-[#D4AF37] transition-colors block">
                    96315-96066
                  </a>
                </div>
              </div>

              <div className="flex gap-4 items-start p-4 border border-[#D4AF37]/25 bg-[#0B2347] max-w-sm">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif font-bold text-white uppercase tracking-wider">Corporate Hub Address</h4>
                  <p className="text-[#D9E1EC] leading-relaxed font-sans font-normal">
                    DLF Phase 5, Sector 43<br />
                    Gurugram, Haryana – 122002
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Contact Form */}
          <div className="border border-[#D4AF37]/25 bg-[#0B2347] p-8 md:p-10 shadow-2xl">
            {formSubmitted ? (
              <div className="text-center py-12 space-y-4 animate-fade-in">
                <span className="p-2 bg-[#081C3A] border border-[#D4AF37]/45 text-[#D4AF37] w-10 h-10 flex items-center justify-center mx-auto">✓</span>
                <h3 className="font-serif text-xl text-white font-bold uppercase">Enquiry Saved</h3>
                <p className="text-[#D9E1EC]/70 leading-relaxed text-xs">
                  Thank you for connecting with NINTM. We will reach back to your registered coordinates.
                </p>
                <button
                  type="button"
                  onClick={() => setFormSubmitted(false)}
                  className="px-6 py-2 border border-[#D4AF37]/25 text-[#D9E1EC] text-xs uppercase hover:border-[#D4AF37] hover:text-white transition-all"
                >
                  New Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <h3 className="font-serif text-2xl text-[#D4AF37] font-bold uppercase border-b border-[#D4AF37]/20 pb-3 mb-6">
                  Submit Enquiry
                </h3>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-[#D9E1EC]/70 font-bold block">FULL NAME *</label>
                  <input
                    type="text"
                    name="name"
                    value={contactData.name}
                    onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full bg-[#081C3A] border border-[#D4AF37]/20 focus:border-[#D4AF37] py-3 px-4 text-white outline-none transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider text-[#D9E1EC]/70 font-bold block">PHONE NUMBER *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={contactData.phone}
                      onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                      placeholder="Mobile contact"
                      className="w-full bg-[#081C3A] border border-[#D4AF37]/20 focus:border-[#D4AF37] py-3 px-4 text-white outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider text-[#D9E1EC]/70 font-bold block">EMAIL *</label>
                    <input
                      type="email"
                      name="email"
                      value={contactData.email}
                      onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                      placeholder="name@email.com"
                      className="w-full bg-[#081C3A] border border-[#D4AF37]/20 focus:border-[#D4AF37] py-3 px-4 text-white outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-[#D9E1EC]/70 font-bold block">MESSAGE DETAILS</label>
                  <textarea
                    name="message"
                    value={contactData.message}
                    onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                    placeholder="Type your enquiry questions or candidate updates here..."
                    rows="4"
                    className="w-full bg-[#081C3A] border border-[#D4AF37]/20 focus:border-[#D4AF37] p-4 text-white outline-none font-sans transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#D4AF37] border border-transparent text-[#081C3A] hover:bg-[#081C3A] hover:text-[#D4AF37] hover:border-[#D4AF37] font-bold tracking-widest text-xs uppercase flex items-center justify-center gap-2 transition-all duration-300"
                >
                  <svg className="w-4 h-4 fill-current shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L3 480l112.5-29.5c32.9 17.9 69.8 27.3 108.2 27.3 122.4 0 222-99.6 222-222.1.1-59.3-23-115.2-65-157.2zM223.9 448c-33.2 0-65.7-8.9-94-25.7l-6.7-4-66.8 17.5 17.8-65.1-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3s19.9 53.7 22.7 57.4c2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                  </svg>
                  SEND INQUIRY ON WHATSAPP
                </button>
              </form>
            )}
          </div>

        </div>


      </section>

      <Footer />
    </div>
  );
}
