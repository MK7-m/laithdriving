import { MailService } from '@sendgrid/mail';

if (!process.env.SENDGRID_API_KEY) {
  console.warn("SENDGRID_API_KEY environment variable not set");
}

const mailService = new MailService();
if (process.env.SENDGRID_API_KEY) {
  mailService.setApiKey(process.env.SENDGRID_API_KEY);
}

interface ContactEmailParams {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
  language: string;
}

export async function sendContactEmail(params: ContactEmailParams): Promise<boolean> {
  try {
    if (!process.env.SENDGRID_API_KEY) {
      console.error('SendGrid API key not configured');
      return false;
    }

    const subject = `New Contact Form Submission - ${params.firstName} ${params.lastName}`;
    const htmlContent = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${params.firstName} ${params.lastName}</p>
      <p><strong>Email:</strong> ${params.email}</p>
      ${params.phone ? `<p><strong>Phone:</strong> ${params.phone}</p>` : ''}
      ${params.service ? `<p><strong>Service:</strong> ${params.service}</p>` : ''}
      <p><strong>Language:</strong> ${params.language}</p>
      <p><strong>Message:</strong></p>
      <p>${params.message.replace(/\n/g, '<br>')}</p>
    `;

    await mailService.send({
      to: 'Laithrazzak@gmail.com',
      from: process.env.SENDGRID_FROM_EMAIL || 'noreply@topautomaat.com',
      subject,
      html: htmlContent,
      replyTo: params.email,
    });

    return true;
  } catch (error) {
    console.error('SendGrid email error:', error);
    return false;
  }
}
