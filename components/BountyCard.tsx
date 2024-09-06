"use client";

import { MdCurrencyExchange } from "react-icons/md";
import Image from "next/image";
import { useState } from "react";

export interface BountyCardprops {
    _id?: any;
    title: string;
    description: string;
    amount: number;
    deadline: string;
    link?: string;
}

export function BountyCard({ title, description, amount, deadline, link }: BountyCardprops) {
    // Limit the initial characters shown (different for mobile and desktop)
    const visibleCharsMobile = 60;
    const visibleCharsDesktop = 100;
    const visibleCharsLinkMobile = 20; // Reduced characters for mobile links
    const visibleCharsLinkDesktop = 25;
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="p-2 md:p-4 bg-white shadow-sm rounded-lg border border-gray-100 flex items-center space-x-2 md:space-x-4 mb-3 md:mb-4 mx-2 md:mx-7 hover:bg-slate-50">

            
            {/* Image */}
            <div className="relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0">
                <Image
                    src="/hero.jpg" // Placeholder image, replace with actual image URL if available
                    alt="Bounty Image"
                    layout="fill"
                    className="object-cover rounded-md"
                />
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col justify-between">
                {/* Title */}
                <div className="mb-1 md:mb-2">
                    <div className="text-black text-sm md:text-lg font-bold montserrat leading-tight md:leading-normal">
                        {title}
                    </div>
                </div>

                {/* Description */}
                <div
                    className="text-gray-600 mb-1 md:mb-2 relative"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <span className="roboto-regular text-xs md:text-base leading-snug md:leading-normal"> {/* Reduced line spacing */}
                        {description.length > (window.innerWidth < 768 ? visibleCharsMobile : visibleCharsDesktop)
                            ? description.substring(0, window.innerWidth < 768 ? visibleCharsMobile : visibleCharsDesktop) + "..."
                            : description}
                    </span>
                    {description.length > (window.innerWidth < 768 ? visibleCharsMobile : visibleCharsDesktop) && isHovered && (
                        <div className="absolute z-10 bg-white border border-gray-200 shadow-md p-2 mt-2 text-gray-600 rounded-md w-[90vw] md:w-[60rem] roboto-regular">
                            {description}
                        </div>
                    )}
                </div>

                {/* Deadline and Link */}
                <div className="flex items-center gap-3 md:gap-5">
                    <div className="text-xs md:text-sm text-gray-500">
                        Due: {new Date(deadline).toLocaleDateString()}
                    </div>
                    {link && (
                        <div className="text-[#3393a0] text-xs md:text-sm">
                            <a href={link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                <span>
                                    {link.length > (window.innerWidth < 768 ? visibleCharsLinkMobile : visibleCharsLinkDesktop)
                                        ? link.substring(0, window.innerWidth < 768 ? visibleCharsLinkMobile : visibleCharsLinkDesktop) + "..."
                                        : link}
                                </span>
                            </a>
                        </div>
                    )}
                </div>
            </div>

            {/* Amount */}
            <div className="flex items-center gap-1 md:gap-2 text-center text-sm md:text-lg font-semibold text-[#0e385a] roboto-medium right-2 md:static"> {/* Adjusted amount positioning */}
                <MdCurrencyExchange /> {amount} <span className="text-gray-400">USDC</span>
            </div>
        </div>
    );
}
