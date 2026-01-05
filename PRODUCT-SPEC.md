# Case Study Extractor - Product Specification

## Product Summary

**Name:** Case Study Extractor
**Price:** $147 (one-time payment)
**Hook:** "Turn your project photos and invoices into case studies that close deals"

## The Problem

Manufacturers, contractors, and service providers complete incredible work but have zero sales collateral. They have:
- Project photos on their phone
- Invoices showing real money
- Maybe a happy email from a client
- No time to write case studies

When prospects ask "Show me your work," they scramble. Meanwhile competitors with polished case studies close deals.

## The Solution

Upload the mess (photos, invoices, emails, project notes). Get sales-ready case studies in three formats:

1. **One-page PDF** - Print/email ready
2. **Proposal insert** - Copy-paste into RFPs
3. **Website copy** - HTML ready for portfolios

## Target Market

### Primary Audience
- Contractors (construction, HVAC, electrical, etc.)
- Manufacturers (custom fabrication, equipment, etc.)
- Consultants (management, engineering, technical)
- Service providers with tangible deliverables

### Characteristics
- Complete projects worth $50K-$500K+
- Make it to final 3 bids but rarely win without being cheapest
- Have project documentation but no case studies
- Need sales collateral yesterday, not a 2-week writing project

### Pain Points
- Can't prove value beyond "we do good work"
- Lose deals to competitors with better storytelling
- Don't have time to write case studies
- Don't know how to structure compelling narratives

## Value Proposition

### Free Preview
Shows you what we found, builds trust before asking for payment:
- Data completeness score (%)
- What was extracted from files
- Case study structure/outline
- What's missing (needs manual addition)

### Paid Package ($147)
Complete case study in three ready-to-use formats:

**Format 1: One-Page PDF**
- Professional layout
- Challenge → Approach → Results → Quote
- Print ready for trade shows, follow-ups, leave-behinds

**Format 2: Proposal Insert**
- Concise format for RFPs
- Fits "Relevant Experience" sections
- Shows you've done this before

**Format 3: Website Copy**
- HTML-ready markup
- Structured for SEO
- Portfolio/gallery pages

## Extraction Engine Logic

### Input Files Accepted
- **Photos:** JPG, PNG, HEIC (project progress, completed work)
- **Documents:** PDF, Word, TXT (invoices, emails, notes, contracts)
- **Spreadsheets:** Excel (project tracking, budgets)

### Data Extraction Points

**Project Metadata:**
- Project name
- Client name
- Industry/sector
- Location
- Project type (e.g., "Design-Build Expansion")

**Financial Details:**
- Project value (from invoices)
- Budget vs actual
- Cost savings (if documented)

**Timeline:**
- Start and end dates
- Duration (weeks/months)
- Early/late delivery notes

**Challenge/Problem:**
- Client's original problem or need
- Constraints (timeline, budget, compliance)
- Risks or obstacles

**Approach/Solution:**
- Methodology used
- Unique processes or techniques
- Key decisions made

**Results/Outcomes:**
- Quantifiable results (time, money, quality)
- Client satisfaction indicators
- Follow-up work awarded

**Testimonials:**
- Client quotes from emails
- Formal testimonials
- Positive feedback

### Extraction Intelligence

**What AI Looks For:**
1. Numbers (dollar amounts, percentages, timelines)
2. Superlatives ("fastest," "first," "only")
3. Comparisons ("under budget," "ahead of schedule")
4. Problems solved (compliance, efficiency, quality)
5. Client language ("great," "exceeded," "impressed")

**Confidence Scoring:**
- High: Explicitly stated facts with numbers
- Medium: Implied outcomes, contextual clues
- Low: General statements without specifics

**Data Completeness:**
- 80%+ = Excellent (strong case study possible)
- 60-79% = Good (solid with some additions)
- <60% = Needs work (key details missing)

## Case Study Templates

### Structure (All Formats)

**Title Section:**
- Project name (prominent)
- Client name + industry
- Key metrics (value, timeline, location)

