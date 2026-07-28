"use client";

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Activity, Home, Car, ShoppingBag, Truck, CheckSquare,
    DollarSign, Utensils, Briefcase, Link as LinkIcon, Lock,
    Shield, Zap, X, Copy, Play, Monitor, Server, CheckCircle2, Loader2, Maximize2,
    Layers, Cpu, Calendar, Star, ArrowRight,
    Settings, Users, ClipboardList, MousePointer2,
    RefreshCcw, Code, Share2, HardHat, GraduationCap
} from 'lucide-react'
import { Reveal } from '@/components/Reveal'
import Link from 'next/link';
import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE_ID = 'service_opc05wm';
const EMAILJS_TEMPLATE_ID = 'template_jpwu4pp';
const EMAILJS_PUBLIC_KEY = 'zXyGNtU81gEw6BmhH';

// Specific Software Data Setup per requirements
const softwareList = [
    {
        id: 100,
        name: 'FloraBloom - Online Flower Boutique',
        category: 'Retail',
        desc: 'A premium, highly interactive online floral boutique specializing in designer bouquets, luxury gifting, and streamlined local delivery management.',
        link: 'https://flower-boutique01.netlify.app/',
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
        id: 36,
        name: 'Turf Booking & Sports Facility Management',
        category: 'Sports',
        desc: 'Turf booking and slot scheduling interface.',
        link: 'https://turfui.kiaansoftware.com',
        color: 'from-emerald-400 to-teal-500',
        glow: 'rgba(20, 184, 166, 0.4)',
        icon: CheckSquare,
        type: 'Web App',
        status: 'Live',
        features: ['Slot Booking', 'Schedule Control', 'Venue Management'],
        detailedFeatures: [
            { title: 'Slot Reservations', description: 'Let users browse and reserve turf slots online.' },
            { title: 'Booking Calendar', description: 'Manage daily bookings, blocked slots, and availability.' },
            { title: 'Venue Operations', description: 'Handle turf schedules, pricing, and customer activity.' }
        ],
        howItWorks: [
            { icon: Calendar, title: 'Pick date and time', description: 'Customers see open slots for the turf—no phone tag; they choose what fits their schedule.' },
            { icon: CheckSquare, title: 'Confirm the booking', description: 'The system reserves the slot and updates the calendar so double-bookings do not happen.' },
            { icon: Settings, title: 'Venue controls the day', description: 'Staff block maintenance windows, adjust pricing, and see who is playing when at a glance.' }
        ],
        topSelling: true,
        techStack: { frontend: ['React'], backend: ['Node.js'], database: ['MongoDB'], infrastructure: ['AWS'], integrations: [] }
    },
    {
        id: 37,
        name: 'Digital Health Assistant Platform',
        category: 'Health',
        desc: 'Healthcare outreach and service coordination platform.',
        link: 'http://healthsakhis.kiaansoftware.com/',
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
        name: 'Agro Supply Chain Management System',
        category: 'Enterprise',
        desc: 'Agro operations and project management platform.',
        link: 'http://freewayagro.kiaansoftware.com',
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
        name: 'Tractor Rental & Fleet Management Platform',
        category: 'Enterprise',
        desc: 'Farmer-facing portal for tractor services, connections, and agri workflows.',
        link: 'https://tractorlink.netlify.app/farmer',
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
        name: 'Business Operations Management Suite',
        category: 'Enterprise',
        desc: 'Business workflow and operations management suite.',
        link: 'https://cloveo.kiaansoftware.com',
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
        name: 'Property Management System',
        category: 'Real Estate',
        desc: 'Property listing and management platform.',
        link: 'https://property1.kiaansoftware.com',
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
        id: 50,
        name: 'Loan Management & Lending Platform',
        category: 'Finance / Banking',
        desc: 'End-to-end digital lending ecosystem for loan origination, servicing, and portfolio management.',
        link: 'https://lms.softwaredemolive.live',
        color: 'from-emerald-500 to-teal-600',
        glow: 'rgba(16, 185, 129, 0.4)',
        icon: DollarSign,
        type: 'Web App',
        status: 'Live',
        features: ['Digital Onboarding', 'Credit Scoring', 'Disbursement Engine'],
        detailedFeatures: [
            { title: 'Paperless Onboarding', description: 'Complete digital KYC and document submission for faster loan processing.' },
            { title: 'Smart Credit Check', description: 'Automated eligibility checks and credit limit calculations based on user data.' },
            { title: 'Automated Payouts', description: 'Seamless fund disbursement to verified bank accounts upon approval.' }
        ],
        howItWorks: [
            { icon: ClipboardList, title: 'Apply for Loan', description: 'Borrowers submit their details and documents through a guided digital application.' },
            { icon: CheckCircle2, title: 'Credit Review', description: 'System analyzes profiles and provides instant or assisted credit decisions.' },
            { icon: DollarSign, title: 'Manage Repayments', description: 'Track EMI schedules and make payments through integrated gateways.' }
        ],
        topSelling: true,
        techStack: { frontend: ['React'], backend: ['Node.js'], database: ['PostgreSQL'], infrastructure: ['AWS'], integrations: [] }
    },
    {
        id: 52,
        name: 'Property & Rental Management Platform',
        category: 'Real Estate',
        desc: 'Comprehensive property portfolio management, leasing, and tenant relationship suite.',
        link: 'https://property-peach-management.softwaredemolive.live',
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
        id: 58,
        name: 'Multi-Clinic Healthcare Management System',
        category: 'Health',
        desc: 'Enterprise healthcare platform for managing multiple clinic branches and centralized patient records.',
        link: 'https://dhnawantariclinic.softwaredemolive.live',
        color: 'from-blue-600 to-indigo-700',
        glow: 'rgba(37, 99, 235, 0.4)',
        icon: Activity,
        type: 'Web App',
        status: 'Live',
        features: ['Centralized Patient Data', 'Doctor Specialization', 'Appointment Tracking'],
        detailedFeatures: [
            { title: 'Multi-Branch Support', description: 'Manage multiple clinic locations from a single unified dashboard.' },
            { title: 'Specialized Consultations', description: 'Categorize consultations by medical specialization for better patient routing.' },
            { title: 'Electronic Health Records', description: 'Securely store and share patient records across all clinic branches.' }
        ],
        howItWorks: [
            { icon: Home, title: 'Select Branch', description: 'Patients choose their preferred clinic location and view available specialists.' },
            { icon: Calendar, title: 'Schedule Visit', description: 'Book appointments and receive automated reminders for the selected branch.' },
            { icon: Activity, title: 'Centralized Records', description: 'Doctors access patient history regardless of which branch the patient visited previously.' }
        ],
        techStack: { frontend: ['React'], backend: ['Node.js'], database: ['PostgreSQL'], infrastructure: ['AWS'], integrations: [] }
    },
    {
        id: 59,
        name: 'Advanced Property Management Suite',
        category: 'Real Estate',
        desc: 'High-end property ecosystem for portfolio analytics, lease automation, and vendor coordination.',
        link: 'https://propertythree.softwaredemolive.live',
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
        id: 61,
        name: 'Tele Health Care & Virtual Care Platform',
        category: 'Health',
        desc: 'Advanced telemedicine ecosystem for virtual consultations, remote patient monitoring, and digital care.',
        link: 'https://telehealthcare.softwaredemolive.live',
        color: 'from-blue-400 to-cyan-600',
        glow: 'rgba(6, 182, 212, 0.4)',
        icon: Activity,
        type: 'Web App',
        status: 'Live',
        features: ['Virtual Consultations', 'Remote Monitoring', 'E-Pharmacy Integration'],
        detailedFeatures: [
            { title: 'Tele-Consultation', description: 'Schedule and conduct high-quality video consultations with medical experts.' },
            { title: 'Patient Data Hub', description: 'Securely manage medical history, reports, and real-time health vitals.' },
            { title: 'Prescription Management', description: 'Generate digital prescriptions and link them to pharmacy services.' }
        ],
        howItWorks: [
            { icon: Monitor, title: 'Connect with Doctor', description: 'Patients select specialists and start virtual sessions instantly.' },
            { icon: Activity, title: 'Share Vitals', description: 'Upload or link health monitoring devices for accurate clinical evaluation.' },
            { icon: ClipboardList, title: 'Follow-up Care', description: 'Receive digital care plans and schedule subsequent virtual check-ups.' }
        ],
        topSelling: true,
        techStack: { frontend: ['React'], backend: ['Node.js'], database: ['PostgreSQL'], infrastructure: ['AWS'], integrations: [] }
    },
    {
        id: 62,
        name: 'Multi-Tenant SaaS Business Platform',
        category: 'SaaS',
        desc: 'Enterprise-grade multi-tenant architecture for scalable business operations and white-labeled services.',
        link: 'https://multi-tenant-saas.softwaredemolive.live',
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
        id: 66,
        name: 'Digital Library & Book Reading Platform',
        category: 'Education',
        desc: 'Cloud-based digital repository and immersive reading experience for academic and personal growth.',
        link: 'https://bookreading.softwaredemolive.live',
        color: 'from-amber-400 to-orange-600',
        glow: 'rgba(245, 158, 11, 0.4)',
        icon: ClipboardList,
        type: 'Web App',
        status: 'Live',
        features: ['E-Book Catalog', 'Personal Reading Lists', 'Academic Resources'],
        detailedFeatures: [
            { title: 'Digital Repository', description: 'Access a vast collection of e-books, journals, and academic papers.' },
            { title: 'Reading Experience', description: 'Customize reading settings, highlights, and notes within the platform.' },
            { title: 'Resource Sharing', description: 'Facilitate academic collaboration through shared reading lists and research hubs.' }
        ],
        howItWorks: [
            { icon: Monitor, title: 'Browse Collection', description: 'Explore categorized books and resources using advanced search and filters.' },
            { icon: ClipboardList, title: 'Add to Library', description: 'Save titles to personal lists and track reading progress over time.' },
            { icon: Share2, title: 'Collaborate', description: 'Share resources and insights with peers or within research groups.' }
        ],
        techStack: { frontend: ['React'], backend: ['Node.js'], database: ['MongoDB'], infrastructure: ['AWS'], integrations: [] }
    },
    {
        id: 67,
        name: 'Dental Clinic Management System',
        category: 'Health',
        desc: 'Advanced dental clinic operations, patient records, and specialized procedure tracking platform.',
        link: 'http://dentist.softwaredemolive.live',
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
        name: 'English CRM & Language Institute Portal',
        category: 'Enterprise',
        desc: 'Specialized CRM for language academies to manage student inquiries, enrollment pipelines, course schedules, and batches.',
        link: 'https://english-crm.kiaansoftware.com',
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
        name: 'SyncFlow Project & Workflow Suite',
        category: 'Enterprise',
        desc: 'Interactive project board, task management, and team collaboration workspace inspired by Monday.com.',
        link: 'https://mondaydotcom.kiaansoftware.com',
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
        id: 79,
        name: 'AI Workforce Platform',
        category: 'HR & Finance',
        desc: 'Advanced human capital management and AI-powered workforce optimization suite.',
        link: 'https://hcm-demo.softwaredemolive.live',
        color: 'from-violet-500 to-purple-600',
        glow: 'rgba(167, 139, 250, 0.4)',
        icon: Users,
        type: 'Web App',
        status: 'Live',
        features: ['AI Shift Allocation', 'Performance Analytics', 'Smart Payroll Sync'],
        detailedFeatures: [
            { title: 'AI Shift Allocation', description: 'Intelligent scheduling algorithm to optimize shift patterns, coverage, and staff preferences automatically.' },
            { title: 'Performance Analytics', description: 'Real-time dashboards tracking team efficiency, goal completion rates, and active contribution metrics.' },
            { title: 'Smart Payroll Sync', description: 'Seamless automated bridge to push validated operational timesheets and shift adjustments directly into payroll engines.' }
        ],
        howItWorks: [
            { icon: Users, title: 'Onboard & Setup Profiles', description: 'Employees submit credentials, availability, and skillset parameters to build structured talent profiles.' },
            { icon: Calendar, title: 'Automated Shift Scheduling', description: 'AI evaluates active workloads and maps optimal shift structures with zero conflict.' },
            { icon: Activity, title: 'Track Team Milestones', description: 'Managers view progress snapshots and performance trends without digging through manuals.' }
        ],
        topSelling: true,
        techStack: { frontend: ['React'], backend: ['Node.js'], database: ['PostgreSQL'], infrastructure: ['AWS'], integrations: ['Slack', 'Stripe'] }
    },
    {
        id: 80,
        name: 'AI Tele-Calling & CRM Suite',
        category: 'Professional',
        desc: 'High-performance lead management and AI-driven tele-calling suite for outbound sales teams.',
        link: 'https://tele-managment.softwaredemolive.live',
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
]

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

    const [infoModal, setInfoModal] = useState<{ project: typeof softwareList[0]; type: 'features' | 'tech' | 'how-it-works' } | null>(null)
    const [selectedCategory, setSelectedCategory] = useState("All")
    const [selectedType, setSelectedType] = useState("All")

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
        const filtered = softwareList.filter(soft => {
            // Category Filter
            let categoryMatch = true;
            if (selectedCategory !== "All") {
                if (selectedCategory === "Real Estate") categoryMatch = soft.category === "Real Estate";
                else if (selectedCategory === "Finance & Banking") categoryMatch = ["HR & Finance", "Finance", "Finance / Billing", "Finance / Banking"].includes(soft.category);
                else if (selectedCategory === "Retail & Logistics") categoryMatch = ["Retail", "Logistics", "Retail & Logistics"].includes(soft.category);
                else if (selectedCategory === "Healthcare") categoryMatch = ["Health", "Health / HR"].includes(soft.category);
                else if (selectedCategory === "EdTech") categoryMatch = soft.category === "Education";
                else if (selectedCategory === "Enterprise") categoryMatch = ["Professional", "Productivity", "Enterprise", "SaaS", "Events"].includes(soft.category);
                else if (selectedCategory === "AI & Automation") categoryMatch = soft.category === "Artificial Intelligence";
                else if (selectedCategory === "Sports") categoryMatch = soft.category === "Sports";
                else categoryMatch = false;
            }

            // Type Filter
            let typeMatch = true;
            if (selectedType !== "All") {
                typeMatch = (soft as any).type === selectedType;
            }

            return categoryMatch && typeMatch;
        });

        // Highlight premium apps at the top (HRM, Hospital, Loan, Construction, etc.)
        const priorityIds = [79, 45, 69, 77, 68, 78, 58, 42, 76, 75, 74, 73];
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
                            `Preview Link: ${selectedSoftware?.link || 'N/A'}`
                        ].join('\n')
                    },
                    EMAILJS_PUBLIC_KEY
                );

                setModalState('selection');
                setFormErrors({ email: '', phone: '' }); // Clear on success
            } catch (error) {
                console.error('Demo request email failed', error);
                // Still allow them to see the demo even if email fails to avoid blocking the user journey
                setModalState('selection');
                setFormErrors({ email: '', phone: '' });
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
            <section className="relative z-10 pt-24 pb-0 container mx-auto px-4 lg:px-8 max-w-[1400px]">
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

                                {/* HOW IT WORKS VIEW */}
                                {infoModal.type === 'how-it-works' && (
                                    <div className="space-y-6">
                                        <div className="relative">
                                            {/* Vertical connector line */}
                                            <div className="absolute left-6 top-0 bottom-0 w-[1.5px] bg-gradient-to-b from-cyan-500/50 via-emerald-500/50 to-transparent"></div>

                                            <div className="space-y-8">
                                                {(infoModal.project as any).howItWorks ? (infoModal.project as any).howItWorks.map((step: any, i: number) => (
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
                                                onClick={() => { setInfoModal(null); handleSoftClick(infoModal.project); }}
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
