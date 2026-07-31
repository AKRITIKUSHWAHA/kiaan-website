import 'server-only';
import type { SaasChecklistLead } from '@/lib/saasChecklistLead';
import type { AIROILead } from '@/lib/aiRoiLead';
import type { VendorLead } from '@/lib/vendorScorecardLead';

export type DeliveryResult = { delivered: true } | { delivered: false; reason: 'not_configured' | 'provider_error' };

export async function deliverSaasChecklistLead(lead: SaasChecklistLead): Promise<DeliveryResult> {
    const serviceId = process.env.EMAILJS_SERVICE_ID;
    const templateId = process.env.EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.EMAILJS_PUBLIC_KEY;
    if (!serviceId || !templateId || !publicKey) return { delivered: false, reason: 'not_configured' };

    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            service_id: serviceId,
            template_id: templateId,
            user_id: publicKey,
            accessToken: process.env.EMAILJS_PRIVATE_KEY || undefined,
            template_params: {
                name: lead.fullName,
                email: lead.email,
                company: lead.companyName || 'N/A',
                contact_number: lead.phone,
                project_type: lead.projectStage,
                lead_magnet: lead.leadMagnet,
                source_page: lead.sourcePage,
                submitted_at: lead.submittedAt,
                user_agent: lead.userAgent || 'N/A',
                referrer: lead.referrer || 'Direct',
                message: `SaaS checklist lead: ${lead.fullName} (${lead.email}, ${lead.phone}) — ${lead.projectStage}`,
            },
        }),
        cache: 'no-store',
    });

    return response.ok ? { delivered: true } : { delivered: false, reason: 'provider_error' };
}

export async function deliverAIROILead(lead: AIROILead): Promise<DeliveryResult> {
    const serviceId = process.env.EMAILJS_SERVICE_ID, templateId = process.env.EMAILJS_TEMPLATE_ID, publicKey = process.env.EMAILJS_PUBLIC_KEY;
    if (!serviceId || !templateId || !publicKey) return { delivered:false, reason:'not_configured' };
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', { method:'POST', headers:{'Content-Type':'application/json'}, cache:'no-store', body:JSON.stringify({ service_id:serviceId, template_id:templateId, user_id:publicKey, accessToken:process.env.EMAILJS_PRIVATE_KEY || undefined, template_params:{ name:lead.fullName, email:lead.email, company:lead.companyName, contact_number:lead.phone, project_type:lead.businessProcess, lead_magnet:lead.leadMagnet, source_page:lead.sourcePage, submitted_at:lead.submittedAt, message:JSON.stringify({ process:lead.businessProcess, details:lead.processDetails, currency:lead.selectedCurrency, inputs:lead.inputs, results:lead.results }) } }) });
    return response.ok ? { delivered:true } : { delivered:false, reason:'provider_error' };
}

export async function deliverVendorScorecardLead(lead:VendorLead):Promise<DeliveryResult>{
    const serviceId=process.env.EMAILJS_SERVICE_ID,templateId=process.env.EMAILJS_TEMPLATE_ID,publicKey=process.env.EMAILJS_PUBLIC_KEY;if(!serviceId||!templateId||!publicKey)return{delivered:false,reason:'not_configured'};
    const response=await fetch('https://api.emailjs.com/api/v1.0/email/send',{method:'POST',headers:{'Content-Type':'application/json'},cache:'no-store',body:JSON.stringify({service_id:serviceId,template_id:templateId,user_id:publicKey,accessToken:process.env.EMAILJS_PRIVATE_KEY||undefined,template_params:{name:lead.fullName,email:lead.email,company:lead.companyName,contact_number:lead.phone,project_type:lead.vendor.projectType,lead_magnet:lead.leadMagnet,source_page:lead.sourcePage,submitted_at:lead.submittedAt,message:JSON.stringify({budgetRange:lead.budgetRange,startDate:lead.startDate,vendor:lead.vendor,finalScore:lead.score.finalScore,rating:lead.score.rating,categories:lead.score.categories,redFlags:lead.selectedRedFlags,risk:lead.redFlagSeverity})}})});return response.ok?{delivered:true}:{delivered:false,reason:'provider_error'};
}
