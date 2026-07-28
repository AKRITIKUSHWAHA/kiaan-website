"use client";
import React from 'react';
import { Rocket, Layers, Users } from 'lucide-react';
import { NicheServicePage } from '@/components/NicheServicePage';

export default function POSPage() {
    return (
        <NicheServicePage
            title="POS SYSTEMS"
            subTitle="POS"
            mainKeyword="POS SaaS software"
            keywords={["retail POS system online", "Billing Cloud", "Barcode API", "Hardware Sync"]}
            desc="Power your retail empire with high-speed POS SaaS software. A retail POS system online that works even when your internet doesn't."
            colorClass="text-yellow-500"
            bgClass="bg-yellow-500"
            stats={[
                { val: "Snap", label: "Billing" },
                { val: "Offline", label: "Mode Ready" },
                { val: "50+", label: "Gateway Integrations" },
                { val: "Real-time", label: "Stock Sync" }
            ]}
            features={[
                {
                    icon: "Rocket",
                    title: "Cloud Billing",
                    desc: "Lightning fast POS SaaS software designed for high-volume grocery and fashion retail.",
                    items: ["Barcode Ready", "Multi-payment", "Invoice Design"]
                },
                {
                    icon: "Layers",
                    title: "Stock Brain",
                    desc: "Advanced inventory system inside your retail POS system online with low-stock alerts.",
                    items: ["SKU Management", "Stock Transfers", "Expiry Alerts"]
                },
                {
                    icon: "Users",
                    title: "loyalty tech",
                    desc: "Integrated customer loyalty modules in your POS system to keep your shoppers coming back.",
                    items: ["Reward Points", "Coupons", "Purchase History"]
                }
            ]}
        />
    );
}
