"use client";

import { usePathname } from 'next/navigation';
import React from 'react';

export const CanonicalTag = () => {
    const pathname = usePathname();
    const cleanPath = pathname === '/' ? '' : pathname;
    const canonicalUrl = `https://kiaantechnology.com${cleanPath}`;

    return <link rel="canonical" href={canonicalUrl} />;
};
