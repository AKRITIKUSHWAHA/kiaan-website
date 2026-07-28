"use client";
import React from 'react';
import { Users, Layers, Shield } from 'lucide-react';
import { NicheServicePage } from '@/components/NicheServicePage';

export default function CRMPage() {
    return (
        <NicheServicePage
            title="CRM SYSTEMS"
            subTitle="CRM"
            mainKeyword="CRM SaaS software"
            keywords={["customer management SaaS", "online CRM system", "Sales Automation", "Lead Tracking"]}
            desc="Dominate your customer relationships with our high-performance CRM SaaS software. Built for global scale and precision lead management."
            colorClass="text-blue-500"
            bgClass="bg-blue-500"
            stats={[
                { val: "99.9%", label: "Lead Precision" },
                { val: "15min", label: "Sync Speed" },
                { val: "256-bit", label: "Data Security" },
                { val: "Global", label: "Connectivity" }
            ]}
            features={[
                {
                    icon: "Users",
                    title: "Client Portal",
                    desc: "Enterprise-grade customer management SaaS with dedicated white-label portals for your clients.",
                    items: ["Secure Login", "Real-time Chat", "Document Sharing"]
                },
                {
                    icon: "Layers",
                    title: "Pipeline Logic",
                    desc: "Customizable sales funnels inside our online CRM system that adapt to your specific workflow.",
                    items: ["Visual Boards", "Automated Tasks", "Revenue Forecast"]
                },
                {
                    icon: "Shield",
                    title: "Data Integrity",
                    desc: "Military-grade encryption for all your sensitive customer data and transaction history.",
                    items: ["GDPR Compliant", "Audit Logs", "IP Whitelisting"]
                }
            ]}
        />
    );
}
