import BookForm from '@/components/BookForm/BookForm'
import GoHome from '@/components/BookForm/parts/GoHome'
import Heading from '@/components/ui/Heading'
import React from 'react'

const BookFormPage = () => {
  return (
    <div>
      <div className='flex justify-between items-center mb-6'>
        <Heading text="Book Form" />
        <GoHome />
      </div>
      <BookForm />
    </div>
  )
}

export default BookFormPage