import { NicheServicePage } from '@/components/NicheServicePage';
import { solutionsData } from '@/data/solutionsData';
import type { Metadata } from 'next';

const data = solutionsData['healthcare'];

export const metadata: Metadata = {
    title: data.metaTitle || 'Healthcare Solutions | Kiaan Technology',
    description: data.metaDescription || data.desc,
    keywords: [...(data.longTailKeywords || []), ...(data.locationKeywords || [])].join(', '),
    openGraph: {
        title: data.metaTitle || 'Healthcare Solutions | Kiaan Technology',
        description: data.metaDescription || data.desc,
        url: 'https://kiaantechnology.com/solutions/healthcare',
        siteName: 'Kiaan Technology',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: data.metaTitle || 'Healthcare Solutions | Kiaan Technology',
        description: data.metaDescription || data.desc,
    },
    alternates: {
        canonical: 'https://kiaantechnology.com/solutions/healthcare',
    },
};

export default function HealthcarePage() {
    return <NicheServicePage {...data} slug="healthcare" />;
}
