"use client";

import dynamic from 'next/dynamic';
import React from 'react';

const WhatsAppButton = dynamic(() => import('./WhatsAppButton').then(mod => mod.WhatsAppButton), {
    ssr: false
});
const ExitIntentLeadMagnet = dynamic(() => import('./lead-magnets/ExitIntentLeadMagnet').then(mod => mod.ExitIntentLeadMagnet), { ssr: false });

export function GlobalClientComponents() {
    return (
        <>
            <WhatsAppButton />
            <ExitIntentLeadMagnet />
        </>
    );
}
