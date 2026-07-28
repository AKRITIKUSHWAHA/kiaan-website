import type { Metadata } from "next";
import { NicheServicePage } from '@/components/NicheServicePage';
import { solutionsData } from '@/data/solutionsData';

export const metadata: Metadata = {
    title: "AI Automation Services India | Workflow & RPA | Kiaan",
    description: "AI-driven automation services that eliminate manual work. Intelligent workflow automation, RPA & process optimisation for Indian enterprises. Request a free demo.",
    keywords: "Business Automation Software, Workflow Automation Systems, Enterprise Automation Solutions, AI-Powered Automation Software, Process Automation Development, Robotic Process Automation Solutions, Intelligent Business Automation Tools",
    alternates: {
        canonical: "https://kiaantechnology.com/solutions/ai-automation",
    },
};

export default function AIAutomationPage() {
    const data = solutionsData['ai-automation'];
    return <NicheServicePage {...data} slug="ai-automation" />;
}
