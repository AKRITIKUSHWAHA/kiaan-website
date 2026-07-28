"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown, Rocket } from 'lucide-react';
import { Button } from './Button';
import { navLinks, generateSlug } from '@/data/navigation';

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
    const pathname = usePathname();
    const [openMenu, setOpenMenu] = useState<string | null>(null);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, x: '100%' }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: '100%' }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    className="fixed inset-0 z-[49] bg-black pt-24 px-6 overflow-y-auto"
                >
                    <div className="flex flex-col gap-2">
                        {navLinks.map((link) => (
                            <div key={link.name} className="border-b border-white/5">
                                <Link
                                    href={link.href}
                                    className="flex items-center justify-between py-5 cursor-pointer group"
                                    onClick={(e) => {
                                        if ((link.level2 || link.subItems) && openMenu !== link.name) {
                                            e.preventDefault();
                                            setOpenMenu(link.name);
                                        } else {
                                            onClose();
                                        }
                                    }}
                                >
                                    <span className={`text-2xl font-display uppercase tracking-wider transition-colors ${pathname === link.href || openMenu === link.name
                                            ? 'text-yellow-500'
                                            : 'text-white'
                                        }`}>
                                        {link.name}
                                    </span>
                                    {(link.level2 || link.subItems) && (
                                        <ChevronDown
                                            className={`transition-transform duration-300 ${openMenu === link.name ? 'rotate-180 text-yellow-500' : 'text-zinc-600'}`}
                                            size={24}
                                        />
                                    )}
                                </Link>

                                <AnimatePresence>
                                    {openMenu === link.name && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden bg-white/5 mb-4"
                                        >
                                            {link.level2 ? (
                                                link.level2.map((cat: any) => (
                                                    link.name === 'Solutions' ? (
                                                        <Link
                                                            key={cat.title}
                                                            href={`/solutions/${cat.slug || generateSlug(cat.title)}`}
                                                            className="block p-4 text-[11px] text-zinc-400 uppercase tracking-widest border-b border-white/5 last:border-none hover:text-white"
                                                            onClick={onClose}
                                                        >
                                                            {cat.title}
                                                        </Link>
                                                    ) : (
                                                        <div key={cat.title} className="p-4 border-b border-white/5 last:border-none">
                                                            <h4 className="text-yellow-500 text-xs font-bold uppercase tracking-widest mb-3">{cat.title}</h4>
                                                            <div className="flex flex-col gap-3">
                                                                {cat.items.map((item: any) => {
                                                                    const isIntern = link.href === '/internship';
                                                                    let href = '';
                                                                    let label = '';

                                                                    if (isIntern) {
                                                                        href = `/internship/${item.slug}`;
                                                                        label = item.title;
                                                                    } else if (link.name === 'Solutions') {
                                                                        href = `/solutions/${cat.slug || generateSlug(cat.title)}`;
                                                                        label = item;
                                                                    } else {
                                                                        href = `/products/${generateSlug(item)}`;
                                                                        label = item;
                                                                    }

                                                                    return (
                                                                        <Link
                                                                            key={label}
                                                                            href={href}
                                                                            className="text-[11px] text-zinc-400 uppercase tracking-wider hover:text-white"
                                                                            onClick={onClose}
                                                                        >
                                                                            {label}
                                                                        </Link>
                                                                    );
                                                                })}
                                                            </div>
                                                        </div>
                                                    )
                                                ))
                                            ) : link.subItems ? (
                                                <div className="flex flex-col">
                                                    {link.subItems.map((item: any) => (
                                                        <Link
                                                            key={item.name}
                                                            href={item.href}
                                                            className="block p-4 text-[11px] text-zinc-400 uppercase tracking-widest border-b border-white/5 last:border-none hover:text-white"
                                                            onClick={onClose}
                                                        >
                                                            {item.name}
                                                        </Link>
                                                    ))}
                                                </div>
                                            ) : null}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 mb-20 px-4">
                        <Link href="/start-project" onClick={onClose}>
                            <Button className="w-full bg-red-600 text-white rounded-none py-6 text-xl font-bold uppercase tracking-[0.2em] skew-x-[-10deg]">
                                <span className="skew-x-[10deg]">Launch Your Software</span>
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
