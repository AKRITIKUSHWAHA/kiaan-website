import type { Metadata } from "next";
import { NicheServicePage } from '@/components/NicheServicePage';
import { solutionsData } from '@/data/solutionsData';

export const metadata: Metadata = {
    title: "Cloud Infrastructure & DevOps Services India | Kiaan",
    description: "Resilient, scalable cloud-native infrastructure — Kubernetes orchestration, DevOps automation & CI/CD pipelines for global enterprises. Build with Kiaan Technology.",
    keywords: "Cloud Native Infrastructure, Kubernetes, AWS, Azure, Serverless, DevOps Automation, Scalable Cloud, Infrastructure as Code",
    alternates: {
        canonical: "https://kiaantechnology.com/solutions/cloud-infrastructure",
    },
};

export default function CloudInfrastructurePage() {
    const data = solutionsData['cloud-infrastructure'];
    return <NicheServicePage {...data} slug="cloud-infrastructure" />;
}
