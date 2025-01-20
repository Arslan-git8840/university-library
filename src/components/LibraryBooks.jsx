import { useEffect, useState } from 'react';
import { getSpecificBooks } from '@/lib/drizzleActions';
import BookCover from '@/components/BookCover2';

function LibraryBooks({ offset, limit }) {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                setLoading(true); // Set loading to true before starting the fetch
                const response = await getSpecificBooks(offset, limit);
                console.log(response)
                setBooks(response?.data); // Store the fetched books in state
            } catch (err) {
                setError(err); // If an error occurs, store it in state
            } finally {
                setLoading(false); // Set loading to false after fetch is complete
            }
        };

        fetchBooks();
    }, [offset, limit]); // Re-run this effect when `offset` or `limit` change

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h1>Library Books</h1>
            <div className='flex flex-wrap justify-evenly gap-6 pb-8'>
                {books.map((book) => (
                    <div key={book.title} className='lg:max-w-64 sm:w-52 w-48 whitespace-nowrap p-2 mt-2'>
                        <BookCover coverImage={book.coverUrl} coverColor={book.coverColor} />
                        <div className='p-2 overflow-hidden'>
                            <p className='text-slate-200 text-sm'><span className='text-primary-gold font-semibold'>BookName: </span>{book.title}</p>
                            <p className='text-slate-200 text-sm'><span className='text-primary-gold font-semibold'>Author: </span>{book.author}</p>
                            <p className='text-slate-200 text-sm'><span className='text-primary-gold font-semibold'>Category: </span>{book.genre}</p>  </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default LibraryBooks;
