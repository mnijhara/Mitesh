const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const scriptMatch = html.match(/<script>([\\s\\S]*?)<\\/script>/);

assert.ok(scriptMatch, 'the standalone game must contain its inline script');
const script = scriptMatch[1];

// Parse the game code without executing browser-only APIs.
assert.doesNotThrow(() => new Function(script), 'game JavaScript must parse');

assert.match(script, /let frameRunning=false;function ensureFrame\(\)\{if\(frameRunning\)return;frameRunning=true;requestAnimationFrame\(frame\)\}/,
  'all gameplay starts/resumes must use the guarded animation scheduler');
assert.doesNotMatch(script, /\['click','pointerup'\]\.forEach\(type=>\{startButton\.addEventListener\(type,startMission\)/,
  'Start Mission must not register duplicate click and pointerup handlers');
assert.doesNotMatch(script, /document\.addEventListener\('click',e=>\{const b=e\.target\.closest\?\.\('#startBtn,#controlsBtn'\)/,
  'Start/Controls must not also use a capturing document click handler');
assert.match(script, /function update\(dt\)\{if\(!playing\)return;const gp=readGamepad\(\);if\(paused\)return;/,
  'gamepad input must still be read while paused so the controller can resume');
assert.match(script, /if\(pausePressed&&!gamepadPrev\.pause\)\{paused=!paused;/,
  'gamepad pause must toggle both pause and resume');
assert.match(script, /if\(e\.code==='Escape'&&playing\)\{paused=!paused;[\s\S]{0,180}\$\('pauseBtn'\)\.textContent=paused\?'▶ RESUME':'Ⅱ PAUSE'/,
  'Escape must keep the pause HUD in sync');
for (const id of ['startBtn', 'controlsBtn', 'pauseBtn', 'movePad', 'fireBtn', 'meleeBtn', 'dashBtn', 'aimBtn']) {
  assert.ok(html.includes('id="' + id + '"'), 'required control missing: ' + id);
}
console.log('KALA HIT regression checks passed.');
