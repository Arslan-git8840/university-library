'use client';
import { PaginationWithLinks } from '@/components/pagination-with-link';
import { useSearchParams, useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import LibraryBooks from '@/components/LibraryBooks';
import { SearchBook } from '@/lib/searchBooks';
import { useState, useEffect } from 'react';
import BookCover from '@/components/BookCover2';
import Link from 'next/link';
import axios from 'axios';

export default function Library() {
    const searchParams = useSearchParams();
    const [query, setQuery] = useState("");
    const [searchResults, setSearchResults] = useState(null); // State to hold search results

    // Ensure page and pageSize have valid defaults
    const page = Number(searchParams.get("page")) || 1;
    const pageSize = Number(searchParams.get("pageSize")) || 5;
    const totalCount = 18;  // Example total count of items

    // Define page size options
    const pageSizeSelectOptions = {
        pageSizeOptions: [5, 8, 10],
        pageSizeSearchParam: 'pageSize',
    };

    // Handle search input change
    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query.trim()) {
            setSearchResults(null); // Clear search results if query is empty
            return;
        }
        console.log(query);
        try {
            const res = await SearchBook(query);
            setSearchResults(res); // Store search results in state
            console.log(res);
        } catch (error) {
            console.error("Search error:", error);
            setSearchResults({ error: "Search failed" }); // Set error in state
        }
    };

    // Reset search results when page or pageSize changes
    useEffect(() => {
        setSearchResults(null);
    }, [page, pageSize]);

    const handleClick = async () => {
        // const email = 'Johnson@lib.com';
        // const email = 'Upstash@gmail.com';

        try {
          const { data } = await axios.get(`/api/userState`);
          console.log("User status:", data.status);
          console.log(data);
        } catch (error) {
          console.error("Error fetching user status:", error);
        }
      };

    return (
        <div className="p-4">
            {/* Heading */}
            <div className="mb-8 max-w-lg mx-auto text-center" onClick={handleClick}>
                <h1 className="text-3xl font-semibold text-primary-gold">
                    <span className='mr-1'>Hey,</span>
                    <span className="text-slate-200 mt-2 text-2xl">
                        Discover a wide collection of books, authors, and categories in our library.
                    </span>
                </h1>
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex items-center mb-6 max-w-xl mx-auto">
                <div className="relative w-full">
                    <Input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search books, authors, or categories..."
                        className="text-slate-200 w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg
                                            focus:ring-2 focus:ring-primary-gold focus:border-primary-gold shadow-[0_2px_2px_5px_[#E7C9A5]]"
                    />
                    {/* Search Icon */}
                    <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <Search size={20} className="text-primary-gold cursor-pointer" />
                    </button>
                </div>
            </form>

            {/* Books List */}
            {searchResults ? (
                // Display search results
                searchResults.error ? (
                    <div>{searchResults.error}</div>
                ) : (
                    <div>
                        <p className='text-3xl font-bold text-primary-gold p-4 '>Search Results</p>
                        <div className='flex flex-wrap justify-evenly sm:gap-6 gap-0 pb-8'>
                            {searchResults.map((book) => (
                                <div key={book.title} className='lg:max-w-64 sm:w-52 w-32 whitespace-nowrap p-2 mt-2'>
                                    <Link href={`/book/${book.id}`}>
                                        <BookCover coverImage={book.coverUrl} coverColor={book.coverColor} />
                                        <div className='p-2 overflow-hidden'>
                                            <p className='text-slate-200 sm:text-sm text-xs'><span className='text-primary-gold font-semibold'>BookName: </span>{book.title}</p>
                                            <p className='text-slate-200 sm:text-sm text-xs'><span className='text-primary-gold font-semibold'>Author: </span>{book.author}</p>
                                            <p className='text-slate-200 sm:text-sm text-xs'><span className='text-primary-gold font-semibold'>Category: </span>{book.genre}</p>  </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                )
            ) : (
                // Display paginated books
                <LibraryBooks offset={(page - 1) * pageSize} limit={pageSize} />
            )}

            {/* Pagination */}
            {searchResults === null && ( // only show pagination if search results are null
                <div className='flex md:justify-end'>
                    <PaginationWithLinks
                        page={page}
                        pageSize={pageSize}
                        totalCount={totalCount}
                        pageSearchParam="page"
                    />
                </div>
            )}
        </div>
    );
}