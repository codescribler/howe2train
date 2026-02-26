# Howe2Train — Design System

> Style guide for building any Howe2Train web page or marketing site.
> Use this file alongside `howe2train-brand.css` for a ready-to-go foundation.

---

## Brand Identity

**Who:** Rene Howe — former professional footballer, founder of Howe 2 Coach.
**What:** Football coaching for young players (ages 7–16) and their parents.
**Tone:** Premium, authoritative, confident. Not playful or childish. A professional coach's platform — parents are trusting Rene with their child's development.
**Logo:** Black shield with gold accents. The logo file is `images/howe2trainlogo.png`.

---

## Colour Palette

The palette is intentionally restrained — black, gold, and white. Gold is the hero colour used sparingly for emphasis, not painted everywhere.

| Role | Hex | CSS Variable | Usage |
|------|-----|--------------|-------|
| Gold (primary) | `#C5A55A` | `--gold` | CTAs, headings, accents, active states, prices |
| Gold Light | `#D4B96E` | `--gold-light` | Hover states, secondary gold highlights |
| Gold Dark | `#A8893E` | `--gold-dark` | Pressed states, dark gold text |
| Background | `#0A0A0A` | `--bg` | Page background |
| Card | `#141414` | `--bg-card` | Card and section backgrounds |
| Surface | `#1A1A1A` | `--bg-surface` | Input fields, interactive surfaces |
| Border | `#2A2A2A` | `--border` | Card borders, dividers |
| Hover | `#222222` | `--bg-hover` | Hover background |
| White | `#FFFFFF` | `--text` | Primary text |
| Gray 400 | `#9CA3AF` | `--text-muted` | Secondary/body text |
| Gray 500 | `#6B7280` | `--text-faint` | Labels, captions, metadata |

### Gold usage rules

- **Do:** Use gold for the primary CTA, key headings, prices, active nav items, and important metrics.
- **Don't:** Use gold for body text, large background fills, or secondary elements. If everything is gold, nothing is gold.
- **Transparency:** Use `rgba(197,165,90,0.08)` for faint gold backgrounds (icon containers), `rgba(197,165,90,0.15)` for subtle highlights (badges, tags).

### Supporting accent colours (data/UI only)

These are used for status indicators, charts, and badges — never for branding.

| Purpose | Hex | When to use |
|---------|-----|-------------|
| Success/Green | `#22C55E` | Confirmations, positive status |
| Info/Blue | `#38BDF8` | Informational highlights, secondary data |
| Warning/Amber | `#F59E0B` | Alerts, low-stock indicators |
| Error/Red | `#EF4444` | Errors, destructive actions |

---

## Typography

### Fonts

| Role | Font | Weights | Usage |
|------|------|---------|-------|
| Display / Headings | **Barlow Condensed** | 400, 500, 600, 700, 800 | All headings, numbers, prices, nav labels |
| Body | **Barlow** | 300, 400, 500, 600, 700 | Body text, labels, descriptions, inputs |

```html
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;500;600;700;800&family=Barlow:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

### Type scale

| Element | Font | Size | Weight | Colour |
|---------|------|------|--------|--------|
| Hero heading | Barlow Condensed | 48–64px | 800 | White or Gold |
| Page heading (h1) | Barlow Condensed | 32–40px | 700 | White |
| Section heading (h2) | Barlow Condensed | 24–28px | 700 | White |
| Card heading (h3) | Barlow Condensed | 18–20px | 700 | White |
| Subheading (h4) | Barlow | 16px | 600 | White |
| Body text | Barlow | 16px | 400 | Gray 400 (`#9CA3AF`) |
| Small text / labels | Barlow | 12–14px | 500 | Gray 500 (`#6B7280`) |
| Prices / key numbers | Barlow Condensed | 24–40px | 700 | Gold |
| Uppercase labels | Barlow | 12px | 600 | Gray 500, letter-spacing: 0.05em |

### Key rules

