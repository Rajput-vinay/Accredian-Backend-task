const { prismaClient } = require('../prisma/index');
const { sendReferralEmail } = require('../service/email.service');
const { z } = require('zod');
const { SubmitReferralSchema } = require('../zod/Schema');

const ReferralSubmit = async (req, res) => {
   
    const result = SubmitReferralSchema.safeParse(req.body);

   
    if (!result.success) {
        return res.status(400).json({
            message: "Invalid data format",
            errors: result.error.format(), 
        });
    }

    try {
        const { referrer_name, referrer_email, referred_email, referred_name, message } = result.data;

       
        const user = await prismaClient.referral.create({
            data: {
                referrer_name,
                referrer_email,
                referred_email,
                referred_name,
                message,
            },
        });

        // Send referral email
        const referral = await sendReferralEmail(referrer_name, referrer_email, referred_name, referred_email);

        if (!referral) {
            return res.status(400).json({
                message: "Referral email sending failed",
            });
        }

        return res.status(200).json({
            message: "Referral data saved successfully",
        });

    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message, 
        });
    }
};

// Get all referrals
const getAllReferral = async (req, res) => {
    try {
        const users = await prismaClient.referral.findMany();

        if (users.length === 0) {
            return res.status(404).json({
                message: "No users found in the list",
            });
        }

        return res.status(200).json({
            message: "Fetched all users",
            users,
        });

    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message, 
        });
    }
};

module.exports = { ReferralSubmit, getAllReferral };
