import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { GlobalClientComponents } from "@/components/GlobalClientComponents";
import AwardBanner from "@/components/AwardBanner";
import Script from "next/script";
import "@fontsource/anton/400.css";
import "@fontsource/manrope/300.css";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";
import "@fontsource/manrope/700.css";
// @fontsource CSS imports above provide Anton and Manrope font families
// CSS variables --font-anton and --font-manrope are defined in globals.css

export const metadata: Metadata = {
    title: "Custom Software Development Company India | Kiaan Technology",
    description: "Enterprise-grade custom software development in India. ERP, CRM, SaaS & AI solutions built to scale. Get a free consultation — Kiaan Technology.",
    keywords: "Custom Software Development Company India, ERP Software Development, CRM Development Company, SaaS Development India, Business Automation Software, Enterprise Software Development, Cloud Based Business Software, Web Application Development Company",
    robots: "index, follow",
    authors: [{ name: "Kiaan Technology" }],
    category: "Technology",
    metadataBase: new URL("https://kiaantechnology.com"),
    alternates: {
        canonical: "https://kiaantechnology.com",
    },
    openGraph: {
        title: "Custom Software Development Company India | Kiaan Technology",
        description: "Enterprise-grade custom software development in India. ERP, CRM, SaaS & AI solutions built to scale — Kiaan Technology.",
        url: "https://kiaantechnology.com",
        siteName: "Kiaan Technology",
        images: [
            {
                url: "/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "Kiaan Technology - Custom Software Development",
            },
        ],
        type: "website",
        locale: "en_IN",
    },
    twitter: {
        card: "summary_large_image",
        title: "Custom Software Development Company India | Kiaan Technology",
        description: "Enterprise-grade custom software development in India. ERP, CRM, SaaS & AI solutions built to scale.",
        images: ["/og-image.jpg"],
    },
    icons: {
        icon: '/favicon.ico',
        apple: '/apple-touch-icon.png',
    },
    other: {
        "theme-color": "#000000",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="no-scrollbar" suppressHydrationWarning>
            <head>
                {/* Google Tag Manager */}
                <Script
                    id="gtm-script"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `
                            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                            })(window,document,'script','dataLayer','GTM-WCMW8NVC');
                        `,
                    }}
                />

                {/* DNS Prefetch for external domains */}
                <link rel="dns-prefetch" href="https://images.unsplash.com" />

                {/* Trustpilot Initialization */}
                <Script
                    id="trustpilot-init"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `
                            (function(w,d,s,r,n){
                                w.TrustpilotObject=n;
                                w[n]=w[n]||function(){
                                    (w[n].q=w[n].q||[]).push(arguments)
                                };
                                a=d.createElement(s);
                                a.async=1;
                                a.src=r;
                                a.type='text/javascript';
                                f=d.getElementsByTagName(s)[0];
                                f.parentNode.insertBefore(a,f)
                            })(window,document,'script',
                            'https://invitejs.trustpilot.com/tp.min.js',
                            'tp');
                            tp('register', 'vRjzzw2yE1blnEkT');
                        `,
                    }}
                />

                {/* TrustBox Widget Bootstrap Script */}
                <Script
                    id="trustpilot-widget-bootstrap"
                    src="//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"
                    strategy="afterInteractive"
                />

                {/* Google Analytics (GA4) */}
                <Script
                    src="https://www.googletagmanager.com/gtag/js?id=G-LCVNSWRZV3"
                    strategy="afterInteractive"
                />
                <Script
                    id="ga4-script"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', 'G-LCVNSWRZV3');
                        `,
                    }}
                />
            </head>
            <body className="antialiased selection:bg-yellow-500 selection:text-black max-w-screen pb-20" suppressHydrationWarning>
                {/* Google Tag Manager (noscript) */}
                <noscript>
                    <iframe
                        src="https://www.googletagmanager.com/ns.html?id=GTM-WCMW8NVC"
                        height="0"
                        width="0"
                        style={{ display: 'none', visibility: 'hidden' }}
                    />
                </noscript>

                {/* Global Schema Markup */}
                <Script
                    id="schema-org"
                    type="application/ld+json"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Organization",
                            "name": "Kiaan Technology",
                            "url": "https://kiaantechnology.com",
                            "logo": "https://kiaantechnology.com/logo.png",
                            "description": "AI driven custom software development company providing ERP, CRM, SaaS and enterprise solutions.",
                            "contactPoint": {
                                "@type": "ContactPoint",
                                "telephone": "+91 97521 00980",
                                "contactType": "customer service"
                            },
                            "sameAs": [
                                "https://www.linkedin.com/company/89547261/",
                                "https://www.instagram.com/kiaan_technology4/",
                                "https://youtube.com/@kiaantechnology"
                            ]
                        })
                    }}
                />
                <Script
                    id="website-schema"
                    type="application/ld+json"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "WebSite",
                            "name": "Kiaan Technology",
                            "url": "https://kiaantechnology.com",
                            "potentialAction": {
                                "@type": "SearchAction",
                                "target": "https://kiaantechnology.com/search?q={search_term_string}",
                                "query-input": "required name=search_term_string"
                            }
                        })
                    }}
                />
                <Script
                    id="breadcrumb-schema"
                    type="application/ld+json"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "BreadcrumbList",
                            "itemListElement": [
                                {
                                    "@type": "ListItem",
                                    "position": 1,
                                    "name": "Home",
                                    "item": "https://kiaantechnology.com"
                                }
                            ]
                        })
                    }}
                />
                <Script
                    id="local-business"
                    type="application/ld+json"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "LocalBusiness",
                            "name": "Kiaan Technology Indore",
                            "image": "https://kiaantechnology.com/logo.png",
                            "@id": "https://kiaantechnology.com",
                            "url": "https://kiaantechnology.com",
                            "telephone": "+91 97521 00980",
                            "address": {
                                "@type": "PostalAddress",
                                "streetAddress": "Vijay Nagar",
                                "addressLocality": "Indore",
                                "postalCode": "452010",
                                "addressRegion": "MP",
                                "addressCountry": "IN"
                            },
                            "geo": {
                                "@type": "GeoCoordinates",
                                "latitude": 22.7523,
                                "longitude": 75.8948
                            },
                            "openingHoursSpecification": {
                                "@type": "OpeningHoursSpecification",
                                "dayOfWeek": [
                                    "Monday",
                                    "Tuesday",
                                    "Wednesday",
                                    "Thursday",
                                    "Friday",
                                    "Saturday"
                                ],
                                "opens": "09:00",
                                "closes": "20:00"
                            }
                        })
                    }}
                />
                <div className="flex flex-col min-h-screen relative bg-black text-white">
                    <Navbar />
                    <main className="relative z-10 w-full">{children}</main>
                    <Footer />
                    <GlobalClientComponents />
                    <AwardBanner />
                </div>
            </body>
        </html>
    );
}
