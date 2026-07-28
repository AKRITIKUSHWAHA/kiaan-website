import type { Metadata } from "next";
import { NicheServicePage } from '@/components/NicheServicePage';
import { solutionsData } from '@/data/solutionsData';

export const metadata: Metadata = {
    title: "Custom SaaS Development Company India | Kiaan Technology",
    description: "Kiaan Technology is a leading custom SaaS development company delivering scalable, cloud-native SaaS applications, multi-tenant SaaS architecture, and SaaS product development services for startups and enterprises.",
    keywords: "Custom SaaS Development, SaaS Product Development Services, Multi-Tenant SaaS Architecture, Cloud SaaS Development, SaaS Platform Development Company, SaaS MVP Development Company, White Label SaaS Development, SaaS DevOps Services",
    alternates: {
        canonical: "https://kiaantechnology.com/solutions/saas-development",
    },
};

export default function SaaSDevelopmentPage() {
    const data = solutionsData['saas-development'];
    return <NicheServicePage {...data} slug="saas-development" />;
}
