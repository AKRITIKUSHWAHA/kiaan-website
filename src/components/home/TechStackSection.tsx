"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal } from '@/components/Reveal';
import { Cpu, Code2, Cloud, Database, Sparkles, Layers, Terminal, Server, ShieldCheck, Zap } from 'lucide-react';

interface TechItem {
  name: string;
  category: 'frontend' | 'backend' | 'cloud' | 'ai';
  tag: string;
  icon: React.ElementType;
  glowColor: string;
  borderColor: string;
  textColor: string;
  badgeBg: string;
}

const techStack: TechItem[] = [
  {
    name: "React.js",
    category: "frontend",
    tag: "High Speed UI",
    icon: Code2,
    glowColor: "rgba(6, 182, 212, 0.25)",
    borderColor: "hover:border-cyan-500/60",
    textColor: "group-hover:text-cyan-400",
    badgeBg: "bg-cyan-950/60 text-cyan-400 border-cyan-800/50"
  },
  {
    name: "Next.js 15",
    category: "frontend",
    tag: "Fullstack SSG/SSR",
    icon: Layers,
    glowColor: "rgba(255, 255, 255, 0.25)",
    borderColor: "hover:border-white/60",
    textColor: "group-hover:text-white",
    badgeBg: "bg-zinc-900 text-zinc-300 border-zinc-700"
  },
  {
    name: "TypeScript",
    category: "frontend",
    tag: "Type Safe Code",
    icon: Terminal,
    glowColor: "rgba(59, 130, 246, 0.25)",
    borderColor: "hover:border-blue-500/60",
    textColor: "group-hover:text-blue-400",
    badgeBg: "bg-blue-950/60 text-blue-400 border-blue-800/50"
  },
  {
    name: "Tailwind CSS",
    category: "frontend",
    tag: "Responsive UI",
    icon: Zap,
    glowColor: "rgba(56, 189, 248, 0.25)",
    borderColor: "hover:border-sky-400/60",
    textColor: "group-hover:text-sky-300",
    badgeBg: "bg-sky-950/60 text-sky-400 border-sky-800/50"
  },
  {
    name: "Node.js",
    category: "backend",
    tag: "Async I/O Engine",
    icon: Server,
    glowColor: "rgba(34, 197, 94, 0.25)",
    borderColor: "hover:border-green-500/60",
    textColor: "group-hover:text-green-400",
    badgeBg: "bg-green-950/60 text-green-400 border-green-800/50"
  },
  {
    name: "Python",
    category: "ai",
    tag: "AI & ML Processing",
    icon: Cpu,
    glowColor: "rgba(234, 179, 8, 0.25)",
    borderColor: "hover:border-yellow-500/60",
    textColor: "group-hover:text-yellow-400",
    badgeBg: "bg-yellow-950/60 text-yellow-400 border-yellow-800/50"
  },
  {
    name: "PostgreSQL",
    category: "backend",
    tag: "ACID Compliant DB",
    icon: Database,
    glowColor: "rgba(99, 102, 241, 0.25)",
    borderColor: "hover:border-indigo-500/60",
    textColor: "group-hover:text-indigo-400",
    badgeBg: "bg-indigo-950/60 text-indigo-400 border-indigo-800/50"
  },
  {
    name: "AWS Cloud",
    category: "cloud",
    tag: "Global Serverless",
    icon: Cloud,
    glowColor: "rgba(249, 115, 22, 0.25)",
    borderColor: "hover:border-orange-500/60",
    textColor: "group-hover:text-orange-400",
    badgeBg: "bg-orange-950/60 text-orange-400 border-orange-800/50"
  },
  {
    name: "Docker & K8s",
    category: "cloud",
    tag: "Container Scale",
    icon: ShieldCheck,
    glowColor: "rgba(14, 165, 233, 0.25)",
    borderColor: "hover:border-sky-500/60",
    textColor: "group-hover:text-sky-400",
    badgeBg: "bg-sky-950/60 text-sky-400 border-sky-800/50"
  },
  {
    name: "Enterprise AI",
    category: "ai",
    tag: "LLM & Automation",
    icon: Sparkles,
    glowColor: "rgba(236, 72, 153, 0.25)",
    borderColor: "hover:border-pink-500/60",
    textColor: "group-hover:text-pink-400",
    badgeBg: "bg-pink-950/60 text-pink-400 border-pink-800/50"
  },
  {
    name: "Google Cloud",
    category: "cloud",
    tag: "Big Data & Vision",
    icon: Cloud,
    glowColor: "rgba(239, 68, 68, 0.25)",
    borderColor: "hover:border-red-500/60",
    textColor: "group-hover:text-red-400",
    badgeBg: "bg-red-950/60 text-red-400 border-red-800/50"
  },
  {
    name: "MERN Stack",
    category: "backend",
    tag: "Full-Stack Ecosystem",
    icon: Layers,
    glowColor: "rgba(168, 85, 247, 0.25)",
    borderColor: "hover:border-purple-500/60",
    textColor: "group-hover:text-purple-400",
    badgeBg: "bg-purple-950/60 text-purple-400 border-purple-800/50"
  }
];

