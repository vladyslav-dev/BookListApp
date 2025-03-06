import { FC } from 'react'

interface NumberOfRecordsProps {
    records: number
}

const NumberOfRecords: FC<NumberOfRecordsProps> = ({ records }) => (
    <span className='bg-gray-100 p-2 text-sm'>Total records: {records}</span>
)

export default NumberOfRecords