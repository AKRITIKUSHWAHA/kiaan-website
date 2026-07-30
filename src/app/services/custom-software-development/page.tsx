import type { Metadata } from "next";
import { NicheServicePage } from '@/components/NicheServicePage';
import { solutionsData } from '@/data/solutionsData';
import { VendorScorecardCTA } from '@/components/VendorScorecardCTA';

export const metadata: Metadata = {
    title: "Custom-Built Enterprise Software Development India | Kiaan",
    description: "Scalable, custom-built software for global businesses — ERP, SaaS platforms, startup MVPs & enterprise apps. Start your digital transformation with Kiaan Technology.",
    keywords: "Custom Software Development Company, Enterprise Software Development, SaaS Development Services, Business Software Solutions, Software Development for Startups, Bespoke Enterprise Applications, Custom Digital Product Engineering, Scalable Enterprise Applications",
    alternates: {
        canonical: "https://kiaantechnology.com/services/custom-software-development/",
    },
};

export default function CustomSoftwarePage() {
    const data = solutionsData['custom-software'];
    return <><NicheServicePage {...data} slug="services/custom-software-development" /><VendorScorecardCTA /></>;
}
