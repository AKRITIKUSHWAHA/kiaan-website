"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Home, ArrowRight, Search, Code2, Cpu, Globe, Zap, CheckCircle2, ArrowUpRight, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const quickLinks = [
    { label: 'Services', href: '/services', desc: 'Custom Software, ERP, SaaS, AI' },
    { label: 'Case Studies', href: '/case-studies', desc: '5 real-world success stories' },
    { label: 'About Us', href: '/about', desc: 'Our team, mission & values' },
    { label: 'Start a Project', href: '/start-project', desc: 'Get a free consultation' },
    { label: 'Blog', href: '/blog', desc: 'Insights on enterprise tech' },
    { label: 'Contact', href: '/contact', desc: 'Talk to our engineers' },
];

const floatingItems = [
    { icon: Code2, label: '< 404 />', x: '8%', y: '20%', delay: 0 },
    { icon: Cpu, label: 'NULL', x: '85%', y: '15%', delay: 0.3 },
    { icon: Globe, label: 'LOST', x: '75%', y: '70%', delay: 0.6 },
    { icon: Zap, label: 'ERROR', x: '12%', y: '72%', delay: 0.9 },
];

export default function NotFound() {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [glitchActive, setGlitchActive] = useState(false);

    // Periodic glitch effect on the 404
    useEffect(() => {
        const interval = setInterval(() => {
            setGlitchActive(true);
            setTimeout(() => setGlitchActive(false), 300);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email.trim()) {
            setSubmitted(true);
        }
    };

    return (
        <div className="bg-black min-h-screen text-white relative overflow-hidden flex flex-col selection:bg-yellow-500 selection:text-black">

            {/* Ambient background glows */}
            <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-yellow-500/4 blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-red-500/4 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-zinc-900/30 blur-[200px] rounded-full pointer-events-none" />

            {/* Floating decorative icons */}
            {floatingItems.map(({ icon: Icon, label, x, y, delay }, i) => (
                <motion.div
                    key={i}
                    className="absolute hidden md:flex flex-col items-center gap-2 opacity-10 pointer-events-none"
                    style={{ left: x, top: y }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 0.1, y: [0, -12, 0] }}
                    transition={{ duration: 4, delay, repeat: Infinity, ease: 'easeInOut' }}
                >
                    <Icon size={28} className="text-yellow-500" />
                    <span className="text-[8px] font-black tracking-widest text-zinc-600">{label}</span>
                </motion.div>
            ))}

            {/* Grid overlay */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.015]"
                style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
                    backgroundSize: '60px 60px'
                }}
            />

            {/* Main content */}
            <main className="flex-1 flex flex-col items-center justify-center px-6 pt-24 pb-16 relative z-10">

                {/* 404 Giant Number */}
                <motion.div
                    className="relative mb-8 select-none"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                >
                    <div
                        className={`text-[120px] md:text-[200px] font-display leading-none tracking-tighter text-white/5 ${glitchActive ? 'translate-x-[3px]' : ''} transition-transform duration-75`}
                        style={{ WebkitTextStroke: '1px rgba(255,255,255,0.08)' }}
                    >
                        404
                    </div>
                    <div
                        className={`absolute inset-0 text-[120px] md:text-[200px] font-display leading-none tracking-tighter text-yellow-500/20 ${glitchActive ? '-translate-x-[3px] translate-y-[2px]' : ''} transition-transform duration-75`}
                        aria-hidden
                        style={{ WebkitTextStroke: '1px rgba(234,179,8,0.3)' }}
                    >
                        404
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-black uppercase tracking-widest mb-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                                Page Not Found
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Headline */}
                <motion.div
                    className="text-center max-w-2xl mb-6"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <h1 className="text-3xl md:text-5xl font-display uppercase tracking-tight text-white mb-4">
                        You Wandered Into <br />
                        <span className="text-yellow-500">Uncharted Territory</span>
                    </h1>
                    <p className="text-zinc-400 font-light text-base md:text-lg leading-relaxed">
                        The page you&apos;re looking for doesn&apos;t exist, was moved, or may have a typo in the URL.
                        Let&apos;s get you back on track.
                    </p>
                </motion.div>

                {/* Primary CTA */}
                <motion.div
                    className="flex flex-col sm:flex-row gap-4 mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.35 }}
                >
                    <Link
                        href="/"
                        id="not-found-home-btn"
                        className="inline-flex items-center gap-2 bg-yellow-500 text-black px-8 h-12 text-xs font-black uppercase tracking-widest hover:bg-white transition-all duration-300"
                    >
                        <Home size={16} /> Back to Home
                    </Link>
                    <Link
                        href="/start-project"
                        id="not-found-project-btn"
                        className="inline-flex items-center gap-2 bg-transparent border border-white/10 text-white px-8 h-12 text-xs font-black uppercase tracking-widest hover:border-yellow-500/40 hover:text-yellow-500 transition-all duration-300"
                    >
                        Start a Project <ArrowRight size={16} />
                    </Link>
                </motion.div>

                {/* Quick Navigation Grid */}
                <motion.div
                    className="w-full max-w-4xl mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.45 }}
                >
                    <div className="text-center mb-6">
                        <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-500">
                            <Search size={12} /> Explore Key Pages
                        </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {quickLinks.map((link, i) => (
                            <motion.div
                                key={link.href}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.5 + i * 0.07 }}
                            >
                                <Link
                                    href={link.href}
                                    id={`not-found-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                                    className="group flex flex-col p-5 bg-zinc-950 border border-white/5 hover:border-yellow-500/20 hover:bg-zinc-900/50 transition-all duration-300 h-full"
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-black uppercase tracking-wider text-white group-hover:text-yellow-500 transition-colors">
                                            {link.label}
                                        </span>
                                        <ArrowUpRight size={14} className="text-zinc-700 group-hover:text-yellow-500 transition-colors" />
                                    </div>
                                    <span className="text-[10px] text-zinc-600 font-semibold leading-relaxed">
                                        {link.desc}
                                    </span>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Lead Capture Form */}
                <motion.div
                    className="w-full max-w-xl"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                >
                    <div className="border border-white/5 bg-zinc-950/80 backdrop-blur-xl p-8 relative overflow-hidden">
                        {/* Yellow accent top bar */}
                        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-yellow-500 via-amber-400 to-orange-500" />

                        {!submitted ? (
                            <>
                                <div className="flex items-center gap-3 mb-2">
                                    <Mail size={18} className="text-yellow-500" />
                                    <h2 className="text-sm font-black uppercase tracking-widest text-white">
                                        Stay in the Loop
                                    </h2>
                                </div>
                                <p className="text-zinc-500 text-xs font-light leading-relaxed mb-6">
                                    Get occasional insights on enterprise software, AI automation, and SaaS trends — no spam, unsubscribe anytime.
                                </p>
                                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                                    <input
                                        id="not-found-email-input"
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="your@email.com"
                                        className="flex-1 bg-black border border-zinc-800 text-white text-sm px-4 h-12 placeholder:text-zinc-600 focus:outline-none focus:border-yellow-500/50 transition-colors font-light"
                                        aria-label="Email address for newsletter"
                                    />
                                    <button
                                        id="not-found-email-submit"
                                        type="submit"
                                        className="bg-yellow-500 text-black px-6 h-12 text-xs font-black uppercase tracking-widest hover:bg-white transition-all duration-300 whitespace-nowrap"
                                    >
                                        Notify Me
                                    </button>
                                </form>
                                <p className="text-[9px] text-zinc-700 mt-3 uppercase tracking-wider font-bold">
                                    Join 2,000+ tech leaders — 100% free, no spam.
                                </p>
                            </>
                        ) : (
                            <motion.div
                                className="flex flex-col items-center text-center py-4 gap-4"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                            >
                                <CheckCircle2 size={32} className="text-emerald-500" />
                                <h3 className="text-base font-black uppercase tracking-widest text-white">You&apos;re In!</h3>
                                <p className="text-zinc-400 text-sm font-light">
                                    We&apos;ll send you the best enterprise tech insights. Welcome aboard!
                                </p>
                                <Link href="/" className="text-yellow-500 text-xs font-black uppercase tracking-widest hover:text-white transition-colors">
                                    ← Back to Homepage
                                </Link>
                            </motion.div>
                        )}
                    </div>
                </motion.div>

            </main>
        </div>
    );
}
