"use client";

import { useState, useEffect } from 'react'
import NextImage from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Code, Zap, Globe, Shield, TrendingUp, LucideIcon, Award } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/Button'
import { Reveal } from '@/components/Reveal'
import dynamic from 'next/dynamic'
import React from 'react';
import Script from 'next/script'

// Lazy Load Heavy Sections
const IndustrySolutions = dynamic(() => import('@/components/home/IndustrySolutions').then(mod => mod.IndustrySolutions), {
    loading: () => <div className="h-96 w-full bg-zinc-900/20 animate-pulse rounded-lg my-10" />
})
const CustomSoftwareSolutions = dynamic(() => import('@/components/home/CustomSoftwareSolutions').then(mod => mod.CustomSoftwareSolutions), {
    loading: () => <div className="h-96 w-full bg-zinc-900/20 animate-pulse rounded-lg my-10" />
})
const InternshipTraining = dynamic(() => import('@/components/home/InternshipTraining').then(mod => mod.InternshipTraining), {
    loading: () => <div className="h-96 w-full bg-zinc-900/20 animate-pulse rounded-lg my-10" />
})
const ResourcesPreview = dynamic(() => import('@/components/home/ResourcesPreview').then(mod => mod.ResourcesPreview), {
    loading: () => <div className="h-64 w-full bg-zinc-900/20 animate-pulse rounded-lg my-10" />
})
const FeaturedCaseStudies = dynamic(() => import('@/components/home/FeaturedCaseStudies').then(mod => mod.FeaturedCaseStudies), {
    loading: () => <div className="h-96 w-full bg-zinc-900/20 animate-pulse rounded-lg my-10" />
})
const TestimonialsSection = dynamic(() => import('@/components/testimonials/TestimonialsSection').then(mod => mod.TestimonialsSection), {
    loading: () => <div className="h-96 w-full bg-zinc-900/20 animate-pulse rounded-lg my-10" />
})
const ContactCTA = dynamic(() => import('@/components/shared/ContactCTA').then(mod => mod.ContactCTA), {
    loading: () => <div className="h-48 w-full bg-zinc-900/20 animate-pulse rounded-lg my-10" />
})


// Premium Hero Image Showcase — optimised for 1:1 square award images
const heroSlides = [
    { 
        id: 1, 
        img: '/frontPage/ISO certificate.jpg', 
        label: 'Global Compliance', 
        title: 'ISO Certified',
        sub: 'International Quality Standards',
        color: 'from-amber-400 to-yellow-600',
        glow: 'rgba(234, 179, 8, 0.15)'
    },
    { 
        id: 2, 
        img: '/frontPage/Graphic Design.png', 
        label: 'Visual Excellence', 
        title: 'Creative Design',
        sub: 'Defining Digital Identities',
        color: 'from-pink-400 to-rose-600',
        glow: 'rgba(225, 29, 72, 0.15)'
    },
    { 
        id: 3, 
        img: '/frontPage/glassdoor-award.png', 
        label: 'Top workplace', 
        title: 'Glassdoor Rated',
        sub: 'High employee satisfaction rating',
        color: 'from-indigo-400 to-blue-600',
        glow: 'rgba(79, 70, 229, 0.15)'
    },
    { 
        id: 4, 
        img: '/frontPage/ReactJs.png', 
        label: 'Next-Gen Tech', 
        title: 'React Development',
        sub: 'High-Performance Web Apps',
        color: 'from-sky-400 to-cyan-600',
        glow: 'rgba(6, 182, 212, 0.15)'
    },
    { 
        id: 5, 
        img: '/frontPage/ambitionbox.png', 
        label: 'IT Company Achiever', 
        title: 'AmbitionBox Rated',
        sub: '4.7/5.0 Excellence Rating',
        color: 'from-blue-500 to-cyan-400',
        glow: 'rgba(59, 130, 246, 0.15)'
    },
    { 
        id: 6, 
        img: '/frontPage/UI design.png', 
        label: 'User Centric', 
        title: 'UI/UX Design',
        sub: 'Crafting Immersive Experiences',
        color: 'from-emerald-400 to-teal-600',
        glow: 'rgba(16, 185, 129, 0.15)'
    },
    { 
        id: 7, 
        img: '/frontPage/Fiver certificate.jpeg', 
        label: 'Verified Freelancer', 
        title: 'Fiverr Certified',
        sub: 'Top Rated Development Expert',
        color: 'from-emerald-500 to-green-500',
        glow: 'rgba(16, 185, 129, 0.15)'
    },
    { 
        id: 8, 
        img: '/frontPage/wix-partner.jpg', 
        label: 'Wix Studio Partner', 
        title: 'Wix Partner',
        sub: 'Pioneer Level Partner',
        color: 'from-blue-600 to-indigo-600',
        glow: 'rgba(59, 130, 246, 0.15)'
    },
]

