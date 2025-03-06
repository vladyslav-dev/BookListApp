export enum BookStatus {
    ACTIVE = "ACTIVE",
    DEACTIVATED = "DEACTIVATED",
}

export interface Book {
    id: string;
    title: string;
    author: string;
    category: string;
    isbn: string;
    createdAt: string;
    modifiedAt: string;
    status: BookStatus;
}

export interface BookList {
    books: Book[];
}