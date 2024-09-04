import { ActionPostResponse, ACTIONS_CORS_HEADERS, ActionError, ActionGetResponse } from "@solana/actions";
import { clusterApiUrl, Connection, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { Bounty } from "@/db/db";

export async function GET(request: Request) {
    const url = new URL(request.url);
    const iconImage = new URL("/hero.jpg", url.origin)

    console.log(url.origin)

    const payload: ActionGetResponse = {
        icon: iconImage.toString(),
        title: "Add a Bounty Program",
        description: "Submit a bounty program directly to our website.",
        label: "Submit",
        links: {
            actions: [
                {
                    label: "Submit",
                    href: `${url.href}`,
                    parameters: [
                        {
                            name: "title",
                            label: "Enter title",
                            required: true
                        },
                        {
                            name: "description",
                            label: "Enter description",
                            required: true
                        },
                        {
                            name: "amount",
                            label: "Enter bounty amount (in USDC)",
                            required: true
                        },
                        {
                            name: "deadline",
                            label: "Enter deadline for submission",
                            required: true,
                            type: "date",
                        },{
                            name: "link",
                            label:"Link to your bounty(if any)",
                            required: false,
                            type: "url"
                        }
                    ]
                }
            ]
        }
    };
    return Response.json(payload, {
        headers: ACTIONS_CORS_HEADERS
    });
}

export const OPTIONS = GET;

// const Bounty = mongoose.models.Bounty || mongoose.model("Bounty", new mongoose.Schema({
//     title: { type: String, required: true },
//     description: { type: String, required: true },
//     amount: { type: Number, required: true },
//     deadline: { type: Date, required: true },
// }));

export async function POST(request: Request) {
    try {
        // await mongoose.connect(process.env.MONGO_URI as string);


        const body = await request.json();

        // Log the received body to debug
        console.log("Received body:", body);

        // Access the nested 'data' object
        const { data, account } = body;

        // Check if all required fields are present in the 'data' object
        if (!data || !data.title || !data.description || !data.amount || !data.deadline ) {
            throw new Error("title, description, amount and deadline are required.");
        }


        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: new PublicKey(account),
                toPubkey: new PublicKey("VEaEEZZcpNm6pFY6YHEPJCgBgNHHuw1w8g5rRC8H2F7"),
                lamports: 100000000, // 0.1 SOL
            })
        )

        const blockHeight = await connection.getLatestBlockhash({ commitment: "finalized" });
        transaction.recentBlockhash = blockHeight.blockhash;
        transaction.lastValidBlockHeight = blockHeight.lastValidBlockHeight;

        transaction.feePayer = new PublicKey(account)

        // Create a new Bounty document with the data
        const bounty = new Bounty({
            title: data.title,
            description: data.description,
            amount: parseInt(data.amount, 10),
            deadline: new Date(data.deadline),
            link: data.link || "No Link Given",
        });

        console.log("Bounty to be saved:", {
            title: data.title,
            description: data.description,
            amount: parseInt(data.amount, 10),
            deadline: new Date(data.deadline),
            link: data.link,
        });
        

        await bounty.save();

        console.log("Bounty saved successfully.");


        const payload: ActionPostResponse = {
            transaction: transaction.serialize({ requireAllSignatures: false, verifySignatures: false }).toString("base64"),
            message: `Bounty "${data.title}" has been successfully posted!`,
        };

        return new Response(JSON.stringify(payload), {
            headers: ACTIONS_CORS_HEADERS,
        });
    } catch (error) {
        console.error("Error:", error);


        let actionError: ActionError = { message: "An unknown error occurred" };

        return new Response(JSON.stringify(actionError), {
            status: 400,
            headers: ACTIONS_CORS_HEADERS,
        });
    }
}
