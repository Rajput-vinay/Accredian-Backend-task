const {z} = require('zod')



 const SubmitReferralSchema = z.object({
referrer_name: z.string().min(3, "Require minimum length must be 3"), 
referrer_email: z.string().email("Invalid email format"),
referred_name: z.string().min(3, "Require minimum length must be 3"), 
referred_email: z.string().email("Invalid email format"),
  message: z.string().optional(),
  
});

module.exports = {SubmitReferralSchema}