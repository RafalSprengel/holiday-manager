import dbConnect from "@/db/mongoose";
import Company from "@/db/models/Company";
import { NextResponse } from "next/server";


export async function GET(req: Request, { params }: { params: { id: string } }) {

    try {
        await dbConnect();
        const company = await Company.findById(params.id);
        if (!company) NextResponse.json({ error: 'No company found' }, { status: 500 });

    } catch (error) {
        return NextResponse.json({ error: ' Failed to fetch company, details: ' + error }, { status: 500 })
    }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {

    try {
        await dbConnect();
        const { id } = params;
        const body = await req.json();
        const company = await Company.findByIdAndUpdate(id, body, { new: true })
        if (!company) NextResponse.json({ error: 'No company found' }, { status: 500 });

    } catch (error: any) {
        return NextResponse.json({ error: "Failed to update company, details: " + error.message || 'Failed to update company' }, { status: 500 })
    }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {

    try {
        await dbConnect();
        const { id } = params;
        const company = await Company.findByIdAndDelete(id);
        if (!company) NextResponse.json({ error: 'Company not found' }, { status: 404 })
    } catch (error: any) {
        return NextResponse.json(
            {
                error: error.message
                    ? `Failed to delete company, details: ${error.message}`
                    : 'Failed to delete company'
            },
            { status: 500 })
    }

}
