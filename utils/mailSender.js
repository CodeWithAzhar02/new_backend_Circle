const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
    try {
        // Create transporter with proper Gmail settings
        let transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: Number(process.env.SMTP_PORT) === 465, // True for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            },
        });

        // Send mail with proper FROM name
        let info = await transporter.sendMail({
            from: `"Study Circle" <${process.env.SMTP_USER}>`,  // Yeh line important hai
            to: email,
            subject: title,
            html: body,
        });

        console.log("Email sent successfully to:", email);
        console.log("Message ID:", info.messageId);
        return info;

    } catch (error) {
        console.log("Error while sending mail (mailSender) -", email);
        console.error("Full Error:", error.message);
        if (error.code) console.error("Error Code:", error.code);
        throw error; // Important — frontend ko pata chale error aaya
    }
};

module.exports = mailSender;