import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Software Development Case Studies | Kiaan Technology",
    description: "Real-world success stories from Kiaan Technology — custom ERP, SaaS, AI automation & mobile solutions delivered for businesses across India. View our work.",
    alternates: {
    },
};

export default function CaseStudiesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
