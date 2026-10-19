const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  console.log('=== PLAYWRIGHT LIVE AUDIT OF HTTPS://LALHIT.FUN/ ===');

  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const artifactDir = '/Users/miteshnijhara/.gemini/antigravity/brain/6ae184f6-c178-4e69-bc60-fd07fb28bb9e';

  // Desktop Audit
  console.log('\n--- 1. DESKTOP AUDIT (1920x1080) ---');
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();

  const consoleErrors = [];
  const networkErrors = [];

  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  page.on('response', resp => {
    if (resp.status() >= 400) {
      networkErrors.push(`${resp.status()} ${resp.url()}`);
    }
  });

  const t0 = Date.now();
  const resp = await page.goto('https://lalhit.fun/', { waitUntil: 'networkidle', timeout: 30000 });
  const loadTime = Date.now() - t0;
  console.log(`HTTP Status: ${resp.status()} (Load time: ${loadTime}ms)`);

  // Screenshot initial menu
  await page.screenshot({ path: path.join(artifactDir, 'live_playwright_desktop_menu.png') });
  console.log('✓ Captured desktop menu screenshot');

  // Verify elements on live site
  const title = await page.title();
  console.log(`Page Title: ${title}`);

  const hasStartBtn = await page.isVisible('#startBtn');
  const hasArmoryBtn = await page.isVisible('#armoryMenuBtn');
  const hasCoopBtn = await page.isVisible('#coopBtn');
  const hasControlsBtn = await page.isVisible('#controlsBtn');
  console.log(`Buttons present: start=${hasStartBtn}, armory=${hasArmoryBtn}, coop=${hasCoopBtn}, controls=${hasControlsBtn}`);

  // Test Armory Modal
  await page.click('#armoryMenuBtn');
  await page.waitForTimeout(400);
  const armoryOpen = await page.isVisible('#armoryModal');
  console.log(`Armory Modal Opened: ${armoryOpen}`);
  await page.screenshot({ path: path.join(artifactDir, 'live_playwright_armory_modal.png') });

  // Close Armory
  await page.click('#closeArmoryBtn');
  await page.waitForTimeout(300);

  // Test Controls & Abilities Modal
  await page.click('#controlsBtn');
  await page.waitForTimeout(400);
  const controlsOpen = await page.isVisible('#controlsModal');
  console.log(`Controls Modal Opened: ${controlsOpen}`);
  await page.screenshot({ path: path.join(artifactDir, 'live_playwright_controls_modal.png') });
  await page.click('#closeControlsBtn');
  await page.waitForTimeout(300);

  // Start Solo Mission
  await page.click('#startBtn');
  await page.waitForTimeout(600);
  console.log('Solo mission started on live site');

  // Gameplay actions
  await page.keyboard.down('KeyW');
  await page.waitForTimeout(300);
  await page.keyboard.up('KeyW');
  await page.keyboard.down('KeyD');
  await page.waitForTimeout(300);
  await page.keyboard.up('KeyD');

  // Fire weapons
  for (let i = 0; i < 4; i++) {
    await page.keyboard.press('Space');
    await page.waitForTimeout(100);
  }

  // Melee combo (1, 2, 3 launcher)
  await page.keyboard.press('KeyE');
  await page.waitForTimeout(150);
  await page.keyboard.press('KeyE');
  await page.waitForTimeout(150);
  await page.keyboard.press('KeyE');
  await page.waitForTimeout(200);

  // Street Fighter Competitive Mechanics Live Test
  await page.keyboard.press('KeyY'); // Drive Impact
  await page.waitForTimeout(200);
  await page.keyboard.press('KeyG'); // Hadoken
  await page.waitForTimeout(200);
  await page.keyboard.press('KeyZ'); // Shoryuken
  await page.waitForTimeout(250);
  await page.keyboard.press('KeyH'); // Scouter Mode with SF6 Frame Meter

  // Tag-Team Fighting Mechanics Live Test
  await page.click('#tagSwitchBtn'); // Tag Switch to Ananya
  await page.waitForTimeout(250);
  await page.click('#tagAssistBtn'); // Call Commando Assist Strike
  await page.waitForTimeout(300);

  // Capture Tag-Team combat screenshot
  await page.screenshot({ path: path.join(artifactDir, 'live_playwright_tag_team.png') });
  console.log('✓ Captured desktop Tag-Team combat screenshot');

  // Capture Street Fighter combat screenshot
  await page.screenshot({ path: path.join(artifactDir, 'live_playwright_street_fighter.png') });
  console.log('✓ Captured desktop Street Fighter combat screenshot');

  // Activate 4D Chrono
  await page.keyboard.press('KeyC');
  await page.waitForTimeout(300);

  // Capture live in-game action screenshot
  await page.screenshot({ path: path.join(artifactDir, 'live_playwright_desktop_gameplay.png') });
  console.log('✓ Captured desktop gameplay screenshot');

  // Mobile Audit
  console.log('\n--- 2. MOBILE AUDIT (iPhone 14 / 390x844) ---');
  const mContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1'
  });
  const mPage = await mContext.newPage();
  await mPage.goto('https://lalhit.fun/', { waitUntil: 'networkidle' });
  await mPage.screenshot({ path: path.join(artifactDir, 'live_playwright_mobile_menu.png') });
  console.log('✓ Captured mobile menu screenshot');

  await mPage.click('#startBtn');
  await mPage.waitForTimeout(600);

  // Check touch controls visibility
  const touchControlsVisible = await mPage.isVisible('.mobile-controls');
  console.log(`Mobile Touch Controls Visible: ${touchControlsVisible}`);

  // Tap mobile touch buttons
  await mPage.tap('#fireBtn');
  await mPage.waitForTimeout(100);
  await mPage.tap('#meleeBtn');
  await mPage.waitForTimeout(100);
  await mPage.tap('#dashBtn');
  await mPage.waitForTimeout(100);

  await mPage.screenshot({ path: path.join(artifactDir, 'live_playwright_mobile_gameplay.png') });
  console.log('✓ Captured mobile gameplay screenshot');

  // Summary
  console.log('\n--- AUDIT RESULTS ---');
  console.log(`Console Errors: ${consoleErrors.length}`, consoleErrors);
  console.log(`Network Errors: ${networkErrors.length}`, networkErrors);

  await browser.close();
  console.log('\n=== AUDIT COMPLETE ===');
})();
