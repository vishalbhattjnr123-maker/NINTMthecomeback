import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export function generateStaticParams() {
    return [
        { policy: 'terms' },
        { policy: 'privacy' },
        { policy: 'refund' },
        { policy: 'cancellation' },
        { policy: 'service-delivery' },
        { policy: 'disclaimer' }
    ];
}

const policiesData = {
    terms: {
        title: 'Terms & Conditions',
        desc: 'Please read these Terms and Conditions carefully before registering for NINTM – The Comeback 2026. By submitting your application, you agree to be bound by these terms.',
        content: [
            'North India’s Next Top Model (NINTM) – The Comeback 2026 is an initiative managed by Creativatorss. Participation is subject to the official rules, eligibility criteria, and selection guidelines.',
            'All information submitted during the registration process must be accurate, current, and truthful. Any mock or fraudulent records will be disqualified immediately.',
            'Participation fees of ₹699 INR are required to complete the registration process. This fee covers administrative overheads, screening expenses, and primary shortlisting logs.',
            'NINTM reserves the right to screen all entrants, review social profiles, verify height/vital stats at auditions, and request official government ID proof. Final auditions and event dates are subject to change at the organizers’ discretion.',
            'Decisions made by the panel of judges and NINTM directors are final and binding in all respects.'
        ]
    },
    privacy: {
        title: 'Privacy Policy',
        desc: 'Creativatorss and NINTM are committed to protecting the personal information and creative portfolios of our participants.',
        content: [
            'We collect key details including contact info, professional parameters (height, vital stats, experience), government identities, and photo portfolios to evaluate eligibility.',
            'Your uploaded close-up, mid-shot, and full-length photographs will be securely shared only with authorized casting directors, agency reviewers, and panel judges.',
            'Payment details are processed via secure mock payment configurations. We do not store full credit card details or netbanking credentials in our local files.',
            'Analytical data and social links are utilized to optimize the website interface and improve campaign engagement. We do not sell or lease candidate details to third-party direct marketing lists.',
            'If you wish to view, edit, or request deletion of your submitted registration, please reach out to NintmTheComeBack@gmail.com with your unique Registration ID.'
        ]
    },
    refund: {
        title: 'Refund Policy',
        desc: 'Participation terms regarding fees, registration processing, and refund queries.',
        content: [
            'The registration processing fee of ₹699 is used immediately to cover panel screening, database slots, profile processing, and digital review resources.',
            'Consequently, this registration processing fee is non-refundable and non-transferable once submitted, regardless of shortlisting outcome.',
            'In the rare event of a duplicate transaction error where multiple charges are registered for the same candidate within 24 hours, the duplicate amount will be refunded upon verification.',
            'To request a duplicate payment refund review, contact support at NintmTheComeBack@gmail.com with your transaction receipt, Registration ID, and payment gateway references.'
        ]
    },
    cancellation: {
        title: 'Cancellation & Withdrawal Policy',
        desc: 'Guidelines on disqualification, volunteer candidate withdrawal, and event rescheduling.',
        content: [
            'Candidates may voluntarily withdraw their application at any point prior to local physical auditions by sending an email notification to the organizers.',
            'Voluntary withdrawals do not qualify for a refund of the entry evaluation fee.',
            'NINTM reserves the right to cancel or disqualify any registration if the candidate fails to meet eligibility criteria, behaves in an unprofessional manner, or violates terms of conduct.',
            'If the Grand Finale or regional auditions are postponed due to force majeure events (health protocols, regional travel mandates, weather constraints), registrations will be automatically carried forward to the new dates.'
        ]
    },
    'service-delivery': {
        title: 'Service Delivery Policy',
        desc: 'How the runway training, grooming programs, and photoshoot opportunities will be delivered.',
        content: [
            'Registered candidates whose payments are successful will gain access to their candidate profile dashboard showing their application status.',
            'Grooming courses, portfolio shoots, and professional runway updates will be scheduled and broadcasted via dashboard notes, SMS, and direct email notices.',
            'Digital certificates of participation will be generated and issued online. Live runway events and face-to-face evaluations will be conducted at pre-approved luxury venues.',
            'Creativatorss guarantees premium production values, booking major modeling trainers, industry photographers, and fashion consultants for the grooming sessions.'
        ]
    },
    disclaimer: {
        title: 'Disclaimer & Statements',
        desc: 'Official disclosures for candidate review, digital media representation, and operational terms.',
        content: [
            'NINTM and Creativatorss make no guarantees of guaranteed job placements, movie contracts, or commercial modeling assignments to general participants outside the winner contract details.',
            'The ₹15 Lakhs work contract is reserved solely for the grand winner of NINTM – The Comeback 2026, subject to terms specified in the final legally signed Stamp Paper.',
            'Mock interfaces, registration verification dashboards, and payment portals are presented for development review and campaign simulations representing NINTM official targets.',
            'All brand logos, finalist lists, and history records relate to the active legacy of North India’s Next Top Model since 2012. Any digital asset reuse is intended for styling display.'
        ]
    }
};

export default async function PolicyPage({ params }) {
    const { policy } = await params;
    const data = policiesData[policy] || {
        title: 'Policy Document',
        desc: 'The official document is pending final production review by legal counsel.',
        content: ['Placeholder details. Please contact the administrator for complete guidelines.']
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#081C3A] text-white font-sans selection:bg-[#D4AF37] selection:text-[#081C3A]">
            <Navbar />

            <main className="flex-grow pt-40 pb-24 max-w-4xl mx-auto px-6 w-full">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-extrabold font-sans mb-3 block">
                    OFFICIAL POLICIES & AGREEMENTS
                </span>
                <h1 className="font-serif text-3xl md:text-5xl font-light tracking-tight text-white mb-6 uppercase">
                    {data.title}
                </h1>
                <p className="text-[#D9E1EC]/70 text-sm md:text-base leading-relaxed mb-10 pb-6 border-b border-[#D4AF37]/20 italic font-serif">
                    {data.desc}
                </p>

                <div className="space-y-8 font-normal">
                    {data.content.map((paragraph, index) => (
                        <div key={index} className="flex gap-4">
                            <span className="font-serif text-sm text-[#D4AF37] font-bold opacity-80 w-6 shrink-0 mt-1">
                                {String(index + 1).padStart(2, '0')}
                            </span>
                            <p className="text-xs md:text-sm text-[#D9E1EC] leading-relaxed font-sans font-normal">
                                {paragraph}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mt-16 pt-8 border-t border-[#D4AF37]/20 flex justify-between items-center text-[10px] font-sans font-bold text-[#D9E1EC]/40">
                    <span>
                        NINTM // CREATIVATORSS LEGAL OFFICE 2026
                    </span>
                    <a
                        href="/register"
                        className="text-xs tracking-wider text-[#D4AF37] hover:text-white font-semibold transition-colors duration-200 uppercase"
                    >
                        ← BACK TO REGISTRATION
                    </a>
                </div>
            </main>

            <Footer />
        </div>
    );
}
