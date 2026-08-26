"use client";

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Activity, Home, Car, ShoppingBag, Truck, CheckSquare,
    DollarSign, Utensils, Briefcase, Link as LinkIcon, Lock,
    Shield, Zap, X, Copy, Play, Monitor, Server, CheckCircle2, Loader2, Maximize2,
    Layers, Cpu, Calendar, Star, ArrowRight,
    Settings, Users, ClipboardList, MousePointer2,
    RefreshCcw, Code, Share2, HardHat, GraduationCap, Youtube, Pencil, Trash2, ExternalLink, PlayCircle, Check, Search, Sparkles, Filter
} from 'lucide-react'
import { Reveal } from '@/components/Reveal'
import Link from 'next/link';
import emailjs from '@emailjs/browser';
import { trackGAEvent, trackGTMEvent } from '@/utils/analytics';
import { getStoredUTMParams } from '@/utils/utm';

const EMAILJS_SERVICE_ID = 'service_opc05wm';
const EMAILJS_TEMPLATE_ID = 'template_jpwu4pp';
const EMAILJS_PUBLIC_KEY = 'zXyGNtU81gEw6BmhH';

// Specific Software Data Setup per requirements
const softwareList = [
    {
        id: 201,
        name: 'Boat & Jet Booking Platform',
        category: 'Sports',
        desc: 'Luxury yacht, speed boat, and jet-ski rental reservation platform with real-time slot scheduling, captain addons, and fleet management.',
        link: 'https://boat-jet-booking.kiaansoftwaredemo.shop/',
        youtube: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        color: 'from-cyan-400 to-blue-600',
        glow: 'rgba(6, 182, 212, 0.4)',
        icon: Activity,
        type: 'Web App',
        status: 'Live',
        features: ['Vessel Fleet Showcase', 'Hourly / Daily Slot Booking', 'Captain & Equipment Addons'],
        detailedFeatures: [
            { title: 'Vessel Fleet Showcase', description: 'Display premium boats, yachts, and jet skis with high-res galleries, specs, and passenger capacities.' },
            { title: 'Real-Time Slot Booking', description: 'Live availability calendar with instant slot confirmation, deposit handling, and digital boarding passes.' },
            { title: 'Fleet & Safety Operations', description: 'Captain allocation, safety gear checklists, and rental timeline tracking for marina operators.' }
        ],
        howItWorks: [
            { icon: Activity, title: 'Browse Available Watercraft', description: 'Explore premium boats, jet skis, and yachts filtered by capacity, power, and marina location.' },
            { icon: Calendar, title: 'Select Date, Time & Addons', description: 'Choose hourly or full-day slots, add captain services, watersports gear, and special refreshments.' },
            { icon: CheckCircle2, title: 'Instant Confirmation & Boarding', description: 'Confirm booking with digital waiver and receive your instant digital dock access pass.' }
        ],
        topSelling: true,
        techStack: { frontend: ['React', 'Tailwind CSS'], backend: ['Node.js'], database: ['MongoDB'], infrastructure: ['AWS'], integrations: ['Stripe', 'Weather API'] }
    },
    {
        id: 202,
        name: 'Property Management System',
        category: 'Real Estate',
        desc: 'Comprehensive real estate and rental property management software for units, tenant leases, and automated rent collection.',
        link: 'http://property-ui.kiaansoftwaredemo.shop',
        youtube: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        color: 'from-blue-500 to-indigo-600',
        glow: 'rgba(59, 130, 246, 0.4)',
        icon: Home,
        type: 'Web App',
        status: 'Live',
        features: ['Unit & Building Directory', 'Tenant Lease Automation', 'Rent Collection & Dues'],
        detailedFeatures: [
            { title: 'Multi-Property Portfolio', description: 'Centralized management for residential, commercial, and mixed-use properties with floor plans.' },
            { title: 'Lease & Tenant Portal', description: 'Digital tenancy agreements, KYC verification, maintenance requests, and move-in checklists.' },
            { title: 'Financial Oversight', description: 'Automated invoice generation, payment gateway sync, rent reminders, and occupancy yield reports.' }
        ],
        howItWorks: [
            { icon: Home, title: 'Onboard Properties & Units', description: 'List units with floor plans, amenities, and current occupancy status in one structured registry.' },
            { icon: Users, title: 'Manage Leases & Tenants', description: 'Execute digital onboarding, rent schedules, and track maintenance tickets smoothly.' },
            { icon: DollarSign, title: 'Track Collections & P&L', description: 'Monitor real-time rent receipts, overdue alerts, and portfolio earnings with zero manual bookkeeping.' }
        ],
        topSelling: true,
        techStack: { frontend: ['React', 'TypeScript'], backend: ['Node.js'], database: ['PostgreSQL'], infrastructure: ['AWS'], integrations: ['Payment Gateway', 'SMS Alerts'] }
    },
    {
        id: 203,
        name: 'MSBI Business Intelligence & Analytics Suite',
        category: 'Enterprise',
        desc: 'Enterprise-grade Microsoft Business Intelligence dashboard suite with real-time ETL pipelines, data visualization, and KPI reporting.',
        link: 'http://msbi.kiaansoftwaredemo.shop',
        youtube: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        color: 'from-amber-400 to-yellow-500',
        glow: 'rgba(245, 158, 11, 0.4)',
        icon: Layers,
        type: 'Software',
        status: 'Live',
        features: ['Executive KPI Dashboards', 'SSIS/SSAS Data Models', 'Interactive Power BI Reports'],
        detailedFeatures: [
            { title: 'Enterprise Data Warehousing', description: 'Unified data pipelines connecting multi-source databases into centralized analytics cubes.' },
            { title: 'Self-Service Visual Analytics', description: 'Drill-down charts, predictive trends, and cross-departmental operational performance matrices.' },
            { title: 'Automated Scheduled Reports', description: 'Automated daily/monthly digest exports and exception alerts for executive leadership.' }
        ],
        howItWorks: [
            { icon: Layers, title: 'Ingest & Transform Data', description: 'Connect multiple operational data streams through automated ETL workflows and clean data pipelines.' },
            { icon: Cpu, title: 'Build Multi-Dimensional Cubes', description: 'Process analytics models for instant multi-year queries, cohort analyses, and forecasting.' },
            { icon: Activity, title: 'Visualize & Drive Decisions', description: 'Interact with responsive dashboards to uncover operational bottlenecks and scale business growth.' }
        ],
        topSelling: true,
        techStack: { frontend: ['React', 'Power BI Embedded'], backend: ['Node.js', '.NET Core'], database: ['SQL Server', 'PostgreSQL'], infrastructure: ['Azure', 'AWS'], integrations: ['MSBI', 'Excel'] }
    },
    {
        id: 204,
        name: 'Hostel Management System',
        category: 'Real Estate',
        desc: 'End-to-end student hostel and PG accommodation system for room allocations, mess billing, curfew logs, and warden administration.',
        link: 'https://hostel-management.kiaansoftwaredemo.shop',
        youtube: '',
        color: 'from-emerald-400 to-teal-600',
        glow: 'rgba(16, 185, 129, 0.4)',
        icon: Home,
        type: 'Web App',
        status: 'Live',
        features: ['Room & Bed Inventory', 'Mess & Meal Management', 'Visitor & Gate Pass System'],
        detailedFeatures: [
            { title: 'Bed-Level Allocation', description: 'Real-time floor plan visualization with single/double/triple sharing availability and room transfer.' },
            { title: 'Student & Fee Profiles', description: 'Digital KYC, monthly mess charges, utility billing, and security deposit reconciliation.' },
            { title: 'Campus Security Logs', description: 'Digital gate-pass workflows, parent SMS notifications, and curfew entry timestamps.' }
        ],
        howItWorks: [
            { icon: Home, title: 'Assign Rooms & Beds', description: 'Allocate incoming residents to vacant beds based on preference and room type with live availability.' },
            { icon: Users, title: 'Manage Daily Operations', description: 'Track mess attendance, maintenance complaint tickets, and monthly fee dues in one portal.' },
            { icon: Shield, title: 'Monitor Safety & Reports', description: 'Track gate entry logs and occupancy revenue with automatic summaries for hostel wardens.' }
        ],
        topSelling: true,
        techStack: { frontend: ['React', 'Tailwind CSS'], backend: ['Node.js'], database: ['MongoDB'], infrastructure: ['AWS'], integrations: ['SMS Gateway', 'Payment Gateway'] }
    },
    {
        id: 205,
        name: 'School Management System',
        category: 'EdTech',
        desc: 'Comprehensive K-12 school and academic ERP platform covering admissions, attendance, exams, timetables, and parent communication.',
        link: 'https://school-management.kiaansoftwaredemo.shop',
        youtube: '',
        color: 'from-indigo-400 to-purple-600',
        glow: 'rgba(99, 102, 241, 0.4)',
        icon: GraduationCap,
        type: 'Web App',
        status: 'Live',
        features: ['Student & Staff Portals', 'Automated Attendance & Exams', 'Fee Invoicing & Parent App'],
        detailedFeatures: [
            { title: 'Academic Control Center', description: 'Class timetable scheduling, syllabus progress tracking, and dynamic report card grading configuration.' },
            { title: 'Fee & Account Lifecycle', description: 'Term installment management, online fee receipts, overdue reminders, and scholarship tracking.' },
            { title: 'Smart Communication', description: 'Automated SMS/WhatsApp notices for absent alerts, exam schedules, and holiday announcements.' }
        ],
        howItWorks: [
            { icon: GraduationCap, title: 'Enroll Students & Classrooms', description: 'Setup classes, sections, student bio-records, and teacher allocations in a structured hierarchy.' },
            { icon: ClipboardList, title: 'Daily Classroom Workflows', description: 'Teachers mark digital attendance, record marks, and publish homework assignments directly.' },
            { icon: Users, title: 'Connect Parents & Administration', description: 'Instant online fee payments, automated report cards, and school-wide performance metrics.' }
        ],
        topSelling: true,
        techStack: { frontend: ['React', 'Tailwind CSS'], backend: ['Node.js'], database: ['PostgreSQL'], infrastructure: ['AWS'], integrations: ['WhatsApp API', 'Payment Gateway'] }
    },
    {
        id: 206,
        name: 'Commercial Construction Services',
        category: 'Enterprise',
        desc: 'High-impact commercial construction, architecture, and infrastructure project management platform with site tracking and RFP requests.',
        link: 'https://construction-landingpage.kiaansoftwaredemo.shop',
        youtube: '',
        color: 'from-orange-500 to-amber-500',
        glow: 'rgba(249, 115, 22, 0.4)',
        icon: HardHat,
        type: 'Website',
        status: 'Live',
        features: ['Commercial Project Showcase', 'Blueprint & Scope Estimator', 'Client Tender & Bid Portal'],
        detailedFeatures: [
            { title: 'Architectural Portfolio', description: 'Showcase high-rise, commercial, and industrial projects with high-resolution drone photo galleries.' },
            { title: 'Estimates & RFPs', description: 'Guided client inquiry system to capture square footage, project timeline, and architectural budget tier.' },
            { title: 'Milestone Tracking', description: 'Live construction milestone updates, safety compliance certifications, and subcontractor management.' }
        ],
        howItWorks: [
            { icon: HardHat, title: 'Browse Commercial Portfolio', description: 'Explore completed enterprise buildings, industrial warehouses, and retail commercial developments.' },
            { icon: ClipboardList, title: 'Request Project Quote & Scope', description: 'Submit project scope, architectural requirements, structural specifications, and timeline.' },
            { icon: CheckCircle2, title: 'Track Execution & Handover', description: 'View construction timeline, safety inspections, milestone approvals, and engineering handovers.' }
        ],
        topSelling: true,
        techStack: { frontend: ['React', 'Next.js'], backend: ['Node.js'], database: ['MongoDB'], infrastructure: ['Vercel', 'AWS'], integrations: [] }
    },
    {
        id: 207,
        name: 'Pet Food & Dog Treats ERP Suite',
        category: 'Retail & Logistics',
        desc: 'End-to-end pet nutrition and dog treat manufacturing ERP with recipe batching, inventory, and B2B wholesale distribution.',
        link: 'https://dog-treat-erp.kiaansoftwaredemo.shop',
        youtube: '',
        color: 'from-amber-500 to-orange-600',
        glow: 'rgba(245, 158, 11, 0.4)',
        icon: ShoppingBag,
        type: 'Software',
        status: 'Live',
        features: ['Recipe & Batch Formulation', 'Raw Ingredient Inventory', 'Wholesale B2B Distribution'],
        detailedFeatures: [
            { title: 'Batch & Formula Management', description: 'Maintain exact ingredient ratios, nutrition facts, and production yield tracking.' },
            { title: 'Quality & Expiry Compliance', description: 'Monitor lot batches, food safety certifications, and shelf-life expiration dates.' },
            { title: 'Multi-Channel Order Fulfillment', description: 'Manage wholesale distributor orders and retail inventory pipelines seamlessly.' }
        ],
        howItWorks: [
            { icon: ShoppingBag, title: 'Manage Formulas & Ingredients', description: 'Input recipes, track raw material supplies, and calculate production batch costs.' },
            { icon: Layers, title: 'Run Production Lines', description: 'Schedule baking, packaging, and QA testing stages with lot tracking.' },
            { icon: Truck, title: 'Dispatch & Track Deliveries', description: 'Generate shipping manifests and track wholesale deliveries to pet stores and distributors.' }
        ],
        topSelling: true,
        techStack: { frontend: ['React', 'Tailwind CSS'], backend: ['Node.js'], database: ['PostgreSQL'], infrastructure: ['AWS'], integrations: ['Barcode Scanner', 'QuickBooks'] }
    },
    {
        id: 208,
        name: 'On-Demand In-Home Massage & Wellness',
        category: 'Healthcare',
        desc: 'On-demand luxury home massage and wellness therapist booking platform with therapist dispatch and scheduling.',
        link: 'https://home-massage.kiaansoftwaredemo.shop',
        youtube: '',
        color: 'from-pink-400 to-rose-500',
        glow: 'rgba(244, 63, 94, 0.4)',
        icon: Activity,
        type: 'Web App',
        status: 'Live',
        features: ['Therapist Matching & Booking', 'Custom Treatment Packages', 'Live Dispatch Tracking'],
        detailedFeatures: [
            { title: 'Verified Therapist Profiles', description: 'Browse certified practitioners, specialties (Deep Tissue, Swedish, Aromatherapy), and customer reviews.' },
            { title: 'Home Service Scheduler', description: 'Select date, duration, preferred pressure tier, and custom essential oils for doorstep therapy.' },
            { title: 'Safe Checkout & ETA', description: 'Cashless payment with live therapist arrival ETA and safety verification.' }
        ],
        howItWorks: [
            { icon: Activity, title: 'Select Wellness Therapy', description: 'Choose your desired massage technique, session length, and targeted recovery goals.' },
            { icon: Calendar, title: 'Schedule In-Home Slot', description: 'Pick your preferred date and time; nearest available certified therapist accepts the request.' },
            { icon: CheckCircle2, title: 'Relax at Home', description: 'Therapist arrives with complete spa equipment for a professional in-home session.' }
        ],
        topSelling: true,
        techStack: { frontend: ['React', 'Tailwind CSS'], backend: ['Node.js'], database: ['MongoDB'], infrastructure: ['AWS'], integrations: ['Stripe', 'Google Maps API'] }
    },
    {
        id: 209,
        name: 'Mini Contractor & Trade Job Management',
        category: 'Enterprise',
        desc: 'Field service and subcontractor job dispatch platform for electrical, plumbing, HVAC, and trade contractors.',
        link: 'http://mini-contactor.kiaansoftwaredemo.shop',
        youtube: '',
        color: 'from-yellow-400 to-amber-500',
        glow: 'rgba(251, 191, 36, 0.4)',
        icon: HardHat,
        type: 'Web App',
        status: 'Live',
        features: ['Job Dispatch & Work Orders', 'Mobile Technician App', 'Instant Invoicing & Payments'],
        detailedFeatures: [
            { title: 'Work Order Pipeline', description: 'Create and assign field jobs with site address, photos, and trade requirements.' },
            { title: 'Material & Labor Tracking', description: 'Log parts used, labor hours worked, and job completion checklists on-site.' },
            { title: 'Digital Sign-off & Invoicing', description: 'Capture customer signatures and generate itemized invoices immediately after completion.' }
        ],
        howItWorks: [
            { icon: ClipboardList, title: 'Log Service Inquiry', description: 'Record client repair request with site details, urgency, and estimated parts required.' },
            { icon: HardHat, title: 'Dispatch Trade Technician', description: 'Assign skilled electrician or plumber with GPS navigation and job instructions.' },
            { icon: DollarSign, title: 'Complete & Collect Payment', description: 'Technician finishes repair, takes customer sign-off, and collects digital payment.' }
        ],
        topSelling: true,
        techStack: { frontend: ['React', 'Tailwind CSS'], backend: ['Node.js'], database: ['PostgreSQL'], infrastructure: ['AWS'], integrations: ['Twilio', 'Stripe'] }
    },
    {
        id: 211,
        name: 'Custom Outdoor Kitchen Design Suite',
        category: 'Enterprise',
        desc: 'Interactive outdoor kitchen and patio living builder with 3D modular layout customizer and instant project quotation.',
        link: 'https://outdoor-kitchen.kiaansoftwaredemo.shop',
        youtube: '',
        color: 'from-orange-400 to-red-500',
        glow: 'rgba(249, 115, 22, 0.4)',
        icon: Utensils,
        type: 'Website',
        status: 'Live',
        features: ['Modular Grill & Island Builder', 'Material & Finish Visualizer', 'Instant Cost Estimation'],
        detailedFeatures: [
            { title: 'Modular Design Configurator', description: 'Configure custom BBQ grills, pizza ovens, beverage centers, and stone countertops.' },
            { title: 'Premium Material Selection', description: 'Switch between stainless steel finishes, granite tops, and stucco/stone siding live.' },
            { title: 'Instant Quote & Blueprint', description: 'Generate structural architectural blueprints and itemized contractor budget estimates.' }
        ],
        howItWorks: [
            { icon: Utensils, title: 'Customize Kitchen Layout', description: 'Choose L-shape, U-shape, or straight island configurations for your patio space.' },
            { icon: Layers, title: 'Select Appliances & Finishes', description: 'Add built-in gas grills, refrigerators, drawers, and luxury stone surfaces.' },
            { icon: CheckSquare, title: 'Get Instant Project Estimate', description: 'Receive full dimensional specifications and direct contractor estimate for installation.' }
        ],
        topSelling: true,
        techStack: { frontend: ['React', 'Three.js / Canvas'], backend: ['Node.js'], database: ['MongoDB'], infrastructure: ['AWS'], integrations: ['3D Configurator'] }
    },
    {
        id: 212,
        name: 'Dental Care Clinic & Patient ERP',
        category: 'Healthcare',
        desc: 'Next-gen dental clinic ERP with electronic dental charts, appointment booking, treatment plans, and digital billing.',
        link: 'https://dental-clinic.kiaansoftwaredemo.shop',
        youtube: '',
        color: 'from-teal-400 to-cyan-500',
        glow: 'rgba(20, 184, 166, 0.4)',
        icon: Activity,
        type: 'Web App',
        status: 'Live',
        features: ['Electronic Dental Charts', 'Smart Appointment Desk', 'Procedure Treatment Plans'],
        detailedFeatures: [
            { title: 'Interactive Odontogram Chart', description: 'Visual tooth-by-tooth charting for cavities, crowns, implants, and periodontal logs.' },
            { title: 'Patient Recall & Reminders', description: 'Automated SMS/WhatsApp reminders for 6-month checkups and cleaning appointments.' },
            { title: 'Treatment Billing & Insurance', description: 'Pre-procedure cost estimates, insurance claim processing, and digital payment receipts.' }
        ],
        howItWorks: [
            { icon: Activity, title: 'Schedule Patient Visit', description: 'Front desk or patient books convenient dental consultation slot online.' },
            { icon: ClipboardList, title: 'Dental Charting & Diagnosis', description: 'Dentist logs findings on interactive chart, attaches X-rays, and designs treatment plan.' },
            { icon: CheckCircle2, title: 'Execute & Bill Treatment', description: 'Record procedures completed, generate insurance claim, and schedule next follow-up.' }
        ],
        topSelling: true,
        techStack: { frontend: ['React', 'Tailwind CSS'], backend: ['Node.js'], database: ['PostgreSQL'], infrastructure: ['AWS'], integrations: ['SMS Reminders', 'X-Ray Viewer'] }
    },
    {
        id: 213,
        name: 'Cloud Financial Accounting & Invoicing ERP',
        category: 'Finance / Banking',
        desc: 'Enterprise cloud accounting and bookkeeping suite with automated bank feeds, GST/tax calculation, and profit-loss analytics.',
        link: 'http://accounting-new.kiaansoftwaredemo.shop',
        youtube: '',
        color: 'from-emerald-500 to-green-600',
        glow: 'rgba(16, 185, 129, 0.4)',
        icon: DollarSign,
        type: 'Software',
        status: 'Live',
        features: ['Double-Entry Ledger Engine', 'Automated Bank Reconciliation', 'GST / Tax Compliance Invoices'],
        detailedFeatures: [
            { title: 'Multi-Currency General Ledger', description: 'Full double-entry bookkeeping with balance sheet, P&L, and trial balance generation.' },
            { title: 'Automated Invoicing & Receivables', description: 'Create GST/VAT compliant recurring invoices with automated payment reminders.' },
            { title: 'Cash Flow & Expense Tracking', description: 'Categorize expenses, receipt OCR scanning, and real-time cash position forecasting.' }
        ],
        howItWorks: [
            { icon: DollarSign, title: 'Connect Accounts & Ingest Bills', description: 'Sync bank statements and upload expense receipts for automatic ledger reconciliation.' },
            { icon: Layers, title: 'Generate Invoices & Track Dues', description: 'Send digital invoices to clients with online payment links and instant receipt vouchers.' },
            { icon: Activity, title: 'Review Real-Time Financial Reports', description: 'View real-time profit and loss, tax obligations, and audited cash flow snapshots.' }
        ],
        topSelling: true,
        techStack: { frontend: ['React', 'TypeScript'], backend: ['Node.js', 'Python'], database: ['PostgreSQL'], infrastructure: ['AWS'], integrations: ['Banking APIs', 'Tax Engine'] }
    },
    {
        id: 214,
        name: 'Sports Arena & Turf Booking Pro',
        category: 'Sports',
        desc: 'Multi-court turf reservation system with live floodlight slot management, team tournaments, and instant online payments.',
        link: 'http://turf-new.kiaansoftwaredemo.shop',
        youtube: '',
        color: 'from-green-400 to-emerald-600',
        glow: 'rgba(34, 197, 94, 0.4)',
        icon: CheckSquare,
        type: 'Web App',
        status: 'Live',
        features: ['Multi-Court Grid Scheduler', 'Dynamic Peak-Hour Pricing', 'Tournament & League Manager'],
        detailedFeatures: [
            { title: 'Live Court Availability', description: 'Visual hourly matrix for football, cricket, tennis, and pickleball arenas.' },
            { title: 'Peak / Off-Peak Rate Engine', description: 'Configurable pricing for weekend slots, floodlight hours, and recurring weekly bookings.' },
            { title: 'Equipment & Referee Addons', description: 'Let captains book match referees, sports kits, and hydration packages with their slot.' }
        ],
        howItWorks: [
            { icon: CheckSquare, title: 'Select Sport & Court', description: 'Pick football turf or badminton court with preferred surface type and dimensions.' },
            { icon: Calendar, title: 'Book Available Slot', description: 'Choose time slot, add tournament ball/gear rentals, and complete instant UPI/card payment.' },
            { icon: Activity, title: 'Show QR Pass & Play', description: 'Receive instant digital booking confirmation and QR gate access for match day.' }
        ],
        topSelling: true,
        techStack: { frontend: ['React', 'Tailwind CSS'], backend: ['Node.js'], database: ['MongoDB'], infrastructure: ['AWS'], integrations: ['Payment Gateway', 'WhatsApp Notifications'] }
    },
    {
        id: 215,
        name: 'Smart Warehouse & 3PL Logistics Suite',
        category: 'Retail & Logistics',
        desc: 'High-efficiency warehouse management system (WMS) with barcode scanning, batch lot tracking, and 3PL shipping workflows.',
        link: 'https://warehouse-management-new.kiaansoftwaredemo.shop',
        youtube: '',
        color: 'from-purple-500 to-indigo-600',
        glow: 'rgba(139, 92, 246, 0.4)',
        icon: Truck,
        type: 'Software',
        status: 'Live',
        features: ['Bin & Rack Location System', 'Barcode Scanning & Inbound Putaway', '3PL Dispatch & Carrier Integration'],
        detailedFeatures: [
            { title: 'Visual Rack & Bin Mapping', description: 'Aisle, rack, and shelf location hierarchy for optimized picker routing.' },
            { title: 'Fast Inward / Outward Scanning', description: 'Handheld barcode scanning for goods receipt, pallet allocation, and pick-pack dispatch.' },
            { title: '3PL Multi-Carrier Shipping', description: 'Automated label printing and direct courier API tracking for bulk commercial shipments.' }
        ],
        howItWorks: [
            { icon: Truck, title: 'Inbound Goods Receipt', description: 'Scan incoming freight, verify purchase orders, and generate shelf putaway routes.' },
            { icon: Layers, title: 'Real-Time Stock Oversight', description: 'Monitor inventory levels across multiple warehouses with reorder alert thresholds.' },
            { icon: CheckCircle2, title: 'Pick, Pack & Ship', description: 'Generate wave picking lists, print shipping labels, and dispatch via courier partners.' }
        ],
        topSelling: true,
        techStack: { frontend: ['React', 'Tailwind CSS'], backend: ['Node.js', 'Go'], database: ['PostgreSQL'], infrastructure: ['AWS'], integrations: ['FedEx', 'DHL', 'Zebra Scanners'] }
    },
    {
        id: 216,
        name: 'Commercial Real Estate & Asset Management',
        category: 'Real Estate',
        desc: 'Enterprise commercial property asset management platform for multi-story office complexes, retail malls, and corporate leases.',
        link: 'http://real-estate-property.kiaansoftwaredemo.shop',
        youtube: '',
        color: 'from-blue-600 to-sky-600',
        glow: 'rgba(37, 99, 235, 0.4)',
        icon: Home,
        type: 'Web App',
        status: 'Live',
        features: ['Commercial Building Directory', 'CAM & Utility Recovery Billing', 'Corporate Lease Governance'],
        detailedFeatures: [
            { title: 'Multi-Tenant Tower Directory', description: 'Manage corporate tenant lease agreements, escalations, and lock-in covenants.' },
            { title: 'CAM & Utility Apportionment', description: 'Automated Common Area Maintenance (CAM), HVAC sub-metering, and utility billing.' },
            { title: 'Facility SLA & Compliance', description: 'Track elevator inspections, fire safety compliance, and vendor SLA scorecards.' }
        ],
        howItWorks: [
            { icon: Home, title: 'Onboard Commercial Tower', description: 'Map office wings, floor plates, retail shops, and allocated parking bays.' },
            { icon: Users, title: 'Structure Corporate Leases', description: 'Track multi-year contracts, security deposits, and annual escalation clauses.' },
            { icon: DollarSign, title: 'Automate CAM & Collections', description: 'Generate monthly corporate invoices with utility sub-metering breakdown.' }
        ],
        topSelling: true,
        techStack: { frontend: ['React', 'Next.js'], backend: ['Node.js'], database: ['PostgreSQL'], infrastructure: ['AWS'], integrations: ['ERP Connectors', 'Smart Meter APIs'] }
    },
    {
        id: 218,
        name: 'Car Drive & Self-Drive Vehicle Rental',
        category: 'Enterprise',
        desc: 'On-demand self-drive car rental and vehicle leasing platform with GPS tracking, deposit management, and instant booking calendar.',
        link: 'http://car-drive.kiaansoftwaredemo.shop',
        youtube: '',
        color: 'from-amber-400 to-orange-500',
        glow: 'rgba(245, 158, 11, 0.4)',
        icon: Car,
        type: 'Web App',
        status: 'Live',
        features: ['Fleet Showcase & Booking', 'Instant GPS & Fastag Tracking', 'Digital KYC & Inspection Log'],
        detailedFeatures: [
            { title: 'Vehicle Fleet Showcase', description: 'Browse sedans, SUVs, and luxury electric vehicles with daily/weekly tariffs.' },
            { title: 'Digital KYC & Paperless Deposit', description: 'Upload driver license, automated credit verification, and instant security deposit escrow.' },
            { title: 'On-Road GPS & Fleet Telematics', description: 'Real-time vehicle health, fuel levels, geo-fencing, and automated speed alerts.' }
        ],
        howItWorks: [
            { icon: Car, title: 'Choose Vehicle & Duration', description: 'Select car model, pickup hub, and rental dates with transparent upfront rates.' },
            { icon: ClipboardList, title: 'Quick Digital Verification', description: 'Upload ID proofs for instant automated verification and digital contract sign-off.' },
            { icon: CheckCircle2, title: 'Unlock & Hit the Road', description: 'Keyless hub pickup or home delivery with digital vehicle condition checklist.' }
        ],
        topSelling: true,
        techStack: { frontend: ['React', 'Tailwind CSS'], backend: ['Node.js'], database: ['PostgreSQL'], infrastructure: ['AWS'], integrations: ['Fastag API', 'Google Maps'] }
    },
    {
        id: 219,
        name: 'Legal Case & Practice Management Suite',
        category: 'Enterprise',
        desc: 'Comprehensive law firm and corporate legal case management suite with court hearing alerts, document vault, and billable hours tracking.',
        link: 'http://case-management.kiaansoftwaredemo.shop',
        youtube: '',
        color: 'from-blue-600 to-indigo-600',
        glow: 'rgba(37, 99, 235, 0.4)',
        icon: Briefcase,
        type: 'Software',
        status: 'Live',
        features: ['Court Docket & Hearing Diary', 'Encrypted Document Vault', 'Billable Hours & Client Invoicing'],
        detailedFeatures: [
            { title: 'Court Hearing & Cause List Sync', description: 'Automated court date sync, cause list alerts, and case stage chronological timeline.' },
            { title: 'Client Matter & Case Repository', description: 'Centralized evidence storage, petition drafts, and client communication logs.' },
            { title: 'Lawyer Time Tracking & Invoicing', description: 'Track billable time per associate and generate retainer fee invoices automatically.' }
        ],
        howItWorks: [
            { icon: Briefcase, title: 'Register Case & Matter', description: 'Enter case number, court jurisdiction, opposing counsel, and client details.' },
            { icon: Calendar, title: 'Sync Hearings & Deadlines', description: 'Receive automatic reminders for court hearings, filings, and limitation dates.' },
            { icon: DollarSign, title: 'Invoice & Generate Reports', description: 'Generate professional invoices for professional retainers and track payment recovery.' }
        ],
        topSelling: true,
        techStack: { frontend: ['React', 'TypeScript'], backend: ['Node.js'], database: ['PostgreSQL'], infrastructure: ['AWS'], integrations: ['e-Courts API', 'Document E-Sign'] }
    },
    {
        id: 220,
        name: 'Smart Vending Machine & Telemetry ERP',
        category: 'Retail & Logistics',
        desc: 'Automated smart vending machine management network with real-time inventory telemetry, cash/UPI monitoring, and route replenishment.',
        link: 'http://vending-machine.kiaansoftwaredemo.shop',
        youtube: '',
        color: 'from-purple-500 to-pink-500',
        glow: 'rgba(168, 85, 247, 0.4)',
        icon: ShoppingBag,
        type: 'Software',
        status: 'Live',
        features: ['Real-Time IoT Telemetry', 'Route Refill Optimization', 'Cashless UPI / Card Terminal'],
        detailedFeatures: [
            { title: 'Live Machine Telemetry', description: 'Monitor temperature, stock levels per spiral/tray, and machine uptime in real time.' },
            { title: 'Smart Stock Refill Dispatch', description: 'Generate replenishment pick-lists for route operators before machines run empty.' },
            { title: 'Cashless Revenue Analytics', description: 'Track digital sales, dispense success rates, and product profit margins instantly.' }
        ],
        howItWorks: [
            { icon: ShoppingBag, title: 'Connect Vending Fleet', description: 'Integrate smart vending units via IoT MDB protocol to central cloud dashboard.' },
            { icon: Layers, title: 'Monitor Stock & Sales Live', description: 'View live inventory across all locations and receive low-stock refill alerts.' },
            { icon: Truck, title: 'Optimize Restock Routes', description: 'Automate driver delivery routes to refill machines based on predictive demand.' }
        ],
        topSelling: true,
        techStack: { frontend: ['React', 'Tailwind CSS'], backend: ['Node.js', 'Python'], database: ['MongoDB'], infrastructure: ['AWS', 'IoT Core'], integrations: ['MDB Protocol', 'UPI Gateway'] }
    },
    {
        id: 221,
        name: 'Wedding Photography & Cinematography Studio',
        category: 'Events',
        desc: 'Luxury wedding photography showcase, portfolio gallery, and client booking platform.',
        link: 'https://wedding-photography-website.kiaansoftwaredemo.shop',
        youtube: '',
        color: 'from-rose-500 to-amber-500',
        glow: 'rgba(244, 63, 94, 0.4)',
        icon: ShoppingBag,
        type: 'Website',
        status: 'Live',
        features: ['Cinematic Portfolio Showcase', 'Interactive Client Booking', 'Custom Package Selection'],
        detailedFeatures: [
            { title: 'Portfolio Showcase', description: 'Curated high-resolution wedding galleries, pre-wedding shoot films, and story reels.' },
            { title: 'Custom Package Builder', description: 'Client package selection for photography, cinematography, drone coverage, and custom albums.' },
            { title: 'Inquiry & Slot Booking', description: 'Real-time wedding date availability checker with digital booking inquiry workflow.' }
        ],
        howItWorks: [
            { icon: ShoppingBag, title: 'Explore Wedding Stories', description: 'Couples browse recent wedding galleries, cinematic films, and client testimonials.' },
            { icon: Calendar, title: 'Select Date & Services', description: 'Pick wedding dates, events (Mehendi, Sangeet, Reception), and custom camera crew requirements.' },
            { icon: CheckCircle2, title: 'Book Consultation & Shoot', description: 'Lock event dates with instant digital confirmation and customized wedding roadmap.' }
        ],
        topSelling: true,
        techStack: { frontend: ['React', 'Tailwind CSS'], backend: ['Node.js'], database: ['MongoDB'], infrastructure: ['AWS'], integrations: [] }
    },
    {
        id: 222,
        name: 'Medicare Hospital & Healthcare Management Platform',
        category: 'Health',
        desc: 'Modern hospital management system with doctor appointment booking, patient portal, and OPD/IPD workflows.',
        link: 'https://medicare.kiaansoftwaredemo.shop',
        youtube: '',
        color: 'from-cyan-500 to-blue-600',
        glow: 'rgba(6, 182, 212, 0.4)',
        icon: Activity,
        type: 'Web App',
        status: 'Live',
        features: ['Doctor Specialization Directory', 'Online Appointment Booking', 'Digital Health Records & OPD'],
        detailedFeatures: [
            { title: 'Doctor Directory & Rosters', description: 'Browse specialist physicians, surgeons, OPD duty timings, and consultation fee structures.' },
            { title: 'Appointment Scheduling', description: 'Instant slot booking for in-clinic OPD consultations and diagnostic laboratory tests.' },
            { title: 'Electronic Medical Records', description: 'Unified patient clinical history, prescription generation, and diagnostic test reports.' }
        ],
        howItWorks: [
            { icon: Users, title: 'Find Specialist Doctor', description: 'Search doctors by department (Cardiology, Orthopedics, Pediatrics) and available OPD slots.' },
            { icon: Calendar, title: 'Book Instant Slot', description: 'Select preferred timing, enter patient details, and receive automated booking token.' },
            { icon: Activity, title: 'Manage Consultations & Records', description: 'Doctors access patient vitals and issue digital prescriptions from their console.' }
        ],
        topSelling: true,
        techStack: { frontend: ['React', 'Tailwind CSS'], backend: ['Node.js'], database: ['PostgreSQL'], infrastructure: ['AWS'], integrations: [] }
    },
    {
        id: 223,
        name: 'Society Maintenance & Resident Service Portal',
        category: 'Real Estate',
        desc: 'Comprehensive residential society, HOA maintenance billing, gate pass, and community management platform.',
        link: 'https://society-maintenance-service.kiaansoftwaredemo.shop',
        youtube: '',
        color: 'from-emerald-500 to-teal-600',
        glow: 'rgba(16, 185, 129, 0.4)',
        icon: Home,
        type: 'Web App',
        status: 'Live',
        features: ['Monthly Maintenance Invoicing', 'Visitor Gate Pass Management', 'Resident Helpdesk & Tickets'],
        detailedFeatures: [
            { title: 'Automated Billing & Dues', description: 'Generate monthly society maintenance invoices, penalty calculation, and digital payment receipts.' },
            { title: 'Visitor Gate Access', description: 'Digital visitor check-in, OTP entry passes, and delivery vehicle logging for security staff.' },
            { title: 'Helpdesk & Complaints', description: 'Resident ticketing system for electrical, plumbing, clubhouse, and facility repair requests.' }
        ],
        howItWorks: [
            { icon: Home, title: 'Resident & Flat Registration', description: 'Flat owners and tenants access individualized account to view society announcements.' },
            { icon: DollarSign, title: 'Pay Monthly Dues', description: 'Pay maintenance dues instantly through integrated gateways with zero accounting friction.' },
            { icon: CheckCircle2, title: 'Raise & Track Tickets', description: 'Submit maintenance service requests and track resolution by society staff in real-time.' }
        ],
        topSelling: true,
        techStack: { frontend: ['React', 'Tailwind CSS'], backend: ['Node.js'], database: ['MongoDB'], infrastructure: ['AWS'], integrations: [] }
    },
    {
        id: 100,
        name: 'FloraBloom - Online Flower Boutique',
        category: 'Retail',
        desc: 'A premium, highly interactive online floral boutique specializing in designer bouquets, luxury gifting, and streamlined local delivery management.',
        link: 'https://flower-boutique01.netlify.app/',
        youtube: '',
        color: 'from-rose-400 to-pink-500',
        glow: 'rgba(244, 63, 94, 0.4)',
        icon: ShoppingBag,
        type: 'Web App',
        status: 'Live',
        features: ['Designer Flower Catalog', 'Bouquet Customizer', 'Order Tracking'],
        detailedFeatures: [
            { title: 'Exquisite Catalog', description: 'Showcase luxury flowers and seasonal collections with stunning high-resolution details.' },
            { title: 'Custom Gifting Services', description: 'Enable buyers to create bespoke arrangements, add custom notes, and select premium packaging.' },
            { title: 'Local Delivery System', description: 'Optimize delivery paths and slots to guarantee the freshness of flowers upon arrival.' }
        ],
        howItWorks: [
            { icon: ShoppingBag, title: 'Browse Premium Bouquets', description: 'Explore uniquely curated floral arrangements categorized by occasion, size, and flower type.' },
            { icon: Layers, title: 'Personalize & Customize', description: 'Customize your floral bouquet, add personalized gift tags, luxury greeting cards, or special wraps.' },
            { icon: Activity, title: 'Track Fresh Delivery', description: 'Place your order and follow its journey with continuous updates from sorting to handoff.' }
        ],
        topSelling: true,
        techStack: { frontend: ['React', 'Tailwind CSS'], backend: ['Node.js'], database: ['MongoDB'], infrastructure: ['Netlify'], integrations: [] }
    },
    {
        id: 35,
        name: 'Smart Toy Retail Management System',
        category: 'Retail',
        desc: 'Toy business management and product showcase platform.',
        link: 'https://toy-ui.kiaansoftware.com',
        youtube: '',
        color: 'from-pink-400 to-yellow-400',
        glow: 'rgba(244, 114, 182, 0.4)',
        icon: ShoppingBag,
        type: 'Web App',
        status: 'Live',
        features: ['Toy Catalog', 'Product Display', 'Sales Visibility'],
        detailedFeatures: [
            { title: 'Catalog Showcase', description: 'Display toy collections with organized categories and product details.' },
            { title: 'Inventory Overview', description: 'Monitor product availability and stock visibility in one place.' },
            { title: 'Sales Flow', description: 'Support order handling and product-level sales monitoring.' }
        ],
        howItWorks: [
            { icon: ShoppingBag, title: 'Browse toys by category', description: 'Shoppers or staff open the catalog and filter by age group, brand, or product type—like a real store aisle online.' },
            { icon: Layers, title: 'See what is in stock', description: 'Each product shows availability so you know what you can sell today without checking spreadsheets.' },
            { icon: Activity, title: 'Follow orders and sales', description: 'Track which items move fastest and how orders progress from cart to fulfilled.' }
        ],
        topSelling: true,
        techStack: { frontend: ['React'], backend: ['Node.js'], database: ['MongoDB'], infrastructure: ['AWS'], integrations: [] }
    },
    {
        id: 37,
        name: 'Health Sakhi - Digital Health Assistant Platform',
        category: 'Health',
        desc: 'Healthcare outreach, community health records, and field care coordination platform.',
        link: 'http://health-sakhi-demo.kiaansoftwaredemo.shop/',
        youtube: '',
        color: 'from-rose-400 to-pink-500',
        glow: 'rgba(244, 63, 94, 0.4)',
        icon: Activity,
        type: 'Software',
        status: 'Live',
        features: ['Health Records', 'Field Coordination', 'Care Tracking'],
        detailedFeatures: [
            { title: 'Beneficiary Profiles', description: 'Maintain health-related records and service history for beneficiaries.' },
            { title: 'Outreach Coordination', description: 'Track field-level healthcare visits and follow-up activities.' },
            { title: 'Program Monitoring', description: 'Measure service delivery and case progress across teams.' }
        ],
        howItWorks: [
            { icon: Users, title: 'Register each beneficiary', description: 'Field teams capture who was served, basic health context, and history in one structured profile.' },
            { icon: ClipboardList, title: 'Plan visits and follow-ups', description: 'Schedule outreach, assign workers, and see which communities are due for the next touchpoint.' },
            { icon: Activity, title: 'Report program impact', description: 'Leaders view coverage, visits completed, and trends—without waiting for manual reports.' }
        ],
        techStack: { frontend: ['React'], backend: ['Node.js'], database: ['PostgreSQL'], infrastructure: ['AWS'], integrations: [] }
    },
    {
        id: 38,
        name: 'Agriculture Supply Chain Management System',
        category: 'Enterprise',
        desc: 'Agro operations and project management platform.',
        link: 'http://freewayagro.kiaansoftware.com',
        youtube: '',
        color: 'from-lime-500 to-green-600',
        glow: 'rgba(101, 163, 13, 0.4)',
        icon: Briefcase,
        type: 'Website',
        status: 'Live',
        features: ['Project Tracking', 'Operations Visibility', 'Activity Monitoring'],
        detailedFeatures: [
            { title: 'Project Dashboard', description: 'View ongoing agro initiatives and operational summaries.' },
            { title: 'Task Coordination', description: 'Track execution steps and team responsibilities across projects.' },
            { title: 'Performance Review', description: 'Monitor milestones, updates, and progress snapshots.' }
        ],
        howItWorks: [
            { icon: Monitor, title: 'Open the operations dashboard', description: 'See all active agro projects, key dates, and status in one place—no scattered spreadsheets.' },
            { icon: ClipboardList, title: 'Assign and track field work', description: 'Break work into tasks, owners, and deadlines so everyone knows what happens next on the ground.' },
            { icon: CheckCircle2, title: 'Review milestones', description: 'Managers check progress against plans and spot delays before they become costly.' }
        ],
        techStack: { frontend: ['React'], backend: ['Node.js'], database: ['MongoDB'], infrastructure: ['AWS'], integrations: [] }
    },
    {
        id: 40,
        name: 'Agricultural Vehicle Rental & Fleet System',
        category: 'Enterprise',
        desc: 'Farmer-facing portal for tractor services, connections, and agri workflows.',
        link: 'https://tractorlink.netlify.app/farmer',
        youtube: '',
        color: 'from-green-600 to-emerald-600',
        glow: 'rgba(22, 163, 74, 0.4)',
        icon: Truck,
        type: 'Web App',
        status: 'Live',
        features: ['Farmer Dashboard', 'Service Discovery', 'Operational Workflows'],
        detailedFeatures: [
            { title: 'Farmer Experience', description: 'Dedicated farmer flows to explore tractor-related services and resources in one place.' },
            { title: 'Connection Hub', description: 'Link farmers with the right services and touchpoints across the agri value chain.' },
            { title: 'Live Preview', description: 'Try the deployed experience on Netlify with the farmer route.' }
        ],
        howItWorks: [
            { icon: Home, title: 'Start on the farmer home', description: 'Farmers land on a simple portal built for them—not a generic admin screen—so they immediately see relevant options.' },
            { icon: Truck, title: 'Explore tractor and service options', description: 'Browse listings, requests, or workflows tied to equipment and farm needs without technical training.' },
            { icon: Share2, title: 'Connect to the next step', description: 'Whether booking, enquiring, or tracking a request, the flow guides the farmer to the right action.' }
        ],
        techStack: { frontend: ['React'], backend: ['Node.js'], database: ['MongoDB'], infrastructure: ['Netlify'], integrations: [] }
    },

    {
        id: 20,
        name: 'Event & Carnival Operations Management',
        category: 'Events',
        desc: 'End-to-end carnival and event operations platform.',
        link: 'https://carnival-management.kiaansoftware.com',
        youtube: '',
        color: 'from-pink-500 to-rose-500',
        glow: 'rgba(244, 63, 94, 0.4)',
        icon: Calendar,
        type: 'Web App',
        status: 'Live',
        features: ['Event Planning', 'Vendor Coordination', 'Ticket Tracking'],
        detailedFeatures: [
            { title: 'Event Setup', description: 'Create and manage multiple carnival events from one dashboard.' },
            { title: 'Vendor Allocation', description: 'Assign stalls, utilities, and access permissions to vendors.' },
            { title: 'Visitor Monitoring', description: 'Track attendance and daily operational metrics in real-time.' }
        ],
        howItWorks: [
            { icon: Calendar, title: 'Create or select an event', description: 'Define dates, zones, and basics once; reuse the template for recurring carnivals or fairs.' },
            { icon: Users, title: 'Onboard vendors and stalls', description: 'Allocate spaces, permissions, and utilities so each vendor knows where to set up.' },
            { icon: Activity, title: 'Run day-of operations', description: 'Monitor footfall, issues, and ticket or entry metrics live while the event is on.' }
        ],
        techStack: { frontend: ['React', 'Tailwind CSS'], backend: ['Node.js'], database: ['PostgreSQL'], infrastructure: ['AWS'], integrations: [] }
    },
    {
        id: 21,
        name: 'Business Workflow Management System',
        category: 'Enterprise',
        desc: 'Business workflow and operations management suite.',
        link: 'https://cloveo.kiaansoftware.com',
        youtube: '',
        color: 'from-violet-500 to-purple-500',
        glow: 'rgba(168, 85, 247, 0.4)',
        icon: Briefcase,
        type: 'Web App',
        status: 'Live',
        features: ['Workflow Automation', 'Task Monitoring', 'Team Collaboration'],
        detailedFeatures: [
            { title: 'Workflow Builder', description: 'Design and automate multi-step business processes.' },
            { title: 'Role-Based Views', description: 'Provide department-specific dashboards and actions.' },
            { title: 'Execution Insights', description: 'Track process bottlenecks and completion trends.' }
        ],
        howItWorks: [
            { icon: Layers, title: 'Map your process', description: 'Lay out approvals, handoffs, and steps the way work actually happens—not how a generic form assumes it works.' },
            { icon: Users, title: 'Teams work from their view', description: 'Each role sees only the tasks and data they need, which cuts noise and mistakes.' },
            { icon: Activity, title: 'Spot delays early', description: 'Dashboards show what is stuck, what is on time, and where to intervene.' }
        ],
        techStack: { frontend: ['React'], backend: ['Node.js'], database: ['MongoDB'], infrastructure: ['AWS'], integrations: [] }
    },
    {
        id: 22,
        name: 'Physiotherapy Clinic Management System',
        category: 'Health',
        desc: 'Clinic operations platform for appointments and patient care.',
        link: 'https://deephysio-clinic.kiaansoftware.com',
        youtube: '',
        color: 'from-cyan-500 to-blue-500',
        glow: 'rgba(14, 165, 233, 0.4)',
        icon: Activity,
        type: 'Web App',
        status: 'Live',
        features: ['Appointment Scheduling', 'Patient Records', 'Treatment Logs'],
        detailedFeatures: [
            { title: 'Appointment Desk', description: 'Manage consultations and follow-ups with calendar views.' },
            { title: 'Patient Profiles', description: 'Store clinical notes, history, and treatment plans.' },
            { title: 'Session Tracking', description: 'Track physiotherapy sessions and recovery progress.' }
        ],
        howItWorks: [
            { icon: Calendar, title: 'Book or reschedule visits', description: 'Front desk and clinicians share one calendar so patients get clear slots and fewer no-shows.' },
            { icon: Users, title: 'Open the patient record', description: 'History, notes, and treatment plans stay in one profile—easy to review before each session.' },
            { icon: ClipboardList, title: 'Log each session', description: 'Document what was done and track progress over time for better continuity of care.' }
        ],
        techStack: { frontend: ['React'], backend: ['Node.js'], database: ['PostgreSQL'], infrastructure: ['AWS'], integrations: [] }
    },
    {
        id: 24,
        name: 'Insurance Policy & Claims Management',
        category: 'Finance / Banking',
        desc: 'Insurance policy administration and claims management system.',
        link: 'https://insurance-managmenet.kiaansoftware.com',
        youtube: '',
        color: 'from-emerald-500 to-teal-500',
        glow: 'rgba(16, 185, 129, 0.4)',
        icon: Shield,
        type: 'Software',
        status: 'Live',
        features: ['Policy Lifecycle', 'Claims Workflow', 'Agent Panel'],
        detailedFeatures: [
            { title: 'Policy Engine', description: 'Create, renew, and manage customer policies with ease.' },
            { title: 'Claims Processing', description: 'Track claim submission, verification, and settlement stages.' },
            { title: 'Agent Dashboard', description: 'Enable agents to manage leads, renewals, and commissions.' }
        ],
        howItWorks: [
            { icon: Shield, title: 'Issue or renew a policy', description: 'Underwriters and agents capture cover, premiums, and documents in a structured policy record.' },
            { icon: ClipboardList, title: 'File and track a claim', description: 'Customers or staff log claims; the system moves them through review, approval, and payout stages visibly.' },
            { icon: Users, title: 'Agents manage their book', description: 'Producers see renewals, commissions, and leads in one workspace instead of juggling spreadsheets.' }
        ],
        topSelling: true,
        techStack: { frontend: ['React'], backend: ['Node.js'], database: ['PostgreSQL'], infrastructure: ['AWS'], integrations: [] }
    },
    {
        id: 42,
        name: 'Digital Lending & Loan Automation Suite',
        category: 'Finance / Banking',
        desc: 'Loan servicing and borrower workflow demo for end-to-end lending operations.',
        link: 'http://loanfistdemo.kiaansoftware.com/',
        youtube: '',
        color: 'from-green-500 to-emerald-600',
        glow: 'rgba(34, 197, 94, 0.4)',
        icon: DollarSign,
        type: 'Web App',
        status: 'Live',
        features: ['Borrower Journey', 'Disbursement Flow', 'Repayment Tracking'],
        detailedFeatures: [
            { title: 'Borrower Onboarding', description: 'Capture borrower details and eligibility inputs in a guided digital flow.' },
            { title: 'Lending Operations', description: 'Track approvals, disbursement stages, and loan account activation from one panel.' },
            { title: 'Recovery Visibility', description: 'Monitor repayment status, overdue buckets, and follow-up activity in real time.' }
        ],
        howItWorks: [
            { icon: Users, title: 'Start borrower profile', description: 'Create borrower records with basic documents and details to kick off lending evaluation.' },
            { icon: CheckCircle2, title: 'Approve and release funds', description: 'Teams review eligibility, approve the case, and move the loan into disbursed status.' },
            { icon: Activity, title: 'Track repayments and dues', description: 'EMI schedules and overdue trends stay visible so collections and risk teams can act quickly.' }
        ],
        techStack: { frontend: ['React'], backend: ['Node.js'], database: ['MongoDB'], infrastructure: ['AWS'], integrations: [] }
    },
    {
        id: 26,
        name: 'Modern Service Business Management System',
        category: 'Professional',
        desc: 'Service business management for bookings and operations.',
        link: 'http://mordern-service.kiaansoftware.com',
        youtube: '',
        color: 'from-sky-500 to-cyan-500',
        glow: 'rgba(56, 189, 248, 0.4)',
        icon: Settings,
        type: 'Web App',
        status: 'Live',
        features: ['Booking Management', 'Technician Allocation', 'Service Tracking'],
        detailedFeatures: [
            { title: 'Service Booking', description: 'Capture and manage incoming service requests quickly.' },
            { title: 'Resource Assignment', description: 'Allocate technicians and teams based on skills.' },
            { title: 'Execution Reports', description: 'Monitor completion status and customer feedback.' }
        ],
        howItWorks: [
            { icon: MousePointer2, title: 'Customer books a service', description: 'Requests enter the system with time window, location, and service type—no lost phone messages.' },
            { icon: Users, title: 'Assign the right crew', description: 'Dispatchers match skills and availability so the job is done by someone qualified.' },
            { icon: CheckCircle2, title: 'Mark job complete', description: 'Teams close jobs with status and notes; managers see backlog and customer satisfaction trends.' }
        ],
        techStack: { frontend: ['React'], backend: ['Node.js'], database: ['MongoDB'], infrastructure: ['AWS'], integrations: [] }
    },
    {
        id: 27,
        name: 'ERP & Business Workflow Management',
        category: 'Enterprise',
        desc: 'Business operations software for integrated management.',
        link: 'https://oddo-sh.kiaansoftware.com',
        youtube: '',
        color: 'from-purple-500 to-indigo-500',
        glow: 'rgba(139, 92, 246, 0.4)',
        icon: Layers,
        type: 'Software',
        status: 'Live',
        features: ['Operations Hub', 'Team Controls', 'Data Visibility'],
        detailedFeatures: [
            { title: 'Unified Dashboard', description: 'Track operations from a centralized control panel.' },
            { title: 'Process Modules', description: 'Run key departments with configurable modules.' },
            { title: 'Management Reports', description: 'Get daily operational summaries and trends.' }
        ],
        howItWorks: [
            { icon: Monitor, title: 'See the whole business at a glance', description: 'Leadership opens one dashboard for orders, inventory, finance signals, or other modules you enable.' },
            { icon: Layers, title: 'Work inside the right module', description: 'Teams use the section that matches their job—sales, warehouse, HR—without unrelated clutter.' },
            { icon: Activity, title: 'Review daily and weekly trends', description: 'Built-in summaries help you decide what to fix or scale without building custom reports first.' }
        ],
        techStack: { frontend: ['React'], backend: ['Node.js'], database: ['PostgreSQL'], infrastructure: ['AWS'], integrations: [] }
    },
    {
        id: 28,
        name: 'Painting Service Booking & Job Management',
        category: 'Professional',
        desc: 'Painting service management for leads, jobs, and billing.',
        link: 'https://painting.kiaansoftware.com',
        youtube: '',
        color: 'from-orange-500 to-amber-500',
        glow: 'rgba(249, 115, 22, 0.4)',
        icon: Briefcase,
        type: 'Website',
        status: 'Live',
        features: ['Lead Intake', 'Estimate Builder', 'Job Scheduling'],
        detailedFeatures: [
            { title: 'Inquiry Pipeline', description: 'Capture customer inquiries and convert to work orders.' },
            { title: 'Quotation Management', description: 'Generate painting estimates with material and labor costs.' },
            { title: 'Execution Calendar', description: 'Plan crew schedules and monitor project completion.' }
        ],
        howItWorks: [
            { icon: MousePointer2, title: 'Capture the lead', description: 'Phone, web, or walk-in inquiries become records so nothing falls through the cracks.' },
            { icon: ClipboardList, title: 'Send a clear quote', description: 'Build estimates with labor and materials; customers see a professional breakdown before they say yes.' },
            { icon: Calendar, title: 'Schedule crews and jobs', description: 'Once approved, jobs hit the calendar with crew assignments until the project is done.' }
        ],
        techStack: { frontend: ['React'], backend: ['Node.js'], database: ['MongoDB'], infrastructure: ['AWS'], integrations: [] }
    },
    {
        id: 29,
        name: 'E-Commerce Sales Management Platform',
        category: 'Retail',
        desc: 'Online product selling and order lifecycle platform.',
        link: 'https://product-selling.kiaansoftware.com',
        youtube: '',
        color: 'from-yellow-400 to-orange-500',
        glow: 'rgba(245, 158, 11, 0.4)',
        icon: ShoppingBag,
        type: 'Web App',
        status: 'Live',
        features: ['Catalog Management', 'Order Tracking', 'Payment Integration'],
        detailedFeatures: [
            { title: 'Storefront Setup', description: 'Create product listings with categories and variants.' },
            { title: 'Order Workflow', description: 'Track order processing from placement to delivery.' },
            { title: 'Sales Insights', description: 'View sales performance and customer buying patterns.' }
        ],
        howItWorks: [
            { icon: ShoppingBag, title: 'Shop the catalog', description: 'Buyers browse categories, variants, and prices—the same flow as a modern e-commerce site.' },
            { icon: ClipboardList, title: 'Place and pay for orders', description: 'Checkout captures shipping and payment; the order moves into fulfillment automatically.' },
            { icon: Truck, title: 'Track through delivery', description: 'Operations and customers follow status from packed to shipped to delivered.' }
        ],
        techStack: { frontend: ['React'], backend: ['Node.js'], database: ['PostgreSQL'], infrastructure: ['AWS'], integrations: [] }
    },
    {
        id: 30,
        name: 'Property Management & Accounting System',
        category: 'Real Estate',
        desc: 'Property listing and management platform.',
        link: 'https://property1.kiaansoftware.com',
        youtube: '',
        color: 'from-blue-500 to-cyan-500',
        glow: 'rgba(6, 182, 212, 0.4)',
        icon: Home,
        type: 'Software',
        status: 'Live',
        features: ['Property Records', 'Tenant Handling', 'Rent Monitoring'],
        detailedFeatures: [
            { title: 'Property Registry', description: 'Manage all properties and units from one place.' },
            { title: 'Occupancy Tracking', description: 'Monitor tenant occupancy and lease periods.' },
            { title: 'Revenue Oversight', description: 'Track rent collections and overdue balances.' }
        ],
        howItWorks: [
            { icon: Home, title: 'Register buildings and units', description: 'Add each asset once with floors, units, and ownership or management context.' },
            { icon: Users, title: 'Link tenants and leases', description: 'Know who occupies which unit, lease start and end, and key contacts.' },
            { icon: DollarSign, title: 'Monitor rent and dues', description: 'See what is collected, pending, or overdue without reconciling multiple ledgers.' }
        ],
        techStack: { frontend: ['React'], backend: ['Node.js'], database: ['PostgreSQL'], infrastructure: ['AWS'], integrations: [] }
    },
    {
        id: 41,
        name: 'Legal Case & Law Firm Management System',
        category: 'Professional',
        desc: 'Legal case lifecycle platform for firms to manage matters, hearings, and documentation.',
        link: 'https://legal-case-ui.softwaredemolive.live',
        youtube: '',
        color: 'from-indigo-500 to-violet-500',
        glow: 'rgba(99, 102, 241, 0.4)',
        icon: Shield,
        type: 'Web App',
        status: 'Live',
        features: ['Case Tracking', 'Hearing Calendar', 'Document Workflow'],
        detailedFeatures: [
            { title: 'Matter Dashboard', description: 'Track each case with client context, status, and key legal milestones.' },
            { title: 'Hearing Scheduling', description: 'Plan upcoming hearings and monitor deadlines from a unified calendar.' },
            { title: 'Document Control', description: 'Organize legal files, notes, and updates for faster case preparation.' }
        ],
        howItWorks: [
            { icon: ClipboardList, title: 'Register and organize cases', description: 'Each client matter is created once with key details so advocates can work from a single source of truth.' },
            { icon: Calendar, title: 'Manage court dates and reminders', description: 'Hearings and deadlines are scheduled clearly, helping teams avoid missed dates.' },
            { icon: Shield, title: 'Collaborate on legal documents', description: 'Team members update case notes and documents in one workflow for better case readiness.' }
        ],
        techStack: { frontend: ['React'], backend: ['Node.js'], database: ['MongoDB'], infrastructure: ['AWS'], integrations: [] }
    },
    {
        id: 43,
        name: 'Survey & Field Data Collection Platform',
        category: 'Enterprise',
        desc: 'Advanced survey and feedback management platform for data collection and real-time analysis.',
        link: 'http://surveymate.kiaansoftware.com/',
        youtube: '',
        color: 'from-blue-400 to-indigo-500',
        glow: 'rgba(56, 189, 248, 0.4)',
        icon: ClipboardList,
        type: 'Web App',
        status: 'Live',
        features: ['Custom Surveys', 'Data Analytics', 'Response Tracking'],
        detailedFeatures: [
            { title: 'Dynamic Surveys', description: 'Create complex surveys with branching logic and multiple question types.' },
            { title: 'Real-time Analytics', description: 'Transform raw responses into actionable insights with automated reporting.' },
            { title: 'Targeted Outreach', description: 'Distribute surveys via multiple channels and track participation rates.' }
        ],
        howItWorks: [
            { icon: ClipboardList, title: 'Build your survey', description: 'Design questionnaires using a drag-and-drop builder with enterprise-grade logic.' },
            { icon: Share2, title: 'Distribute to audience', description: 'Send your survey via mail, link, or embed it directly into your platform.' },
            { icon: Activity, title: 'Analyze results live', description: 'Monitor incoming data in real-time and export detailed reports for your stakeholders.' }
        ],
        techStack: { frontend: ['React'], backend: ['Node.js'], database: ['MongoDB'], infrastructure: ['AWS'], integrations: [] }
    },
    {
        id: 44,
        name: 'Advanced Clinic Management System',
        category: 'Health',
        desc: 'Comprehensive clinic operations and patient lifecycle management platform.',
        link: 'https://clinic-pro.softwaredemolive.live',
        youtube: '',
        color: 'from-blue-400 to-cyan-500',
        glow: 'rgba(34, 211, 238, 0.4)',
        icon: Activity,
        type: 'Web App',
        status: 'Live',
        features: ['Patient Records', 'Appointment Scheduling', 'Billing & Invoicing'],
        detailedFeatures: [
            { title: 'Patient Data Management', description: 'Securely manage electronic health records and patient history.' },
            { title: 'Smart Scheduling', description: 'Efficiently handle appointments and doctor availability.' },
            { title: 'Medical Billing', description: 'Streamline invoicing and payment tracking for clinic services.' }
        ],
        howItWorks: [
            { icon: Activity, title: 'Register Patients', description: 'Quickly onboard patients and maintain their medical records.' },
            { icon: Calendar, title: 'Manage Appointments', description: 'Book and track consultations with ease.' },
            { icon: DollarSign, title: 'Automated Billing', description: 'Generate invoices and track payments automatically.' }
        ],
        techStack: { frontend: ['React'], backend: ['Node.js'], database: ['PostgreSQL'], infrastructure: ['AWS'], integrations: [] }
    },
    {
        id: 45,
        name: 'Workforce & Employee Management Suite',
        category: 'Enterprise',
        desc: 'End-to-end workforce coordination and HR operations management suite.',
        link: 'https://employee-management-system.softwaredemolive.live',
        youtube: '',
        color: 'from-indigo-400 to-violet-500',
        glow: 'rgba(129, 140, 248, 0.4)',
        icon: Users,
        type: 'Web App',
        status: 'Live',
        features: ['Employee Directory', 'Attendance Tracking', 'Performance Management'],
        detailedFeatures: [
            { title: 'Workforce Hub', description: 'Centralized directory for all employee information and roles.' },
            { title: 'Attendance System', description: 'Track work hours, leaves, and shift schedules accurately.' },
            { title: 'Performance Reviews', description: 'Manage employee goals, appraisals, and feedback cycles.' }
        ],
        howItWorks: [
            { icon: Users, title: 'Onboard Workforce', description: 'Seamlessly add employees and assign roles within the organization.' },
            { icon: ClipboardList, title: 'Monitor Attendance', description: 'Track real-time attendance and manage leave requests.' },
            { icon: Briefcase, title: 'Evaluate Performance', description: 'Conduct reviews and monitor career growth paths.' }
        ],
        topSelling: true,
        techStack: { frontend: ['React'], backend: ['Node.js'], database: ['MongoDB'], infrastructure: ['AWS'], integrations: [] }
    },

    {
        id: 47,
        name: 'Event Planning & Operations Management System',
        category: 'Events',
        desc: 'Advanced planning and coordination platform for large-scale events and venues.',
        link: 'https://event-management.softwaredemolive.live/',
        youtube: '',
        color: 'from-purple-500 to-pink-500',
        glow: 'rgba(168, 85, 247, 0.4)',
        icon: Calendar,
        type: 'Web App',
        status: 'Live',
        features: ['Venue Booking', 'Attendee Management', 'Logistics Control'],
        detailedFeatures: [
            { title: 'Venue Scheduling', description: 'Manage multi-room bookings and space allocations from one calendar.' },
            { title: 'Digital Ticketing', description: 'Issue and scan event tickets with real-time entry tracking.' },
            { title: 'Resource Planning', description: 'Coordinate equipment, catering, and staff for specific event dates.' }
        ],
        howItWorks: [
            { icon: Calendar, title: 'Plan Event Setup', description: 'Define dates, zones, and capacity limits for your venue or event.' },
            { icon: Users, title: 'Manage Guest Lists', description: 'Track registrations, confirmations, and special requirements for attendees.' },
            { icon: Zap, title: 'On-site Execution', description: 'Run day-of operations with live status updates and task monitoring.' }
        ],
        techStack: { frontend: ['React'], backend: ['Node.js'], database: ['MongoDB'], infrastructure: ['AWS'], integrations: [] }
    },
    {
        id: 48,
        name: 'Garage & Workshop Management System',
        category: 'Professional',
        desc: 'Digital workshop operations, job cards, and inventory management for auto service centers.',
        link: 'https://garage-workshop.softwaredemolive.live',
        youtube: '',
        color: 'from-orange-500 to-red-500',
        glow: 'rgba(249, 115, 22, 0.4)',
        icon: Car,
        type: 'Web App',
        status: 'Live',
        features: ['Job Card Tracking', 'Inventory Management', 'Invoicing & Billing'],
        detailedFeatures: [
            { title: 'Digital Job Cards', description: 'Create and track vehicle repair status and technician assignments.' },
            { title: 'Spare Parts Inventory', description: 'Manage stock levels, reorders, and parts used in repairs.' },
            { title: 'Service Billing', description: 'Generate professional invoices for labor and spare parts.' }
        ],
        howItWorks: [
            { icon: Car, title: 'Inward Vehicle', description: 'Register vehicles and create digital job cards for repair requests.' },
            { icon: ClipboardList, title: 'Assign Technician', description: 'Allocate tasks and track work progress on the workshop floor.' },
            { icon: DollarSign, title: 'Finalize & Bill', description: 'Review completed work, apply parts used, and generate final invoice.' }
        ],
        techStack: { frontend: ['React'], backend: ['Node.js'], database: ['MongoDB'], infrastructure: ['AWS'], integrations: [] }
    },
    {
        id: 101,
        name: 'Premium Laundry & Dry Cleaning Suite',
        category: 'Professional',
        desc: 'A premium, modern on-demand laundry and dry-cleaning management ecosystem with smart booking calendars, garment tracking, and secure invoicing.',
        link: 'https://premium-laundry01.netlify.app/',
        youtube: '',
        color: 'from-blue-400 to-sky-500',
        glow: 'rgba(56, 189, 248, 0.4)',
        icon: Settings,
        type: 'Web App',
        status: 'Live',
        features: ['Smart Order Booking', 'Live Garment Tracking', 'Automated Invoices'],
        detailedFeatures: [
            { title: 'Interactive Booking Calendar', description: 'Schedule home pickups and deliveries with customizable time slots.' },
            { title: 'Garment Tracking Pipeline', description: 'Track every stage from sorting, washing, dry cleaning, ironing, to final dispatch.' },
            { title: 'Dynamic Price Calculator', description: 'Calculate live pricing based on garment types, service speeds, and custom requests.' }
        ],
        howItWorks: [
            { icon: Calendar, title: 'Book a Pickup', description: 'Select your preferred pickup window, services (dry clean, wash & fold), and garment details.' },
            { icon: ClipboardList, title: 'Operations & Processing', description: 'Garments are safely logged, tagged, processed through premium wash stages, and packaged.' },
            { icon: CheckCircle2, title: 'Home Delivery', description: 'Clean, fresh clothes are delivered right to your doorstep with an automated billing receipt.' }
        ],
        topSelling: true,
        techStack: { frontend: ['React', 'Tailwind CSS'], backend: ['Node.js'], database: ['MongoDB'], infrastructure: ['Netlify'], integrations: [] }
    },
    {
        id: 52,
        name: 'Property & Rental Management Platform',
        category: 'Real Estate',
        desc: 'Comprehensive property portfolio management, leasing, and tenant relationship suite.',
        link: 'https://property-peach-management.softwaredemolive.live',
        youtube: '',
        color: 'from-amber-400 to-orange-600',
        glow: 'rgba(251, 191, 36, 0.4)',
        icon: Home,
        type: 'Web App',
        status: 'Live',
        features: ['Property Inventory', 'Lease Management', 'Maintenance Tracking'],
        detailedFeatures: [
            { title: 'Unit Catalog', description: 'Organize buildings, floors, and individual units with detailed amenities.' },
            { title: 'Digital Leasing', description: 'Manage tenant applications, background checks, and digital lease signings.' },
            { title: 'Service Requests', description: 'Track maintenance issues from reporting to resolution with tenant updates.' }
        ],
        howItWorks: [
            { icon: Home, title: 'List Properties', description: 'Onboard your real estate portfolio with high-quality images and descriptions.' },
            { icon: Users, title: 'Manage Tenants', description: 'Handle tenant profiles, communications, and rent collection in one hub.' },
            { icon: DollarSign, title: 'Financial Oversight', description: 'Monitor rent rolls, expenses, and overall property ROI live.' }
        ],
        techStack: { frontend: ['React'], backend: ['Node.js'], database: ['PostgreSQL'], infrastructure: ['AWS'], integrations: [] }
    },
    {
        id: 53,
        name: 'Smart Queue & Token Management System',
        category: 'Enterprise',
        desc: 'Advanced digital queuing solution for streamlined customer flow and wait-time reduction.',
        link: 'https://queue-managment.softwaredemolive.live',
        youtube: '',
        color: 'from-cyan-500 to-blue-600',
        glow: 'rgba(6, 182, 212, 0.4)',
        icon: RefreshCcw,
        type: 'Web App',
        status: 'Live',
        features: ['Token Generation', 'Multi-Counter Support', 'Wait-time Analytics'],
        detailedFeatures: [
            { title: 'Digital Queuing', description: 'Issue physical or virtual tokens to customers upon arrival.' },
            { title: 'Counter Management', description: 'Direct customers to specific counters based on service type or agent availability.' },
            { title: 'Operational Insights', description: 'Analyze peak hours, average wait times, and staff efficiency.' }
        ],
        howItWorks: [
            { icon: MousePointer2, title: 'Customer Checks In', description: 'Visitors select services at a kiosk or via mobile to receive a unique token.' },
            { icon: Users, title: 'Queue Progression', description: 'Staff call tokens through a dashboard, updating digital displays in real-time.' },
            { icon: Activity, title: 'Monitor Flow', description: 'Managers track queue lengths and redistribute staff to reduce bottlenecking.' }
        ],
        techStack: { frontend: ['React'], backend: ['Node.js'], database: ['MongoDB'], infrastructure: ['AWS'], integrations: [] }
    },

    {
        id: 55,
        name: 'Truck Fleet & Transport Management System',
        category: 'Logistics',
        desc: 'End-to-end transport operations, real-time trip tracking, and fleet maintenance suite.',
        link: 'https://tuck-managment.softwaredemolive.live',
        youtube: '',
        color: 'from-emerald-600 to-teal-700',
        glow: 'rgba(16, 185, 129, 0.4)',
        icon: Truck,
        type: 'Web App',
        status: 'Live',
        features: ['Trip Tracking', 'Fuel Monitoring', 'Driver Dispatch'],
        detailedFeatures: [
            { title: 'Live Trip Monitoring', description: 'Track vehicle locations, routes, and ETAs in real-time on a map.' },
            { title: 'Fuel Analytics', description: 'Monitor fuel consumption, refills, and identify potential efficiency issues.' },
            { title: 'Driver Management', description: 'Assign trips, track driver hours, and manage performance scores.' }
        ],
        howItWorks: [
            { icon: Truck, title: 'Dispatch Fleet', description: 'Assign vehicles and drivers to specific orders and optimized routes.' },
            { icon: Activity, title: 'Track in Transit', description: 'Monitor live movement and receive alerts for delays or route deviations.' },
            { icon: CheckCircle2, title: 'Complete Delivery', description: 'Log arrival, upload proof of delivery, and finalize trip expenses.' }
        ],
        techStack: { frontend: ['React'], backend: ['Node.js'], database: ['MongoDB'], infrastructure: ['AWS'], integrations: [] }
    },
    {
        id: 56,
        name: 'Export Business & Trade Management System',
        category: 'Enterprise',
        desc: 'Advanced international trade platform for export documentation, logistics, and compliance.',
        link: 'https://workana-export.softwaredemolive.live',
        youtube: '',
        color: 'from-amber-600 to-yellow-700',
        glow: 'rgba(245, 158, 11, 0.4)',
        icon: Briefcase,
        type: 'Web App',
        status: 'Live',
        features: ['Export Documentation', 'Consignment Tracking', 'Compliance Check'],
        detailedFeatures: [
            { title: 'Smart Documentation', description: 'Generate invoices, packing lists, and shipping bills automatically.' },
            { title: 'Global Logistics', description: 'Track ocean and air freight consignments from warehouse to port.' },
            { title: 'Trade Compliance', description: 'Ensure all shipments meet international trade regulations and customs requirements.' }
        ],
        howItWorks: [
            { icon: ClipboardList, title: 'Manage Orders', description: 'Onboard export orders and link them to specific buyers and contracts.' },
            { icon: Truck, title: 'Coordinate Logistics', description: 'Manage freight bookings and track movement across international borders.' },
            { icon: Briefcase, title: 'Review Trade KPIs', description: 'Analyze export volumes, revenue, and compliance performance in one dashboard.' }
        ],
        techStack: { frontend: ['React'], backend: ['Node.js'], database: ['MongoDB'], infrastructure: ['AWS'], integrations: [] }
    },
    {
        id: 59,
        name: 'Advanced Property Management Suite',
        category: 'Real Estate',
        desc: 'High-end property ecosystem for portfolio analytics, lease automation, and vendor coordination.',
        link: 'https://propertythree.softwaredemolive.live',
        youtube: '',
        color: 'from-amber-500 to-orange-700',
        glow: 'rgba(245, 158, 11, 0.4)',
        icon: Home,
        type: 'Web App',
        status: 'Live',
        features: ['Property Analytics', 'Lease Automation', 'Vendor Management'],
        detailedFeatures: [
            { title: 'Portfolio Analytics', description: 'Gain deep insights into occupancy rates, revenue trends, and property performance.' },
            { title: 'Smart Lease Engine', description: 'Automate lease renewals, rent escalations, and digital signature workflows.' },
            { title: 'Vendor Portal', description: 'Coordinate with service providers for maintenance and facility management.' }
        ],
        howItWorks: [
            { icon: Layers, title: 'Onboard Portfolio', description: 'Import property data and link them to owners and management teams.' },
            { icon: Users, title: 'Engage Stakeholders', description: 'Communicate with tenants and vendors through an integrated messaging system.' },
            { icon: DollarSign, title: 'Track Financials', description: 'Monitor cash flow, budgets, and tax compliance across the entire portfolio.' }
        ],
        techStack: { frontend: ['React'], backend: ['Node.js'], database: ['MongoDB'], infrastructure: ['AWS'], integrations: [] }
    },
    {
        id: 62,
        name: 'Multi-Tenant SaaS Business Platform',
        category: 'SaaS',
        desc: 'Enterprise-grade multi-tenant architecture for scalable business operations and white-labeled services.',
        link: 'https://multi-tenant-saas.softwaredemolive.live',
        youtube: '',
        color: 'from-indigo-600 to-violet-700',
        glow: 'rgba(79, 70, 229, 0.4)',
        icon: Layers,
        type: 'Web App',
        status: 'Live',
        features: ['Subscription Management', 'Multi-Tenant Architecture', 'White-Labeling'],
        detailedFeatures: [
            { title: 'Tenant Isolation', description: 'Ensure complete data security and separation between different client organizations.' },
            { title: 'Subscription Engine', description: 'Manage flexible pricing tiers, trials, and automated recurring billing.' },
            { title: 'Custom Branding', description: 'Allow tenants to customize the interface with their own logos and brand colors.' }
        ],
        howItWorks: [
            { icon: Server, title: 'Instance Provisioning', description: 'New organizations sign up and receive a dedicated virtual workspace instantly.' },
            { icon: Lock, title: 'Role-Based Access', description: 'Admins define user roles and permissions within their specific tenant environment.' },
            { icon: Zap, title: 'Scale Operations', description: 'Monitor usage metrics and scale resources as tenant demands grow.' }
        ],
        topSelling: true,
        techStack: { frontend: ['React'], backend: ['Node.js'], database: ['MongoDB'], infrastructure: ['AWS'], integrations: [] }
    },
    {
        id: 63,
        name: 'Gym & Fitness Management System',
        category: 'Sports',
        desc: 'Comprehensive fitness operations suite for member tracking, workout planning, and automated billing.',
        link: 'https://gym.softwaredemolive.live',
        youtube: '',
        color: 'from-orange-600 to-red-700',
        glow: 'rgba(234, 88, 12, 0.4)',
        icon: Activity,
        type: 'Web App',
        status: 'Live',
        features: ['Member Tracking', 'Workout Planner', 'Subscription Billing'],
        detailedFeatures: [
            { title: 'Membership Portal', description: 'Manage member profiles, attendance, and renewal schedules efficiently.' },
            { title: 'Diet & Workout Logs', description: 'Provide personalized fitness plans and track daily progress for members.' },
            { title: 'Payment Gateway', description: 'Automate monthly fee collections and generate digital receipts.' }
        ],
        howItWorks: [
            { icon: Users, title: 'Join the Community', description: 'Members sign up and select fitness packages tailored to their goals.' },
            { icon: ClipboardList, title: 'Follow the Plan', description: 'Trainers assign workouts and track member consistency via the app.' },
            { icon: Activity, title: 'Analyze Progress', description: 'Review fitness milestones and adjust plans based on performance data.' }
        ],
        topSelling: true,
        techStack: { frontend: ['React'], backend: ['Node.js'], database: ['MongoDB'], infrastructure: ['AWS'], integrations: [] }
    },
    {
        id: 64,
        name: 'Logistics & Supply Chain Management Platform',
        category: 'Logistics',
        desc: 'End-to-end supply chain visibility and logistics operations suite for modern enterprise commerce.',
        link: 'http://logistic.softwaredemolive.live',
        youtube: '',
        color: 'from-blue-600 to-indigo-700',
        glow: 'rgba(37, 99, 235, 0.4)',
        icon: Truck,
        type: 'Web App',
        status: 'Live',
        features: ['Supply Chain Visibility', 'Inventory Optimization', 'Fleet Management'],
        detailedFeatures: [
            { title: 'End-to-End Tracking', description: 'Monitor goods movement from supplier to warehouse to customer in real-time.' },
            { title: 'Smart Inventory', description: 'Optimize stock levels using demand forecasting and automated reordering.' },
            { title: 'Route Optimization', description: 'Reduce fuel costs and delivery times with intelligent route planning.' }
        ],
        howItWorks: [
            { icon: Truck, title: 'Inbound Logistics', description: 'Manage supplier shipments and warehouse receiving operations.' },
            { icon: Activity, title: 'Process & Track', description: 'Monitor inventory movement and order fulfillment status live.' },
            { icon: CheckCircle2, title: 'Outbound Delivery', description: 'Coordinate dispatch and track last-mile delivery to the final destination.' }
        ],
        topSelling: true,
        techStack: { frontend: ['React'], backend: ['Node.js'], database: ['MongoDB'], infrastructure: ['AWS'], integrations: [] }
    },
    {
        id: 65,
        name: 'Student Recruitment & Visa Processing System',
        category: 'Enterprise',
        desc: 'Advanced education consultancy platform for student admissions and international visa processing.',
        link: 'https://studentrecruitmentvisa.softwaredemolive.live',
        youtube: '',
        color: 'from-violet-600 to-purple-700',
        glow: 'rgba(124, 58, 237, 0.4)',
        icon: Users,
        type: 'Web App',
        status: 'Live',
        features: ['Application Workflow', 'Visa Documentation', 'Agent Management'],
        detailedFeatures: [
            { title: 'Admissions Hub', description: 'Track student applications across multiple universities and programs.' },
            { title: 'Visa Tracking', description: 'Manage documentation and status updates for international student visas.' },
            { title: 'Partner Network', description: 'Coordinate with recruitment agents and partners through a secure portal.' }
        ],
        howItWorks: [
            { icon: Users, title: 'Onboard Students', description: 'Capture student profiles, academic history, and program preferences.' },
            { icon: ClipboardList, title: 'Process Application', description: 'Submit and track applications to partner institutions with automated status updates.' },
            { icon: Shield, title: 'Visa Coordination', description: 'Manage document checklists and interview schedules for visa processing.' }
        ],
        techStack: { frontend: ['React'], backend: ['Node.js'], database: ['PostgreSQL'], infrastructure: ['AWS'], integrations: [] }
    },
    {
        id: 67,
        name: 'Dental Clinic Management System',
        category: 'Health',
        desc: 'Advanced dental clinic operations, patient records, and specialized procedure tracking platform.',
        link: 'http://dentist.softwaredemolive.live',
        youtube: '',
        color: 'from-blue-400 to-indigo-500',
        glow: 'rgba(56, 189, 248, 0.4)',
        icon: Activity,
        type: 'Web App',
        status: 'Live',
        features: ['Patient Management', 'Appointment Booking', 'Clinical Records'],
        detailedFeatures: [
            { title: 'Patient Records', description: 'Maintain digital dental history and treatment plans for every patient.' },
            { title: 'Clinic Scheduling', description: 'Manage doctor availability and patient appointments seamlessly.' },
            { title: 'Billing System', description: 'Generate invoices for dental procedures and track payment status.' }
        ],
        howItWorks: [
            { icon: Activity, title: 'Record Patient Data', description: 'Store comprehensive dental history and diagnostic images in one place.' },
            { icon: Calendar, title: 'Book Consultations', description: 'Schedule dental visits and manage follow-ups via a unified calendar.' },
            { icon: DollarSign, title: 'Finalize Payments', description: 'Process procedure billing and maintain clinical revenue records.' }
        ],
        topSelling: true,
        techStack: { frontend: ['React'], backend: ['Node.js'], database: ['PostgreSQL'], infrastructure: ['AWS'], integrations: [] }
    },
    {
        id: 68,
        name: 'Hospital Inventory & Asset Management System',
        category: 'Health',
        desc: 'Comprehensive inventory and medical asset management for large-scale healthcare facilities.',
        link: 'https://hopistal-inventry.softwaredemolive.live',
        youtube: '',
        color: 'from-cyan-500 to-blue-600',
        glow: 'rgba(6, 182, 212, 0.4)',
        icon: ClipboardList,
        type: 'Web App',
        status: 'Live',
        features: ['Stock Tracking', 'Supply Requests', 'Inventory Analytics'],
        detailedFeatures: [
            { title: 'Medical Stock Control', description: 'Monitor medicine and equipment levels across hospital departments.' },
            { title: 'Supply Chain', description: 'Automate reordering processes for critical medical supplies.' },
            { title: 'Audit Trails', description: 'Maintain detailed records of stock movement and usage history.' }
        ],
        howItWorks: [
            { icon: Layers, title: 'Manage Stock', description: 'Track every medical item by batch and expiry date in real-time.' },
            { icon: Truck, title: 'Request Supplies', description: 'Departments raise digital requisitions for needed medicines or tools.' },
            { icon: Activity, title: 'Analyze Usage', description: 'Review consumption patterns to optimize hospital supply budgets.' }
        ],
        techStack: { frontend: ['React'], backend: ['Node.js'], database: ['MongoDB'], infrastructure: ['AWS'], integrations: [] }
    },
    {
        id: 69,
        name: 'Recruitment & Placement Management System',
        category: 'Professional',
        desc: 'End-to-end recruitment lifecycle and candidate placement platform for agencies.',
        link: 'http://placementservice.softwaredemolive.live',
        youtube: '',
        color: 'from-violet-500 to-purple-600',
        glow: 'rgba(139, 92, 246, 0.4)',
        icon: Users,
        type: 'Web App',
        status: 'Live',
        features: ['Candidate Profiles', 'Job Matching', 'Interview Tracking'],
        detailedFeatures: [
            { title: 'Candidate Portal', description: 'Allow job seekers to create professional profiles and upload resumes.' },
            { title: 'Smart Matching', description: 'Automatically link candidates to job openings based on skills and experience.' },
            { title: 'Recruitment Funnel', description: 'Track candidates through various interview stages to final placement.' }
        ],
        howItWorks: [
            { icon: Users, title: 'Onboard Candidates', description: 'Register job seekers and capture their skillsets and career goals.' },
            { icon: Briefcase, title: 'Match Job Roles', description: 'Employers list openings and the system suggests the best-fit talent.' },
            { icon: CheckCircle2, title: 'Finalize Hiring', description: 'Manage the entire interview process until the candidate is successfully placed.' }
        ],
        techStack: { frontend: ['React'], backend: ['Node.js'], database: ['PostgreSQL'], infrastructure: ['AWS'], integrations: [] }
    },
    {
        id: 70,
        name: 'Quality Assurance & Compliance Management System',
        category: 'Enterprise',
        desc: 'Industrial-grade quality monitoring and regulatory compliance management platform.',
        link: 'http://qualitymanagement.softwaredemolive.live',
        youtube: '',
        color: 'from-emerald-500 to-teal-600',
        glow: 'rgba(16, 185, 129, 0.4)',
        icon: Shield,
        type: 'Web App',
        status: 'Live',
        features: ['Quality Audits', 'Compliance Tracking', 'Performance Analysis'],
        detailedFeatures: [
            { title: 'Audit Management', description: 'Conduct and record regular quality audits across various departments.' },
            { title: 'Standards Compliance', description: 'Ensure operations meet international and industry-specific quality standards.' },
            { title: 'Issue Resolution', description: 'Track quality deviations and monitor corrective action progress.' }
        ],
        howItWorks: [
            { icon: ClipboardList, title: 'Initiate Audit', description: 'Define quality parameters and schedule inspections for specific processes.' },
            { icon: Activity, title: 'Monitor Compliance', description: 'Review audit results and flag areas that require quality improvements.' },
            { icon: Shield, title: 'Certify Standards', description: 'Generate compliance reports to maintain industry certifications.' }
        ],
        topSelling: true,
        techStack: { frontend: ['React'], backend: ['Node.js'], database: ['MongoDB'], infrastructure: ['AWS'], integrations: [] }
    },
    {
        id: 71,
        name: 'Salon & Spa Management System',
        category: 'Professional',
        desc: 'Premium salon and spa operations suite for luxury wellness centers and chains.',
        link: 'https://salon.softwaredemolive.live/',
        youtube: '',
        color: 'from-pink-500 to-rose-600',
        glow: 'rgba(236, 72, 153, 0.4)',
        icon: Star,
        type: 'Web App',
        status: 'Live',
        features: ['Appointment Booking', 'Staff Management', 'Inventory Control'],
        detailedFeatures: [
            { title: 'Service Bookings', description: 'Let clients book salon services and choose preferred stylists online.' },
            { title: 'Stylist Schedules', description: 'Manage staff shifts and service allocations from a central dashboard.' },
            { title: 'Client Loyalty', description: 'Maintain client history and run personalized marketing campaigns.' }
        ],
        howItWorks: [
            { icon: Calendar, title: 'Schedule Service', description: 'Clients pick dates and times for their beauty or grooming sessions.' },
            { icon: Users, title: 'Assign Stylists', description: 'The system matches bookings with available staff based on expertise.' },
            { icon: DollarSign, title: 'Checkout & Review', description: 'Finalize service billing and collect customer feedback for quality control.' }
        ],
        topSelling: true,
        techStack: { frontend: ['React'], backend: ['Node.js'], database: ['PostgreSQL'], infrastructure: ['AWS'], integrations: [] }
    },
    {
        id: 72,
        name: 'Sports Betting & Odds Management Platform',
        category: 'Sports',
        desc: 'Advanced sports betting analytics and real-time odds management platform for NBA and global sports.',
        link: 'https://betting.softwaredemolive.live',
        youtube: '',
        color: 'from-orange-500 to-red-600',
        glow: 'rgba(249, 115, 22, 0.4)',
        icon: DollarSign,
        type: 'Web App',
        status: 'Live',
        features: ['Game Analysis', 'Odds Tracking', 'Betting Operations'],
        detailedFeatures: [
            { title: 'Live Game Stats', description: 'Monitor NBA game data and team performance in real-time.' },
            { title: 'Betting Odds', description: 'Track shifting odds and market trends for upcoming games.' },
            { title: 'User Management', description: 'Manage betting profiles, transactions, and performance history.' }
        ],
        howItWorks: [
            { icon: Activity, title: 'Analyze Matchups', description: 'Review team stats and historical data to inform betting decisions.' },
            { icon: DollarSign, title: 'Place Operations', description: 'Manage betting stakes and track results across multiple games.' },
            { icon: Zap, title: 'Settle Bets', description: 'Automatically process payouts and update user balances post-game.' }
        ],
        techStack: { frontend: ['React'], backend: ['Node.js'], database: ['MongoDB'], infrastructure: ['AWS'], integrations: [] }
    },
    {
        id: 73,
        name: 'Customer Relationship Management System',
        category: 'Enterprise',
        desc: 'Specialized CRM for language academies to manage student inquiries, enrollment pipelines, course schedules, and batches.',
        link: 'https://english-crm.kiaansoftware.com',
        youtube: '',
        color: 'from-rose-500 to-red-600',
        glow: 'rgba(239, 68, 68, 0.4)',
        icon: Users,
        type: 'Web App',
        status: 'Live',
        features: ['Student Inquiries', 'Batch Scheduling', 'Enrollment Funnel'],
        detailedFeatures: [
            { title: 'Inquiry Management', description: 'Track prospective student inquiries, trial classes, and follow-up activities.' },
            { title: 'Batch & Course Planner', description: 'Schedule batches, assign instructors, and monitor student attendance.' },
            { title: 'Fee & Billing Tracking', description: 'Manage fee structures, installments, pending dues, and invoices.' }
        ],
        howItWorks: [
            { icon: Users, title: 'Capture Student Leads', description: 'Log student inquiries from website, walk-ins, or phone calls directly into the CRM.' },
            { icon: ClipboardList, title: 'Assign Batches & Schedules', description: 'Enroll students in appropriate language courses, batches, and timing slots.' },
            { icon: DollarSign, title: 'Monitor Payments & Progress', description: 'Track fee payment milestones and follow up on pending dues automatically.' }
        ],
        techStack: { frontend: ['React'], backend: ['Node.js'], database: ['MongoDB'], infrastructure: ['AWS'], integrations: [] }
    },
    {
        id: 74,
        name: 'Project & Workflow Management System',
        category: 'Enterprise',
        desc: 'Interactive project board, task management, and team collaboration workspace inspired by Monday.com.',
        link: 'https://mondaydotcom.kiaansoftware.com',
        youtube: '',
        color: 'from-indigo-500 to-violet-500',
        glow: 'rgba(99, 102, 241, 0.4)',
        icon: ClipboardList,
        type: 'Web App',
        status: 'Live',
        features: ['Project Boards', 'Team Collaboration', 'Workflow Automation'],
        detailedFeatures: [
            { title: 'Interactive Kanban Boards', description: 'Visualize work with drag-and-drop boards, timelines, and custom columns.' },
            { title: 'Team Collaboration', description: 'Share updates, files, and comments directly inside tasks in real-time.' },
            { title: 'Workflow Automations', description: 'Create custom triggers and actions to automate repetitive team tasks.' }
        ],
        howItWorks: [
            { icon: ClipboardList, title: 'Create Workspace & Boards', description: 'Set up boards for projects, departments, or marketing campaigns with customized fields.' },
            { icon: Users, title: 'Collaborate with the Team', description: 'Assign tasks, set due dates, and update statuses to keep everyone aligned.' },
            { icon: Activity, title: 'Track Real-time Progress', description: 'Monitor project completion, workload capacity, and bottlenecks on high-level dashboards.' }
        ],
        techStack: { frontend: ['React'], backend: ['Node.js'], database: ['MongoDB'], infrastructure: ['AWS'], integrations: [] }
    },
    {
        id: 75,
        name: 'Accounting Management Software',
        category: 'Finance / Banking',
        desc: 'Comprehensive business accounting, multi-ledger bookkeeping, and GST invoicing platform.',
        link: 'https://zirakbook-accounting.kiaansoftware.com',
        youtube: '',
        color: 'from-emerald-500 to-teal-500',
        glow: 'rgba(16, 185, 129, 0.4)',
        icon: DollarSign,
        type: 'Web App',
        status: 'Live',
        features: ['Double-Entry Ledger', 'GST Invoicing', 'Financial Reporting'],
        detailedFeatures: [
            { title: 'Multi-Ledger Bookkeeping', description: 'Manage accounts payable, accounts receivable, and cash/bank books.' },
            { title: 'Smart GST Invoicing', description: 'Generate GST-compliant invoices, track quotes, and record sales returns.' },
            { title: 'Financial Statements', description: 'Generate Profit & Loss statements, Balance Sheets, and trial balances in one click.' }
        ],
        howItWorks: [
            { icon: DollarSign, title: 'Record Transactions', description: 'Log sales, purchases, payments, and receipts to keep accounts updated.' },
            { icon: ClipboardList, title: 'Generate Invoices', description: 'Create and send professional GST invoices to clients and track payments.' },
            { icon: Activity, title: 'Monitor Financial Health', description: 'Access real-time reports to analyze cash flow, tax liabilities, and business growth.' }
        ],
        techStack: { frontend: ['React'], backend: ['Node.js'], database: ['MongoDB'], infrastructure: ['AWS'], integrations: [] }
    },
    {
        id: 76,
        name: 'Construction Management Software',
        category: 'Real Estate',
        desc: 'Precision site orchestration, daily site logs, blueprint control, and contractor management platform.',
        link: 'https://constructionui.softwaredemolive.live',
        youtube: '',
        color: 'from-amber-500 to-yellow-600',
        glow: 'rgba(245, 158, 11, 0.4)',
        icon: HardHat,
        type: 'Web App',
        status: 'Live',
        features: ['Project Scheduling', 'Daily Site Logs', 'Drawing Control'],
        detailedFeatures: [
            { title: 'Site Orchestration', description: 'Coordinate tasks, sub-contractors, and material flows across multiple construction sites.' },
            { title: 'Field Compliance', description: 'Log weather, headcounts, safety checklists, and daily progress photo logs.' },
            { title: 'Drawing & Document Vault', description: 'Access up-to-date drawings and revisions offline on the field to prevent rework.' }
        ],
        howItWorks: [
            { icon: HardHat, title: 'Define Site & Phases', description: 'HQ sets up the project timeline, milestones, and assigns contractor teams.' },
            { icon: ClipboardList, title: 'Log Daily Progress', description: 'Supervisors submit daily site reports, upload progress photos, and log safety checklist tasks.' },
            { icon: Activity, title: 'Track Costs & Milestones', description: 'Monitor live Gantt chart progress and track actual expenditures against the project budget.' }
        ],
        topSelling: true,
        techStack: { frontend: ['React'], backend: ['Node.js'], database: ['MongoDB'], infrastructure: ['AWS'], integrations: ['Procore', 'Autodesk'] }
    },
    {
        id: 77,
        name: 'Smart Hospital Management System',
        category: 'Health',
        desc: 'Advanced hospital operations, digital health records, OPD/IPD management, pharmacy inventory, and lab diagnostic coordination.',
        link: 'https://hospitalui.softwaredemolive.live',
        youtube: '',
        color: 'from-blue-500 to-cyan-600',
        glow: 'rgba(59, 130, 246, 0.4)',
        icon: Activity,
        type: 'Web App',
        status: 'Live',
        features: ['OPD & IPD Operations', 'EHR & Diagnostic Sync', 'Pharmacy Inventory Control'],
        detailedFeatures: [
            { title: 'OPD & IPD Flow', description: 'Streamline outpatient bookings, inpatient admissions, ward assignments, and discharge flows.' },
            { title: 'Electronic Health Records', description: 'Centralize diagnostic reports, treatment histories, prescriptions, and patient logs securely.' },
            { title: 'Pharmacy & Stock Integration', description: 'Automatically sync pharmacy stock levels, manage low-inventory alerts, and link orders directly to billing.' }
        ],
        howItWorks: [
            { icon: Activity, title: 'Admit & Route Patient', description: 'The receptionist books an OPD slot or registers an emergency IPD admission in under 2 minutes.' },
            { icon: ClipboardList, title: 'Diagnose & Prescribe', description: 'Doctors input prescriptions, request laboratory tests, or queue imaging procedures directly from their console.' },
            { icon: DollarSign, title: 'Consolidate Bill & Checkout', description: 'The billing department checks insurance status, compiles pharmacy and room dues, and prints a final GST-compliant receipt.' }
        ],
        topSelling: true,
        techStack: { frontend: ['React'], backend: ['Node.js'], database: ['PostgreSQL'], infrastructure: ['AWS'], integrations: ['ABDM', 'Razorpay'] }
    },
    {
        id: 78,
        name: 'Role-Based Loan Management System',
        category: 'Finance / Banking',
        desc: 'High-performance loan lifecycle management with distinct dashboards for borrowers, loan officers, and credit underwriters.',
        link: 'https://loankpui.softwaredemolive.live',
        youtube: '',
        color: 'from-emerald-400 to-teal-500',
        glow: 'rgba(52, 211, 153, 0.4)',
        icon: DollarSign,
        type: 'Web App',
        status: 'Live',
        features: ['Role-Based Portals', 'Automated Credit Scoring', 'Loan Servicing Engine'],
        detailedFeatures: [
            { title: 'Role-Based Portals', description: 'Segmented dashboards for borrowers (application & upload), loan officers (verification), and underwriters (risk assessment).' },
            { title: 'Credit Score Analyzer', description: 'Integrated algorithms to assess borrower risk profiles, financial logs, and credit-worthiness automatically.' },
            { title: 'Servicing & Repayment', description: 'Automated repayment schedules, auto-debit triggers, penalty calculators, and dynamic amortization builders.' }
        ],
        howItWorks: [
            { icon: ClipboardList, title: 'Submit Application', description: 'Borrowers fill out loan details and upload KYC/financial documents via their personalized portal.' },
            { icon: Users, title: 'Review & Verify', description: 'Loan officers review applications, verify details, and forward them with recommendation flags to underwriters.' },
            { icon: DollarSign, title: 'Underwriting & Disbursal', description: 'Underwriters perform risk scoring, approve or decline the loan, and trigger payment disbursement logic.' }
        ],
        topSelling: true,
        techStack: { frontend: ['React'], backend: ['Node.js'], database: ['MongoDB'], infrastructure: ['AWS'], integrations: ['Credit Bureaus', 'Stripe'] }
    },
    {
        id: 80,
        name: 'AI Tele-Calling & CRM Suite',
        category: 'Professional',
        desc: 'High-performance lead management and AI-driven tele-calling suite for outbound sales teams.',
        link: 'https://tele-managment.softwaredemolive.live',
        youtube: '',
        color: 'from-red-500 to-rose-600',
        glow: 'rgba(248, 113, 113, 0.4)',
        icon: Briefcase,
        type: 'Web App',
        status: 'Live',
        features: ['Lead Auto-Dialer', 'Call Sentiment Analysis', 'Outbound Campaign Manager'],
        detailedFeatures: [
            { title: 'Lead Auto-Dialer', description: 'Optimized queue dialing algorithm that minimizes agent idle time and automatically connects calls.' },
            { title: 'Sentiment Tracking', description: 'Natural language parsing to assess real-time call tone, customer receptiveness, and dialogue effectiveness.' },
            { title: 'Campaign Dashboard', description: 'Outbound command center to design agent groups, deploy scripts, and monitor real-time conversions.' }
        ],
        howItWorks: [
            { icon: Briefcase, title: 'Upload Active Leads', description: 'Import massive spreadsheets or sync with existing databases to immediately feed outbound campaigns.' },
            { icon: Activity, title: 'Connect & Parse Conversations', description: 'Agents converse through optimized interfaces while the AI parses tone and logs action steps.' },
            { icon: CheckSquare, title: 'Measure Script Success', description: 'Analyze campaign success ratios and refine scripts directly in the dashboard.' }
        ],
        topSelling: false,
        techStack: { frontend: ['React'], backend: ['Node.js'], database: ['MongoDB'], infrastructure: ['AWS'], integrations: ['Twilio', 'Salesforce'] }
    },
];

