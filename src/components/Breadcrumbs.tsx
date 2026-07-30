"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import React from "react";

export function Breadcrumbs() {
    const pathname = usePathname();

    // Do not show on home page
    if (!pathname || pathname === "/") {
        return null;
    }

    const pathSegments = pathname.split("/").filter((segment) => segment !== "");

    return (
        <div className="absolute top-[70px] left-0 w-full z-40 bg-black/50 backdrop-blur-md border-b border-white/5">
            <div className="container mx-auto px-6 py-2.5 flex items-center overflow-x-auto whitespace-nowrap no-scrollbar">
                <nav className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                    <Link
                        href="/"
                        className="hover:text-yellow-500 transition-colors flex items-center"
                    >
                        <Home size={12} className="mr-1 mb-[2px]" />
                        HOME
                    </Link>

                    {pathSegments.map((segment, index) => {
                        const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
                        const isLast = index === pathSegments.length - 1;
                        
                        const formattedSegment = segment.replace(/-/g, " ");

                        return (
                            <React.Fragment key={href}>
                                <ChevronRight size={10} className="text-zinc-600 flex-shrink-0" />
                                {isLast ? (
                                    <span className="text-yellow-500">{formattedSegment}</span>
                                ) : (
                                    <Link href={href} className="hover:text-white transition-colors">
                                        {formattedSegment}
                                    </Link>
                                )}
                            </React.Fragment>
                        );
                    })}
                </nav>
            </div>
        </div>
    );
}
