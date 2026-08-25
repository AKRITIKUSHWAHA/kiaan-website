"use client";

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Rocket, ChevronDown, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { Button } from './Button'
import { navLinks, generateSlug } from '@/data/navigation'
import dynamic from 'next/dynamic'

// Lazy Load Mobile Menu
const MobileMenu = dynamic(() => import('./MobileMenu').then(mod => mod.MobileMenu), {
    ssr: false
})

export const Navbar = () => {
    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    })
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [openMenu, setOpenMenu] = useState<string | null>(null)
    const [activeCategory, setActiveCategory] = useState<string | null>(null)
    const [subMenuTop, setSubMenuTop] = useState(0)
    const [maxSubMenuWidth, setMaxSubMenuWidth] = useState(280)
    const pathname = usePathname()

    useEffect(() => {
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    setIsScrolled(window.scrollY > 20)
                    ticking = false;
                });
                ticking = true;
            }
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest('.nav-dropdown-container')) {
                setOpenMenu(null);
                setActiveCategory(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        setIsMobileMenuOpen(false)
        setOpenMenu(null)
        setActiveCategory(null)
    }, [pathname])

    // Auto close mobile menu on desktop resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1280) {
                setIsMobileMenuOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Lock body scroll when a level2 dropdown or mobile menu is open
    useEffect(() => {
        const currentLink = navLinks.find(l => l.name === openMenu);
        if ((currentLink && 'level2' in currentLink && currentLink.level2) || isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [openMenu, isMobileMenuOpen])

    const handleCategoryHover = (e: React.MouseEvent | React.TouchEvent, title: string, items: any[]) => {
        setActiveCategory(title);
        const item = e.currentTarget as HTMLElement;
        const dropdown = item.closest('.nav-dropdown-inner') as HTMLElement;

        if (dropdown) {
            const dropdownRect = dropdown.getBoundingClientRect();
            const itemRect = item.getBoundingClientRect();

            // Calculate submenu top relative to dropdown
            let top = itemRect.top - dropdownRect.top;

            // Estimate submenu height: ~45px per item + container padding
            const estimatedHeight = Math.min(items.length * 45 + 16, window.innerHeight - 140);
            const absoluteItemTop = itemRect.top;
            const viewportHeight = window.innerHeight;

            // If the estimated submenu would go past the bottom of the viewport
            if (absoluteItemTop + estimatedHeight > viewportHeight - 20) {
                // Adjust top so it stays within viewport with some margin
                const overflow = (absoluteItemTop + estimatedHeight) - (viewportHeight - 20);
                top = Math.max(0, top - overflow);
            }

            setSubMenuTop(top);

            const spaceRight = window.innerWidth - dropdownRect.right;
            // Always keep it right, but adjust width if space is limited
            setMaxSubMenuWidth(Math.min(280, Math.max(160, spaceRight - 20)));
        }
    };

    return (
        <>
            <nav 
                className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,height] duration-300 transform-gpu ${isScrolled ? 'bg-black/85 backdrop-blur-md border-b border-white/5 h-[52px]' : 'bg-transparent border-transparent h-[70px]'}`}
                style={{ WebkitBackfaceVisibility: 'hidden', backfaceVisibility: 'hidden' }}
            >
                {/* Scroll Progress Bar - Wrapped to prevent overflow from spring overshoot */}
                <div className="absolute top-0 left-0 right-0 h-[2px] overflow-hidden z-[60]">
                    <motion.div
                        className="w-full h-full bg-gradient-to-r from-yellow-500 via-red-500 to-yellow-500 shadow-[0_0_10px_#FFD60A] origin-left will-change-transform"
                        style={{ scaleX }}
                    />
                </div>

                {/* Digital Pulse Line */}
                <div className={`absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-opacity duration-1000 ${isScrolled ? 'opacity-100' : 'opacity-0'}`} />

                <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-10 h-full flex items-center justify-between">
                    <Link href="/" className="group text-[1.35rem] 2xl:text-[1.65rem] font-display uppercase tracking-tighter leading-none transition-all duration-300 flex items-center relative z-50 shrink-0">
                        <div className="logo-glitter">
                            <span className="text-white group-hover:text-yellow-500 transition-colors duration-300 font-bold">KIAAN</span>
                            <span className="text-yellow-500 group-hover:text-white transition-colors duration-300 font-bold">TECHNOLOGY</span>
                        </div>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden xl:flex items-stretch h-full flex-1 ml-2 2xl:ml-6 gap-0.5 2xl:gap-1.5 min-w-0">
                        {navLinks.map((link) => (
                            <div
                                key={link.name}
                                className="h-full flex items-center relative nav-dropdown-container shrink-0"
                                onMouseEnter={() => setOpenMenu(link.name)}
                                onMouseLeave={() => {
                                    setOpenMenu(null)
                                    setActiveCategory(null)
                                }}
                            >
                                {link.level2 || link.subItems ? (
                                    <Link
                                        href={link.href}
                                        prefetch={true}
                                        className={`relative h-full px-1.5 2xl:px-3 text-[10px] 2xl:text-[11px] font-bold uppercase tracking-[0.05em] 2xl:tracking-[0.12em] flex items-center gap-1 2xl:gap-1.5 transition-all duration-300 whitespace-nowrap ${openMenu === link.name || (pathname === link.href) ? 'text-black' : 'text-zinc-400 hover:text-white'}`}
                                    >
                                        <span className="relative z-10">{link.name}</span>
                                        <ChevronDown size={12} className={`relative z-10 transition-transform duration-300 ${openMenu === link.name ? 'rotate-180 opacity-100 text-black' : 'opacity-60'}`} />
                                        <span className={`absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[36px] bg-yellow-500 origin-center transition-transform duration-300 ease-out -z-0 rounded-md ${openMenu === link.name || (pathname === link.href) ? 'scale-y-100' : 'scale-y-0'}`}></span>
                                    </Link>
                                ) : (
                                    <Link
                                        href={link.href}
                                        prefetch={true}
                                        className={`relative h-full px-1.5 2xl:px-3 text-[10px] 2xl:text-[11px] font-bold uppercase tracking-[0.05em] 2xl:tracking-[0.12em] flex items-center gap-1 2xl:gap-1.5 transition-all duration-300 whitespace-nowrap ${pathname === link.href ? 'text-black' : 'text-zinc-400 hover:text-white'}`}
                                    >
                                        <span className="relative z-10">{link.name}</span>
                                        <span className={`absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[36px] bg-yellow-500 origin-center transition-transform duration-300 ease-out -z-0 rounded-md ${pathname === link.href ? 'scale-y-100' : 'scale-y-0'}`}></span>
                                    </Link>
                                )}

                                {/* Level 2 & 3 Hierarchical Dropdown */}
                                <AnimatePresence>
                                    {openMenu === link.name && (link.level2 || link.subItems) && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            transition={{ duration: 0.2, ease: "easeOut" }}
                                            className="absolute top-full left-0 z-[100] mt-1"
                                        >
                                            <div className="bg-[#0a0a0a] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative nav-dropdown-inner rounded-xl overflow-hidden">
                                                <div
<<<<<<< HEAD
                                                    className={`${link.subItems ? 'w-[240px]' : 'w-[180px]'} flex flex-col py-2 overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden`}
                                                    style={{ maxHeight: 'calc(100vh - 120px)' }}
                                                >
                                                    {/* Standard SubItems List */}
                                                    {link.subItems && link.subItems.map((subItem) => (
                                                        <Link
                                                            key={subItem.name}
                                                            href={subItem.href}
                                                            prefetch={true}
                                                            className="block px-6 py-2.5 text-[11px] font-bold uppercase tracking-wider text-zinc-400 hover:text-black hover:bg-yellow-500 transition-colors border-b border-white/5 last:border-none"
                                                        >
                                                            {subItem.name}
                                                        </Link>
                                                    ))}

                                                    {/* Level 2 Categories List */}
                                                    {link.level2 && link.level2.map((category: any) => (
                                                        <div
                                                            key={category.title}
                                                            className={`relative ${activeCategory === category.title ? 'bg-yellow-500 text-black' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}
                                                            onMouseEnter={(e) => handleCategoryHover(e, category.title, category.items)}
                                                        >
                                                            <div className="flex items-center justify-between px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider border-b border-white/5 last:border-none cursor-pointer group">
                                                                {/* Category Link (Level 2) */}
=======
                                                    className="w-[240px] flex flex-col py-2 overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden"
                                                    style={{ maxHeight: 'calc(100vh - 120px)', scrollbarWidth: 'none', msOverflowStyle: 'none' } as React.CSSProperties}
                                                    onWheel={(e) => e.stopPropagation()}
                                                >
                                                    {(() => {
                                                        if (link.level2) {
                                                            return link.level2.map((cat: any) => (
                                                                <div
                                                                    key={cat.title}
                                                                    onMouseEnter={(e) => {
                                                                        if (link.name !== 'Solutions') handleCategoryHover(e, cat.title, cat.items);
                                                                    }}
                                                                    onClick={(e) => {
                                                                        if (link.name !== 'Solutions') handleCategoryHover(e, cat.title, cat.items);
                                                                    }}
                                                                    className={`group/cat px-4 py-3.5 flex items-center justify-between cursor-pointer transition-colors relative ${activeCategory === cat.title ? 'bg-yellow-500 text-black' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}
                                                                >
                                                                    <Link
                                                                        href={(() => {
                                                                            if (link.name === 'Products') return `/products/category/${generateSlug(cat.title)}`;
                                                                            if (link.name === 'Solutions') return `/solutions/${cat.slug || generateSlug(cat.title)}`;
                                                                            return `/internship?cat=${generateSlug(cat.title)}`;
                                                                        })()}
                                                                        prefetch={true}
                                                                        className="text-[10px] font-bold uppercase tracking-widest flex-1 before:absolute before:inset-0"
                                                                    >
                                                                        {cat.title}
                                                                    </Link>
                                                                    {link.name !== 'Solutions' && (
                                                                        <ChevronRight size={12} className={activeCategory === cat.title ? 'text-black' : 'text-zinc-600'} />
                                                                    )}
                                                                </div>
                                                            ));
                                                        }
                                                        if (link.subItems) {
                                                            return link.subItems.map((item: any) => (
>>>>>>> upstream/main
                                                                <Link
                                                                    href={(() => {
                                                                        if (category.href) return category.href;
                                                                        if (link.name === 'Products') return `/products/category/${generateSlug(category.title)}`;
                                                                        if (link.name === 'Solutions') return `/solutions/${category.slug || generateSlug(category.title)}`;
                                                                        return `/internship?cat=${category.slug || generateSlug(category.title)}`;
                                                                    })()}
                                                                    prefetch={true}
                                                                    className={`flex-1 ${activeCategory === category.title ? 'text-black' : 'text-zinc-400 group-hover:text-white'}`}
                                                                >
                                                                    {category.title}
                                                                </Link>
                                                                <ChevronRight size={12} className={activeCategory === category.title ? 'text-black' : 'text-zinc-600 group-hover:text-white'} />
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>

                                                {/* Level 3 Floating Sub-Submenu */}
                                                <AnimatePresence>
                                                    {activeCategory && (
                                                        <motion.div
                                                            initial={{ opacity: 0, x: -6 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            exit={{ opacity: 0, x: -6 }}
                                                            transition={{ duration: 0.15 }}
                                                            className="absolute left-full bg-[#111111] border border-white/10 shadow-2xl py-2 overflow-y-auto [&::-webkit-scrollbar]:hidden"
                                                            style={{
                                                                top: `${subMenuTop}px`,
                                                                width: `${maxSubMenuWidth}px`,
                                                                maxHeight: 'calc(100vh - 140px)'
                                                            }}
                                                            onMouseEnter={() => setActiveCategory(activeCategory)}
                                                            onMouseLeave={() => setActiveCategory(null)}
                                                        >
                                                            {(() => {
                                                                const category = link.level2?.find((c: any) => c.title === activeCategory);
                                                                if (!category) return null;

                                                                return category.items.map((item: any) => {
                                                                    const isObject = typeof item === 'object';
                                                                    const label = isObject ? item.title : item;
                                                                    let href = '';
                                                                    if (link.href === '/internship') {
                                                                        href = isObject && item.slug ? `/internship/${item.slug}` : `/internship/${generateSlug(label)}`;
                                                                    } else if (link.name === 'Solutions') {
                                                                        href = (category as any).href || `/solutions/${(category as any).slug || generateSlug(category.title)}`;
                                                                    } else if (link.name === 'Products') {
                                                                        href = `/products/${generateSlug(label)}`;
                                                                    } else {
                                                                        href = `/${generateSlug(label)}`;
                                                                    }

                                                                    return (
                                                                        <Link
                                                                            key={label}
                                                                            href={href}
                                                                            prefetch={true}
                                                                            className="block px-5 py-2.5 text-[10px] font-medium uppercase tracking-wider text-zinc-400 hover:text-yellow-500 hover:bg-white/5 transition-colors border-b border-white/[0.03] last:border-none"
                                                                        >
                                                                            {label}
                                                                        </Link>
                                                                    );
                                                                });
                                                            })()}
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}

                        <div className="ml-auto flex items-center gap-2 2xl:gap-4 shrink-0 pl-2">
                            <Link
                                href="/contact"
                                className={`relative px-1.5 2xl:px-3 py-1 text-[10px] 2xl:text-[11px] font-bold uppercase tracking-[0.05em] 2xl:tracking-[0.12em] flex items-center transition-colors duration-300 whitespace-nowrap ${pathname === '/contact' ? 'text-black' : 'text-zinc-500 hover:text-white'}`}
                            >
                                <span className="relative z-10">Contact</span>
                                <span className={`absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[34px] bg-yellow-500 origin-center transition-transform duration-300 ease-out -z-0 ${pathname === '/contact' ? 'scale-y-100' : 'scale-y-0'}`}></span>
                            </Link>

                            <Link href="/start-project" prefetch={true} className="shrink-0 group">
                                <div className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white rounded px-2.5 2xl:px-4 h-8 2xl:h-9 text-[9px] 2xl:text-[10.5px] font-bold uppercase tracking-[0.06em] 2xl:tracking-[0.1em] shadow-[0_2px_10px_rgba(220,38,38,0.35)] hover:shadow-[0_4px_16px_rgba(220,38,38,0.5)] transition-all duration-200 flex items-center gap-1.5 2xl:gap-2 whitespace-nowrap active:scale-95 cursor-pointer">
                                    <span>Launch Your Software</span>
                                    <Rocket size={13} className="text-yellow-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="xl:hidden relative z-50 p-2 text-white"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </nav>

            <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
        </>
    )
}
