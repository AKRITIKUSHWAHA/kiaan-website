# Akriti Kushwaha - Code Changes Summary

Yeh file Akriti Kushwaha ke dwara kiye gaye changes ko track karne ke liye hai. Isme code files ke links, Localhost validation links, aur Live production links details ke sath shamil hain.

---

## 🚀 1. New Features & Core Pages (Naye Pages aur UI)

Aapne project me new pages add kiye hain aur analytics tracker code set kiya hai:

| Sl. No. | Feature Page / Component | Local File Link | Localhost Link (Port 3000) | Live Production Link |
| :---: | :--- | :--- | :--- | :--- |
| 1 | **Partners Page** <br>*(Partner program info page)* | [partners/page.tsx](file:///d:/Kiaan%20Work/kiaan%20project/Kiaan_Project/src/app/partners/page.tsx) | [http://localhost:3000/partners](http://localhost:3000/partners) | [Live Link](https://kiaantechnology.com/partners) |
| 2 | **Referral Page** <br>*(Referrals signup & details page)* | [referral/page.tsx](file:///d:/Kiaan%20Work/kiaan%20project/Kiaan_Project/src/app/referral/page.tsx) | [http://localhost:3000/referral](http://localhost:3000/referral) | [Live Link](https://kiaantechnology.com/referral) |
| 3 | **As Seen On Section** <br>*(Trust logos on landing page)* | [AsSeenOnSection.tsx](file:///d:/Kiaan%20Work/kiaan%20project/Kiaan_Project/src/components/home/AsSeenOnSection.tsx) | [http://localhost:3000/](http://localhost:3000/) | [Live Link](https://kiaantechnology.com/) |
| 4 | **Retargeting Tracker** <br>*(Visitor tracking pixels script)* | [RetargetingTracker.tsx](file:///d:/Kiaan%20Work/kiaan%20project/Kiaan_Project/src/components/analytics/RetargetingTracker.tsx) | *Loads in background on all pages* | *Enabled Live* |

---

## 🎨 2. UI Restructuring & Bug Fixes (Purane Pages me Updates)

Aapne layouts clean kiye hain aur UI bugs fix kiye hain:

* **Not Found Page (404 Error page design cleanup):**
  * **Code Link:** [not-found.tsx](file:///d:/Kiaan%20Work/kiaan%20project/Kiaan_Project/src/app/not-found.tsx)
  * **Localhost test:** [http://localhost:3000/some-invalid-page](http://localhost:3000/some-invalid-page)
  * **Live test:** [https://kiaantechnology.com/some-invalid-page](https://kiaantechnology.com/some-invalid-page)

* **Case Studies Layout & Polish:**
  * **Grid Page Code:** [case-studies/page.tsx](file:///d:/Kiaan%20Work/kiaan%20project/Kiaan_Project/src/app/case-studies/page.tsx)
  * **Slug Details Page Code:** [case-studies/[slug]/page.tsx](file:///d:/Kiaan%20Work/kiaan%20project/Kiaan_Project/src/app/case-studies/[slug]/page.tsx)
  * **Card UI Component:** [CaseStudyCard.tsx](file:///d:/Kiaan%20Work/kiaan%20project/Kiaan_Project/src/components/case-studies/CaseStudyCard.tsx)
  * **Localhost URL:** [http://localhost:3000/case-studies](http://localhost:3000/case-studies)
  * **Live URL:** [https://kiaantechnology.com/case-studies](https://kiaantechnology.com/case-studies)

* **Common Layout & Footer logo fix:**
  * **Layout Code:** [layout.tsx](file:///d:/Kiaan%20Work/kiaan%20project/Kiaan_Project/src/app/layout.tsx)
  * **Footer Component:** [Footer.tsx](file:///d:/Kiaan%20Work/kiaan%20project/Kiaan_Project/src/components/Footer.tsx)

---

## ⚡ 3. Image Optimization (Converting to WebP)

Lighthouse score improve karne ke liye, heavy `.png`/`.jpg` files ko remove karke optimized `.webp` formats use kiya:

* **Files Modified/Replaced:**
  * Certificates & Ambitionbox/Glassdoor logos are updated inside [public/frontPage/](file:///d:/Kiaan%20Work/kiaan%20project/Kiaan_Project/public/frontPage) and [public/images/](file:///d:/Kiaan%20Work/kiaan%20project/Kiaan_Project/public/images).
  * References are updated in:
    * [AwardBanner.tsx](file:///d:/Kiaan%20Work/kiaan%20project/Kiaan_Project/src/components/AwardBanner.tsx)
    * [AwardMarquee.tsx](file:///d:/Kiaan%20Work/kiaan%20project/Kiaan_Project/src/components/home/AwardMarquee.tsx)

---

## 📂 4. Marketing Campaign & Workflow Data Configs

Aapne features ko handle karne ke liye static constants/configs file define kiye hain:

* **Files Added:**
  * [g2ReviewCampaign.ts](file:///d:/Kiaan%20Work/kiaan%20project/Kiaan_Project/src/data/g2ReviewCampaign.ts) (G2 review setup data)
  * [referralProgramData.ts](file:///d:/Kiaan%20Work/kiaan%20project/Kiaan_Project/src/data/referralProgramData.ts) (Referral configurations)
  * [newsletterSponsorship.ts](file:///d:/Kiaan%20Work/kiaan%20project/Kiaan_Project/src/data/newsletterSponsorship.ts) (Newsletter settings)
  * [coreHoursConfig.ts](file:///d:/Kiaan%20Work/kiaan%20project/Kiaan_Project/src/data/coreHoursConfig.ts) (Operational timing constants)
  * [podcastGuesting.ts](file:///d:/Kiaan%20Work/kiaan%20project/Kiaan_Project/src/data/podcastGuesting.ts)
  * [emailNurtureSequence.ts](file:///d:/Kiaan%20Work/kiaan%20project/Kiaan_Project/src/data/emailNurtureSequence.ts)
  * [timeTrackingConfig.ts](file:///d:/Kiaan%20Work/kiaan%20project/Kiaan_Project/src/data/timeTrackingConfig.ts)
  * [projectStatusReportConfig.ts](file:///d:/Kiaan%20Work/kiaan%20project/Kiaan_Project/src/data/projectStatusReportConfig.ts)
  * [asyncStandupConfig.ts](file:///d:/Kiaan%20Work/kiaan%20project/Kiaan_Project/src/data/asyncStandupConfig.ts)
  * [awsPartnerApplication.ts](file:///d:/Kiaan%20Work/kiaan%20project/Kiaan_Project/src/data/awsPartnerApplication.ts)
  * [competitorBacklinkStrategy.ts](file:///d:/Kiaan%20Work/kiaan%20project/Kiaan_Project/src/data/competitorBacklinkStrategy.ts)
  * [contentFreshness.ts](file:///d:/Kiaan%20Work/kiaan%20project/Kiaan_Project/src/data/contentFreshness.ts)
  * [githubBranchProtectionConfig.ts](file:///d:/Kiaan%20Work/kiaan%20project/Kiaan_Project/src/data/githubBranchProtectionConfig.ts)
  * [infographicsOutreach.ts](file:///d:/Kiaan%20Work/kiaan%20project/Kiaan_Project/src/data/infographicsOutreach.ts)
  * [partnerProgramData.ts](file:///d:/Kiaan%20Work/kiaan%20project/Kiaan_Project/src/data/partnerProgramData.ts)
  * [retargetingCampaigns.ts](file:///d:/Kiaan%20Work/kiaan%20project/Kiaan_Project/src/data/retargetingCampaigns.ts)

---

## 🛠️ 5. Repository Configuration

PR guidelines ko standardized rakhne ke liye settings add kiya:
* **CODEOWNERS:** [`.github/CODEOWNERS`](file:///d:/Kiaan%20Work/kiaan%20project/Kiaan_Project/.github/CODEOWNERS)
* **PR Template:** [`.github/PULL_REQUEST_TEMPLATE.md`](file:///d:/Kiaan%20Work/kiaan%20project/Kiaan_Project/.github/PULL_REQUEST_TEMPLATE.md)
