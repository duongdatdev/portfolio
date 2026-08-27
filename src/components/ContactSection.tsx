import React, { useState } from 'react'

const FORMSPREE_FORM_ID: string = 'xkoeqwnb'

const SHOW_CONTACT_SECTION = true
const SHOW_CONTACT_FORM = true

export function ContactSection() {
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [email, setEmail] = useState('')
  const [opportunityType, setOpportunityType] = useState('Internship')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  if (!SHOW_CONTACT_SECTION) {
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email || !message) {
      alert('Please fill in all required fields!')
      return
    }

    setStatus('sending')

    // If ID is default, simulate successful submission
    if (FORMSPREE_FORM_ID === 'xxxxxxxx' || !FORMSPREE_FORM_ID) {
      setTimeout(() => {
        setStatus('success')
        setName('')
        setCompany('')
        setEmail('')
        setOpportunityType('Internship')
        setMessage('')

        // Reset back to form after 5 seconds
        setTimeout(() => {
          setStatus('idle')
        }, 5000)
      }, 1200)
      return
    }

    // Actual submission via Formspree API
    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name,
          company,
          email,
          opportunityType,
          message,
        })
      })

      if (response.ok) {
        setStatus('success')
        setName('')
        setCompany('')
        setEmail('')
        setOpportunityType('Internship')
        setMessage('')
        setTimeout(() => setStatus('idle'), 5000)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="section-block contact-block" id="contact">
      <h2>Recruitment & Collaboration</h2>
      <div className="contact-container" style={!SHOW_CONTACT_FORM ? { gridTemplateColumns: '1fr', maxWidth: '720px', margin: '24px auto 0' } : undefined}>
        <div className="contact-info">
          <h3>Looking for a Game Developer or Software Engineer?</h3>
          <p>
            I am actively seeking <strong>Software Engineering internships</strong>,
            <strong> Unity Gameplay Programmer</strong> roles, or interesting development collaborations.
            If you are a recruiter, tech lead, or founder, let's connect!
          </p>
          <div className="contact-details">
            <div className="contact-detail-item">
              <strong>Direct Email:</strong>
              <a href="mailto:duongbaodat.dev@gmail.com">duongbaodat.dev@gmail.com</a>
            </div>
            <div className="contact-detail-item">
              <strong>Location:</strong>
              <span>Da Nang, Vietnam (Open to relocation & remote work)</span>
            </div>
          </div>
          <div className="contact-actions" style={{ marginTop: '28px' }}>
            <a
              className="resume-link boxed"
              href="/resume/DuongBaoDat_DeveloperInternFresher_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                textDecoration: 'none',
                padding: '12px 20px',
                borderRadius: '4px',
                border: '2px solid var(--lime)',
                color: 'var(--lime)',
                fontWeight: 700,
                transition: 'background 180ms ease, transform 180ms ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(167, 223, 111, 0.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
              }}
            >
              <span>View My Resume (PDF)</span>
            </a>
          </div>
        </div>

        {SHOW_CONTACT_FORM && (
          <div className="contact-form-wrapper">
            {status === 'success' ? (
              <div className="contact-success-message">
                <div className="success-icon">✓</div>
                <h3>Message Sent!</h3>
                <p>Thank you for reaching out. Dat will get back to you as soon as possible.</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                {status === 'error' && (
                  <div style={{ color: '#ff6b6b', background: 'rgba(255, 107, 107, 0.1)', padding: '12px', borderRadius: '4px', border: '1px solid rgba(255, 107, 107, 0.2)', fontSize: '0.95rem' }}>
                    An error occurred. Please try again or email directly to <a href="mailto:duongbaodat.dev@gmail.com" style={{ color: 'var(--lime)', textDecoration: 'underline' }}>duongbaodat.dev@gmail.com</a>.
                  </div>
                )}
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="contact-name">Your Name *</label>
                    <input
                      type="text"
                      id="contact-name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="E.g., John Doe"
                      required
                      disabled={status === 'sending'}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact-company">Company / Organization</label>
                    <input
                      type="text"
                      id="contact-company"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="E.g., Indie Studio"
                      disabled={status === 'sending'}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="contact-email">Work Email *</label>
                    <input
                      type="email"
                      id="contact-email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      required
                      disabled={status === 'sending'}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact-opportunity">Opportunity Type</label>
                    <select
                      id="contact-opportunity"
                      value={opportunityType}
                      onChange={(e) => setOpportunityType(e.target.value)}
                      disabled={status === 'sending'}
                    >
                      <option value="Internship">Internship</option>
                      <option value="Full-time">Full-time Position</option>
                      <option value="Freelance">Freelance / Contract</option>
                      <option value="Collaboration">Collaboration</option>
                      <option value="Other">Other Inquiry</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="contact-message">Job Details / Message *</label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Share details about the role, tech stack, or project..."
                    required
                    disabled={status === 'sending'}
                  />
                </div>

                <button
                  type="submit"
                  className="submit-btn"
                  disabled={status === 'sending'}
                  style={{ width: '100%', display: 'block', textAlign: 'center' }}
                >
                  {status === 'sending' ? 'Sending Request...' : 'Submit Inquiry'}
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
