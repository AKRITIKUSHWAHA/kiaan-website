"use client";

import dynamic from 'next/dynamic';
import React from 'react';

const WhatsAppButton = dynamic(() => import('./WhatsAppButton').then(mod => mod.WhatsAppButton), {
    ssr: false
});

export function GlobalClientComponents() {
    return (
        <>
            <WhatsAppButton />
        </>
    );
}
