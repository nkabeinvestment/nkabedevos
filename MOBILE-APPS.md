# Mobile Apps — Demo & Submission Guide

Two testable React mobile apps, each with a Node/Express backend.

## 1. RideNow — Uber-style ride-hailing

- **Live demo:** `https://nkabeinvestment.github.io/nkabedevos/apps/uber-clone/`
- **API (Node/Express):** `api/uber-api`

**Try the flow:** set a destination → pick a vehicle (Ride X / Comfort / XL) → Request →
watch driver assignment → live ride → completion with fare → ride saved to Trips.

## 2. StudyMate — Tutor & Student Connect

- **Live demo:** `https://nkabeinvestment.github.io/nkabedevos/apps/tutor-connect/`
- **API (Node/Express):** `api/tutor-api`

**Try the flow (Student):** toggle **Student** → search/filter tutors → open a profile →
pick a slot + topic → Book. Then toggle **Tutor** → accept the request → see it confirmed.

## Run the backends (optional — apps work without them)

```bash
cd api/uber-api && npm.cmd install && npm.cmd start   # port 3001
cd api/tutor-api && npm.cmd install && npm.cmd start  # port 3002
```

If the API is running, the app uses live endpoints; otherwise it falls back to built-in
mock data so demos never break.

## Suggested Upwork portfolio text

### Title
> Full-Stack Developer | AI Integration Expert | SaaS & Mobile Apps

### Description (edit per app)
> Production-style mobile web app (React PWA) with a matching Node/Express REST API.
> [RideNow]: end-to-end ride-hailing — destination picker, multi-tier pricing, live ride
> tracking simulation, fare breakdown, and trip history. [StudyMate]: tutor-student
> matching for universities — searchable tutor directory, session booking, and a tutor
> dashboard with accept/decline workflows. Responsive, installable on any phone, and
> data persists locally so clients can test immediately.

### Tags / skills
> React, Node.js, Express, JavaScript, Mobile App Development, PWA, REST API, UI/UX

## How to demo on a call (2 minutes)

1. Open the app link on a phone or in a phone-width browser window.
2. Click through the core flow (ride booking / tutor booking).
3. Optionally run the API live: `npm.cmd start` and refresh — data now comes from the server.
4. Show "Add to Home Screen" installability (Android: menu → Add to Home screen).

## Notes for clients

- Both are React 18 apps (Hooks) — JSX is precompiled to plain JS (`app.js`) so they run
  fast and reliably, with no build step or in-browser Babel needed at runtime.
- Backend is a mock REST API; wire it to a database + auth to go production.
- Full source is in this repository under `apps/uber-clone` and `apps/tutor-connect`.