**Challenge:**
- What problem did the client have?
- What made it difficult?
- What were the stakes?

**Approach:**
- How did you solve it?
- What was unique about your method?
- Key decisions or processes

**Results:**
- Quantifiable outcomes (3-5 bullets)
- Time, money, quality improvements
- Client satisfaction proof

**Testimonial (if available):**
- Direct client quote
- Name/title/company

### Format-Specific Adaptations

**One-Page PDF:**
- Visual hierarchy (large title, clear sections)
- Boxed metrics for scanning
- Professional typography
- Print-ready spacing

**Proposal Insert:**
- Compact format (fits 1/2 to 2/3 page)
- Bullet-heavy for quick reading
- Emphasizes "relevant experience"
- Easy to skim in RFP context

**Website Copy:**
- HTML semantic markup (h2, h3, ul, blockquote)
- Schema-friendly structure
- Image placeholders
- Mobile-responsive considerations

## User Experience Flow

### 1. Landing Page (`/`)

**Above Fold:**
- Headline: "Turn project photos & invoices into case studies that close deals"
- Subhead: Free preview shows what we found. Full package $147.
- Upload zone (drag-drop or browse)

**Supporting Sections:**
- The problem (amazing work, zero documentation)
- What you get (3 formats explained)
- How it works (4 steps: upload → extract → preview → unlock)
- Who it's for (contractors, manufacturers, consultants)
- ROI calculator ($50K deal = 515× ROI)
- Testimonials (if available)

**Upload Box:**
- Multi-file drag-and-drop
- Visual feedback (file list, size, type)
- Clear CTA: "Extract My Case Study →"
- Trust signals: "Free preview · No credit card · Files deleted after"

### 2. Processing (`/processing?id=xxx`)

**Visual Progress:**
- Progress bar (0-100%)
- Status messages:
  - "Reading uploaded files..."
  - "Extracting text from documents..."
  - "Analyzing project photos..."
  - "Finding project scope and value..."
  - "Identifying results and outcomes..."
  - "Building case study structure..."

**Expectations:**
- 2-3 minute processing time
- What we're looking for (bullets)
- Security note (files deleted after)

**Redirect:**
- Auto-redirect to preview when complete

### 3. Preview (`/preview/[id]`)

**Completeness Score:**
- Large circular gauge showing percentage
- Color-coded: 80%+ green, 60-79% yellow, <60% red
- Explanation of score

**Extracted Data Display:**
- Each data point in card format
- Checkmark if found, empty circle if missing
- Actual extracted content visible
- "Not found - add manually" for gaps

**Data Points Shown:**
- Project name ✓ / ○
- Client name ✓ / ○
- Project value ✓ / ○
- Timeline ✓ / ○
- Challenge ✓ / ○
- Approach ✓ / ○
- Results (count) ✓ / ○
- Testimonial ✓ / ○

**Unlock CTA:**
- Prominent section explaining paid package
- "What you'll get" list
- Price: $147
- CTA: "Unlock for $147 →"
- Guarantee: 30-day money-back

### 4. Checkout (`/checkout?id=xxx`)

**Summary:**
- What's included (3 formats)
- Price breakdown
- Money-back guarantee

**Payment Form:**
- Email
- Stripe card element
- "Pay $147 →" CTA
- Security badges (SSL, Stripe)

**Post-Payment:**
- Immediate redirect to results
- Email confirmation with download links

### 5. Results (`/results/[id]`)

**Format Selector:**
- Tabs for 3 formats
- Active format highlighted

**Format Display:**
- Description of use case
- Copy button (clipboard)
- Download button (text file or PDF)
- Formatted preview (readable)

**All Formats:**
- One-pager (plain text version, PDF in future)
- Proposal insert (plain text)
- Website copy (HTML markup)

**Next Steps:**
- Encourage customization
- Suggest deployment (website, proposals, etc.)
- CTA: "Document another project"

