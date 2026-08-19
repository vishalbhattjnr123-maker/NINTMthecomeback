'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Upload, X, Camera, AlertCircle } from 'lucide-react';

export default function Register() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const [formInputs, setFormInputs] = useState({
        name: '',
        instagramUsername: '',
        dateOfBirth: '',
        email: '',
        phone: '',
        whatsapp: '',
        height: '',
        state: '',
        city: '',
        pincode: ''
    });

    const [photos, setPhotos] = useState({
        fullLength: null,
        closeUp: null
    });

    const [previews, setPreviews] = useState({
        fullLength: '',
        closeUp: ''
    });

    const fullLengthInputRef = useRef(null);
    const closeUpInputRef = useRef(null);

    const indianStates = [
        'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana',
        'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
        'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana',
        'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi (NCR)', 'Chandigarh (UT)', 'Jammu & Kashmir', 'Other'
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormInputs(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e, fieldName) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validation: Size (5 MB limit)
        if (file.size > 5 * 1024 * 1024) {
            alert('File size exceeds the 5 MB limit. Please choose a smaller image.');
            return;
        }

        // Validation: Format (JPG, JPEG, PNG, WEBP)
        const allowedExtensions = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        if (!allowedExtensions.includes(file.type)) {
            alert('Invalid file format. Allowed formats: JPG, JPEG, PNG, WEBP.');
            return;
        }

        setPhotos(prev => ({ ...prev, [fieldName]: file }));

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviews(prev => ({ ...prev, [fieldName]: reader.result }));
        };
        reader.readAsDataURL(file);
    };

    const handleRemovePhoto = (fieldName) => {
        setPhotos(prev => ({ ...prev, [fieldName]: null }));
        setPreviews(prev => ({ ...prev, [fieldName]: '' }));
        if (fieldName === 'fullLength' && fullLengthInputRef.current) {
            fullLengthInputRef.current.value = '';
        }
        if (fieldName === 'closeUp' && closeUpInputRef.current) {
            closeUpInputRef.current.value = '';
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg('');

        // Required text validation
        const { name, instagramUsername, dateOfBirth, email, phone, whatsapp, height, state, city, pincode } = formInputs;
        if (!name || !instagramUsername || !dateOfBirth || !email || !phone || !whatsapp || !height || !state || !city || !pincode) {
            setErrorMsg('Please fill out all required text fields.');
            return;
        }

        // Required photos validation
        if (!photos.fullLength || !photos.closeUp) {
            setErrorMsg('Both Full Length and Close-Up photos are required.');
            return;
        }

        setIsSubmitting(true);

        try {
            const apiBase = '';
            const formDataToSend = new FormData();
            formDataToSend.append('name', name);
            formDataToSend.append('instagramUsername', instagramUsername);
            formDataToSend.append('dateOfBirth', dateOfBirth);
            formDataToSend.append('email', email);
            formDataToSend.append('phone', phone);
            formDataToSend.append('whatsapp', whatsapp);
            formDataToSend.append('height', height);
            formDataToSend.append('state', state);
            formDataToSend.append('city', city);
            formDataToSend.append('pincode', pincode);
            formDataToSend.append('fullLengthPhoto', photos.fullLength);
            formDataToSend.append('closeUpPhoto', photos.closeUp);

            const apiBase = process.env.NEXT_PUBLIC_API_URL || '';
            const res = await fetch(`${apiBase}/api/register`, {
                method: 'POST',
                body: formDataToSend
            });

            const data = await res.json();

            if (!res.ok || !data.success) {
                throw new Error(data.error || 'Failed to submit registration form.');
            }

            const reg = data.registration;

            // Generate absolute photo urls targeting the backend proxy
            const photoUrlBase = apiBase || window.location.origin;
            const fullLengthUrl = reg.fullLengthPhoto ? `${photoUrlBase}/api/photo?url=${encodeURIComponent(reg.fullLengthPhoto)}` : '';
            const closeUpUrl = reg.closeUpPhoto ? `${photoUrlBase}/api/photo?url=${encodeURIComponent(reg.closeUpPhoto)}` : '';

            // Prepare WhatsApp pre-filled message
            const whatsappMessage = `Hello NINTM Team,

I have registered for NINTM – The Comeback 2026.

REGISTRATION DETAILS

Registration ID: ${reg.registrationId}

Name: ${reg.name}

Instagram Username: ${reg.instagramUsername}

Date of Birth: ${reg.dateOfBirth}

Email: ${reg.email}

Phone Number: ${reg.phone}

WhatsApp Number: ${reg.whatsapp}

Height: ${reg.height}

State: ${reg.state}

City: ${reg.city}

Pincode: ${reg.pincode}

PHOTO DETAILS

Full Length Photo: Uploaded
Close-Up Photo: Uploaded

Photo Links:
Full Length: ${fullLengthUrl}
Close-Up: ${closeUpUrl}

PAYMENT STATUS

Payment Status: Pending

Registration Fee: ₹699

I would like to proceed with my NINTM – The Comeback 2026 registration.

Thank you.`;

            // Open WhatsApp in new tab
            const targetPhone = '919631596066';
            const encodedText = encodeURIComponent(whatsappMessage);
            const whatsappUrl = `https://wa.me/${targetPhone}?text=${encodedText}`;

            try {
                window.open(whatsappUrl, '_blank');
            } catch (err) {
                console.error('Failed to trigger pop-up redirect for WhatsApp.', err);
            }

            // Immediately redirect user to Stripe/Razorpay payment checkpoint
            router.push(`/register/checkout?id=${reg.registrationId}`);

        } catch (err) {
            console.error(err);
            setErrorMsg(err.message || 'An error occurred during submission.');
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#081C3A] text-white font-sans selection:bg-[#D4AF37] selection:text-[#081C3A]">
            <Navbar />

            {/* Header / Hero Section */}
            <section className="relative pt-40 pb-16 bg-[#06162F] border-b border-[#D4AF37]/15 overflow-hidden flex items-center">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[#081C3A]/90 z-10" />
                    <Image
                        src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1200"
                        alt="Background Runway"
                        fill
                        sizes="100vw"
                        quality={50}
                        className="object-cover opacity-15 grayscale"
                        priority
                    />
                </div>

                <div className="relative z-20 max-w-4xl mx-auto px-6 w-full text-center">
                    <span className="text-[10px] uppercase tracking-[0.4em] text-[#D4AF37] font-extrabold mb-3 block">
                        NINTM – THE COMEBACK 2026
                    </span>
                    <h1 className="font-serif text-3xl md:text-5xl font-light tracking-tight text-white mb-4 uppercase">
                        Candidate Registration
                    </h1>
                    <p className="max-w-xl mx-auto text-[#D9E1EC]/70 text-xs md:text-sm tracking-wide leading-relaxed font-normal">
                        Submit your evaluation files below to register. Fill the 10 basic coordinates, upload your two photos, and proceed to checkout.
                    </p>
                </div>
            </section>

            {/* Main Application Container */}
            <main className="flex-grow py-12 max-w-4xl mx-auto px-6 w-full">

                {/* Information Card */}
                <div className="mb-8 p-6 bg-[#0B2347] border border-[#D4AF37]/20 text-xs leading-relaxed text-[#D9E1EC]/90">
                    <h3 className="font-serif text-[#D4AF37] text-sm uppercase font-bold mb-2">Instructions & Guidelines</h3>
                    <ul className="list-disc pl-5 space-y-1 my-2">
                        <li>Fill details accurately. The same Registration ID is used if payment is retried.</li>
                        <li>Submit your details to open candidates inquiry on WhatsApp <strong>(+91 8626-000-002)</strong> before redirected to secure checkout.</li>
                        <li>Registration requires exactly <strong>2 photographs</strong> (Full length + Close-up). Max 5 MB each. Allowed: JPG, JPEG, PNG, WEBP.</li>
                    </ul>
                </div>

                {isSubmitting && (
                    <div className="fixed inset-0 bg-[#081C3A]/90 backdrop-blur-sm z-50 flex items-center justify-center text-center">
                        <div className="space-y-4">
                            <div className="w-12 h-12 border-t-2 border-[#D4AF37] border-r-2 border-r-[#D4AF37]/20 rounded-full animate-spin mx-auto" />
                            <p className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold">Uploading files & saving registration...</p>
                            <p className="text-[10px] text-[#D9E1EC]/60">Redirecting to WhatsApp and Payment step next</p>
                        </div>
                    </div>
                )}

                <div className="bg-[#0B2347] border border-[#D4AF37]/20 p-8 md:p-12 shadow-2xl relative">

                    {errorMsg && (
                        <div className="mb-6 p-4 bg-[#8B1E2D]/20 border border-[#8B1E2D]/40 text-red-200 text-xs flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                            <span>{errorMsg}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-8 font-sans text-xs">

                        {/* Section 1: Personal Coordinates */}
                        <div>
                            <h3 className="font-serif text-[#D4AF37] text-lg uppercase tracking-wide border-b border-[#D4AF37]/15 pb-2 mb-6">
                                1. Personal Details
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1.5">
                                    <label className="text-[9px] uppercase tracking-wider text-[#D9E1EC]/60 font-bold block">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formInputs.name}
                                        onChange={handleInputChange}
                                        placeholder="Legal Name"
                                        className="w-full bg-[#081C3A] border border-[#D4AF37]/20 focus:border-[#D4AF37] text-white text-xs px-4 py-3 outline-none"
                                        required
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[9px] uppercase tracking-wider text-[#D9E1EC]/60 font-bold block">
                                        Instagram Handle *
                                    </label>
                                    <input
                                        type="text"
                                        name="instagramUsername"
                                        value={formInputs.instagramUsername}
                                        onChange={handleInputChange}
                                        placeholder="e.g. username (do not include @)"
                                        className="w-full bg-[#081C3A] border border-[#D4AF37]/20 focus:border-[#D4AF37] text-white text-xs px-4 py-3 outline-none"
                                        required
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[9px] uppercase tracking-wider text-[#D9E1EC]/60 font-bold block">
                                        Date of Birth *
                                    </label>
                                    <input
                                        type="date"
                                        name="dateOfBirth"
                                        value={formInputs.dateOfBirth}
                                        onChange={handleInputChange}
                                        className="w-full bg-[#081C3A] border border-[#D4AF37]/20 focus:border-[#D4AF37] text-white text-xs px-4 py-3 outline-none"
                                        required
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[9px] uppercase tracking-wider text-[#D9E1EC]/60 font-bold block">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formInputs.email}
                                        onChange={handleInputChange}
                                        placeholder="name@email.com"
                                        className="w-full bg-[#081C3A] border border-[#D4AF37]/20 focus:border-[#D4AF37] text-white text-xs px-4 py-3 outline-none"
                                        required
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[9px] uppercase tracking-wider text-[#D9E1EC]/60 font-bold block">
                                        Phone Number *
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formInputs.phone}
                                        onChange={handleInputChange}
                                        placeholder="Primary Contact Number"
                                        className="w-full bg-[#081C3A] border border-[#D4AF37]/20 focus:border-[#D4AF37] text-white text-xs px-4 py-3 outline-none"
                                        required
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[9px] uppercase tracking-wider text-[#D9E1EC]/60 font-bold block">
                                        WhatsApp Number *
                                    </label>
                                    <input
                                        type="tel"
                                        name="whatsapp"
                                        value={formInputs.whatsapp}
                                        onChange={handleInputChange}
                                        placeholder="WhatsApp Number"
                                        className="w-full bg-[#081C3A] border border-[#D4AF37]/20 focus:border-[#D4AF37] text-white text-xs px-4 py-3 outline-none"
                                        required
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[9px] uppercase tracking-wider text-[#D9E1EC]/60 font-bold block">
                                        Height in CM *
                                    </label>
                                    <input
                                        type="number"
                                        name="height"
                                        value={formInputs.height}
                                        onChange={handleInputChange}
                                        placeholder="e.g. 172"
                                        className="w-full bg-[#081C3A] border border-[#D4AF37]/20 focus:border-[#D4AF37] text-white text-xs px-4 py-3 outline-none"
                                        required
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[9px] uppercase tracking-wider text-[#D9E1EC]/60 font-bold block">
                                        State *
                                    </label>
                                    <select
                                        name="state"
                                        value={formInputs.state}
                                        onChange={handleInputChange}
                                        className="w-full bg-[#081C3A] border border-[#D4AF37]/20 focus:border-[#D4AF37] text-white text-xs px-4 py-3 outline-none"
                                        required
                                    >
                                        <option value="" disabled className="text-gray-400">Select candidate state</option>
                                        {indianStates.map((st) => (
                                            <option key={st} value={st} className="bg-[#081C3A] text-white">{st}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[9px] uppercase tracking-wider text-[#D9E1EC]/60 font-bold block">
                                        City *
                                    </label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formInputs.city}
                                        onChange={handleInputChange}
                                        placeholder="Casting Audition City"
                                        className="w-full bg-[#081C3A] border border-[#D4AF37]/20 focus:border-[#D4AF37] text-white text-xs px-4 py-3 outline-none"
                                        required
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[9px] uppercase tracking-wider text-[#D9E1EC]/60 font-bold block">
                                        Pincode *
                                    </label>
                                    <input
                                        type="text"
                                        name="pincode"
                                        value={formInputs.pincode}
                                        onChange={handleInputChange}
                                        placeholder="6-digit PIN"
                                        className="w-full bg-[#081C3A] border border-[#D4AF37]/20 focus:border-[#D4AF37] text-white text-xs px-4 py-3 outline-none"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Photo Uploads */}
                        <div>
                            <h3 className="font-serif text-[#D4AF37] text-lg uppercase tracking-wide border-b border-[#D4AF37]/15 pb-2 mb-2">
                                2. Photo Uploads
                            </h3>
                            <p className="text-[10px] text-[#D9E1EC]/60 mb-6 font-semibold">
                                Upload 2 photos only. Maximum 5 MB per image. Allowed formats: JPG, JPEG, PNG, WEBP.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                                {/* Photo 1: Full Length */}
                                <div className="border border-[#D4AF37]/15 p-6 bg-[#081C3A] flex flex-col justify-between space-y-4">
                                    <div>
                                        <label className="text-[10.5px] uppercase tracking-wider text-white font-bold block">
                                            Full Length Photo *
                                        </label>
                                        <p className="text-[9px] text-[#D9E1EC]/40 leading-relaxed mt-0.5">
                                            Clear, straight pose showing entire silhouette.
                                        </p>
                                    </div>

                                    {previews.fullLength ? (
                                        <div className="relative aspect-[3/4] w-full border border-[#D4AF37]/35 overflow-hidden group bg-black/40">
                                            <Image
                                                src={previews.fullLength}
                                                alt="Full Length Preview"
                                                fill
                                                sizes="(max-width: 768px) 100vw, 400px"
                                                className="object-contain"
                                            />
                                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity gap-3">
                                                <button
                                                    type="button"
                                                    onClick={() => fullLengthInputRef.current?.click()}
                                                    className="px-3 py-1.5 bg-[#D4AF37] text-[#081C3A] font-bold text-[9px] uppercase tracking-wider hover:bg-white transition-colors"
                                                >
                                                    Replace
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemovePhoto('fullLength')}
                                                    className="p-1.5 bg-red-600 text-white hover:bg-red-700 transition-colors"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div
                                            onClick={() => fullLengthInputRef.current?.click()}
                                            className="border-2 border-dashed border-[#D4AF37]/25 hover:border-[#D4AF37]/60 aspect-[3/4] cursor-pointer flex flex-col items-center justify-center bg-[#0B2347]/50 gap-2 transition-all p-4"
                                        >
                                            <Camera className="w-8 h-8 text-[#D4AF37]/60" />
                                            <span className="text-[10px] text-[#D9E1EC]/60 uppercase tracking-widest font-bold">Select Full Length Image</span>
                                            <span className="text-[9px] text-[#D9E1EC]/30">Click to upload</span>
                                        </div>
                                    )}

                                    <input
                                        type="file"
                                        ref={fullLengthInputRef}
                                        accept=".jpg,.jpeg,.png,.webp"
                                        onChange={(e) => handleFileChange(e, 'fullLength')}
                                        className="hidden"
                                    />
                                </div>

                                {/* Photo 2: Close-Up */}
                                <div className="border border-[#D4AF37]/15 p-6 bg-[#081C3A] flex flex-col justify-between space-y-4">
                                    <div>
                                        <label className="text-[10.5px] uppercase tracking-wider text-white font-bold block">
                                            Close-Up Photo *
                                        </label>
                                        <p className="text-[9px] text-[#D9E1EC]/40 leading-relaxed mt-0.5">
                                            Headshot focusing on features. Flat daylight preferred.
                                        </p>
                                    </div>

                                    {previews.closeUp ? (
                                        <div className="relative aspect-[3/4] w-full border border-[#D4AF37]/35 overflow-hidden group bg-black/40">
                                            <Image
                                                src={previews.closeUp}
                                                alt="Close Up Preview"
                                                fill
                                                sizes="(max-width: 768px) 100vw, 400px"
                                                className="object-contain"
                                            />
                                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity gap-3">
                                                <button
                                                    type="button"
                                                    onClick={() => closeUpInputRef.current?.click()}
                                                    className="px-3 py-1.5 bg-[#D4AF37] text-[#081C3A] font-bold text-[9px] uppercase tracking-wider hover:bg-white transition-colors"
                                                >
                                                    Replace
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemovePhoto('closeUp')}
                                                    className="p-1.5 bg-red-600 text-white hover:bg-red-700 transition-colors"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div
                                            onClick={() => closeUpInputRef.current?.click()}
                                            className="border-2 border-dashed border-[#D4AF37]/25 hover:border-[#D4AF37]/60 aspect-[3/4] cursor-pointer flex flex-col items-center justify-center bg-[#0B2347]/50 gap-2 transition-all p-4"
                                        >
                                            <Camera className="w-8 h-8 text-[#D4AF37]/60" />
                                            <span className="text-[10px] text-[#D9E1EC]/60 uppercase tracking-widest font-bold">Select Close-Up Image</span>
                                            <span className="text-[9px] text-[#D9E1EC]/30">Click to upload</span>
                                        </div>
                                    )}

                                    <input
                                        type="file"
                                        ref={closeUpInputRef}
                                        accept=".jpg,.jpeg,.png,.webp"
                                        onChange={(e) => handleFileChange(e, 'closeUp')}
                                        className="hidden"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Submit Button Section */}
                        <div className="pt-6 border-t border-[#D4AF37]/20 flex flex-col items-center">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-12 py-4 bg-[#D4AF37] text-[#081C3A] hover:bg-[#081C3A] hover:text-[#D4AF37] hover:border-[#D4AF37] border border-transparent transition-all font-sans font-bold text-xs tracking-[0.25em] uppercase shadow-lg duration-300"
                            >
                                {isSubmitting ? 'PROCESSING REGISTRATION...' : 'REGISTER NOW'}
                            </button>
                        </div>
                    </form>

                </div>
            </main>

            <Footer />
        </div>
    );
}
