import Button from '@/components/Button'
import Filter from '@/components/Filter'
import Table from '@/components/Table'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const navigate = useNavigate();
  

  const config = {
    data: [
        {
            "AUTHOR-COL": "F. Scott Fitzgerald",
            "CATEGORY-COL": "Fiction",
            "ISBN-COL": "9780743273565",
            "ACTION": "book-id-123321"
        },
        {
            "AUTHOR-COL": "Harper Lee",
            "CATEGORY-COL": "Fiction",
            "ISBN-COL": "9780061120084",
            "ACTION": "book-id-123322342341"
        },
        {
            "AUTHOR-COL": "J.D. Salinger",
            "CATEGORY-COL": "Fiction",
            "ISBN-COL": "9780316769488",
            "ACTION": "book-id-1233342421"
        },
    ],
    columns: [
        {
            name: "AUTHOR-COL",
            label: "Author",
        },
        {
            name: "CATEGORY-COL",
            label: "Category",
        },
        {
            name: "ISBN-COL",
            label: "ISBN",
        },
        {
            name: "ACTION",
            label: "Action",
            render: (row: string) => {
                return (
                    <button onClick={() => console.log(row)}>Click me</button>
                )
            },
        },
    ]
}
    const onAddBookClick = () => {
        navigate('/book-form')
    }

  return (
    <div>
        <Filter />
        <Button onClick={onAddBookClick}>Add book</Button>
       <Table data={config.data} columns={config.columns} />
    </div>
    
  )
}

export default Dashboard