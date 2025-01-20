'use client';

import { useCallback } from "react";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

export function PaginationWithLinks({
    pageSizeSelectOptions,
    pageSize,
    totalCount,
    page,
    pageSearchParam,
}) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const totalPageCount = Math.ceil(totalCount / pageSize);

    const buildLink = useCallback(
        (newPage) => {
            const keyPage = pageSearchParam || "page";
            const keyPageSize = pageSizeSelectOptions?.pageSizeSearchParam || "pageSize";

            const newSearchParams = new URLSearchParams(searchParams || undefined);
            newSearchParams.set(keyPage, String(newPage));  // Set page query param
            newSearchParams.set(keyPageSize, String(pageSize));  // Set pageSize query param
            
            return `${pathname}?${newSearchParams.toString()}`;
        },
        [searchParams, pathname, pageSize, pageSearchParam, pageSizeSelectOptions]
    );

    const navToPageSize = useCallback(
        (newPageSize) => {
            const key = pageSizeSelectOptions?.pageSizeSearchParam || "pageSize";
            const newSearchParams = new URLSearchParams(searchParams || undefined);
            newSearchParams.set(key, String(newPageSize));
            newSearchParams.delete(pageSearchParam || "page");  // Clear the page number when changing page size
            router.push(`${pathname}?${newSearchParams.toString()}`);
        },
        [searchParams, pathname],
    );

    const renderPageNumbers = () => {
        const items = [];
        const maxVisiblePages = 5;

        if (totalPageCount <= maxVisiblePages) {
            for (let i = 1; i <= totalPageCount; i++) {
                items.push(
                    <PaginationItem key={i}>
                        <PaginationLink href={buildLink(i)} isActive={page === i} className="bg-primary-gold text-black">
                            {i}
                        </PaginationLink>
                    </PaginationItem>
                );
            }
        } else {
            items.push(
                <PaginationItem key={1}>
                    <PaginationLink href={buildLink(1)} isActive={page === 1} className="bg-primary-gold text-black">
                        1
                    </PaginationLink>
                </PaginationItem>
            );

            if (page > 3) {
                items.push(
                    <PaginationItem key="ellipsis-start">
                        <PaginationEllipsis className="bg-primary-gold text-slate-200" />
                    </PaginationItem>
                );
            }

            const start = Math.max(2, page - 1);
            const end = Math.min(totalPageCount - 1, page + 1);

            for (let i = start; i <= end; i++) {
                items.push(
                    <PaginationItem key={i}>
                        <PaginationLink href={buildLink(i)} isActive={page === i} className="bg-primary-gold text-black">
                            {i}
                        </PaginationLink>
                    </PaginationItem>
                );
            }

            if (page < totalPageCount - 2) {
                items.push(
                    <PaginationItem key="ellipsis-end">
                        <PaginationEllipsis className="text-slate-200" />
                    </PaginationItem>
                );
            }

            items.push(
                <PaginationItem key={totalPageCount}>
                    <PaginationLink href={buildLink(totalPageCount)} isActive={page === totalPageCount} className="bg-primary-gold text-black">
                        {totalPageCount}
                    </PaginationLink>
                </PaginationItem>
            );
        }

        return items;
    };

    return (
        <div className="flex flex-col md:flex-row items-center gap-3 w-full">
            {pageSizeSelectOptions && (
                <div className="flex flex-col gap-4 flex-1">
                    <SelectRowsPerPage
                        options={pageSizeSelectOptions.pageSizeOptions}
                        setPageSize={navToPageSize}
                        pageSize={pageSize}
                    />
                </div>
            )}
            <Pagination className={cn({ "md:justify-end": pageSizeSelectOptions })}>
                <PaginationContent className="max-sm:gap-2">
                    <PaginationItem>
                        <PaginationPrevious
                            href={buildLink(Math.max(page - 1, 1))}
                            aria-disabled={page === 1}
                            tabIndex={page === 1 ? -1 : undefined}
                            className={`bg-primary-gold text-black ${page === 1 ? "pointer-events-none opacity-50" : "hover:bg-gold-700"}`}
                        />
                    </PaginationItem>
                    {renderPageNumbers()}
                    <PaginationItem>
                        <PaginationNext
                            href={buildLink(Math.min(page + 1, totalPageCount))}
                            aria-disabled={page === totalPageCount}
                            tabIndex={page === totalPageCount ? -1 : undefined}
                            className={`bg-primary-gold text-black ${page === totalPageCount ? "pointer-events-none opacity-50" : "hover:bg-gold-700"}`}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}

// function SelectRowsPerPage({
//     options,
//     setPageSize,
//     pageSize,
// }) {
//     return (
//         <div className="flex items-center gap-4">
//             <span className="whitespace-nowrap text-sm text-gray-800">Rows per page</span>

//             <Select value={String(pageSize)} onValueChange={(value) => setPageSize(Number(value))}>
//                 <SelectTrigger>
//                     <SelectValue placeholder="Select page size">{String(pageSize)}</SelectValue>
//                 </SelectTrigger>
//                 <SelectContent>
//                     {options.map((option) => (
//                         <SelectItem key={option} value={String(option)} className="bg-primary-gold text-white hover:bg-gold-700">
//                             {option}
//                         </SelectItem>
//                     ))}
//                 </SelectContent>
//             </Select>
//         </div>
//     );
// }
