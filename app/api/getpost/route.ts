// import { NextRequest, NextResponse } from "next/server";
// import { Bounty } from "@/db/db";


// export async function GET(request: NextRequest) {
//     const bounties =  await Bounty.find();
//     return NextResponse.json(bounties)
// }

import { NextResponse } from "next/server";
import { Bounty } from "@/db/db";

export async function GET() {
  const bounties = await Bounty.find();
  const response = NextResponse.json(bounties);

  response.headers.set('Cache-Control', 'no-store');
  response.headers.set('Access-Control-Allow-Origin', '*'); // Allow all origins
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');

  return response;
}

export const revalidate = 0;
