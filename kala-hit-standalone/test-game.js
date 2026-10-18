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
assert.ok(script.includes("if(e.code==='Escape'&&playing){paused=!paused;") &&
  script.includes("$('pauseBtn').textContent=paused?'▶ RESUME':'Ⅱ PAUSE'"),
  'keyboard pause must keep the HUD in sync');
for (const id of ['startBtn', 'controlsBtn', 'pauseBtn', 'movePad', 'fireBtn', 'meleeBtn', 'dashBtn', 'aimBtn']) {
  assert.ok(html.includes('id="' + id + '"'), 'required control missing: ' + id);
}
console.log('KALA HIT regression checks passed.');
