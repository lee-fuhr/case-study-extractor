# Case Study Extractor - Product Requirements Document

**Last updated:** 2025-12-31
**Version:** 1.0.0
**Status:** Planning

---

## Overview

Turn project photos and invoices into case studies that close deals. Upload multiple files (photos, PDFs, invoices, emails), AI extracts project information, generates 3 ready-to-use formats. $150 one-time payment.

Target customers: Contractors and manufacturers with $50K+ completed projects who need sales collateral but lack documentation.

---

## User Flow

```
Landing page (/)
  → Upload multiple files (photos, PDFs, invoices, emails)
  → Processing page (/processing?id=X)
    → Shows extraction progress, files analyzed
  → Preview page (/preview/[id])
    → FREE: Data completeness score, case study structure outline, what was found vs. missing
    → LOCKED: 3 formats (PDF, proposal insert, website copy)
  → Purchase ($150)
  → Results page (/results/[id])
    → Download all 3 formats instantly
```

---

## Pages

### Landing (`/`)
- Hero: "Turn project photos into case studies that close deals"
- Problem: Completed amazing work but lack sales collateral
- Solution: Upload scattered materials, get polished case studies
- Multi-file upload zone
- 3 formats preview (PDF, proposal insert, website copy)
- Price: $150 (closes 1 extra $50K deal = 333× ROI)
- Sample case study

**Uses shared:**
- None (custom landing page)

**Custom:**
- MultiFileUploadZone
- FormatPreviewCards (3 formats)

### Processing (`/processing?id=X`)
- File upload progress (multiple files)
- Image analysis (photos)
- Text extraction (invoices, PDFs)
- Data extraction checklist:
  - Uploading files
  - Analyzing project photos
  - Extracting invoice data
  - Finding project details
  - Generating case study

**Uses shared:**
- ✓ ProcessingPage (multi-file upload variant)
- ✓ ProcessingProgress
- ✓ ProcessingChecklist
- ✓ AnimatedCounter (files processed)

**Custom:**
- Multi-file upload status
- File type indicators (photo, PDF, invoice)

### Preview (`/preview/[id]`)
- Sidebar nav (4 views: Overview, Extracted data, Formats, Download)
- Overview: Data completeness score, what we found
- Extracted data view (partial): Shows some extracted info (teaser)
- Formats view (locked): 3 format previews
- Download view (locked): Download buttons
- Unlock CTA: "Get all 3 formats for $150"

**Uses shared:**
- ✓ AuditLayout (4-view structure)
- ✓ SidebarNav
- ✓ LockedFindings (adapted for case study data)
- ✗ ScoreModal (using custom completeness score)
- ✓ viewIcons (need custom: data, formats, download)

**Custom:**
- CompletenessScore component (0-100%, NOT inverse)
- ExtractedDataDisplay (shows found vs. missing)
- FormatPreview (teaser of 3 formats)
- 4-view structure

### Results (`/results/[id]`)
- Full access to all views
- Download all 3 formats:
  1. One-page PDF (print-ready)
  2. Proposal insert (copy-paste)
  3. Website copy (HTML-ready)
- Re-download anytime (30 days)

**Uses shared:**
- ✓ AuditLayout
- ✓ SidebarNav
- ✓ viewIcons

**Custom:**
- DownloadButtons (3 formats)
- FormatPreview (full view)

### Sample (`/sample`)
- Pre-populated case study extraction
- Shows full results (unlocked)
- "Extract your case study" CTA

**Uses shared:**
- Same as results page

**Custom:**
- Hardcoded sample data (Riverside Manufacturing Facility)

---

## Shared Component Matrix

