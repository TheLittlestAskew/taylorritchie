import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require('C:/Users/theli/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/.pnpm/playwright-core@1.61.1/node_modules/playwright-core');

const root = path.resolve(import.meta.dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const baseUrl = process.argv[2] || 'http://127.0.0.1:4173/';
const screenshotDir = path.join(process.env.TEMP || root, 'taylorritchie-site-audit');
fs.mkdirSync(screenshotDir, { recursive: true });

function check(condition, message) {
  if (!condition) throw new Error(message || 'Audit assertion failed without a message.');
}

// Verification block for check(): both success and failure behavior are explicit.
check(true, 'check() rejected a true condition');
try {
  check(false, 'expected failure');
  throw new Error('check() failed to throw');
} catch (error) {
  check(error.message === 'expected failure', 'check() changed the supplied error message');
}

const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
check(ids.length === new Set(ids).size, 'Duplicate IDs found in index.html');
check((html.match(/<h1\b/g) || []).length === 1, 'Homepage must contain exactly one h1');
check(!/<a\b[^>]*href="(?:#|)"/i.test(html), 'Empty or placeholder anchor found');
check(!/<img\b(?![^>]*\balt=)[^>]*>/i.test(html), 'Image without alt text found');
check(!/483\+|89\.7%/.test(html), 'Disputed Stripe metrics appear on the homepage');

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
      if (message.type() === 'error') runtimeErrors.push(message.text());
    });

    await page.goto(baseUrl, { waitUntil: 'networkidle' });
    check(await page.locator('h1').count() === 1, `${width}px: rendered h1 count is not one`);
    check(await page.locator('.rail-nav a[href="#about"]').isVisible(), `${width}px: primary navigation is not visible`);
    check(await page.locator('details.work-archive summary').isVisible(), `${width}px: work archive control is not visible`);
    const overflow = await page.evaluate(() => ({
      pageWidth: document.documentElement.scrollWidth,
      viewportWidth: window.innerWidth,
      offenders: [...document.querySelectorAll('body *')]
        .filter((element) => element.getBoundingClientRect().right > window.innerWidth + 1 || element.getBoundingClientRect().left < -1)
        .slice(0, 8)
        .map((element) => `${element.tagName.toLowerCase()}.${element.className || ''}:${Math.round(element.getBoundingClientRect().left)}..${Math.round(element.getBoundingClientRect().right)}`)
    }));
    await page.evaluate(() => window.scrollTo(9999, 0));
    const horizontalScroll = await page.evaluate(() => window.scrollX);
    check(horizontalScroll === 0, `${width}px: page can scroll horizontally (${overflow.pageWidth}/${overflow.viewportWidth}); ${overflow.offenders.join(', ')}`);
    check(runtimeErrors.length === 0, `${width}px: console/page errors: ${runtimeErrors.join(' | ')}`);

    await page.locator('details.work-archive summary').click();
    check(await page.locator('details.work-archive').getAttribute('open') !== null, `${width}px: work archive did not open`);
    await page.locator('a[href="#contact"]').click();
    check((await page.url()).endsWith('#contact'), `${width}px: contact anchor navigation failed`);
    if (width === 320 || width === 1440) {
      await page.screenshot({ path: path.join(screenshotDir, `homepage-${width}.png`), fullPage: true });
    }
    await page.close();
  }
} finally {
  await browser.close();
}

console.log(`PASS: static checks and browser checks at ${sizes.join(', ')}px`);
console.log(`Screenshots: ${screenshotDir}`);
