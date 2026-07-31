import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Software Development Services India | Kiaan Technology",
    description: "Full-suite enterprise software services — custom ERP, CRM, SaaS, AI automation & mobile apps for Indian businesses. Get a free proposal from Kiaan Technology.",
    alternates: {
    },
};

export default function ServicesLayout({
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
