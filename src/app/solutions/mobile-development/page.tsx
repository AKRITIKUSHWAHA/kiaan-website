import type { Metadata } from "next";
import { NicheServicePage } from '@/components/NicheServicePage';
import { solutionsData } from '@/data/solutionsData';

export const metadata: Metadata = {
    title: "Mobile App Development Services India | Kiaan Technology",
    description: "End-to-end mobile app development services for iOS and Android. We build secure, scalable custom mobile applications using Flutter, React Native, and native development for startups and enterprises.",
    keywords: "Mobile App Development Company, iOS App Development, Android App Development, Cross-Platform App Development, Custom Mobile Application Development, Enterprise Mobile Solutions, Progressive Web App Development",
    alternates: {
        canonical: "https://kiaantechnology.com/solutions/mobile-development",
    },
};

export default function MobileDevelopmentPage() {
    const data = solutionsData['mobile-development'];
    return <NicheServicePage {...data} slug="mobile-development" />;
}
