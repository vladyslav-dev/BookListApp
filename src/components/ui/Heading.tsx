import { FC } from 'react'

interface HeadingProps {
    text: string
}
const Heading: FC<HeadingProps> = ({ text }) => {
  return (
    <h1 className='text-4xl font-bold text-gray-800 p-4'>{text}</h1>
  )
}

export default Heading