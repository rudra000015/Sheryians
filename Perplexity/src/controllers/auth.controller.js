import userModel from '../models/user.model.js'
import { sendEmail } from '../services/mail.service.js'
import jwt from 'jsonwebtoken'

export async function register(req, res) {
    const { username, email, password } = req.body;
    const isuseralreadyexist = await userModel.findOne({
        $or: [{ username }]
    })

    if (isuseralreadyexist) {
        return res.status(400).json({
            msg: "User Already exist with this Username or Email",
            success: false,
            err: 'User Already Exist'
        })
    }

    const user = await userModel.create({ username, email, password })



    const emailVerificationToken = jwt.sign({
        email: user.email
    }, process.env.JWT_SECRET, {
        expiresIn: "1d"
    })


    try {
        await sendEmail({
            to: email,
            subject: "Welcome to Perplexity!",
            html: `
<p>Hi ${username},</p>
<p>Thank you for registering at <strong>Perplexity</strong>. We're excited to have you on board!</p
<p>Please verify your email address by clicking the link below:</p>
<a href="http://localhost:3000/api/auth/verify-email?token=${emailVerificationToken}">Verify Email</a>,
<p>If you did not create an account, please ignore this email.</p>
<p>Best regards, <br>The Perplexity Team</p>`
        })
    } catch (emailError) {
        console.error('Failed to send registration email:', emailError);
    }

    res.status(201).json({
        message: "User registered successfully",
        success: true,
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    });
}

export async function verifyemail(req, res) {
    const token = req.query.token;

    if (!token || typeof token !== 'string') {
        return res.status(400).json({
            success: false,
            msg: 'Verification token is required',
            err: 'Invalid token'
        });
    }

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: 'Invalid or expired token',
            err: error.message
        });
    }

    const user = await userModel.findOne({ email: decoded.email });

    if (!user) {
        return res.status(400).json({
            success: false,
            msg: 'Invalid token',
            err: 'User not found'
        });
    }

    user.verified = true;
    await user.save();

    res.send(`<h1>Email Verified Successfully</h1>
        <p>Your email has been verified. You can now log in to your account.</p>`);
}



export async function login(req, res) {
    const { email, password } = req.body;
    const user = await userModel.findOne({
        email
    })

    if (!user.verified) {
        return res.status(400).json({
            msg: "Please verify your email before logging in",
            success: false,
            err: "Email not Verified"
        })
    }

    const token = jwt.sign({
        id: user.id,
        username: user.username
    }, process.env.JWT_SECRET, { expiresIn: "1d" })

    res.cookie("token", token)

    res.status(200).json({
        msg: "Login successfully",
        success: true,
        user: {
            id: user.id,
            username: user.username,
            email: user.email
        }
    })



}


export async function getMe(req,res) {
    const userId = req.user.id;
     const user = await userModel.findById(userId).select("-password")

     if(!user){
        return res.status(400).json({
            msg:"User Not Found",
            success:false,
            err:"User Not Found"
        })
     }



     res.status(200).json({
          msg:"User Details Fetched Successfully",
            success:true,
            user
     })
}