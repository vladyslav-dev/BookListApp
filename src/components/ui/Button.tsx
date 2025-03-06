import { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: FC<PropsWithChildren<ButtonProps>> = ({ children, ...props }) => {
  return (
    <button className='inline-block px-4 py-2 bg-blue-500 text-white rounded cursor-pointer' {...props}>{children}</button>
  )
}

export default Button