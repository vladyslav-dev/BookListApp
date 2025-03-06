import api from "@/api"
import { 
    TApiCreateBook, 
    TApiDeleteBook, 
    TApiGetBookById, 
    TApiGetBooks, 
    TApiUpdateBook, 
    TApiUpdateBookStatus 
} from "@/types/books"

export const getBooks: TApiGetBooks = async (status) => {
    const url = status ? `/books?status=${status}` : `/books`
    return api(url)
}

export const getBookById: TApiGetBookById = async (id) => {
    return api(`/books/${id}`)
}

export const createBook: TApiCreateBook = async (book) => {
    return api(`/books`, {
        method: "POST",
        body: JSON.stringify(book),
    })
}

export const updateBook: TApiUpdateBook = async (id, book) => {
    return api(`/books/${id}`, {
        method: "PUT",
        body: JSON.stringify(book),
    })
}

export const updateBookStatus: TApiUpdateBookStatus = async (id, payload) => {
    return api(`/books/${id}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
    })
}

export const deleteBook: TApiDeleteBook = async (id) => {
    return api(`/books/${id}`, {
        method: "DELETE",
    })
}