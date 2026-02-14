# Howe2Train — Product Brief

## Overview

**Product name:** Howe2Train
**Type:** Mobile-first web application (progressive web app)
**One-line description:** A coach-to-parent platform where a professional football coach manages players, shares training content, and sells structured training packages to parents.

**Context:** Rene Howe is a former professional footballer who runs Howe 2 Coach, a football coaching business. He works directly with young players and their parents. This app digitalises and extends that relationship — giving parents visibility into their child's development and giving Rene a scalable revenue stream through pre-made training content.

**Critical design constraint:** This is a mobile-first application. Rene will use it pitch-side on his phone between sessions. Parents will check it on their phones at home or at the school gates. Every screen, every interaction, and every workflow must be designed for thumb-friendly mobile use first. Desktop is a secondary consideration — layouts should scale up, not be squeezed down.

---

## Branding

**Colour palette:** Black, gold (#C5A55A), and white — matching the Howe 2 Coach brand identity (black shield with gold accents). The app should feel premium, confident, and professional — not playful or childish.

**Tone:** Authoritative but approachable. This is a product backed by a professional's expertise. Parents are trusting Rene with their child's development, so the experience should feel personal and high-quality.

---

## User Roles

### Admin (Rene)

Full control of the platform. Can add and remove players, upload videos, leave comments, award achievements, create and manage coaching sessions, run polls, create and manage training packages, and view purchase/booking data. The admin experience must be extremely low-friction — three taps maximum to upload a video and tag it to a player. Rene is coaching all day, not doing admin.

### Parent

Can view their child's dashboard, watch training videos, read coach comments, see achievements, book onto coaching sessions, respond to polls, browse and purchase training packages, and track their child's progress through purchased packages. A parent may have multiple children registered and should be able to switch between them easily.

### Player Profile

Each child has a profile created and managed by Rene. It is visible to their parent. The profile holds their age, age group, training history, coach comments, achievements/badges, and any active training packages with progress.

---

## Core Features

### 1. Player Dashboard (Parent View)

This is the parent's home screen after login. It should immediately feel personal to their child.

**Displays:** Child's name, photo (optional), and age group. Recent activity feed showing new videos, coach comments, and achievements. Upcoming booked sessions. Active training packages with progress bars. Quick link to browse available packages.

**Multi-child support:** If a parent has more than one child registered, they should be able to switch profiles with a single tap — a tab bar or swipeable selector at the top of the dashboard.

**Mobile layout:** Single-column card-based layout. Activity feed is scrollable. Key actions (view sessions, browse packages) are accessible from a persistent bottom navigation bar.

### 2. Coach Dashboard (Admin View)

Rene's control panel. Optimised for quick actions performed between coaching sessions.

**Quick actions (prominent, always visible):** Upload video, add comment to player, award achievement, create session, launch poll.

**Overview cards:** Upcoming sessions with attendance count, recent package purchases, recent activity across all players.

**Mobile layout:** Quick actions should be large tap targets at the top of the screen or accessible via a floating action button. Overview information is secondary and scrolls below.

### 3. Video Uploads & Tagging

Rene can upload training videos directly from his phone camera roll. Each video can be tagged to an individual player, an age group, or shared with everyone.

**Tagging:** Player-tagged videos appear on that child's dashboard. Group-tagged videos appear in a shared feed visible to all parents in that age group. Universal videos appear for everyone.

**Upload flow (mobile-critical):** Tap upload, select video from camera roll or record directly, add a short description, select tag target (player/group/all), tap publish. Must handle large video files over mobile data gracefully — show upload progress and allow background uploading.

**Video playback:** Videos should play inline on the dashboard. Support for slow-motion playback would be valuable for technique review but is not essential for launch.

### 4. Coach Comments & Achievements

**Comments:** Rene can leave text comments on individual player profiles. These are short coaching notes — things like "Great first touch today, keep working on your weaker foot this week." Comments appear in the player's activity feed with a timestamp.

**Achievements/Badges:** Rene can award predefined badges or achievements to players. These should be customisable by Rene (he creates the badge names and icons). Examples: "Player of the Week", "100 Touches Challenge Complete", "First Hat-trick". Achievements appear prominently on the player's dashboard and could trigger a push notification or email to the parent.

### 5. Session Management & Booking

Rene can create upcoming coaching sessions with the following details: date, time, location, age group, capacity limit, description, and price (sessions can be free or paid).

**Parent view:** Parents see available sessions filtered to their child's age group. They can book with a single tap. If a session is full, they can join a waiting list.

**Polls:** Rene can create simple polls to gauge interest before committing to a session. For example: "Would a Saturday 9am session work this week?" with options like Yes / No / Maybe. Polls are sent to a specific age group. Results are visible to Rene only.

**Mobile layout:** Session list as a scrollable card view with clear date, time, and spots-remaining indicator. Booking is a single tap with confirmation.

### 6. Training Packages (Revenue Engine)

This is the primary commercial feature. A library of 30–40 structured training packages that parents can purchase for their children to follow independently.

**Package structure:**

Each package has: a title, description, category (e.g. fitness, cone work, ball mastery, shooting, passing, first touch, defending), target age range, difficulty level (beginner, intermediate, advanced, academy), number of drills/sessions included, estimated completion time, price, and a thumbnail/cover image.

Inside each package is an ordered sequence of drills or sessions. Each drill has: a title, a video demonstration, written instructions/coaching points, and an order number.

**Example packages:**
- Ball Mastery Basics — Ages 7–9, Beginner, 8 drills, £9.99
- Power Shooting — Ages 12–14, Intermediate, 12 drills, £14.99
- Academy Prep Fitness — Ages 14–16, Advanced, 20 sessions, £24.99
- Cone Work: Close Control — Ages 9–11, Beginner, 10 drills, £11.99
- First Touch Masterclass — Ages 10–13, Intermediate, 8 drills, £12.99

**Browsing & filtering:** Parents browse packages filtered by their child's age group by default, with the ability to filter further by category and difficulty level. Package cards show the title, price, age range, difficulty, and a short description.

**Purchase flow:** Tap a package to see full details and preview the first drill. Purchase with card payment. Package immediately appears on the child's dashboard.

**Progress tracking:** Once purchased, the parent (or child) works through drills in order, marking each as complete. A progress bar on the dashboard shows completion percentage. Completed drills are marked with a tick. The next drill to complete is highlighted.

**Admin package management:** Rene creates packages by adding a title, description, metadata (age, level, category, price), and then adding drills in sequence — each with a video upload and instructions. He should be able to reorder drills, edit packages after creation, and set packages as active/inactive.

### 7. Notifications

Parents receive notifications for: new video tagged to their child, new coach comment, new achievement awarded, new session created for their age group, new poll, and package purchase confirmation.

Notification channels: in-app notification feed and email. Push notifications if built as a PWA.

---

## Nice-to-Have Features (Post-Launch)

**Video submission by parents:** Parents upload a clip of their child practising a drill from a purchased package. Rene can review and leave feedback. This could be offered as a premium add-on service — personalised video feedback for an extra fee.

**Progress comparison:** Opt-in, anonymised progress indicators — "Your child has completed more packages than 80% of their age group." Must be handled carefully to stay motivational.

**Referral system:** Parents can invite other families via a referral link. Rene gets a simple way to onboard new players.

**Promo codes and bundles:** Rene can offer discount codes or bundle multiple packages at a reduced rate. Example: "Complete Ball Skills Bundle — 4 packages for £29.99."

**Seasonal programmes:** Time-limited packages tied to school holidays or pre-season. Example: "Summer Skills Camp — 4-week programme, £19.99."

**Subscription tier:** A monthly subscription (e.g. £9.99/month) that gives access to all packages or a rotating selection, as an alternative to individual purchases.

---

## Data Model

**User:** id, email, password, role (admin/parent), name, phone, notification preferences.

**Child (Player):** id, parent_id, name, date_of_birth, age_group, photo (optional).

**Video:** id, file_url, thumbnail_url, description, tagged_player_id (nullable), tagged_age_group (nullable), tagged_all (boolean), upload_date.

**Comment:** id, child_id, text, created_at.

**Achievement:** id, name, icon/badge_image, description.

**Awarded Achievement:** id, achievement_id, child_id, awarded_date, note (optional).

**Coaching Session:** id, title, date, time, location, age_group, capacity, price, description.

**Booking:** id, session_id, child_id, status (confirmed/waitlisted/cancelled), booked_at.

**Poll:** id, question, options (JSON array), age_group, created_at, active (boolean).

**Poll Response:** id, poll_id, parent_id, selected_option, responded_at.

**Training Package:** id, title, description, category, age_range_min, age_range_max, difficulty_level, price, cover_image_url, active (boolean), created_at.

**Drill:** id, package_id, title, video_url, instructions, order_number.

**Purchase:** id, package_id, child_id, parent_id, purchased_at, payment_status, payment_reference.

**Drill Progress:** id, drill_id, child_id, completed (boolean), completed_at.

---

## Mobile-First Design Requirements

Every design decision should prioritise mobile. Specific requirements:

**Navigation:** Bottom tab bar for parents (Dashboard, Sessions, Packages, Notifications, Profile). Bottom tab bar or floating action button for admin (Dashboard, Players, Packages, Sessions, More).

**Touch targets:** All interactive elements must be minimum 44px tap targets with adequate spacing.

**Typography:** Body text minimum 16px. Use a clear type hierarchy — no more than 3 font sizes per screen.

**Forms:** Single-column layouts. Use native input types (date pickers, number inputs). Minimise typing — use selectors, toggles, and taps where possible.

**Media:** Videos should play inline, not in a modal. Thumbnails should be large enough to be meaningful on a phone screen.

**Performance:** Optimise for mobile data connections. Lazy-load images and videos. Cache aggressively for repeat visits. Video uploads must handle interruptions gracefully.

**Offline consideration:** Not required for launch, but the architecture should not prevent adding offline support (e.g. cached package content) later.

**Responsive scaling:** The mobile layout is the primary layout. On tablet and desktop, content should scale gracefully — wider cards, side-by-side columns where appropriate — but the mobile experience is the reference design.

---

## Admin Content Creation Flows (Mobile-Optimised)

These are the key workflows Rene will perform repeatedly. Each must be completable on a phone in under 60 seconds.

**Upload a video to a player:** Open app → tap "+" or upload button → select/record video → type short description → search/select player name → tap publish.

**Leave a comment on a player:** Open app → search/select player → tap "Add comment" → type comment → tap save.

**Award an achievement:** Open app → search/select player → tap "Award badge" → select from badge list → tap confirm.

**Create a coaching session:** Open app → tap "New session" → fill in date, time, location, age group, capacity, price → tap create.

**Create a training package:** Open app → tap "New package" → fill in title, description, category, age range, difficulty, price → add drills one by one (video + instructions each) → reorder if needed → tap publish.

---

## Payment & Pricing Notes

Training packages are one-off purchases at individually set prices (Rene controls pricing per package). Coaching sessions may be free or paid (Rene sets this per session). Payment processing should support card payments with Rene receiving payouts. Rene needs a simple view of earnings — total revenue, breakdown by package, and recent transactions.

---

## Launch Scope (MVP)

For the initial build, prioritise: parent login and child dashboard, admin ability to add players and parents, video upload and tagging, coach comments and achievements, session creation and booking, training package creation and purchase with progress tracking, and email notifications.

Post-launch additions: polls, video submission by parents, referral system, bundles/promo codes, subscription tier.
