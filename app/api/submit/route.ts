import { ActionPostResponse, ACTIONS_CORS_HEADERS, ActionError, ActionGetResponse } from "@solana/actions";
import mongoose from "mongoose";

export async function GET(request: Request) {
    const url = new URL(request.url);
    console.log(url)
    const payload: ActionGetResponse = {
        icon: "https://media.istockphoto.com/id/1359095154/photo/beagle-on-chair.jpg?s=612x612&w=0&k=20&c=fqwtWFhl9zlhvolJTzVa_gJn1v41dtdCm_6ScPiYWng=",
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
                            label: "Enter the title of the bounty",
                            required: true
                        },
                        {
                            name: "description",
                            label: "Enter the description of the bounty",
                            required: true
                        },
                        {
                            name: "amount",
                            label: "Enter the bounty amount",
                            required: true
                        },
                        {
                            name: "deadline",
                            label: "Enter the deadline for bounty submission",
                            required: true,
                            // type: "date",
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

const Bounty = mongoose.models.Bounty || mongoose.model("Bounty", new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    deadline: { type: Number, required: true }, // Fixed deadline type to be a Date
}));

export async function POST(request: Request) {
    try {
        await mongoose.connect("mongodb+srv://nandanpathak30:dbnew%40123@cluster0.dx4on7v.mongodb.net/blink_bounty");

        const body = await request.json();

        const bounty = new Bounty({
            title: body.title,
            description: body.description,
            amount: body.amount,
            deadline:body.deadline,
        });

        await bounty.save();

        const payload: ActionPostResponse = {
            transaction: "",
            message: `Bounty "${body.title}" has been successfully submitted!`,
        };

        return new Response(JSON.stringify(payload), {
            headers: ACTIONS_CORS_HEADERS,
        });
    } catch (error) {
        console.error(error);

        let actionError: ActionError = { message: "An unknown error occurred" };
        if (typeof error === "string") actionError.message = error;

        return new Response(JSON.stringify(actionError), {
            status: 400,
            headers: ACTIONS_CORS_HEADERS,
        });
    }
}
