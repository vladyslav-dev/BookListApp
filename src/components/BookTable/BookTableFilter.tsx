import { FC } from 'react'
import Dropdown from '../ui/Dropdown'
import { BookFilterOptions } from '@/types/books'


interface BookTableFilterProps {
    activeFilter: string
    handleFilterChange: (filter: BookFilterOptions) => void
}

const BookTableFilter: FC<BookTableFilterProps> = ({
    activeFilter,
    handleFilterChange
}) => {
    return (
        <Dropdown>
            <Dropdown.Button>Filter By &#8226; {activeFilter}</Dropdown.Button>
            <Dropdown.Menu>
                {Object.values(BookFilterOptions).filter((f) => f !== activeFilter).map((filter) => (
                    <Dropdown.Item key={filter} onClick={() => handleFilterChange(filter)}>{filter}</Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default BookTableFilter