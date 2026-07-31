import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Software Development Case Studies | Kiaan Technology",
    description: "Real-world success stories from Kiaan Technology — custom ERP, SaaS, AI automation & mobile solutions delivered for businesses across India. View our work.",
    alternates: {
        canonical: "https://kiaantechnology.com/case-studies",
    },
};

export default function CaseStudiesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            {children}
            <div className="container mx-auto px-6 pb-12 pt-8 border-t border-zinc-900/50 text-zinc-600 text-xs font-light text-right">
                Last Updated: July 2026
            </div>
        </>
    );
}
