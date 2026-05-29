import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',

  auth: {
    user: process.env.EMAIL_USER,

    pass: process.env.EMAIL_PASS,
  },
})

export const sendEmail = async ({
  to,
  subject,
  html,
}) => {
  try {
    const mailOptions = {
      from: `"Pizza Delivery" <${process.env.EMAIL_USER}>`,

      to,

      subject,

      html,
    }

    const info = await transporter.sendMail(
      mailOptions
    )

    console.log(
      `✅ Email Sent: ${info.messageId}`
    )

    return info
  } catch (error) {
    console.log(
      `❌ Email Error: ${error.message}`
    )

    throw error
  }
}

export default transporter