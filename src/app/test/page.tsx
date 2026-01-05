'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { extractProjectData, generateCaseStudy, formatCaseStudy } from '@/lib/extraction-engine'

export default function TestPage() {
  const [testId] = useState('test-123')
  const [mockData, setMockData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadMockData = async () => {
      const data = await extractProjectData([])
      const caseStudy = generateCaseStudy(data)
      const formats = formatCaseStudy(caseStudy)

      setMockData({
        extractedData: data,
        caseStudy,
        formats
      })
      setLoading(false)
    }

    loadMockData()
  }, [])

  const setupTestData = () => {
    localStorage.setItem(`upload-${testId}`, JSON.stringify({ files: ['project.pdf', 'photos.zip'] }))
    alert('Test data loaded! You can now test the flow.')
  }

  const setupPaidAccess = () => {
    localStorage.setItem(`paid-${testId}`, 'true')
    alert('Marked as paid! You can now access results directly.')
  }

  const clearAllData = () => {
    localStorage.clear()
    alert('All test data cleared!')
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <p className="text-body">Loading test data...</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <section className="px-4 md:px-8 lg:px-12 py-12 border-b border-[var(--border)]">
        <div className="max-w-6xl mx-auto">
          <p className="text-[var(--accent)] text-sm font-bold mb-2 tracking-wider">CASE STUDY EXTRACTOR</p>
          <h1 className="text-display text-4xl md:text-6xl mb-4">
            QA <span className="text-[var(--accent)]">dashboard</span>
          </h1>
          <p className="text-body text-lg mb-6">
            Test all pages and flows · Port 3002
          </p>
          <Link href="/" className="text-[var(--accent)] hover:underline">
            ← Back to landing page
          </Link>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="px-4 md:px-8 lg:px-12 py-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-section text-2xl mb-6">Quick actions</h2>
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <button onClick={setupTestData} className="btn-kinetic text-center">
              Load test data
            </button>
            <button onClick={setupPaidAccess} className="btn-outline text-center">
              Mark as paid
            </button>
            <button onClick={clearAllData} className="btn-outline text-center">
              Clear all data
            </button>
          </div>
          <div className="bg-[var(--muted)] p-4 border-l-4 border-[var(--accent)]">
            <p className="text-body text-sm">
              <strong className="text-[var(--foreground)]">Test ID:</strong> {testId}
            </p>
          </div>
        </div>
      </section>

      {/* Page Flow */}
      <section className="px-4 md:px-8 lg:px-12 py-12 bg-[var(--muted)]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-section text-2xl mb-6">Page flow</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <Link
              href="/"
              className="bg-[var(--background)] p-6 border-l-4 border-[var(--accent)] hover:bg-[var(--accent)]/10 transition-colors"
            >
              <p className="text-[var(--accent)] text-sm font-bold mb-2">1. HOME</p>
              <p className="text-[var(--foreground)] font-semibold mb-1">Landing page</p>
              <p className="text-body text-sm">Upload project files</p>
            </Link>

            <Link
              href={`/processing?id=${testId}`}
              className="bg-[var(--background)] p-6 border-l-4 border-[var(--accent)] hover:bg-[var(--accent)]/10 transition-colors"
            >
              <p className="text-[var(--accent)] text-sm font-bold mb-2">2. PROCESSING</p>
              <p className="text-[var(--foreground)] font-semibold mb-1">Extraction progress</p>
              <p className="text-body text-sm">Animated progress bar</p>
              <p className="text-[var(--warning)] text-xs mt-2">⚠️ Requires test data</p>
            </Link>

            <Link
              href={`/preview/${testId}`}
              className="bg-[var(--background)] p-6 border-l-4 border-[var(--accent)] hover:bg-[var(--accent)]/10 transition-colors"
            >
              <p className="text-[var(--accent)] text-sm font-bold mb-2">3. PREVIEW</p>
              <p className="text-[var(--foreground)] font-semibold mb-1">Free preview</p>
              <p className="text-body text-sm">Extracted data preview</p>
              <p className="text-[var(--warning)] text-xs mt-2">⚠️ Requires test data</p>
            </Link>

            <Link
              href={`/results/${testId}`}
              className="bg-[var(--background)] p-6 border-l-4 border-[var(--success)] hover:bg-[var(--success)]/10 transition-colors"
            >
              <p className="text-[var(--success)] text-sm font-bold mb-2">4. RESULTS</p>
              <p className="text-[var(--foreground)] font-semibold mb-1">Full package</p>
              <p className="text-body text-sm">All 3 formats</p>
              <p className="text-[var(--danger)] text-xs mt-2">⚠️ Requires paid status</p>
            </Link>
          </div>
        </div>
      </section>

      {/* User Flow Tests */}
      <section className="px-4 md:px-8 lg:px-12 py-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-section text-2xl mb-6">User flow tests</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[var(--muted)] p-6 border-l-4 border-[var(--accent)]">
              <h3 className="text-[var(--foreground)] font-semibold mb-4">Complete purchase flow</h3>
              <ol className="space-y-2 text-body text-sm mb-4">
                <li>1. Go to landing page and upload project files</li>
                <li>2. Submit to trigger extraction animation</li>
                <li>3. View free preview with extracted data</li>
                <li>4. Click through to checkout</li>
                <li>5. Complete payment (any values work)</li>
                <li>6. View full results with all 3 formats</li>
              </ol>
              <Link href="/" className="btn-kinetic inline-block">
                Start flow →
              </Link>
            </div>

            <div className="bg-[var(--muted)] p-6 border-l-4 border-[var(--accent)]">
              <h3 className="text-[var(--foreground)] font-semibold mb-4">Direct results access (paid)</h3>
              <ol className="space-y-2 text-body text-sm mb-4">
                <li>1. Click "Load test data" above</li>
                <li>2. Click "Mark as paid"</li>
                <li>3. Go directly to results page</li>
                <li>4. Should see all 3 formats without checkout</li>
              </ol>
              <div className="flex gap-3">
                <button onClick={() => { setupTestData(); setupPaidAccess(); }} className="btn-outline">
                  Setup paid access
                </button>
                <Link href={`/results/${testId}`} className="btn-kinetic">
                  Go to results →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mock Data Preview */}
      <section className="px-4 md:px-8 lg:px-12 py-12 bg-[var(--muted)]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-section text-2xl mb-6">Mock extracted data</h2>
          <div className="bg-[var(--background)] p-6 border-2 border-[var(--border)] max-h-64 overflow-y-auto">
            <pre className="text-body text-sm overflow-x-auto">
              {JSON.stringify(mockData?.extractedData, null, 2)}
            </pre>
          </div>
        </div>
      </section>

      {/* Output Formats */}
      <section className="px-4 md:px-8 lg:px-12 py-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-section text-2xl mb-6">Output format previews</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-[var(--muted)] p-6 border-l-4 border-[var(--accent)]">
              <h3 className="text-[var(--foreground)] font-semibold mb-2">One-page PDF</h3>
              <p className="text-body text-sm mb-4">Print-ready case study</p>
              <div className="bg-[var(--background)] p-4 max-h-32 overflow-y-auto">
                <pre className="text-body text-xs whitespace-pre-wrap">
                  {mockData?.formats?.onePager?.substring(0, 200)}...
                </pre>
              </div>
            </div>

            <div className="bg-[var(--muted)] p-6 border-l-4 border-[var(--accent)]">
              <h3 className="text-[var(--foreground)] font-semibold mb-2">Proposal insert</h3>
              <p className="text-body text-sm mb-4">Copy-paste ready</p>
              <div className="bg-[var(--background)] p-4 max-h-32 overflow-y-auto">
                <pre className="text-body text-xs whitespace-pre-wrap">
                  {mockData?.formats?.proposalInsert?.substring(0, 200)}...
                </pre>
              </div>
            </div>

            <div className="bg-[var(--muted)] p-6 border-l-4 border-[var(--accent)]">
              <h3 className="text-[var(--foreground)] font-semibold mb-2">Website copy</h3>
              <p className="text-body text-sm mb-4">HTML-ready</p>
              <div className="bg-[var(--background)] p-4 max-h-32 overflow-y-auto">
                <pre className="text-body text-xs whitespace-pre-wrap">
                  {mockData?.formats?.websiteCopy?.substring(0, 200)}...
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QA Checklist */}
      <section className="px-4 md:px-8 lg:px-12 py-12 bg-[var(--muted)]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-section text-2xl mb-6">QA checklist</h2>
          <div className="bg-[var(--background)] p-6 border-2 border-[var(--border)]">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2 text-body text-sm">
                <label className="flex items-center gap-3 cursor-pointer hover:text-[var(--accent)]">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Landing page loads with file upload</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer hover:text-[var(--accent)]">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>File upload accepts images, PDFs, docs</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer hover:text-[var(--accent)]">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Processing shows extraction steps</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer hover:text-[var(--accent)]">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Preview shows extracted data</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer hover:text-[var(--accent)]">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Full content locked/blurred</span>
                </label>
              </div>
              <div className="space-y-2 text-body text-sm">
                <label className="flex items-center gap-3 cursor-pointer hover:text-[var(--accent)]">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Checkout form validates</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer hover:text-[var(--accent)]">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Results show all 3 formats</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer hover:text-[var(--accent)]">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Copy buttons work for each format</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer hover:text-[var(--accent)]">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Mobile responsive on all pages</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer hover:text-[var(--accent)]">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Dark theme consistent across pages</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Known Limitations */}
      <section className="px-4 md:px-8 lg:px-12 py-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-section text-2xl mb-6">Known limitations (demo mode)</h2>
          <div className="bg-[var(--warning)]/10 border-2 border-[var(--warning)]/30 p-6">
            <ul className="list-disc list-inside space-y-2 text-body text-sm">
              <li>File extraction uses mock data (no Claude API in demo)</li>
              <li>Payment processing is simulated</li>
              <li>Data stored in localStorage (not persistent)</li>
              <li>Image analysis not implemented</li>
              <li>PDF generation not implemented</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 md:px-8 lg:px-12 py-8 border-t border-[var(--border)]">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-label">Case Study Extractor v1.0 · Port 3002</p>
        </div>
      </footer>
    </main>
  )
}
