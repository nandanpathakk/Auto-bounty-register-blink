import { NextRequest, NextResponse } from "next/server";
import { Bounty } from "@/db/db";

export const dynamic = 'force-static'

export async function GET(request: NextRequest) {
    const bounties =  await Bounty.find();
    return NextResponse.json(bounties)
}