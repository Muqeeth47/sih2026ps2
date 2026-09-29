/**
 * screenshot-slides.js
 * Captures screenshots of sih239.vercel.app for SIH 2026 presentation slides.
 * Run: node scripts/screenshot-slides.js
 */

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const BASE_URL = 'https://sih239.vercel.app';
const OUT_DIR = path.join(__dirname, '..', 'presentation-assets');

const SLIDES = [
  {
    name: 'slide1_landing_overview.png',
    url: `${BASE_URL}/`,
    description: 'Slide 1 – Title & Problem Overview (Landing page)',
    waitFor: 3000,
  },
  {
    name: 'slide2_applicant_dashboard.png',
    url: `${BASE_URL}/applicant`,
    description: 'Slide 2 – Proposed Solution & Uniqueness (Applicant Dashboard)',
    waitFor: 3000,
  },
  {
    name: 'slide3_ai_scrutiny_workbench.png',
    url: `${BASE_URL}/officer/review/APP-2024-NFST-001`,
    description: 'Slide 3 – Technical Approach (AI Scrutiny Review Workbench)',
    waitFor: 3000,
  },
  {
    name: 'slide4_merit_list_dsc.png',
    url: `${BASE_URL}/admin/merit-list`,
    description: 'Slide 4 – Feasibility & Viability (Merit List Allocation Engine)',
    waitFor: 3000,
  },
  {
    name: 'slide5_kpi_dashboard.png',
    url: `${BASE_URL}/admin`,
    description: 'Slide 5 – Impact & Benefits (Ministry Admin KPI Analytics)',
    waitFor: 3000,
  },
  {
    name: 'slide6_scheme_rules.png',
    url: `${BASE_URL}/scholarships`,
    description: 'Slide 6 – Research & References (Scholarship Directory & Rules)',
    waitFor: 3000,
  },
];

(async () => {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

  for (const slide of SLIDES) {
    console.log(`\n→ ${slide.description}`);
    console.log(`  URL: ${slide.url}`);
    try {
      await page.goto(slide.url, { waitUntil: 'networkidle2', timeout: 30000 });
      await new Promise(r => setTimeout(r, slide.waitFor));
      const outPath = path.join(OUT_DIR, slide.name);
      await page.screenshot({ path: outPath, fullPage: false });
      console.log(`  ✓ Saved → ${outPath}`);
    } catch (err) {
      console.error(`  ✗ Failed: ${err.message}`);
    }
  }

  await browser.close();
  console.log(`\n✅ All screenshots saved to: ${OUT_DIR}`);
})();
