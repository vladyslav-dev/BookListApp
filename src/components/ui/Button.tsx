import { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'link';
}

const Button: FC<PropsWithChildren<ButtonProps>> = ({ children, variant = 'primary', ...props }) => {

  const baseStyles = 'inline-block px-4 py-2 rounded cursor-pointer';

  const variantStyles = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    link: 'bg-transparent text-blue-500 hover:text-blue-600',
  };

  const buttonStyles = `${baseStyles} ${variantStyles[variant]}`;

  return (
    <button className={buttonStyles} {...props}>{children}</button>
  )
}

export default Button