| Component | Used | Customization |
|-----------|------|---------------|
| ProcessingPage | ✓ | Multi-file upload variant |
| AuditLayout | ✓ | 4-view structure (Overview, Data, Formats, Download) |
| SidebarNav | ✓ | Using as-is |
| LockedFindings | ✓ | Adapted for extracted data display |
| ScoreModal | ✗ | Using custom CompletenessScore (0-100%, normal scale) |
| AnimatedCounter | ✓ | For files processed count |
| viewIcons | Partial | Need custom icons: data, formats, download |
| ProcessingProgress | ✓ | Using as-is |
| ProcessingStatus | ✓ | Using as-is |
| ProcessingChecklist | ✓ | Custom checklist items |
| getCommodityScore* | ✗ | N/A (using completeness score instead) |
| formatHostname | ✗ | N/A |

---

## Tool-Specific Components

### Custom Components Needed

1. **MultiFileUploadZone**
   - Drag-and-drop multiple files
   - File type validation (photos, PDFs)
   - Individual file progress
   - File preview thumbnails

2. **CompletenessScore**
   - 0-100% data completeness
   - Normal scale (higher = better, NOT inverse like commodity score)
   - Shows what was found vs. missing
   - Visual breakdown by category

3. **ExtractedDataDisplay**
   - Project name
   - Client
   - Budget
   - Timeline
   - Scope
   - Results/outcomes
   - Testimonial (if found)

4. **FormatPreview**
   - Preview of 3 formats side-by-side
   - One-page PDF preview
   - Proposal insert preview
   - Website copy preview

5. **DownloadButtons**
   - Download PDF
   - Download proposal insert (TXT or DOCX)
   - Download website copy (HTML)

---

## Scoring System

**Completeness Score (0-100%, NORMAL - higher is better)**

NOT an inverse score like commodity score.

| Score | Label | Meaning |
|-------|-------|---------|
| 80-100% | Excellent | All key data found |
| 60-79% | Good | Most data found, minor gaps |
| 40-59% | Fair | Some data found, notable gaps |
| 0-39% | Limited | Significant data missing |

**Data categories:**
- Project name (20%)
- Client (15%)
- Budget/value (15%)
- Timeline (15%)
- Scope/deliverables (20%)
- Results/outcomes (10%)
- Testimonial/quote (5%)

---

## Integration Notes

**Shared library version:** 1.0.0

**Estimated integration:** 16-20 hours
- Implement multi-file upload flow: 5h
- Integrate ProcessingPage with multi-file variant: 2h
- Adapt AuditLayout for 4-view structure: 2h
- Create CompletenessScore component (NORMAL scale, not inverse): 3h
- Build FormatPreview and DownloadButtons: 4h
- Implement PDF generation: 5h
- Testing and cleanup: 3h

**Dependencies:**
- None - builds on patterns from website-audit
- May need ProcessingPage multi-file upload variant added to shared library
- Need to add completeness scoring utils to shared library (different from commodity score)

---

## API Endpoints

### POST `/api/upload`
**Input:** `multipart/form-data` with multiple files
**Output:** `{ success: boolean, extractionId: string, error?: string }`

Uploads files and starts extraction.

### GET `/api/extract?id={id}`
**Output:**
```json
{
  "success": boolean,
  "extraction": {
    "status": "uploading|analyzing|extracting|generating|complete|failed",
    "progress": number,
    "message": string,
    "filesProcessed": number,
    "totalFiles": number
  }
}
```

Polls for extraction progress.

### GET `/api/results/[id]`
**Output:** Full case study data + download links

Returns extracted data and generated formats.

---

## Extraction Engine

**What we extract from photos:**
- Project type (construction, manufacturing, etc.)
- Scale/size (from visual context)
- Completion state
- Quality indicators

**What we extract from invoices/PDFs:**
- Project name
- Client name
- Budget/value
- Timeline/dates
- Scope items
- Payment terms

**What we generate:**
1. **One-page PDF** - Print-ready case study with photos, professional layout
2. **Proposal insert** - Copy-paste format for "Relevant Experience" sections
3. **Website copy** - HTML-ready markup, structured for SEO, portfolio pages

---

## Changelog

### 1.0.0 (2025-12-31)
- Initial PRD documenting integration with shared component library
- Defined 4-view case study extraction structure
- Established completeness scoring (normal scale, not inverse)
- Defined 3 output formats
