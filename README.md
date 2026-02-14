# Howe2Train

A clickable PWA prototype for **Howe2Train** — a mobile-first coach-to-parent platform built for professional football coach Rene Howe.

## What is it?

Howe2Train digitalises the relationship between a professional football coach and the parents of young players. The coach manages players, shares training content, runs coaching sessions, and sells structured training packages — all from his phone.

## Live Demo

**https://codescribler.github.io/howe2train/**

Open on mobile (or use browser DevTools responsive mode) for the intended experience.

## User Journeys

### Parent
- **Dashboard** — child's activity feed, achievements, progress, coach comments and training videos
- **Sessions** — browse available coaching sessions by age group, view details and book
- **Training Packages** — browse/filter packages by category, purchase, and track drill-by-drill progress
- **Shop** — browse official Howe2Train merchandise and equipment
- **Profile** — manage children, notifications and settings

### Coach (Admin)
- **Dashboard** — quick actions (upload video, add comment, award badge), stats overview, recent sales and live poll results
- **Players** — full player list with filtering, individual player profiles with history
- **Packages** — manage training packages with sales data, create new packages
- **Sessions** — view and create coaching sessions with capacity tracking
- **Shop Management** — inventory, stock levels, revenue and order tracking
- **Earnings** — total revenue breakdown across sessions, packages and merchandise

## Tech Stack

- HTML, CSS, JavaScript (vanilla — no build step)
- Tailwind CSS via CDN
- Lucide Icons via CDN
- Google Fonts (Barlow Condensed + Barlow)
- PWA with service worker for offline caching

## Running Locally

No dependencies. Serve the folder with any static server:

```bash
python -m http.server 8080
```

Then open http://localhost:8080

## Brand

- **Colours:** Black, Gold (#C5A55A), White
- **Typography:** Barlow Condensed (headings), Barlow (body)
- **Tone:** Premium, authoritative, mobile-first
