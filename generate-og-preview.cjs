const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

async function main() {
  const bgPath = '/Users/miteshnijhara/.gemini/antigravity/brain/6ae184f6-c178-4e69-bc60-fd07fb28bb9e/live_playwright_desktop_gameplay.png';
  const bgBase64 = fs.existsSync(bgPath) 
    ? 'data:image/png;base64,' + fs.readFileSync(bgPath).toString('base64')
    : '';

  const browser = await chromium.launch({ headless: true });

  // 1. Landscape Banner (1200x630)
  const pageLandscape = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1
  });

  const htmlLandscape = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,700;0,800;0,900;1,800;1,900&family=Barlow:wght@500;600;700&display=swap');
  *{box-sizing:border-box;margin:0;padding:0}
  body {
    width: 1200px;
    height: 630px;
    background: #030a14;
    font-family: 'Barlow', system-ui, sans-serif;
    color: #fff;
    overflow: hidden;
    position: relative;
    display: flex;
  }
  .bg-art {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    opacity: 0.75;
    filter: saturate(1.2) contrast(1.1);
  }
  .overlay-vignette {
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 75% 50%, rgba(3,10,20,0.3) 0%, rgba(3,10,20,0.85) 60%, #030a14 100%),
                linear-gradient(90deg, #030a14 0%, rgba(3,10,20,0.92) 45%, rgba(3,10,20,0.45) 80%, rgba(3,10,20,0.7) 100%);
  }
  .content {
    position: relative;
    z-index: 10;
    width: 680px;
    height: 100%;
    padding: 60px 0 60px 70px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .tag-pill {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(255, 59, 78, 0.15);
    border: 1px solid rgba(255, 59, 78, 0.4);
    color: #ff4757;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 18px;
    font-weight: 800;
    letter-spacing: 2px;
    text-transform: uppercase;
    padding: 6px 16px;
    border-radius: 999px;
    width: fit-content;
  }
  .brand { margin-top: 15px; }
  .title-row { display: flex; align-items: baseline; gap: 16px; }
  .logo-lal {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 110px;
    font-weight: 900;
    font-style: italic;
    color: #ffffff;
    line-height: 0.9;
    letter-spacing: -2px;
    text-shadow: 0 4px 25px rgba(255,255,255,0.25);
  }
  .logo-hit {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 110px;
    font-weight: 900;
    font-style: italic;
    background: linear-gradient(180deg, #ff4757 0%, #ff6b35 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    line-height: 0.9;
    letter-spacing: -2px;
    filter: drop-shadow(0 0 35px rgba(255,71,87,0.7));
  }
  .badge-uprising {
    display: inline-block;
    background: linear-gradient(90deg, #ffcc55, #ffaa00);
    color: #050e18;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 24px;
    font-weight: 900;
    letter-spacing: 3px;
    text-transform: uppercase;
    padding: 4px 18px;
    border-radius: 6px;
    margin-top: 10px;
    box-shadow: 0 0 20px rgba(255,204,85,0.4);
  }
  .desc {
    font-size: 22px;
    line-height: 1.45;
    color: #c4d7ec;
    font-weight: 500;
    margin-top: 20px;
    max-width: 580px;
    text-shadow: 0 2px 8px rgba(0,0,0,0.8);
  }
  .features {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 20px;
  }
  .feat-chip {
    background: rgba(7, 25, 45, 0.85);
    border: 1px solid rgba(77, 245, 255, 0.28);
    color: #4df5ff;
    font-size: 16px;
    font-weight: 600;
    padding: 6px 14px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 6px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  }
  .footer-row {
    display: flex;
    align-items: center;
    gap: 24px;
    margin-top: 25px;
  }
  .play-cta {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    background: linear-gradient(135deg, #00f0ff 0%, #0099ff 100%);
    color: #030e1a;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 26px;
    font-weight: 900;
    letter-spacing: 1px;
    text-transform: uppercase;
    padding: 14px 34px;
    border-radius: 12px;
    box-shadow: 0 0 35px rgba(0, 240, 255, 0.55), 0 6px 20px rgba(0,0,0,0.4);
  }
  .domain-pill {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 24px;
    font-weight: 800;
    color: #ffcc55;
    letter-spacing: 1.5px;
  }
  .right-badge {
    position: absolute;
    right: 50px;
    bottom: 50px;
    z-index: 10;
    background: rgba(4, 12, 22, 0.9);
    border: 1px solid rgba(255, 204, 85, 0.35);
    border-radius: 14px;
    padding: 14px 22px;
    text-align: right;
    box-shadow: 0 8px 30px rgba(0,0,0,0.6);
  }
  .rb-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 20px;
    font-weight: 800;
    color: #ffcc55;
    letter-spacing: 1.5px;
    text-transform: uppercase;
  }
  .rb-sub {
    font-size: 14px;
    color: #8da4be;
    margin-top: 3px;
  }
</style>
</head>
<body>
  <img class="bg-art" src="${bgBase64}" />
  <div class="overlay-vignette"></div>
  <div class="content">
    <div>
      <div class="tag-pill">⚡ NEW DELHI BATTLEGROUND · ZONE 01</div>
      <div class="brand">
        <div class="title-row">
          <span class="logo-lal">LAL</span>
          <span class="logo-hit">HIT</span>
        </div>
        <div>
          <span class="badge-uprising">DELHI UPRISING · 4D COMBAT</span>
        </div>
      </div>
      <p class="desc">
        Defend Rajiv Chowk! High-octane cyberpunk tag-team fighting game set in Connaught Place. Play free in browser on phone & PC.
      </p>
      <div class="features">
        <div class="feat-chip">🎮 NO DOWNLOAD REQUIRED</div>
        <div class="feat-chip">📱 WORKS ON ALL PHONES & PC</div>
        <div class="feat-chip">💥 STREET FIGHTER COMBAT</div>
        <div class="feat-chip">⚡ 4D TIME MANIPULATION</div>
      </div>
    </div>
    <div class="footer-row">
      <div class="play-cta">
        <span>▶</span>
        <span>PLAY FREE NOW</span>
      </div>
      <div class="domain-pill">lalhit.fun</div>
    </div>
  </div>
  <div class="right-badge">
    <div class="rb-title">📍 CONNAUGHT PLACE</div>
    <div class="rb-sub">NEW DELHI, INDIA</div>
  </div>
</body>
</html>`;

  await pageLandscape.setContent(htmlLandscape, { waitUntil: 'networkidle' });
  const outJpg = path.join(__dirname, 'kala-hit-standalone', 'og-preview.jpg');
  await pageLandscape.screenshot({ path: outJpg, type: 'jpeg', quality: 86 });

  // 2. Square Banner (600x600) for WhatsApp mobile thumbnail
  const pageSquare = await browser.newPage({
    viewport: { width: 600, height: 600 },
    deviceScaleFactor: 1
  });

  const htmlSquare = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,700;0,800;0,900;1,800;1,900&family=Barlow:wght@600;700&display=swap');
  *{box-sizing:border-box;margin:0;padding:0}
  body {
    width: 600px;
    height: 600px;
    background: #030a14;
    font-family: 'Barlow', system-ui, sans-serif;
    color: #fff;
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 30px;
  }
  .bg-art {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.55;
    filter: saturate(1.2) contrast(1.1);
  }
  .overlay-vignette {
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at center, rgba(3,10,20,0.65) 0%, rgba(3,10,20,0.92) 75%, #030a14 100%);
  }
  .content {
    position: relative;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
  .pill {
    background: rgba(255, 59, 78, 0.18);
    border: 1px solid rgba(255, 59, 78, 0.5);
    color: #ff4757;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 16px;
    font-weight: 800;
    letter-spacing: 2px;
    text-transform: uppercase;
    padding: 5px 14px;
    border-radius: 999px;
    margin-bottom: 12px;
  }
  .title-row {
    display: flex;
    align-items: baseline;
    gap: 12px;
  }
  .logo-lal {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 92px;
    font-weight: 900;
    font-style: italic;
    color: #ffffff;
    line-height: 0.9;
    letter-spacing: -2px;
  }
  .logo-hit {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 92px;
    font-weight: 900;
    font-style: italic;
    background: linear-gradient(180deg, #ff4757 0%, #ff6b35 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    line-height: 0.9;
    letter-spacing: -2px;
    filter: drop-shadow(0 0 30px rgba(255,71,87,0.7));
  }
  .badge-uprising {
    display: inline-block;
    background: linear-gradient(90deg, #ffcc55, #ffaa00);
    color: #050e18;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 20px;
    font-weight: 900;
    letter-spacing: 2px;
    text-transform: uppercase;
    padding: 4px 14px;
    border-radius: 6px;
    margin-top: 8px;
    box-shadow: 0 0 15px rgba(255,204,85,0.4);
  }
  .subtitle {
    font-size: 18px;
    color: #bcd0e6;
    margin-top: 14px;
    max-width: 460px;
    line-height: 1.4;
  }
  .chips {
    display: flex;
    gap: 8px;
    margin-top: 16px;
  }
  .chip {
    background: rgba(7, 25, 45, 0.9);
    border: 1px solid rgba(77, 245, 255, 0.35);
    color: #4df5ff;
    font-size: 14px;
    font-weight: 600;
    padding: 5px 12px;
    border-radius: 6px;
  }
  .play-btn {
    margin-top: 24px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: linear-gradient(135deg, #00f0ff 0%, #0099ff 100%);
    color: #030e1a;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 24px;
    font-weight: 900;
    letter-spacing: 1px;
    padding: 12px 32px;
    border-radius: 10px;
    box-shadow: 0 0 25px rgba(0, 240, 255, 0.6);
  }
  .domain {
    margin-top: 12px;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 20px;
    font-weight: 800;
    color: #ffcc55;
    letter-spacing: 1.5px;
  }
</style>
</head>
<body>
  <img class="bg-art" src="${bgBase64}" />
  <div class="overlay-vignette"></div>
  <div class="content">
    <div class="pill">⚡ NEW DELHI BATTLEGROUND</div>
    <div class="title-row">
      <span class="logo-lal">LAL</span>
      <span class="logo-hit">HIT</span>
    </div>
    <div class="badge-uprising">DELHI UPRISING · 3D COMBAT</div>
    <p class="subtitle">Defend Connaught Place! 3D Cyberpunk Fighting Game. Play Free in Browser.</p>
    <div class="chips">
      <div class="chip">🎮 NO DOWNLOAD</div>
      <div class="chip">📱 MOBILE & PC</div>
    </div>
    <div class="play-btn">▶ PLAY FREE NOW</div>
    <div class="domain">lalhit.fun</div>
  </div>
</body>
</html>`;

  await pageSquare.setContent(htmlSquare, { waitUntil: 'networkidle' });
  const outSquareJpg = path.join(__dirname, 'kala-hit-standalone', 'og-square.jpg');
  await pageSquare.screenshot({ path: outSquareJpg, type: 'jpeg', quality: 86 });

  await browser.close();

  console.log('Landscape JPG size:', fs.statSync(outJpg).size, 'bytes');
  console.log('Square JPG size:', fs.statSync(outSquareJpg).size, 'bytes');
  console.log('Generated successfully!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
