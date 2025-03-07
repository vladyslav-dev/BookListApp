import React from 'react'

interface TableColumn {
    name: string;
    label: string;
    render?: (row: any) => React.ReactNode;
}

export interface TableProps {
    data: Record<string, any>[];
    columns: TableColumn[]
}

const Table: React.FC<TableProps> = (props) => {
    const { data, columns } = props

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr className="bg-gray-100">
                        {columns.map((column) => (
                        <th key={column.name} className="px-4 py-2 border border-gray-200">
                            {column.label}
                        </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index}>
                            {columns.map((column) => (
                                <td key={column.name} className="px-4 py-2 border border-gray-200">
                                    {column.render ? column.render(row[column.name]) : row[column.name]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Table