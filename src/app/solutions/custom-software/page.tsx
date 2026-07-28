import type { Metadata } from "next";
import { NicheServicePage } from '@/components/NicheServicePage';
import { solutionsData } from '@/data/solutionsData';

export const metadata: Metadata = {
    title: "Custom Software Development Company India | Kiaan Technology",
    description: "Tailored custom software development services for global businesses seeking scalable digital transformation. Enterprise software, SaaS platforms, startup MVP development, and business software solutions.",
    keywords: "Custom Software Development Company, Enterprise Software Development, SaaS Development Services, Business Software Solutions, Software Development for Startups, Bespoke Enterprise Applications, Custom Digital Product Engineering, Scalable Enterprise Applications",
    alternates: {
        canonical: "https://kiaantechnology.com/solutions/custom-software",
    },
};

export default function CustomSoftwarePage() {
    const data = solutionsData['custom-software'];
    return <NicheServicePage {...data} slug="custom-software" />;
}
