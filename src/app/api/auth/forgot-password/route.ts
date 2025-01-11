import type { NextApiRequest } from 'next';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import dbConnect from '@/lib/db/mongoose';
import User from '@/models/User';
import { NextResponse } from 'next/server';


export async function POST(req: NextApiRequest) {
    const { email } = req.body;

    if (!email) {
        return NextResponse.json({ message: 'Email is required' });
    }

    await dbConnect();

    const user = await User.findOne({ email });
    if (!user) {
        return NextResponse.json({ message: 'Password reset link has been sent to your email.' });
    }

    // Generate a reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    //   const resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    //   const resetPasswordExpires = Date.now() + 3600000; // 1 hour

    //   user.resetPasswordToken = resetPasswordToken;
    //   user.resetPasswordExpires = resetPasswordExpires;

    await user.save();

    // Create reset URL
    const resetUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password/${resetToken}`;

    // Send email
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for other ports
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: user.email,
        subject: 'Password Reset',
        text: `You requested a password reset. Please click the link below to reset your password:\n\n${resetUrl}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        NextResponse.json({ message: 'Password reset link has been sent to your email.' });
    } catch (error) {
        console.error(error);
        NextResponse.json({ message: 'Error sending email.' });
    }
}
