'use client';
import { SearchIcon } from 'lucide-react'
import React, { useState } from 'react'
import { Input } from './ui/input'
import { SearchBook } from '@/lib/searchBooks';

const Search = () => {

    const [query, setQuery] = useState("");
    const [searchResults, setSearchResults] = useState(null); // State to hold search results

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

    return (
        <div className="relative w-full lg:ml-[12%] ml-[10%]" searchResults={searchResults}>
            <form onSubmit={handleSearch}>
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                <Input
                    className="ld:w-96 w-[90%] pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:border-blue-500"
                    placeholder="Search books..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </form>
        </div>
    )
}

export default Search