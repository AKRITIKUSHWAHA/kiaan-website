import type { Metadata } from "next";
import { NicheServicePage } from '@/components/NicheServicePage';
import { solutionsData } from '@/data/solutionsData';

export const metadata: Metadata = {
    title: "Web Application Development Company India | Kiaan Technology",
    description: "Kiaan Technology is a trusted web application development company delivering secure, scalable custom web development solutions, enterprise web applications, SaaS platforms, and cloud-based web applications.",
    keywords: "Web Application Development, Custom Web Development, Enterprise Web Development, SaaS Web Development, Cloud-Based Web Applications, Enterprise Web Platform Development, API-First Web Development, Web Performance Optimization Services",
    alternates: {
        canonical: "https://kiaantechnology.com/solutions/web-development",
    },
};

export default function WebDevelopmentPage() {
    const data = solutionsData['web-development'];
    return <NicheServicePage {...data} slug="web-development" />;
}
