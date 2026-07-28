import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "About Kiaan Technology | Software Dev Company India",
    description: "Kiaan Technology builds enterprise-grade software for Indian businesses. Learn about our story, expert team & AI-first approach to digital transformation.",
    alternates: {
        canonical: "https://kiaantechnology.com/about",
    },
};

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
