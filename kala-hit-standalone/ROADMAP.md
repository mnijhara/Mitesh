# LAL HIT — Product Roadmap

Goal: ship a stable, polished, mobile-friendly browser action game at https://lalhit.fun/ with responsive combat and a verifiably deployed release.

## Release gate and current known facts

- [x] Existing standalone Canvas game retained.
- [x] Weapon firing feedback: recoil and muzzle flash committed.
- [x] Enemy hit flash, lateral movement, and boss-wave progression committed.
- [x] Live root page confirmed to serve the exact current GitHub `main` version of `kala-hit-standalone/index.html` (HTTP 200; 39,942 bytes; SHA-256 `4f0faeed64722c69ccab48ae4e66946001c5476d1118c5c38cd612f75773679d` matched the raw GitHub file byte-for-byte on 2026-10-18).
- [ ] Full control and gameplay regression test completed.
- [ ] All shared repositories audited and compatible assets/mechanics selected.
- [ ] Final release smoke test and deployment record.

## Phase 0 — Establish a reproducible baseline (P0)

- [x] Record current GitHub source and latest commit.
- [x] Compare live domain response with the source; note deployment mismatch.
- [x] Identify the serving edge and canonical route: `https://lalhit.fun/` returns HTTP 200 with `server: hcdn` (Hostinger CDN edge); the root page is the current game entry point.
- [x] Verify the live root document matches the raw GitHub `main` source byte-for-byte (39,942 bytes; SHA-256 recorded above).
- [x] Confirm route status: `/lal-hit-3d.html` currently returns HTTP 404, so it is not a valid current entry route.
- [ ] Confirm mobile viewport behaviour on a mobile browser/device.
- [ ] Establish and document a repeatable publish workflow to the Hostinger-served domain. The repository currently contains a Netlify deployment workflow, but no verified Hostinger deployment workflow or credentials are available in this run.
- Exit criteria: one documented source of truth and a repeatable publish path.

## Phase 1 — Core reliability (P0)

- [x] Verify Start Solo Mission and menu-to-game transition: live browser test closed the menu overlay and displayed `MISSION LIVE · RAJIV CHOWK` with the gameplay HUD.
- [ ] Verify pause/resume, restart, and game-over/revive behavior.
- [ ] Verify keyboard: WASD/arrows, Space/J/Enter fire, E/X melee, Shift dash, P/Esc pause, R restart, 1/2/3 and Q weapon selection.
- [ ] Verify touch joystick, aim/fire controls, and touch target sizes.
- [ ] Verify gamepad movement, aim, fire, melee, dash, pause.
- [ ] Fix any discovered errors before adding new mechanics.
- Exit criteria: every advertised core control passes repeatable smoke tests on desktop and mobile.

## Phase 2 — Combat feel and enemy AI (P1)

- [x] Add weapon recoil and muzzle flash.
- [x] Add hit flash and lateral enemy movement.
- [x] Add boss defeat and wave progression.
- [ ] Verify weapon mode damage, energy cost, fire cadence, and hit detection.
- [ ] Improve enemy approach/attack telegraphing and prevent unfair damage spikes.
- [ ] Add clear feedback for player damage, low health, rescue, boss state, and wave changes.
- [ ] Ensure boss spawning/progression is reachable and not duplicated unexpectedly.
- Exit criteria: clear cause-and-effect feedback, fair difficulty, no softlocks.

## Phase 3 — Visual and audio polish (P1)

- [ ] Improve weapon silhouette, aim alignment, muzzle flash and impact effects without obscuring play.
- [ ] Improve enemy animation/readability and boss visual distinction.
- [ ] Add optional sound toggle with consistent fire, hit, melee, dash, rescue, and boss cues.
- [ ] Check performance on mid-range Android phones and resize/orientation changes.
- Exit criteria: readable action, stable frame pacing, usable portrait and landscape layouts.

## Phase 4 — Source repository audit and selective integration (P1/P2)

Review the exact repositories recorded in `SOURCES.md`, verify their current canonical URLs and component licenses, and document each as:
- reviewed / useful pattern,
- compatible to port,
- incompatible engine/runtime,
- asset candidate and provenance,
- not accessible / unresolved.

Priority: browser-compatible references and mechanics first; avoid pasting whole C++/Godot/Java engines into a single HTML Canvas app. Keep source/asset notices where required. Do not claim an asset or code was copied unless it was actually integrated and verified.

## Phase 5 — Release, deployment and verification (P0)

- [ ] Identify and fix the source/deployment mismatch for lalhit.fun.
- [ ] Publish the verified GitHub version through the actual configured host.
- [ ] Confirm live source fingerprint/commit markers match the release.
- [ ] Test start, movement, firing, melee, dash, pause/resume, restart, wave progression, mobile layout, and error-free runtime.
- [ ] Record commit, publish URL, test results, known limitations, and rollback point.
- Exit criteria: deployed site is demonstrably serving the tested version.

## Working rules

1. Work in phase order; P0 blockers before new features.
2. Make small, verifiable commits.
3. Re-fetch the latest file SHA before each GitHub update.
4. Run syntax checks after code edits and smoke-test the live site after publish.
5. Mark a task done only when evidence supports it. GitHub commit alone is not proof of deployment.


## Live investigation log — 2026-10-18

### Phase 0 task: distinguish the production targets (investigated; unresolved)

