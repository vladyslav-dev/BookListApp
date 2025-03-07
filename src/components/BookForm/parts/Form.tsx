import { FC, useActionState, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TextField from '@/components/ui/TextField'
import Button from '@/components/ui/Button'
import Select from '@/components/ui/Select';
import { dummyCategories } from '@/constants';
import { createBook, editBook } from '@/services/books';
import { Book } from '@/types/books';
import { useToast } from '@/hooks/useToast';

interface BookFormState {
    title: string;
    author: string;
    category: string;
    isbn: string;
    errors?: {
        title?: string;
        author?: string;
        category?: string;
        isbn?: string;
    }
}

const validateForm = ({ title, author, category, isbn }: BookFormState): BookFormState['errors'] => {
    const errors: BookFormState['errors'] = {};

    if (!title) {
        errors.title = 'Title is required';
    } else if (title.length < 3) {
        errors.title = 'Title must be at least 3 characters';
    }

    if (!author) {
        errors.author = 'Author is required';
    } else if (author.length < 3) {
        errors.author = 'Author must be at least 3 characters';
    }

    if (!category) {
        errors.category = 'Category is required';
    }

    if (!isbn) {
        errors.isbn = 'ISBN is required';
    } else if (!/^\d{10,13}$/.test(isbn)) {
        errors.isbn = 'ISBN must be 10 to 13 digits';
    }

    return errors
}

type FormActionProps = (
    state: BookFormState,
    formData: FormData,
    handleRequest: (fields: BookFormState) => Promise<void>
) => Promise<BookFormState>

const formAction: FormActionProps = async (
    _, formData, 
    handleRequest
): Promise<BookFormState> => {
    const title = formData.get('title') as string;
    const author = formData.get('author') as string;
    const category = formData.get('category') as string;
    const isbn = formData.get('isbn') as string;
    const fields = { title, author, category, isbn };
    const errors = validateForm(fields);
    
    if (errors && Object.keys(errors).length > 0) {
        return { ...fields, errors }
    }

    await handleRequest(fields)

    return fields
}

interface FormProps {
    initialState?: BookFormState;
    isEdit?: boolean;
    book?: Book;
}

const Form: FC<FormProps> = ({ 
    initialState = {
        title: '',
        author: '',
        category: '',
        isbn: '',
    },
    isEdit = false,
    book
}) => {
    const navigate = useNavigate()
    const { showToast } = useToast()
    const [preventClick, setPreventClick] = useState(false)
    const formActionWrapper = async (state: BookFormState, formData: FormData) => {
        return formAction(state, formData, handleRequest)
    }
    const [state, submitAction] = useActionState(formActionWrapper, initialState)

    const handleRequest = async (newBook: BookFormState) => {
        
        try {
            if (isEdit) {
                await editBook({...book!, ...newBook});
            } else {
                await createBook(newBook);
            }
    
            onSubmitSuccess()
        } catch (error) {
            console.error('error', error)

            onSubmitFailure()
        }
    }
    const onSubmitSuccess = () => {
        setPreventClick(true)
        showToast(`Book ${isEdit ? 'updated' : 'created'} successfully. Redirect to dashboard`, 'success')
        setTimeout(() => {
            navigate(`/dashboard`)
        }, 3000)
    }

    const onSubmitFailure = () => {
        showToast(`Failed to ${isEdit ? 'update' : 'create'} book`, 'error')
    }

    return (
        <div className={`${preventClick ? 'absolute h-full w-full top-0 left-0 z-50 pointer-events-none opacity-20 bg-white-200' : ''}`}>
            <form action={submitAction}>
                <TextField 
                    name="title" 
                    label="Title" 
                    defaultValue={state.title} 
                    error={state.errors?.title} 
                />
                <TextField 
                    name="author" 
                    label="Author" 
                    defaultValue={state.author} 
                    error={state.errors?.author} 
                />
                <Select 
                    name="category" 
                    label="Category" 
                    defaultValue={state.category} 
                    options={dummyCategories} error={state.errors?.category} 
                />
                <TextField 
                    name="isbn" 
                    label="ISBN" 
                    defaultValue={state.isbn} 
                    error={state.errors?.isbn} 
                />
                <Button type='submit'>Submit</Button>
            </form>
        </div>
    )
}

export default Form