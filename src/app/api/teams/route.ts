import { NextResponse } from "next/server";
import dbConnect from "@/db/mongoose"
import Team from "@/db/models/Team";

export async function GET() {  // get all Teams

    try {
        await dbConnect();
        const teams = await Team.find({}) //.populate('companyId managerId').lean();
        return NextResponse.json(teams);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch teams' }, { status: 500 });
    }
}

export async function POST(req: Request) { // add a new Team
    try {
        await dbConnect();
        const body = await req.json();
        if (!body.name || !body.companyId || !body.managerId) {
            return NextResponse.json(
                { error: "Fields: 'Name', 'company ID' and 'manager ID' are required" },
                { status: 400 }
            );
        };
        const nameTrimmed = body.name.trim();
        if (!nameTrimmed) {
            return NextResponse.json({ error: "Team name cannot be empty" }, { status: 400 });
        }

        const existingTeam = await Team.findOne({
            name: nameTrimmed,
            companyId: body.companyId
        }).lean();

        if (existingTeam) {
            return NextResponse.json(
                {
                    error: 'Already Exists',
                    message: 'This team name already in use'
                },
                { status: 409 }
            );
        }

        const team = new Team({
            name: nameTrimmed,
            companyId: body.companyId,
            managerId: body.managerId,
            description: body.description
        });
        const savedTeam = await team.save()
        return NextResponse.json(savedTeam, { status: 201 });

    } catch (error: any) {
        if (error.name === 'CastError') {
            return NextResponse.json(
                { error: `Invalid ID format for field: ${error.path}` },
                { status: 400 }
            );
        }
        if (error.code === 11000) {
            return NextResponse.json(
                { error: 'Team with this name already exists in this company.' },
                { status: 409 }
            );
        }
        console.error('Team creation error:', error);
        return NextResponse.json({ error: 'Failed to create team' }, { status: 500 });
    }
}