"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
    Cpu, Zap, Rocket, Shield, Globe, Layers,
    ArrowRight, Monitor, Database, Target, Merge,
    Users, ShoppingBag, Building2,
    Truck, Activity, LayoutGrid, FileText, Settings
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/Button';
import { TestimonialsSection } from '@/components/testimonials';
import { Reveal } from '@/components/Reveal';

// --- Custom Counter Component for Section 5 ---
const StatCounter = ({ value, label, suffix = "+" }: { value: number, label: string, suffix?: string }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (isInView) {
            let start = 0;
            const end = value;
            const duration = 2000;
            const increment = end / (duration / 16);

            const timer = setInterval(() => {
                start += increment;
                if (start >= end) {
                    setCount(end);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(start));
                }
            }, 16);
            return () => clearInterval(timer);
        }
    }, [isInView, value]);

    return (
        <div ref={ref} className="text-center p-8 border border-white/5 bg-zinc-950/30 backdrop-blur-sm group hover:border-yellow-500/30 transition-all duration-500">
            <div className="text-4xl md:text-6xl font-display text-white mb-2 tracking-tighter group-hover:text-yellow-500 transition-colors">
                {count}{suffix}
            </div>
            <div className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-zinc-400 group-hover:text-white transition-colors">
                {label}
            </div>
        </div>
    );
};

// --- Timeline Step for Section 4 ---
const TimelineStep = ({ number, title, desc, delay }: { number: string, title: string, desc: string, delay: number }) => (
    <Reveal delay={delay}>
        <div className="relative pl-12 pb-12 group last:pb-0">
            <div className="absolute left-0 top-0 w-[1px] h-full bg-zinc-800 group-last:h-0"></div>
            <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 bg-yellow-500 rounded-full shadow-[0_0_10px_rgba(234,179,8,0.5)] group-hover:scale-150 transition-transform duration-300"></div>
            <div className="text-[10px] font-black text-yellow-500/60 uppercase tracking-widest mb-2">{number}</div>
            <h3 className="text-lg md:text-xl font-display uppercase text-white mb-4 group-hover:text-yellow-500 transition-colors">{title}</h3>
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-md font-light">
                {desc}
            </p>
        </div>
    </Reveal>
);

