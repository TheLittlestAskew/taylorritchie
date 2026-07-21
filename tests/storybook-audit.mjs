import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require('C:/Users/theli/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/.pnpm/playwright-core@1.61.1/node_modules/playwright-core');
const root = path.resolve(import.meta.dirname, '..');
const filename = 'storybook-concept.html';
const html = fs.readFileSync(path.join(root, filename), 'utf8');
const baseUrl = process.argv[2] || `http://127.0.0.1:4173/${filename}`;
const screenshotDir = path.join(process.env.TEMP || root, 'taylorritchie-storybook-audit');
fs.mkdirSync(screenshotDir, { recursive: true });

function check(condition, message) {
  if (!condition) throw new Error(message || 'Storybook audit assertion failed without a message.');
}

// Verification block for check(): preserve both success and explicit failure behavior.
check(true, 'check() rejected a true condition');
try {
  check(false, 'expected failure');
  throw new Error('check() failed to throw');
} catch (error) {
  check(error.message === 'expected failure', 'check() changed the supplied error message');
}

const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
check(ids.length === new Set(ids).size, `Duplicate IDs found in ${filename}`);
check((html.match(/<h1\b/g) || []).length === 1, 'Prototype must contain exactly one h1');
check(!/<a\b[^>]*href="(?:#|)"/i.test(html), 'Empty or placeholder anchor found');
check(!/<img\b(?![^>]*\balt=)[^>]*>/i.test(html), 'Image without alt text found');
check(!/483\+|89\.7%/.test(html), 'Disputed Stripe metrics appear in the prototype');

for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
  const target = match[1];
  if (!target || /^(?:https?:|mailto:|tel:|data:|#)/.test(target)) continue;
  const cleanTarget = decodeURIComponent(target.split(/[?#]/)[0]);
  check(fs.existsSync(path.join(root, cleanTarget)), `Missing local target: ${target}`);
}

const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' });
const sizes = [320, 375, 480, 768, 1024, 1280, 1440, 1920];

try {
  for (const width of sizes) {
    const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
    const runtimeErrors = [];
    page.on('pageerror', (error) => runtimeErrors.push(error.message));
    page.on('console', (message) => {
      if (message.type() === 'error' || message.type() === 'assert') runtimeErrors.push(message.text());
    });

    await page.goto(baseUrl, { waitUntil: 'networkidle' });
    check(await page.locator('h1').count() === 1, `${width}px: rendered h1 count is not one`);
    check(await page.locator('.nav-links a[href="#work"]').isVisible(), `${width}px: primary navigation is not visible`);
    check(await page.locator('#chapter-one .evidence-card').isVisible(), `${width}px: first evidence card is not visible`);
    const horizontalScroll = await page.evaluate(() => {
      window.scrollTo(9999, 0);
      return window.scrollX;
    });
    check(horizontalScroll === 0, `${width}px: page can scroll horizontally`);
    check(runtimeErrors.length === 0, `${width}px: console/page errors: ${runtimeErrors.join(' | ')}`);

    await page.locator('a[href="#creative"]').first().click();
    check((await page.url()).endsWith('#creative'), `${width}px: creative-system anchor navigation failed`);
    const transformedLayers = await page.locator('[data-depth]').evaluateAll((layers) => layers.filter((layer) => getComputedStyle(layer).transform !== 'none').length);
    check(transformedLayers === 0, `${width}px: reduced-motion mode retained transformed parallax layers`);

    if (width === 320 || width === 1440) {
      await page.goto(baseUrl, { waitUntil: 'networkidle' });
      await page.screenshot({ path: path.join(screenshotDir, `storybook-${width}.png`), fullPage: true });
    }
    await page.close();
  }

  const motionPage = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'no-preference' });
  await motionPage.goto(baseUrl, { waitUntil: 'networkidle' });
  check(await motionPage.locator('.gsap-marker-start').count() === 0, 'GSAP development markers are visible');
  await motionPage.evaluate(() => window.scrollTo(0, document.querySelector('#chapter-one').offsetTop + 500));
  await motionPage.waitForTimeout(800);
  const activeTransforms = await motionPage.locator('[data-depth]').evaluateAll((layers) => layers.filter((layer) => getComputedStyle(layer).transform !== 'none').length);
  check(activeTransforms > 0, 'Desktop motion mode did not activate parallax transforms');
  await motionPage.close();
} finally {
  await browser.close();
}

console.log(`PASS: storybook static, reduced-motion, and browser checks at ${sizes.join(', ')}px`);
console.log(`Screenshots: ${screenshotDir}`);
