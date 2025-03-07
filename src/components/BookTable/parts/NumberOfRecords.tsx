import { FC } from 'react'

interface NumberOfRecordsProps {
    records: number
}

const NumberOfRecords: FC<NumberOfRecordsProps> = ({ records }) => (
    <span className='p-2 text-sm'>Total records: {records}</span>
)

export default NumberOfRecords