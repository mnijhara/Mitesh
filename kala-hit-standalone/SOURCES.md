# LAL HIT — Open-source references and attribution

LAL HIT remains a self-contained browser game. These projects were reviewed as references for controls, combat feel, AI design, game architecture, and future expansion. Their engines are not interchangeable with this single-file HTML Canvas game, so their complete source trees are not pasted into this project.

## Browser shooter reference

- [TOSIOS — The Open-Source IO Shooter](https://github.com/halftheopposite/TOSIOS) — MIT License (copyright Aymeric Chauvin, 2022). Its documented desktop controls inspired the familiar WASD/arrow movement, mouse aiming, and held-fire control model. LAL HIT's input implementation is independently adapted to its existing Canvas game; no TOSIOS source files were copied wholesale. If code from TOSIOS is added in a future change, retain its MIT copyright and license notice.

## Other projects and what can be learned from them

- [Hypersomnia](https://github.com/TeamHypersomnia/Hypersomnia) — AGPL-3.0; useful reference for competitive shooter pacing, weapon feedback, map design, and multiplayer ideas. Its C++ engine is not a drop-in browser script. No Hypersomnia source code is copied into LAL HIT.
- [FightingICE](https://github.com/TeamFightingICE/FightingICE) — research/competition-oriented 2D fighting game and AI framework; useful conceptual reference for combat states and opponent decision-making. Its Java-based game is not a drop-in browser shooter. No code or assets copied.
- [Doomsday Engine](https://github.com/skyjake/Doomsday-Engine) — GPL-3.0 for the main source, with some LGPL components; useful reference for classic FPS presentation and engine architecture. Its code is not incorporated into this standalone browser game.
- [Gun Games Platform](https://gun-games.github.io/) — browser-playable game reference, not a source repository that can be merged as a codebase.
- [First-person-shooter topic](https://github.com/topics/first-person-shooter) — discovery page, not one repository or one license; each project must be evaluated individually.
- [Fighting-games topic](https://github.com/topics/fighting-games) — discovery page containing unrelated repositories and licenses.
- [Rust fighting-games topic](https://github.com/topics/fighting-games?l=rust&o=asc&s=forks), [Python fighting-games topic](https://github.com/topics/fighting-games?l=python), [C++ fighting-game topic](https://github.com/topics/fighting-game?l=c%2B%2B&o=desc&s=updated), and [CSS fighting-games topic](https://github.com/topics/fighting-games?l=css&o=asc&s=forks) — discovery pages, not individual codebases.
- [ShootOFF](https://github.com/ShootOFF/ShootOFF) — the referenced GitHub repository currently has no source files available to copy.
- [Smokin' Guns](https://github.com/topics/first-person-shooter) — the shared link was a topic/discovery page, not a confirmed repository URL.


## Additional shooter repositories supplied for LAL HIT

These ten entries were added to the review list. The goal is to adapt mechanics that fit LAL HIT, not combine entire unrelated engines into a single HTML file.

1. [bobeff/open-source-games](https://github.com/bobeff/open-source-games) — discovery list of open-source games, not a game engine or single codebase.
2. [xonotic/xonotic](https://github.com/xonotic/xonotic) — GPLv3-or-later per its README. Reference for arena movement, distinct weapon behavior, and combat feedback. No Xonotic source or assets have been copied.
3. [assaultcube/AC](https://github.com/assaultcube/AC) — Cube-engine FPS emphasizing efficient performance. Reference for lightweight rendering and responsive movement. Check the repository's component-specific notices before reusing any code or assets; none are copied here.
4. [TeamHypersomnia/Hypersomnia](https://github.com/TeamHypersomnia/Hypersomnia) — AGPL-3.0 per its README. Reference for tactical combat and maps; no source is copied.
5. [Liblast/Liblast](https://github.com/Liblast/Liblast) — Godot 4 project as described in the supplied list. Its scene/scripts and engine are not a direct fit for this no-build HTML Canvas deployment. No code/assets copied; verify the repository's current license and exact canonical URL before reuse.
6. [skyjake/Doomsday-Engine](https://github.com/skyjake/Doomsday-Engine) — GPL for the main source with LGPL components, per its README. Reference for classic FPS rendering and architecture; no source copied.
7. [redeclipse/base](https://github.com/redeclipse/base) — Cube-derived arena shooter reference for agility, movement, and weapon customization. The supplied repository path could not be verified as a readable source repository in this review; no code copied.
8. [lsalzman/sauerbraten](https://github.com/lsalzman/sauerbraten) — Cube 2 / Sauerbraten reference for editable maps and arena design. The supplied path did not return a readable README in this review; no code copied.
9. [Unvanquished/Unvanquished](https://github.com/Unvanquished/Unvanquished) — shooter with RTS/building elements. Reference for escalating objectives and enemy factions; no source copied.
10. [Croteam-official/Serious-Sam-Classic](https://github.com/Croteam-official/Serious-Sam-Classic) — reference for large enemy waves and arena pacing. The supplied path did not return a readable README in this review; no code copied.
11. [teeworlds/teeworlds](https://github.com/teeworlds/teeworlds) — 2D multiplayer shooter/platformer. Reference for readable character silhouettes, simple movement, and grappling-style traversal; no source copied.

## What is integrated into the current browser game

- Mouse aiming and repeated firing fixes in the existing Canvas shooter.
- Keyboard and mobile touch controls retained.
- Gamepad support added for left-stick movement, right-stick aiming, trigger/shoulder firing, melee, dash, and pause.
- Existing LAL HIT mission structure remains intact: clear threats, rescue civilians, and survive cockroach waves.

These are project-specific implementations inspired by common mechanics and repository documentation, not copied code. A genuine source-code port from an engine such as Xonotic, Sauerbraten, or Doomsday would require a separate compatible build/runtime and a deliberate license-compliance plan.

## Integration policy

Only code with a verified compatible license should be copied, and required notices must travel with it. GPL/AGPL code cannot simply be pasted into this project while treating it as an unrelated proprietary snippet; that can trigger source-distribution and licensing obligations. Assets also need their own license checks. For now, the gamepad and mouse/fire controls are implemented directly in LAL HIT's existing code, rather than embedding foreign game engines or unverified assets.
