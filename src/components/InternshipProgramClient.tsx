"use client";

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    Clock,
    Monitor,
    Award,
    CheckCircle2,
    Rocket,
    Code,
    BookOpen,
    Target,
    Briefcase
} from 'lucide-react';
import { Button } from '@/components/Button';
import { InternshipProgram } from '@/data/InternshipProgramData';
import React, { useState } from 'react';
import Link from 'next/link';
import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE_ID = 'service_opc05wm';
const EMAILJS_TEMPLATE_ID = 'template_jpwu4pp';
const EMAILJS_PUBLIC_KEY = 'zXyGNtU81gEw6BmhH';

export default function InternshipProgramClient({ program }: { program: InternshipProgram | undefined }) {
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        whatsapp: '',
        education: ''
    });
    const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus('submitting');
        setErrorMessage('');

        try {
            await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                {
                    name: formData.name || 'N/A',
                    email: formData.email || 'N/A',
                    company: 'Internship Application',
                    contact_number: formData.whatsapp || 'N/A',
                    contact_method: 'WhatsApp / Email',
                    industry: 'Internship Program',
                    project_type: program?.title || 'N/A',
                    features: program?.category || 'N/A',
                    vision: formData.education || 'N/A',
                    budget: 'N/A',
                    timeline: program?.duration || 'N/A',
                    submitted_at: new Date().toLocaleString(),
                    message: [
                        `Application Type: Internship Program`,
                        `Program: ${program?.title || 'N/A'}`,
                        `Category: ${program?.category || 'N/A'}`,
                        `Name: ${formData.name || 'N/A'}`,
                        `Email: ${formData.email || 'N/A'}`,
                        `WhatsApp: ${formData.whatsapp || 'N/A'}`,
                        `Education: ${formData.education || 'N/A'}`,
                        `Duration: ${program?.duration || 'N/A'}`,
                        `Format: ${program?.format || 'N/A'}`,
                        `Level: ${program?.level || 'N/A'}`
                    ].join('\n')
                },
                EMAILJS_PUBLIC_KEY
            );

            setFormStatus('success');
            setFormData({ name: '', email: '', whatsapp: '', education: '' });
        } catch (error) {
            console.error('Internship application email failed', error);
            setFormStatus('error');
            setErrorMessage('Application send nahi ho paayi. Please try again.');
        }
    };

    if (!program) {
        return (
            <div className="bg-black min-h-screen pt-32 pb-20 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-display uppercase text-white mb-4">Program Not Found</h1>
                    <p className="text-zinc-400 mb-8">The internship program you're looking for doesn't exist.</p>
                    <Link href="/internship">
                        <Button className="bg-yellow-500 hover:bg-yellow-400 text-black">
                            View All Programs
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-black min-h-screen pt-20 pb-20 selection:bg-yellow-500 selection:text-black">
            {/* Back Button */}
            <div className="container mx-auto px-6 mb-2">
                <button
                    onClick={() => router.push('/internship')}
                    className="flex items-center gap-2 text-zinc-400 hover:text-yellow-500 transition-colors"
                >
                    <ArrowLeft size={20} />
                    <span className="text-sm font-bold uppercase tracking-wider">Back to All Programs</span>
                </button>
            </div>

            {/* Hero Section */}
            <section className="container mx-auto px-6 mb-8">
                <div className="relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-yellow-500/10 blur-[100px] rounded-full -z-10" />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl mx-auto text-center"
                    >
                        <span className="inline-block px-4 py-1.5 bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-[10px] font-black uppercase tracking-[0.3em] mb-3 rounded-full">
                            {program.category}
                        </span>

                        <h1 className="text-4xl md:text-6xl font-display uppercase tracking-tight text-white mb-3 leading-none">
                            {program.title}
                        </h1>

                        <p className="text-xl text-zinc-400 mb-6 max-w-2xl mx-auto">
                            {program.hero.description}
                        </p>

                        {/* Quick Info */}
                        <div className="flex flex-wrap justify-center gap-6 mb-8">
                            <div className="flex items-center gap-2 px-4 py-2 bg-zinc-900/50 border border-zinc-800 rounded-full text-zinc-300">
                                <Clock size={16} className="text-yellow-500" />
                                <span className="text-sm font-bold">{program.duration}</span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 bg-zinc-900/50 border border-zinc-800 rounded-full text-zinc-300">
                                <Monitor size={16} className="text-yellow-500" />
                                <span className="text-sm font-bold">{program.format}</span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 bg-zinc-900/50 border border-zinc-800 rounded-full text-zinc-300">
                                <Award size={16} className="text-yellow-500" />
                                <span className="text-sm font-bold">{program.level}</span>
                            </div>
                        </div>

                        {/* Highlights */}
                        <div className="flex flex-wrap justify-center gap-4 mb-8">
                            {program.hero.highlights.map((highlight, index) => (
                                <div key={index} className="flex items-center gap-2 px-4 py-2 bg-zinc-950 border border-zinc-900 text-zinc-300 text-sm">
                                    <CheckCircle2 size={16} className="text-yellow-500" />
                                    {highlight}
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href="#apply" className="w-full sm:w-auto">
                                <Button className="w-full sm:w-auto bg-red-600 hover:bg-red-500 border-none text-white rounded-none skew-x-[-12deg] px-10 h-14 text-sm font-black uppercase tracking-[0.2em]">
                                    <span className="skew-x-[12deg] flex items-center gap-2">
                                        Apply Now <Rocket size={18} />
                                    </span>
                                </Button>
                            </Link>
                            <Link href="/internship" className="w-full sm:w-auto">
                                <Button variant="outline" className="w-full sm:w-auto border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-500 text-sm font-black uppercase tracking-widest h-14 px-10 rounded-none transition-all">
                                    View All Programs
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Curriculum Section */}
            <section className="container mx-auto px-6 mb-16">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-display uppercase text-white mb-4 flex items-center justify-center gap-3">
                            <BookOpen className="text-yellow-500" size={32} />
                            What You'll Learn
                        </h2>
                        <p className="text-zinc-500">Comprehensive curriculum designed by industry experts</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {program.curriculum.map((module, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-zinc-950 border border-zinc-900 p-8 hover:border-yellow-500/50 transition-all"
                            >
                                <h3 className="text-xl font-bold text-white mb-4 uppercase font-display">
                                    {module.module}
                                </h3>
                                <ul className="space-y-3">
                                    {module.topics.map((topic, i) => (
                                        <li key={i} className="flex items-start gap-3 text-zinc-400 text-sm">
                                            <CheckCircle2 size={16} className="text-yellow-500 mt-0.5 shrink-0" />
                                            <span>{topic}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Live Projects Section */}
            <section className="bg-zinc-950 border-y border-zinc-900 py-16 mb-16">
                <div className="container mx-auto px-6">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-display uppercase text-white mb-4 flex items-center justify-center gap-3">
                                <Code className="text-yellow-500" size={32} />
                                Live Projects
                            </h2>
                            <p className="text-zinc-500">Build real-world applications that look great on your portfolio</p>
                        </div>

                        <div className="space-y-6">
                            {program.liveProjects.map((project, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-black border border-zinc-900 p-8 hover:border-yellow-500/50 transition-all"
                                >
                                    <h3 className="text-2xl font-bold text-white mb-3 uppercase font-display">
                                        {project.name}
                                    </h3>
                                    <p className="text-zinc-400 mb-6">{project.description}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tech.map((tech, i) => (
                                            <span key={i} className="px-3 py-1 bg-zinc-900 border border-zinc-800 text-yellow-500 text-xs font-bold uppercase tracking-wider">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Prerequisites & Outcomes */}
            <section className="container mx-auto px-6 mb-16">
                <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Prerequisites */}
                    <div>
                        <h2 className="text-2xl md:text-3xl font-display uppercase text-white mb-8 flex items-center gap-3">
                            <Target className="text-yellow-500" size={28} />
                            Prerequisites
                        </h2>
                        <ul className="space-y-4">
                            {program.prerequisites.map((prereq, index) => (
                                <li key={index} className="flex items-start gap-3 text-zinc-400">
                                    <CheckCircle2 size={20} className="text-yellow-500 mt-0.5 shrink-0" />
                                    <span>{prereq}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Outcomes */}
                    <div>
                        <h2 className="text-2xl md:text-3xl font-display uppercase text-white mb-8 flex items-center gap-3">
                            <Briefcase className="text-yellow-500" size={28} />
                            Career Outcomes
                        </h2>
                        <ul className="space-y-4">
                            {program.outcomes.map((outcome, index) => (
                                <li key={index} className="flex items-start gap-3 text-zinc-400">
                                    <CheckCircle2 size={20} className="text-yellow-500 mt-0.5 shrink-0" />
                                    <span>{outcome}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* Tools & Certification */}
            <section className="bg-zinc-950 border-y border-zinc-900 py-16 mb-4">
                <div className="container mx-auto px-6">
                    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div>
                            <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-wider">Tools You'll Master</h3>
                            <div className="flex flex-wrap gap-3">
                                {program.tools.map((tool, index) => (
                                    <span key={index} className="px-4 py-2 bg-black border border-zinc-800 text-zinc-300 text-sm font-bold">
                                        {tool}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-wider">Certification</h3>
                            <div className="flex items-start gap-4 p-6 bg-black border border-yellow-500/30">
                                <Award size={32} className="text-yellow-500 shrink-0" />
                                <div>
                                    <p className="text-white font-bold mb-2">{program.certification}</p>
                                    <p className="text-zinc-400 text-sm">{program.stipendInfo}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Application Form */}
            <section id="apply" className="container mx-auto px-6 mb-6">
                <div className="max-w-3xl mx-auto bg-zinc-950 border border-zinc-900 relative">
                    <div className="absolute inset-0 bg-yellow-500/[0.02] pointer-events-none" />

                    <div className="p-8 relative">
                        <h2 className="text-3xl md:text-4xl font-display uppercase text-white mb-4 text-center">
                            Apply for This <span className="text-yellow-500">Internship</span>
                        </h2>
                        <p className="text-zinc-500 mb-8 text-center">
                            Start your journey with {program.title}
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {formStatus === 'error' && errorMessage && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center font-bold"
                                >
                                    {errorMessage}
                                </motion.div>
                            )}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Full Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="John Doe"
                                        className="w-full bg-zinc-900 border border-zinc-800 text-white px-6 py-4 focus:outline-none focus:border-yellow-500 transition-all placeholder:text-zinc-700"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Email Address</label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="john@example.com"
                                        className="w-full bg-zinc-900 border border-zinc-800 text-white px-6 py-4 focus:outline-none focus:border-yellow-500 transition-all placeholder:text-zinc-700"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">WhatsApp Number</label>
                                    <input
                                        type="tel"
                                        required
                                        value={formData.whatsapp}
                                        onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                                        placeholder="+91 00000 00000"
                                        className="w-full bg-zinc-900 border border-zinc-800 text-white px-6 py-4 focus:outline-none focus:border-yellow-500 transition-all placeholder:text-zinc-700"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Current Education</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.education}
                                        onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                                        placeholder="e.g. B.Tech CSE 3rd Year"
                                        className="w-full bg-zinc-900 border border-zinc-800 text-white px-6 py-4 focus:outline-none focus:border-yellow-500 transition-all placeholder:text-zinc-700"
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                disabled={formStatus === 'submitting'}
                                className="w-full bg-yellow-500 hover:bg-yellow-400 text-black rounded-none py-6 text-sm font-black uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-2"
                            >
                                {formStatus === 'submitting' ? 'Processing...' : 'Submit Application'} <Rocket size={16} />
                            </Button>

                            {formStatus === 'success' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-4 bg-green-500/10 border border-green-500/20 text-green-500 text-sm text-center font-bold"
                                >
                                    Application submitted successfully! Our team will contact you soon.
                                </motion.div>
                            )}
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}
