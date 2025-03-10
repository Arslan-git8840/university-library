'use client';

import { useState } from 'react';
import { PaginationWithLinks } from '@/components/pagination-with-link';
import { useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import LibraryBooks from '@/components/LibraryBooks';


export default function Library() {
    const searchParams = useSearchParams();
    const [input, setInput] = useState("");

    const page = Number(searchParams.get("page"));
    const pageSize = Number(searchParams.get("pageSize"));
    console.log(page, pageSize);

    const totalCount = 18;  // Example total count of items

    const pageSizeSelectOptions = {
        pageSizeOptions: [5, 8, 10],
        pageSizeSearchParam: 'pageSize',
    };




    return (
        <div className="p-4">
            {/* Heading */}
            <div className="mb-8 max-w-lg mx-auto text-center">
                <h1 className="text-3xl font-semibold text-primary-gold">
                    <span className='mr-1'>Hey,</span>
                    <span className="text-slate-200 mt-2 text-2xl">
                        Discover a wide collection of books, authors, and categories in our library.
                    </span>
                </h1>
            </div>

            {/* Search Bar */}
            <div className="flex items-center mb-6 max-w-xl mx-auto">
                <div className="relative w-full">
                    <Input
                        type="text"
                        placeholder="Search books, authors, or categories..."
                        className="text-slate-200 w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-gold focus:border-primary-gold shadow-[0_2px_2px_5px_[#E7C9A5]]"
                        onChange={(e) => {
                            setInput(e.target.value);
                        }}
                    />
                    <Search
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-gold"
                        size={20}
                    />
                </div>
            </div>

            <LibraryBooks offset={(page - 1) * pageSize} limit={pageSize} />

            {/* Pagination */}
            <div className='flex md:justify-end'>
                <PaginationWithLinks
                    page={page}
                    pageSize={pageSize}
                    totalCount={totalCount}
                    pageSearchParam="page"
                />
            </div>

        </div>
    );
}
