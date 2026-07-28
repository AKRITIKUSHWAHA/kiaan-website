import { NicheServicePage } from '@/components/NicheServicePage';
import { solutionsData } from '@/data/solutionsData';
import { notFound } from 'next/navigation';

export default async function IndustrySolutionPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const data = solutionsData[slug];

    if (!data) {
        notFound();
    }

    return <NicheServicePage {...data} />;
}

export function generateStaticParams() {
    return [
        { slug: 'healthcare' },
        { slug: 'real-estate' },
        { slug: 'automotive' },
        { slug: 'retail' },
        { slug: 'logistics' },
        { slug: 'education' },
        { slug: 'finance' },
        { slug: 'hospitality' },
        { slug: 'professional' }
    ];
}