- Body text minimum 16px — never smaller for readability.
- No more than 3 font sizes per section.
- Headings always Barlow Condensed, body always Barlow.
- Prices and monetary values are always gold and use Barlow Condensed.

---

## Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | `4px` | Tight gaps, inline spacing |
| `--space-sm` | `8px` | Icon gaps, badge padding |
| `--space-md` | `16px` | Standard padding, container gutters |
| `--space-lg` | `24px` | Section padding, card padding |
| `--space-xl` | `32px` | Large section gaps |
| `--space-2xl` | `48px` | Between major page sections |
| `--space-3xl` | `64px` | Hero vertical padding |

**Container:** Max-width `1200px`, centred, with `16px` horizontal padding on mobile scaling to `24px` on desktop.

---

## Border Radius

| Element | Radius |
|---------|--------|
| Buttons | `12px` (xl) |
| Cards | `16px` (2xl) |
| Inputs | `12px` (xl) |
| Badges / pills | `9999px` (full) |
| Small elements | `8px` (lg) |
| Images / thumbnails | `12–16px` |

The design is rounded but not bubbly. No sharp corners.

---

## Shadows

Shadows are subtle on dark backgrounds. Use sparingly.

| Level | Value | Usage |
|-------|-------|-------|
| Subtle | `0 1px 2px rgba(0,0,0,0.3)` | Slight lift |
| Card | `0 4px 12px rgba(0,0,0,0.3)` | Cards, elevated surfaces |
| Gold glow | `0 0 20px rgba(197,165,90,0.15)` | Featured cards, hero elements |
| Gold glow (strong) | `0 4px 30px rgba(197,165,90,0.3)` | Primary CTAs, FABs |

---

## Components

### Buttons

**Primary (gold):**
- Background: `#C5A55A`, text: `#0A0A0A` (dark)
- Font: Barlow, 16–18px, weight 600
- Padding: `14px 28px`, radius `12px`
- Hover: lighten to `#D4B96E`, subtle lift `translateY(-1px)`
- Active: darken to `#A8893E`, scale `0.97`

**Secondary (outline):**
- Background: transparent, border: `1px solid #2A2A2A`, text: white
- Hover: border `#C5A55A`, text gold
- Active: scale `0.97`

**Ghost:**
- Background: transparent, text: gold
- Hover: background `rgba(197,165,90,0.08)`

### Cards

- Background: `#141414`
- Border: `1px solid #2A2A2A`
- Radius: `16px`
- Padding: `20–24px`
- Hover: border shifts to `rgba(197,165,90,0.3)`, faint gold glow
- All transitions: `200ms ease`

### Inputs

- Background: `#1A1A1A`
- Border: `1px solid #2A2A2A`
- Radius: `12px`
- Padding: `12px 16px`
- Text: white, 16px
- Placeholder: `#6B7280`
- Focus: border `#C5A55A`, no outline, optional `0 0 0 3px rgba(197,165,90,0.15)` ring

### Badges / Pills

- Radius: full (`9999px`)
- Padding: `4px 12px`
- Font: 12px, weight 600
- Active pill: gold background, dark text
- Inactive pill: transparent, `#2A2A2A` border, gray text

### Navigation

- Use Lucide icons (consistent set throughout)
- Active state: gold icon + gold text
- Inactive: `#6B7280` gray
- Transitions: `200ms ease`

---

## Icons

