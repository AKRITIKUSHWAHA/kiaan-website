"use client";

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowRight, ArrowLeft, CheckCircle2, ChevronDown,
    Layout, Smartphone, Database, Brain, Palette, Globe, Code, Zap,
    ShieldCheck, BarChart3, Users, Rocket, Cpu, Activity, Lock, RefreshCw,
    Layers, Shield
} from 'lucide-react';
import { Button } from '@/components/Button';
import { Reveal } from '@/components/Reveal';
import Link from 'next/link';
import Script from 'next/script';

const IconMap: Record<string, any> = {
    Layout, Smartphone, Database, Brain, Palette, Globe, Code, Zap,
    ShieldCheck, BarChart3, Users, Rocket, Cpu, Activity, Lock, RefreshCw,
    Layers, Shield
};

interface NicheServicePageProps {
    title: string;
    subTitle: string;
    mainKeyword: string;
    keywords: string[];
    desc: string;
    features: {
        title: string;
        desc: string;
        icon: string;
        items: string[];
    }[];
    stats: any[];
    colorClass?: string;
    bgClass?: string;
    slug?: string;
    faqs?: {
        question: string;
        answer: string;
    }[];
    longTailKeywords?: string[];
    locationKeywords?: string[];
    internalLinks?: {
        label: string;
        href: string;
    }[];
    painPoints?: {
        title: string;
        desc: string;
    }[];
    useCases?: {
        title: string;
        desc: string;
    }[];
}

