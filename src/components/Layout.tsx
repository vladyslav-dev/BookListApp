import { FC, PropsWithChildren } from 'react'
import Footer from '@/components/Footer'

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className='min-h-screen flex flex-col'>
        {children}
        <div className='h-[20vh] max-h-[70px] mt-auto'>
          <Footer />
        </div>
    </div>
  )
}

export default Layout