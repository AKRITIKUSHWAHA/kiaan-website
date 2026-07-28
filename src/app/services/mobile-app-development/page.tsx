import type { Metadata } from "next";
import { NicheServicePage } from '@/components/NicheServicePage';
import { solutionsData } from '@/data/solutionsData';

export const metadata: Metadata = {
    title: "Mobile App Development Company India | iOS & Android | Kiaan",
    description: "Custom iOS & Android apps using Flutter & React Native. Enterprise-grade mobile solutions for startups and scale-ups across India. Build with Kiaan Technology — get a quote.",
    keywords: "Mobile App Development Company, iOS App Development, Android App Development, Cross-Platform App Development, Custom Mobile Application Development, Enterprise Mobile Solutions, Progressive Web App Development",
    alternates: {
        canonical: "https://kiaantechnology.com/services/mobile-app-development/",
    },
};

export default function MobileDevelopmentPage() {
    const data = solutionsData['mobile-development'];
    return <NicheServicePage {...data} slug="services/mobile-app-development" />;
}
