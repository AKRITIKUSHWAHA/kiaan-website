import type { Metadata } from "next";
import { NicheServicePage } from '@/components/NicheServicePage';
import { solutionsData } from '@/data/solutionsData';

export const metadata: Metadata = {
    title: "Web App Development Services India | Kiaan Technology",
    description: "Enterprise web application development in India — scalable apps, SaaS platforms & cloud-native solutions. SEO-optimised. Contact Kiaan Technology today.",
    keywords: "Web Application Development, Custom Web Development, Enterprise Web Development, SaaS Web Development, Cloud-Based Web Applications, Enterprise Web Platform Development, API-First Web Development, Web Performance Optimization Services",
    alternates: {
        canonical: "https://kiaantechnology.com/services/web-development/",
    },
};

export default function WebDevelopmentPage() {
    const data = solutionsData['web-development'];
    return <NicheServicePage {...data} slug="services/web-development" />;
}
