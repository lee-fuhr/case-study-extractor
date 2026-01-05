'use client'

import Link from 'next/link'

export default function SamplePDFPage() {
  return (
    <>
      {/* Print styles - hide everything except the PDF content */}
      <style jsx global>{`
        @media print {
          @page {
            size: letter;
            margin: 0.5in;
          }
          body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .no-print,
          header,
          footer,
          nav,
          [data-feedback-widget],
          .feedback-widget {
            display: none !important;
          }
          .print-only {
            box-shadow: none !important;
          }
        }
        @media screen {
          .print-only {
            max-width: 8.5in;
            margin: 0 auto;
            padding: 0.5in;
            background: white;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
          }
        }
      `}</style>

      {/* Action bar (screen only) */}
      <div className="no-print bg-[#1a3a5c] text-white py-4 px-6">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <Link href="/sample" className="text-white/80 hover:text-white text-sm flex items-center gap-2">
            ← Back to full results
          </Link>
          <div className="flex gap-3">
            <button
              onClick={() => window.print()}
              className="bg-white text-[#1a3a5c] px-4 py-2 font-semibold text-sm hover:bg-gray-100"
            >
              Save as PDF
            </button>
            <button
              onClick={() => {
                const html = document.querySelector('.print-only')?.outerHTML || ''
                const blob = new Blob([`<!DOCTYPE html><html><head><meta charset="utf-8"><title>Case Study - Meridian Office Complex</title><style>body{font-family:system-ui,-apple-system,sans-serif;color:#1a1a1a;font-size:11pt;line-height:1.5;max-width:8.5in;margin:0 auto;padding:0.5in}</style></head><body>${html}</body></html>`], { type: 'text/html' })
                const url = URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href = url
                a.download = 'case-study-meridian-hvac.html'
                a.click()
                URL.revokeObjectURL(url)
              }}
              className="bg-white/20 text-white px-4 py-2 font-semibold text-sm hover:bg-white/30"
            >
              Download HTML
            </button>
          </div>
        </div>
      </div>

      {/* PDF Content */}
      <div className="print-only" style={{ fontFamily: 'system-ui, -apple-system, sans-serif', color: '#1a1a1a', fontSize: '11pt', lineHeight: '1.5' }}>

        {/* Header */}
        <div style={{ borderBottom: '3px solid #1a3a5c', paddingBottom: '12pt', marginBottom: '16pt' }}>
          <p style={{ color: '#1a3a5c', fontSize: '9pt', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '4pt' }}>CASE STUDY</p>
          <h1 style={{ fontSize: '18pt', fontWeight: 700, color: '#1a1a1a', margin: 0, lineHeight: 1.2 }}>
            Commercial HVAC Retrofit Completed 4 Days Early with Zero Tenant Disruption
          </h1>
          <p style={{ color: '#666', fontSize: '10pt', marginTop: '8pt' }}>
            Meridian Office Complex · $487,000 · 6 weeks
          </p>
        </div>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: '16pt', marginBottom: '20pt' }}>
          <div style={{ flex: 1, background: '#f5f5f5', padding: '12pt', textAlign: 'center' }}>
            <p style={{ fontSize: '20pt', fontWeight: 700, color: '#1a3a5c', margin: 0 }}>$487K</p>
            <p style={{ fontSize: '8pt', color: '#666', margin: 0 }}>Project value</p>
          </div>
          <div style={{ flex: 1, background: '#f5f5f5', padding: '12pt', textAlign: 'center' }}>
            <p style={{ fontSize: '20pt', fontWeight: 700, color: '#22c55e', margin: 0 }}>32%</p>
            <p style={{ fontSize: '8pt', color: '#666', margin: 0 }}>Energy savings</p>
          </div>
          <div style={{ flex: 1, background: '#f5f5f5', padding: '12pt', textAlign: 'center' }}>
            <p style={{ fontSize: '20pt', fontWeight: 700, color: '#f59e0b', margin: 0 }}>4 days</p>
            <p style={{ fontSize: '8pt', color: '#666', margin: 0 }}>Ahead of schedule</p>
          </div>
          <div style={{ flex: 1, background: '#f5f5f5', padding: '12pt', textAlign: 'center' }}>
            <p style={{ fontSize: '20pt', fontWeight: 700, color: '#1a1a1a', margin: 0 }}>0</p>
            <p style={{ fontSize: '8pt', color: '#666', margin: 0 }}>Tenant complaints</p>
          </div>
        </div>

        {/* Three columns */}
        <div style={{ display: 'flex', gap: '16pt', marginBottom: '20pt' }}>
          <div style={{ flex: 1 }}>
            <p style={{ color: '#1a3a5c', fontSize: '9pt', fontWeight: 700, letterSpacing: '0.05em', marginBottom: '6pt' }}>THE CHALLENGE</p>
            <p style={{ fontSize: '10pt', margin: 0 }}>
              Aging HVAC system causing temperature swings between floors. Six of twelve floors had filed formal complaints—some offices hitting 78°F while others dropped to 64°F. Three lease renewals coming up in Q4, with tenants citing HVAC issues as leverage. Previous contractor quoted 12 weeks with full-floor shutdowns.
            </p>
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ color: '#1a3a5c', fontSize: '9pt', fontWeight: 700, letterSpacing: '0.05em', marginBottom: '6pt' }}>OUR APPROACH</p>
            <p style={{ fontSize: '10pt', margin: 0 }}>
              Zone-by-zone retrofit during off-hours. Temporary supplemental units maintaining comfort in active zones while work proceeded. Night and weekend installation to minimize disruption to 200+ employees. Weekly progress updates to building management with photo documentation.
            </p>
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ color: '#1a3a5c', fontSize: '9pt', fontWeight: 700, letterSpacing: '0.05em', marginBottom: '6pt' }}>THE RESULTS</p>
            <p style={{ fontSize: '10pt', margin: 0 }}>
              Completed in 38 days—4 days ahead of schedule. Zero formal tenant complaints filed during construction. Building energy costs dropped 32% in the first quarter post-installation. All three at-risk leases renewed without HVAC being raised in negotiations.
            </p>
          </div>
        </div>

        {/* Quote */}
        <div style={{ background: '#f5f5f5', padding: '16pt', borderLeft: '4px solid #1a3a5c', marginBottom: '20pt' }}>
          <p style={{ fontSize: '11pt', fontStyle: 'italic', margin: 0, marginBottom: '8pt' }}>
            "We were skeptical when they said zero disruption. But our tenants didn't even know work was happening until they noticed their utility bills dropped. We've already referred them to two other buildings in our portfolio."
          </p>
          <p style={{ fontSize: '9pt', color: '#666', margin: 0 }}>
            — Mike Chen, Facilities Director, Meridian Office Complex
          </p>
        </div>

        {/* Project details */}
        <div style={{ display: 'flex', gap: '24pt', borderTop: '1px solid #ddd', paddingTop: '12pt' }}>
          <div>
            <p style={{ fontSize: '8pt', color: '#666', margin: 0 }}>PROJECT TYPE</p>
            <p style={{ fontSize: '10pt', fontWeight: 600, margin: 0 }}>Commercial HVAC Retrofit</p>
          </div>
          <div>
            <p style={{ fontSize: '8pt', color: '#666', margin: 0 }}>BUILDING</p>
            <p style={{ fontSize: '10pt', fontWeight: 600, margin: 0 }}>12-story office (occupied)</p>
          </div>
          <div>
            <p style={{ fontSize: '8pt', color: '#666', margin: 0 }}>TIMELINE</p>
            <p style={{ fontSize: '10pt', fontWeight: 600, margin: 0 }}>38 days (4 days early)</p>
          </div>
          <div>
            <p style={{ fontSize: '8pt', color: '#666', margin: 0 }}>REFERENCE</p>
            <p style={{ fontSize: '10pt', fontWeight: 600, margin: 0 }}>Available on request</p>
          </div>
        </div>

        {/* Footer */}
        <div style={{ marginTop: '24pt', paddingTop: '12pt', borderTop: '1px solid #ddd', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontSize: '9pt', color: '#666', margin: 0 }}>
            Generated by Case Study Extractor · leefuhr.com
          </p>
          <p style={{ fontSize: '9pt', color: '#666', margin: 0 }}>
            © 2024 All rights reserved
          </p>
        </div>
      </div>
    </>
  )
}
