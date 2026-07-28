import type { Metadata } from "next";
import { NicheServicePage } from '@/components/NicheServicePage';
import { solutionsData } from '@/data/solutionsData';

export const metadata: Metadata = {
    title: "ERP & CRM Software Development India | Kiaan Technology",
    description: "Custom-built ERP & CRM software for Indian enterprises. Automate operations, sales workflows & customer engagement with Kiaan Technology. Request a free demo.",
    keywords: "ERP Software Development, Custom ERP Development, CRM Software Development Company, Enterprise Resource Planning Software, Business Process Automation, ERP Customization Services, CRM Implementation Services, Modular ERP Solutions",
    alternates: {
        canonical: "https://kiaantechnology.com/solutions/erp-crm",
    },
};

export default function ERPCRMPage() {
    const data = solutionsData['erp-crm'];
    return <NicheServicePage {...data} slug="erp-crm" />;
}
