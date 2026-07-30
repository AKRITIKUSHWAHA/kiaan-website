import React from 'react';
import { notFound } from 'next/navigation';
import { caseStudiesData } from '@/data/caseStudiesData';
import { Button } from '@/components/Button';
import Link from 'next/link';
import { ArrowLeft, Target, Cpu, Activity, CheckCircle2 } from 'lucide-react';
import { ProjectNavigation } from '@/components/case-studies/ProjectNavigation';
import { ProjectScreenshots } from '@/components/case-studies/ProjectScreenshots';
import { Reveal } from '@/components/Reveal';
import { ContactCTA } from '@/components/shared/ContactCTA';
import { Metadata } from 'next';
import { JsonLd } from '@/components/seo/JsonLd';

export async function generateStaticParams() {
    return caseStudiesData.map((study) => ({
        slug: study.slug,
    }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const study = caseStudiesData.find((s) => s.slug === params.slug);
    if (!study) return {};
    
    return {
        title: `${study.title} | Kiaan Technology Case Studies`,
        description: study.desc,
        alternates: {
        },
        openGraph: {
            title: `${study.title} | Kiaan Technology Case Studies`,
            description: study.desc,
            url: `https://kiaantechnology.com/case-studies/${study.slug}`,
            siteName: 'Kiaan Technology',
            images: [
                {
                    url: study.image,
                    width: 1200,
                    height: 630,
                    alt: study.title,
                }
            ],
            type: 'article',
        },
        twitter: {
            card: 'summary_large_image',
            title: `${study.title} | Kiaan Technology Case Studies`,
            description: study.desc,
            images: [study.image],
        }
    };
}

export default function CaseStudyDetail({ params }: { params: { slug: string } }) {
    const study = caseStudiesData.find((s) => s.slug === params.slug);

    if (!study) {
        notFound();
    }

    return (
        <div className="bg-black min-h-screen text-white pt-24 pb-16 selection:bg-yellow-500 selection:text-black">
            {/* SEO JSON-LD */}
            <JsonLd 
                data={[
                    {
                        "@context": "https://schema.org",
                        "@type": "SoftwareApplication",
                        "name": study.title,
                        "applicationCategory": study.category,
                        "operatingSystem": "Web, Mobile",
                        "description": study.desc,
                        "image": study.image,
                        "aggregateRating": {
                            "@type": "AggregateRating",
                            "ratingValue": "5",
                            "ratingCount": "1"
                        }
                    },
                    {
                        "@context": "https://schema.org",
                        "@type": "Article",
                        "headline": `${study.title} - Case Study`,
                        "description": study.desc,
                        "image": study.image,
                        "url": `https://kiaantechnology.com/case-studies/${study.slug}`,
                        "author": {
                            "@type": "Organization",
                            "name": "Kiaan Technology",
                            "url": "https://kiaantechnology.com"
                        },
                        "publisher": {
                            "@type": "Organization",
                            "name": "Kiaan Technology",
                            "logo": {
                                "@type": "ImageObject",
                                "url": "https://kiaantechnology.com/logo.png"
                            }
                        },
                        "about": {
                            "@type": "Thing",
                            "name": study.category
                        },
                        "keywords": study.technologies ? study.technologies.join(", ") : undefined
                    }
                ]}
            />
            {/* Back button */}
            <div className="container mx-auto px-6 mb-6">
                <Link href="/case-studies" className="inline-flex items-center text-zinc-500 hover:text-yellow-500 text-xs font-black uppercase tracking-widest transition-colors">
                    <ArrowLeft size={16} className="mr-2" /> Back to Case Studies
                </Link>
            </div>

            {/* Hero Banner Image */}
            {study.image && (
                <div className="w-full h-[35vh] md:h-[45vh] relative mb-12 overflow-hidden border-y border-zinc-900 bg-zinc-950">
                    <img 
                        src={study.image} 
                        alt={`${study.title} - Custom Software Solution Details`} 
                        fetchPriority="high"
                        className="w-full h-full object-cover grayscale opacity-30 hover:grayscale-0 hover:opacity-50 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                </div>
            )}

            {/* Title / Hero Info */}
            <section className="container mx-auto px-6 mb-16">
                <div className="max-w-4xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-6">
                        {study.client} <span className="w-1 h-1 rounded-full bg-yellow-500 mx-2" /> {study.category}
                    </div>
                    <h1 className="text-4xl md:text-6xl font-display uppercase tracking-tight mb-8 leading-tight">
                        {study.title}
                    </h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-8 border-t border-zinc-900">
                        <div>
                            <div className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.2em] mb-2">Primary Impact</div>
                            <div className="text-xl font-display text-yellow-500">{study.result}</div>
                        </div>
                        <div>
                            <div className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.2em] mb-2">Technology Target</div>
                            <div className="text-xl font-display text-white">{study.type}</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Narrative Content */}
            <section className="container mx-auto px-6 mb-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Left Column: Narrative */}
                    <div className="lg:col-span-8 space-y-16">
                        {/* The Challenge */}
                        <div className="space-y-6">
                            <h2 className="text-2xl md:text-3xl font-display uppercase tracking-tight flex items-center gap-4">
                                <Target className="text-red-500" /> The Challenge
                            </h2>
                            <p className="text-lg text-zinc-400 leading-relaxed font-light">
                                {study.challenge}
                            </p>
                        </div>

                        {/* The Blueprint */}
                        <div className="space-y-6">
                            <h2 className="text-2xl md:text-3xl font-display uppercase tracking-tight flex items-center gap-4">
                                <Cpu className="text-yellow-500" /> The Blueprint
                            </h2>
                            <p className="text-lg text-zinc-400 leading-relaxed font-light">
                                {study.blueprint}
                            </p>
                            {study.architectureImage && (
                                <div className="mt-8 border border-zinc-800 p-2 bg-zinc-950/50">
                                    <img src={study.architectureImage} alt={`System Architecture Blueprint for ${study.title}`} loading="lazy" className="w-full h-auto grayscale opacity-80" />
                                </div>
                            )}
                        </div>

                        {/* The Execution */}
                        <div className="space-y-6 relative overflow-hidden">
                            <h2 className="text-2xl md:text-3xl font-display uppercase tracking-tight flex items-center gap-4">
                                <Activity className="text-emerald-500" /> The Execution
                            </h2>
                            <p className="text-lg text-zinc-400 leading-relaxed font-light relative z-10">
                                {study.execution}
                            </p>
                            <div className="absolute top-1/2 -right-8 -translate-y-1/2 w-64 h-64 bg-emerald-500/5 blur-[80px] rounded-full pointer-events-none" />
                        </div>

                        {/* Screenshots Section */}
                        {study.screenshots && study.screenshots.length > 0 && (
                            <div className="pt-12 border-t border-zinc-900">
                                <ProjectScreenshots screenshots={study.screenshots} title={study.title} />
                            </div>
                        )}
                    </div>

                    {/* Right Column: Hard Metrics */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-24 border border-zinc-800 bg-zinc-950 p-8 space-y-8">
                            <h3 className="text-sm font-black uppercase tracking-widest text-white border-b border-zinc-800 pb-4">Hard Impact Metrics</h3>
                            <div className="space-y-6">
                                {study.impactMetrics.map((metric, idx) => (
                                    <div key={idx} className="flex justify-between items-center bg-black p-4 border border-zinc-900">
                                        <div className="text-xs text-zinc-500 font-bold tracking-widest uppercase">{metric.label}</div>
                                        <div className="text-lg font-display text-yellow-500">{metric.value}</div>
                                    </div>
                                ))}
                            </div>
                            <div className="pt-6 border-t border-zinc-800">
                                <div className="text-xs text-zinc-500 mb-4 italic">"Transforming legacy constraints into absolute market dominance."</div>
                                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                                    <CheckCircle2 size={14} className="text-emerald-500" /> Verified by QA
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Project Prev/Next Navigation */}
                <ProjectNavigation currentSlug={study.slug} />
            </section>

            {/* High-Conversion CTA Block */}
            <ContactCTA />
        </div>
    );
}
