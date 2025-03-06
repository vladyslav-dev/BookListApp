import Filter  from './BookTableFilter'
import Button from '../ui/Button'
import Table from '../ui/Table'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Book, BookFilterOptions, BookStatus, TableColumnsEnum } from '@/types/books'
import { deactivateBook, deleteBook, getAllBooks, getBooksByStatus, reactivateBook } from '@/services/books'
import { formatDate } from '@/types/date'

const BookTable = () => {
    const navigate = useNavigate();
    const [books, setBooks] = useState<Book[]>([])
    const [activeFilter, setActiveFilter] = useState<BookFilterOptions>(BookFilterOptions.ALL)
    const handleFilterChange = (filter: BookFilterOptions) => {
        setActiveFilter(filter as BookFilterOptions)

        fetchBooks(filter)
    }

    useEffect(() => {
        fetchBooks(activeFilter)
    }, [])

    const fetchBooks = async (filter: BookFilterOptions) => {
        try {
            let books = []
            if (filter === BookFilterOptions.ALL) {
                books = await getAllBooks()
            } else {
                const status = filter as unknown as BookStatus
                books = await getBooksByStatus(status)
            }
            setBooks(books)
        } catch (error) {
            console.error('Failed to fetch books:', error)
        }
    }

    const onBookEdit = (id: string) => {
        navigate(`/book-form?id=${id}`)
    }

    const onBookDelete = async (id: string) => {
        try {
            deleteBook(id)
        } catch (error) {
            console.error('Failed to delete book:', error)
        }
    }

    const onBookReactivate = async (id: string) => {
        try {
            reactivateBook(id)
        } catch (error) {
            console.error('Failed to reactivate book:', error)
        }
    }

    const onBookDeactivate = async (id: string) => {
        try {
            deactivateBook(id)
        } catch (error) {
            console.error('Failed to deactivate book:', error)
        }
    }

    const getTableConfig = () => {
        const data = books.map((book) => ({
            [TableColumnsEnum.TITLE]: book.title,
            [TableColumnsEnum.AUTHOR]: book.author,
            [TableColumnsEnum.CATEGORY]: book.category,
            [TableColumnsEnum.ISBN]: book.isbn,
            [TableColumnsEnum.CREATED_AT]: book.createdAt,
            [TableColumnsEnum.MODIFIED_AT]: book.modifiedAt,
            [TableColumnsEnum.ACTION]: book
        })) 
    
        const columns = [
            {
                name: TableColumnsEnum.TITLE,
                label: 'Title',
            },
            {
                name: TableColumnsEnum.AUTHOR,
                label: 'Author',
            },
            {
                name: TableColumnsEnum.CATEGORY,
                label: 'Category',
            },
            {
                name: TableColumnsEnum.ISBN,
                label: 'ISBN',
            },
            {
                name: TableColumnsEnum.CREATED_AT,
                label: 'Created at',
                render: (value: string) => {
                    return formatDate(value) ?? 'N/A'
                }
            },
            {
                name: TableColumnsEnum.MODIFIED_AT,
                label: 'Modified at',
                render: (value: string) => {
                    return formatDate(value) ?? 'N/A'
                }
            },
            {
                name: TableColumnsEnum.ACTION,
                label: 'Action',
                render: (row: Book) => {
                    const { id, status } = row

                    const actionName = status === BookStatus.ACTIVE ? 'Deactivate' : 'Re-Activate'
                    const action = status === BookStatus.ACTIVE ? onBookDeactivate : onBookReactivate

                    return (
                        <div className='flex space-x-8'>
                            <button onClick={() => onBookEdit(id)}>Edit</button>
                            <button onClick={() => onBookDelete(id)}>Delete</button>
                            <button onClick={() => action(id)}>{actionName}</button>
                        </div>
                    )
                },
            }
        ]

        return { data, columns }
    }

    const onAddBookClick = () => {
        navigate('/book-form')
    }

    return (
        <div>
            <Filter activeFilter={activeFilter} handleFilterChange={handleFilterChange} />
            <Button onClick={onAddBookClick}>Add book</Button>
            <Table {...getTableConfig()} />
        </div>
    )
}

export default BookTable