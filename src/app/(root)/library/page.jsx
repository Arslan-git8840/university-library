'use client';
import { PaginationWithLinks } from '@/components/pagination-with-link';
import { useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import LibraryBooks from '@/components/LibraryBooks';

export default function Library() {
    const searchParams = useSearchParams();

    const page = Number(searchParams.get("page"));
    const pageSize = Number(searchParams.get("pageSize"));
    console.log(page,pageSize)
    // Get page and pageSize from query params, fallback to defaults
    // const page = parseInt(searchParams.get("page")) || 1;
    // const pageSize = parseInt(searchParams.get("pageSize")) || 5;
    const totalCount = 18;  // Example total count of items

    // Define page size options for the Select dropdown
    const pageSizeSelectOptions = {
        pageSizeOptions: [5,8,10,],
        pageSizeSearchParam: 'pageSize',  // Customize the search param name if needed
    };

    return (
        <div className="p-4">
            {/* Heading */}
            <div className="mb-8 max-w-lg mx-auto text-center">
                <h1 className="text-3xl font-semibold text-primary-gold"><span className='mr-1'>Hey,</span>
                    <span className="text-slate-200 mt-2 text-2xl">Discover a wide collection of books, authors, and categories in our library.</span>
                </h1>

            </div>

            {/* Search Bar */}
            <div className="flex items-center mb-6 max-w-xl mx-auto">
                {/* Search Input */}
                <div className="relative w-full">
                    <Input
                        type="text"
                        placeholder="Search books, authors, or categories..."
                        className="text-slate-200 w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-gold focus:border-primary-gold shadow-[0_2px_2px_5px_[#E7C9A5]]"
                    />
                    {/* Search Icon */}
                    <Search
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-gold"
                        size={20}
                    />
                </div>
            </div>

            <LibraryBooks offset={(page - 1) * pageSize} limit={pageSize}/>

            {/* Pagination */}
            <div className='flex md:justify-end'>
                <PaginationWithLinks
                    page={page}
                    pageSize={pageSize}
                    totalCount={totalCount}
                    pageSearchParam="page"  // Customize the search param name if needed
                  
                />
            </div>

        </div>
    );
}
