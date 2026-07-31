import { MetadataRoute } from 'next';
import { caseStudiesData } from '@/data/caseStudiesData';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://kiaantechnology.com';

    // Core static routes
    const coreRoutes = [
        '',
        '/about',
        '/contact',
        '/pricing',
        '/resources',
        '/demo',
        '/schedule',
        '/privacy',
        '/terms',
        '/why-us',
        '/start-project',
        '/global',
        '/ai-products',
        '/architecture-audit',
        '/blog',
        '/crm',
        '/erp',
        '/hrm',
        '/pos',
        '/methodology',
        '/software-development-company-india',
        '/software-development-company-indore',
        '/saas-development-company-indore',
        '/web-development-company-indore',
        '/it-company-indore'
    ].map(route => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1.0 : 0.8
    }));

    // Service routes
    const services = [
        '/services',
        '/services/ai-automation',
        '/services/custom-software-development',
        '/services/erp-crm-solutions',
        '/services/mobile-app-development',
        '/services/saas-development',
        '/services/web-development'
    ].map(route => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.9
    }));

    // Solutions routes
    const solutions = [
        '/solutions',
        '/solutions/automotive',
        '/solutions/cloud-infrastructure',
        '/solutions/education',
        '/solutions/fintech',
        '/solutions/hospitality',
        '/solutions/industry',
        '/solutions/legacy-modernization',
        '/solutions/logistics',
        '/solutions/professional',
        '/solutions/real-estate',
        '/solutions/ui-ux'
    ].map(route => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8
    }));

    // Industries routes
    const industries = [
        '/industries/fintech-software',
        '/industries/healthcare-software',
        '/industries/retail-technology'
    ].map(route => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8
    }));

    // Case Studies routes
    const caseStudiesRoot = {
        url: `${baseUrl}/case-studies`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.9
    };

    const caseStudies = caseStudiesData.map(study => ({
        url: `${baseUrl}/case-studies/${study.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7
    }));

    return [
        ...coreRoutes,
        ...services,
        ...solutions,
        ...industries,
        caseStudiesRoot,
        ...caseStudies
    ];
}
