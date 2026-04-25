# MONEY Framework — Website Building Lecture

> Source: YouTube lecture processed via NotebookLM (notebook `bb3bb5c4`)
> Context: Build websites for boring/unsexy local businesses, charge $500-$2000/mo MRR.

---

## M — Map the Niche

**Goal**: Find "boring but profitable" niches where businesses *need* a website but have terrible ones.

| Niche | Why It Works |
|---|---|
| Auto Detailing | High ticket ($200-$500/job), visual results, mobile-first customers |
| Pool Cleaning | Recurring revenue, seasonal demand, low competition online |
| HVAC | Emergency searches, high AOV, terrible existing sites |
| Plumbing | Same as HVAC — urgency + bad web presence |
| Landscaping | Visual portfolio opportunity, local SEO goldmine |

**Key Insight**: The uglier their current site, the easier the sell.

---

## O — Obtain Leads

**Goal**: Build a database of businesses with contact info + emails for outreach.

### Step 1: Scrape (Google Maps → CSV)

- **Tool**: Apify "Google Maps Contact Data Extractor" (~$0.20/run)
- **Backup**: Instant Data Scraper (free Chrome extension, manual)
- **Output**: `austin_auto_detailers_full.csv` — 140 leads
- **Fields**: Name, Phone, Website, Address, Rating, Socials

### Step 2: Enrich (Add Emails)

- **Tool**: AnyMailFinder API (`v5.1/find-email/company`)
- **Script**: `enrich_leads.py`
- **Output**: `austin_auto_detailers_enriched.csv` — 147 rows processed
- **Result**: Emails appended where domain was available

### Step 3: Analyze Competitors ← **THIS STEP**

- **Scripts**: `identify_competitors.py`, `print_competitors.py`
- **Output**: `competitor_patterns.md`

**Why this matters**: You can't build a site that *wins* unless you know what winning looks like. Analyzing the top 5 and bottom 5 gives you a blueprint.

#### Top 5 (Highest Rated)

| Business | Rating | Website |
|---|---|---|
| Pont Detailing | 5.0 | pontdetailing.com |
| Gerber Precision | 4.9 | gerberdetailing.com |
| Austin Auto Armor | 4.6 | austinautoarmor.com |
| The Wash Shop | 4.0 | washshop.com |
| Refined Rides | — | refinedridesautodetailing.com |

#### Bottom 5 (Lowest Rated)

| Business | Rating | Website |
|---|---|---|
| Eureka Car Wash | 2.2 | clean-o-matic.com (broken) |
| ProntoWash | 2.4 | prontowash.com (generic franchise) |
| Charlie's Car Detailing | 2.5 | *No website* |
| Xpress Carwash | 3.3 | *No website* |
| H2O Hand Car Wash | 3.3 | h2ohandcarwash.com |

#### 10 Patterns: Winners vs Losers

1. **Localized Hero** — "North Austin" vs generic "Car Wash"
2. **Dual CTAs** — "Get Quote" + "Call Now" above fold
3. **Trust Signals** — Star rating/badge immediately visible
4. **Niche Targeting** — "Ceramic Coating" vs "We do everything"
5. **Authentic Photos** — Real staff vs stock photos
6. **Transparent Pricing** — "Starting at $199" vs "Call us"
7. **Online Booking** — Square/Urable embed vs contact form
8. **Mobile-First** — Thumb-friendly vs desktop-shrink
9. **HTTPS + Speed** — Secure/fast vs broken/HTTP
10. **Result Focus** — "Sparkling finish" gallery vs "foam bucket" shots

---

## N — Nail the Build

**Goal**: Config-driven template that clones in minutes.

- **Architecture**: HTML + CSS + JS + `website_config.json`
- **Template**: `E:\Website Building\Money_Template\`
- **Key Files**: `index.html`, `styles.css`, `script.js`, `website_config.json`
- **Clone Process**: Copy folder → edit JSON → deploy

**Status**: Base template built. Needs refinement using the 10 patterns above.

---

## E — Execute Outreach

**Goal**: Cold email/DM with a *free website* as the hook.

- **Tool**: Instantly.ai (or manual Gmail)
- **Strategy**: Build the site *first*, deploy to Vercel (free), then email:
  > "Hey [Name], I noticed [Business] doesn't have a website that shows off your 5-star work. I built you one — check it out: [link]. If you like it, I can set it up for $X/mo."
- **Key**: Value-first. No pitch until they see the product.

---

## Y — Yield Revenue (MRR)

**Goal**: Turn one-time builds into monthly recurring revenue.

| Upsell | Monthly |
|---|---|
| Hosting + Maintenance | $50-$100 |
| SEO / Google My Business | $200-$500 |
| Chatbot / Lead Capture | $100-$200 |
| Review Management | $100-$200 |
| Social Media Posts | $300-$500 |

**Target**: 10 clients × $200/mo = **$2,000/mo MRR**

---

## Progress Tracker

| Step | Status | Artifact |
|---|---|---|
| M — Map Niche | ✅ Done | Auto Detailing (Austin) selected |
| O — Scrape | ✅ Done | `austin_auto_detailers_full.csv` |
| O — Enrich | ✅ Done | `austin_auto_detailers_enriched.csv` |
| O — Analyze | ✅ Done | `competitor_patterns.md` |
| N — Template | 🔨 In Progress | `Money_Template/` |
| E — Outreach | ⏳ Pending | — |
| Y — Revenue | ⏳ Pending | — |
