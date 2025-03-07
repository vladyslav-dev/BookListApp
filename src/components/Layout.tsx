import { FC, PropsWithChildren } from 'react'

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className='min-h-screen p-4'>
        {children}
    </div>
  )
}

export default Layout