'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { extractProjectData, generatePreview, ProjectData } from '@/lib/extraction-engine'

export default function PreviewPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const [data, setData] = useState<ProjectData | null>(null)
  const [preview, setPreview] = useState<ReturnType<typeof generatePreview> | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In production, fetch from API
    // For now, use mock data
    const loadData = async () => {
      const mockFiles: File[] = [] // Would come from upload
      const projectData = await extractProjectData(mockFiles)
      const previewData = generatePreview(projectData)

      setData(projectData)
      setPreview(previewData)
      setLoading(false)
    }

    loadData()
  }, [id])

  const handleUnlock = () => {
    router.push(`/checkout?id=${id}`)
  }

  if (loading || !data || !preview) {
    return (
      <main className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⏳</div>
          <p className="text-body">Loading preview...</p>
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
              Your <span className="text-[var(--accent)]">case study</span> preview
            </h1>
            <div className="bg-[var(--success)]/20 text-[var(--success)] px-4 py-2 text-sm font-bold">
              FREE PREVIEW
            </div>
          </div>
          <p className="text-body text-lg max-w-3xl">
            Here&apos;s what we found in your files. The structure is built. Full formatted case studies unlock for $150.
          </p>
        </div>
      </section>

      {/* Completeness Score */}
      <section className="px-4 md:px-8 lg:px-12 py-12 bg-[var(--muted)]">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-8">
            <div className="flex-shrink-0">
              <div className="w-32 h-32 rounded-full border-4 border-[var(--accent)] flex items-center justify-center">
                <span className="text-display text-4xl text-[var(--accent)]">{preview.completeness}%</span>
              </div>
            </div>
            <div>
              <p className="text-section text-2xl mb-2">Data Completeness Score</p>
              <p className="text-body">
                {preview.completeness >= 80 && "Excellent! We found strong data for a compelling case study."}
                {preview.completeness >= 60 && preview.completeness < 80 && "Good foundation. Case study will be solid with some manual additions."}
                {preview.completeness < 60 && "We found key details, but you may want to add more specifics for maximum impact."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Found */}
      <section className="px-4 md:px-8 lg:px-12 py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-section text-3xl mb-8">What we extracted from your files</h2>

          <div className="space-y-4">
            {/* Project Name */}
            <div className="bg-[var(--muted)] p-6 border-l-4 border-[var(--accent)]">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="text-label mb-2">PROJECT NAME</p>
                  {preview.hasProjectName ? (
                    <p className="text-[var(--foreground)] text-lg font-semibold">{data.projectName}</p>
                  ) : (
                    <p className="text-[var(--muted-foreground)] italic">Not found - add manually</p>
                  )}
                </div>
                <span className={`text-2xl ${preview.hasProjectName ? 'text-[var(--success)]' : 'text-[var(--muted-foreground)]'}`}>
                  {preview.hasProjectName ? '✓' : '○'}
                </span>
              </div>
            </div>

            {/* Client Name */}
            <div className="bg-[var(--muted)] p-6 border-l-4 border-[var(--accent)]">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="text-label mb-2">CLIENT NAME</p>
                  {preview.hasClientName ? (
                    <p className="text-[var(--foreground)] text-lg font-semibold">{data.clientName}</p>
                  ) : (
                    <p className="text-[var(--muted-foreground)] italic">Not found - add manually</p>
                  )}
                </div>
                <span className={`text-2xl ${preview.hasClientName ? 'text-[var(--success)]' : 'text-[var(--muted-foreground)]'}`}>
                  {preview.hasClientName ? '✓' : '○'}
                </span>
              </div>
            </div>

            {/* Project Value */}
            <div className="bg-[var(--muted)] p-6 border-l-4 border-[var(--accent)]">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="text-label mb-2">PROJECT VALUE</p>
                  {preview.hasValue ? (
                    <p className="text-[var(--foreground)] text-lg font-semibold">{data.projectValue}</p>
                  ) : (
                    <p className="text-[var(--muted-foreground)] italic">Not found - add manually</p>
                  )}
                </div>
                <span className={`text-2xl ${preview.hasValue ? 'text-[var(--success)]' : 'text-[var(--muted-foreground)]'}`}>
                  {preview.hasValue ? '✓' : '○'}
                </span>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-[var(--muted)] p-6 border-l-4 border-[var(--accent)]">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="text-label mb-2">TIMELINE</p>
                  {preview.hasTimeline ? (
                    <p className="text-[var(--foreground)] text-lg font-semibold">{data.timeline}</p>
                  ) : (
                    <p className="text-[var(--muted-foreground)] italic">Not found - add manually</p>
                  )}
                </div>
                <span className={`text-2xl ${preview.hasTimeline ? 'text-[var(--success)]' : 'text-[var(--muted-foreground)]'}`}>
                  {preview.hasTimeline ? '✓' : '○'}
                </span>
              </div>
            </div>

            {/* Challenge */}
            <div className="bg-[var(--muted)] p-6 border-l-4 border-[var(--accent)]">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="text-label mb-2">CLIENT CHALLENGE</p>
                  {preview.hasChallenge ? (
                    <p className="text-body">{data.challenge}</p>
                  ) : (
                    <p className="text-[var(--muted-foreground)] italic">Not found - add manually</p>
                  )}
                </div>
                <span className={`text-2xl ${preview.hasChallenge ? 'text-[var(--success)]' : 'text-[var(--muted-foreground)]'}`}>
                  {preview.hasChallenge ? '✓' : '○'}
                </span>
              </div>
            </div>

            {/* Approach */}
            <div className="bg-[var(--muted)] p-6 border-l-4 border-[var(--accent)]">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="text-label mb-2">YOUR APPROACH</p>
                  {preview.hasApproach ? (
                    <p className="text-body">{data.approach}</p>
                  ) : (
                    <p className="text-[var(--muted-foreground)] italic">Not found - add manually</p>
                  )}
                </div>
                <span className={`text-2xl ${preview.hasApproach ? 'text-[var(--success)]' : 'text-[var(--muted-foreground)]'}`}>
                  {preview.hasApproach ? '✓' : '○'}
                </span>
              </div>
            </div>

            {/* Results */}
            <div className="bg-[var(--muted)] p-6 border-l-4 border-[var(--accent)]">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="text-label mb-2">RESULTS ({preview.resultsCount} found)</p>
                  {preview.hasResults ? (
                    <ul className="space-y-2">
                      {data.results?.map((result, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-[var(--accent)]">→</span>
                          <span className="text-body">{result}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-[var(--muted-foreground)] italic">Not found - add manually</p>
                  )}
                </div>
                <span className={`text-2xl ${preview.hasResults ? 'text-[var(--success)]' : 'text-[var(--muted-foreground)]'}`}>
                  {preview.hasResults ? '✓' : '○'}
                </span>
              </div>
            </div>

            {/* Testimonial */}
            <div className="bg-[var(--muted)] p-6 border-l-4 border-[var(--accent)]">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="text-label mb-2">CLIENT TESTIMONIAL</p>
                  {preview.hasTestimonial ? (
                    <p className="text-body italic">&ldquo;{data.testimonial}&rdquo;</p>
                  ) : (
                    <p className="text-[var(--muted-foreground)] italic">Not found - add manually if available</p>
                  )}
                </div>
                <span className={`text-2xl ${preview.hasTestimonial ? 'text-[var(--success)]' : 'text-[var(--muted-foreground)]'}`}>
                  {preview.hasTestimonial ? '✓' : '○'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Unlock CTA */}
      <section className="px-4 md:px-8 lg:px-12 py-16 bg-[var(--accent)]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-display text-4xl md:text-5xl mb-6 text-[var(--accent-foreground)]">
            Unlock the
            <br />
            full package
          </h2>
          <p className="text-[var(--accent-foreground)] text-xl mb-8">
            Get your complete case study in 3 ready-to-use formats for $150
          </p>

          <div className="bg-[var(--background)] p-8 mb-8">
            <p className="text-[var(--foreground)] font-semibold mb-4">You&apos;ll get:</p>
            <ul className="space-y-3 text-left">
              <li className="flex items-start gap-3">
                <span className="text-[var(--accent)] text-lg shrink-0">✓</span>
                <span className="text-body"><strong>One-page PDF</strong> - Print-ready case study for trade shows, emails, leave-behinds</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[var(--accent)] text-lg shrink-0">✓</span>
                <span className="text-body"><strong>Proposal insert</strong> - Copy-paste into RFPs and scopes of work</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[var(--accent)] text-lg shrink-0">✓</span>
                <span className="text-body"><strong>Website copy</strong> - HTML-ready for your portfolio or project gallery</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[var(--accent)] text-lg shrink-0">✓</span>
                <span className="text-body"><strong>Instant download</strong> - All formats available immediately after payment</span>
              </li>
            </ul>
          </div>

          <button
            onClick={handleUnlock}
            className="btn-reversed text-lg mb-4"
          >
            UNLOCK FOR $150 →
          </button>

          <p className="text-[var(--accent-foreground)]/70 text-sm">
            30-day money-back guarantee · Secure payment via Stripe
          </p>
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
