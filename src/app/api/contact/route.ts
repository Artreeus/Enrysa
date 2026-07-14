import { NextResponse } from 'next/server'

interface ContactPayload {
  name: string
  company?: string
  phone?: string
  email: string
  businessType?: string
  product?: string
  message?: string
}

export async function POST(request: Request) {
  try {
    const body: ContactPayload = await request.json()

    if (!body.name || !body.email) {
      return NextResponse.json(
        { error: 'Name and email are required.' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      )
    }

    // In production, this would send to an email service, CRM, or database.
    // For now, we log and return success.
    console.log('[Contact Form Submission]', {
      name: body.name,
      company: body.company || 'N/A',
      phone: body.phone || 'N/A',
      email: body.email,
      businessType: body.businessType || 'N/A',
      product: body.product || 'N/A',
      message: body.message || 'N/A',
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    )
  }
}