const nodemailer = require('nodemailer'); 
const dotenv = require('dotenv');

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    }
});

 const sendReferralEmail = async (referrer_name, referrer_email, referred_name, referred_email) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: referred_email, 
            subject: '🎉 You\'ve Been Referred for an Opportunity!',
            text: `
Hi ${referred_name},

I hope you're doing well!

I wanted to share some great news with you—${referrer_name} (${referrer_email}) has referred you for an exciting opportunity. Here are the details:

🔹 **Referrer Name:** ${referrer_name}  
🔹 **Referrer Email:** ${referrer_email}  

If you're interested, feel free to respond or reach out for more details.

Looking forward to seeing you make the most of this opportunity! 🚀

Best Regards,  
Your Company Name
            `
        };

        await transporter.sendMail(mailOptions);
        console.log('✅ Referral email sent successfully');
    } catch (error) {
        console.error('❌ Error sending referral email:', error);
    }
};



module.exports = {sendReferralEmail}