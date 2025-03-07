import Button from './ui/Button'

const Footer = () => {
  return (
    <div className='p-4 bg-gray-800 text-white mt-auto'>
        <Button variant='link'>
            <a href="https://github.com/vladyslav-dev?tab=repositories" target='_blank'>Follow me on GitHub</a>
        </Button>
    </div>
  )
}

export default Footer