const NicheServicePageInner = ({
    title,
    subTitle,
    mainKeyword,
    keywords,
    desc,
    features,
    stats,
    colorClass = "text-yellow-500",
    bgClass = "bg-yellow-500",
    slug,
    faqs,
    longTailKeywords,
    locationKeywords,
    internalLinks,
    painPoints,
    useCases
}: NicheServicePageProps) => {
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [showAllKeywords, setShowAllKeywords] = useState(false);
    const [showAllLinks, setShowAllLinks] = useState(false);

    return (
        <div className="bg-black min-h-screen text-white pt-24 pb-8 font-sans selection:bg-yellow-500 selection:text-black overflow-hidden uppercase">
            {/* Breadcrumb Schema */}
            {slug && (
                <Script
                    id={`breadcrumb-schema-${slug}`}
                    type="application/ld+json"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "BreadcrumbList",
                            "itemListElement": [
                                {
                                    "@type": "ListItem",
                                    "position": 1,
                                    "name": "Home",
                                    "item": "https://kiaantechnology.com"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 2,
                                    "name": "Solutions",
                                    "item": "https://kiaantechnology.com/solutions"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 3,
                                    "name": title,
                                    "item": `https://kiaantechnology.com/solutions/${slug}`
                                }
                            ]
                        })
                    }}
                />
            )}

            {/* FAQ Schema */}
            {slug && faqs && faqs.length > 0 && (
                <Script
                    id={`faq-schema-${slug}`}
                    type="application/ld+json"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "FAQPage",
                            "mainEntity": faqs.map(faq => ({
                                "@type": "Question",
                                "name": faq.question,
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": faq.answer
                                }
                            }))
                        })
                    }}
                />
            )}

            {/* SoftwareApplication Schema */}
            {slug && (
                <Script
                    id={`software-schema-${slug}`}
                    type="application/ld+json"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "SoftwareApplication",
                            "name": `Kiaan ${subTitle} Software`,
                            "applicationCategory": "BusinessApplication",
                            "operatingSystem": "Cloud / Web-based",
                            "offers": {
                                "@type": "Offer",
                                "price": "0",
                                "priceCurrency": "INR",
                                "description": "Free demo available"
                            },
                            "provider": {
                                "@type": "Organization",
                                "name": "Kiaan Technology",
                                "url": "https://kiaantechnology.com",
                                "address": {
                                    "@type": "PostalAddress",
                                    "addressLocality": "Indore",
                                    "addressRegion": "Madhya Pradesh",
                                    "addressCountry": "IN"
                                }
                            }
                        })
                    }}
                />
            )}

            {/* Background Decorative Elements */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full animated-grid opacity-10" />
                <div className={`absolute top-1/4 -right-20 w-96 h-96 ${bgClass} opacity-[0.03] blur-[120px] animate-pulse`} />
                <div className={`absolute bottom-1/4 -left-20 w-96 h-96 ${bgClass} opacity-[0.03] blur-[120px] animate-pulse`} style={{ animationDelay: '2s' }} />
            </div>

            {/* Top Navigation & Title Row */}
            <div className="container mx-auto px-6 mb-12 relative z-20 flex flex-col lg:flex-row lg:items-center justify-between border-b border-white/5 pb-6 gap-6">
                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                    <Link href="/solutions" prefetch={false} className="shrink-0">
                        <button className="flex items-center gap-2 text-white/70 hover:text-yellow-400 transition-all group px-4 py-2 border border-white/5 hover:border-yellow-500/50 hover:bg-white/5 rounded-none backdrop-blur-sm cursor-pointer">
                            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Back to All Solutions</span>
                        </button>
                    </Link>
                    <div className="h-4 w-px bg-white/10 hidden md:block" />
                    <Reveal>
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-display uppercase tracking-tight leading-none bg-gradient-to-r from-white via-yellow-400 to-yellow-500 bg-clip-text text-transparent font-black">
                            {title}
                        </h1>
                    </Reveal>
                </div>
                <div className="hidden lg:block shrink-0">
                    <Reveal>
                        <div className={`inline-flex items-center gap-3 bg-zinc-900/80 ${colorClass} text-[9px] font-black uppercase tracking-[0.3em] px-4 py-2 rounded-full border border-white/5 cyber-glow-yellow`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${bgClass} animate-pulse`} />
                            {mainKeyword}
                        </div>
                    </Reveal>
                </div>
            </div>

            {/* Hero Content Section */}
            <section className="container mx-auto px-6 mb-12 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-[70%_30%] gap-12 items-start border-b border-white/5 pb-12">
                    {/* Left Column (70%) - Main Info & CTA Buttons */}
                    <div className="space-y-8">
                        <div className="lg:hidden">
                            <Reveal>
                                <div className={`inline-flex items-center gap-3 bg-zinc-900/80 ${colorClass} text-[9px] font-black uppercase tracking-[0.3em] px-4 py-2 rounded-full border border-white/5 cyber-glow-yellow`}>
                                    <div className={`w-1.5 h-1.5 rounded-full ${bgClass} animate-pulse`} />
                                    {mainKeyword}
                                </div>
                            </Reveal>
                        </div>
                        <Reveal delay={0.2}>
                            <div className="relative p-8 bg-zinc-950/40 border border-white/5 border-l-2 border-l-yellow-500/40 rounded-lg backdrop-blur-md">
                                <div className="absolute top-2 left-4 text-yellow-500/10 text-7xl font-serif select-none pointer-events-none">“</div>
                                <p className="text-sm md:text-base text-zinc-300 font-light leading-relaxed pl-6 normal-case">
                                    {desc}
                                </p>
                            </div>
                        </Reveal>
                        <Reveal delay={0.4}>
                            <div className="flex flex-wrap gap-4 pl-4">
                                <Link href="/demo" prefetch={false}>
                                    <Button className={`${bgClass} text-black border-none rounded-none text-xs font-black uppercase tracking-[0.3em] px-8 h-12 shadow-[4px_4px_0_white] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all cursor-pointer`}>
                                        Explore Demo
                                    </Button>
                                </Link>
                                <Link href="/schedule" prefetch={false}>
                                    <Button variant="outline" className="h-12 px-6 text-[10px] font-black uppercase tracking-[0.3em] rounded-none border-white/10 hover:bg-white hover:text-black transition-all cursor-pointer">
                                        Talk to Experts
                                    </Button>
                                </Link>
                            </div>
                        </Reveal>
                    </div>

                    {/* Right Column (30%) - Keywords / Tags Card */}
                    <div className="w-full">
                        <Reveal delay={0.3}>
                            <div className="p-6 bg-zinc-950/40 border border-white/5 rounded-lg backdrop-blur-md space-y-4">
                                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-yellow-500 border-b border-white/5 pb-2">
                                    Focus Areas
                                </h3>
                                <div className="flex flex-wrap gap-2 max-w-full">
                                    {keywords.map((kw, i) => (
                                        <span
                                            key={i}
                                            className={`text-[9px] border border-white/10 bg-white/5 hover:bg-yellow-500/10 hover:border-yellow-500/50 hover:text-yellow-500 px-3 py-1.5 uppercase font-bold text-zinc-400 tracking-wider transition-all duration-300 rounded cursor-default whitespace-nowrap ${!showAllKeywords && i >= 8 ? 'hidden lg:inline-flex' : 'inline-flex'}`}
                                        >
                                            {kw}
                                        </span>
                                    ))}
                                </div>
                                {keywords.length > 8 && (
                                    <button
                                        onClick={() => setShowAllKeywords(!showAllKeywords)}
                                        className="lg:hidden text-[10px] font-black uppercase tracking-widest text-yellow-500 hover:text-white transition-colors pt-2 flex items-center gap-1 cursor-pointer"
                                    >
                                        {showAllKeywords ? (
                                            <>View Less <ChevronDown className="rotate-180" size={12} /></>
                                        ) : (
                                            <>View More ({keywords.length - 8}) <ChevronDown size={12} /></>
                                        )}
                                    </button>
                                )}
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="container mx-auto px-6 mb-6 relative z-10">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.1,
                                delayChildren: 0.2
                            }
                        }
                    }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                    {features.map((f, i) => {
                        const Icon = IconMap[f.icon] || Code;
                        return (
                            <motion.div
                                key={i}
                                variants={{
                                    hidden: { opacity: 0, y: 30 },
                                    visible: {
                                        opacity: 1,
                                        y: 0,
                                        transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] }
                                    }
                                }}
                                className="group glass-panel p-6 hover:shadow-[0_30px_60px_-20px_rgba(255,255,255,0.05)] transition-all duration-700"
                            >
                                <div className={`mb-6 inline-flex p-3 bg-black border border-white/5 ${colorClass} group-hover:bg-white group-hover:text-black transition-all duration-500 animate-float`} style={{ animationDelay: `${i * 0.5}s` }}>
                                    <Icon size={24} />
                                </div>
                                <h3 className="text-2xl font-display uppercase mb-3 tracking-wider">{f.title}</h3>
                                <p className="text-zinc-500 text-xs leading-relaxed mb-6 font-light italic normal-case">&quot;{f.desc}&quot;</p>
                                <ul className="space-y-2">
                                    {f.items.map((item: string, j: number) => (
                                        <li key={j} className="flex items-center gap-3 text-[9px] font-black uppercase tracking-widest text-zinc-400 group-hover:text-zinc-200 transition-colors">
                                            <div className={`w-1 h-1 rounded-full ${bgClass} opacity-50 group-hover:opacity-100 group-hover:scale-125 transition-all`} />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </section>

            {/* Stats / Trust Counter */}
            <section className="bg-zinc-950/50 border-y border-white/5 py-6 mb-6 relative z-10 overflow-hidden">
                <div className="absolute inset-0 bg-white/5 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
                <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center relative z-10">
                    {stats.map((s, i) => (
                        <Reveal key={i} delay={i * 0.1}>
                            <div className="group">
                                <h4 className={`text-4xl md:text-5xl font-display uppercase mb-4 transition-all duration-500 group-hover:scale-110 ${colorClass}`}>{s.val}</h4>
                                <div className="flex flex-col items-center">
                                    <div className="w-8 h-0.5 bg-white/10 mb-4 group-hover:w-16 group-hover:bg-yellow-500 transition-all" />
                                    <p className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-black">{s.label}</p>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* Industry Pain Points */}
            {painPoints && painPoints.length > 0 && (
                <section className="container mx-auto px-6 mb-6 relative z-10">
                    <Reveal>
                        <h2 className="text-3xl md:text-4xl font-display uppercase mb-8 tracking-tighter">
                            Industry <span className={colorClass}>Challenges</span>
                        </h2>
                    </Reveal>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {painPoints.map((pp, i) => (
                            <Reveal key={i} delay={i * 0.05}>
                                <div className="glass-panel p-5 border-l-2 border-l-red-500/50 hover:border-l-yellow-500 transition-colors">
                                    <h3 className="text-sm font-black uppercase tracking-widest text-white mb-2">{pp.title}</h3>
                                    <p className="text-xs text-zinc-500 leading-relaxed normal-case">{pp.desc}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </section>
            )}

            {/* Industry Use Cases */}
            {useCases && useCases.length > 0 && (
                <section className="container mx-auto px-6 mb-6 relative z-10">
                    <Reveal>
                        <h2 className="text-3xl md:text-4xl font-display uppercase mb-8 tracking-tighter">
                            Real-World <span className={colorClass}>Use Cases</span>
                        </h2>
                    </Reveal>
                    <div className="space-y-4">
                        {useCases.map((uc, i) => (
                            <Reveal key={i} delay={i * 0.05}>
                                <div className="glass-panel p-5 flex items-start gap-4 group hover:bg-white/[0.02] transition-colors">
                                    <div className={`w-8 h-8 flex-shrink-0 ${bgClass} flex items-center justify-center text-black text-xs font-black mt-0.5`}>
                                        {String(i + 1).padStart(2, '0')}
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-black uppercase tracking-widest text-white mb-2 group-hover:text-yellow-500 transition-colors">{uc.title}</h3>
                                        <p className="text-xs text-zinc-400 leading-relaxed normal-case">{uc.desc}</p>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </section>
            )}

            {/* FAQ Section */}
            {faqs && faqs.length > 0 && (
                <section className="container mx-auto px-6 mb-6 relative z-10">
                    <Reveal>
                        <h2 className="text-3xl md:text-4xl font-display uppercase mb-8 tracking-tighter">
                            Frequently Asked <span className={colorClass}>Questions</span>
                        </h2>
                    </Reveal>
                    <div className="space-y-3">
                        {faqs.map((faq, i) => (
                            <Reveal key={i} delay={i * 0.05}>
                                <div className="glass-panel overflow-hidden">
                                    <button
                                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                        className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.02] transition-colors"
                                    >
                                        <span className="text-sm md:text-base font-bold uppercase tracking-wide pr-4 normal-case">{faq.question}</span>
                                        <ChevronDown
                                            size={18}
                                            className={`shrink-0 transition-transform duration-300 ${colorClass} ${openFaq === i ? 'rotate-180' : ''}`}
                                        />
                                    </button>
                                    <AnimatePresence>
                                        {openFaq === i && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                                            >
                                                <div className="px-5 pb-5 border-t border-white/5">
                                                    <p className="text-sm text-zinc-400 leading-relaxed pt-4 normal-case">{faq.answer}</p>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </section>
            )}

            {/* EEAT Trust Block */}
            <section className="container mx-auto px-6 mb-6 relative z-10">
                <div className="glass-panel p-6 md:p-8">
                    <Reveal>
                        <h2 className="text-2xl md:text-3xl font-display uppercase mb-6 tracking-tighter">
                            Why Trust <span className={colorClass}>Kiaan Technology</span>
                        </h2>
                    </Reveal>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { val: '10+', label: 'Years of Experience', desc: 'Enterprise software development expertise across India' },
                            { val: '150+', label: 'Projects Delivered', desc: 'Custom solutions for startups to Fortune 500 companies' },
                            { val: '99.99%', label: 'Uptime Guarantee', desc: 'SOC 2 certified, cloud-native infrastructure' },
                            { val: '24/7', label: 'Dedicated Support', desc: 'India-based team with offices in Indore' }
                        ].map((item, i) => (
                            <Reveal key={i} delay={i * 0.1}>
                                <div className="text-center group">
                                    <div className={`text-3xl font-display ${colorClass} mb-2 group-hover:scale-110 transition-transform`}>{item.val}</div>
                                    <div className="text-xs font-black uppercase tracking-widest mb-2">{item.label}</div>
                                    <p className="text-[10px] text-zinc-500 normal-case">{item.desc}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Internal Links Section */}
            {internalLinks && internalLinks.length > 0 && (
                <section className="container mx-auto px-6 mb-6 relative z-10">
                    <Reveal>
                        <div className="glass-panel p-5 md:p-6">
                            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-500 mb-4">Related Solutions</h3>
                            <div className="flex flex-wrap gap-3 mb-4">
                                {internalLinks.map((link, i) => (
                                    <Link
                                        key={i}
                                        href={link.href}
                                        prefetch={false}
                                        className={`${!showAllLinks && i >= 6 ? 'hidden md:inline-flex' : 'inline-flex'}`}
                                    >
                                        <span className={`inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest px-4 py-2 border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all cursor-pointer ${colorClass}`}>
                                            {link.label}
                                            <ArrowRight size={12} />
                                        </span>
                                    </Link>
                                ))}
                            </div>
                            {internalLinks.length > 6 && (
                                <button
                                    onClick={() => setShowAllLinks(!showAllLinks)}
                                    className={`md:hidden text-[10px] font-black uppercase tracking-widest ${colorClass} hover:text-white transition-colors flex items-center gap-1`}
                                >
                                    {showAllLinks ? (
                                        <>View Less <ChevronDown className="rotate-180" size={12} /></>
                                    ) : (
                                        <>View More ({internalLinks.length - 6}) <ChevronDown size={12} /></>
                                    )}
                                </button>
                            )}
                        </div>
                    </Reveal>
                </section>
            )}

            {/* Interactive Demo Teaser */}
            <section className="container mx-auto px-6 mb-6 relative z-10">
                <div className="glass-panel p-6 md:p-10 flex flex-col items-center text-center group overflow-hidden relative">
                    <div className={`absolute inset-0 ${bgClass} opacity-0 group-hover:opacity-[0.02] transition-opacity duration-1000`} />
                    <Reveal>
                        <h2 className="text-4xl md:text-6xl font-display uppercase mb-6 tracking-tighter leading-none">
                            Next-Gen <br />
                            <span className={colorClass}>{subTitle} Engineering</span>
                        </h2>
                    </Reveal>
                    <Reveal delay={0.2}>
                        <p className="text-xl md:text-2xl text-zinc-400 mb-16 max-w-2xl font-light normal-case">
                            Experience the future of enterprise operations with our specialized {subTitle} architecture. Zero compromise on security. Absolute dominance in performance.
                        </p>
                    </Reveal>
                    <Reveal delay={0.4}>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/demo" prefetch={false}>
                                <Button className={`${bgClass} text-black border-none rounded-none text-xs font-black uppercase tracking-[0.3em] px-10 h-12 shadow-[4px_4px_0_white] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all`}>
                                    Launch Your {subTitle} Solution
                                </Button>
                            </Link>
                            <Link href="/schedule" prefetch={false}>
                                <Button variant="outline" className="h-12 px-10 text-[10px] font-black uppercase tracking-[0.3em] rounded-none border-white/10 hover:bg-white hover:text-black transition-all">
                                    Talk To Our Lead Architects
                                </Button>
                            </Link>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Bottom Navigation */}
            <section className="container mx-auto px-6 pb-6 relative z-10 flex justify-center">
                <Link href="/solutions" prefetch={false}>
                    <button className="flex items-center gap-3 text-white/70 hover:text-white transition-all group px-8 py-4 border border-white/10 bg-white/[0.02] hover:bg-white/5 hover:border-yellow-500/50 hover:shadow-[0_0_20px_rgba(255,214,10,0.1)]">
                        <ArrowLeft size={18} className="group-hover:-translate-x-2 transition-transform text-yellow-500" />
                        <span className="text-xs font-black uppercase tracking-[0.4em]">Back to Solutions Arena</span>
                    </button>
                </Link>
            </section>
        </div>
    );
};

export const NicheServicePage = React.memo(NicheServicePageInner);
