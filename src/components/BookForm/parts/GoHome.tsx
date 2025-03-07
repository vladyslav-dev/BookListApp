import Button from '@/components/ui/Button'
import { useNavigate } from 'react-router-dom'

const GoHome = () => {
    const navigate = useNavigate()

    const handleGoHome = () => {
        navigate('/dashboard')
    }
        
    return (
        <Button variant='link' onClick={handleGoHome}>
            ← Go Home
        </Button>
    )
}

export default GoHome