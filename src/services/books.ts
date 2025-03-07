import * as api from '@/api/books'
import { generateBookId } from '@/utils/common'
import {
    Book, 
    BookStatus, 
    TServiceCreateBook, 
    TServiceDeactivateBook, 
    TServiceDeleteBook, 
    TServiceEditeBook, 
    TServiceGetAllBooks, 
    TServiceGetBookById, 
    TServiceGetBooksByStatus, 
    TServiceReactivateBook, 
    TServiceUpdateBookStatus 
} from '@/types/books'

export const getAllBooks: TServiceGetAllBooks = async () => {
    return api.getBooks()
}

export const getBooksByStatus: TServiceGetBooksByStatus = async (status) => {
    return api.getBooks(status)
}

export const getBookById: TServiceGetBookById = async (id) => {
    return api.getBookById(id)
}

export const createBook: TServiceCreateBook = async (bookForm) => {
    const newBook: Book = {
        id: generateBookId(),
        ...bookForm,
        createdAt: new Date().toISOString(),
        modifiedAt: '--',
        status: BookStatus.ACTIVE,
    }
    return api.createBook(newBook)
}

export const editBook: TServiceEditeBook = async (book) => {
    const updatedBook: Book = {
        ...book,
        modifiedAt: new Date().toISOString(),
    }
    return api.updateBook(book.id, updatedBook)
}

export const updateBookStatus: TServiceUpdateBookStatus = async (id, bookStatus) => {
    return api.updateBookStatus(id, { status: bookStatus })
}

export const deactivateBook: TServiceDeactivateBook = async (id) => {
    return api.updateBookStatus(id, { status: BookStatus.DEACTIVATED })
}

export const reactivateBook: TServiceReactivateBook = async (id) => {
    return api.updateBookStatus(id, { status: BookStatus.ACTIVE })
}

export const deleteBook: TServiceDeleteBook = async (id) => {
    return api.deleteBook(id)
}