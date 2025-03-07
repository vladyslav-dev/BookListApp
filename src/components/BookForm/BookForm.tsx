import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getBookById } from '@/services/books';
import { Book } from '@/types/books';
import Form from '@/components/BookForm/parts/Form';

const BookForm = () => {
    const [book, setBook] = useState<Book | null>(null)
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id')

    useEffect(() => {
        if (id) {
            (async () => {
                try {
                    const book = await getBookById(id)
                    console.log('book', book)
                    setBook(book)
                } catch (error) {
                    console.error('error', error)
                }
            })()
        }
    }, [id])

    const getInitialState = () => {
        return {
            title: book?.title || '',
            author: book?.author || '',
            category: book?.category || '',
            isbn: book?.isbn || ''
        }
    }

    if (id && !book) {
        return <div>Loading...</div>
    }

    return (
        <div className='p-4 pt-0 max-w-[420px]'>
            <h2 className='text-2xl pb-4 z-10'>{id ? 'Edit book' : 'Add book'}</h2>
            <Form
                {...(id ? { initialState: getInitialState() } : {})}
                {...(book ? { book } : {})}
                isEdit={!!id}
            />
        </div>
    )
}

export default BookForm