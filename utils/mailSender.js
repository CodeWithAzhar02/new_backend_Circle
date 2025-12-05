const nodemailer = require("nodemailer");

// Create the transporter ONCE (Singleton pattern)
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: Number(process.env.SMTP_PORT) === 465,
    family: 4, // Force IPv4
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
});

const mailSender = async (email, title, body) => {
    try {
        // Send mail using the reusable transporter
        let info = await transporter.sendMail({
            from: `"Study Circle" <${process.env.SMTP_USER}>`,
            to: email,
            subject: title,
            html: body,
        });

        console.log("Email sent successfully to - ", email);
        console.log("Message ID:", info.messageId);
        return info;

    } catch (error) {
        console.log("Error while sending mail (mailSender) -", email);
        console.error("Full Error:", error.message);
        if (error.code) console.error("Error Code:", error.code);
        throw error;
    }
};

module.exports = mailSender;