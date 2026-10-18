# LAL HIT — Product Roadmap

Goal: ship a stable, polished, mobile-friendly browser action game at https://lalhit.fun/ with responsive combat and a verifiably deployed release.

## Release gate and current known facts

- [x] Existing standalone Canvas game retained.
- [x] Weapon firing feedback: recoil and muzzle flash committed.
- [x] Enemy hit flash, lateral movement, and boss-wave progression committed.
- [ ] Live domain confirmed to serve the latest GitHub source. Latest checks found the live HTML response does not expose the newest source changes; deployment path must be identified and reconciled.
- [ ] Full control and gameplay regression test completed.
- [ ] All shared repositories audited and compatible assets/mechanics selected.
- [ ] Final release smoke test and deployment record.

## Phase 0 — Establish a reproducible baseline (P0)

- [x] Record current GitHub source and latest commit.
- [x] Compare live domain response with the source; note deployment mismatch.
- [ ] Identify the actual production host/deploy target for lalhit.fun and determine why the live response differs.
- [ ] Confirm correct document route and mobile viewport behaviour.
- Exit criteria: one documented source of truth and a repeatable publish path.

## Phase 1 — Core reliability (P0)

- [ ] Fix/verify Start Solo Mission and menu-to-game transition.
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
- A second Netlify project `kala-hit-delhi` exists (site ID `b61825b9-cf6e-4340-9dec-f2229650ecb2`); its current deploy was not yet inspected.
- Site-level environment-variable listing for the `kalahit` project returned no variables. The GitHub Actions workflow references `NETLIFY_AUTH_TOKEN` and `NETLIFY_SITE_ID` secrets; previous run reported those credentials were not provided. Do not report a successful CI deployment.
- Important distinction: `lalhit.fun` and `kalahit.netlify.app` are not yet proven to be the same deployment. Phase 0 remains open until the canonical URL is established, the correct site is linked to the intended source, and a fresh production deploy is verified.

### Next task

Inspect the second Netlify project and the repository's deployment history/settings; determine which project/domain should serve the current Canvas game. Then make the smallest safe deployment-path correction. Do not overwrite the live ROACH RIOT version until the intended target is unambiguous.
