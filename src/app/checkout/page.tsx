'use client'

import { Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useState } from 'react'

function CheckoutContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const id = searchParams.get('id')

  const [processing, setProcessing] = useState(false)

  const handlePayment = async () => {
    setProcessing(true)

    // In production, integrate with Stripe
    // For now, simulate payment and redirect to results
    await new Promise(resolve => setTimeout(resolve, 2000))

    router.push(`/results/${id}`)
  }

  return (
    <main className="min-h-screen bg-[var(--background)]">
      <section className="px-4 md:px-8 lg:px-12 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-display text-4xl md:text-6xl mb-8 text-center">
            Unlock your
            <br />
            <span className="text-[var(--accent)]">case study</span>
          </h1>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* What You're Getting */}
            <div className="bg-[var(--muted)] p-8 border-l-4 border-[var(--accent)]">
              <p className="text-[var(--foreground)] font-semibold mb-4">You&apos;re getting:</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-[var(--accent)] text-lg shrink-0">✓</span>
                  <span className="text-body">One-page PDF (print ready)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--accent)] text-lg shrink-0">✓</span>
                  <span className="text-body">Proposal insert (copy-paste)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--accent)] text-lg shrink-0">✓</span>
                  <span className="text-body">Website copy (HTML ready)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--accent)] text-lg shrink-0">✓</span>
                  <span className="text-body">Instant download</span>
                </li>
              </ul>
            </div>

            {/* Pricing */}
            <div className="bg-[var(--accent)] p-8">
              <p className="text-[var(--accent-foreground)] font-semibold mb-2">One-time payment</p>
              <p className="text-display text-5xl text-[var(--accent-foreground)] mb-4">$150</p>
              <p className="text-[var(--accent-foreground)]/70 text-sm mb-6">
                All 3 formats · Instant access · No subscription
              </p>
              <div className="bg-[var(--background)] p-4 mb-6">
                <p className="text-[var(--foreground)] font-semibold mb-2">30-Day Money-Back Guarantee</p>
                <p className="text-body text-sm">
                  Not happy? Email us within 30 days for a full refund. No questions asked.
                </p>
              </div>
            </div>
          </div>

          {/* Payment Form (Mock) */}
          <div className="bg-[var(--muted)] p-8 border-2 border-[var(--border)]">
            <p className="text-label mb-6">SECURE PAYMENT</p>

            <div className="space-y-4 mb-6">
              <div>
                <label className="text-body text-sm block mb-2">Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full bg-[var(--background)] border border-[var(--border)] px-4 py-3 text-[var(--foreground)] focus:outline-none focus:border-[var(--accent)]"
                />
              </div>

              <div>
                <label className="text-body text-sm block mb-2">Card Information</label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="w-full bg-[var(--background)] border border-[var(--border)] px-4 py-3 text-[var(--foreground)] focus:outline-none focus:border-[var(--accent)] mb-2"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="MM / YY"
                    className="bg-[var(--background)] border border-[var(--border)] px-4 py-3 text-[var(--foreground)] focus:outline-none focus:border-[var(--accent)]"
                  />
                  <input
                    type="text"
                    placeholder="CVC"
                    className="bg-[var(--background)] border border-[var(--border)] px-4 py-3 text-[var(--foreground)] focus:outline-none focus:border-[var(--accent)]"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={handlePayment}
              disabled={processing}
              className="btn-kinetic w-full text-lg mb-4"
            >
              {processing ? 'Processing...' : 'PAY $150 →'}
            </button>

            <p className="text-center text-[var(--muted-foreground)] text-xs">
              🔒 Secure payment via Stripe · SSL encrypted
            </p>
          </div>

          <p className="text-center text-body text-sm mt-8">
            Questions? Email <a href="mailto:hi@leefuhr.com" className="text-[var(--accent)] hover:underline">hi@leefuhr.com</a>
          </p>
        </div>
      </section>
    </main>
  )
}

function LoadingFallback() {
  return (
    <main className="min-h-screen bg-[var(--background)] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-display text-4xl mb-4">Loading checkout...</h1>
      </div>
    </main>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <CheckoutContent />
    </Suspense>
  )
}
