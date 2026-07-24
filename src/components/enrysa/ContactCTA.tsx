'use client'

import { useState, type FormEvent } from 'react'
import { AnimatedText } from '@/components/enrysa/AnimatedText'
import { MagneticButton } from '@/components/enrysa/MagneticButton'

interface FormData {
  name: string
  company: string
  phone: string
  email: string
  businessType: string
  product: string
  message: string
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

export function ContactCTA() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    company: '',
    phone: '',
    email: '',
    businessType: '',
    product: '',
    message: '',
  })
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    setErrorMessage('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Something went wrong. Please try again.')
      }

      setStatus('success')
      setFormData({
        name: '',
        company: '',
        phone: '',
        email: '',
        businessType: '',
        product: '',
        message: '',
      })
    } catch (err) {
      setStatus('error')
      setErrorMessage(err instanceof Error ? err.message : 'An unexpected error occurred.')
    }
  }

  const inputClasses =
    'w-full bg-transparent border-b border-white/[0.1] text-white text-sm py-3 px-0 placeholder:text-[#71717A] focus:border-white/30 outline-none transition-colors duration-400'
  const labelClasses = 'block text-xs uppercase tracking-[0.15em] text-[#71717A] mb-1.5'

  return (
    <section id="contact" className="py-32 md:py-40 px-6 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          {/* Left column */}
          <div className="lg:w-1/2">
            <AnimatedText
              as="h2"
              className="text-white font-bold text-4xl md:text-5xl lg:text-6xl tracking-[-0.02em] leading-[1.1]"
            >
              READY TO
              <br />
              SOURCE BEYOND
              <br />
              BORDERS?
            </AnimatedText>
            <AnimatedText delay={0.15}>
              <p className="text-[#A1A1AA] text-lg mt-6 max-w-md leading-relaxed">
                Tell us what you&apos;re looking for. ENRYSA will help you explore the path
                from global markets to Bangladesh.
              </p>
            </AnimatedText>
            <AnimatedText delay={0.3}>
              <div className="mt-10 flex flex-col sm:flex-row gap-3">
                <MagneticButton
                  href="#contact-form"
                  className="inline-flex items-center justify-center bg-white text-black px-8 py-3 text-xs uppercase tracking-[0.15em] rounded-sm font-medium hover:bg-white/90 transition-colors min-h-[44px]"
                >
                  START SOURCING
                </MagneticButton>
                <MagneticButton
                  href="#contact-form"
                  className="inline-flex items-center justify-center border border-white/20 text-white px-8 py-3 text-xs uppercase tracking-[0.15em] rounded-sm font-medium hover:bg-white/5 transition-colors min-h-[44px]"
                >
                  TALK TO ENRYSA
                </MagneticButton>
              </div>
            </AnimatedText>
          </div>

          {/* Right column - Form */}
          <div className="lg:w-1/2" id="contact-form">
            {status === 'success' ? (
              <div className="flex items-center justify-center min-h-[400px]">
                <p className="text-[#86efac]/70 text-lg tracking-wide">
                  Request submitted. We&apos;ll be in touch.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* Name */}
                <div>
                  <label htmlFor="contact-name" className={labelClasses}>
                    Name <span className="text-white/20">*</span>
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className={inputClasses}
                  />
                </div>

                {/* Company Name */}
                <div>
                  <label htmlFor="contact-company" className={labelClasses}>
                    Company Name
                  </label>
                  <input
                    id="contact-company"
                    name="company"
                    type="text"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Your company"
                    className={inputClasses}
                  />
                </div>

                {/* Phone / WhatsApp */}
                <div>
                  <label htmlFor="contact-phone" className={labelClasses}>
                    Phone / WhatsApp
                  </label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="text"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+880 1XXX XXXXXX"
                    className={inputClasses}
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="contact-email" className={labelClasses}>
                    Email <span className="text-white/20">*</span>
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@company.com"
                    className={inputClasses}
                  />
                </div>

                {/* Business Type */}
                <div>
                  <label htmlFor="contact-type" className={labelClasses}>
                    Business Type
                  </label>
                  <select
                    id="contact-type"
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleChange}
                    className={`${inputClasses} appearance-none cursor-pointer`}
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2371717A' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 0 center',
                    }}
                  >
                    <option value="" disabled>
                      Select type
                    </option>
                    <option value="B2B">B2B</option>
                    <option value="B2C">B2C</option>
                  </select>
                </div>

                {/* Product / Sourcing Requirement */}
                <div>
                  <label htmlFor="contact-product" className={labelClasses}>
                    Product or Sourcing Requirement
                  </label>
                  <input
                    id="contact-product"
                    name="product"
                    type="text"
                    value={formData.product}
                    onChange={handleChange}
                    placeholder="What are you looking to source?"
                    className={inputClasses}
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="contact-message" className={labelClasses}>
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Any additional details..."
                    className={`${inputClasses} resize-none`}
                  />
                </div>

                {/* Error message */}
                {status === 'error' && (
                  <p className="text-[#fca5a5]/70 text-sm mt-1">{errorMessage}</p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full bg-white text-black py-4 text-xs uppercase tracking-[0.15em] rounded-sm font-medium hover:bg-white/90 transition-colors min-h-[44px] mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'submitting' ? 'SUBMITTING...' : 'SUBMIT REQUEST'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}