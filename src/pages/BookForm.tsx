import BookForm from '@/components/BookForm/BookForm'
import GoHome from '@/components/BookForm/parts/GoHome'
import Heading from '@/components/ui/Heading'

const BookFormPage = () => {
  return (
    <>
      <div className='flex justify-between items-center mb-6'>
        <Heading text="Book Form" />
        <GoHome />
      </div>
      <BookForm />
    </>
  )
}

export default BookFormPage