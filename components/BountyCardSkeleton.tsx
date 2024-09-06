import { MdCurrencyExchange } from "react-icons/md";

export function BountyCardSkeleton() {
    return (
        <div className="p-2 md:p-4 bg-white shadow-sm rounded-lg border border-gray-100 flex items-center space-x-2 md:space-x-4 mb-3 md:mb-4 mx-2 md:mx-7 animate-pulse">
            
            {/* Image Placeholder */}
            <div className="relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0 bg-gray-200 rounded-md"></div>

            {/* Content */}
            <div className="flex-1 flex flex-col justify-between">
                
                {/* Title Placeholder */}
                <div className="mb-1 md:mb-2">
                    <div className="h-4 md:h-6 bg-gray-200 rounded-md w-3/4"></div>
                </div>

                {/* Description Placeholder */}
                <div className="text-gray-600 mb-1 md:mb-2">
                    <div className="h-3 md:h-5 bg-gray-200 rounded-md w-full"></div>
                    <div className="h-3 md:h-5 bg-gray-200 rounded-md w-5/6 mt-2"></div>
                </div>

                {/* Deadline and Link Placeholder */}
                <div className="flex items-center gap-3 md:gap-5">
                    <div className="h-3 md:h-4 bg-gray-200 rounded-md w-1/4"></div>
                    <div className="h-3 md:h-4 bg-gray-200 rounded-md w-1/3"></div>
                </div>
            </div>

            {/* Amount Placeholder */}
            <div className="flex items-center gap-1 md:gap-2 text-center text-sm md:text-lg font-semibold text-[#0e385a] roboto-medium right-2 md:static">
                <MdCurrencyExchange className="text-gray-200" />
                <div className="h-4 md:h-6 bg-gray-200 rounded-md w-12"></div>
                <span className="text-gray-400">USDC</span>
            </div>
        </div>
    );
}