export const TechStackSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'frontend' | 'backend' | 'cloud' | 'ai'>('all');

  const categories = [
    { id: 'all', label: 'All Tech' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend & DB' },
    { id: 'cloud', label: 'Cloud & DevOps' },
    { id: 'ai', label: 'AI & Automation' },
  ];

  const filteredTech = activeCategory === 'all'
    ? techStack
    : techStack.filter(t => t.category === activeCategory);

  return (
    <section className="py-20 bg-zinc-950 relative overflow-hidden border-t border-zinc-900">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-500/5 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-500/10 border border-yellow-500/30 text-[10px] font-black uppercase tracking-[0.2em] text-yellow-500 mb-4 rounded-full">
              <Cpu size={12} /> Modern Tech Ecosystem
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-4xl md:text-5xl font-display uppercase text-white mb-4">
              Our <span className="text-yellow-500">Technology Stack</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-zinc-400 max-w-2xl mx-auto text-sm md:text-base font-light leading-relaxed">
              We engineer mission-critical systems using battle-tested frameworks, high-throughput databases, and cloud-native infrastructure.
            </p>
          </Reveal>

          {/* Filter Pills */}
          <Reveal delay={0.3}>
            <div className="flex flex-wrap justify-center items-center gap-2 mt-8">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id as any)}
                  className={`px-4 py-2 text-xs font-black uppercase tracking-wider rounded-lg transition-all duration-300 border ${
                    activeCategory === cat.id
                      ? 'bg-yellow-500 text-black border-yellow-400 shadow-[0_0_20px_rgba(234,179,8,0.35)] scale-105'
                      : 'bg-zinc-900/80 text-zinc-400 border-zinc-800 hover:text-white hover:border-yellow-500/40'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Tech Grid */}
        <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          <AnimatePresence mode="popLayout">
            {filteredTech.map((tech) => {
              const IconComponent = tech.icon;
              return (
                <motion.div
                  key={tech.name}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className={`group relative p-6 bg-black border border-zinc-800/80 rounded-xl transition-all duration-500 ${tech.borderColor} hover:-translate-y-1.5 cursor-pointer overflow-hidden`}
                  style={{
                    boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
                  }}
                >
                  {/* Subtle Top Accent */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent group-hover:via-yellow-500 transition-all duration-500" />

                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-zinc-900/90 border border-zinc-800 rounded-lg group-hover:bg-zinc-950 transition-colors">
                      <IconComponent className={`w-6 h-6 text-zinc-400 ${tech.textColor} transition-colors duration-300`} />
                    </div>
                    <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded border ${tech.badgeBg}`}>
                      {tech.tag}
                    </span>
                  </div>

                  <h3 className={`text-lg font-display uppercase text-white ${tech.textColor} transition-colors duration-300`}>
                    {tech.name}
                  </h3>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default TechStackSection;
