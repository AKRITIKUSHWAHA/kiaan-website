"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Script from "next/script";

// Custom route map to show SEO-friendly, clean, uppercase titles
const routeNameMap: Record<string, string> = {
    "services": "Services",
    "industries": "Industries",
    "case-studies": "Case Studies",
    "solutions": "Solutions",
    "about": "About Us",
    "contact": "Contact",
    "products": "Products",
    "ai-products": "AI Products",
    "demo": "Demo Arena",
    "internship": "Training & Internship",
    "healthcare-software": "Healthcare Software Development",
    "fintech-software": "Fintech Software Development",
    "retail-technology": "Retail Technology",
    "custom-software-development": "Custom Software Development",
    "saas-development": "SaaS Development",
    "ai-automation": "AI Automation",
    "web-development": "Web Development",
    "mobile-app-development": "Mobile App Development",
    "erp-crm-solutions": "ERP & CRM Solutions",
    "study-first-info-crm": "Study First Info CRM",
    "healthsakhi-ai": "HealthSakhi AI",
    "pgx-payment-gateway": "PGX Payment Gateway"
};

const formatSegment = (segment: string): string => {
    if (routeNameMap[segment]) return routeNameMap[segment];
    return segment
        .split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
};

export function Breadcrumbs() {
    const pathname = usePathname();

    // Do not show breadcrumbs on the homepage
    if (!pathname || pathname === "/") return null;

    const segments = pathname.split("/").filter(Boolean);
    const breadcrumbItems = segments.map((segment, index) => {
        const url = "/" + segments.slice(0, index + 1).join("/");
        return {
            name: formatSegment(segment),
            url: `https://kiaantechnology.com${url}`,
            path: url
        };
    });

    const allItems = [
        { name: "Home", url: "https://kiaantechnology.com", path: "/" },
        ...breadcrumbItems
    ];

    // Generate JSON-LD Schema Markup
    const schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": allItems.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": item.url
        }))
    };

    return (
        <div className="w-full bg-black/60 backdrop-blur-md border-b border-zinc-900/50 py-4 px-6 md:px-12 relative z-30 pt-24">
            <Script
                id="breadcrumbs-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
            <nav className="max-w-7xl mx-auto flex flex-wrap items-center gap-2 text-xs md:text-sm font-medium tracking-wider uppercase">
                {allItems.map((item, index) => {
                    const isLast = index === allItems.length - 1;
                    return (
                        <div key={item.path} className="flex items-center gap-2">
                            {isLast ? (
                                <span className="text-yellow-500 font-bold select-none">
                                    {item.name}
                                </span>
                            ) : (
                                <Link 
                                    href={item.path} 
                                    className="text-zinc-500 hover:text-white transition-colors cursor-pointer"
                                >
                                    {item.name}
                                </Link>
                            )}
                            {!isLast && (
                                <span className="text-zinc-700 select-none">&gt;</span>
                            )}
                        </div>
                    );
                })}
            </nav>
        </div>
    );
}
