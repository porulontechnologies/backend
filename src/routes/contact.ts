import express, { Router, Request, Response } from 'express'
import nodemailer from 'nodemailer'

const router: Router = express.Router()

interface ContactFormData {
  firstName: string
  lastName: string
  email: string
  company?: string
  message: string
}

// Contact form endpoint
router.post('/contact', async (req: Request, res: Response) => {
  try {
    const transporter = nodemailer.createTransport({
      //service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, 
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    })
    const body: ContactFormData = req.body

    // Validate required fields
    if (!body.firstName || !body.lastName || !body.email || !body.message) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return res.status(400).json({ error: 'Invalid email format' })
    }

    const recipientEmail = process.env.RECIPIENT_EMAIL || 'porulontechnologies@gmail.com'

    // Email to the company
    const companyEmailOptions = {
      from: process.env.SMTP_EMAIL,
      to: recipientEmail,
      subject: `New Contact Form Submission from ${body.firstName} ${body.lastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${body.firstName} ${body.lastName}</p>
            <p><strong>Email:</strong> ${body.email}</p>
            <p><strong>Company:</strong> ${body.company || 'Not provided'}</p>
          </div>

          <div style="margin: 20px 0;">
            <h3 style="color: #333;">Message:</h3>
            <p style="color: #666; line-height: 1.6; white-space: pre-wrap;">${body.message}</p>
          </div>

          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          <p style="color: #999; font-size: 12px;">
            This email was sent from your website contact form.
          </p>
        </div>
      `,
    }

    // Confirmation email to the user
    const userEmailOptions = {
      from: process.env.SMTP_EMAIL,
      to: body.email,
      subject: 'We received your message - Porulon Technologies',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Thank You for Reaching Out!</h2>
          
          <p style="color: #666; line-height: 1.6;">
            Hi ${body.firstName},
          </p>

          <p style="color: #666; line-height: 1.6;">
            We have received your message and appreciate you taking the time to contact us. 
            Our team will review your inquiry and get back to you within 24 hours.
          </p>

          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Here's what we received:</h3>
            <p><strong>Name:</strong> ${body.firstName} ${body.lastName}</p>
            <p><strong>Email:</strong> ${body.email}</p>
            ${body.company ? `<p><strong>Company:</strong> ${body.company}</p>` : ''}
          </div>

          <p style="color: #666; line-height: 1.6;">
            If you have any urgent matters, you can also reach us at +91 904 709 9277.
          </p>

          <p style="color: #666; line-height: 1.6;">
            Best regards,<br>
            <strong>Porulon Technologies Team</strong>
          </p>

          <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
          <p style="color: #999; font-size: 12px; text-align: center;">
            © 2024 Porulon Technologies. All rights reserved.
          </p>
        </div>
      `,
    }

    // Send both emails
    await transporter.sendMail(companyEmailOptions)
    await transporter.sendMail(userEmailOptions)

    return res.status(200).json({ message: 'Email sent successfully' })
  } catch (error) {
    console.error('Error sending email:', error)
    return res.status(500).json({ error: 'Failed to send email' })
  }
})

export { router as contactRouter }
