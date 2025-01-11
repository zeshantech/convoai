import type { NextApiRequest } from 'next';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/db/mongoose';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export default async function handler(req: NextApiRequest) {
    if (req.method !== 'POST') {
        return NextResponse.json({ message: 'Method Not Allowed' });
    }

    const { token, password } = req.body;

    if (!token || !password) {
        return NextResponse.json({ message: 'Invalid request' });
    }

    await dbConnect();

    const resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
        return NextResponse.json({ message: 'Invalid or expired token' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    NextResponse.json({ message: 'Password has been reset successfully' });
}
