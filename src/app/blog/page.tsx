import React from 'react';
import { Terminal, Sparkles, ArrowLeft, BookOpen, Clock, Tag, ChevronRight, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/Button';
import { Reveal } from '@/components/Reveal';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Kiaan Journals | Engineering Blog & Tech Insights",
    description: "Deep dives into software engineering, SaaS architecture, and the Indore tech ecosystem. Stay updated with the latest from Kiaan Technology.",
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
            <div className="pt-24 pb-20 container mx-auto px-4">
                <Reveal>
                    <div className="inline-flex items-center gap-3 bg-zinc-900 text-yellow-500 text-[10px] font-black uppercase tracking-[0.4em] px-6 py-2 mb-8 border border-yellow-500/20">
                        <Terminal size={14} />
                        Intel Registry / Public Logs
                    </div>
                    <h1 className="text-6xl md:text-8xl font-display uppercase leading-none tracking-tighter mb-16">
                        Kiaan <span className="text-zinc-600">Journals</span>
                    </h1>
                </Reveal>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Left: Blog Posts */}
                    <div className="lg:col-span-8 space-y-12">
                        {blogData.map((post, index) => (
                            <Reveal key={index} delay={index * 0.1}>
                                <article className="group relative border-b border-zinc-900 pb-12 hover:border-yellow-500/30 transition-colors">
                                    <div className="flex items-center gap-4 text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">
                                        <span className="text-yellow-500">{post.category}</span>
                                        <span className="w-1 h-1 bg-zinc-800 rounded-full" />
                                        <span>{post.date}</span>
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-display uppercase mb-4 text-white group-hover:text-yellow-500 transition-colors">
                                        <Link href={`/blog/${post.slug}`} className="block">
                                            {post.title}
                                        </Link>
                                    </h2>
                                    <p className="text-zinc-400 text-lg mb-8 leading-relaxed font-light">
                                        {post.excerpt}
                                    </p>
                                    <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 group-hover:text-yellow-500 transition-all">
                                        READ LOG <ArrowRight size={14} />
                                    </Link>
                                </article>
                            </Reveal>
                        ))}
                    </div>

                    {/* Right: Sidebar */}
                    <div className="lg:col-span-4 h-fit lg:sticky lg:top-24">
                        <div className="p-8 bg-zinc-900/50 border border-zinc-800 mb-8 backdrop-blur-sm">
                            <h3 className="text-sm font-black uppercase tracking-widest text-white mb-8 border-b border-zinc-800 pb-4">Categories</h3>
                            <div className="space-y-4">
                                {categories.map(cat => (
                                    <Link key={cat} href={`/blog/category/${cat.toLowerCase().replace(/ /g, '-')}`} className="flex justify-between items-center group">
                                        <span className="text-zinc-400 group-hover:text-yellow-500 transition-colors">{cat}</span>
                                        <ChevronRight size={14} className="text-zinc-800 group-hover:text-yellow-500 transition-all" />
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className="p-8 bg-yellow-500 text-black">
                            <h3 className="text-xl font-black uppercase mb-4">Expert Insights</h3>
                            <p className="text-sm font-medium mb-8 leading-relaxed">
                                Get a deep dive into Indore's tech ecosystem and modern software engineering directly in your inbox.
                            </p>
                            <Link href="/contact">
                                <Button className="w-full bg-black text-white rounded-none border-none py-4 text-xs font-black uppercase tracking-widest hover:bg-zinc-900 transition-colors">
                                    Join Intel Waitlist
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
