const nodemailer = require('nodemailer')

const sendEmail = async(email, subject, text) => {
    try{
        const transporter = nodemialer.createTransport({
            host: process.env.HOST,
            service: process.env.SERVICE,
            port: 587,
            secure: true,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS
            },
        });

        await transporter.sendEmail({
            from: process.env.USER,
            to: email,
            subject: subject,
            text: text,
        });

        console.log("Email sent successfully!");
    }
    catch(error){
        console.log("Error in sending email");
    }
};


module.exports = {sendEmail};