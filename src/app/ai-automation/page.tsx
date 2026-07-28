"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bot, Cog, Workflow, MessageSquare, BarChart, 
  Hotel, Stethoscope, Factory, GraduationCap, ShoppingCart, Truck, Building,
  ArrowRight, CheckCircle2, Phone, Zap, ArrowUpRight
} from "lucide-react";

const services = [
  { icon: Bot, title: "AI Agent Development", desc: "Custom intelligent agents for your specific needs." },
  { icon: Cog, title: "Custom ERP / PMS", desc: "End-to-end management systems built from scratch." },
  { icon: Workflow, title: "Workflow Automation", desc: "Connect apps and automate repetitive manual tasks." },
  { icon: MessageSquare, title: "CRM + WhatsApp", desc: "Automated communication and lead management." },
  { icon: BarChart, title: "Data Dashboards", desc: "Real-time reporting and business intelligence." },
];

const industries = [
  {
    id: "hospitality",
    name: "Hospitality",
    icon: Hotel,
    problems: ["Manual bookings", "Front desk overload", "Revenue leakage"],
    automation: ["AI booking assistant", "PMS system", "Auto check-in/out", "Smart pricing"],
    result: "Less staff work, more bookings, better guest experience.",
  },
  {
    id: "healthcare",
    name: "Healthcare",
    icon: Stethoscope,
    problems: ["Paper records", "Appointment chaos", "Billing issues"],
    automation: ["EMR / EHR system", "AI appointment scheduling", "Digital prescriptions", "Billing automation"],
    result: "Faster operations, organized patient data.",
  },
  {
    id: "manufacturing",
    name: "Manufacturing",
    icon: Factory,
    problems: ["Production delays", "Inventory mismanagement", "Quality issues"],
    automation: ["Production tracking", "Inventory automation", "QC monitoring", "Machine maintenance alerts"],
    result: "Higher efficiency, reduced waste.",
  },
  {
    id: "education",
    name: "Education",
    icon: GraduationCap,
    problems: ["Manual attendance", "Fee tracking issues", "Poor communication"],
    automation: ["School ERP", "Online exams", "Fee automation", "Parent communication system"],
    result: "Better management, time savings.",
  },
  {
    id: "retail",
    name: "Retail & E-commerce",
    icon: ShoppingCart,
    problems: ["Order chaos", "Inventory mismatch", "Customer follow-ups"],
    automation: ["Order management", "Inventory sync", "AI customer support", "CRM automation"],
    result: "Faster operations, higher sales.",
  },
  {
    id: "logistics",
    name: "Logistics",
    icon: Truck,
    problems: ["Delivery delays", "Tracking issues", "Manual coordination"],
    automation: ["Fleet tracking", "Route optimization", "Delivery status automation"],
    result: "Faster delivery, lower costs.",
  },
  {
    id: "realestate",
    name: "Real Estate",
    icon: Building,
    problems: ["Rent tracking", "Tenant communication", "Document management"],
    automation: ["Property management", "Rent automation", "Tenant portal", "Document storage"],
    result: "Better control, reduced manual work.",
  }
];

