# Campus Pal

A friendly, responsive front-end concept for a UK college community. Campus Pal brings campus updates, a student social feed, stories, people discovery and the dinner menu together in one welcoming space.

## Run locally

No build step or dependencies are required. Open `index.html` in a browser, or serve this folder with any static web server, for example:

```sh
python3 -m http.server 8000
```

Then visit <http://localhost:8000>.

## What’s included

- Responsive campus feed with Friends, Clubs & Societies and College filters.
- Share-post dialog, character count, reactions, saved posts and a search field (⌘/Ctrl + K).
- Campus stories, college notices, people suggestions and a Today/Tomorrow dinner menu.
- Mobile navigation and accessible labels, keyboard focus, dialog controls and live feedback.
- UK English copy and privacy-first messaging: this demo does not request, collect or share location.

## Demo notes

This is a static front-end prototype. Posts and reactions live in memory and reset on refresh. Messaging, authentication, real college data, photo uploads, notifications and friend connections need a trusted backend and appropriate safeguarding, moderation, data-protection and age-assurance work before production. Do not use the sample UI to collect sensitive or precise location data.

## Files

- `index.html` — semantic page structure and demo content.
- `styles.css` — responsive visual design.
- `app.js` — feed data and front-end interactions.
