"use client";

import { Button } from '@/components/Button'
import React from 'react';
import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE_ID = 'service_opc05wm';
const EMAILJS_TEMPLATE_ID = 'template_jpwu4pp';
const EMAILJS_PUBLIC_KEY = 'zXyGNtU81gEw6BmhH';

export default function Contact() {
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        projectType: 'Custom Software Development',
        message: ''
    });
    const [status, setStatus] = React.useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = React.useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');
        setErrorMessage('');

        try {
            await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                {
                    name: formData.name || 'N/A',
                    email: formData.email || 'N/A',
                    company: 'N/A',
                    contact_number: 'N/A',
                    contact_method: 'Email',
                    industry: 'N/A',
                    project_type: formData.projectType || 'N/A',
                    features: 'N/A',
                    vision: formData.message || 'N/A',
                    budget: 'N/A',
                    timeline: 'N/A',
                    submitted_at: new Date().toLocaleString(),
                    message: [
                        `Name: ${formData.name || 'N/A'}`,
                        `Email: ${formData.email || 'N/A'}`,
                        `Project Type: ${formData.projectType || 'N/A'}`,
                        `Message: ${formData.message || 'N/A'}`
                    ].join('\n')
                },
                EMAILJS_PUBLIC_KEY
            );

            setStatus('success');
            setFormData({ name: '', email: '', projectType: 'Custom Software Development', message: '' });
        } catch (error) {
            console.error('Contact form email failed', error);
            setStatus('error');
            setErrorMessage('Message send nahi ho paaya. Please try again.');
        }
    };

    return (
        <div className="bg-black text-white min-h-screen pt-20 pb-4 font-sans selection:bg-yellow-500 selection:text-black">
            <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12">

                {/* Contact Info */}
                <div>
                    <div className="border-l-4 border-yellow-500 pl-6 mb-6">
                        <h1 className="text-4xl md:text-6xl font-display uppercase leading-none tracking-tighter mb-4">
                            LET'S TALK
                        </h1>
                        <p className="text-lg text-zinc-400 max-w-md">
                            Ready to disrupt the market? Drop us a line. We reply faster than your server responds.
                        </p>
                    </div>

                    <div className="space-y-3">
                        {[
                            { label: 'EMAIL', value: 'info@kiaantechnology.com', link: 'mailto:info@kiaantechnology.com' },
                            { label: 'PHONE', value: '+91 97521 00980', link: 'tel:+919752100980' },
                            { label: 'HQ', value: '2341/e. Sudama Nagar, Indore, M.P.', link: '#' }
                        ].map((item, idx) => (
                            <div key={idx} className="group cursor-pointer">
                                <div className="text-[10px] font-bold text-yellow-500 uppercase tracking-widest mb-0.5">{item.label}</div>
                                <a href={item.link} className="text-xl md:text-3xl font-display uppercase hover:text-red-500 transition-colors">
                                    {item.value}
                                </a>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Contact Form */}
                <div className="bg-zinc-900 border border-zinc-800 p-5 md:p-8 shadow-[6px_6px_0_0_#DC2626]">
                    {status === 'success' ? (
                        <div className="h-full flex flex-col items-center justify-center text-center py-12">
                            <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mb-6">
                                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h2 className="text-3xl font-display uppercase mb-4 text-white">Message Sent</h2>
                            <p className="text-zinc-400 max-w-xs mx-auto mb-8">
                                Our architects are already analyzing your request. We'll be in touch within 24 hours.
                            </p>
                            <Button
                                onClick={() => {
                                    setStatus('idle');
                                    setErrorMessage('');
                                }}
                                className="bg-white text-black hover:bg-yellow-500 hover:text-black font-bold uppercase py-4 rounded-none border-none px-12"
                            >
                                Send Another
                            </Button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-3">
                            {status === 'error' && errorMessage && (
                                <div className="border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                                    {errorMessage}
                                </div>
                            )}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-black border border-zinc-700 p-4 text-white focus:outline-none focus:border-yellow-500 focus:shadow-[4px_4px_0_0_#EAB308] transition-all"
                                        placeholder="JOHN DOE"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Email</label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full bg-black border border-zinc-700 p-4 text-white focus:outline-none focus:border-yellow-500 focus:shadow-[4px_4px_0_0_#EAB308] transition-all"
                                        placeholder="JOHN@EXAMPLE.COM"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Project Type</label>
                                <select
                                    value={formData.projectType}
                                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                                    className="w-full bg-black border border-zinc-700 p-4 text-white focus:outline-none focus:border-yellow-500 focus:shadow-[4px_4px_0_0_#EAB308] transition-all appearance-none cursor-pointer"
                                >
                                    <option>Custom Software Development</option>
                                    <option>Mobile App Development</option>
                                    <option>SaaS Product</option>
                                    <option>UI/UX Design</option>
                                    <option>Digital Marketing</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Message</label>
                                <textarea
                                    rows={4}
                                    required
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full bg-black border border-zinc-700 p-4 text-white focus:outline-none focus:border-yellow-500 focus:shadow-[4px_4px_0_0_#EAB308] transition-all resize-none"
                                    placeholder="TELL US ABOUT YOUR PROJECT..."
                                ></textarea>
                            </div>

                            <Button
                                type="submit"
                                disabled={status === 'submitting'}
                                className="w-full bg-white text-black hover:bg-yellow-500 hover:text-black font-bold uppercase py-4 rounded-none border-none disabled:opacity-50"
                            >
                                {status === 'submitting' ? 'SENDING...' : 'Send Message'}
                            </Button>
                        </form>
                    )}
                </div>

            </div>

        </div>
    )
}