export default function AIAutomationPage() {
  const [activeTab, setActiveTab] = useState(industries[0].id);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-yellow-500/30 font-sans overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-yellow-900/10 via-black to-black"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-none border border-yellow-500/30 text-yellow-500 font-bold uppercase tracking-wider text-xs mb-8 bg-yellow-500/5 shadow-[2px_2px_0_rgba(234,179,8,0.2)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
            </span>
            AI Agent Creation + Business Automation
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-display uppercase tracking-tighter mb-8"
          >
            Automate Your Business with <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
              AI Agents & Smart Software
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto mb-10 leading-relaxed font-light border-l-2 border-red-600 pl-4"
          >
            We build AI-powered systems that handle operations, reduce manual work, and increase revenue. Stop doing repetitive tasks manually.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button className="w-full sm:w-auto px-8 py-4 bg-yellow-500 hover:bg-yellow-400 text-black rounded-none font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 group shadow-[4px_4px_0_rgba(255,255,255,0.1)]">
              Get Demo
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-white/5 text-white border border-zinc-700 rounded-none font-bold uppercase tracking-wider transition-all shadow-[4px_4px_0_rgba(239,68,68,0.5)]">
              Book Consultation
            </button>
          </motion.div>
        </div>
      </section>

      {/* Value Statement */}
      <section className="py-12 border-y border-zinc-900 bg-zinc-950/50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-xl md:text-3xl font-display uppercase text-zinc-400">
            We don't just build software — <br className="md:hidden" />
            <span className="text-yellow-500 font-bold block mt-2">We automate your entire business workflow using AI.</span>
          </h2>
        </div>
      </section>

      {/* Core Services */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display uppercase mb-4">
            Core <span className="text-red-500">Services</span>
          </h2>
          <p className="text-zinc-500 text-sm md:text-base tracking-widest uppercase">Everything you need to run your operations on autopilot.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 bg-zinc-950 border border-zinc-900 hover:border-yellow-500/50 transition-all group hover:-translate-y-1 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="w-12 h-12 border border-zinc-800 bg-black flex items-center justify-center mb-6 text-yellow-500 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                <service.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-display uppercase mb-3 text-white group-hover:text-yellow-500 transition-colors">{service.title}</h3>
              <p className="text-zinc-400 font-light">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Industries & Automation Examples */}
      <section className="py-24 bg-zinc-950 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display uppercase mb-4">
              Industries We <span className="text-yellow-500">Automate</span>
            </h2>
            <p className="text-zinc-500 text-sm md:text-base tracking-widest uppercase">Real-world examples of how we transform businesses.</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Tabs */}
            <div className="w-full lg:w-1/3 flex flex-col gap-2">
              {industries.map((ind) => (
                <button
                  key={ind.id}
                  onClick={() => setActiveTab(ind.id)}
                  className={`flex items-center gap-4 p-4 text-left transition-all border-l-4 ${
                    activeTab === ind.id 
                      ? "bg-yellow-500/10 border-yellow-500 text-yellow-500" 
                      : "bg-black border-zinc-900 text-zinc-500 hover:bg-zinc-900 hover:text-white"
                  }`}
                >
                  <ind.icon className={`w-5 h-5 ${activeTab === ind.id ? "text-yellow-500" : "text-zinc-600"}`} />
                  <span className="font-bold uppercase tracking-wider text-sm">{ind.name}</span>
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="w-full lg:w-2/3">
              <AnimatePresence mode="wait">
                {industries.map((ind) => ind.id === activeTab && (
                  <motion.div
                    key={ind.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-black border border-zinc-800 p-8 md:p-12 h-full flex flex-col justify-center relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 opacity-[0.03] pointer-events-none text-yellow-500">
                      <ind.icon className="w-64 h-64 -mt-10 -mr-10" />
                    </div>

                    <div className="flex items-center gap-4 mb-8 pb-8 border-b border-zinc-800/50 relative z-10">
                      <div className="p-4 bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">
                        <ind.icon className="w-8 h-8" />
                      </div>
                      <h3 className="text-3xl font-display uppercase">{ind.name} <span className="text-yellow-500">Automation</span></h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-10 relative z-10">
                      <div>
                        <h4 className="text-red-500 font-bold uppercase tracking-wider text-sm flex items-center gap-2 mb-6">
                          <Zap className="w-4 h-4" /> The Problem
                        </h4>
                        <ul className="space-y-4">
                          {ind.problems.map((prob, i) => (
                            <li key={i} className="flex items-start gap-3 text-zinc-400 font-light">
                              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-600 shrink-0 shadow-[0_0_8px_#dc2626]"></span>
                              {prob}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-yellow-500 font-bold uppercase tracking-wider text-sm flex items-center gap-2 mb-6">
                          <Cog className="w-4 h-4" /> Our Automation
                        </h4>
                        <ul className="space-y-4">
                          {ind.automation.map((auto, i) => (
                            <li key={i} className="flex items-start gap-3 text-zinc-300 font-medium">
                              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-yellow-500 shrink-0 shadow-[0_0_8px_#eab308]"></span>
                              {auto}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-auto bg-yellow-500/5 p-6 border border-yellow-500/20 relative z-10">
                      <h4 className="text-yellow-500 font-bold uppercase tracking-widest text-xs mb-2">👉 The Result</h4>
                      <p className="text-white text-lg font-medium">{ind.result}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* AI Agents Use Cases */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display uppercase mb-4">
            Powerful <span className="text-red-500">AI Agents</span>
          </h2>
          <p className="text-zinc-500 text-sm md:text-base tracking-widest uppercase">Smart systems working 24/7 for your business.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: MessageSquare, title: "AI Chat Agents", items: ["Handle customer queries", "Book appointments", "Generate leads"] },
            { icon: Phone, title: "Voice AI Agents", items: ["Call customers", "Confirm bookings", "Follow-up automatically"] },
            { icon: Workflow, title: "Workflow Agents", items: ["Auto send invoices", "Trigger notifications", "Sync data across systems"] }
          ].map((agent, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="bg-zinc-950 border border-zinc-900 p-8 group hover:border-red-600/50 transition-colors"
            >
              <agent.icon className="w-10 h-10 text-red-500 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-display uppercase mb-6 group-hover:text-red-500 transition-colors">{agent.title}</h3>
              <ul className="space-y-4">
                {agent.items.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-zinc-400 font-light">
                    <CheckCircle2 className="w-5 h-5 text-red-600/70" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden bg-black border-t border-zinc-900">
        <div className="absolute inset-0 bg-yellow-500/5"></div>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#eab308 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-display uppercase text-white mb-8 leading-tight">
            Get Your Business <br/>
            <span className="text-yellow-500">Automated in 7 Days</span>
          </h2>
          <p className="text-zinc-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto font-light">
            Ready to scale without the operational headache? Let's build a smart system tailored exactly to your needs.
          </p>
          <button className="px-10 py-5 bg-yellow-500 text-black hover:bg-yellow-400 font-bold uppercase tracking-wider text-lg transition-all flex items-center justify-center gap-3 mx-auto group shadow-[6px_6px_0_rgba(255,255,255,0.1)]">
            Request Demo
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </section>
    </div>
  );
}
