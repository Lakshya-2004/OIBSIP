import transporter from '../config/mailer.js'

const sendEmail = async ({
  to,
  subject,
  html,
}) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,

      to,

      subject,

      html,
    }

    const info = await transporter.sendMail(
      mailOptions
    )

    console.log(
      `Email sent: ${info.messageId}`
    )

    return info
  } catch (error) {
    console.log(error)

    throw new Error(
      'Unable to send email'
    )
  }
}

export default sendEmail