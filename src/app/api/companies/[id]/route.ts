import dbConnect from "@/db/mongoose";
import Company from "@/db/models/Company";
import { NextResponse } from "next/server";

type RouteParams = {
    params: Promise<{ id: string }>
}

export async function GET(req: Request, { params }: RouteParams) {
    try {
        await dbConnect();
        const { id } = await params;
        const company = await Company.findById(id);
        
        if (!company) {
            return NextResponse.json({ error: 'No company found' }, { status: 404 });
        }

        return NextResponse.json(company, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: ' Failed to fetch company, details: ' + error }, { status: 500 });
    }
}

export async function PATCH(req: Request, { params }: RouteParams) {
    try {
        await dbConnect();
        const { id } = await params;
        const body = await req.json();
        const company = await Company.findByIdAndUpdate(id, body, { new: true });
        
        if (!company) {
            return NextResponse.json({ error: 'No company found' }, { status: 404 });
        }

        return NextResponse.json(company, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: "Failed to update company, details: " + (error.message || 'Failed to update company') }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: RouteParams) {
    try {
        await dbConnect();
        const { id } = await params;
        const company = await Company.findByIdAndDelete(id);
        
        if (!company) {
            return NextResponse.json({ error: 'Company not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Company deleted successfully' }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            {
                error: error.message
                    ? `Failed to delete company, details: ${error.message}`
                    : 'Failed to delete company'
            },
            { status: 500 }
        );
    }
}