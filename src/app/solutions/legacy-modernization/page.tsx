import type { Metadata } from "next";
import { NicheServicePage } from '@/components/NicheServicePage';
import { solutionsData } from '@/data/solutionsData';

export const metadata: Metadata = {
    title: "Legacy System Modernization Services India | Kiaan",
    description: "Transform monolithic legacy systems into cloud-native microservices without disruption. Expert legacy modernization for enterprises across India — Kiaan Technology.",
    keywords: "Legacy System Modernization, Monolith to Microservices, Cloud Migration, API Wrapping, Data Modernization, Legacy Software Refactoring",
    alternates: {
        canonical: "https://kiaantechnology.com/solutions/legacy-modernization",
    },
};

export default function LegacyModernizationPage() {
    const data = solutionsData['legacy-modernization'];
    return <NicheServicePage {...data} slug="legacy-modernization" />;
}
