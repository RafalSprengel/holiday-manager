import { NextResponse } from 'next/server';
import dbConnect from '@/db/mongoose';
import Company from '@/db/models/Company';

export async function GET() {
    try {
        await connectDB();
        const companies = await Company.find({});
        return NextResponse.json({ companies });
    } catch {
        return NextResponse.json({ error: 'Failed to fetch companies' }, { status: 500 });
    }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    if (!body.name?.trim()) {
      return NextResponse.json(
        { error: 'Validation failed', details: { name: 'Name is required' } },
        { status: 400 }
      );
    }

    if (!body.registrationNumber?.trim()) {
      return NextResponse.json(
        { error: 'Validation failed', details: { registrationNumber: 'Registration number is required' } },
        { status: 400 }
      );
    }

    const nameTrimmed = body.name.trim();
    const regTrimmed = body.registrationNumber.trim();

    const existingCompany = await Company.findOne({
      $or: [{ name: nameTrimmed }, { registrationNumber: regTrimmed }]
    });

    if (existingCompany) {
      const isNameDup = existingCompany.name === nameTrimmed;
      return NextResponse.json(
        { 
          error: 'Validation failed', 
          details: { 
            [isNameDup ? 'name' : 'registrationNumber']: `Company with this ${isNameDup ? 'name' : 'registration number'} already exists` 
          } 
        },
        { status: 400 }
      );
    }

    const company = new Company({
      name: nameTrimmed,
      registrationNumber: regTrimmed,
      settings: body.settings,
      address: body.address
    });

    const savedCompany = await company.save();
    return NextResponse.json(savedCompany, { status: 201 });

  } catch (error: any) {
    if (error.name === 'ValidationError') {
      const mongooseErrors: Record<string, string> = {};
      Object.keys(error.errors).forEach(key => {
        mongooseErrors[key] = error.errors[key].message;
      });
      return NextResponse.json(
        { error: 'Validation failed', details: mongooseErrors },
        { status: 400 }
      );
    }

    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'Duplicate field value entered' },
        { status: 400 }
      );
    }

    console.error('Company creation error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}