export default function AboutPage() {
    return (
        <div className="bg-black text-white font-sans selection:bg-yellow-500 selection:text-black overflow-hidden pt-32">

            {/* SECTION 1 – HERO (Animated) */}
            <section className="relative flex flex-col justify-start pt-6 lg:pt-10 pb-0 px-6 overflow-hidden">
                {/* Background Ambient Effect */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_rgba(234,179,8,0.06)_0%,_transparent_60%)] pointer-events-none" />
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/3 blur-[150px] rounded-full animate-pulse" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-red-600/3 blur-[150px] rounded-full animate-pulse" />

                <div className="max-w-7xl w-full mx-auto relative z-10">
                    <Reveal>
                        <div className="inline-flex items-center gap-3 bg-zinc-900/50 border border-white/10 px-6 py-2 mb-12 backdrop-blur-sm">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
                            </span>
                            <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-white/80 leading-none">
                                Enterprise Engineering Node
                            </span>
                        </div>
                    </Reveal>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
                        {/* Left Column: Heading */}
                        <div className="lg:col-span-7">
                            <Reveal delay={0.3}>
                                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display uppercase tracking-tighter leading-[1.05] text-white">
                                    Engineering Intelligent<br /><span className="text-transparent font-light" style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.25)' }}>Digital Ecosystems</span><br /><span className="text-2xl md:text-3.5xl lg:text-4xl block mt-3 font-normal">For Modern Enterprises</span>
                                </h1>
                            </Reveal>
                        </div>

                        {/* Right Column: Details & CTA */}
                        <div className="lg:col-span-5 lg:pt-4 flex flex-col justify-start">
                            <Reveal delay={0.5}>
                                <p className="text-base md:text-lg text-zinc-300 font-light leading-relaxed mb-10 tracking-tight border-l border-zinc-800/80 pl-6">
                                    Kiaan Technology is an <span className="text-white font-normal underline decoration-yellow-500/50 underline-offset-8">elite AI-Driven Business Automation & Digital Acceleration Partner</span>. We engineer highly scalable software ecosystems that transform manual enterprise processes into autonomous, high-margin revenue engines.
                                </p>
                            </Reveal>

                            <Reveal delay={0.7} width="100%">
                                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-4 pl-6">
                                    <Link href="/demo">
                                        <Button className="h-16 px-10 bg-yellow-500 text-black hover:bg-white hover:text-black rounded-none font-black uppercase text-xs tracking-[0.2em] shadow-[6px_6px_0_rgba(255,255,255,0.1)] hover:shadow-none hover:translate-x-1.5 hover:translate-y-1.5 transition-all w-full sm:w-auto">
                                            Launch Your Software
                                        </Button>
                                    </Link>
                                    <Link href="/solutions">
                                        <Button variant="outline" className="h-16 px-10 border-white/20 hover:border-yellow-500 text-white rounded-none font-black uppercase text-xs tracking-[0.2em] transition-all gap-3 w-full sm:w-auto justify-center">
                                            Explore Our Work <ArrowRight size={16} />
                                        </Button>
                                    </Link>
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 2 – WHO WE ARE */}
            <section className="pt-14 pb-20 md:pt-16 md:pb-28 px-6 border-t border-white/5 bg-zinc-950/20">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Left Column: Details & Philosophy */}
                    <Reveal>
                        <div className="space-y-8">
                            <p className="text-lg md:text-xl text-zinc-300 font-light leading-relaxed italic border-l-2 border-yellow-500 pl-8">
                                At Kiaan Technology, we replace traditional hourly-billed software development with high-velocity architectural engineering. We deploy predictive AI models and scalable microservices that turn legacy mid-market companies into highly profitable, autonomous organizations.
                            </p>
                            <p className="text-base text-zinc-400 leading-relaxed font-light">
                                Our engineering protocol centers on decoupling logic to ensure infinite scalability. By utilizing proprietary, pre-built microservice infrastructure (Next.js, Node, Serverless AI integration layers), we bypass standard agency timelines. Every autonomous workflow we design is optimized to slash operational overhead, allowing your enterprise ecosystem to handle massive, multi-agent data loads cleanly and securely.
                            </p>
                            <div className="pt-8">
                                <Link href="/contact" className="group inline-flex items-center gap-4 text-xs font-black uppercase tracking-widest text-white hover:text-yellow-500 transition-colors">
                                    Talk To Lead Architect <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    </Reveal>

                    {/* Right Column: Statement list */}
                    <Reveal delay={0.4}>
                        <div className="relative">
                            <div className="space-y-6 text-2xl md:text-3.5xl lg:text-4xl font-display uppercase tracking-tighter leading-[1.15] text-white lg:pl-8">
                                <p>We eliminate <span className="text-yellow-500">human bottlenecks</span>.</p>
                                <p>We build autonomous <span className="text-yellow-500">AI ecosystems</span>.</p>
                                <p>We decouple legacy <span className="text-yellow-500">monoliths</span>.</p>
                                <p>We engineer <span className="text-yellow-500">predictive models</span>.</p>
                                <p>We drive immediate <span className="text-yellow-500">margin growth</span>.</p>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* SECTION 3 – WHAT WE BUILD (Animated Grid) */}
            <section className="py-10 md:py-14 px-6 bg-black relative">
                <div className="max-w-7xl mx-auto">
                    <Reveal>
                        <div className="mb-12">
                            <h2 className="text-3xl md:text-5xl font-display uppercase tracking-tighter mb-4">What We <span className="text-yellow-500">Automate</span></h2>
                            <p className="text-zinc-400 font-light max-w-2xl tracking-wide uppercase text-[10px]">A comprehensive landscape of AI-driven business automation suites engineered for immediate ROI.</p>
                        </div>
                    </Reveal>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-px md:bg-white/5">
                        {[
                            { icon: Layers, title: "The Autonomous Back-Office", desc: "NLP-driven document parsing and predictive resource allocation for zero-touch accounting and HR." },
                            { icon: Target, title: "The AI Revenue Funnel", desc: "Predictive lead scoring, automated CRM drips, and dynamic pricing engines for frictionless B2B sales." },
                            { icon: Merge, title: "Enterprise AI + ERP Hybrid", desc: "Adding a modern, decoupled intelligence layer on top of legacy monoliths like SAP or Oracle." },
                            { icon: Cpu, title: "Predictive CRM & Logistics", desc: "Intelligent resource planning and dynamic supply chain routing powered by autonomous machine learning." },
                            { icon: Activity, title: "Algorithmic Healthcare EMR", desc: "Secure data automation handling complex medical workflows, patient onboarding, and compliant billing." },
                            { icon: Globe, title: "Global SaaS Architecture", desc: "Multi-tenant cloud infrastructure engineered with Go and Next.js, built for massive horizontal scaling." }
                        ].map((item, idx) => (
                            <Reveal key={idx} delay={idx * 0.1}>
                                <div className="bg-black p-10 md:p-12 h-full group hover:bg-yellow-500 transition-all duration-700 cursor-default relative overflow-hidden flex flex-col justify-between">
                                    <div className="relative z-10 transition-colors duration-500">
                                        <item.icon className="mb-6 text-yellow-500 group-hover:text-black transition-colors" size={28} strokeWidth={1.5} />
                                        <h3 className="text-xl font-display uppercase text-white mb-4 group-hover:text-black transition-colors leading-none tracking-tight">{item.title}</h3>
                                        <p className="text-zinc-400 group-hover:text-black/70 transition-colors font-light text-sm leading-relaxed">
                                            {item.desc}
                                        </p>
                                    </div>
                                    <div className="absolute inset-0 bg-yellow-500 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-in-out z-0"></div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 4 – OUR APPROACH (Timeline Style Animated) */}
            <section className="py-10 md:py-14 px-6 bg-zinc-950/40 relative">
                <div className="max-w-7xl mx-auto">
                    <Reveal>
                        <div className="mb-12">
                            <h2 className="text-3xl md:text-5xl font-display uppercase tracking-tighter mb-4 leading-none">Our <span className="text-yellow-500">Approach</span></h2>
                            <p className="text-zinc-400 font-light max-w-sm text-xs uppercase tracking-widest leading-relaxed">
                                We follow a rigorous engineering protocol to ensure every system we deploy is mission-ready.
                            </p>
                        </div>
                    </Reveal>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-4">
                        <TimelineStep number="PROTOCOL 01" title="Requirement Engineering" desc="Deep-dive analysis into business logic and operational constraints to build a precise functional roadmap." delay={0.1} />
                        <TimelineStep number="PROTOCOL 02" title="System Architecture Design" desc="Crafting robust blueprints for scalable multi-tier architectures with future growth in mind." delay={0.2} />
                        <TimelineStep number="PROTOCOL 03" title="UI/UX Engineering" desc="Designing high-fidelity interfaces that prioritize clarity, logical flow, and user efficiency." delay={0.3} />
                        <TimelineStep number="PROTOCOL 04" title="Secure Backend Development" desc="Implementing high-performance server-side logic with ultra-secure protocols and clean code." delay={0.4} />
                        <TimelineStep number="PROTOCOL 05" title="Scalable Database Modeling" desc="Architecting complex data schemas optimized for fast retrieval and enterprise-level growth." delay={0.5} />
                        <TimelineStep number="PROTOCOL 06" title="API & Integration Layer" desc="Building seamless bridges between custom ecosystems and third-party tools for total connectivity." delay={0.6} />
                        <TimelineStep number="PROTOCOL 07" title="Deployment & Optimization" desc="Final zero-downtime deployment followed by intense performance tuning and load testing." delay={0.7} />
                        <TimelineStep number="PROTOCOL 08" title="Long-Term Support" desc="Continuous monitoring, iterative updates, and strategic technical support for evolving business needs." delay={0.8} />
                    </div>
                </div>
            </section>

            {/* SECTION 5 – STATS COUNTER (Animated) */}
            <section className="py-12 md:py-16 px-6 bg-black">
                <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCounter value={40} label="Projects Delivered" />
                    <StatCounter value={30} label="Systems Deployed" />
                    <StatCounter value={10} label="Industries Served" />
                    <StatCounter value={100} label="Business Modules" />
                </div>
            </section>

            {/* SECTION 6 – WHY CHOOSE US */}
            <section className="py-10 md:py-14 px-6 bg-zinc-950/20">
                <div className="max-w-7xl mx-auto">
                    <Reveal>
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-5xl font-display uppercase tracking-tighter mb-4">Why <span className="text-yellow-500">Kiaan Tech</span></h2>
                            <p className="text-zinc-400 font-light max-w-xl mx-auto uppercase text-[10px] tracking-[0.2em]">The Kiaan Advantage: Where Logic Meets High-End Engineering.</p>
                        </div>
                    </Reveal>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { title: "Enterprise-grade architecture", icon: Building2 },
                            { title: "Role-based access control", icon: Shield },
                            { title: "Secure authentication systems", icon: Rocket },
                            { title: "Logical workflow engineering", icon: Cpu },
                            { title: "Clean and modern UI", icon: Monitor },
                            { title: "High performance optimization", icon: Zap },
                            { title: "Scalable backend infrastructure", icon: Database },
                            { title: "Production-ready deployments", icon: Globe }
                        ].map((benefit, idx) => (
                            <Reveal key={idx} delay={idx * 0.1}>
                                <div className="p-8 border border-white/5 bg-zinc-950/50 hover:border-yellow-500/30 transition-all duration-500 group h-full">
                                    <benefit.icon className="text-zinc-400 group-hover:text-yellow-500 mb-6 transition-colors" size={20} />
                                    <h3 className="text-base md:text-lg font-display uppercase tracking-tight group-hover:text-white transition-colors">{benefit.title}</h3>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 7 – VISION & MISSION (Premium Section) */}
            {/* SECTION 7 – VISION & MISSION (Premium Section) */}
            <section className="py-10 md:py-14 px-6 bg-black relative overflow-hidden border-t border-white/5">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(234,179,8,0.03)_0%,_transparent_50%)]" />
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
                        {/* Left Column: Heading */}
                        <div className="lg:col-span-4">
                            <Reveal>
                                <h2 className="text-4xl md:text-6xl font-display uppercase tracking-[0.1em] opacity-30 mb-4">Vision 360</h2>
                                <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em] leading-relaxed">
                                    The architectural philosophy driving our engineering protocol.
                                </p>
                            </Reveal>
                        </div>

                        {/* Right Column: Mission statement */}
                        <div className="lg:col-span-8">
                            <Reveal delay={0.3}>
                                <p className="text-xl md:text-3xl font-display uppercase tracking-tighter leading-snug text-white border-l-2 border-yellow-500 pl-8">
                                    Our mission is to build <span className="text-yellow-500">Scalable Digital Infrastructures</span> that empower enterprises to dominate local and global markets through <span className="italic font-light opacity-60">intelligent automation</span>.
                                </p>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 8 – FINAL CTA (Conversion Optimized) */}
            <section className="py-16 md:py-20 px-6 bg-zinc-950 border-t border-white/5 relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-full bg-yellow-500/5 blur-[150px] pointer-events-none" />
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
                        {/* Left Column: Heading */}
                        <div className="lg:col-span-7">
                            <Reveal>
                                <h2 className="text-4xl md:text-6xl font-display uppercase tracking-tighter leading-[0.95]">
                                    Let’s Build Your <br />
                                    <span className="text-yellow-500">Digital Infrastructure</span>
                                </h2>
                            </Reveal>
                        </div>

                        {/* Right Column: Details & Buttons */}
                        <div className="lg:col-span-5 flex flex-col justify-start">
                            <Reveal delay={0.3}>
                                <p className="text-base md:text-lg text-zinc-300 font-light leading-relaxed mb-10 tracking-tight border-l border-zinc-800/80 pl-6">
                                    Partner with Kiaan Technology to engineer scalable enterprise software tailored precisely to your business ecosystem.
                                </p>
                            </Reveal>
                            <Reveal delay={0.5} width="100%">
                                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-4 pl-6">
                                    <Link href="/demo">
                                        <Button className="h-16 px-10 bg-white text-black hover:bg-yellow-500 rounded-none font-black uppercase text-xs tracking-[0.2em] shadow-[6px_6px_0_rgba(234,179,8,0.1)] hover:shadow-none transition-all w-full sm:w-auto">
                                            Launch Your Software
                                        </Button>
                                    </Link>
                                    <Link href="/contact">
                                        <Button variant="outline" className="h-16 px-10 border-white/20 hover:border-yellow-500 text-white rounded-none font-black uppercase text-xs tracking-[0.2em] transition-all w-full sm:w-auto justify-center">
                                            Request Consultation
                                        </Button>
                                    </Link>
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Client Testimonials (3 featured) ── */}
            <TestimonialsSection limit={3} ctaText="View All Case Studies" ctaHref="/case-studies" />
        </div>
    );
}
