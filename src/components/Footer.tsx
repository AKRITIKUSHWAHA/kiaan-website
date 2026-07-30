




import Link from 'next/link'
import { Linkedin, Instagram, Youtube, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react'

// Marquee Component
const Marquee = () => (
    <div className="overflow-hidden bg-yellow-400 py-4 border-y-4 border-black">
        <div className="flex animate-marquee whitespace-nowrap">
            {[...Array(6)].map((_, i) => (
                <span key={i} className="text-3xl md:text-5xl font-display font-bold uppercase text-black mx-8">
                    LET'S WORK TOGETHER • START YOUR PROJECT •
                </span>
            ))}
        </div>
    </div>
)

export const Footer = () => {
    return (
        <footer className="relative bg-black text-white overflow-hidden">
            {/* Top Divider with subtle glow */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[2px] bg-yellow-500/20 blur-sm"></div>

            <Marquee />

            {/* Main Footer Content */}
            <div className="relative z-10 container mx-auto px-6 pt-8 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-8">
                    <div className="md:col-span-2">
                        <h3 className="text-4xl font-display uppercase mb-6 text-white tracking-tighter font-black">
                            Kiaan <span className="text-yellow-500">Technology</span>
                        </h3>
                        <p className="text-zinc-400 text-lg leading-tight max-w-xl mb-8 font-light tracking-tight">
                            Engineering the future of <span className="text-white font-medium">Enterprise Intelligence</span>. We architect scalable, high-performance digital ecosystems that empower global market leaders to dominate their industry.
                        </p>
                            <div className="flex items-center gap-4">
                            {[
                                { 
                                    label: 'Instagram', 
                                    href: 'https://www.instagram.com/kiaan_technology4/',
                                    icon: <Instagram className="w-5 h-5" />
                                },
                                { 
                                    label: 'LinkedIn', 
                                    href: 'https://www.linkedin.com/company/89547261/',
                                    icon: <Linkedin className="w-5 h-5" />
                                },
                                { 
                                    label: 'YouTube', 
                                    href: 'https://www.youtube.com/@kiaantechnology',
                                    icon: <Youtube className="w-5 h-5" />
                                }
                            ].map(({ label, href, icon }, i) => (
                                <Link key={i} href={href} target="_blank" rel="noopener noreferrer" aria-label={`Follow us on ${label}`}>
                                    <div className="w-11 h-11 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-yellow-500 hover:border-yellow-500/50 transition-all duration-300 hover:scale-110 active:scale-95 group relative overflow-hidden shadow-lg hover:shadow-[0_0_20px_rgba(234,179,8,0.15)]">
                                        <div className="relative z-10">
                                            {icon}
                                        </div>
                                        {/* Glossy Overlay */}
                                        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        {/* Light sweep */}
                                        <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-45 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="md:-translate-x-6 lg:-translate-x-12">
                        <h4 className="text-sm font-black uppercase tracking-[0.4em] text-yellow-500 mb-8 border-b border-yellow-500/20 pb-2 w-fit">Quick Links</h4>
                        <ul className="grid grid-cols-[max-content_1fr] gap-x-8 gap-y-4">
                            {[
                                { name: 'About Us', href: '/about' },
                                { name: 'Pricing Plans', href: '/pricing' },
                                { name: 'Our Blog', href: '/blog' },
                                { name: 'Resources & Insights', href: '/resources' },
                                { name: 'Schedule Call', href: '/schedule' },
                                { name: 'Product Demo', href: '/demo' },
                                { name: 'Referral Program (£500)', href: '/referral' },
                                { name: 'Integration Partners', href: '/partners' }
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-base text-zinc-400 hover:text-yellow-500 transition-colors flex items-center group">
                                        <span className="w-0 group-hover:w-4 h-[1px] bg-yellow-500 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-sm font-black uppercase tracking-[0.4em] text-yellow-500 mb-8 border-b border-yellow-500/20 pb-2 w-fit">Contact</h4>
                        <ul className="space-y-6">
                            <li className="flex items-start gap-4 text-base text-zinc-400 group">
                                <div className="p-2 bg-zinc-900 border border-zinc-800 text-zinc-600 group-hover:text-yellow-500 group-hover:border-yellow-500/50 transition-all">
                                    <Mail size={18} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-1">Email Us</span>
                                    <a href="mailto:info@kiaantechnology.com" className="hover:text-white transition-colors">info@kiaantechnology.com</a>
                                </div>
                            </li>
                            <li className="flex items-start gap-4 text-base text-zinc-400 group">
                                <div className="p-2 bg-zinc-900 border border-zinc-800 text-zinc-600 group-hover:text-yellow-500 group-hover:border-yellow-500/50 transition-all">
                                    <Phone size={18} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-1">Call Us</span>
                                    <a href="tel:+919752100980" className="hover:text-white transition-colors">+91 97521 00980</a>
                                </div>
                            </li>
                            <li className="flex items-start gap-4 text-base text-zinc-400 group">
                                <div className="p-2 bg-zinc-900 border border-zinc-800 text-zinc-600 group-hover:text-yellow-500 group-hover:border-yellow-500/50 transition-all">
                                    <MapPin size={18} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-1">Location</span>
                                    <span className="group-hover:text-white transition-colors">Indore, India</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Trustpilot TrustBox Widget */}
                <div className="mt-6 pt-6 border-t border-zinc-900">
                    <div
                        className="trustpilot-widget"
                        data-locale="en-US"
                        data-template-id="56278e9abfbbba0bdcd568bc"
                        data-businessunit-id="67665943d9c7961cf9bd0833"
                        data-style-height="52px"
                        data-style-width="100%"
                        data-token="5e7480a8-cf4e-4c1a-96dc-d8d4b2c0aa74"
                    >
                        <a
                            href="https://www.trustpilot.com/review/kiaantechnology.com"
                            target="_blank"
                            rel="noopener"
                        >
                            Trustpilot
                        </a>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-4 pt-6 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-zinc-500">
                    <div className="order-2 md:order-1 tracking-tight">
                        © <span suppressHydrationWarning>{new Date().getFullYear()}</span> <span className="text-zinc-400 font-bold uppercase">Kiaan Technology</span>. All rights reserved.
                    </div>
                    <div className="flex flex-col gap-2.5 order-1 md:order-2 text-sm md:items-end w-full md:w-auto md:pr-24">
                        <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-4 gap-y-2">
                            <Link href="/privacy" prefetch={false} className="text-zinc-400 hover:text-yellow-500 transition-colors cursor-pointer">Privacy Policy</Link>
                            <span className="text-zinc-600">|</span>
                            <Link href="/terms" prefetch={false} className="text-zinc-400 hover:text-yellow-500 transition-colors cursor-pointer">Terms of Service</Link>
                            <span className="text-zinc-600">|</span>
                            <Link href="/refund-policy" prefetch={false} className="text-zinc-400 hover:text-yellow-500 transition-colors cursor-pointer">Refund Policy</Link>
                            <span className="text-zinc-600">|</span>
                            <Link href="/cancellation-policy" prefetch={false} className="text-zinc-400 hover:text-yellow-500 transition-colors cursor-pointer">Cancellation Policy</Link>
                            <span className="text-zinc-600">|</span>
                            <Link href="/disclaimer" prefetch={false} className="text-zinc-400 hover:text-yellow-500 transition-colors cursor-pointer">Disclaimer</Link>
                        </div>
                        <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-4 gap-y-2">
                            <Link href="/cookie-policy" prefetch={false} className="text-zinc-400 hover:text-yellow-500 transition-colors cursor-pointer">Cookie Policy</Link>
                            <span className="text-zinc-600">|</span>
                            <Link href="/saas-subscription-policy" prefetch={false} className="text-zinc-400 hover:text-yellow-500 transition-colors cursor-pointer">SaaS Subscription Policy</Link>
                            <span className="text-zinc-600">|</span>
                            <Link href="/security-policy" prefetch={false} className="text-zinc-400 hover:text-yellow-500 transition-colors cursor-pointer">Security & Data Protection Policy</Link>
                            <span className="text-zinc-600">|</span>
                            <Link href="/grievance-policy" prefetch={false} className="text-zinc-400 hover:text-yellow-500 transition-colors cursor-pointer">Grievance Redressal Policy</Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Subtle radial gradient for depth */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-[radial-gradient(circle_at_center,_rgba(234,179,8,0.03)_0%,_transparent_70%)] pointer-events-none"></div>
        </footer>
    )
}
