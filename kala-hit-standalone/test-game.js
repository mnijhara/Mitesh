const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const scriptStart = html.indexOf('<script>');
const scriptEnd = html.indexOf('</script>', scriptStart);
assert.ok(scriptStart >= 0 && scriptEnd > scriptStart, 'the standalone game must contain its inline script');
const script = html.slice(scriptStart + '<script>'.length, scriptEnd);

// Parse the game code without executing browser-only APIs.
assert.doesNotThrow(() => new Function(script), 'game JavaScript must parse');

assert.ok(script.includes('let frameRunning=false;function ensureFrame(){if(frameRunning)return;frameRunning=true;requestAnimationFrame(frame)}'),
  'gameplay starts/resumes must use the guarded animation scheduler');
assert.ok(!script.includes("['click','pointerup'].forEach(type=>{startButton.addEventListener(type,startMission)"),
  'Start Mission must not register duplicate click and pointerup handlers');
assert.ok(!script.includes("document.addEventListener('click',e=>{const b=e.target.closest?.('#startBtn,#controlsBtn');"),
  'Start/Controls must not also use a capturing document click handler');
assert.ok(script.includes('function update(dt){if(!playing)return;const gp=readGamepad();if(paused)return;'),
  'gamepad input must still be read while paused so the controller can resume');
assert.ok(script.includes('if(pausePressed&&!gamepadPrev.pause){paused=!paused;'),
  'gamepad pause must toggle both pause and resume');
assert.ok(script.includes("if(e.code==='Escape'&&playing&&!e.repeat){paused=!paused;") &&
  script.includes("if(e.code==='KeyP'&&playing&&!e.repeat){paused=!paused;") &&
  script.includes("$('pauseBtn').textContent=paused?'▶ RESUME':'Ⅱ PAUSE'"),
  'keyboard pause must ignore key-repeat and keep the HUD in sync');
assert.ok(html.includes('WASD / ARROWS · MOVE<br>MOUSE / RIGHT STICK · AIM'), 'desktop help must show movement and aim once each');
assert.ok(!html.includes('WASD / ARROWS · MOVE<br>WASD / ARROWS · MOVE'), 'desktop help must not duplicate the movement hint');
assert.ok(html.includes('.mobile-controls{display:block;left:0;right:0;bottom:90px;height:142px;gap:0;pointer-events:none}'), 'mobile controls must use a full-width positioning layer');
assert.ok(html.includes('.mobile-controls .move-pad{position:absolute;left:13px;bottom:0;width:124px;height:124px;flex:none;pointer-events:auto}'), 'mobile movement joystick must keep a stable touch target');
assert.ok(html.includes('.mobile-controls .fire-control{right:13px;bottom:70px}'), 'mobile fire button must be anchored inside the viewport');
assert.ok(html.includes('@media(max-width:380px){.mobile-controls .move-pad{left:8px;width:106px;height:106px}'), 'small phones must receive a compact control layout');
for (const id of ['startBtn', 'controlsBtn', 'pauseBtn', 'movePad', 'fireBtn', 'meleeBtn', 'dashBtn', 'aimBtn']) {
  assert.ok(html.includes('id="' + id + '"'), 'required control missing: ' + id);
}
console.log('KALA HIT regression checks passed.');

// Campaign progression must visibly move the player through distinct Delhi districts.
assert.ok(html.includes("const zones=[{short:'RAJIV CHOWK'") && html.includes("short:'JANPATH'") && html.includes("short:'JANTAR MANTAR'"), 'campaign must contain three named districts');
assert.ok(html.includes("function syncZone(notify=false)") && html.includes("$('locationText').textContent=z.short"), 'district transitions must update the visible location HUD');
assert.ok(html.includes("ctx.fillStyle=zones[zoneIndex].tint"), 'district transitions must affect the game world palette');
assert.ok(html.includes("Math.min(.65,(wave-1)*.07)"), 'enemy difficulty must scale with campaign waves');
assert.ok(html.includes("if(e.boss){wave++;$('waveText').textContent=String(wave).padStart(2,'0');syncZone(true);"), 'melee boss defeats must advance the campaign district just like ranged boss defeats');

// Combat pickups add a risk/reward loop and must be drawn, collectible, and reset between runs.
assert.ok(script.includes('pickups=[]'), 'pickup state must be maintained separately from enemies and particles');
assert.ok(script.includes('function dropPickup(e)'), 'defeated enemies must be able to drop supplies');
assert.ok(script.includes("type=e.boss?(hp<65?'med':'energy')"), 'boss drops must respond to the player condition');
assert.ok(script.includes("hp=Math.min(100,hp+30)"), 'medkits must restore health without exceeding the cap');
assert.ok(script.includes("energy=Math.min(100,energy+45)"), 'energy cells must restore ability energy without exceeding the cap');
assert.ok(script.includes('Math.hypot(player.x-p.x,player.z-p.z)<1.45'), 'players must collect pickups by moving close to them');
assert.ok(script.includes('for(const pickup of pickups)drawPickup(pickup)'), 'pickups must be visible in the game world');
assert.ok(script.includes('pickups=[];civilians=[]'), 'starting a fresh mission must clear old pickups');


// Perspective depth must grow toward the player, not shrink as enemies approach.
assert.ok(script.includes('function perspectiveDepth(z){return clamp((z+32)/42,.04,1.2)}'),
  'scene depth must be derived consistently from world z');
const depthSource = script.match(/function perspectiveDepth\(z\)\{[^}]+\}/);
assert.ok(depthSource, 'perspective depth helper must exist');
const clampValue = (v, min, max) => Math.max(min, Math.min(max, v));
const perspectiveDepth = new Function('clamp', depthSource[0] + '; return perspectiveDepth;')(clampValue);
const scaleSource = script.match(/function perspectiveScale\(z,height=H\)\{[^}]+\}/);
assert.ok(scaleSource, 'perspective scale helper must exist');
const perspectiveScale = new Function('perspectiveDepth', 'H', scaleSource[0] + '; return perspectiveScale;')(perspectiveDepth, 800);
const farScale = perspectiveScale(-30, 800);
const midScale = perspectiveScale(-18, 800);
const nearScale = perspectiveScale(3, 800);
assert.ok(farScale < midScale && midScale < nearScale,
  'cockroaches must grow as their z position approaches the player');

assert.ok(script.includes('xScale=W*.035*depth/(37/42)'),
  'world horizontal projection must track depth consistently with the player lane');
assert.ok(script.includes('const x=project(player.x,0,player.z).x,y=H*(H>W? .735:.77)'),
  'hero horizontal position must use the same projection as world entities');
assert.ok(script.includes('ctx.translate(30,-14);ctx.rotate(aimAngle);ctx.translate(-30,14)'),
  'gun barrel axis must rotate with the aim angle around its barrel base');
assert.ok(!script.includes('ctx.rotate(aimAngle-Math.PI/2)'),
  'gun must not retain the 90-degree aiming offset');
assert.ok(script.includes('weaponAngle:aimAngle') && script.includes('origin=project(shot.originX,0,shot.originZ)'),
  'shot tracers must preserve the firing angle and use the projected firing origin');
