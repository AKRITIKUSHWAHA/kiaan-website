import type { Metadata } from "next";
import { NicheServicePage } from '@/components/NicheServicePage';
import { solutionsData } from '@/data/solutionsData';

export const metadata: Metadata = {
    title: "Cloud Native Infrastructure Services | Kiaan Technology",
    description: "Kiaan Technology provides resilient, scalable cloud native infrastructure solutions, Kubernetes orchestration, and DevOps automation for global enterprises.",
    keywords: "Cloud Native Infrastructure, Kubernetes, AWS, Azure, Serverless, DevOps Automation, Scalable Cloud, Infrastructure as Code",
    alternates: {
        canonical: "https://kiaantechnology.com/solutions/cloud-infrastructure",
    },
};

export default function CloudInfrastructurePage() {
    const data = solutionsData['cloud-infrastructure'];
    return <NicheServicePage {...data} slug="cloud-infrastructure" />;
}
