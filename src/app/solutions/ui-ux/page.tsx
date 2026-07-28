import type { Metadata } from "next";
import { NicheServicePage } from '@/components/NicheServicePage';
import { solutionsData } from '@/data/solutionsData';

export const metadata: Metadata = {
    title: "UI/UX Design Services for Web & SaaS Applications | Kiaan Technology",
    description: "Professional UI/UX design services focused on creating seamless user experiences for web applications, SaaS platforms, and mobile apps through user research, wireframing, prototyping, and usability testing.",
    keywords: "UI/UX Design Services, SaaS UI Design, Web Application UI Design, User Experience Design, Product Design Services, SaaS Interface Optimization, UX Research and Strategy, Conversion-Focused Design Services",
    alternates: {
        canonical: "https://kiaantechnology.com/solutions/ui-ux",
    },
};

export default function UIUXPage() {
    const data = solutionsData['ui-ux'];
    return <NicheServicePage {...data} slug="ui-ux" />;
}
