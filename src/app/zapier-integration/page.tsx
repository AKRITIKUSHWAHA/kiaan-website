"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    RefreshCw, CheckCircle, XCircle, Settings, 
    Terminal, Link2, Copy, Power, Key, ToggleLeft, 
    ToggleRight, Play, AlertCircle, Cpu, FileJson, Check
} from 'lucide-react';
import { GlassCard } from '@/components/GlassCard';
import { Button } from '@/components/Button';
import { Reveal } from '@/components/Reveal';
import React from 'react';

interface ZapierState {
    isActive: boolean;
    devToken: string;
    catchHookUrl: string;
    totalTasksRun: number;
    enabledActions: string[];
}

const DEFAULT_STATE: ZapierState = {
    isActive: true,
    devToken: 'zk_live_9752100980_automation',
    catchHookUrl: 'https://hooks.zapier.com/hooks/catch/1982054/a127b8f/',
    totalTasksRun: 142,
    enabledActions: ['slack_notify', 'gsheet_row']
};

export default function ZapierIntegration() {
    const [state, setState] = useState<ZapierState>(DEFAULT_STATE);
    const [isLoading, setIsLoading] = useState(true);

    // Form inputs
    const [devTokenInput, setDevTokenInput] = useState('');
    const [catchHookInput, setCatchHookInput] = useState('');
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    const [saveSuccess, setSaveSuccess] = useState(false);

    // Simulator states
    const [simulatingType, setSimulatingType] = useState<'lead' | 'invoice' | 'internship' | null>(null);
    const [simProgress, setSimProgress] = useState(0);

    // Terminal console logs
    const [logs, setLogs] = useState<string[]>([]);
    const consoleEndRef = useRef<HTMLDivElement>(null);

    // Load initial state
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const data = localStorage.getItem('kiaan_zapier_integration_state');
            if (data) {
                try {
                    const parsed = JSON.parse(data);
                    setState(parsed);
                    setDevTokenInput(parsed.devToken);
                    setCatchHookInput(parsed.catchHookUrl);
                } catch (e) {
                    setState(DEFAULT_STATE);
                }
            } else {
                localStorage.setItem('kiaan_zapier_integration_state', JSON.stringify(DEFAULT_STATE));
                setDevTokenInput(DEFAULT_STATE.devToken);
                setCatchHookInput(DEFAULT_STATE.catchHookUrl);
            }
            setIsLoading(false);
            
            // Console logger initialization
            addLog('SYSTEM: Zapier integration pipeline online.');
            addLog('SYSTEM: Read configurations from localStorage.');
            if (!data || JSON.parse(data).isActive) {
                addLog('ZAPIER: Outbound workflow trigger hooks activated. Status: Running.');
            } else {
                addLog('ZAPIER: Webhook triggers paused by administrator. Status: Suspended.');
            }
        }
    }, []);

    // Scroll CLI terminal
    useEffect(() => {
        consoleEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [logs]);

    const addLog = (message: string) => {
        const timestamp = new Date().toISOString().split('T')[1].slice(0, 8);
        setLogs(prev => [...prev, `[${timestamp}] ${message}`]);
    };

    const clearLogs = () => {
        setLogs([`[${new Date().toISOString().split('T')[1].slice(0, 8)}] SYSTEM: Logs cleared.`]);
    };

    const saveStateToStorage = (updatedState: ZapierState) => {
        setState(updatedState);
        if (typeof window !== 'undefined') {
            localStorage.setItem('kiaan_zapier_integration_state', JSON.stringify(updatedState));
        }
    };

    // Toggle active status
    const toggleActiveState = () => {
        const nextActive = !state.isActive;
        saveStateToStorage({ ...state, isActive: nextActive });
        if (nextActive) {
            addLog('SYSTEM: Webhook workflow triggers enabled. Zapier listener active.');
        } else {
            addLog('SYSTEM: Webhook workflows disabled. Outbound REST streams suspended.');
        }
    };

    // Save configurations
    const handleSaveSettings = (e: React.FormEvent) => {
        e.preventDefault();
        setFormErrors({});
        setSaveSuccess(false);

        const errors: Record<string, string> = {};
        if (!devTokenInput.trim() || (!devTokenInput.startsWith('zk_') && !devTokenInput.startsWith('zap_'))) {
            errors.devToken = 'Developer token must start with prefix "zk_" or "zap_" (e.g. zk_live_xxx).';
        }
        if (!catchHookInput.trim() || !/^https:\/\/hooks\.zapier\.com\/hooks\/catch\/\d+\/[a-zA-Z0-9_-]+\/?$/.test(catchHookInput.trim())) {
            errors.catchHookUrl = 'Must be a valid Zapier catch hook URL: https://hooks.zapier.com/hooks/catch/[user]/[hook]/';
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            addLog('ERROR: Configuration change rejected due to invalid values.');
            return;
        }

        const updated = {
            ...state,
            devToken: devTokenInput.trim(),
            catchHookUrl: catchHookInput.trim()
        };

        saveStateToStorage(updated);
        setSaveSuccess(true);
        addLog('SYSTEM: API keys and catch hook endpoints updated.');
        
        setTimeout(() => setSaveSuccess(false), 3000);
    };

    // Simulate Trigger Events
    const handleSimulateTrigger = (type: 'lead' | 'invoice' | 'internship') => {
        if (!state.isActive) {
            alert('Please enable Zapier workflow integrations before executing simulated payloads.');
            addLog('ERROR: Simulation failed - Webhook workflow pipeline is suspended.');
            return;
        }
        if (!state.catchHookUrl) {
            alert('Please configure a valid Zapier Catch Hook URL first.');
            addLog('ERROR: Simulation failed - Missing webhook catch endpoint.');
            return;
        }

        setSimulatingType(type);
        setSimProgress(0);
        addLog(`DISPATCH: Bundling JSON payload for outbound event trigger: ${type.toUpperCase()}_CREATED...`);

        // Load simulator checkpoints
        const interval = setInterval(() => {
            setSimProgress(prev => {
                const next = prev + 25;
                if (next >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        // Generate mock payloads
                        let payload = {};
                        if (type === 'lead') {
                            payload = {
                                event: 'lead.created',
                                timestamp: new Date().toISOString(),
                                data: {
                                    id: 'lead_kiaan_' + Math.floor(Math.random() * 90000 + 10000),
                                    name: 'Thomas Anderson',
                                    email: 'neo@metacortex.com',
                                    company: 'Meta Cortex Software',
                                    budget: '$15,000 - $25,000',
                                    vision: 'Enterprise workflow automation and portal systems.'
                                }
                            };
                        } else if (type === 'invoice') {
                            payload = {
                                event: 'invoice.paid',
                                timestamp: new Date().toISOString(),
                                data: {
                                    id: 'inv_kiaan_' + Math.floor(Math.random() * 90000 + 10000),
                                    clientName: 'Trinity Labs',
                                    amount: '₹3,45,000.00',
                                    invoiceCode: 'KIAN-2026-0921',
                                    project: 'AI-based Lead Automation'
                                }
                            };
                        } else {
                            payload = {
                                event: 'internship.applied',
                                timestamp: new Date().toISOString(),
                                data: {
                                    id: 'app_student_' + Math.floor(Math.random() * 90000 + 10000),
                                    studentName: 'Morpheus Johnson',
                                    course: 'Full-Stack MERN Development',
                                    email: 'morpheus@nebulabs.org',
                                    education: 'B.Tech Computer Science'
                                }
                            };
                        }

                        // Print outbound REST calls in logs
                        addLog(`REST: HTTP POST requesting ${state.catchHookUrl}...`);
                        addLog(`HEADERS: {"Content-Type": "application/json", "Authorization": "Bearer ${state.devToken.substr(0, 10)}•••"}`);
                        addLog(`PAYLOAD: ${JSON.stringify(payload)}`);
                        
                        setTimeout(() => {
                            const nextCount = state.totalTasksRun + 1;
                            const updated = {
                                ...state,
                                totalTasksRun: nextCount
                            };
                            saveStateToStorage(updated);
                            setSimulatingType(null);
                            addLog(`SUCCESS: Zapier Catch Hook accepted webhook stream. Status: 200 OK.`);
                            addLog(`ZAPIER RESPONSE: {"status": "success", "id": "zap_run_${Math.floor(Math.random() * 900000 + 100000)}", "attempt": 1}`);
                        }, 500);

                    }, 200);
                    return 100;
                }
                
                if (next === 25) addLog(`DISPATCH: Setting header authorizations...`);
                if (next === 50) addLog(`DISPATCH: Mapping client schema structures into Zapier Catch Hook inputs...`);
                if (next === 75) addLog(`DISPATCH: Discharging webhook payload to hooks.zapier.com...`);

                return next;
            });
        }, 200);
    };

    // Toggle Action subscriptions
    const toggleActionEnabled = (action: string) => {
        let actions = [...state.enabledActions];
        if (actions.includes(action)) {
            actions = actions.filter(a => a !== action);
            addLog(`ZAPIER: Deactivated outbound action mapping: ${action}`);
        } else {
            actions.push(action);
            addLog(`ZAPIER: Activated outbound action mapping: ${action}`);
        }
        saveStateToStorage({ ...state, enabledActions: actions });
    };

    return (
        <main className="min-h-screen bg-black text-white relative pt-24 pb-12 font-sans overflow-x-hidden">
            {/* Ambient glows */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-yellow-500/10 rounded-full blur-[120px] pointer-events-none z-0" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none z-0" />

            <div className="container mx-auto px-6 relative z-10 max-w-5xl">
                {/* --- HEADER --- */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 border-b border-white/5 pb-8">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-display uppercase tracking-tight text-white mb-2">
                            Zapier <span className="text-yellow-500">Automation</span>
                        </h1>
                        <p className="text-zinc-400 text-sm md:text-base max-w-2xl font-mono">
                            Configure Zapier catch hooks, authentication keys, and simulate outbound webhook events.
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3">
                            <span className={`px-3.5 py-1.5 border text-xs font-bold rounded-full flex items-center gap-1.5 font-mono ${
                                state.isActive 
                                    ? 'bg-green-500/10 border-green-500/30 text-green-400' 
                                    : 'bg-zinc-900 border-zinc-800 text-zinc-500'
                            }`}>
                                <Cpu size={12} /> {state.isActive ? 'ACTIVE' : 'SUSPENDED'}
                            </span>
                            
                            <button 
                                onClick={toggleActiveState}
                                className={`px-4 py-2 border rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                                    state.isActive 
                                        ? 'border-zinc-800 hover:border-red-500 text-zinc-400 hover:text-white' 
                                        : 'bg-yellow-500 hover:bg-yellow-400 text-black border-transparent'
                                }`}
                            >
                                <Power size={12} /> {state.isActive ? 'Pause Pipeline' : 'Resume Pipeline'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* --- STATISTICS PANELS --- */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 text-left">
                    {[
                        { label: 'Zapier Integration', val: state.isActive ? 'Connected' : 'Offline', desc: 'Outbound REST streams status' },
                        { label: 'Automations Executed', val: `${state.totalTasksRun} Tasks`, desc: 'Total successful webhook catches' },
                        { label: 'Event Channels', val: '3 Channels', desc: 'Lead, Invoice, and Internship logs' }
                    ].map((stat, i) => (
                        <GlassCard key={i} className="p-5 border border-white/10 rounded-2xl">
                            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">{stat.label}</span>
                            <h3 className="text-2xl font-display font-black text-white uppercase mb-1">{stat.val}</h3>
                            <span className="text-xs text-zinc-400 font-sans block">{stat.desc}</span>
                        </GlassCard>
                    ))}
                </div>

                {/* --- MAIN GRID SECTION --- */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                    {/* LEFT COLUMN: ZAPIER APP CREDENTIALS */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="text-left">
                            <h3 className="text-lg font-bold font-mono text-white uppercase tracking-wider mb-1 flex items-center gap-2">
                                <Settings size={18} className="text-yellow-500" /> Authentication Keys
                            </h3>
                            <p className="text-xs text-zinc-500 font-mono">Input developer authorization secrets for workflow validations.</p>
                        </div>

                        {saveSuccess && (
                            <div className="p-3 bg-green-500/10 border border-green-500/20 text-green-400 text-xs rounded-xl font-mono flex items-center gap-2">
                                <CheckCircle size={14} /> Automation settings updated!
                            </div>
                        )}

                        <GlassCard className="p-6 border border-white/10 rounded-2xl">
                            <form onSubmit={handleSaveSettings} className="space-y-4">
                                <div>
                                    <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5">Zapier Catch Hook URL</label>
                                    <div className="relative">
                                        <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={14} />
                                        <input 
                                            type="text"
                                            value={catchHookInput}
                                            onChange={e => setCatchHookInput(e.target.value)}
                                            placeholder="https://hooks.zapier.com/hooks/..."
                                            className={`w-full pl-9 pr-4 py-2 bg-zinc-950 border ${formErrors.catchHookUrl ? 'border-red-500' : 'border-white/5'} focus:border-yellow-500 text-xs text-white rounded-xl outline-none transition-all`}
                                        />
                                    </div>
                                    {formErrors.catchHookUrl && <p className="text-[10px] text-red-500 font-mono mt-1 leading-normal">{formErrors.catchHookUrl}</p>}
                                </div>

                                <div>
                                    <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5">Developer Secret Token</label>
                                    <div className="relative">
                                        <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={14} />
                                        <input 
                                            type="text"
                                            value={devTokenInput}
                                            onChange={e => setDevTokenInput(e.target.value)}
                                            placeholder="zk_live_xxxxxxxx"
                                            className={`w-full pl-9 pr-4 py-2 bg-zinc-950 border ${formErrors.devToken ? 'border-red-500' : 'border-white/5'} focus:border-yellow-500 text-xs text-white rounded-xl outline-none transition-all`}
                                        />
                                    </div>
                                    {formErrors.devToken && <p className="text-[10px] text-red-500 font-mono mt-1 leading-normal">{formErrors.devToken}</p>}
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-zinc-900 border border-white/10 hover:border-yellow-500 text-white py-2.5 rounded-xl text-xs font-black uppercase transition-all tracking-wider font-mono shadow-md"
                                >
                                    Update Credentials
                                </button>
                            </form>
                        </GlassCard>
                    </div>

                    {/* MIDDLE COLUMN: EVENT TRIGGER SIMULATOR */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="text-left">
                            <h3 className="text-lg font-bold font-mono text-white uppercase tracking-wider mb-1 flex items-center gap-2">
                                <Cpu size={18} className="text-yellow-500" /> Outbound Event Triggers
                            </h3>
                            <p className="text-xs text-zinc-500 font-mono">Discharge simulated webhook JSON packages directly to your Zapier hook endpoint.</p>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            {[
                                {
                                    id: 'lead' as const,
                                    name: 'New Lead Created (`lead.created`)',
                                    desc: 'Fires when a new customer submits a customized software development proposal.',
                                    payloadPreview: '{ name: "Thomas Anderson", budget: "$15k-$25k" }'
                                },
                                {
                                    id: 'invoice' as const,
                                    name: 'Invoice Paid (`invoice.paid`)',
                                    desc: 'Fires when an enterprise SaaS user successfully pays their service fees.',
                                    payloadPreview: '{ invoiceCode: "KIAN-2026-0921", amount: "₹3,45,000" }'
                                },
                                {
                                    id: 'internship' as const,
                                    name: 'Internship Applied (`internship.applied`)',
                                    desc: 'Fires when a candidate applies for the MERN/Node Innovation Lab.',
                                    payloadPreview: '{ course: "Full-Stack MERN", email: "morpheus@nebulabs.org" }'
                                }
                            ].map((trigger) => {
                                const isSimulating = simulatingType === trigger.id;
                                return (
                                    <GlassCard key={trigger.id} className="p-5 border border-white/10 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                        <div className="flex-1">
                                            <h4 className="text-sm font-bold text-white font-mono flex items-center gap-2">
                                                {trigger.name}
                                            </h4>
                                            <p className="text-xs text-zinc-400 font-sans mt-0.5 leading-relaxed">{trigger.desc}</p>
                                            
                                            <div className="flex items-center gap-2 mt-3 font-mono text-[9px] bg-zinc-950 border border-white/5 px-2.5 py-1.5 rounded-lg text-zinc-500 w-fit">
                                                <FileJson size={10} className="text-yellow-500" />
                                                <span>Preview: {trigger.payloadPreview}</span>
                                            </div>
                                        </div>

                                        <button
                                            disabled={isSimulating || !state.isActive}
                                            onClick={() => handleSimulateTrigger(trigger.id)}
                                            className="bg-yellow-500 hover:bg-yellow-400 text-black disabled:opacity-20 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shrink-0 w-full sm:w-auto shadow-md"
                                        >
                                            {isSimulating ? (
                                                <RefreshCw size={12} className="animate-spin" />
                                            ) : (
                                                <Play size={12} />
                                            )}
                                            Simulate Webhook
                                        </button>
                                    </GlassCard>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* --- OUTSIDE ACTIONS CONFIG & MONOSPACE CONSOLE LOGGER --- */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* LEFT COLUMN: ACTIONS SETUPS */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="text-left">
                            <h3 className="text-lg font-bold font-mono text-white uppercase tracking-wider mb-1 flex items-center gap-2">
                                <Cpu size={18} className="text-yellow-500" /> Workflow Actions
                            </h3>
                            <p className="text-xs text-zinc-500 font-mono">Enable/disable mapped downstream Zapier actions.</p>
                        </div>

                        <GlassCard className="p-6 border border-white/10 rounded-2xl space-y-4 text-xs font-mono">
                            <div className="space-y-3">
                                {[
                                    { id: 'slack_notify', label: 'Slack Channel Notifications', desc: 'Post trigger summaries into #sales' },
                                    { id: 'gsheet_row', label: 'Google Sheets Rows Appending', desc: 'Add webhook rows to lead spreadsheet' },
                                    { id: 'gmail_draft', label: 'Gmail Draft Composition', desc: 'Construct co-branded welcome email drafts' }
                                ].map((act) => {
                                    const active = state.enabledActions.includes(act.id);
                                    return (
                                        <div key={act.id} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                                            <div>
                                                <span className="text-[11px] text-zinc-300 block">{act.label}</span>
                                                <span className="text-[9px] text-zinc-500 block font-sans mt-0.5">{act.desc}</span>
                                            </div>
                                            <button 
                                                onClick={() => toggleActionEnabled(act.id)}
                                                className={`text-zinc-400 transition-colors shrink-0 ${active ? 'text-yellow-500' : 'hover:text-white'}`}
                                            >
                                                {active ? <ToggleRight size={22} /> : <ToggleLeft size={22} />}
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        </GlassCard>
                    </div>

                    {/* RIGHT COLUMN: CLI LOGGER */}
                    <div className="lg:col-span-2 space-y-6 flex flex-col">
                        <div className="flex justify-between items-end">
                            <div className="text-left">
                                <h3 className="text-lg font-bold font-mono text-white uppercase tracking-wider mb-1 flex items-center gap-2">
                                    <Terminal size={18} className="text-yellow-500" /> REST Pipeline Terminal
                                </h3>
                                <p className="text-xs text-zinc-500 font-mono">Outgoing webhook payloads, HTTP request headers, and response logs.</p>
                            </div>
                            <button 
                                onClick={clearLogs}
                                className="text-[10px] font-mono text-zinc-500 hover:text-yellow-500 uppercase tracking-widest"
                            >
                                Clear Console
                            </button>
                        </div>

                        <div className="flex-1 bg-[#030303] border border-white/10 rounded-2xl p-5 font-mono text-[11px] text-zinc-400 h-[280px] overflow-y-auto flex flex-col justify-between scrollbar-hide shadow-inner">
                            <div className="space-y-1">
                                {logs.map((log, index) => {
                                    let color = 'text-zinc-400';
                                    if (log.includes('SUCCESS:')) color = 'text-green-400';
                                    if (log.includes('ERROR:')) color = 'text-red-400';
                                    if (log.includes('WARNING:')) color = 'text-yellow-500';
                                    if (log.includes('SYSTEM:')) color = 'text-zinc-500';
                                    if (log.includes('ZAPIER:')) color = 'text-cyan-400';
                                    if (log.includes('REST:') || log.includes('HEADERS:') || log.includes('PAYLOAD:')) color = 'text-zinc-400';
                                    return (
                                        <div key={index} className={`${color} leading-relaxed break-all`}>
                                            {log}
                                        </div>
                                    );
                                })}
                                {simulatingType && (
                                    <div className="text-yellow-500 animate-pulse flex items-center gap-2 mt-2">
                                        <RefreshCw size={12} className="animate-spin" /> Discharging payload... [{simProgress}%]
                                    </div>
                                )}
                                <div ref={consoleEndRef} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