const StatCard = ({ endValue, label, suffix = '' }: { endValue: number, label: string, suffix?: string }) => {
    const [count, setCount] = useState(0)

    useEffect(() => {
        let start = 0
        const duration = 2000
        const stepTime = Math.max(Math.abs(Math.floor(duration / endValue)), 10)

        const timer = setInterval(() => {
            if (start < endValue) {
                start += 1
                setCount(start)
            } else {
                clearInterval(timer)
            }
        }, stepTime)

        return () => clearInterval(timer)
    }, [endValue])

    return (
        <div className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/80 backdrop-blur-xl hover:bg-zinc-800/60 hover:border-[#FFE81B]/30 transition-all duration-300 min-w-[110px]">
            <h4 className="text-2xl sm:text-3xl font-display text-white mb-1 drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]">
                {count}{suffix}
            </h4>
            <p className="text-[8px] sm:text-[10px] text-zinc-400 uppercase tracking-widest font-black text-center">{label}</p>
        </div>
    )
}

export default function AccessLiveEnvironment() {
    const [selectedSoftware, setSelectedSoftware] = useState<typeof softwareList[0] | null>(null)
    const [modalState, setModalState] = useState<'hidden' | 'form' | 'selection' | 'loading' | 'success'>('hidden')
    const [formData, setFormData] = useState({ name: '', email: '', phone: '' })
    const [formErrors, setFormErrors] = useState({ email: '', phone: '' })
    const [copiedContent, setCopiedContent] = useState<string | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    // YouTube Video Customization States
    const [customYoutubeUrls, setCustomYoutubeUrls] = useState<Record<number, string>>({})
    const [editingVideoProject, setEditingVideoProject] = useState<typeof softwareList[0] | null>(null)
    const [videoInputUrl, setVideoInputUrl] = useState('')
    const [activeVideoModal, setActiveVideoModal] = useState<{ project: typeof softwareList[0]; url: string } | null>(null)
    const [savedSuccessToast, setSavedSuccessToast] = useState(false)

    useEffect(() => {
        try {
            const saved = localStorage.getItem('kiaan_demo_youtube_urls')
            if (saved) {
                setCustomYoutubeUrls(JSON.parse(saved))
            }
        } catch {
            // ignore
        }
    }, [])

    const getProjectYoutubeUrl = (project: typeof softwareList[0]) => {
        if (customYoutubeUrls[project.id] !== undefined) {
            return customYoutubeUrls[project.id]
        }
        return (project as any).youtube || ''
    }

    const handleSaveYoutubeUrl = (e: React.FormEvent) => {
        e.preventDefault()
        if (!editingVideoProject) return

        const trimmed = videoInputUrl.trim()
        const updated = { ...customYoutubeUrls, [editingVideoProject.id]: trimmed }
        setCustomYoutubeUrls(updated)
        try {
            localStorage.setItem('kiaan_demo_youtube_urls', JSON.stringify(updated))
        } catch {
            // ignore
        }
        setSavedSuccessToast(true)
        setTimeout(() => {
            setSavedSuccessToast(false)
            setEditingVideoProject(null)
            setVideoInputUrl('')
        }, 1000)
    }

    const handleRemoveYoutubeUrl = () => {
        if (!editingVideoProject) return
        const updated = { ...customYoutubeUrls, [editingVideoProject.id]: '' }
        setCustomYoutubeUrls(updated)
        try {
            localStorage.setItem('kiaan_demo_youtube_urls', JSON.stringify(updated))
        } catch {
            // ignore
        }
        setEditingVideoProject(null)
        setVideoInputUrl('')
    }

    const getYouTubeEmbedUrl = (url: string) => {
        if (!url) return ''
        try {
            let match = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/)
            if (match && match[1]) return `https://www.youtube.com/embed/${match[1]}?autoplay=1`

            match = url.match(/[?&]v=([a-zA-Z0-9_-]+)/)
            if (match && match[1]) return `https://www.youtube.com/embed/${match[1]}?autoplay=1`

            match = url.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]+)/)
            if (match && match[1]) return `https://www.youtube.com/embed/${match[1]}?autoplay=1`

            match = url.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/)
            if (match && match[1]) return `https://www.youtube.com/embed/${match[1]}?autoplay=1`

            if (url.includes('youtube.com/embed/')) return url
            return url
        } catch {
            return url
        }
    }

    const [infoModal, setInfoModal] = useState<{ project: typeof softwareList[0]; type: 'features' | 'tech' | 'how-it-works' } | null>(null)
    const [selectedCategory, setSelectedCategory] = useState("All")
    const [selectedType, setSelectedType] = useState("All")
    const [searchQuery, setSearchQuery] = useState("")

    const categories = [
        "All",
        "Real Estate",
        "Finance & Banking",
        "Retail & Logistics",
        "Healthcare",
        "EdTech",
        "Enterprise",
        "AI & Automation",
        "Sports"
    ]

    const types = [
        "All",
        "Software",
        "Website",
        "Web App",
        "SaaS"
    ]

    const getFilteredSoftware = () => {
        const query = searchQuery.trim().toLowerCase();
        const queryTokens = query.split(/\s+/).filter(t => t.length > 0);

        const filtered = softwareList.filter(soft => {
            // 1. Search Query Filter (Matches Name, Category, Description, Features, DetailedFeatures, TechStack, Type)
            if (queryTokens.length > 0) {
                const searchableText = [
                    soft.name,
                    soft.category,
                    soft.desc,
                    soft.type,
                    ...(soft.features || []),
                    ...(soft.detailedFeatures ? soft.detailedFeatures.map(f => `${f.title} ${f.description}`) : []),
                    ...(soft.techStack ? Object.values(soft.techStack).flat() : [])
                ].join(' ').toLowerCase();

                const matchesAny = queryTokens.some(token => searchableText.includes(token));
                if (!matchesAny) return false;
            }

            // 2. Category Filter
            let categoryMatch = true;
            if (selectedCategory !== "All") {
                if (selectedCategory === "Real Estate") categoryMatch = ["Real Estate", "Property"].includes(soft.category);
                else if (selectedCategory === "Finance & Banking") categoryMatch = ["HR & Finance", "Finance", "Finance / Billing", "Finance / Banking"].includes(soft.category);
                else if (selectedCategory === "Retail & Logistics") categoryMatch = ["Retail", "Logistics", "Retail & Logistics"].includes(soft.category);
                else if (selectedCategory === "Healthcare") categoryMatch = ["Health", "Health / HR", "Healthcare"].includes(soft.category);
                else if (selectedCategory === "EdTech") categoryMatch = ["Education", "EdTech"].includes(soft.category);
                else if (selectedCategory === "Enterprise") categoryMatch = ["Professional", "Productivity", "Enterprise", "SaaS", "Events", "Construction"].includes(soft.category);
                else if (selectedCategory === "AI & Automation") categoryMatch = ["Artificial Intelligence", "AI & Automation", "Analytics"].includes(soft.category);
                else if (selectedCategory === "Sports") categoryMatch = ["Sports", "Recreation"].includes(soft.category);
                else categoryMatch = false;
            }

            // 3. Type Filter
            let typeMatch = true;
            if (selectedType !== "All") {
                typeMatch = (soft as any).type === selectedType;
            }

            return categoryMatch && typeMatch;
        });

        // If search query is active, sort by relevance score!
        if (queryTokens.length > 0) {
            return [...filtered].sort((a, b) => {
                const getScore = (item: typeof softwareList[0]) => {
                    let score = 0;
                    const nameLower = item.name.toLowerCase();
                    const catLower = item.category.toLowerCase();
                    const descLower = item.desc.toLowerCase();

                    if (nameLower.includes(query)) score += 100;
                    if (nameLower.startsWith(query)) score += 50;

                    queryTokens.forEach(t => {
                        if (nameLower.includes(t)) score += 30;
                        if (catLower.includes(t)) score += 20;
                        if (descLower.includes(t)) score += 10;
                        if (item.features?.some(f => f.toLowerCase().includes(t))) score += 8;
                    });
                    return score;
                };

                return getScore(b) - getScore(a);
            });
        }

        // Default Priority Sort
        const priorityIds = [201, 202, 203, 204, 205, 206, 207, 208, 209, 211, 212, 213, 214, 215, 216, 218, 219, 220, 221, 222, 223, 45, 69, 77, 68, 78, 42, 76, 75, 74, 73];
        return [...filtered].sort((a, b) => {
            const indexA = priorityIds.indexOf(a.id);
            const indexB = priorityIds.indexOf(b.id);

            if (indexA !== -1 && indexB !== -1) return indexA - indexB;
            if (indexA !== -1) return -1;
            if (indexB !== -1) return 1;
            return 0;
        });
    }



    const handleSoftClick = (soft: typeof softwareList[0]) => {
        setFormData({ name: '', email: '', phone: '' })
        setFormErrors({ email: '', phone: '' })
        setSelectedSoftware(soft)
        setModalState('form')
    }

    const closeModal = () => {
        setModalState('hidden')
        setFormData({ name: '', email: '', phone: '' })
        setFormErrors({ email: '', phone: '' })
        setTimeout(() => setSelectedSoftware(null), 300)
    }

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (isSubmitting) return;

        let isValid = true;
        const errors = { email: '', phone: '' };

        // Email Validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            errors.email = 'Please enter a valid email address.';
            isValid = false;
        }

        // Phone Validation (10-15 digits, allows +, -, spaces)
        const phoneRegex = /^[\d\s\+\-\(\)]{10,15}$/;
        if (!phoneRegex.test(formData.phone)) {
            errors.phone = 'Please enter a valid 10-digit number.';
            isValid = false;
        }

        setFormErrors(errors);

        const utm = getStoredUTMParams();

        if (isValid) {
            setIsSubmitting(true);
            try {
                await emailjs.send(
                    EMAILJS_SERVICE_ID,
                    EMAILJS_TEMPLATE_ID,
                    {
                        name: formData.name || 'N/A',
                        email: formData.email || 'N/A',
                        company: selectedSoftware?.name || 'Live Demo Request',
                        contact_number: formData.phone || 'N/A',
                        contact_method: 'Phone / Email',
                        industry: selectedSoftware?.category || 'N/A',
                        project_type: 'Live Demo Arena Access',
                        features: selectedSoftware?.features?.join(', ') || 'N/A',
                        vision: selectedSoftware?.desc || 'N/A',
                        budget: 'N/A',
                        timeline: 'Immediate',
                        submitted_at: new Date().toLocaleString(),
                        message: [
                            `Live Demo Requested: ${selectedSoftware?.name}`,
                            `Name: ${formData.name}`,
                            `Email: ${formData.email}`,
                            `Phone: ${formData.phone}`,
                            `Category: ${selectedSoftware?.category}`,
                            `Preview Link: ${selectedSoftware?.link || 'N/A'}`,
                            `UTM Source: ${utm?.utm_source || 'Direct/None'}`,
                            `UTM Medium: ${utm?.utm_medium || 'Direct/None'}`,
                            `UTM Campaign: ${utm?.utm_campaign || 'Direct/None'}`,
                            `UTM Term: ${utm?.utm_term || 'Direct/None'}`,
                            `UTM Content: ${utm?.utm_content || 'Direct/None'}`,
                            `Referral Code: ${utm?.ref || 'None'}`
                        ].join('\n')
                    },
                    EMAILJS_PUBLIC_KEY
                );

                try {
                    await fetch('/api/leads/', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            leadType: 'demo_request',
                            name: formData.name,
                            email: formData.email,
                            phone: formData.phone,
                            serviceInterest: selectedSoftware?.name,
                            sourcePage: '/demo'
                        })
                    });
                } catch (err) {
                    console.warn('Backend lead recording notice:', err);
                }

                setModalState('selection');
                trackGAEvent('form_submit', 'Lead Generation', `Demo Request - ${selectedSoftware?.name}`);
                trackGTMEvent('form_submit', { form_name: 'Demo Request', software_name: selectedSoftware?.name, category: selectedSoftware?.category });
                setFormErrors({ email: '', phone: '' });
            } catch {
                setFormErrors({ email: 'Submission failed. Please try again.', phone: '' });
            } finally {
                setIsSubmitting(false);
            }
        }
    }

    const processLoadingAndRedirect = () => {
        if (selectedSoftware?.link) {
            window.open(selectedSoftware.link, '_blank')
            closeModal()
        } else {
            setModalState('success')
        }
    }

    const handleDemoSelect = (type: 'frontend' | 'backend') => {
        processLoadingAndRedirect()
    }

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
        setCopiedContent(text)
        setTimeout(() => setCopiedContent(null), 2000)
    }

    return (
        <div className="relative bg-[#050505] min-h-screen text-white pb-0 font-sans selection:bg-[#FFE81B] selection:text-black overflow-hidden focus:outline-none">



            {/* 2. Animated Tech Background */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                {/* Slow moving grid lines */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f15_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

                {/* Static ambient orbs */}
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-900/10 blur-[150px] rounded-full mix-blend-screen"></div>
                <div className="absolute top-[20%] right-[-10%] w-[40%] h-[60%] bg-blue-900/10 blur-[120px] rounded-full mix-blend-screen"></div>
                <div className="absolute bottom-[-10%] left-[20%] w-[60%] h-[40%] bg-cyan-900/5 blur-[100px] rounded-full mix-blend-screen"></div>
            </div>

            {/* HERO SECTION - SINGLE ROW LAYOUT */}
            <section className="relative z-10 pt-6 sm:pt-8 pb-0 container mx-auto px-4 lg:px-8 max-w-[1400px]">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 w-full">
                    {/* LEFT SIDE: Headings */}
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left flex-1">
                        <Reveal>
                            <div className="inline-flex items-center gap-1.5 text-[#FFE81B] text-[10px] md:text-xs font-black uppercase tracking-widest px-4 py-1.5 border border-[#FFE81B]/30 bg-black/50 rounded-full shadow-[0_0_20px_rgba(255,232,27,0.2)] mb-4 cursor-default">
                                <Lock size={12} className="opacity-80" /> Secure Demo Access Required
                            </div>
                        </Reveal>

                        <Reveal delay={0.1}>
                            <h1 className="text-3xl md:text-5xl lg:text-5xl font-display uppercase tracking-tighter mb-4 relative drop-shadow-2xl whitespace-nowrap">
                                <span className="absolute inset-0 blur-[25px] opacity-40 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent transform scale-105">
                                    ACCESS LIVE ENVIRONMENT
                                </span>
                                <span className="relative z-10 bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
                                    ACCESS LIVE <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">ENVIRONMENT</span>
                                </span>
                            </h1>
                        </Reveal>

                        <Reveal delay={0.2}>
                            <p className="text-sm md:text-base text-zinc-300 font-light tracking-wide max-w-md drop-shadow-md lg:mb-0 mb-4 whitespace-nowrap">
                                Experience Our Real Enterprise Systems in Action
                            </p>
                        </Reveal>
                    </div>

                    {/* RIGHT SIDE: Stats in Single Row */}
                    <div className="w-full lg:w-auto">
                        <div className="grid grid-cols-4 gap-2 sm:gap-4">
                            <Reveal delay={0.3}><StatCard endValue={softwareList.filter(s => s.status === 'Live').length} label="Live Systems" /></Reveal>
                            <Reveal delay={0.4}><StatCard endValue={new Set(softwareList.map(s => s.category)).size} label="Industries Covered" /></Reveal>
                            <Reveal delay={0.5}><StatCard endValue={662} label="Active Users" suffix="+" /></Reveal>
                            <Reveal delay={0.6}><StatCard endValue={99} label="Uptime Guarantee" suffix=".9%" /></Reveal>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. SEARCH & DISCOVERY BAR */}
            <section className="relative z-10 pt-6 pb-1 container mx-auto px-4 lg:px-8 max-w-[1400px]">
                <div className="relative w-full rounded-2xl bg-zinc-950/90 border border-zinc-800/90 backdrop-blur-xl p-3 sm:p-3.5 shadow-[0_0_40px_rgba(0,0,0,0.6)] focus-within:border-[#FFE81B]/50 focus-within:shadow-[0_0_30px_rgba(255,232,27,0.15)] transition-all duration-300">
                    <div className="flex flex-col md:flex-row items-center gap-3">
                        
                        {/* Search Input Box */}
                        <div className="relative flex items-center w-full flex-1">
                            <div className="absolute left-3.5 flex items-center pointer-events-none text-zinc-400">
                                <Search size={18} className="text-[#FFE81B] drop-shadow-[0_0_8px_rgba(255,232,27,0.4)]" />
                            </div>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search by project name, keywords, industry, or tech (e.g. CRM, Property, Hospital, Loan, Booking, HR)..."
                                className="w-full bg-zinc-900/80 border border-zinc-700/80 rounded-xl pl-11 pr-10 py-3 text-xs md:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#FFE81B]/60 focus:bg-zinc-900 transition-all font-sans"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-3 p-1 rounded-full bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors"
                                    title="Clear search"
                                >
                                    <X size={14} />
                                </button>
                            )}
                        </div>

                        {/* Result Counter & Reset Button */}
                        <div className="flex items-center gap-2 justify-between w-full md:w-auto px-1">
                            <div className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-[10px] md:text-xs font-bold uppercase tracking-wider text-zinc-300 whitespace-nowrap shadow-inner">
                                <Sparkles size={13} className="text-[#FFE81B]" />
                                <span>
                                    <strong className="text-[#FFE81B] font-black">{getFilteredSoftware().length}</strong> of {softwareList.length} Systems
                                </span>
                            </div>
                            {(searchQuery || selectedCategory !== 'All' || selectedType !== 'All') && (
                                <button
                                    onClick={() => {
                                        setSearchQuery('');
                                        setSelectedCategory('All');
                                        setSelectedType('All');
                                    }}
                                    className="text-[10px] uppercase tracking-wider font-bold text-amber-400 hover:text-white transition-colors px-2 py-1 underline whitespace-nowrap cursor-pointer"
                                >
                                    Reset All
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Quick Suggestion Pills */}
                    <div className="flex items-center gap-1.5 pt-2.5 px-1 overflow-x-auto no-scrollbar">
                        <span className="text-[9.5px] uppercase font-black tracking-widest text-zinc-500 shrink-0 mr-1 flex items-center gap-1">
                            <Filter size={10} /> Popular:
                        </span>
                        {['CRM', 'Property', 'Hospital', 'E-Commerce', 'HRM', 'Booking', 'Loan', 'Food', 'AI Dialer', 'ERP'].map((tag) => (
                            <button
                                key={tag}
                                onClick={() => setSearchQuery(tag === searchQuery ? '' : tag)}
                                className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border transition-all duration-200 shrink-0 cursor-pointer ${
                                    searchQuery.toLowerCase() === tag.toLowerCase()
                                        ? 'bg-[#FFE81B] text-black border-[#FFE81B] shadow-[0_0_12px_rgba(255,232,27,0.3)]'
                                        : 'bg-zinc-900/60 text-zinc-400 border-zinc-800/80 hover:border-zinc-600 hover:text-zinc-200'
                                }`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* CATEGORY FILTERS - DUAL LAYER PREMIUM UI */}
            <section className="relative z-10 py-6 container mx-auto px-4 lg:px-8 max-w-[1400px] flex flex-col gap-4">

                {/* Layer 1: Industry Filters */}
                <div className="flex flex-col lg:flex-row items-center gap-3 w-full bg-[#FFE81B]/5 backdrop-blur-sm border border-[#FFE81B]/15 rounded-xl px-4 py-2">
                    <div className="flex items-center gap-2 text-[#FFE81B] text-[9.5px] md:text-[9px] font-black uppercase tracking-[0.2em] whitespace-nowrap min-w-[110px] opacity-60">
                        <Layers size={12} /> Industry
                    </div>
                    <div className="flex flex-wrap items-center gap-1 md:gap-1.5 w-full flex-1">
                        {categories.map((cat, idx) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`relative px-2 py-2 rounded-md text-[9.5px] md:text-[11px] font-black uppercase tracking-tight md:tracking-wider transition-all duration-200 border overflow-hidden flex-1 min-w-[18%] md:min-w-0 text-center hover:scale-[1.03] active:scale-95 ${selectedCategory === cat
                                    ? "bg-[#FFE81B] text-black border-[#FFE81B] shadow-[0_0_15px_rgba(255,232,27,0.2)] z-10"
                                    : "bg-zinc-900/40 text-zinc-400 border-zinc-700/60 hover:border-zinc-500/40 hover:text-zinc-200 shadow-sm"
                                    }`}
                            >
                                <span className="relative z-10 flex items-center justify-center gap-1">
                                    {selectedCategory === cat && <div className="w-1 h-1 rounded-full bg-black shrink-0" />}
                                    {cat}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Layer 2: Solution Type Filters */}
                <div className="flex flex-col lg:flex-row items-center gap-3 w-full bg-cyan-500/5 backdrop-blur-sm border border-cyan-500/15 rounded-xl px-4 py-2">
                    <div className="flex items-center gap-2 text-cyan-400 text-[9.5px] md:text-[9px] font-black uppercase tracking-[0.2em] whitespace-nowrap min-w-[110px] opacity-60">
                        <Cpu size={12} /> Solution
                    </div>
                    <div className="flex flex-wrap md:flex-wrap items-center gap-1 md:gap-1.5 w-full flex-1">
                        {types.map((t, idx) => (
                            <button
                                key={t}
                                onClick={() => setSelectedType(t)}
                                className={`relative px-2 py-2 rounded-md text-[9.5px] md:text-[11px] font-black uppercase tracking-tight md:tracking-wider transition-all duration-200 border overflow-hidden flex-1 min-w-0 text-center hover:scale-[1.03] active:scale-95 ${selectedType === t
                                    ? "bg-cyan-500 text-black border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.2)] z-10"
                                    : "bg-zinc-900/40 text-zinc-400 border-zinc-700/60 hover:border-cyan-500/40 hover:text-cyan-400"
                                    }`}
                            >
                                <span className="relative z-10 flex items-center justify-center gap-1">
                                    {selectedType === t && <div className="w-1 h-1 rounded-full bg-black shrink-0" />}
                                    {t}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* UNIFORM GRID SHOWCASE */}
            <section className="relative z-10 container mx-auto px-4 lg:px-8 max-w-[1400px]">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {/* Empty State when Search Query has no matches */}
                    {getFilteredSoftware().length === 0 && (
                        <div className="col-span-full py-16 px-4 flex flex-col items-center justify-center text-center rounded-2xl bg-zinc-950/70 border border-zinc-800/80 backdrop-blur-xl">
                            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4 shadow-[0_0_20px_rgba(245,158,11,0.15)]">
                                <Search size={24} />
                            </div>
                            <h3 className="text-xl font-display uppercase tracking-tight text-white mb-2">
                                No Matching Systems Found
                            </h3>
                            <p className="text-xs md:text-sm text-zinc-400 max-w-md mb-6 font-light">
                                We couldn&apos;t find any software matching <span className="text-white font-bold">&quot;{searchQuery}&quot;</span>. Try searching with a different term like CRM, Real Estate, Hospital, or Booking.
                            </p>
                            <button
                                onClick={() => {
                                    setSearchQuery('');
                                    setSelectedCategory('All');
                                    setSelectedType('All');
                                }}
                                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#FFE81B] to-yellow-400 text-black font-black text-xs uppercase tracking-widest hover:brightness-110 shadow-[0_0_20px_rgba(255,232,27,0.3)] transition-all cursor-pointer"
                            >
                                Clear Search & Show All {softwareList.length} Systems
                            </button>
                        </div>
                    )}

                    {getFilteredSoftware().map((soft) => {
                        return (
                            <div
                                key={soft.id}
                                className="group relative overflow-hidden rounded-[14px] p-[1.5px] transition-all duration-300 flex flex-col min-h-[200px] shadow-[0_4px_20px_rgba(0,0,0,0.5)] perspective-1000"
                            >
                                {/* Static Dark Background Border */}
                                <div className={`absolute inset-0 bg-zinc-800/80 rounded-[14px] transition-opacity duration-300 group-hover:opacity-0`}></div>

                                {/* Animated Glowing Border (Visible on Hover) */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-500 bg-[length:300%_300%] bg-gradient-to-r from-cyan-400 via-purple-500 via-blue-500 to-yellow-500 rounded-[14px] animate-[gradient_4s_ease-in-out_infinite]"></div>

                                {/* Inner Card Content Box */}
                                <div className="relative h-full w-full bg-zinc-950/95 backdrop-blur-2xl rounded-[12px] p-5 flex flex-col justify-between z-10">



                                    <div className="relative z-10 flex flex-col h-full">

                                        {/* Top Icons and Badges */}
                                            <div className="flex flex-col gap-1.5">
                                                <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-sm bg-gradient-to-r ${soft.color} text-white shadow-md z-10 w-fit`}>
                                                    {soft.category}
                                                </span>
                                            </div>

                                        {/* 3. Live Status Badges */}
                                        <div className="absolute top-0 right-0 z-20">
                                            <span className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border border-emerald-500/30 bg-black/60 backdrop-blur-md shadow-lg transition-transform duration-300 text-emerald-400">
                                                <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-emerald-400"></span>
                                                LIVE
                                            </span>
                                        </div>

                                        <div className="mt-auto transition-transform duration-500">
                                            <div className="flex items-center gap-2 mb-1.5">
                                                <soft.icon size={18} className="text-zinc-500 transition-colors duration-300" />
                                                <h3 className="font-display uppercase tracking-tight text-white text-xl">
                                                    {soft.name}
                                                </h3>
                                            </div>
                                            <p className="text-zinc-400 text-xs font-light leading-relaxed line-clamp-2 transition-opacity duration-300 hidden sm:block">
                                                {soft.desc}
                                            </p>
                                        </div>

                                        {/* Main CTA Button */}
                                        <div className="mt-5 pt-3 border-t border-zinc-800/80 flex flex-col gap-2">
                                            <button
                                                className="group w-full flex justify-center items-center gap-2 py-3 px-4 rounded-lg text-[11px] font-black uppercase tracking-widest text-black bg-gradient-to-r from-[#FFE81B] via-yellow-400 to-amber-400 border border-yellow-300/50 shadow-[0_0_25px_rgba(255,232,27,0.3),inset_0_1px_1px_rgba(255,255,255,0.3)] hover:shadow-[0_0_35px_rgba(255,232,27,0.5),0_4px_20px_rgba(255,232,27,0.3)] transition-all duration-300 transform hover:-translate-y-[2px] hover:scale-[1.02] active:scale-[0.98]"
                                                onClick={(e) => { e.stopPropagation(); handleSoftClick(soft); }}
                                            >
                                                View UI
                                                <LinkIcon size={12} className="group-hover:translate-x-1 transition-all duration-300" />
                                            </button>

                                            {/* See How It Works CTA */}
                                            <button
                                                className="group w-full flex justify-center items-center gap-2 py-2.5 px-4 rounded-lg text-[10px] font-black uppercase tracking-widest text-zinc-200 bg-white/[0.04] border border-zinc-600/70 hover:text-white hover:border-zinc-400/70 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.08)] transition-all duration-300"
                                                onClick={(e) => { e.stopPropagation(); setInfoModal({ project: soft, type: 'how-it-works' }); }}
                                            >
                                                See How It Works
                                                <ArrowRight size={11} className="opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                                            </button>

                                            {/* YouTube Demo Video CTA & Quick Edit Button */}
                                            {(() => {
                                                const videoUrl = getProjectYoutubeUrl(soft);
                                                return videoUrl ? (
                                                    <div className="flex items-center gap-1.5 w-full">
                                                        <button
                                                            type="button"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setActiveVideoModal({ project: soft, url: videoUrl });
                                                            }}
                                                            className="group/yt flex-1 flex justify-center items-center gap-2 py-2.5 px-3 rounded-lg text-[10px] font-black uppercase tracking-widest text-[#FF0000] bg-red-950/20 border border-red-600/30 hover:bg-red-600 hover:text-white hover:border-red-600 shadow-[0_0_15px_rgba(255,0,0,0.15)] hover:shadow-[0_0_20px_rgba(255,0,0,0.3)] transition-all duration-300 cursor-pointer"
                                                        >
                                                            <Youtube size={13} className="text-[#FF0000] group-hover/yt:text-white transition-colors duration-300" />
                                                            Watch Demo Video
                                                        </button>
                                                        <button
                                                            type="button"
                                                            title="Edit YouTube Video URL"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setEditingVideoProject(soft);
                                                                setVideoInputUrl(videoUrl);
                                                            }}
                                                            className="p-2.5 rounded-lg border border-red-600/30 bg-red-950/20 text-red-400 hover:text-white hover:bg-red-600 hover:border-red-600 transition-all duration-300 shadow-sm cursor-pointer"
                                                        >
                                                            <Pencil size={12} />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <button
                                                        type="button"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setEditingVideoProject(soft);
                                                            setVideoInputUrl('');
                                                        }}
                                                        className="group/add w-full flex justify-center items-center gap-1.5 py-2 px-3 rounded-lg text-[9.5px] font-bold uppercase tracking-wider text-zinc-400 bg-white/[0.02] border border-dashed border-zinc-700/60 hover:text-red-400 hover:border-red-500/50 hover:bg-red-950/10 transition-all duration-300 cursor-pointer"
                                                    >
                                                        <Youtube size={12} className="text-red-500/70 group-hover/add:scale-110 transition-transform" />
                                                        <span>+ Add Video URL</span>
                                                        <Pencil size={10} className="opacity-50 group-hover/add:opacity-100 ml-1" />
                                                    </button>
                                                );
                                            })()}
                                        </div>

                                        {/* View Features & Tech Stack Buttons */}
                                        <div className="mt-3 pt-3 border-t border-zinc-800/60">
                                            <div className="flex gap-3">
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); setInfoModal({ project: soft, type: 'features' }); }}
                                                    className="group/btn flex-1 flex justify-center items-center gap-2 py-2.5 px-3 rounded-md text-[10px] font-black uppercase tracking-[0.2em] text-amber-400 border border-amber-500/20 bg-amber-500/5 hover:bg-amber-500/10 hover:border-amber-500/50 hover:shadow-[0_0_20px_rgba(245,158,11,0.15)] transition-all duration-300 active:scale-[0.97]"
                                                >
                                                    <Layers size={12} className="group-hover/btn:scale-110 transition-transform duration-300" />
                                                    Features
                                                </button>
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); setInfoModal({ project: soft, type: 'tech' }); }}
                                                    className="group/btn flex-1 flex justify-center items-center gap-2 py-2.5 px-3 rounded-md text-[10px] font-black uppercase tracking-[0.2em] text-purple-400 border border-purple-500/20 bg-purple-500/5 hover:bg-purple-500/10 hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)] transition-all duration-300 active:scale-[0.97]"
                                                >
                                                    <Cpu size={12} className="group-hover/btn:scale-110 transition-transform duration-300" />
                                                    Tech Stack
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </section>

            {/* 8. Dark Premium CTA Section */}
            <section className="relative z-10 border-t border-zinc-800/50 mt-12">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black pointer-events-none"></div>
                <div className="container mx-auto px-4 py-10 flex flex-col items-center justify-center text-center relative z-10 w-full">
                    <Reveal>
                        <h2 className="text-3xl lg:text-4xl font-display uppercase tracking-widest text-white mb-5 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] text-center">
                            Need a Custom Enterprise Solution?
                        </h2>
                    </Reveal>
                    <Reveal delay={0.2}>
                        <Link href="/schedule">
                            <button className="group relative bg-[#FFE81B] text-black px-8 py-3.5 rounded-md font-bold uppercase tracking-widest text-sm hover:bg-white hover:-translate-y-1 transition-all duration-300 shadow-[0_0_20px_rgba(255,232,27,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] flex items-center gap-2 mx-auto">
                                Schedule Strategy Call
                                <Maximize2 size={16} className="transition-transform group-hover:scale-110" />
                            </button>
                        </Link>
                    </Reveal>
                </div>
            </section>

            {/* 1. EDIT YOUTUBE VIDEO MODAL */}
            <AnimatePresence>
                {editingVideoProject && (
                    <motion.div className="fixed inset-0 z-[110] flex items-center justify-center p-4 overflow-y-auto">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/90 backdrop-blur-2xl"
                            onClick={() => setEditingVideoProject(null)}
                        />
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 15 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 15 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="relative w-full max-w-lg rounded-[20px] p-[1px] z-10 overflow-hidden shadow-[0_0_60px_rgba(255,0,0,0.2)] bg-gradient-to-r from-red-600 via-rose-500 to-amber-500"
                        >
                            <div className="relative bg-zinc-950/95 backdrop-blur-3xl rounded-[19px] p-6 md:p-8">
                                <button
                                    onClick={() => setEditingVideoProject(null)}
                                    className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-zinc-900 border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 transition-all duration-200"
                                >
                                    <X size={14} strokeWidth={2.5} />
                                </button>

                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-500">
                                        <Youtube size={16} />
                                    </div>
                                    <h3 className="text-xl font-display uppercase tracking-tight text-white">
                                        Edit Demo Video Link
                                    </h3>
                                </div>
                                <p className="text-xs text-zinc-400 mb-6 font-light">
                                    Set YouTube video URL for <span className="text-white font-bold">{editingVideoProject.name}</span>
                                </p>

                                <form onSubmit={handleSaveYoutubeUrl} className="space-y-4">
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2">
                                            YouTube Video URL:
                                        </label>
                                        <input
                                            type="url"
                                            value={videoInputUrl}
                                            onChange={(e) => setVideoInputUrl(e.target.value)}
                                            placeholder="https://www.youtube.com/watch?v=... or https://youtu.be/..."
                                            className="w-full bg-zinc-900/80 border border-zinc-700 rounded-lg px-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all font-mono"
                                            autoFocus
                                        />
                                        <p className="text-[10px] text-zinc-500 mt-1.5">
                                            Supports standard YouTube links, youtu.be shortlinks, or embed links.
                                        </p>
                                    </div>

                                    {savedSuccessToast && (
                                        <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold animate-pulse">
                                            <Check size={14} /> Video URL saved successfully!
                                        </div>
                                    )}

                                    <div className="flex items-center gap-3 pt-2">
                                        <button
                                            type="submit"
                                            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-red-600 hover:bg-red-500 text-white font-black text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(255,0,0,0.3)] transition-all cursor-pointer"
                                        >
                                            <Check size={14} /> Save Video URL
                                        </button>
                                        {getProjectYoutubeUrl(editingVideoProject) && (
                                            <button
                                                type="button"
                                                onClick={handleRemoveYoutubeUrl}
                                                className="px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-700 hover:border-red-500/50 hover:bg-red-950/20 text-zinc-400 hover:text-red-400 text-xs font-bold uppercase transition-all cursor-pointer"
                                                title="Remove video from this card"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        )}
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 2. EMBEDDED YOUTUBE VIDEO PLAYER MODAL */}
            <AnimatePresence>
                {activeVideoModal && (
                    <motion.div className="fixed inset-0 z-[120] flex items-center justify-center p-4 overflow-y-auto">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/95 backdrop-blur-2xl"
                            onClick={() => setActiveVideoModal(null)}
                        />
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 15 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 15 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="relative w-full max-w-4xl rounded-[20px] p-[1px] z-10 overflow-hidden shadow-[0_0_80px_rgba(255,0,0,0.3)] bg-gradient-to-r from-red-600 via-rose-500 to-amber-500"
                        >
                            <div className="relative bg-zinc-950 rounded-[19px] p-4 md:p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2.5">
                                        <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white shadow-lg">
                                            <Youtube size={16} />
                                        </div>
                                        <div>
                                            <h3 className="text-base md:text-lg font-display uppercase tracking-tight text-white">
                                                {activeVideoModal.project.name}
                                            </h3>
                                            <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-black">
                                                Interactive Product Walkthrough
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <a
                                            href={activeVideoModal.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-3 py-1.5 rounded-md bg-zinc-900 border border-zinc-700 text-zinc-300 hover:text-white hover:border-zinc-500 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all"
                                        >
                                            <span>Open in YouTube</span>
                                            <ExternalLink size={10} />
                                        </a>
                                        <button
                                            onClick={() => setActiveVideoModal(null)}
                                            className="w-8 h-8 flex items-center justify-center rounded-full bg-zinc-900 border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 transition-all"
                                        >
                                            <X size={14} strokeWidth={2.5} />
                                        </button>
                                    </div>
                                </div>

                                {/* 16:9 Video Aspect Ratio Frame */}
                                <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black border border-white/10 shadow-2xl">
                                    <iframe
                                        src={getYouTubeEmbedUrl(activeVideoModal.url)}
                                        title={activeVideoModal.project.name}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen
                                        className="w-full h-full border-0"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* PREMIUM 2-STEP POPUP FLOW */}
            <AnimatePresence>
                {modalState !== 'hidden' && selectedSoftware && (
                    <motion.div
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto"
                    >
                        {/* Dark blur overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 z-0 bg-black/90 backdrop-blur-2xl"
                            onClick={modalState !== 'loading' ? closeModal : undefined}
                        />

                        {modalState === 'form' && (
                            <motion.div
                                initial={{ scale: 0.95, opacity: 0, y: 15 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.95, opacity: 0, y: 15 }}
                                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                                className={`relative w-full rounded-[20px] p-[1px] z-10 overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.8)] transition-all duration-300 ${(selectedSoftware as any).hasCredentials ? 'max-w-3xl' : 'max-w-md'}`}
                            >
                                {/* Animated Neon Border for Modal */}
                                <div className="absolute inset-0 bg-[length:300%_300%] bg-gradient-to-r from-cyan-400 via-purple-500 to-yellow-500 animate-[gradient_4s_ease-in-out_infinite] opacity-70"></div>

                                <div className={`relative bg-zinc-950/95 backdrop-blur-xl rounded-[19px] p-6 lg:p-8 w-full h-full text-left flex flex-col md:flex-row gap-8 lg:gap-10 ${(selectedSoftware as any).hasCredentials ? 'md:max-w-3xl' : 'max-w-md mx-auto'}`}>
                                    <button onClick={closeModal} className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors z-20 bg-black/50 rounded-full p-1 border border-zinc-800">
                                        <X size={16} strokeWidth={2} />
                                    </button>

                                    {/* LEFT SIDE: CREDENTIALS (if available) */}
                                    {(selectedSoftware as any).hasCredentials && (
                                        <div className="md:w-[280px] w-full flex-shrink-0 flex flex-col order-2 md:order-1 mt-6 md:mt-0 pt-6 md:pt-0 border-t md:border-t-0 md:border-r border-zinc-800/80 md:pr-8">
                                            <div className="flex items-center gap-2 mb-3">
                                                <Zap size={14} className="text-[#FFE81B] animate-pulse" />
                                                <h3 className="text-xs font-display uppercase tracking-widest text-white drop-shadow-sm">Demo Credentials</h3>
                                            </div>

                                            <div className="flex flex-col gap-1.5 flex-1 overflow-y-auto pr-1 no-scrollbar mb-2">
                                                {(selectedSoftware as any).credentials?.roles.map((role: any, index: number) => (
                                                    <div key={role.email} className={`flex flex-col gap-0.5 pb-1.5 ${index !== (selectedSoftware as any).credentials!.roles.length - 1 ? 'border-b border-zinc-800/50' : ''}`}>
                                                        <span className="text-[9px] uppercase font-bold tracking-widest text-[#FFE81B] font-sans">{role.title}</span>
                                                        <div className="flex justify-between items-center group/item cursor-pointer hover:bg-zinc-900 px-1 py-1 -mx-1 rounded transition-all border border-transparent hover:border-zinc-800/50 shadow-inner" onClick={() => copyToClipboard(role.email)}>
                                                            <span className="text-[11px] font-mono text-zinc-300 group-hover/item:text-white transition-colors">{role.email}</span>
                                                            <Copy size={10} className="opacity-0 group-hover/item:opacity-100 transition-opacity text-zinc-500 group-hover/item:text-[#FFE81B]" />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="pt-2 border-t border-zinc-800/80">
                                                <div className="flex justify-between items-center cursor-pointer group/pass p-2 -mx-1 rounded-md transition-all border border-transparent hover:border-zinc-800/50 hover:bg-zinc-900/50 bg-black/40 shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]" onClick={() => copyToClipboard((selectedSoftware as any).credentials?.password || '')}>
                                                    <div className="flex flex-col gap-0.5">
                                                        <span className="text-[8px] text-zinc-500 font-sans uppercase tracking-widest font-bold">Global Password</span>
                                                        <span className="text-xs font-mono font-bold text-white tracking-widest">{(selectedSoftware as any).credentials?.password}</span>
                                                    </div>
                                                    <div className="w-6 h-6 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover/pass:border-[#FFE81B]/50 transition-colors">
                                                        <Copy size={12} className="text-zinc-500 group-hover/pass:text-[#FFE81B] transition-colors" />
                                                    </div>
                                                </div>
                                            </div>

                                            {copiedContent && (
                                                <div className="mt-4 p-2 bg-green-500/10 border border-green-500/20 rounded text-center">
                                                    <p className="text-[10px] text-green-400 font-bold uppercase tracking-widest">Copied to clipboard!</p>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* RIGHT SIDE: FORM Area */}
                                    <div className="flex-1 flex flex-col w-full order-1 md:order-2">
                                        <div className="mb-8 flex flex-col items-start md:items-center text-left md:text-center">
                                            <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                                                <Shield className="text-[#FFE81B]" size={16} />
                                            </div>
                                            <h2 className="text-2xl lg:text-3xl font-display uppercase tracking-tight text-white mb-2 drop-shadow-sm">
                                                Secure Access Required
                                            </h2>
                                            <p className="text-sm text-zinc-400 font-light">
                                                Enter your details to view the UI experience
                                            </p>
                                        </div>

                                        <form onSubmit={handleFormSubmit} className="space-y-5 text-left flex-1 flex flex-col justify-center">
                                            <div className="space-y-1">
                                                <input required autoComplete="name" type="text" className="w-full bg-black/60 border border-zinc-800 rounded-lg px-4 py-3.5 text-sm text-white focus:border-[#FFE81B]/50 transition-all outline-none shadow-inner" placeholder="Full Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                                            </div>
                                            <div className="space-y-1">
                                                <input required autoComplete="email" type="email" className={`w-full bg-black/60 border ${formErrors.email ? 'border-red-500/50 focus:border-red-500' : 'border-zinc-800 focus:border-cyan-500/50'} rounded-lg px-4 py-3.5 text-sm text-white transition-all outline-none shadow-inner`} placeholder="Enter Gmail" value={formData.email} onChange={(e) => { setFormData({ ...formData, email: e.target.value }); setFormErrors({ ...formErrors, email: '' }) }} />
                                                {formErrors.email && <p className="text-[10px] text-red-500 mt-1 pl-1 font-bold">{formErrors.email}</p>}
                                            </div>
                                            <div className="space-y-1">
                                                <input required autoComplete="tel" type="tel" className={`w-full bg-black/60 border ${formErrors.phone ? 'border-red-500/50 focus:border-red-500' : 'border-zinc-800 focus:border-purple-500/50'} rounded-lg px-4 py-3.5 text-sm text-white transition-all outline-none shadow-inner`} placeholder="Contact Number" value={formData.phone} onChange={(e) => { setFormData({ ...formData, phone: e.target.value }); setFormErrors({ ...formErrors, phone: '' }) }} />
                                                {formErrors.phone && <p className="text-[10px] text-red-500 mt-1 pl-1 font-bold">{formErrors.phone}</p>}
                                            </div>

                                            <button type="submit" disabled={isSubmitting} className="group w-full mt-4 bg-white text-black hover:bg-zinc-200 rounded-lg h-14 text-sm font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all flex justify-center items-center gap-2 transform hover:-translate-y-1 outline-none disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:-translate-y-0">
                                                {isSubmitting ? (
                                                    <>
                                                        <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                                                        Please wait...
                                                    </>
                                                ) : (
                                                    'Continue to UI View'
                                                )}
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {modalState === 'selection' && (
                            <motion.div
                                initial={{ scale: 0.95, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.95, opacity: 0 }}
                                className="relative w-full max-w-lg rounded-[20px] p-[1px] z-10 overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.9)]"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 opacity-80 animate-[gradient_4s_ease-in-out_infinite] bg-[length:300%_300%]"></div>
                                <div className="relative bg-zinc-950/95 backdrop-blur-2xl rounded-[19px] p-8 md:p-10 w-full h-full text-center flex flex-col items-center">
                                    <button onClick={closeModal} className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors">
                                        <X size={20} />
                                    </button>

                                    <div className="mb-8">
                                        <p className="text-[10px] text-zinc-400 uppercase font-black tracking-[0.3em] mb-2">{selectedSoftware.name}</p>
                                        <h2 className="text-3xl font-display uppercase tracking-tight text-white leading-none drop-shadow-md">
                                            View UI Preview
                                        </h2>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 w-full max-w-sm">
                                        <button
                                            onClick={() => handleDemoSelect('frontend')}
                                            className="group relative flex flex-col items-center justify-center p-6 rounded-xl border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 transition-all hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(56,189,248,0.3)] overflow-hidden"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            <Monitor size={32} strokeWidth={1.5} className="text-cyan-400 mb-4 group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_10px_rgba(56,189,248,0.5)]" />
                                            <div className="flex flex-col items-center relative z-10">
                                                <span className="text-sm font-bold uppercase tracking-widest text-white mb-1">Open UI View</span>
                                                <span className="text-[10px] text-white/70 tracking-widest">(Preview Interface)</span>
                                            </div>
                                        </button>
                                    </div>

                                    <p className="mt-8 text-[11px] text-zinc-500 tracking-wider">
                                        {selectedSoftware.link ? "You will be securely redirected to the UI preview." : "UI preview link is not active yet."}
                                    </p>
                                </div>
                            </motion.div>
                        )}



                        {modalState === 'success' && (
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="relative w-full max-w-sm rounded-2xl bg-zinc-950 border border-zinc-800 p-8 z-10 text-center shadow-[0_0_50px_rgba(0,0,0,0.8)]"
                            >
                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 12 }}>
                                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-5 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                                        <CheckCircle2 size={32} className="text-emerald-400 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
                                    </div>
                                </motion.div>
                                <h3 className="text-xl font-display uppercase tracking-widest text-white mb-2 drop-shadow-sm">
                                    Request Logged
                                </h3>
                                <p className="text-zinc-400 text-xs font-light mb-8 leading-relaxed">
                                    Access will be provided shortly. Our team is provisioning the environment for <span className="text-white font-medium">{selectedSoftware.name}</span>.
                                </p>
                                <button onClick={closeModal} className="w-full bg-zinc-900 border border-zinc-800 text-white hover:bg-white hover:text-black hover:border-white rounded-lg h-12 text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-[0_0_10px_rgba(0,0,0,0.3)]">
                                    Close Window
                                </button>
                            </motion.div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* FEATURES & TECH STACK MODALS */}
            <AnimatePresence>
                {infoModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[110] flex items-center justify-center p-4 overflow-y-auto"
                    >
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/90 backdrop-blur-2xl"
                            onClick={() => setInfoModal(null)}
                        />

                        <motion.div
                            initial={{ scale: 0.92, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.92, opacity: 0, y: 20 }}
                            transition={{ type: "spring", damping: 28, stiffness: 300 }}
                            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[20px] p-[1px] z-10 shadow-[0_0_80px_rgba(0,0,0,0.9)] no-scrollbar"
                        >
                            {/* Neon Border */}
                            <div className={`absolute inset-0 bg-[length:300%_300%] bg-gradient-to-r ${infoModal.type === 'features' ? 'from-amber-400 via-orange-500 to-yellow-500' : infoModal.type === 'how-it-works' ? 'from-cyan-400 via-emerald-500 to-blue-500' : 'from-purple-400 via-blue-500 to-cyan-400'} animate-[gradient_4s_ease-in-out_infinite] opacity-60 rounded-[20px]`}></div>

                            <div className="relative bg-zinc-950/[0.97] backdrop-blur-3xl rounded-[19px] p-6 md:p-8 w-full">
                                {/* Close Button */}
                                <button
                                    onClick={() => setInfoModal(null)}
                                    className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-zinc-900 border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 transition-all duration-200"
                                >
                                    <X size={14} strokeWidth={2.5} />
                                </button>

                                {/* Header */}
                                <div className="mb-6 pr-10">
                                    <span className={`inline-block text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-sm bg-gradient-to-r ${infoModal.project.color} text-white shadow-md mb-3`}>
                                        {infoModal.project.category}
                                    </span>
                                    <h2 className="text-2xl md:text-3xl font-display uppercase tracking-tight text-white mb-1">
                                        {infoModal.project.name}
                                    </h2>
                                    <p className="text-sm text-zinc-400 font-light">{infoModal.project.desc}</p>
                                </div>

                                {/* FEATURES VIEW */}
                                {infoModal.type === 'features' && (
                                    <div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                                            {infoModal.project.detailedFeatures?.map((feat, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: i * 0.06 }}
                                                    className="group/feat p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 hover:border-amber-500/30 hover:bg-zinc-800/50 transition-all duration-300"
                                                >
                                                    <div className="flex items-start gap-3">
                                                        <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0 group-hover/feat:border-amber-400/40 transition-colors">
                                                            <Star size={14} className="text-amber-400" />
                                                        </div>
                                                        <div>
                                                            <h4 className="text-sm font-bold text-white mb-1">{feat.title}</h4>
                                                            <p className="text-[11px] text-zinc-400 leading-relaxed">{feat.description}</p>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* HOW IT WORKS VIEW — Animated Process Explainer */}
                                {infoModal.type === 'how-it-works' && (
                                    <div className="space-y-6">
                                        <div className="relative">
                                            {/* FIX Bug #1 & #5: connector line scoped between steps only —
                                                top-[24px] = half the 48px icon box height (starts at icon centre)
                                                bottom-[24px] = stops at centre of last icon, not below it */}
                                            <div className="absolute left-[23px] top-[24px] bottom-[24px] w-[1.5px] bg-gradient-to-b from-cyan-500/50 via-emerald-500/30 to-transparent" />

                                            <div className="space-y-8">
                                                {/* FIX Bug #2: removed unsafe `as any` cast; added explicit null guard */}
                                                {Array.isArray((infoModal.project as any).howItWorks)
                                                    ? (infoModal.project as any).howItWorks.map((step: any, i: number) => (
                                                    <motion.div
                                                        key={i}
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: i * 0.1 }}
                                                        className="relative flex items-start gap-6 group/step"
                                                    >
                                                        {/* Step Indicator */}
                                                        <div className="relative z-10 w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center flex-shrink-0 group-hover/step:border-cyan-500/50 group-hover/step:shadow-[0_0_15px_rgba(6,182,212,0.2)] transition-all duration-300">
                                                            <step.icon size={20} className="text-cyan-400 group-hover/step:scale-110 transition-transform duration-300" />
                                                            <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center text-[9px] font-black text-white group-hover/step:bg-cyan-500 group-hover/step:border-cyan-400 transition-colors">
                                                                {i + 1}
                                                            </div>
                                                        </div>

                                                        <div className="flex-1 pt-0.5">
                                                            <h4 className="text-base font-bold text-white mb-1 tracking-tight group-hover/step:text-cyan-400 transition-colors">{step.title}</h4>
                                                            <p className="text-xs text-zinc-400 leading-relaxed font-light">{step.description}</p>
                                                        </div>
                                                    </motion.div>
                                                )) : (
                                                    <div className="py-10 text-center">
                                                        <Activity className="mx-auto text-zinc-600 mb-4 animate-pulse" size={32} />
                                                        <p className="text-zinc-500 text-sm italic">Detailed workflow content is being updated for this system.</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="mt-8 pt-6 border-t border-zinc-800/80">
                                            <button
                                                onClick={() => {
                                                    // FIX Bug #7: capture infoModal in a local const before
                                                    // calling setInfoModal(null) to avoid closure staleness
                                                    const project = infoModal.project;
                                                    setInfoModal(null);
                                                    handleSoftClick(project);
                                                }}
                                                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-xs font-black uppercase tracking-widest hover:from-cyan-500 hover:to-blue-500 shadow-lg hover:shadow-cyan-500/20 transition-all active:scale-[0.98]"
                                            >
                                                Ready to Experience This Workflow?
                                                <ArrowRight size={14} />
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* TECH STACK VIEW */}
                                {infoModal.type === 'tech' && (
                                    <div className="space-y-5">
                                        {infoModal.project.techStack && (() => {
                                            const sections = [
                                                { key: 'frontend', label: 'Frontend', color: '#22d3ee', bg: 'rgba(34,211,238,0.06)', border: 'rgba(34,211,238,0.2)', hoverBorder: 'rgba(34,211,238,0.5)' },
                                                { key: 'backend', label: 'Backend', color: '#a78bfa', bg: 'rgba(167,139,250,0.06)', border: 'rgba(167,139,250,0.2)', hoverBorder: 'rgba(167,139,250,0.5)' },
                                                { key: 'database', label: 'Database', color: '#34d399', bg: 'rgba(52,211,153,0.06)', border: 'rgba(52,211,153,0.2)', hoverBorder: 'rgba(52,211,153,0.5)' },
                                                { key: 'infrastructure', label: 'Infrastructure', color: '#fb923c', bg: 'rgba(251,146,60,0.06)', border: 'rgba(251,146,60,0.2)', hoverBorder: 'rgba(251,146,60,0.5)' },
                                                { key: 'integrations', label: 'Integrations', color: '#f472b6', bg: 'rgba(244,114,182,0.06)', border: 'rgba(244,114,182,0.2)', hoverBorder: 'rgba(244,114,182,0.5)' }
                                            ];
                                            const stack = infoModal.project.techStack as Record<string, string[]>;
                                            return sections.map((s, sIdx) => {
                                                const items = stack[s.key];
                                                if (!items || items.length === 0) return null;
                                                return (
                                                    <motion.div
                                                        key={s.key}
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: sIdx * 0.08 }}
                                                    >
                                                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-2.5">{s.label}</h4>
                                                        <div className="flex flex-wrap gap-2">
                                                            {items.map((tech, tIdx) => (
                                                                <motion.span
                                                                    key={tIdx}
                                                                    initial={{ opacity: 0, scale: 0.9 }}
                                                                    animate={{ opacity: 1, scale: 1 }}
                                                                    transition={{ delay: sIdx * 0.08 + tIdx * 0.04 }}
                                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold tracking-wider transition-all duration-300 cursor-default"
                                                                    style={{ color: s.color, backgroundColor: s.bg, border: `1px solid ${s.border}` }}
                                                                    onMouseEnter={(e: React.MouseEvent<HTMLSpanElement>) => { e.currentTarget.style.borderColor = s.hoverBorder; e.currentTarget.style.boxShadow = `0 0 12px ${s.bg}`; }}
                                                                    onMouseLeave={(e: React.MouseEvent<HTMLSpanElement>) => { e.currentTarget.style.borderColor = s.border; e.currentTarget.style.boxShadow = 'none'; }}
                                                                >
                                                                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: s.color }}></span>
                                                                    {tech}
                                                                </motion.span>
                                                            ))}
                                                        </div>
                                                    </motion.div>
                                                );
                                            });
                                        })()}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
