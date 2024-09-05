"use client";

import { MdCurrencyExchange } from "react-icons/md";
import { GrCurrency } from "react-icons/gr";
import Image from "next/image";
import { useState } from "react";

export interface BountyCardprops {
    _id?:any
    title: string;
    description: string;
    amount: number;
    deadline: string;
    link?: string;
}

export function BountyCard({ title, description, amount, deadline, link }: BountyCardprops) {
    // Limit the initial characters shown
    const visibleChars = 100;
    const visibleCharsLink = 25;
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="p-4 bg-white shadow-sm rounded-lg border border-gray-100 flex items-center space-x-4 mb-4 mx-7">
            <div className="relative w-24 h-24 flex-shrink-0">
                <Image
                    src="/hero.jpg" // Placeholder image, replace with actual image URL if available
                    alt="Bounty Image"
                    layout="fill"
                    className="object-cover rounded-md"
                    sizes=""
                />
            </div>
            <div className="flex-1 flex flex-col justify-between">
                <div className="mb-2">
                    <div className="text-black text-lg font-bold montserrat">
                        {title}
                    </div>
                </div>
                <div
                    className="text-gray-600 mb-2 relative"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <span className="roboto-regular">
                        {description.length > visibleChars
                            ? description.substring(0, visibleChars) + "..."
                            : description}
                    </span>
                    {description.length > visibleChars && isHovered && (
                        <div className="absolute z-10 bg-white border border-gray-200 shadow-md p-2 mt-2 text-gray-600 rounded-md w-[60rem] roboto-regular">
                            {description}
                        </div>
                    )}
                </div>
                <div className="flex items-center gap-5">
                    <div className="text-sm text-gray-500">Due: {new Date(deadline).toLocaleDateString()}</div>
                    {link && (
                        <div className="text-[#3393a0] text-sm">
                            <a href={link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                <span >
                                    {link.length > visibleCharsLink 
                                    ? link.substring(0, visibleCharsLink) + "..."
                                    : link
                                    }
                                </span>
                            </a>
                        </div>
                    )}
                </div>
            </div>
            <div className="flex items-center gap-2 text-center text-lg font-semibold text-[#0e385a] roboto-medium">
                <MdCurrencyExchange /> {amount} <span className="text-gray-400">USDC</span> 
            </div>
        </div>
    );
}