const HeroShowcase = () => {
    const [active, setActive] = useState(0)
    const [rotate, setRotate] = useState({ x: 0, y: 0 })

    useEffect(() => {
        const interval = setInterval(() => {
            setActive(prev => (prev + 1) % heroSlides.length)
        }, 5000)
        return () => clearInterval(interval)
    }, [active])

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const x = (e.clientY - rect.top) / rect.height - 0.5
        const y = (e.clientX - rect.left) / rect.width - 0.5
        setRotate({ x: x * -15, y: y * 15 })
    }

    const handleMouseLeave = () => setRotate({ x: 0, y: 0 })

    return (
        <div className="relative w-full max-w-xl aspect-square flex items-center justify-center perspective-1000 -translate-y-8 sm:-translate-y-12 lg:-translate-y-18">
            {/* Dynamic Background Glow */}
            <motion.div
                animate={{
                    backgroundColor: heroSlides[active].glow,
                    scale: [1, 1.1, 1],
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute inset-0 rounded-full blur-[100px] z-0 pointer-events-none"
            />

            {/* Main Carousel Container */}
            <motion.div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                animate={{ rotateX: rotate.x, rotateY: rotate.y }}
                transition={{ type: 'spring', stiffness: 100, damping: 30 }}
                className="relative w-[76%] sm:w-[80%] lg:w-[82%] aspect-square z-10 preserve-3d cursor-grab active:cursor-grabbing"
            >
                {/* Premium Achievements Tag */}
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 px-3.5 py-1.5 bg-zinc-950/90 backdrop-blur-md border border-yellow-500/40 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.5),0_0_15px_rgba(234,179,8,0.2)] select-none pointer-events-none whitespace-nowrap">
                    <Award className="w-3.5 h-3.5 text-yellow-500 animate-pulse" />
                    <span className="text-[10px] sm:text-xs uppercase font-black tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500">
                        Achievements
                    </span>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={active}
                        initial={{ opacity: 0, scale: 0.8, rotateY: -20, z: -100 }}
                        animate={{ opacity: 1, scale: 1, rotateY: 0, z: 0 }}
                        exit={{ opacity: 0, scale: 1.1, rotateY: 20, z: 100 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute inset-0"
                    >
                        {/* Image Layer — Free-floating without background or borders */}
                        <div className="relative w-full h-full">
                            <NextImage
                                src={heroSlides[active].img}
                                alt={heroSlides[active].title}
                                fill
                                className="object-contain transition-transform duration-700"
                                priority
                                quality={100}
                            />
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Premium Monospace Numbered Controls — situated exactly at the bottom of the card */}
                <div className="absolute -bottom-11 left-1/2 -translate-x-1/2 flex items-center justify-center gap-2.5 z-30 pointer-events-auto">
                    {heroSlides.map((_, i) => (
                        <button
                            key={i}
                            onClick={(e) => {
                                e.stopPropagation();
                                setActive(i);
                            }}
                            className={`w-10 h-10 font-mono text-sm tracking-tighter transition-all duration-300 border rounded-xl flex items-center justify-center font-black ${
                                active === i 
                                    ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-black border-yellow-400 scale-110 shadow-[0_0_15px_rgba(234,179,8,0.45)]' 
                                    : 'bg-zinc-950/90 text-zinc-400 border-zinc-800/80 hover:text-white hover:border-yellow-500/50 hover:bg-zinc-900/90 hover:scale-105'
                            }`}
                        >
                            {String(i + 1).padStart(2, '0')}
                        </button>
                    ))}
                </div>
            </motion.div>
        </div>
    )
}

const HeroShowcaseMemo = React.memo(HeroShowcase)

// Brutalist Grid Card
interface GridCardProps {
    title: string;
    desc: string;
    icon: LucideIcon;
    variant?: 'yellow' | 'red';
    delay: number;
    href?: string;
}

