"use client";

import React from 'react';
import { Camera } from 'lucide-react';
import { Reveal } from '@/components/Reveal';

interface ProjectScreenshotsProps {
  screenshots?: string[];
  title: string;
}

export const ProjectScreenshots: React.FC<ProjectScreenshotsProps> = ({ screenshots, title }) => {
  if (!screenshots || screenshots.length === 0) return null;

  return (
    <section className="space-y-8" aria-label="Project Screenshots">
      <div className="flex items-center gap-3 border-b border-zinc-900 pb-4">
        <h2 className="text-2xl md:text-3xl font-display uppercase tracking-tight flex items-center gap-4">
          <Camera className="text-yellow-500" size={24} /> Project Interface
        </h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {screenshots.map((url, index) => (
          <Reveal key={index} delay={index * 0.1}>
            <div className="group relative aspect-video overflow-hidden border border-zinc-800 bg-zinc-950 p-2 hover:border-yellow-500/20 transition-all duration-500">
              <div className="w-full h-full overflow-hidden relative">
                <img
                  src={url}
                  alt={`${title} screenshot preview ${index + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-[9px] font-black uppercase tracking-widest text-yellow-500">
                    Interface View {index + 1}
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};
