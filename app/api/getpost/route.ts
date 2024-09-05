import { NextRequest, NextResponse } from "next/server";
import { Bounty } from "@/db/db";

export const fetchCache = 'force-no-store'

export async function GET(request: NextRequest) {
    const bounties =  await Bounty.find();
    return NextResponse.json(bounties)
}