import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
    title: "Custom Software Development Company in India | Enterprise SaaS Solutions | Kiaan Technology",
    description: "Kiaan Technology is a leading custom software development company specializing in enterprise SaaS solutions, CRM, ERP, POS, HRM, and business automation systems. We build scalable, secure, and production-ready digital ecosystems.",
    openGraph: {
        title: "Custom Software Development Company in India | Enterprise SaaS Solutions | Kiaan Technology",
        description: "Kiaan Technology is a leading custom software development company specializing in enterprise SaaS solutions.",
        url: "https://kiaantechnology.com/about",
        siteName: "Kiaan Technology",
        type: "website",
        locale: "en_IN",
    },
};

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Script
                id="about-org-schema"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Organization",
                        "name": "Kiaan Technology",
                        "url": "https://kiaantechnology.com",
                        "parentOrganization": {
                            "@type": "Organization",
                            "name": "Kiaan Technology",
                            "url": "https://kiaantechnology.com"
                        },
                        "description": "Kiaan Technology is a leading custom software development company specializing in enterprise SaaS solutions."
                    })
                }}
            />
            {children}
        </>
    );
}