## Technical Architecture

### Frontend
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + custom design system
- **Fonts:** Changa One (display), Changa (body)

### Backend (Future)
- **File Processing:** Anthropic Claude (vision + text extraction)
- **Storage:** Temporary (AWS S3 or similar, auto-delete after 24h)
- **Payments:** Stripe Checkout
- **Database:** Vercel KV or PostgreSQL (store results, enable user dashboard)

### Current Implementation (Mock)
- Static mock data in extraction engine
- Sample project: Riverside Manufacturing Facility
- All pages functional with mock flow
- No real API integrations yet

### File Processing (Future)

**Photo Analysis (Claude Vision):**
- Detect project type (construction, manufacturing, etc.)
- Identify completed work vs progress shots
- Extract visible text (signage, labels, documents)
- Estimate scale/scope from visual cues

**Document Parsing:**
- PDFs: Extract text, tables, metadata
- Word/Excel: Parse structured data
- Emails: Find client communications, feedback
- Invoices: Extract dollar amounts, dates, scope

**Data Synthesis:**
- Combine multi-source data
- Resolve conflicts (different timelines, amounts)
- Infer missing data from context
- Generate narrative structure

## Design System

### Visual Identity

**Industrial, Manufacturing-Focused:**
- Bold, high-contrast typography
- Minimal decoration
- Results-oriented messaging
- No stock photos or fluff

**Colors:**
- Background: `#09090B` (near-black)
- Foreground: `#FAFAFA` (off-white)
- Accent: `#ff6b35` (orange-red, energetic)
- Success: `#00ff88` (bright green)
- Muted: `#1a1a1f` (dark gray)

**Typography:**
- Display: Changa One (uppercase, tight, impactful)
- Body: Changa (strong, readable, approachable)
- Monospace: For code/data display

### Component Library

**Buttons:**
- `.btn-kinetic` - Primary CTA (scales on hover)
- `.btn-outline` - Secondary actions
- `.btn-reversed` - Inverted (light on dark accent)

**Layouts:**
- `.upload-zone` - File drop area
- `.case-study-card` - Content display
- `.case-study-section` - Individual sections
- `.progress-bar` - Processing status

**Animations:**
- Minimal, purposeful
- Scale on hover (buttons, cards)
- Smooth transitions (200ms)
- Marquee for problem/stakes messaging

## Copy Strategy

### Voice & Tone

**Direct, No-Nonsense:**
- Short sentences
- Active voice
- Benefit-driven
- No jargon or corporate speak

**Problem-Aware:**
- Acknowledge frustration (lost deals, lack of time)
- Validate the user ("you've built incredible work")
- Show empathy without patronizing

**Results-Focused:**
- Lead with outcomes, not features
- Use numbers (ROI, time saved, deal value)
- Specific, not generic ("$47K under budget" not "cost savings")

### Key Messages

**Homepage:**
- "Turn project photos & invoices into case studies that close deals"
- "You've built incredible work. But you can't prove it."
- "Upload the mess. Get sales ammo."
- "Stop losing deals to better storytelling"

**Preview:**
- "Here's what we found in your files"
- "The structure is built. Full case studies unlock for $147."
- "See what's missing before you pay"

**Results:**
- "Your case study is ready"
- "All three formats. Copy, download, deploy."
- "Document another project?"

## Pricing & Business Model

### Pricing
**$147 per case study extraction**
- No subscription
- Pay per project
- All formats included
- Instant access

### Rationale

**Anchored to Deal Value:**
- Target users close $50K-$500K+ deals
- $147 = 0.3% of a $50K deal
- If case study helps close ONE extra deal = 515× ROI

**Lower Than Alternatives:**
- Professional copywriter: $500-$2,000+
- Marketing agency: $2,000-$5,000+
- DIY time cost: 8-16 hours

**Psychological Pricing:**
- Under $200 (low friction)
- Above $100 (perceived value)
- Odd number ($147 not $150) feels considered

### Revenue Model

