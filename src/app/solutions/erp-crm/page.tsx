import type { Metadata } from "next";
import { NicheServicePage } from '@/components/NicheServicePage';
import { solutionsData } from '@/data/solutionsData';

export const metadata: Metadata = {
    title: "Custom ERP & CRM Development Services India | Kiaan Technology",
    description: "Kiaan Technology delivers advanced ERP software development and CRM software development services to streamline business operations, automate sales workflows, and improve customer engagement.",
    keywords: "ERP Software Development, Custom ERP Development, CRM Software Development Company, Enterprise Resource Planning Software, Business Process Automation, ERP Customization Services, CRM Implementation Services, Modular ERP Solutions",
    alternates: {
        canonical: "https://kiaantechnology.com/solutions/erp-crm",
    },
};

export default function ERPCRMPage() {
    const data = solutionsData['erp-crm'];
    return <NicheServicePage {...data} slug="erp-crm" />;
}
