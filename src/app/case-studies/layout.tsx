import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Case Studies | Kiaan Technology',
    description: 'Explore our portfolio of successful software development projects, SaaS platforms, and digital transformations.',
    alternates: {
        canonical: 'https://kiaantechnology.com/case-studies',
    },
    openGraph: {
        title: 'Case Studies | Kiaan Technology',
        description: 'Explore our portfolio of successful software development projects, SaaS platforms, and digital transformations.',
        url: 'https://kiaantechnology.com/case-studies',
        siteName: 'Kiaan Technology',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Case Studies | Kiaan Technology',
        description: 'Explore our portfolio of successful software development projects, SaaS platforms, and digital transformations.',
    }
};

export default function CaseStudiesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
