import { readFileSync } from "node:fs";
import vm from "node:vm";

const html = readFileSync("sanjeevani-quest/index.html", "utf8");
const checks = [
  ["HTML document", /<!doctype html>/i.test(html) && /<\/html>\s*$/i.test(html)],
  ["Canvas game", /id="gameCanvas"/.test(html)],
  ["Story chapters", /Ocean of Courage/.test(html) && /Sanjeevani Summit/.test(html)],
  ["Mission HUD", /id="questHud"/.test(html) && /function updateQuestHUD/.test(html)],
  ["PWA manifest", /rel="manifest" href="\.\/manifest\.webmanifest"/.test(html)],
  ["Offline service worker", /navigator\.serviceWorker\.register\('\.\/sw\.js'\)/.test(html)],
  ["Pointer controls", /pointerdown/.test(html) && /pointercancel/.test(html)],
  ["Pause on tab switch", /visibilitychange/.test(html)]
];
const script = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(match => match[1]).join("\n");
try { new vm.Script(script, { filename: "sanjeevani-quest-inline.js" }); }
catch (error) { console.error("FAIL JavaScript syntax:", error.message); process.exitCode = 1; }
for (const [label, passed] of checks) {
  console.log((passed ? "PASS " : "FAIL ") + label);
  if (!passed) process.exitCode = 1;
}
if (!readFileSync("sanjeevani-quest/manifest.webmanifest", "utf8").trim()) {
  console.error("FAIL Web manifest is empty"); process.exitCode = 1;
}
if (!readFileSync("sanjeevani-quest/sw.js", "utf8").includes("addEventListener(\"fetch\"")) {
  console.error("FAIL Service worker fetch handler missing"); process.exitCode = 1;
}
if (process.exitCode) process.exit(process.exitCode);
console.log("Sanjeevani Quest static checks passed.");
