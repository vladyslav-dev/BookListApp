import Filter  from './parts/Filter'
import Button from '../ui/Button'
import Table from '../ui/Table'
import { useNavigate } from 'react-router-dom'
import NumberOfRecords from './parts/NumberOfRecords'
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
        <div>
            <Filter activeFilter={activeFilter} handleFilterChange={handleFilterChange} />
            <Button onClick={onAddBookClick}>Add book</Button>
            <NumberOfRecords records={getNumberOfRecords()} />
            <Table {...getTableConfig()} />
        </div>
    )
}

export default BookTable