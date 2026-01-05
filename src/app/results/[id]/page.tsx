'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { extractProjectData, generateCaseStudy, formatCaseStudy, ProjectData, CaseStudy, CaseStudyFormats } from '@/lib/extraction-engine'

export default function ResultsPage() {
  const params = useParams()
  const id = params.id as string

  const [data, setData] = useState<ProjectData | null>(null)
  const [caseStudy, setCaseStudy] = useState<CaseStudy | null>(null)
  const [formats, setFormats] = useState<CaseStudyFormats | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeFormat, setActiveFormat] = useState<'onePager' | 'proposalInsert' | 'websiteCopy'>('onePager')

  useEffect(() => {
    const loadData = async () => {
      const mockFiles: File[] = []
      const projectData = await extractProjectData(mockFiles)
      const study = generateCaseStudy(projectData)
      const formattedStudy = formatCaseStudy(study)

      setData(projectData)
      setCaseStudy(study)
      setFormats(formattedStudy)
      setLoading(false)
    }

    loadData()
  }, [id])

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    alert('Copied to clipboard!')
  }

  const handleDownload = (format: 'onePager' | 'proposalInsert' | 'websiteCopy') => {
    if (!formats) return

    const content = formats[format]
    const filename = `case-study-${format}.txt`
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }

  if (loading || !caseStudy || !formats) {
    return (
      <main className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⏳</div>
          <p className="text-body">Loading your case study...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <section className="px-4 md:px-8 lg:px-12 py-12 border-b border-[var(--border)]">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-display text-3xl md:text-5xl">
              Your <span className="text-[var(--accent)]">case study</span> is ready
            </h1>
            <div className="bg-[var(--success)]/20 text-[var(--success)] px-4 py-2 text-sm font-bold">
              PAID
            </div>
          </div>
          <p className="text-body text-lg max-w-3xl">
            All three formats are ready to use. Copy, download, or customize as needed.
          </p>
        </div>
      </section>

      {/* Format Selector */}
      <section className="px-4 md:px-8 lg:px-12 py-8 bg-[var(--muted)]">
        <div className="max-w-5xl mx-auto">
          <div className="flex gap-4 overflow-x-auto pb-2">
            <button
              onClick={() => setActiveFormat('onePager')}
              className={`px-6 py-3 font-semibold whitespace-nowrap ${
                activeFormat === 'onePager'
                  ? 'bg-[var(--accent)] text-[var(--accent-foreground)]'
                  : 'bg-[var(--background)] text-[var(--foreground)] hover:bg-[var(--accent)]/20'
              }`}
            >
              📄 One-Page PDF
            </button>
            <button
              onClick={() => setActiveFormat('proposalInsert')}
              className={`px-6 py-3 font-semibold whitespace-nowrap ${
                activeFormat === 'proposalInsert'
                  ? 'bg-[var(--accent)] text-[var(--accent-foreground)]'
                  : 'bg-[var(--background)] text-[var(--foreground)] hover:bg-[var(--accent)]/20'
              }`}
            >
              📋 Proposal Insert
            </button>
            <button
              onClick={() => setActiveFormat('websiteCopy')}
              className={`px-6 py-3 font-semibold whitespace-nowrap ${
                activeFormat === 'websiteCopy'
                  ? 'bg-[var(--accent)] text-[var(--accent-foreground)]'
                  : 'bg-[var(--background)] text-[var(--foreground)] hover:bg-[var(--accent)]/20'
              }`}
            >
              🌐 Website Copy
            </button>
          </div>
        </div>
      </section>

      {/* Case Study Display */}
      <section className="px-4 md:px-8 lg:px-12 py-16">
        <div className="max-w-5xl mx-auto">
          {/* Action Buttons */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => handleCopy(formats[activeFormat])}
              className="btn-outline"
            >
              Copy to clipboard
            </button>
            <button
              onClick={() => handleDownload(activeFormat)}
              className="btn-kinetic"
            >
              Download
            </button>
          </div>

          {/* Format Description */}
          <div className="bg-[var(--muted)] p-6 mb-8 border-l-4 border-[var(--accent)]">
            {activeFormat === 'onePager' && (
              <>
                <p className="text-[var(--foreground)] font-semibold mb-2">One-Page PDF Format</p>
                <p className="text-body">
                  Print-ready case study with full formatting. Use for trade shows, follow-up emails, or as leave-behinds after meetings. Professional layout showcasing challenge, approach, and results.
                </p>
              </>
            )}
            {activeFormat === 'proposalInsert' && (
              <>
                <p className="text-[var(--foreground)] font-semibold mb-2">Proposal Insert Format</p>
                <p className="text-body">
                  Concise format designed to fit &quot;Relevant Experience&quot; sections in RFPs and proposals. Copy-paste ready. Shows you&apos;ve done similar work before.
                </p>
              </>
            )}
            {activeFormat === 'websiteCopy' && (
              <>
                <p className="text-[var(--foreground)] font-semibold mb-2">Website Copy Format</p>
                <p className="text-body">
                  HTML-ready case study for your website. Structured markup works with any page builder. Drop into your portfolio or project gallery pages.
                </p>
              </>
            )}
          </div>

          {/* Case Study Content */}
          <div className="bg-[var(--background)] border-2 border-[var(--border)] p-8">
            <pre className="text-body whitespace-pre-wrap font-mono text-sm leading-relaxed">
              {formats[activeFormat]}
            </pre>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="px-4 md:px-8 lg:px-12 py-16 bg-[var(--muted)]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-section text-3xl mb-8">Next steps</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[var(--background)] p-6 border-l-4 border-[var(--accent)]">
              <p className="text-[var(--accent)] text-sm font-bold mb-2">1. CUSTOMIZE</p>
              <p className="text-body">
                Review the case study and add any missing details or adjust language to match your brand voice.
              </p>
            </div>

            <div className="bg-[var(--background)] p-6 border-l-4 border-[var(--accent)]">
              <p className="text-[var(--accent)] text-sm font-bold mb-2">2. DEPLOY</p>
              <p className="text-body">
                Add to your website, insert into proposals, print for trade shows. Use everywhere you need social proof.
              </p>
            </div>

            <div className="bg-[var(--background)] p-6 border-l-4 border-[var(--accent)]">
              <p className="text-[var(--accent)] text-sm font-bold mb-2">3. REPEAT</p>
              <p className="text-body">
                Document your next project. Build a library of case studies showing the full range of your capabilities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Create Another */}
      <section className="px-4 md:px-8 lg:px-12 py-16 bg-[var(--accent)]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-display text-4xl mb-4 text-[var(--accent-foreground)]">
            Document another project?
          </h2>
          <p className="text-[var(--accent-foreground)] text-xl mb-8">
            Turn more of your completed work into sales collateral.
          </p>
          <a
            href="/"
            className="btn-reversed text-lg"
          >
            Create another case study →
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 md:px-8 lg:px-12 py-8 border-t border-[var(--border)]">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-label">
            Questions? Email <a href="mailto:hi@leefuhr.com" className="text-[var(--accent)] hover:underline">hi@leefuhr.com</a>
          </p>
        </div>
      </footer>
    </main>
  )
}
