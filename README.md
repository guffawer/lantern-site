# Project Lantern playtest site

Mobile-first clickable prototype. Static HTML/CSS/JS, no build step. Served by GitHub Pages from `main`.

Live: https://guffawer.github.io/lantern-site/

Playtest logs stay on the tester's phone. Menu > Send test report shares a JSON file (screens with timestamps, key taps, session length; never typed text).
Optional auto-upload: set `window.LANTERN_CFG = {relayUrl: "..."}` before `assets/telemetry.js`.