**Library:** [Lucide Icons](https://lucide.dev) — lightweight, consistent SVG icon set.

```html
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>
```

Usage: `<i data-lucide="icon-name" class="w-5 h-5"></i>` then call `lucide.createIcons()`.

**Commonly used icons:**
- Navigation: `home`, `calendar`, `package`, `shopping-bag`, `bell`, `user`, `settings`
- Actions: `plus`, `edit`, `trash-2`, `check`, `x`, `arrow-left`, `chevron-right`
- Content: `play-circle`, `file-text`, `image`, `video`, `camera`
- Status: `check-circle`, `alert-circle`, `info`, `trophy`, `star`
- Data: `trending-up`, `bar-chart-3`, `target`, `timer`

---

## Animations & Motion

All motion uses `cubic-bezier(0.22, 1, 0.36, 1)` for a snappy, premium feel.

| Animation | Duration | Usage |
|-----------|----------|-------|
| Page transition | `300ms` | Screen entry (fade + translateY 12px) |
| Hover / focus | `150–200ms ease` | Buttons, cards, interactive elements |
| Modal entry | `350ms` | Bottom sheet slide up |
| Fade in | `200ms` | Overlays, toasts |
| Active press | `150ms` | Scale to 0.97 on tap/click |

**Gold shimmer effect** (for hero text):
```css
background: linear-gradient(90deg, #C5A55A 0%, #E8D5A0 25%, #C5A55A 50%, #E8D5A0 75%, #C5A55A 100%);
background-size: 200% auto;
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
animation: goldShimmer 3s linear infinite;
```

**Reduced motion:** Always respect `prefers-reduced-motion: reduce`.

---

## Layout Patterns

### Hero section
- Full-width dark background
- Large Barlow Condensed heading (48–64px, bold, white or gold)
- Short description in Barlow (16–18px, gray 400)
- Single gold CTA button centred or left-aligned
- Optional subtle gold gradient overlay: `linear-gradient(135deg, rgba(197,165,90,0.08), transparent)`

### Feature / benefit cards
- Grid: 1 column mobile, 2–3 columns desktop
- Dark card with gold icon in a `rgba(197,165,90,0.08)` circle
- Heading in white, description in gray

### Pricing / stats
- Numbers in Barlow Condensed, bold, gold
- Labels in small gray text above or below
- Optional gold border on featured/highlighted item

### Testimonials / social proof
- Dark card with subtle border
- Quote in white italic, attribution in gray
- Optional gold left border accent

---

## Responsive Breakpoints

| Name | Width | Notes |
|------|-------|-------|
| Mobile | `< 640px` | Single column, 16px gutters |
| Tablet | `640–1024px` | 2-column grids, 20px gutters |
| Desktop | `1024px+` | Full layout, 24px gutters, max-width 1200px |

Mobile-first always. Design for mobile, scale up.

---

## Image Guidelines

- **Style:** High-energy action shots, training footage, on-pitch moments.
- **Treatment:** Slightly desaturated or with a subtle dark overlay to maintain contrast with text.
- **Aspect ratios:** Hero 16:9, cards 4:3 or 1:1, thumbnails 1:1.
- **Border radius:** Match the container (12–16px).
- **Fallback:** Dark surface colour (`#1A1A1A`) while loading.

---

## Anti-Patterns (Do NOT)

- No emojis as icons — always use Lucide SVG icons
- No bright/saturated colours for branding — gold and black only
- No light mode backgrounds — this is a dark-theme brand
- No playful or childish aesthetics — this is a professional coach's platform
- No rounded-full cards — use `16px` radius, not circles
- No layout-shifting hover effects — use opacity/shadow/border changes only
- No instant state changes — always transition (150–300ms)
- No text below 12px
- No gold on gold — always ensure sufficient contrast

---

## Pre-Delivery Checklist

- [ ] Dark background (#0A0A0A) used throughout
- [ ] Gold (#C5A55A) used only for accents, CTAs, and key numbers
- [ ] Barlow Condensed for headings, Barlow for body
- [ ] All icons from Lucide (consistent set)
- [ ] `cursor: pointer` on all clickable elements
- [ ] Hover/focus states with smooth transitions
- [ ] Text contrast meets 4.5:1 minimum (white on dark, gold on dark)
- [ ] `prefers-reduced-motion` respected
- [ ] Responsive: 375px, 768px, 1024px, 1440px tested
- [ ] No horizontal scroll on mobile
- [ ] No emojis used anywhere