const GridCard = ({ title, desc, icon: Icon, variant = 'yellow', delay, href = "/start-project" }: GridCardProps) => (
    <Reveal delay={delay}>
        <Link href={href}>
            <div className={`h-full group relative p-8 glass-panel transition-all duration-500 hover:-translate-y-2 overflow-hidden cursor-pointer ${variant === 'red' ? 'hover:shadow-[0_20px_40px_-20px_#EF4444] hover:border-red-600/50' : 'hover:shadow-[0_20px_40px_-20px_#EAB308] hover:border-yellow-500/50'}`}>
                {/* Visual Theme Strip */}
                <div className={`absolute top-0 left-0 w-full h-1 z-20 ${variant === 'red' ? 'bg-red-600' : 'bg-yellow-500'}`}></div>


                <div className={`mb-6 p-4 w-fit border border-zinc-700 bg-black relative z-10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                    <Icon size={32} className={`${variant === 'red' ? 'text-red-500 group-hover:text-red-400' : 'text-yellow-500 group-hover:text-yellow-400'}`} />
                </div>

                <h3 className="text-3xl font-display uppercase mb-4 text-white transition-colors relative z-10 group-hover:text-yellow-500 text-mask-reveal">
                    {title}
                </h3>

                <p className="text-zinc-400 leading-relaxed font-light relative z-10 group-hover:text-zinc-200 transition-colors">{desc}</p>

                <div className="mt-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 group-hover:text-yellow-500 transition-all relative z-10">
                    Build With Us <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>

                {/* Background Icon Watermark */}
                <div className="absolute -right-8 -bottom-8 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity duration-700">
                    <Icon size={120} />
                </div>
            </div>
        </Link>
    </Reveal>
)

const GridCardMemo = React.memo(GridCard)

export default function Home() {
    return (
        <div className="bg-black min-h-screen text-white font-sans selection:bg-yellow-500 selection:text-black overflow-x-hidden">
            {/* Comprehensive SEO Schema Markup */}
            <Script
                id="structured-data"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@graph": [
                            {
                                "@type": "Organization",
                                "@id": "https://www.kiaantechnology.com/#organization",
                                "name": "Kiaan Technology",
                                "url": "https://www.kiaantechnology.com/",
                                "logo": "https://www.kiaantechnology.com/logo.png"
                            },
                            {
                                "@type": "LocalBusiness",
                                "@id": "https://www.kiaantechnology.com/#localBusiness",
                                "name": "Kiaan Technology",
                                "url": "https://www.kiaantechnology.com/",
                                "image": "https://www.kiaantechnology.com/logo.png",
                                "address": {
                                    "@type": "PostalAddress",
                                    "addressLocality": "Indore",
                                    "addressRegion": "Madhya Pradesh",
                                    "addressCountry": "IN"
                                },
                                "aggregateRating": {
                                    "@type": "AggregateRating",
                                    "ratingValue": "4.8",
                                    "reviewCount": "6"
                                },
                                "review": [
                                    {
                                        "@type": "Review",
                                        "author": { "@type": "Person", "name": "Rajesh Mehta" },
                                        "reviewRating": { "@type": "Rating", "ratingValue": "5" },
                                        "reviewBody": "Kiaan Technology transformed our entire enrollment pipeline. Their CRM solution cut our response time by 85% and increased student enrollments by 30%."
                                    },
                                    {
                                        "@type": "Review",
                                        "author": { "@type": "Person", "name": "Dr. Ananya Sharma" },
                                        "reviewRating": { "@type": "Rating", "ratingValue": "5" },
                                        "reviewBody": "The AI-powered health assistant Kiaan built has reached over 100,000 rural users."
                                    },
                                    {
                                        "@type": "Review",
                                        "author": { "@type": "Person", "name": "Vikram Patel" },
                                        "reviewRating": { "@type": "Rating", "ratingValue": "5" },
                                        "reviewBody": "From our payment gateway to our booking platform, Kiaan has been our go-to engineering partner."
                                    },
                                    {
                                        "@type": "Review",
                                        "author": { "@type": "Person", "name": "Priya Nair" },
                                        "reviewRating": { "@type": "Rating", "ratingValue": "4" },
                                        "reviewBody": "We needed a SaaS platform that could handle multi-venue scheduling, dynamic pricing, and real-time availability — Kiaan delivered all three flawlessly."
                                    },
                                    {
                                        "@type": "Review",
                                        "author": { "@type": "Person", "name": "Arjun Kapoor" },
                                        "reviewRating": { "@type": "Rating", "ratingValue": "5" },
                                        "reviewBody": "Kiaan built our real-time fleet tracking and route optimization dashboard from scratch. Fuel costs are down 18% and on-time delivery rates jumped to 97%."
                                    },
                                    {
                                        "@type": "Review",
                                        "author": { "@type": "Person", "name": "Sneha Desai" },
                                        "reviewRating": { "@type": "Rating", "ratingValue": "5" },
                                        "reviewBody": "Security and compliance were non-negotiable for our fintech platform. Kiaan's team delivered a PCI-DSS compliant architecture with end-to-end encryption."
                                    }
                                ]
                            },
                            {
                                "@type": "Service",
                                "serviceType": "Custom Software Development",
                                "provider": { "@id": "https://www.kiaantechnology.com/#localBusiness" }
                            },
                            {
                                "@type": "Service",
                                "serviceType": "SaaS Development",
                                "provider": { "@id": "https://www.kiaantechnology.com/#localBusiness" }
                            },
                            {
                                "@type": "Service",
                                "serviceType": "AI Development",
                                "provider": { "@id": "https://www.kiaantechnology.com/#localBusiness" }
                            },
                            {
                                "@type": "Service",
                                "serviceType": "Web Development",
                                "provider": { "@id": "https://www.kiaantechnology.com/#localBusiness" }
                            },
                            {
                                "@type": "Service",
                                "serviceType": "Mobile App Development",
                                "provider": { "@id": "https://www.kiaantechnology.com/#localBusiness" }
                            },
                            {
                                "@type": "FAQPage",
                                "@id": "https://www.kiaantechnology.com/#faq",
                                "mainEntity": [
                                    {
                                        "@type": "Question",
                                        "name": "How much does custom software development cost in India?",
                                        "acceptedAnswer": {
                                            "@type": "Answer",
                                            "text": "Custom software development costs in India typically range from ₹5 lakh to ₹50 lakh depending on the project scope, complexity, technology stack, and team size. Kiaan Technology provides transparent pricing and detailed project estimates tailored to your requirements."
                                        }
                                    },
                                    {
                                        "@type": "Question",
                                        "name": "Which is the best custom software development company in India?",
                                        "acceptedAnswer": {
                                            "@type": "Answer",
                                            "text": "Kiaan Technology is recognized as one of the best custom software development companies in India, offering end-to-end solutions including ERP development, CRM software, SaaS platforms, and industry-specific software solutions with proven delivery for global enterprises."
                                        }
                                    },
                                    {
                                        "@type": "Question",
                                        "name": "What are SaaS product development services in India?",
                                        "acceptedAnswer": {
                                            "@type": "Answer",
                                            "text": "SaaS product development services include designing, building, and deploying cloud-based software-as-a-service applications. Kiaan Technology specializes in multi-tenant SaaS architecture, subscription management, API integrations, and scalable cloud deployment for startups and enterprises."
                                        }
                                    },
                                    {
                                        "@type": "Question",
                                        "name": "How to choose the right ERP software development company?",
                                        "acceptedAnswer": {
                                            "@type": "Answer",
                                            "text": "Look for an ERP development company with proven industry expertise, modular architecture support, integration capabilities, and post-deployment support. Kiaan Technology provides fully customizable ERP solutions with modules for accounting, HR, inventory, and supply chain management."
                                        }
                                    },
                                    {
                                        "@type": "Question",
                                        "name": "What is the difference between cloud-based and on-premise ERP software?",
                                        "acceptedAnswer": {
                                            "@type": "Answer",
                                            "text": "Cloud-based ERP software is hosted on remote servers and accessed via the internet, offering lower upfront costs, automatic updates, and remote accessibility. On-premise ERP is installed locally, providing greater control over data but requiring higher infrastructure investment. Kiaan Technology develops both cloud-based and on-premise ERP solutions."
                                        }
                                    },
                                    {
                                        "@type": "Question",
                                        "name": "What is business automation software and how does it help companies?",
                                        "acceptedAnswer": {
                                            "@type": "Answer",
                                            "text": "Business automation software automates repetitive tasks, streamlines workflows, and improves operational efficiency. It helps companies reduce errors, save time, and lower costs. Kiaan Technology builds intelligent automation software covering workflow automation, document processing, and AI-powered business process automation."
                                        }
                                    }
                                ]
                            }
                        ]
                    })
                }}
            />
            {/* Nav Padding */}
            <div className="h-16" />

            {/* Main Hero Section */}
            <section className="w-full pt-8 sm:pt-12 pb-0 mb-0">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 xl:gap-14 items-start">
                        {/* Left Typography */}
                        <div className="flex flex-col justify-start py-0 order-1 lg:pr-4">
                            <Reveal delay={0.1}>
                                <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-[2.5rem] font-display leading-[1.1] tracking-tighter mb-4 text-white uppercase">
                                    We Build Custom Software, Websites, <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">SaaS Solutions &amp; Business Automation Systems</span>
                                </h1>
                            </Reveal>
                            <Reveal delay={0.3}>
                                <p className="text-sm sm:text-base text-zinc-400 max-w-2xl border-l-2 border-red-600 pl-4 mb-6 leading-snug">
                                    Kiaan Technology is an elite <strong>AI-Driven Business Automation Partner</strong> delivering <strong>custom software solutions</strong> and <strong>scalable SaaS platforms</strong>. We engineer software ecosystems that transform manual enterprise processes into autonomous, high-margin revenue engines using <strong>Enterprise AI</strong> and <strong>Predictive ML</strong>.
                                </p>
                            </Reveal>
                            <Reveal delay={0.5}>
                                <div className="space-y-8">
                                    {/* Services Header — Balanced and smaller */}
                                    <div className="pt-4 border-t border-zinc-800/50">
                                        <Reveal>
                                            <h2 className="text-xl sm:text-2xl font-semibold uppercase tracking-wider text-white mb-2">
                                                Custom Software <span className="text-yellow-500">Solutions for Modern Businesses</span>
                                            </h2>
                                        </Reveal>
                                        <Reveal delay={0.15}>
                                            <p className="text-zinc-500 text-[13px] sm:text-sm font-medium italic border-l border-yellow-500/50 pl-3 leading-relaxed mb-6">
                                                &quot;We don&apos;t just write code. We engineer distinctive digital experiences that define categories.&quot;
                                            </p>
                                        </Reveal>
                                    </div>

                                    <Link href="/start-project" prefetch={true}>
                                        <Button variant="primary" className="bg-white text-black hover:bg-yellow-500 hover:text-black border-none rounded-none w-full sm:w-auto py-3.5 text-base font-bold uppercase tracking-wider shadow-[3px_3px_0_black]">
                                            Launch Your Software
                                        </Button>
                                    </Link>
                                </div>
                            </Reveal>
                        </div>

                        {/* Right Showcase — square image */}
                        <div className="flex items-center justify-center order-2 py-6 lg:py-0 pb-16 lg:pb-12">
                            <HeroShowcaseMemo />
                        </div>
                    </div>
                </div>
            </section>


            {/* Bento Grid Services — Content Only */}
            <section className="pt-8 pb-10 container mx-auto px-4">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    <GridCardMemo
                        title="Web Application Development"
                        desc="We are a leading Web Application Development Company specializing in high-throughput APIs and robust backends for enterprise scale."
                        icon={Code}
                        variant="yellow"
                        delay={0}
                    />
                    <GridCardMemo
                        title="Full Stack Development"
                        desc="A Full Stack Development Company creating next-gen mobile and web applications with fluid animations, MERN Stack capabilities, and startup MVP development."
                        icon={Zap}
                        variant="red"
                        delay={0.1}
                    />
                    <GridCardMemo
                        title="Cloud Software Development"
                        desc="Expert Cloud Software Development Company providing AWS/GCP native infrastructure for zero-downtime global availability."
                        icon={Globe}
                        variant="yellow"
                        delay={0.2}
                    />
                    <GridCardMemo
                        title="CRM & ERP Development"
                        desc="Specialized CRM & ERP Software Development powering enterprise software development with bank-grade security and business automation software."
                        icon={Shield}
                        variant="red"
                        delay={0.3}
                    />
                    <GridCardMemo
                        title="AI Software Development"
                        desc="Premier AI Software Development Company building data-driven marketing stacks and automation software solutions."
                        icon={TrendingUp}
                        variant="yellow"
                        delay={0.4}
                    />
                    <Link href="/services" prefetch={true} className="bg-zinc-900 border border-zinc-800 p-8 flex flex-col justify-center items-center text-center group hover:bg-yellow-500 hover:text-black transition-colors cursor-pointer">
                        <Reveal delay={0.5} width="100%">
                            <div className="flex flex-col items-center">
                                <span className="text-4xl font-display uppercase mb-2">View All Services</span>
                                <ArrowRight size={48} className="group-hover:translate-x-2 transition-transform" />
                            </div>
                        </Reveal>
                    </Link>
                </div>
            </section>

            {/* NEW SECTIONS */}
            <IndustrySolutions />
            <FeaturedCaseStudies />
            <TestimonialsSection />
            <CustomSoftwareSolutions />

            {/* Development Process Section */}
            <section className="py-20 bg-black relative overflow-hidden border-t border-zinc-900">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                        <Reveal>
                            <h2 className="text-4xl md:text-5xl font-display uppercase text-white">
                                Our <span className="text-yellow-500">Development Process</span>
                            </h2>
                        </Reveal>
                        <Reveal delay={0.2}>
                            <p className="text-zinc-500 max-w-sm text-right font-light uppercase tracking-widest text-xs">
                                From concept to code, we follow a rigorous agile methodology for enterprise-grade delivery.
                            </p>
                        </Reveal>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                            { step: "01", title: "Strategic Discovery", desc: "We analyze your business ecosystem to identify automation bottlenecks and digital opportunities." },
                            { step: "02", title: "Architecture Design", desc: "Our engineers design scalable, multi-tenant SaaS architectures with a focus on security and performance." },
                            { step: "03", title: "Agile Engineering", desc: "Rigorous development sprints with continuous integration and real-time stakeholder feedback loops." },
                            { step: "04", title: "Deployment & Scaling", desc: "Go-live on global cloud infrastructure with automated CI/CD pipelines and 24/7 performance monitoring." }
                        ].map((item, idx) => (
                            <Reveal key={idx} delay={idx * 0.1}>
                                <div className="group p-8 border border-zinc-900 hover:border-yellow-500/30 transition-all bg-zinc-950/50">
                                    <span className="text-4xl font-display text-zinc-800 group-hover:text-yellow-500 transition-colors mb-6 block">{item.step}</span>
                                    <h3 className="text-xl font-display uppercase text-white mb-4 group-hover:text-yellow-500 transition-colors">{item.title}</h3>
                                    <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Technology Stack Section */}
            <section className="py-20 bg-zinc-950">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <Reveal>
                            <h2 className="text-4xl md:text-5xl font-display uppercase text-white mb-4">
                                Our <span className="text-yellow-500">Technology Stack</span>
                            </h2>
                        </Reveal>
                        <Reveal delay={0.2}>
                            <p className="text-zinc-400 max-w-2xl mx-auto">
                                We utilize modern, battle-tested technologies to build high-performance software that scales with your business.
                            </p>
                        </Reveal>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {[
                            "React.js", "Next.js", "Node.js", "TypeScript", "PostgreSQL", "AWS",
                            "Google Cloud", "MERN Stack", "Python", "Docker", "Kubernetes", "Tailwind CSS"
                        ].map((tech, idx) => (
                            <Reveal key={idx} delay={idx * 0.05}>
                                <div className="p-6 border border-zinc-900 bg-black text-center group hover:border-yellow-500/50 transition-all cursor-default">
                                    <span className="text-zinc-500 group-hover:text-white font-black uppercase tracking-widest text-[10px] transition-colors">
                                        {tech}
                                    </span>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            <InternshipTraining />
            <ResourcesPreview />

            {/* Contact CTA */}
            <ContactCTA />

            {/* SEO Content Section */}
            <section className="py-8 px-6 bg-zinc-950/50 border-t border-zinc-900/50">
                <div className="container mx-auto max-w-7xl">
                    <p className="text-sm md:text-base text-zinc-300 leading-relaxed font-light">
                        Kiaan Technology is a premier <Link href="/software-development-company-indore" className="text-white hover:text-yellow-500 font-medium">Software Development Company in Indore</Link> delivering custom digital solutions across India. As a leading <Link href="/it-company-indore" className="text-white hover:text-yellow-500 font-medium">IT Company in Indore</Link>, we specialize in <Link href="/saas-development-company-indore" className="text-white hover:text-yellow-500 font-medium">SaaS platform development</Link>, enterprise software systems, and high-performance <Link href="/web-development-company-indore" className="text-white hover:text-yellow-500 font-medium">web development in Indore</Link>. Our expertise as a <Link href="/software-development-company-india" className="text-white hover:text-yellow-500 font-medium">Software Development Company in India</Link> empowers global businesses with scalable architectures, AI-driven automation, and robust cybersecurity. Whether you&#39;re looking for an app development partner or a strategic IT consultant, our Indore-based engineering team ensures zero-downtime deployment and premium technical excellence.
                    </p>
                </div>
            </section>
        </div>
    )
}
