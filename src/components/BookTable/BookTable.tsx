import { useNavigate } from 'react-router-dom'
import Filter  from '@/components/BookTable/parts/Filter'
import Button from '@/components/ui/Button'
import Table from '@/components/ui/Table'
import NumberOfRecords from '@/components/BookTable/parts/NumberOfRecords'
import useTableData from '@/hooks/useTableData'

const BookTable = () => {
    const navigate = useNavigate();
    const { books, activeFilter, handleFilterChange, getTableConfig } = useTableData()

    const onAddBookClick = () => {
        navigate('/book-form')
    }

    const getNumberOfRecords = () => {
        return books.length || 0
    }

    return (
        <div className='h-full flex flex-col max-h-[80vh] overflow-auto relative'>
            <div className='flex justify-between items-center px-4 sticky top-0 bg-white z-10'>
                <div className='flex items-center space-x-4'>
                    <Filter activeFilter={activeFilter} handleFilterChange={handleFilterChange} />
                    <Button onClick={onAddBookClick}>Add book</Button>
                </div>
                <NumberOfRecords records={getNumberOfRecords()} />
            </div>
            
            <div className='p-4'>
                <Table {...getTableConfig()} />
            </div>
        </div>
    )
}

export default BookTable