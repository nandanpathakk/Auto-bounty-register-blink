// import { NextRequest, NextResponse } from "next/server";
// import { Bounty } from "@/db/db";


// export async function GET(request: NextRequest) {
//     const bounties =  await Bounty.find();
//     return NextResponse.json(bounties)
// }

import { NextRequest, NextResponse } from "next/server";
import { Bounty } from "@/db/db";

export async function GET(request: NextRequest) {
  const bounties = await Bounty.find();

  const response = NextResponse.json(bounties);
  response.headers.set('Cache-Control', 'no-store'); // Disable caching for this API route
  
  return response;
}
