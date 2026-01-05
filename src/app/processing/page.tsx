'use client'

import { Suspense, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

function ProcessingContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const uploadId = searchParams.get('id')

  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState('Extracting project data...')

  useEffect(() => {
    if (!uploadId) {
      router.push('/')
      return
    }

    // Simulate processing with realistic steps
    const steps = [
      { progress: 15, status: 'Reading uploaded files...', duration: 800 },
      { progress: 30, status: 'Extracting text from documents...', duration: 1000 },
      { progress: 45, status: 'Analyzing project photos...', duration: 1200 },
      { progress: 60, status: 'Finding project scope and value...', duration: 1000 },
      { progress: 75, status: 'Identifying results and outcomes...', duration: 1200 },
      { progress: 90, status: 'Building case study structure...', duration: 800 },
      { progress: 100, status: 'Complete!', duration: 500 },
    ]

    let currentStep = 0

    const runNextStep = () => {
      if (currentStep < steps.length) {
        const step = steps[currentStep]
        setProgress(step.progress)
        setStatus(step.status)

        if (step.progress === 100) {
          setTimeout(() => {
            router.push(`/preview/${uploadId}`)
          }, step.duration)
        } else {
          setTimeout(() => {
            currentStep++
            runNextStep()
          }, step.duration)
        }
      }
    }

    runNextStep()
  }, [uploadId, router])

  return (
    <main className="min-h-screen bg-[var(--background)] flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-display text-4xl md:text-6xl mb-4">
            Extracting
            <br />
            <span className="text-[var(--accent)]">your story</span>
          </h1>
          <p className="text-body text-xl">
            Analyzing your project files...
          </p>
        </div>

        <div className="space-y-6">
          {/* Progress bar */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-label">{status}</span>
              <span className="text-[var(--foreground)] text-sm font-bold">{progress}%</span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-bar-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* What we're looking for */}
          <div className="bg-[var(--muted)] p-8 border-l-4 border-[var(--accent)]">
            <p className="text-[var(--foreground)] font-semibold mb-4">What we&apos;re extracting:</p>
            <ul className="space-y-2 text-body">
              <li className="flex items-start gap-2">
                <span className="text-[var(--success)]">✓</span>
                <span>Project name and client details</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--success)]">✓</span>
                <span>Project scope and deliverables</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--success)]">✓</span>
                <span>Timeline and project value</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--success)]">✓</span>
                <span>Client challenge or problem solved</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--success)]">✓</span>
                <span>Your approach and methodology</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--success)]">✓</span>
                <span>Quantifiable results and outcomes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--success)]">✓</span>
                <span>Client testimonials or feedback</span>
              </li>
            </ul>
          </div>

          <p className="text-center text-[var(--muted-foreground)] text-sm">
            This usually takes 2-3 minutes. Your files will be deleted immediately after processing.
          </p>
        </div>
      </div>
    </main>
  )
}

function LoadingFallback() {
  return (
    <main className="min-h-screen bg-[var(--background)] flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-display text-4xl md:text-6xl mb-4">Loading...</h1>
      </div>
    </main>
  )
}

export default function ProcessingPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ProcessingContent />
    </Suspense>
  )
}
