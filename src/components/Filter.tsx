import React from 'react'
import Dropdown from './Dropdown'

enum FilterOptions {
    ALL = 'All',
    ACTIVE = 'Active',
    DEACTIVATED = 'Deactivated'
}

const Filter = () => {
    const [activeFilter, setActiveFilter] = React.useState<FilterOptions>(FilterOptions.ALL)

    const handleFilterChange = (filter: FilterOptions) => {
        setActiveFilter(filter as FilterOptions)
    }

    return (
        <Dropdown>
            <Dropdown.Button>Filter By &#8226; {activeFilter}</Dropdown.Button>
            <Dropdown.Menu>
                {Object.values(FilterOptions).filter((f) => f !== activeFilter).map((filter) => (
                    <Dropdown.Item key={filter} onClick={() => handleFilterChange(filter)}>{filter}</Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default Filter