export interface ProjectData {
  projectName?: string
  clientName?: string
  projectValue?: string
  timeline?: string
  scope?: string
  challenge?: string
  approach?: string
  results?: string[]
  testimonial?: string
  location?: string
  industry?: string
  projectType?: string
}

export interface CaseStudy {
  title: string
  client: string
  challenge: string
  approach: string
  results: string[]
  quote?: string
  metadata: {
    industry: string
    projectType: string
    value: string
    timeline: string
    location?: string
  }
}

export interface CaseStudyFormats {
  onePager: string
  proposalInsert: string
  websiteCopy: string
}

// Mock extraction from uploaded files
export async function extractProjectData(files: File[]): Promise<ProjectData> {
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 2000))

  // Mock data extraction - in production this would parse PDFs, images, invoices, etc.
  const mockData: ProjectData = {
    projectName: 'Riverside Manufacturing Facility Expansion',
    clientName: 'Riverside Manufacturing Inc.',
    projectValue: '$847,000',
    timeline: '16 weeks',
    scope: 'Design-build expansion of 12,000 sq ft manufacturing space with clean room installation, HVAC upgrades, and electrical system modernization',
    challenge: 'Client needed FDA-compliant clean room space operational within aggressive 16-week timeline while maintaining production in existing facility. Zero downtime tolerance.',
    approach: 'Phased construction approach with weekend-only work in critical areas. Pre-fabricated clean room panels reduced on-site time by 40%. Dedicated project superintendent lived on-site during final 4 weeks.',
    results: [
      'Delivered 2 days early despite 3 scope changes',
      'Zero production downtime across entire project',
      'Passed FDA inspection first attempt (rare for new clean rooms)',
      '$47,000 under budget due to prefab approach',
      'Client awarded follow-up $1.2M project 8 weeks after completion'
    ],
    testimonial: 'We had doubts anyone could pull this off in 16 weeks. Not only did they deliver early, but we never stopped production for a single shift. The prefab approach saved us time and money, and passing the FDA inspection on first try was the cherry on top.',
    location: 'Columbus, OH',
    industry: 'Pharmaceutical Manufacturing',
    projectType: 'Design-Build Expansion'
  }

  return mockData
}

// Generate case study from extracted data
export function generateCaseStudy(data: ProjectData): CaseStudy {
  return {
    title: data.projectName || 'Untitled Project',
    client: data.clientName || 'Anonymous Client',
    challenge: data.challenge || 'Challenge details not available',
    approach: data.approach || 'Approach details not available',
    results: data.results || [],
    quote: data.testimonial,
    metadata: {
      industry: data.industry || 'Industry not specified',
      projectType: data.projectType || 'Project type not specified',
      value: data.projectValue || 'Value not disclosed',
      timeline: data.timeline || 'Timeline not specified',
      location: data.location
    }
  }
}

// Generate formatted outputs
export function formatCaseStudy(caseStudy: CaseStudy): CaseStudyFormats {
  const onePager = `
${caseStudy.title.toUpperCase()}
${caseStudy.client}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

THE CHALLENGE

${caseStudy.challenge}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

OUR APPROACH

${caseStudy.approach}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

RESULTS DELIVERED

${caseStudy.results.map(r => `• ${r}`).join('\n')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${caseStudy.quote ? `CLIENT TESTIMONIAL

"${caseStudy.quote}"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

` : ''}PROJECT DETAILS

Industry: ${caseStudy.metadata.industry}
Project Type: ${caseStudy.metadata.projectType}
Value: ${caseStudy.metadata.value}
Timeline: ${caseStudy.metadata.timeline}
${caseStudy.metadata.location ? `Location: ${caseStudy.metadata.location}` : ''}
`.trim()

  const proposalInsert = `
━━━ RELEVANT EXPERIENCE ━━━

${caseStudy.title}
${caseStudy.client} • ${caseStudy.metadata.value} • ${caseStudy.metadata.timeline}

${caseStudy.challenge}

What we did: ${caseStudy.approach}

Results:
${caseStudy.results.slice(0, 3).map(r => `  → ${r}`).join('\n')}

${caseStudy.quote ? `"${caseStudy.quote}" — ${caseStudy.client}` : ''}
`.trim()

  const websiteCopy = `
<section class="case-study">
  <h2>${caseStudy.title}</h2>
  <p class="client-meta">${caseStudy.client} • ${caseStudy.metadata.industry} • ${caseStudy.metadata.value}</p>

  <div class="challenge">
    <h3>The Challenge</h3>
    <p>${caseStudy.challenge}</p>
  </div>

  <div class="approach">
    <h3>Our Approach</h3>
    <p>${caseStudy.approach}</p>
  </div>

  <div class="results">
    <h3>Results</h3>
    <ul>
${caseStudy.results.map(r => `      <li>${r}</li>`).join('\n')}
    </ul>
  </div>

  ${caseStudy.quote ? `<blockquote>
    <p>"${caseStudy.quote}"</p>
  </blockquote>` : ''}

  <div class="project-details">
    <span>${caseStudy.metadata.industry}</span>
    <span>${caseStudy.metadata.timeline}</span>
    ${caseStudy.metadata.location ? `<span>${caseStudy.metadata.location}</span>` : ''}
  </div>
</section>
`.trim()

  return {
    onePager,
    proposalInsert,
    websiteCopy
  }
}

// Generate preview (free version - shows structure only)
export function generatePreview(data: ProjectData) {
  return {
    hasProjectName: !!data.projectName,
    hasClientName: !!data.clientName,
    hasValue: !!data.projectValue,
    hasTimeline: !!data.timeline,
    hasChallenge: !!data.challenge,
    hasApproach: !!data.approach,
    hasResults: !!data.results && data.results.length > 0,
    hasTestimonial: !!data.testimonial,
    resultsCount: data.results?.length || 0,
    completeness: calculateCompleteness(data)
  }
}

function calculateCompleteness(data: ProjectData): number {
  const fields = [
    data.projectName,
    data.clientName,
    data.projectValue,
    data.timeline,
    data.challenge,
    data.approach,
    data.results?.length,
    data.testimonial
  ]

  const filledFields = fields.filter(f => f).length
  return Math.round((filledFields / fields.length) * 100)
}
