import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "North India's Next Top Models | NINTM – The Comeback 2026",
  description: "NINTM is North India's premier fashion model hunt. Discovering, grooming, and empowering the next generation of modeling talent. Registrations open for male & female candidates. Managed by Creativatorss.",
  keywords: "North India’s Next Top Model, NINTM, NINTM 2026, Model Hunt India, Model Hunt North India, Model Auditions India, Model Registration India, Best Model Hunt India, Modeling Competition India, Become a Model India",
  metadataBase: new URL('https://www.nintmthecomeback.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "North India's Next Top Models | NINTM – The Comeback 2026",
    description: "The Spotlight is Waiting. North India's most successful model hunt platform returns. Register now and win a ₹15 Lakhs work contract.",
    url: 'https://www.nintmthecomeback.com',
    siteName: 'NINTM – The Comeback',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200',
        width: 1200,
        height: 630,
        alt: 'NINTM - North India\'s Next Top Models',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "North India's Next Top Models | NINTM – The Comeback 2026",
    description: "Discover, Groom, Empower. Apply now for NINTM 2026.",
    images: ['https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#081C3A] text-white selection:bg-[#D4AF37] selection:text-[#081C3A]">
        {children}
      </body>
    </html>
  );
}
