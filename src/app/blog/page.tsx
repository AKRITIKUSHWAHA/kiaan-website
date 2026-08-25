import React from 'react';
import { Terminal, Sparkles, ArrowLeft, BookOpen, Clock, Tag, ChevronRight, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/Button';
import { Reveal } from '@/components/Reveal';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Software Dev Blog & Tech Insights | Kiaan Technology",
    description: "Tech insights, SaaS tutorials & software engineering deep dives from Kiaan Technology's team. Stay ahead in the Indian tech ecosystem. Read our latest posts.",
    openGraph: {
        title: "Software Dev Blog & Tech Insights | Kiaan Technology",
        description: "Tech insights, SaaS tutorials & software engineering deep dives from Kiaan Technology’s team. Stay ahead in the Indian tech ecosystem.",
        url: "https://kiaantechnology.com/blog",
        siteName: "Kiaan Technology",
        images: [{ url: "https://kiaantechnology.com/og-image.jpg", width: 1200, height: 630, alt: "Kiaan Technology Blog" }],
        type: "website",
        locale: "en_IN",
    },
    twitter: {
        card: "summary_large_image",
        title: "Software Dev Blog & Tech Insights | Kiaan Technology",
        description: "Tech insights, SaaS tutorials & software engineering deep dives from Kiaan Technology’s team.",
        images: ["https://kiaantechnology.com/og-image.jpg"],
    },
};

const categories = [
    "SaaS Development",
    "Enterprise Solutions",
    "AI & Automation",
    "Web Engineering",
    "Digital Strategy"
];

import { blogData } from '@/data/blogData';

export default function BlogPage() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-yellow-500 selection:text-black">
            <div className="pt-6 lg:pt-8 pb-12 container mx-auto px-4 sm:px-6 max-w-7xl">
                <Reveal>
                    <div className="inline-flex items-center gap-2 bg-zinc-900 text-yellow-500 text-[9px] font-black uppercase tracking-[0.3em] px-4 py-1.5 mb-2 border border-yellow-500/20">
                        <Terminal size={12} />
                        Intel Registry / Public Logs
                    </div>
                    <h1 className="text-4xl md:text-6xl font-display uppercase leading-none tracking-tighter mb-3">
                        Kiaan <span className="text-zinc-600">Journals</span>
                    </h1>
                </Reveal>

                {/* Last Updated Freshness Signal */}
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-6">
                    <Clock size={12} className="text-yellow-500" />
                    <span>Page Last Updated:</span>
                    <span className="text-white">July 29, 2026</span>
                    <span className="w-1 h-1 rounded-full bg-yellow-500 mx-1" />
                    <span>Kiaan Technology</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left: Blog Posts */}
                    <div className="lg:col-span-8 space-y-6">
                        {blogData.map((post, index) => (
                            <Reveal key={index} delay={index * 0.1}>
                                <article className="group relative border-b border-zinc-900 pb-6 hover:border-yellow-500/30 transition-colors">
                                    <div className="flex items-center gap-3 text-[11px] font-bold text-zinc-500 uppercase tracking-widest mb-2">
                                        <span className="text-yellow-500">{post.category}</span>
                                        <span className="w-1 h-1 bg-zinc-800 rounded-full" />
                                        <span>{post.date}</span>
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-display uppercase mb-2 text-white group-hover:text-yellow-500 transition-colors">
                                        <Link href={`/blog/${post.slug}`} className="block">
                                            {post.title}
                                        </Link>
                                    </h2>
                                    <p className="text-zinc-400 text-sm md:text-base mb-4 leading-relaxed font-light">
                                        {post.excerpt}
                                    </p>
                                    <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500 group-hover:text-yellow-500 transition-all">
                                        READ LOG <ArrowRight size={12} />
                                    </Link>
                                </article>
                            </Reveal>
                        ))}
                    </div>

                    {/* Right: Sidebar */}
                    <div className="lg:col-span-4 h-fit lg:sticky lg:top-24 space-y-4">
                        <div className="p-5 bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm">
                            <h3 className="text-xs font-black uppercase tracking-widest text-white mb-4 border-b border-zinc-800 pb-2">Categories</h3>
                            <div className="space-y-2.5">
                                {categories.map(cat => (
                                    <Link key={cat} href={`/blog`} className="flex justify-between items-center group text-xs">
                                        <span className="text-zinc-400 group-hover:text-yellow-500 transition-colors">{cat}</span>
                                        <ChevronRight size={12} className="text-zinc-800 group-hover:text-yellow-500 transition-all" />
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className="p-5 bg-yellow-500 text-black">
                            <h3 className="text-base font-black uppercase mb-2">Expert Insights</h3>
                            <p className="text-xs font-medium mb-4 leading-relaxed">
                                Get a deep dive into Indore's tech ecosystem and modern software engineering directly in your inbox.
                            </p>
                            <Link href="/contact">
                                <Button className="w-full bg-black text-white rounded-none border-none py-3 text-[10px] font-black uppercase tracking-widest hover:bg-zinc-900 transition-colors">
                                    Join Intel Waitlist
                                </Button>
                            </Link>
                        </div>

                        {/* Related Services — Internal Links Panel */}
                        <div className="p-5 bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm">
                            <h3 className="text-xs font-black uppercase tracking-widest text-white mb-3 border-b border-zinc-800 pb-2">Our Services</h3>
                            <ul className="space-y-2">
                                {[
                                    { label: 'Custom Software Development', href: '/services/custom-software-development' },
                                    { label: 'SaaS Product Engineering', href: '/services/saas-development' },
                                    { label: 'ERP Systems', href: '/erp' },
                                    { label: 'CRM Software', href: '/crm' },
                                    { label: 'AI & Automation', href: '/services/ai-automation' },
                                    { label: 'Web Development', href: '/services/web-development' },
                                    { label: 'Mobile App Development', href: '/services/mobile-app-development' },
                                ].map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="flex items-center gap-2 text-xs text-zinc-400 hover:text-yellow-500 transition-colors group"
                                        >
                                            <span className="w-0 group-hover:w-2.5 h-[1px] bg-yellow-500 transition-all duration-300" />
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
