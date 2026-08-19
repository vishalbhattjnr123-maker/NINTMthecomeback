'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Mail, Phone, MapPin, User, ChevronDown, ChevronUp, Send, CheckCircle2 } from 'lucide-react';

export default function ContactFAQ() {
    const [openFaq, setOpenFaq] = useState(null);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [contactData, setContactData] = useState({
        name: '',
        phone: '',
        email: '',
        message: '',
    });

    const toggleFaq = (index) => {
        if (openFaq === index) {
            setOpenFaq(null);
        } else {
            setOpenFaq(index);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setContactData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleContactSubmit = async (e) => {
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

        try {
            const formData = new FormData();
            formData.append('type', 'inquiry');
            formData.append('name', contactData.name.trim());
            formData.append('phone', contactData.phone.trim());
            formData.append('email', contactData.email.trim());
            formData.append('message', contactData.message.trim());

            const apiBase = '';
            await fetch(`${apiBase}/api/register`, {
                method: 'POST',
                body: formData
            });
        } catch (err) {
            console.error('Failed to submit contact enquiry to backend:', err);
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

        setContactData({ name: '', phone: '', email: '', message: '' });
        setFormSubmitted(true);
    };

    const faqs = [
        {
            q: "How can I apply?",
            a: "Go to the Become a Model page, complete the multi-step registration form with your physical dimensions and contact coordinates, attach the required Government ID proof and photoshoot uploads, and complete the digital application payment."
        },
        {
            q: "What are the requirements?",
            a: "Participants should carefully review our eligibility checklist (age 16-30, height 5'3\" for females, 5'7\" for males) and keep three clear photos (close-up, mid-shot, full-length) and government ID proof scanned for attachment."
        },
        {
            q: "Who can participate?",
            a: "Aspiring male and female models who meet the physical height criteria, age parameters, and are Indian Nationals or NRI status holders can participate."
        },
        {
            q: "What happens after the audition?",
            a: "Selected candidates will progress through consecutive training bootcamps, physical look tests, editorial photoshoots, brand catalog sessions, and styling rounds heading toward the Grand Finale in December 2026."
        },
        {
            q: "What kind of training is provided?",
            a: "Comprehensive grooming which covers runway ramp choreography, posing guides under directors, confidence drills, communications, diet and style consultancy, public relations, and legal modeling advice."
        },
        {
            q: "Will I get professional exposure?",
            a: "Absolutely. Finalists are placed in front of lead fashion designers, advertising directors, print media photographers, and casting agents. NINTM is and has been a premier launchpad since 2012."
        },
        {
            q: "Can beginners participate?",
            a: "Yes. NINTM welcomes freshers and aspiring models. The program is designed specifically to discover raw potential and polish it to meet global modeling agency standards."
        },
        {
            q: "What should I bring for the audition?",
            a: "Ensure you carry a digital copy of your payment invoice receipt, a copy of the ID uploaded during registration, and appropriate basic casting outfits (typically high heels, denim, and tight shirts) as directed in the candidate briefing."
        },
        {
            q: "What can the winner expect?",
            a: "The grand winner will walk away with modeling contracts totaling a value of ₹15 Lakhs INR, legally guaranteed on Stamp Paper with Creativatorss, securing immediate elite runway bookings and media exposure."
        },
        {
            q: "Where can I get audition updates?",
            a: "Continuous operational news, physical venue shifts, look test calendars, and finalist lists are updated on this portal dashboard and broadcasted across NINTM by Creativatorss social media channels."
        }
    ];

    return (
        <div className="flex flex-col min-h-screen bg-[#081C3A] text-white font-sans text-xs selection:bg-[#D4AF37] selection:text-[#081C3A]">
            <Navbar />

            {/* Hero Header */}
            <section className="relative pt-44 pb-20 bg-[#081C3A] border-b border-[#D4AF37]/20 overflow-hidden flex items-center justify-center text-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,transparent_100%)]" />
                <div className="relative z-10 max-w-7xl mx-auto px-6">
                    <span className="text-xs uppercase tracking-[0.45em] text-[#D4AF37] font-bold block mb-3 animate-fade-up">
                        SUPPORT & CASTINGS COORDINATES
                    </span>
                    <h1 className="font-serif text-4xl md:text-6xl font-bold tracking-tight text-white uppercase mb-4">
                        Contact Us & FAQ
                    </h1>
                    <p className="max-w-xl mx-auto text-[#D9E1EC]/85 leading-normal tracking-wide text-xs">
                        Review modeling criteria questions, search regional schedules, or submit enquiry forms directly to our DLF Gurugram headquarters.
                    </p>
                </div>
            </section>

            {/* Main content area */}
            <main className="flex-grow max-w-7xl mx-auto px-6 md:px-12 py-16 w-full space-y-24">

                {/* Contact info + Form grid */}
                <section id="contact" className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Left panel: Info */}
                    <div className="space-y-8">
                        <div className="space-y-3">
                            <span className="text-[11px] text-[#D4AF37] tracking-[0.3em] font-bold uppercase">
                                GET IN TOUCH
                            </span>
                            <h2 className="font-serif text-3xl md:text-4xl font-bold uppercase text-white leading-tight">
                                Let&apos;s Connect
                            </h2>
                            <div className="w-16 h-[2px] bg-[#D4AF37]" />
                            <p className="text-[#D9E1EC]/70 text-xs md:text-sm leading-relaxed max-w-md">
                                We value your feedback and inquiries. Whether you have a question, suggestion or simply want to connect with us, our team is here to assist you.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex gap-4 items-start p-4 border border-[#D4AF37]/25 bg-[#0B2347] max-w-md">
                                <Mail className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">OFFICIAL MAIL ID</h4>
                                    <a href="mailto:NintmTheComeBack@gmail.com" className="text-[#D9E1EC] hover:text-[#D4AF37] transition-colors">
                                        NintmTheComeBack@gmail.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex gap-4 items-start p-4 border border-[#D4AF37]/25 bg-[#0B2347] max-w-md">
                                <MapPin className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">HEADQUARTERS ADDRESS</h4>
                                    <p className="text-[#D9E1EC] leading-relaxed font-sans font-normal">
                                        DLF Phase 5, Sector 43<br />
                                        Gurugram, Haryana – 122002
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4 items-start p-4 border border-[#D4AF37]/25 bg-[#0B2347] max-w-md">
                                <User className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">CONTACT PERSON KEY</h4>
                                    <p className="text-[#D9E1EC]">
                                        Prasant Sharrma <br />
                                        <span className="text-[#D4AF37] text-[10px] uppercase font-bold tracking-wider font-sans block mt-0.5">Director – Creativatorss</span>
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4 items-start p-4 border border-[#D4AF37]/25 bg-[#0B2347] max-w-md">
                                <Phone className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">MOBILE HOTLINE</h4>
                                    <a href="tel:+919631596066" className="text-[#D9E1EC] hover:text-[#D4AF37] transition-colors block">
                                        96315-96066
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right panel: Contact Form */}
                    <div className="border border-[#D4AF37]/25 bg-[#0B2347] p-8 md:p-10 shadow-2xl">
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
                                    onChange={handleInputChange}
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
                                        onChange={handleInputChange}
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
                                        onChange={handleInputChange}
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
                                    onChange={handleInputChange}
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
                    </div>
                </section>

                {/* Google Maps section */}
                <section className="space-y-6">
                    <div className="space-y-3">
                        <span className="text-[11px] text-[#D4AF37] tracking-[0.3em] font-bold uppercase">
                            VENUE REACH
                        </span>
                        <h2 className="font-serif text-3xl font-bold uppercase text-white">
                            Google Maps Location
                        </h2>
                        <div className="w-12 h-[2px] bg-[#D4AF37]" />
                    </div>

                    {/* Luxury styled map container with gray filter */}
                    <div className="relative border border-[#D4AF37]/25 aspect-video md:h-96 w-full overflow-hidden bg-[#0B2347]">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3508.8252068694084!2d77.0910123768233!3d28.484803775747514!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d193ad0ba5101%3A0xe54d975ebd8fcfdf!2sDLF%20Phase%205%2C%20Sector%2043%2C%20Gurugram%2C%20Haryana%20122002!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0, filter: 'grayscale(1) invert(0.9) contrast(1.3)' }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Creativatorss DLF Phase 5 Gurugram"
                        />
                    </div>
                </section>

                {/* Accordion FAQ Section */}
                <section id="faq" className="space-y-12">
                    <div className="text-center">
                        <span className="text-[11px] text-[#D4AF37] tracking-[0.3em] font-bold uppercase block mb-2">
                            CASTING HELP BOARD
                        </span>
                        <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-white uppercase">
                            Frequently Asked Questions
                        </h2>
                        <div className="w-12 h-[2px] bg-[#D4AF37] mx-auto mt-4" />
                    </div>

                    <div className="max-w-3xl mx-auto space-y-4 pt-4">
                        {faqs.map((faq, index) => {
                            const isOpen = openFaq === index;
                            return (
                                <div key={index} className={`border transition-all duration-300 ${isOpen ? 'border-[#D4AF37] shadow-lg shadow-[#0B2347]/50' : 'border-[#D4AF37]/25'} bg-[#0B2347]`}>
                                    <header
                                        onClick={() => toggleFaq(index)}
                                        className="flex justify-between items-center p-5 cursor-pointer select-none text-left"
                                    >
                                        <span className="font-serif text-sm font-bold text-white hover:text-[#D4AF37] transition-colors">
                                            {index + 1}. {faq.q}
                                        </span>
                                        {isOpen ? <ChevronUp className="w-4 h-4 text-[#D4AF37] shrink-0" /> : <ChevronDown className="w-4 h-4 text-[#D9E1EC]/50 shrink-0" />}
                                    </header>
                                    {isOpen && (
                                        <div className="px-5 pb-5 pt-1 text-[#D9E1EC] font-sans leading-relaxed text-xs border-t border-[#D4AF37]/20 animate-fade-in text-left">
                                            {faq.a}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </section>

            </main>

            <Footer />
        </div>
    );
}
