// import { NextRequest, NextResponse } from "next/server";
// import { Bounty } from "@/db/db";

// // export const dynamic = 'force-static'

// export async function GET(request: NextRequest) {
//     const bounties =  await Bounty.find();
//     return NextResponse.json(bounties)
// }


import { NextRequest, NextResponse } from "next/server";
import { Bounty } from "@/db/db";

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;

export async function GET(request: NextRequest) {
    try {
        const headers = new Headers();
        headers.set('Cache-Control', 'no-store, max-age=0');
        headers.set('Pragma', 'no-cache');
        headers.set('Expires', '0');

        const bounties = await Bounty.find();

        return new NextResponse(JSON.stringify(bounties), {
            status: 200,
            headers: headers,
        });
    } catch (error) {
        console.error('Error fetching bounties:', error);
        return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}