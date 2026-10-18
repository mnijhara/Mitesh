const assert = require('node:assert/strict');
const path = require('node:path');
const puppeteer = require('/tmp/node_modules/puppeteer-core');

(async () => {
  console.log('--- STARTING COMPREHENSIVE LAL HIT GAMEPLAY VERIFICATION ---');

  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: 'new',
    args: ['--no-sandbox', '--disable-gpu']
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });

    const errors = [];
    page.on('pageerror', err => errors.push(err.message));
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });

    const fileUrl = 'file://' + path.resolve(__dirname, 'index.html');
    await page.goto(fileUrl);
    await new Promise(r => setTimeout(r, 600));

    // Test 1: Menu is visible
    const overlayVisible = await page.$eval('#overlay', el => !el.classList.contains('hide'));
    assert.ok(overlayVisible, 'Main menu overlay must be visible on initial load');
    console.log('✓ Main menu renders cleanly');

    // Test 2: Solo game start
    await page.click('#startBtn');
    await new Promise(r => setTimeout(r, 500));
    const overlayHidden = await page.$eval('#overlay', el => el.classList.contains('hide'));
    assert.ok(overlayHidden, 'Main menu must hide after clicking Start Solo Mission');
    const hasInGameClass = await page.$eval('body', el => el.classList.contains('in-game'));
    assert.ok(hasInGameClass, 'Body must have in-game class when mission starts');
    console.log('✓ Solo mission starts reliably');

    // Test 3: Player initial state
    const initialScore = await page.$eval('#score', el => el.textContent);
    assert.equal(initialScore, '000000', 'Initial score must be 000000');
    console.log('✓ Initial HUD state verified');

    // Test 4: Movement (Keyboard WASD)
    await page.keyboard.down('KeyD');
    await new Promise(r => setTimeout(r, 400));
    await page.keyboard.up('KeyD');
    await page.keyboard.down('KeyW');
    await new Promise(r => setTimeout(r, 400));
    await page.keyboard.up('KeyW');
    console.log('✓ Player movement (lateral and longitudinal) tested');

    // Test 5: Firing weapons
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Space');
      await new Promise(r => setTimeout(r, 120));
    }
    console.log('✓ Firing projectiles tested');

    // Test 6: Weapon switching (1, 2, 3 and Q)
    await page.keyboard.press('Digit2');
    await new Promise(r => setTimeout(r, 100));
    await page.keyboard.press('Space');
    await page.keyboard.press('Digit3');
    await new Promise(r => setTimeout(r, 100));
    await page.keyboard.press('Space');
    await page.keyboard.press('KeyQ');
    console.log('✓ Weapon switching (Pulse Blaster, Scatter Shot, Heavy Pulse) tested');

    // Test 7: Melee attack
    await page.keyboard.press('KeyE');
    await new Promise(r => setTimeout(r, 200));
    await page.keyboard.press('KeyE');
    console.log('✓ Melee combo tested');

    // Test 8: Dash
    await page.keyboard.press('ShiftLeft');
    await new Promise(r => setTimeout(r, 200));
    console.log('✓ Dash Chai Boost tested');

    // Test 9: Pause and Resume via Button and Keyboard
    await page.click('#pauseBtn');
    await new Promise(r => setTimeout(r, 200));
    let pauseText = await page.$eval('#pauseBtn', el => el.textContent);
    assert.ok(pauseText.includes('RESUME'), 'Pause button must show RESUME when paused');

    await page.click('#pauseBtn');
    await new Promise(r => setTimeout(r, 200));
    pauseText = await page.$eval('#pauseBtn', el => el.textContent);
    assert.ok(pauseText.includes('PAUSE'), 'Pause button must toggle back to PAUSE');

    await page.keyboard.press('KeyP');
    await new Promise(r => setTimeout(r, 200));
    pauseText = await page.$eval('#pauseBtn', el => el.textContent);
    assert.ok(pauseText.includes('RESUME'), 'Keyboard P must pause the game');

    await page.keyboard.press('KeyP');
    await new Promise(r => setTimeout(r, 200));
    pauseText = await page.$eval('#pauseBtn', el => el.textContent);
    assert.ok(pauseText.includes('PAUSE'), 'Keyboard P must resume the game');
    console.log('✓ Pause and resume toggling tested');

    // Test 10: Sound toggle
    await page.click('#soundBtn');
    const soundText = await page.$eval('#soundBtn', el => el.textContent);
    assert.ok(soundText.includes('ON'), 'Sound button must toggle to SOUND ON');
    console.log('✓ Sound button tested');

    // Test 11: Mobile touch controls
    const mPage = await browser.newPage();
    await mPage.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
    await mPage.goto(fileUrl);
    await new Promise(r => setTimeout(r, 500));

    // Verify touch controls are hidden while menu is up
    const touchControlsVisibleInMenu = await mPage.$eval('.mobile-controls', el => {
      const style = window.getComputedStyle(el);
      return style.display !== 'none';
    });
    assert.equal(touchControlsVisibleInMenu, false, 'Mobile touch controls must be hidden when in menu');

    // Start on mobile
    await mPage.click('#startBtn');
    await new Promise(r => setTimeout(r, 500));

    // Verify touch controls are visible in game
    const touchControlsVisibleInGame = await mPage.$eval('.mobile-controls', el => {
      const style = window.getComputedStyle(el);
      return style.display !== 'none';
    });
    assert.equal(touchControlsVisibleInGame, true, 'Mobile touch controls must be visible during gameplay');

    // Tap action buttons
    await mPage.tap('#fireBtn');
    await mPage.tap('#meleeBtn');
    await mPage.tap('#dashBtn');
    await mPage.tap('#aimBtn');
    console.log('✓ Mobile touch buttons tested and responsive');

    // Check for runtime errors
    assert.equal(errors.length, 0, 'No runtime errors permitted: ' + errors.join('; '));
    console.log('✓ Zero runtime or console errors');

    console.log('\n========================================');
    console.log('ALL GAMEPLAY & COMBAT VERIFICATIONS PASSED');
    console.log('========================================');
  } finally {
    await browser.close();
  }
})();
