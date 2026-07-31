"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, X, ArrowRight, Clock, Sparkles } from 'lucide-react';
import { SocialProofBar } from '@/components/SocialProofBar';

// Pages where the CTA should NOT appear (user is already on booking pages)
const HIDDEN_ON_PATHS = [
    '/book-demo',
    '/schedule',
    '/contact',
    '/demo',
    '/start-project',
];

export function BookConsultationCTA() {
    const pathname = usePathname();
    const [dismissed, setDismissed] = useState(false);
    const [showExpanded, setShowExpanded] = useState(false);
    const [hasScrolled, setHasScrolled] = useState(false);

    // Show after user scrolls 300px
    useEffect(() => {
        const handleScroll = () => {
            setHasScrolled(window.scrollY > 300);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Reset dismissed state on route change
    useEffect(() => {
        setDismissed(false);
        setShowExpanded(false);
    }, [pathname]);

    // Don't render on booking/contact pages
    const isHidden = HIDDEN_ON_PATHS.some(p => pathname?.startsWith(p));
    if (isHidden || dismissed) return null;

    const isVisible = hasScrolled;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 80, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 80, scale: 0.95 }}
                    transition={{ type: 'spring', damping: 22, stiffness: 260 }}
                    className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9998] w-full max-w-sm px-4"
                    style={{ pointerEvents: 'auto' }}
                >
                    <AnimatePresence mode="wait">
                        {!showExpanded ? (
                            /* ── Collapsed Pill ── */
                            <motion.div
                                key="pill"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="flex items-center justify-between bg-yellow-500 text-black shadow-[0_8px_40px_rgba(234,179,8,0.45)] px-4 py-3 gap-3"
                            >
                                {/* Pulsing dot */}
                                <span className="relative flex h-3 w-3 flex-shrink-0">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-40" />
                                    <span className="relative inline-flex h-3 w-3 rounded-full bg-black" />
                                </span>

                                <button
                                    onClick={() => setShowExpanded(true)}
                                    className="flex-1 text-left"
                                >
                                    <p className="text-[11px] font-black uppercase tracking-[0.2em] leading-none">
                                        Book a Free Consultation
                                    </p>
                                    <p className="text-[9px] font-bold uppercase tracking-widest opacity-70 mt-0.5">
                                        30 mins · No commitment
                                    </p>
                                </button>

                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setShowExpanded(true)}
                                        className="p-1.5 bg-black/15 hover:bg-black/25 transition-colors rounded-sm"
                                        aria-label="Expand booking panel"
                                    >
                                        <ArrowRight size={13} />
                                    </button>
                                    <button
                                        onClick={() => setDismissed(true)}
                                        className="p-1.5 bg-black/10 hover:bg-black/20 transition-colors rounded-sm"
                                        aria-label="Dismiss"
                                    >
                                        <X size={13} />
                                    </button>
                                </div>
                            </motion.div>
                        ) : (
                            /* ── Expanded Card ── */
                            <motion.div
                                key="card"
                                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                                className="bg-zinc-950 border border-yellow-500/30 shadow-[0_8px_60px_rgba(0,0,0,0.8)] overflow-hidden"
                            >
                                {/* Card Header */}
                                <div className="flex items-center justify-between bg-yellow-500 px-4 py-2.5">
                                    <div className="flex items-center gap-2">
                                        <Sparkles size={12} className="text-black" />
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-black">
                                            Free Consultation
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => setShowExpanded(false)}
                                        className="p-1 bg-black/10 hover:bg-black/20 transition-colors rounded-sm text-black"
                                        aria-label="Collapse"
                                    >
                                        <X size={12} />
                                    </button>
                                </div>

                                {/* Card Body */}
                                <div className="p-5">
                                    <h3 className="text-base font-display uppercase text-white tracking-tight leading-none mb-2">
                                        Talk to Our Engineers
                                    </h3>
                                    <p className="text-xs text-zinc-500 leading-relaxed mb-4">
                                        Get a live demo, project estimate & tech recommendation — all in 30 minutes. Completely free.
                                    </p>

                                    {/* Badges */}
                                    <div className="flex flex-wrap gap-1.5 mb-5">
                                        {[
                                            { icon: Clock, label: '30 Min' },
                                            { icon: Calendar, label: 'Instant Booking' },
                                        ].map(({ icon: Icon, label }) => (
                                            <span
                                                key={label}
                                                className="flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-zinc-500 border border-zinc-800 px-2 py-1"
                                            >
                                                <Icon size={9} className="text-yellow-500" /> {label}
                                            </span>
                                        ))}
                                        <span className="flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-yellow-500 border border-yellow-500/30 px-2 py-1">
                                            ✓ No Commitment
                                        </span>
                                    </div>

                                    {/* CTAs */}
                                    <div className="space-y-2">
                                        <SocialProofBar variant="dark" className="mb-3" />
                                        <Link href="/book-demo" className="block">
                                            <button className="w-full bg-yellow-500 text-black text-[10px] font-black uppercase tracking-[0.25em] h-10 hover:bg-yellow-400 active:scale-95 transition-all flex items-center justify-center gap-2">
                                                <Calendar size={12} />
                                                Book on Calendar
                                            </button>
                                        </Link>
                                        <a
                                            href="https://wa.me/919752100980?text=Hi%20Kiaan%2C%20I%20want%20to%20book%20a%20free%20consultation"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block"
                                        >
                                            <button className="w-full bg-zinc-900 border border-zinc-800 text-white text-[10px] font-black uppercase tracking-[0.25em] h-10 hover:border-[#25D366] hover:text-[#25D366] active:scale-95 transition-all flex items-center justify-center gap-2">
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                                </svg>
                                                WhatsApp Us
                                            </button>
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
