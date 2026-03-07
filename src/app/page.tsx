'use client'

import { useState, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function HomePage() {
  const [files, setFiles] = useState<File[]>([])
  const [dragOver, setDragOver] = useState(false)
  const [error, setError] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const validateFile = (f: File): string | null => {
    const validTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
      'image/jpeg',
      'image/png',
      'image/heic',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ]
    const maxSize = 10 * 1024 * 1024 // 10MB per file

    if (!validTypes.includes(f.type) && !f.name.match(/\.(jpg|jpeg|png|heic|pdf|doc|docx|xls|xlsx|txt)$/i)) {
      return `${f.name}: File type not supported. Upload photos, PDFs, Word docs, Excel, or text.`
    }

    if (f.size > maxSize) {
      return `${f.name}: File too large (max 10MB per file)`
    }

    return null
  }

  const handleFiles = useCallback((newFiles: FileList | File[]) => {
    const fileArray = Array.from(newFiles)

    // Validate all files
    for (const file of fileArray) {
      const validationError = validateFile(file)
      if (validationError) {
        setError(validationError)
        return
      }
    }

    setError('')
    setFiles(prev => [...prev, ...fileArray])
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)

    if (e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files)
    }
  }, [handleFiles])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
  }, [])

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files)
    }
  }, [handleFiles])

  const handleProceed = async () => {
    if (files.length === 0) return

    setIsUploading(true)
    setError('')

    try {
      const formData = new FormData()
      files.forEach(file => {
        formData.append('files', file)
      })

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (result.success) {
        if (typeof window !== 'undefined' && window.plausible) {
          window.plausible('Upload Started')
        }
        router.push(`/processing?id=${result.uploadId}`)
      } else {
        setError(result.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsUploading(false)
    }
  }

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <main className="min-h-screen bg-[var(--background)]">
      {/* Hero */}
      <section className="min-h-[85vh] flex flex-col justify-center px-4 md:px-8 lg:px-12 py-12">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Headline - VBF */}
            <div>
              <p className="text-label mb-4">CASE STUDY EXTRACTOR</p>
              <h1 className="text-display text-[clamp(2.25rem,6vw,5rem)] mb-6">
                Stop losing
                <br />
                deals to
                <br />
                <span className="text-[var(--accent)]">better</span>
                <br />
                <span className="text-[var(--accent)]">storytellers</span>
              </h1>
              <p className="text-body text-xl md:text-2xl max-w-xl mb-6">
                You&apos;ve done incredible work. Your phone is full of project photos. But when a prospect asks &ldquo;show me your work,&rdquo; you scramble — while your competitor hands over a polished one-pager and <strong>closes the deal.</strong>
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-[var(--muted-foreground)]">
                <span>5 minutes</span>
                <span>·</span>
                <span>3 formats</span>
                <span>·</span>
                <span>Free preview</span>
              </div>
            </div>

            {/* Right: Upload box */}
            <div>
              <div className="bg-[var(--accent)] p-8 md:p-10">
                {files.length === 0 ? (
                  <>
                    <div
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onClick={() => fileInputRef.current?.click()}
                      className={`upload-zone ${dragOver ? 'drag-over' : ''}`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 mb-4 text-[var(--accent-foreground)]">
                        <path d="m16 16-4-4-4 4" strokeWidth="1.5"/>
                        <path d="m12 12 0 9" strokeWidth="1.5"/>
                        <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" strokeWidth="1.5"/>
                      </svg>
                      <p className="text-[var(--accent-foreground)] text-lg font-semibold mb-2">
                        Drop your project files here
                      </p>
                      <p className="text-white/80 text-sm">
                        Photos, invoices, PDFs, emails, notes
                      </p>
                      <p className="text-white/80 text-sm mt-2">
                        Upload multiple files
                      </p>
                      <button className="mt-4 text-[var(--accent-foreground)] underline text-sm">
                        or browse files
                      </button>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.heic,.xls,.xlsx"
                      onChange={handleFileInput}
                      className="hidden"
                    />
                  </>
                ) : (
                  <div className="space-y-6">
                    <div className="bg-[var(--background)] p-4 max-h-64 overflow-y-auto">
                      <div className="space-y-2">
                        {files.map((file, index) => (
                          <div key={index} className="flex items-center gap-3 py-2">
                            <span className="text-2xl">
                              {file.type.startsWith('image/') ? '📷' : file.name.endsWith('.pdf') ? '📄' : file.name.match(/\.(xls|xlsx)$/i) ? '📊' : '📝'}
                            </span>
                            <div className="flex-1 min-w-0">
                              <p className="text-[var(--foreground)] font-semibold truncate text-sm">
                                {file.name}
                              </p>
                              <p className="text-[var(--muted-foreground)] text-xs">
                                {(file.size / 1024).toFixed(0)} KB
                              </p>
                            </div>
                            <button
                              onClick={() => removeFile(index)}
                              className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] text-sm shrink-0"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="mt-3 text-[var(--accent)] text-sm underline"
                      >
                        + Add more files
                      </button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.heic,.xls,.xlsx"
                        onChange={handleFileInput}
                        className="hidden"
                      />
                    </div>

                    <button
                      onClick={handleProceed}
                      disabled={isUploading}
                      className="btn-reversed w-full text-lg"
                    >
                      {isUploading ? 'Uploading...' : 'Build my case study →'}
                    </button>

                    <p className="text-white/80 text-xs text-center">
                      Get sales collateral from your existing project materials.
                    </p>
                  </div>
                )}

                {error && (
                  <p className="text-red-200 text-sm mt-4 p-3 bg-red-500/20 border border-red-400/30">
                    {error}
                  </p>
                )}

              </div>

              {/* Sample CTA - prominent secondary action */}
              <div className="mt-4 text-center">
                <Link href="/sample" className="btn-outline w-full text-base">
                  Or see a full sample extraction first →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem strip */}
      <section className="bg-[var(--accent)] py-6">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
            <span className="text-section text-base md:text-lg text-white">Amazing work</span>
            <span className="text-white">→</span>
            <span className="text-section text-base md:text-lg text-white">Zero documentation</span>
            <span className="text-white">→</span>
            <span className="text-section text-base md:text-lg text-white">Can&apos;t prove value</span>
            <span className="text-white">→</span>
            <span className="text-section text-base md:text-lg text-white">Lose deals</span>
            <span className="text-white text-xl">⚠</span>
          </div>
        </div>
      </section>

      {/* The problem */}
      <section className="px-4 md:px-8 lg:px-12 py-20 md:py-28">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <p className="text-label mb-4">THE PROBLEM</p>
              <h2 className="text-section text-4xl md:text-5xl lg:text-6xl mb-8">
                You&apos;ve built
                <br />
                incredible work.
                <br />
                <span className="text-[var(--foreground)]">But you can&apos;t prove it.</span>
              </h2>
              <p className="text-body text-xl md:text-2xl mb-6">
                Your phone is full of project photos. Your files have invoices showing real money. Maybe a happy email from the client. But when a prospect asks &quot;Show me your work,&quot; you scramble.
              </p>
              <p className="text-body text-xl md:text-2xl">
                Meanwhile your competitor has polished case studies. You both did great work. They close the deal.
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-[var(--muted)] p-6 border-l-4 border-[var(--danger)]">
                <p className="text-[var(--foreground)] font-semibold mb-2">What you have:</p>
                <p className="text-body">147 photos on your phone, a folder of invoices, a text message that said &quot;looks great thanks&quot;</p>
              </div>
              <div className="bg-[var(--muted)] p-6 border-l-4 border-[var(--success)]">
                <p className="text-[var(--foreground)] font-semibold mb-2">What you need:</p>
                <p className="text-body">A clean one-pager showing the challenge, your approach, and quantified results that make prospects think &quot;I need that&quot;</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="px-4 md:px-8 lg:px-12 py-20 md:py-28 bg-[var(--muted)]">
        <div className="max-w-6xl mx-auto">
          <p className="text-label mb-4">WHAT YOU GET FOR $147</p>
          <h2 className="text-section text-4xl md:text-5xl lg:text-6xl mb-12">
            Three formats.
            <br />
            <span className="text-[var(--foreground)]">Ready to use today.</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[var(--background)] p-6 border-l-4 border-[var(--accent)]">
              <p className="text-[var(--accent)] text-sm font-bold mb-2">FORMAT 1</p>
              <p className="text-section text-xl mb-3">One-page PDF</p>
              <p className="text-body mb-4">Print it. Email it. Hand it to prospects. Challenge → Approach → Results → Client quote. Professional layout, your brand.</p>
              <p className="text-label">USE FOR: Trade shows, follow-up emails, leave-behinds</p>
            </div>

            <div className="bg-[var(--background)] p-6 border-l-4 border-[var(--accent)]">
              <p className="text-[var(--accent)] text-sm font-bold mb-2">FORMAT 2</p>
              <p className="text-section text-xl mb-3">Proposal insert</p>
              <p className="text-body mb-4">Copy-paste into your next proposal. Concise format that fits &quot;Relevant Experience&quot; sections. Shows you&apos;ve done this before.</p>
              <p className="text-label">USE FOR: RFPs, proposals, scopes of work</p>
            </div>

            <div className="bg-[var(--background)] p-6 border-l-4 border-[var(--accent)]">
              <p className="text-[var(--accent)] text-sm font-bold mb-2">FORMAT 3</p>
              <p className="text-section text-xl mb-3">Website copy</p>
              <p className="text-body mb-4">HTML-ready case study for your website. Structured data, clean formatting. Drop it into any page builder or hand to your web person.</p>
              <p className="text-label">USE FOR: Portfolio pages, project galleries</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-4 md:px-8 lg:px-12 py-20 md:py-28">
        <div className="max-w-6xl mx-auto">
          <p className="text-label mb-4 text-center flex items-center justify-center gap-2">
            HOW IT WORKS
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" className="w-4 h-4" stroke="currentColor" strokeWidth="1">
              <circle cx="8" cy="8" r="2.5"/>
              <path d="M9.796 1.343c-0.527-1.79-3.065-1.79-3.592 0l-0.094 0.319a0.873 0.873 0 0 1-1.255 0.52l-0.292-0.16c-1.64-0.892-3.433 0.902-2.54 2.541l0.159 0.292a0.873 0.873 0 0 1-0.52 1.255l-0.319 0.094c-1.79 0.527-1.79 3.065 0 3.592l0.319 0.094a0.873 0.873 0 0 1 0.52 1.255l-0.16 0.292c-0.892 1.64 0.901 3.434 2.541 2.54l0.292-0.159a0.873 0.873 0 0 1 1.255 0.52l0.094 0.319c0.527 1.79 3.065 1.79 3.592 0l0.094-0.319a0.873 0.873 0 0 1 1.255-0.52l0.292 0.16c1.64 0.893 3.434-0.902 2.54-2.541l-0.159-0.292a0.873 0.873 0 0 1 0.52-1.255l0.319-0.094c1.79-0.527 1.79-3.065 0-3.592l-0.319-0.094a0.873 0.873 0 0 1-0.52-1.255l0.16-0.292c0.893-1.64-0.902-3.433-2.541-2.54l-0.292 0.159a0.873 0.873 0 0 1-1.255-0.52z"/>
            </svg>
          </p>
          <h2 className="text-section text-4xl md:text-5xl mb-16 text-center">
            Upload the mess. <span className="text-[var(--muted-foreground)]">Get sales ammo.</span>
          </h2>

          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="text-6xl mb-4">📦</div>
              <p className="text-section text-lg mb-2">1. Upload</p>
              <p className="text-body text-sm">Photos, invoices, emails, notes. Whatever you have.</p>
            </div>

            <div className="text-center">
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-section text-lg mb-2">2. Extract</p>
              <p className="text-body text-sm">AI finds project details, scope, value, timeline, outcomes.</p>
            </div>

            <div className="text-center">
              <div className="text-6xl mb-4">✨</div>
              <p className="text-section text-lg mb-2">3. Preview</p>
              <p className="text-body text-sm">See full extraction free. Data + narrative preview.</p>
            </div>

            <div className="text-center">
              <div className="text-6xl mb-4">🎯</div>
              <p className="text-section text-lg mb-2">4. Download</p>
              <p className="text-body text-sm">$147 unlocks PDF, proposal insert, website copy.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Free vs Paid */}
      <section className="px-4 md:px-8 lg:px-12 py-20 md:py-28 bg-[var(--muted)]">
        <div className="max-w-6xl mx-auto">
          <p className="text-label mb-4 text-center">HOW IT WORKS</p>
          <h2 className="text-section text-4xl md:text-5xl mb-6 text-center">
            Preview free. <span className="text-[var(--muted-foreground)]">Full case study $147.</span>
          </h2>
          <p className="text-body text-lg text-[var(--muted-foreground)] text-center mb-16 max-w-2xl mx-auto">
            The free preview shows you everything we found in your files. The full case study is what marketing agencies charge $1,500+ to write.
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Preview */}
            <div className="border-2 border-[var(--success)] p-8 bg-[var(--background)] relative">
              <div className="absolute -top-3 right-8 bg-[var(--success)] text-[var(--background)] px-3 py-1 text-xs font-bold">
                NO CREDIT CARD
              </div>
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-[var(--success)]/20 text-[var(--success)] px-3 py-1 text-sm font-bold">FREE</span>
                <span className="text-section text-xl">Preview</span>
              </div>
              <p className="text-body text-sm text-[var(--muted-foreground)] mb-6">See exactly what story we&apos;ll tell before you pay anything.</p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-[var(--success)] text-lg shrink-0">✓</span>
                  <span className="text-body"><strong>Complete extraction</strong> — all data found</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--success)] text-lg shrink-0">✓</span>
                  <span className="text-body"><strong>Data structure</strong> — see what we captured</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--success)] text-lg shrink-0">✓</span>
                  <span className="text-body"><strong>Narrative preview</strong> — opening paragraphs</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--success)] text-lg shrink-0">✓</span>
                  <span className="text-body"><strong>Key metrics</strong> — quantified results</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--muted-foreground)] text-lg shrink-0">—</span>
                  <span className="text-[var(--muted-foreground)]">Downloadable formats locked</span>
                </li>
              </ul>
            </div>

            {/* Full Case Study */}
            <div className="border-2 border-[var(--accent)] p-8 bg-[var(--background)] relative">
              <div className="absolute -top-3 right-8 bg-[var(--accent)] text-[var(--accent-foreground)] px-3 py-1 text-xs font-bold">
                COMPLETE
              </div>
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-[var(--accent)] text-[var(--accent-foreground)] px-3 py-1 text-sm font-bold">$147</span>
                <span className="text-section text-xl">Full case study</span>
              </div>
              <p className="text-body text-sm text-[var(--muted-foreground)] mb-6">One closed deal = pays for 50+ case studies</p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-[var(--accent)] text-lg shrink-0">✓</span>
                  <span className="text-body">Everything in free preview</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--accent)] text-lg shrink-0">✓</span>
                  <span className="text-body"><strong>One-page PDF</strong> — print ready</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--accent)] text-lg shrink-0">✓</span>
                  <span className="text-body"><strong>Proposal insert</strong> — copy-paste ready</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--accent)] text-lg shrink-0">✓</span>
                  <span className="text-body"><strong>Website copy</strong> — HTML ready</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--accent)] text-lg shrink-0">✓</span>
                  <span className="text-body"><strong>One free revision</strong></span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pro tip */}
      <section className="px-4 md:px-8 lg:px-12 py-16 bg-[var(--background)]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-label mb-4 flex items-center justify-center gap-2">
            PRO TIP
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="16" x2="12" y2="12"/>
              <line x1="12" y1="8" x2="12.01" y2="8"/>
            </svg>
          </p>
          <h2 className="text-section text-3xl md:text-4xl mb-6">
            Start with your best project.
          </h2>
          <p className="text-body text-xl">
            Pick the one where the client was happiest, the results were clearest, or you solved a genuinely hard problem. That first case study becomes your template — and your confidence builder for the next one.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 md:px-8 lg:px-12 py-20 md:py-28 bg-[var(--muted)]">
        <div className="max-w-3xl mx-auto">
          <p className="text-label mb-4 text-center">FREQUENTLY ASKED</p>
          <h2 className="text-section text-3xl md:text-4xl mb-12 text-center">Common questions</h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-section text-xl mb-3">What files can I upload?</h3>
              <p className="text-body text-lg">
                Photos, invoices, contracts, emails, notes, PDFs — anything related to the project. The more context you provide, the better the case study. We extract the narrative from whatever you have.
              </p>
            </div>

            <div>
              <h3 className="text-section text-xl mb-3">What if I don&apos;t have client permission to use their name?</h3>
              <p className="text-body text-lg">
                No problem. We can create anonymized case studies — &ldquo;a 200-unit multifamily development in Denver&rdquo; instead of the client name. Many of our best case studies work this way.
              </p>
            </div>

            <div>
              <h3 className="text-section text-xl mb-3">Do I get a one-pager or a novel?</h3>
              <p className="text-body text-lg">
                One page, front and back. The purchasing manager comparing three contractors isn&apos;t reading your 10-page capabilities deck. She&apos;s scanning for numbers and proof. We give her exactly that — enough to tell the story, short enough to finish before her next meeting.
              </p>
            </div>

            <div>
              <h3 className="text-section text-xl mb-3">What makes a case study actually work?</h3>
              <p className="text-body text-lg">
                Specificity. &ldquo;200-unit building, 6-week timeline, $40K under budget&rdquo; — that&apos;s the whole story. You don&apos;t need drama. You need a problem worth solving, numbers that prove you solved it, and an outcome your reader wants for themselves. We extract those three things from whatever you give us.
              </p>
            </div>

            <div>
              <h3 className="text-section text-xl mb-3">What if I only have photos and an invoice?</h3>
              <p className="text-body text-lg">
                Perfect. Photos show scope and quality better than any description. Invoices prove the numbers. From a dozen job photos and a final invoice, we can build project type, scale, timeline, and outcome. More context helps, but you&apos;d be surprised what we can extract from &ldquo;not much.&rdquo;
              </p>
            </div>

            <div>
              <h3 className="text-section text-xl mb-3">What if the case study doesn&apos;t sound like me?</h3>
              <p className="text-body text-lg">
                Tell us what&apos;s off. We include one free revision to match your voice. If we still can&apos;t get it right, you get a full refund.
              </p>
            </div>

            <div>
              <h3 className="text-section text-xl mb-3">I&apos;ve done hundreds of projects. How do I pick which ones to turn into case studies?</h3>
              <p className="text-body text-lg">
                Pick the ones where something went wrong and you fixed it. Or where the timeline was impossible and you hit it anyway. Or where your solution saved real money. The best case studies aren&apos;t your biggest projects — they&apos;re the ones where you can point to a specific problem and a specific outcome. &ldquo;We built a building&rdquo; isn&apos;t a story. &ldquo;We found hidden asbestos on day 3 and still delivered on schedule&rdquo; is.
              </p>
            </div>

            <div>
              <h3 className="text-section text-xl mb-3">Do you keep my files?</h3>
              <p className="text-body text-lg">
                No. Files are analyzed and deleted immediately after processing. We don&apos;t store your project materials, client information, or any uploaded content.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who this is for */}
      <section className="px-4 md:px-8 lg:px-12 py-20 md:py-28">
        <div className="max-w-6xl mx-auto">
          <p className="text-label mb-4 text-center">THIS IS FOR YOU IF</p>
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="flex items-start gap-3">
              <span className="text-[var(--success)] text-xl shrink-0">✓</span>
              <p className="text-body text-lg">You&apos;ve completed projects worth talking about but never documented them</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-[var(--success)] text-xl shrink-0">✓</span>
              <p className="text-body text-lg">You have project materials (photos, invoices, emails) but no case studies</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-[var(--success)] text-xl shrink-0">✓</span>
              <p className="text-body text-lg">Prospects ask &quot;show me your work&quot; and you scramble to respond</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-[var(--success)] text-xl shrink-0">✓</span>
              <p className="text-body text-lg">You need sales collateral today, not a 2-week writing project</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-[var(--success)] text-xl shrink-0">✓</span>
              <p className="text-body text-lg">You&apos;re a contractor, manufacturer, consultant, or service provider with tangible results</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-6 bg-[var(--accent)]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-display text-4xl mb-4 text-[var(--accent-foreground)]">
            Stop losing deals to better storytelling
          </h2>
          <p className="text-[var(--accent-foreground)] text-xl mb-8">
            Upload your project files. Preview free. Full case study $147.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="btn-reversed text-lg"
          >
            See what we extract →
          </button>
          <p className="text-white/80 text-sm mt-4">
            No credit card required · Files deleted after processing
          </p>
        </div>
      </section>

      {/* Footer lockup: Credibility + More tools + Footer */}
      <section className="px-4 md:px-8 lg:px-12 py-12 bg-[var(--muted)] border-t-2 border-[var(--border)]">
        <div className="max-w-6xl mx-auto">
          {/* Credibility */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
            <div className="max-w-2xl">
              <p className="text-body text-lg md:text-xl">
                Built by <a href="https://leefuhr.com" className="text-[var(--accent)] underline hover:no-underline">Lee Fuhr</a>. Every contractor has the same problem: incredible work trapped on their phone, never making it to sales collateral. Your website shows stock photos while your competitor hands over a polished one-pager. This tool closes that gap.
              </p>
            </div>
            <Link href="/sample" className="btn-outline min-h-[44px] shrink-0">
              See a sample extraction
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* More tools */}
          <p className="text-label mb-6 text-center">MORE TOOLS FOR MANUFACTURERS</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <a href="https://areyougeneric.com" className="bg-[var(--background)] p-5 border border-[var(--border)] hover:border-[var(--accent)] transition-colors">
              <p className="text-label text-xs mb-1">FREE</p>
              <p className="text-section text-base mb-1">Commodity Test</p>
              <p className="text-body text-xs text-[var(--muted-foreground)]">Score your website messaging in 2 minutes. Free.</p>
            </a>
            <a href="https://websiteaudit.leefuhr.com" className="bg-[var(--background)] p-5 border border-[var(--border)] hover:border-[var(--accent)] transition-colors">
              <p className="text-label text-xs mb-1 text-[var(--accent)]">$400</p>
              <p className="text-section text-base mb-1">Website Audit</p>
              <p className="text-body text-xs text-[var(--muted-foreground)]">Full messaging audit — every page, prioritized fix list. 48 hours.</p>
            </a>
            <a href="https://proposal-analyzer.vercel.app" className="bg-[var(--background)] p-5 border border-[var(--border)] hover:border-[var(--accent)] transition-colors">
              <p className="text-label text-xs mb-1 text-[var(--accent)]">$97</p>
              <p className="text-section text-base mb-1">Proposal Analyzer</p>
              <p className="text-body text-xs text-[var(--muted-foreground)]">Spot commodity language in your proposals before the deadline. Get copy-paste fixes.</p>
            </a>
            <a href="https://risk-translator.vercel.app" className="bg-[var(--background)] p-5 border border-[var(--border)] hover:border-[var(--accent)] transition-colors">
              <p className="text-label text-xs mb-1 text-[var(--accent)]">$97</p>
              <p className="text-section text-base mb-1">Risk Translator</p>
              <p className="text-body text-xs text-[var(--muted-foreground)]">Translate specs into cost-of-failure language that wins budget approval.</p>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 md:px-8 lg:px-12 py-8 bg-[var(--muted)]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-label">
            <a href="https://leefuhr.com" className="text-[var(--accent)] hover:underline">Lee Fuhr Inc</a> © 2025
          </p>

          <nav className="flex gap-8">
            <Link href="/sample" className="text-body text-sm hover:text-[var(--accent)] transition-colors">
              See sample
            </Link>
            <Link href="/privacy" className="text-body text-sm hover:text-[var(--accent)] transition-colors">
              Privacy
            </Link>
          </nav>
        </div>
      </footer>
    </main>
  )
}
