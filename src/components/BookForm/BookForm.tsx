import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getBookById } from '@/services/books';
import { Book } from '@/types/books';
import Form from './parts/Form';

const BookForm = () => {
    const [book, setBook] = useState<Book | null>(null)
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id')
    console.log('id', id)

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
        <div>
            <Form
                {...(id ? { initialState: getInitialState() } : {})}
                {...(book ? { book } : {})}
                isEdit={!!id}
            />
        </div>
    )
}

export default BookForm