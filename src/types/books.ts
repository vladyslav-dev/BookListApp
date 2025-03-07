export enum BookStatus {
    ACTIVE = 'Active',
    DEACTIVATED = 'Deactivated',
}

export enum BookFilterOptions {
    ALL = 'All',
    ACTIVE = 'Active',
    DEACTIVATED = 'Deactivated'
}

export enum TableColumnsEnum {
    TITLE = 'Title',
    AUTHOR = 'Author',
    CATEGORY = 'Category',
    ISBN = 'ISBN',
    CREATED_AT = 'Created at',
    MODIFIED_AT = 'Modified at',
    ACTION = 'Action'
}

export interface Book {
    id: string
    title: string
    author: string
    category: string
    isbn: string
    createdAt: string
    modifiedAt: string
    status: BookStatus
}

export interface BookFormData extends Omit<Book, 'id' | 'createdAt' | 'modifiedAt' | 'status'> {}

export interface BookList {
    books: Book[]
}

// API types

export type TApiGetBooks = (status?: BookStatus) => Promise<Book[]>

export type TApiGetBookById = (id: string) => Promise<Book>

export type TApiCreateBook = (book: Book) => Promise<Book>

export type TApiUpdateBook = (id: string, book: Book) => Promise<Book>

export type TApiUpdateBookStatus = (id: string, payload: { status: BookStatus }) => Promise<Book>

export type TApiDeleteBook = (id: string) => Promise<void>


// Service types

export type TServiceGetAllBooks = () => Promise<Book[]>

export type TServiceGetBooksByStatus = (status: BookStatus) => Promise<Book[]>

export type TServiceCreateBook = (bookForm: BookFormData) => Promise<Book> 

export type TServiceGetBookById = (id: string) => Promise<Book>

export type TServiceEditeBook = (book: Book) => Promise<Book>

export type TServiceUpdateBookStatus = (id: string, bookStatus: BookStatus) => Promise<Book>

export type TServiceDeactivateBook = (id: string) => Promise<Book>

export type TServiceReactivateBook = (id: string) => Promise<Book>

export type TServiceDeleteBook = (id: string) => Promise<void>