- GitHub source of the standalone canvas game: `kala-hit-standalone/index.html`, blob SHA `03404fc8ba014071f37e4391c9f1545fcb30a42f`.
- `https://lalhit.fun/` responds HTTP 200 and renders the Rajiv Chowk Canvas game shell (HUD, mission overlay, mobile controls). The HTML scrape does not include the JavaScript bundle, so it cannot prove which gameplay revision is running.
- Authenticated Netlify project `kalahit` exists (site ID `0ece2f8e-0750-453b-90a3-02f35cf99dc8`), with published deploy `6ad3753a789153523a1127e8`, state `ready`, production URL `https://kalahit.netlify.app`, branch `main`, commit `5d7234b87f93c71b2ae64591ab919449b1569bb7`.
- That Netlify deploy commit is older than the current standalone game source and its diff is for a different, top-down ROACH RIOT game. Do not overwrite either version without confirming the intended canonical product URL.
- A second Netlify project `kala-hit-delhi` exists (site ID `b61825b9-cf6e-4340-9dec-f2229650ecb2`); its current deploy is ready at commit `e3b627271368c4a9702cfc281196b44f440ea168`, but a live scrape identifies its page as **SANJEEVANI QUEST**. Treat this as a protected, unrelated project and do not deploy KALA HIT there.
- Site-level environment-variable listing for the `kalahit` project returned no variables. The GitHub Actions workflow references `NETLIFY_AUTH_TOKEN` and `NETLIFY_SITE_ID` secrets; previous run reported those credentials were not provided. Do not report a successful CI deployment.
- Important distinction: `lalhit.fun` and `kalahit.netlify.app` are not yet proven to be the same deployment. Phase 0 remains open until the canonical URL is established, the correct site is linked to the intended source, and a fresh production deploy is verified.

### Next task

Confirm the hosting provider and deployment path for `lalhit.fun` (the live Canvas game). Keep both Netlify projects unchanged: `kalahit.netlify.app` is a different ROACH RIOT build, while `kala-hit-delhi.netlify.app` is SANJEEVANI QUEST. Determine whether `lalhit.fun` is managed through Hostinger or another provider, then correct only that site's source/deployment path. Do not overwrite either unrelated live project.


### Run log — 2026-10-18: production source parity verified

- Canonical root `https://lalhit.fun/`: HTTP 200, `Content-Type: text/html`, response header `Server: hcdn`.
- Fetched live root and `https://raw.githubusercontent.com/mnijhara/Mitesh/main/kala-hit-standalone/index.html` with cache disabled. Both returned 39,942 bytes and SHA-256 `4f0faeed64722c69ccab48ae4e66946001c5476d1118c5c38cd612f75773679d`; exact byte-for-byte match.
- Browser smoke test: clicked Start Solo Mission; menu overlay closed and gameplay HUD appeared with `MISSION LIVE · RAJIV CHOWK`, Wave 01, score, vitals and rescue objective.
- Route probe: `/lal-hit-3d.html` returns HTTP 404 and a “This Page Does Not Exist” page. Do not link to that path unless it is intentionally restored.
- Deployment conclusion: the live root is currently in sync with GitHub source. The `hcdn` header identifies Hostinger's CDN edge, but the repeatable publish workflow itself remains unverified; repository automation still references Netlify and must be reviewed so it cannot accidentally publish this game over the separate ROACH RIOT project.
- Next task: review the Netlify workflow for safe behavior and establish the correct deployment process without changing either unrelated Netlify project. Then continue mobile viewport verification.


### Input reliability fix — 2026-10-18

- Implemented on branch `fix/kalahit-input-loop`: remove duplicate Start/Controls event paths; add a single animation-frame scheduler guard; make controller pause toggle both ways; read controller input while paused so it can resume; keep keyboard/button resume paths on the guarded scheduler.
- Validation: fetched the exact commit HTML from raw GitHub and passed JavaScript syntax compilation plus static assertions for all five intended changes.
- Not yet verified: interactive browser regression across keyboard, touch, and physical gamepad. No live deployment performed; `lalhit.fun` remains unchanged until the correct Hostinger publish path and regression checks are established.
- Pull request: https://github.com/mnijhara/Mitesh/pull/8
- Next: run interactive controls regression, then merge/publish only after confirming no new input regressions and the actual Hostinger publishing process.


### Regression test harness — 2026-10-18

- Added `kala-hit-standalone/test-game.js` using Node's built-in assertions; no third-party dependencies added.
- Added `npm test` and a dedicated GitHub Actions workflow `.github/workflows/kalahit-tests.yml` to run the regression suite and static build on relevant pull requests and main-branch changes.
- Executed the test file against the exact source fetched from commit `0115d1abc96404abda7a118bf1fbba05a0ef8603`; result: `KALA HIT regression checks passed.` (exit code 0).
- These tests cover JavaScript parse validity, guarded animation scheduling, removal of duplicate Start/Controls handlers, controller input while paused, controller pause toggle, Escape/HUD synchronization, and required touch/desktop controls.
- Limitation: static regression tests do not replace interactive browser testing on touch devices or with a physical gamepad. No production deployment performed.
- Current review: https://github.com/mnijhara/Mitesh/pull/8


### Live UI inspection and follow-up — 2026-10-18

- Inspected `https://lalhit.fun/` in a browser session: Start Solo Mission closed the menu and displayed the Rajiv Chowk mission HUD; Pause changed to Resume and back; no JavaScript errors were reported in that interaction.
- Found a visible UI defect during the inspection: the desktop help panel repeated `WASD / ARROWS · MOVE` twice. Corrected the second line to `MOUSE / RIGHT STICK · AIM` on the review branch.
- Added a regression assertion to prevent the duplicated movement hint from returning.
- Re-ran the Node regression suite against the branch source: PASS (exit code 0). Ran the static build command: PASS (exit code 0).
- Live site remains unchanged; fixes are still in PR #8 pending review/merge and the publishing path remains unverified.
