import { NextRequest, NextResponse } from "next/server";
import dbConnect from '@/db/mongoose';
import User from '@/db/models/User';

export async function GET(request: NextRequest) {
    await dbConnect();

    try {
        const users = await User.find({}).lean();
        return NextResponse.json(users);
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { error: 'Failed to fetch users' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    await dbConnect()
    try {
        const body = await request.json();

        if (!body.firstName || !body.lastName || !body.email || !body.password || !body.companyId) {
            return NextResponse.json(
                { error: 'First Name, Last Name, Email, Password and Company are required' },
                { status: 400 }
            )
        }
        const userExists = await User.findOne({ email: body.email });

        if (userExists) {
            return NextResponse.json(
                { error: 'Tis email is already registered' },
                { status: 400 }
            )
        }

        const newUser = new User({
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            password: body.password,
            role: body.role || 'employee',
            companyId: body.companyId,
            avatarUrl: body.avatarUrl,
            hireDate: body.hireDate ? new Date(body.hireDate) : undefined,
            isActive: body.isActive !== undefined ? body.isActive : true
        })
        const savedUser = await newUser.save();
        const responseData = savedUser.toObject();
        return NextResponse.json(responseData, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}