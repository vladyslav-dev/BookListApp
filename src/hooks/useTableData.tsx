import Button from '@/components/ui/Button'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Book, BookFilterOptions, BookStatus, TableColumnsEnum } from '@/types/books'
import { deactivateBook, deleteBook, getAllBooks, getBookById, getBooksByStatus, reactivateBook } from '@/services/books'
import { formatDate } from '@/types/date'
import { TableProps } from '@/components/ui/Table'

interface ITableData {
    books: Book[]
    activeFilter: BookFilterOptions
    handleFilterChange: (filter: BookFilterOptions) => void
    getTableConfig: () => TableProps
}

const useTableData = (): ITableData => {
    const navigate = useNavigate();
    const [books, setBooks] = useState<Book[]>([])
    const [activeFilter, setActiveFilter] = useState<BookFilterOptions>(BookFilterOptions.ALL)

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

    const handleFilterChange = (filter: BookFilterOptions) => {
        setActiveFilter(filter as BookFilterOptions)

        fetchBooks(filter)
    }

    const refetchUpdatedBook = async (id: string) => {
        try {
            const book = await getBookById(id)
            setBooks((prevBooks) => prevBooks.map((b) => (b.id === id ? book : b)))
        } catch (error) {
            console.error('Failed to fetch updated book:', error)
        }
    }

    const updateBookListAfterDelete = (deletedId: string) => {
        setBooks((prevBooks) => prevBooks.filter((b) => b.id !== deletedId))
    }

    const onBookEdit = (id: string) => {
        navigate(`/book-form?id=${id}`)
    }

    const onBookDelete = async (id: string) => {
        try {
            await deleteBook(id)
            updateBookListAfterDelete(id)
        } catch (error) {
            console.error('Failed to delete book:', error)
        }
    }

    const onBookReactivate = async (id: string) => {
        try {
            await reactivateBook(id)
            refetchUpdatedBook(id)
        } catch (error) {
            console.error('Failed to reactivate book:', error)
        }
    }

    const onBookDeactivate = async (id: string) => {
        try {
            await deactivateBook(id)
            refetchUpdatedBook(id)
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
                    const isActive = status === BookStatus.ACTIVE
                    const actionName = isActive ? 'Deactivate' : 'Re-Activate'
                    const action = isActive ? onBookDeactivate : onBookReactivate

                    return (
                        <div className='flex space-x-8'>
                            <Button variant='link' onClick={() => onBookEdit(id)}>Edit</Button>
                            <Button variant='link' onClick={() => onBookDelete(id)} disabled={isActive}>Delete</Button>
                            <Button variant='link' onClick={() => action(id)}>{actionName}</Button>
                        </div>
                    )
                },
            }
        ]

        return { data, columns }
    }

    return { 
        books, 
        activeFilter, 
        handleFilterChange, 
        getTableConfig 
    }
}

export default useTableData;