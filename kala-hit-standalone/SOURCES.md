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

## Integration policy

Only code with a verified compatible license should be copied, and required notices must travel with it. GPL/AGPL code cannot simply be pasted into this project while treating it as an unrelated proprietary snippet; that can trigger source-distribution and licensing obligations. Assets also need their own license checks. For now, the gamepad and mouse/fire controls are implemented directly in LAL HIT's existing code, rather than embedding foreign game engines or unverified assets.
