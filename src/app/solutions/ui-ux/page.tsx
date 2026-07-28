import type { Metadata } from "next";
import { NicheServicePage } from '@/components/NicheServicePage';
import { solutionsData } from '@/data/solutionsData';

export const metadata: Metadata = {
    title: "UI/UX Design Services India | SaaS & Web Apps | Kiaan",
    description: "Expert UI/UX design for SaaS platforms, web apps & mobile. User research, wireframing, prototyping & usability testing. Elevate your product with Kiaan Technology.",
    keywords: "UI/UX Design Services, SaaS UI Design, Web Application UI Design, User Experience Design, Product Design Services, SaaS Interface Optimization, UX Research and Strategy, Conversion-Focused Design Services",
    alternates: {
        canonical: "https://kiaantechnology.com/solutions/ui-ux",
    },
};

export default function UIUXPage() {
    const data = solutionsData['ui-ux'];
    return <NicheServicePage {...data} slug="ui-ux" />;
}
