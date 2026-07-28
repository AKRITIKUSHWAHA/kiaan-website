import type { Metadata } from "next";
import { NicheServicePage } from '@/components/NicheServicePage';
import { solutionsData } from '@/data/solutionsData';

export const metadata: Metadata = {
    title: "SaaS Product Development Company India | Kiaan Technology",
    description: "Build scalable multi-tenant SaaS platforms with Kiaan Technology. Cloud-native architecture, API-first design & global deployment for startups and enterprises. Get a quote.",
    keywords: "Custom SaaS Development, SaaS Product Development Services, Multi-Tenant SaaS Architecture, Cloud SaaS Development, SaaS Platform Development Company, SaaS MVP Development Company, White Label SaaS Development, SaaS DevOps Services",
    alternates: {
        canonical: "https://kiaantechnology.com/solutions/saas-development",
    },
};

export default function SaaSDevelopmentPage() {
    const data = solutionsData['saas-development'];
    return <NicheServicePage {...data} slug="saas-development" />;
}
