"use client";

import { Url } from "next/dist/shared/lib/router/router";

export interface BountyCardprops {
    title: string;
    description: string;
    amount: number;
    deadline: string;
    link?: string
}

export function BountyCard({ title, description, amount, deadline, link }: BountyCardprops) {
    return (
        <div className="p-6 bg-white shadow-md rounded-lg border border-gray-200">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Bounties</h2>
            <div className="space-y-2">
                <div className="text-lg font-medium text-gray-700">{title}</div>
                <div className="text-gray-600">{description}</div>
                <div className="text-sm text-gray-500">Amount: {amount} USDC</div>
                <div className="text-sm text-gray-500">Deadline: {new Date(deadline).toLocaleDateString()}</div>
                <div className="text-sm text-gray-500">{link}</div>
            </div>
        </div>
    );
}
