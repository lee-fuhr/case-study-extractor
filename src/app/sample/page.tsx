'use client'

import Link from 'next/link'

export default function SamplePage() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <header className="border-b border-[var(--border)] py-4 px-6">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-section text-lg text-[var(--foreground)]">
            The Case Study Extractor
          </Link>
          <Link href="/" className="btn-kinetic text-sm py-2 px-4">
            Extract YOUR case study
          </Link>
        </div>
      </header>

      {/* Sample banner */}
      <section className="py-6 px-6 bg-[var(--accent)]">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-white text-lg font-semibold mb-2">
            ⚡ FULL SAMPLE EXTRACTION
          </p>
          <p className="text-white/80">
            This is exactly what you get. Real extraction from a commercial HVAC contractor&apos;s project files.
          </p>
        </div>
      </section>

      {/* What was uploaded */}
      <section className="py-8 px-6 border-b border-[var(--border)]">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-label mb-4">FILES UPLOADED FOR THIS EXTRACTION</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 bg-[var(--muted)] p-4">
              <span className="text-2xl">📷</span>
              <div>
                <p className="text-[var(--foreground)] font-semibold text-sm">12 job site photos</p>
                <p className="text-[var(--muted-foreground)] text-xs">Before, during, after shots</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-[var(--muted)] p-4">
              <span className="text-2xl">📄</span>
              <div>
                <p className="text-[var(--foreground)] font-semibold text-sm">Final invoice</p>
                <p className="text-[var(--muted-foreground)] text-xs">$487,000 project value</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-[var(--muted)] p-4">
              <span className="text-2xl">📧</span>
              <div>
                <p className="text-[var(--foreground)] font-semibold text-sm">Client email thread</p>
                <p className="text-[var(--muted-foreground)] text-xs">Thank you + testimonial</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Executive Summary */}
      <section className="py-12 px-6 bg-[var(--muted)]">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-label mb-6">EXTRACTION SUMMARY</h3>
          <div className="bg-[var(--background)] border-2 border-[var(--border)] p-8">
            <h4 className="text-section text-xl text-[#0A0A0A] mb-4">Commercial HVAC Retrofit — Meridian Office Complex</h4>
            <p className="text-[#0A0A0A] text-lg mb-6" style={{fontFamily: 'var(--font-body)'}}>
              From 12 photos, an invoice, and an email thread, we extracted a complete case study with <strong>quantified results, a compelling narrative, and client testimonial</strong>. Ready for your website, proposals, and sales conversations.
            </p>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-[var(--muted)]">
                <p className="text-3xl font-bold text-[var(--accent)] mb-1">$487K</p>
                <p className="text-sm text-[#525252]">Project value</p>
              </div>
              <div className="text-center p-4 bg-[var(--muted)]">
                <p className="text-3xl font-bold text-[var(--success)] mb-1">32%</p>
                <p className="text-sm text-[#525252]">Energy savings</p>
              </div>
              <div className="text-center p-4 bg-[var(--muted)]">
                <p className="text-3xl font-bold text-[var(--warning)] mb-1">4 days</p>
                <p className="text-sm text-[#525252]">Ahead of schedule</p>
              </div>
              <div className="text-center p-4 bg-[var(--muted)]">
                <p className="text-3xl font-bold text-[var(--foreground)] mb-1">3</p>
                <p className="text-sm text-[#525252]">Output formats</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What this is worth */}
      <section className="bg-[var(--accent)] py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-section text-2xl text-white mb-4">
              What this case study is worth
            </h2>
            <p className="text-[5rem] md:text-[7rem] font-display text-white leading-none mb-4">
              $150,000+
            </p>
            <p className="text-white">
              in potential closed deals (one similar project)
            </p>
          </div>

          <div className="bg-black/20 p-6 mt-8">
            <p className="text-label text-white/70 mb-4">Why case studies close deals</p>
            <div className="grid md:grid-cols-3 gap-6 text-white">
              <div>
                <p className="text-3xl font-display">67%</p>
                <p className="text-sm opacity-70">of B2B buyers want case studies</p>
              </div>
              <div>
                <p className="text-3xl font-display">$0</p>
                <p className="text-sm opacity-70">what most contractors have</p>
              </div>
              <div>
                <p className="text-3xl font-display">$150</p>
                <p className="text-sm opacity-70">to create this one</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FORMAT 1: One-Page PDF */}
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="bg-[var(--accent)] text-white px-3 py-1 text-sm font-bold">FORMAT 1</span>
            <h3 className="text-section text-xl">One-Page PDF</h3>
            <span className="text-[var(--muted-foreground)] text-sm">Print it. Email it. Hand it to prospects.</span>
            <Link href="/sample-pdf" className="ml-auto bg-[var(--accent)] text-white px-4 py-2 text-sm font-semibold hover:opacity-90 transition-opacity">
              Download sample PDF →
            </Link>
          </div>

          <div className="bg-white border-2 border-[var(--border)] p-8 shadow-lg">
            {/* PDF Preview */}
            <div className="border-b-2 border-[var(--border)] pb-6 mb-6">
              <p className="text-label text-[var(--accent)] mb-2">CASE STUDY</p>
              <h4 className="text-section text-2xl text-[#0A0A0A] mb-2">Commercial HVAC Retrofit Completed 4 Days Early with Zero Tenant Disruption</h4>
              <p className="text-[#525252] text-sm">Meridian Office Complex • $487,000 • 6 weeks</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div>
                <p className="text-label mb-2">THE CHALLENGE</p>
                <p className="text-[#0A0A0A] text-sm" style={{fontFamily: 'var(--font-body)'}}>
                  Aging HVAC system causing temperature swings between floors. Tenant complaints threatening 3 lease renewals. Previous contractor quoted 12 weeks with full-floor shutdowns.
                </p>
              </div>
              <div>
                <p className="text-label mb-2">OUR APPROACH</p>
                <p className="text-[#0A0A0A] text-sm" style={{fontFamily: 'var(--font-body)'}}>
                  Zone-by-zone retrofit during off-hours. Temporary supplemental units for each zone. Night and weekend installation to minimize disruption. Weekly progress updates to building management.
                </p>
              </div>
              <div>
                <p className="text-label mb-2">THE RESULTS</p>
                <p className="text-[#0A0A0A] text-sm" style={{fontFamily: 'var(--font-body)'}}>
                  Completed in 38 days (4 days early). Zero formal tenant complaints. 32% reduction in energy costs. All three leases renewed.
                </p>
              </div>
            </div>

            <div className="bg-[var(--muted)] p-4 border-l-4 border-[var(--accent)]">
              <p className="text-[#0A0A0A] italic text-sm" style={{fontFamily: 'var(--font-body)'}}>
                &ldquo;We were skeptical when they said zero disruption. But our tenants didn&apos;t even know work was happening until they noticed their utility bills dropped. All three renewals signed.&rdquo;
              </p>
              <p className="text-[#525252] text-sm mt-2">— Mike Chen, Facilities Director, Meridian Office Complex</p>
            </div>
          </div>
        </div>
      </section>

      {/* FORMAT 2: Proposal Insert */}
      <section className="py-12 px-6 bg-[var(--muted)]">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <span className="bg-[var(--accent)] text-white px-3 py-1 text-sm font-bold">FORMAT 2</span>
            <h3 className="text-section text-xl">Proposal Insert</h3>
            <span className="text-[var(--muted-foreground)] text-sm">Copy-paste into your next bid.</span>
          </div>

          <div className="bg-[var(--background)] border-2 border-[var(--border)] p-8">
            <p className="text-label mb-4">RELEVANT EXPERIENCE</p>
            <div className="space-y-4">
              <p className="text-[#0A0A0A]" style={{fontFamily: 'var(--font-body)'}}>
                <strong>Meridian Office Complex HVAC Retrofit</strong> ($487,000, 2024)
              </p>
              <p className="text-[#0A0A0A]" style={{fontFamily: 'var(--font-body)'}}>
                Completed full HVAC system retrofit across 12-floor occupied office building in 38 days. Scope included zone-by-zone replacement during off-hours with zero tenant disruption. Client reported 32% reduction in energy costs post-completion.
              </p>
              <p className="text-[#0A0A0A]" style={{fontFamily: 'var(--font-body)'}}>
                Key parallels to your project: occupied building during construction, aggressive timeline, energy efficiency requirements.
              </p>
              <p className="text-[#525252] text-sm">
                Reference: Mike Chen, Facilities Director • (555) 123-4567 • mchen@meridiancomplex.com
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FORMAT 3: Website Copy */}
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <span className="bg-[var(--accent)] text-white px-3 py-1 text-sm font-bold">FORMAT 3</span>
            <h3 className="text-section text-xl">Website Copy</h3>
            <span className="text-[var(--muted-foreground)] text-sm">HTML-ready for your portfolio page.</span>
          </div>

          <div className="bg-[var(--background)] border-2 border-[var(--border)] p-8">
            <h4 className="text-section text-2xl text-[#0A0A0A] mb-4">How We Saved Three Lease Renewals</h4>

            <p className="text-[#0A0A0A] text-lg mb-4" style={{fontFamily: 'var(--font-body)'}}>
              When the facilities manager at Meridian Office Complex called, he had a problem that was costing him tenants. Six of the building&apos;s twelve floors had filed formal complaints about temperature swings — some offices hitting 78&deg;F while others dropped to 64&deg;F. Three lease renewals were coming up in Q4, and he knew the HVAC issues would be leverage in negotiations.
            </p>

            <p className="text-[#0A0A0A] text-lg mb-4" style={{fontFamily: 'var(--font-body)'}}>
              The challenge wasn&apos;t just the retrofit itself — it was doing it without disrupting 200+ employees across multiple floors. The previous contractor had quoted 12 weeks and required full-floor shutdowns. That timeline would push past the lease renewal conversations.
            </p>

            <p className="text-[#0A0A0A] text-lg mb-4" style={{fontFamily: 'var(--font-body)'}}>
              We proposed a zone-by-zone approach: work one zone at a time during off-hours, with temporary supplemental units maintaining comfort in active zones. The building manager was skeptical — he&apos;d been promised &ldquo;minimal disruption&rdquo; before.
            </p>

            <p className="text-[#0A0A0A] text-lg mb-4" style={{fontFamily: 'var(--font-body)'}}>
              We finished in 38 days — four days ahead of schedule. Zero formal tenant complaints were filed during construction. The building&apos;s energy costs dropped 32% in the first quarter post-installation. All three leases renewed.
            </p>

            <div className="bg-[var(--muted)] p-6 mt-6 border-l-4 border-[var(--accent)]">
              <p className="text-[#0A0A0A] text-lg italic" style={{fontFamily: 'var(--font-body)'}}>
                &ldquo;We were skeptical when they said zero disruption. But our tenants didn&apos;t even know work was happening until they noticed their utility bills dropped. We&apos;ve already referred them to two other buildings in our portfolio.&rdquo;
              </p>
              <p className="text-[#525252] mt-2">— Mike Chen, Facilities Director</p>
            </div>

            <div className="mt-6 grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-[var(--muted)]">
                <p className="text-2xl font-bold text-[var(--accent)]">$487,000</p>
                <p className="text-sm text-[#525252]">Project value</p>
              </div>
              <div className="text-center p-4 bg-[var(--muted)]">
                <p className="text-2xl font-bold text-[var(--success)]">32%</p>
                <p className="text-sm text-[#525252]">Energy cost reduction</p>
              </div>
              <div className="text-center p-4 bg-[var(--muted)]">
                <p className="text-2xl font-bold text-[var(--warning)]">4 days early</p>
                <p className="text-sm text-[#525252]">Completion</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-[var(--accent)]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-display text-4xl text-white mb-4">
            Your projects deserve this too
          </h2>
          <p className="text-white/90 text-xl mb-8">
            Upload photos, invoices, emails — whatever you have. Get all three formats in 5 minutes.
          </p>
          <Link href="/" className="btn-reversed text-lg">
            Upload my project files →
          </Link>
          <p className="text-white/70 text-sm mt-4">
            Free preview · $150 for all three formats
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] py-8 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-[#525252] text-sm" style={{fontFamily: 'var(--font-body)'}}>
            The Case Study Extractor · Built by <a href="https://leefuhr.com" className="text-[var(--accent)] hover:underline">Lee Fuhr</a> · <Link href="/privacy" className="hover:text-[var(--accent)]">Privacy</Link>
          </p>
        </div>
      </footer>
    </main>
  )
}
