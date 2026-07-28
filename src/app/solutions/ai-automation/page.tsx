import type { Metadata } from "next";
import { NicheServicePage } from '@/components/NicheServicePage';
import { solutionsData } from '@/data/solutionsData';

export const metadata: Metadata = {
    title: "Business Automation Software Development India | Kiaan Technology",
    description: "Intelligent business automation software that eliminates manual processes and improves operational efficiency. Workflow automation, AI-powered automation, and enterprise automation solutions.",
    keywords: "Business Automation Software, Workflow Automation Systems, Enterprise Automation Solutions, AI-Powered Automation Software, Process Automation Development, Robotic Process Automation Solutions, Intelligent Business Automation Tools",
    alternates: {
        canonical: "https://kiaantechnology.com/solutions/ai-automation",
    },
};

export default function AIAutomationPage() {
    const data = solutionsData['ai-automation'];
    return <NicheServicePage {...data} slug="ai-automation" />;
}
