import { chromium, devices } from "playwright";
import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

const projects = [
  ["maniac-nails", "https://maniac-nails.com/"],
  ["free-the-roots", "https://freetheroots.com/"],
  ["laudi-vidni", "https://laudividni.com/"],
  ["starfire-direct", "https://starfiredirect.com/"],
  ["slingshot-sports", "https://slingshotsports.com/"],
  ["cpap-machines-canada", "https://cpapmachinescanada.ca/"],
  ["nectar-usa", "https://nectarusa.com/"],
  ["salty-crush", "https://saltycrush.com.au/"],
  ["vibe-kayaks", "https://vibekayaks.com/"],
  ["the-cacao-club", "https://thecacaoclub.com/"],
];

const outDir = path.join(process.cwd(), "public", "projects");
await fs.mkdir(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true });

async function dismiss(page) {
  const selectors = [
    'button:has-text("Accept")',
    'button:has-text("Accept all")',
    'button:has-text("Allow all")',
    'button:has-text("Got it")',
    'button:has-text("Close")',
    '[aria-label="Close"]',
    '.klaviyo-close-form',
  ];

  for (const selector of selectors) {
    try {
      const el = page.locator(selector).first();
      if (await el.isVisible({ timeout: 500 })) await el.click({ timeout: 800 });
    } catch {}
  }
}

async function capture(slug, url, kind) {
  const isMobile = kind === "mobile";
  const context = await browser.newContext(
    isMobile
      ? {
          ...devices["iPhone 14 Pro"],
          colorScheme: "light",
          reducedMotion: "reduce",
        }
      : {
          viewport: { width: 1440, height: 1000 },
          deviceScaleFactor: 1,
          colorScheme: "light",
          reducedMotion: "reduce",
        }
  );

  const page = await context.newPage();
  page.setDefaultTimeout(20000);

  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 });
    await page.waitForTimeout(3500);
    await dismiss(page);

    // Freeze animation/video for stable captures.
    await page.addStyleTag({
      content: `
        *, *::before, *::after {
          animation-duration: 0s !important;
          animation-delay: 0s !important;
          transition-duration: 0s !important;
          caret-color: transparent !important;
        }
        video { visibility: hidden !important; }
      `,
    });

    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(500);

    const pngPath = path.join(outDir, `${slug}-${kind}.png`);
    const webpPath = path.join(outDir, `${slug}-${kind}.webp`);

    await page.screenshot({
      path: pngPath,
      fullPage: false,
      animations: "disabled",
    });

    await sharp(pngPath)
      .resize({
        width: isMobile ? 480 : 1280,
        withoutEnlargement: true,
      })
      .webp({ quality: 82, effort: 5 })
      .toFile(webpPath);

    await fs.unlink(pngPath);
    console.log(`✓ ${slug} ${kind}`);
  } catch (error) {
    console.error(`✗ ${slug} ${kind}:`, error.message);
  } finally {
    await context.close();
  }
}

for (const [slug, url] of projects) {
  await capture(slug, url, "desktop");
  await capture(slug, url, "mobile");
}

await browser.close();
