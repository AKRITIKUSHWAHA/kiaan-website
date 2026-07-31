"use client";

import React from 'react';
import { motion } from 'framer-motion';

/**
 * ClientLogosSection
 *
 * Auto-scrolling infinite marquee of client/partner wordmark logos.
 * Uses SVG text wordmarks so no image files are required.
 * When real logo PNGs are approved by clients, swap the SVG
 * elements for <img> tags pointing to /images/clients/[name].png
 *
 * Permission status is tracked inline via the `permission` field.
 */

interface LogoEntry {
    id: string;
    name: string;
    /** 'approved' | 'pending' — pending ones show as wordmarks until approved */
    permission: 'approved' | 'pending';
    sector: string;
    /** Optional: path to approved logo image file */
    logoSrc?: string;
}

const clients: LogoEntry[] = [
    { id: 'study-first', name: 'Study First Info', permission: 'pending', sector: 'EdTech' },
    { id: 'healthsakhi', name: 'HealthSakhi', permission: 'pending', sector: 'HealthTech AI' },
    { id: 'playgroundx', name: 'PlayGroundX', permission: 'pending', sector: 'Web3 Gaming' },
    { id: 'turfpro', name: 'TurfPro', permission: 'pending', sector: 'Sports SaaS' },
    { id: 'pgx', name: 'PGX Gateway', permission: 'pending', sector: 'FinTech' },
];

// Duplicated for seamless infinite scroll
const allLogos = [...clients, ...clients, ...clients];

/** Renders a single wordmark logo tile */
const LogoTile = ({ client }: { client: LogoEntry }) => {
    if (client.logoSrc) {
        return (
            <div className="flex-shrink-0 mx-8 flex items-center justify-center w-36 h-14 opacity-40 hover:opacity-80 transition-opacity duration-500 grayscale hover:grayscale-0 filter">
                <img
                    src={client.logoSrc}
                    alt={`${client.name} logo`}
                    className="max-h-10 max-w-full object-contain"
                    loading="lazy"
                />
            </div>
        );
    }

    // SVG wordmark fallback (used until client provides logo)
    return (
        <div className="flex-shrink-0 mx-8 flex flex-col items-center justify-center w-40 h-14 opacity-35 hover:opacity-70 transition-opacity duration-500">
            <span
                className="text-white font-black uppercase tracking-tight text-sm leading-none"
                aria-label={client.name}
            >
                {client.name}
            </span>
            <span className="text-yellow-500/50 text-[8px] font-bold uppercase tracking-[0.25em] mt-1">
                {client.sector}
            </span>
        </div>
    );
};

export const ClientLogosSection: React.FC = () => {
    return (
        <section
            aria-label="Trusted by leading businesses — client logo gallery"
            className="relative py-10 overflow-hidden border-y border-zinc-900 bg-black"
        >
            {/* Left fade */}
            <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-black to-transparent pointer-events-none" />
            {/* Right fade */}
            <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-black to-transparent pointer-events-none" />

            {/* Eyebrow label */}
            <div className="text-center mb-6 relative z-10">
                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-600">
                    Trusted by Forward-Thinking Businesses
                </span>
            </div>

            {/* Marquee Track */}
            <motion.div
                className="flex items-center"
                animate={{ x: ['0%', '-33.33%'] }}
                transition={{
                    duration: 22,
                    ease: 'linear',
                    repeat: Infinity,
                }}
                style={{ width: 'max-content' }}
            >
                {allLogos.map((client, i) => (
                    <LogoTile key={`${client.id}-${i}`} client={client} />
                ))}
            </motion.div>
        </section>
    );
};

export default ClientLogosSection;
