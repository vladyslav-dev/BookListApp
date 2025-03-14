import { FC } from 'react'
import Dropdown from '@/components/ui/Dropdown'
import { BookFilterOptions } from '@/types/books'


interface FilterProps {
    activeFilter: string
    handleFilterChange: (filter: BookFilterOptions) => void
}

const Filter: FC<FilterProps> = ({
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

export default Filter