**Primary:** Per-extraction sales
**Future Upsells:**
- Multi-project packages (3 for $397)
- White-label case study templates
- Client dashboard (save, edit, re-download)
- PDF design upgrades (custom branding)

### Money-Back Guarantee
- 30 days
- No questions asked
- Builds trust, reduces risk
- Expected refund rate: <5%

## Success Metrics

### Business KPIs
- Conversion rate (upload → paid)
- Average order value
- Customer acquisition cost
- Refund rate
- Repeat purchase rate

### Product KPIs
- Extraction accuracy (data completeness score)
- Time to complete (upload → results)
- User satisfaction (post-purchase survey)
- Format usage (which formats downloaded most)

### User Experience
- Bounce rate on landing page
- Upload completion rate
- Preview engagement time
- Checkout abandonment rate

## Competitive Landscape

### Direct Competitors
**None.** No one offers automated case study extraction from raw project files.

### Indirect Competitors

**Professional Services:**
- Copywriters ($500-$2,000 per case study)
- Marketing agencies ($2,000-$5,000+)
- Pros: High quality, custom
- Cons: Expensive, slow (weeks), ongoing relationship

**DIY Tools:**
- Canva templates
- Word templates
- Pros: Free/cheap, control
- Cons: Still requires writing, time-intensive, design skills

**AI Writing Tools:**
- ChatGPT, Jasper, Copy.ai
- Pros: Fast, cheap
- Cons: Requires writing prompts, no extraction from files, generic output

### Competitive Advantages

**Unique Value:**
1. **File-to-finished:** Only tool that goes from raw materials to polished case study
2. **Multi-format:** Three formats, not just one output
3. **Free preview:** See before you buy (builds trust)
4. **Speed:** 5 minutes vs 2 weeks
5. **Price:** $147 vs $500-$5,000

**Barriers to Entry:**
- AI integration (Claude vision + text)
- UX/UI polish
- Domain expertise (what makes a good case study for this market)
- Trust/credibility in target market

## Future Enhancements

### Phase 2 (Post-Launch)
- Real AI extraction (Anthropic Claude)
- Stripe payment integration
- Email delivery with download links
- PDF generation for one-pager

### Phase 3 (Growth)
- User accounts/dashboard
- Save and edit case studies
- Re-download anytime
- Multi-project view

### Phase 4 (Expansion)
- Custom branding (logo, colors on one-pager)
- Additional formats (social media posts, email signatures)
- Team accounts (contractor firms with multiple PMs)
- API access for integration with CRMs

### Long-Term Ideas
- Before/after photo pairing (AI matches progress → completion)
- Video testimonial extraction (transcribe → quote)
- Industry-specific templates (construction, manufacturing, consulting)
- ROI calculator (embed in case studies)

## Open Questions

1. **Pricing:** Is $147 optimal or test $97/$147/$197?
2. **Free preview limits:** Show structure only, or first 50 words of content?
3. **Payment timing:** Before or after seeing results? (Current: before)
4. **Customization:** How much manual editing in v1?
5. **Batch pricing:** Discount for multiple case studies at once?

## Success Criteria (Launch)

### MVP Must-Haves
- [x] Working upload (multi-file)
- [x] Processing page (realistic progress)
- [x] Preview page (show mock extracted data)
- [x] All 3 case study formats
- [x] Checkout flow
- [x] Results page (download capability)
- [ ] Real extraction (Anthropic integration)
- [ ] Stripe payment processing

### Launch Checklist
- Extraction accuracy: 70%+ data completeness on test files
- Page load speed: <2s on all pages
- Mobile responsive: All pages work on phone
- Payment success rate: >95%
- Email delivery: <1 minute after payment

### Success Targets (90 days)
- 100 paid extractions
- 25% upload → paid conversion
- <5% refund rate
- 4+ star average satisfaction

---

**Last Updated:** 2024-12-24
**Version:** 1.0
**Status:** Specification complete, mock app built, ready for integration
