"use client";
import React from 'react';
import { Layers, Shield, Zap } from 'lucide-react';
import { NicheServicePage } from '@/components/NicheServicePage';

export default function ERPPage() {
    return (
        <NicheServicePage
            title="ERP SYSTEMS"
            subTitle="ERP"
            mainKeyword="ERP SaaS platform"
            keywords={["business ERP cloud system", "Enterprise Resource Planning", "Supply Chain tech", "Inventory AI"]}
            desc="Connect your entire enterprise with our battle-tested ERP SaaS platform. The ultimate business ERP cloud system for global operations."
            colorClass="text-emerald-500"
            bgClass="bg-emerald-500"
            stats={[
                { val: "Unlimited", label: "User Nodes" },
                { val: "100ms", label: "Query Speed" },
                { val: "Multi-Org", label: "Support" },
                { val: "Cloud", label: "Native" }
            ]}
            features={[
                {
                    icon: "Layers",
                    title: "Supply Chain",
                    desc: "End-to-end inventory and vendor management inside your custom business ERP cloud system.",
                    items: ["Stock Tracking", "PO Generation", "Vendor Portal"]
                },
                {
                    icon: "Shield",
                    title: "Fiscal Control",
                    desc: "Our ERP SaaS platform provides deep financial auditing and multi-currency accounting.",
                    items: ["GST/VAT Ready", "Balance Sheets", "Cost Centers"]
                },
                {
                    icon: "Zap",
                    title: "Core Logic",
                    desc: "Connect HR, Sales, and Inventory into one central brain for your entire business empire.",
                    items: ["Cross-Module Data", "Custom Dashboards", "Role Access"]
                }
            ]}
        />
    );
}
