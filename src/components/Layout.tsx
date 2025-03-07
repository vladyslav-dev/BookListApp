import { FC, PropsWithChildren } from 'react'
import Footer from '@/components/Footer'

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className='min-h-screen flex flex-col'>
        {children}
        <Footer />
    </div>
  )
}

export default Layout