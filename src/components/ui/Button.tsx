import { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'link';
  disabled?: boolean;
}

const Button: FC<PropsWithChildren<ButtonProps>> = ({ 
  children, 
  variant = 'primary', 
  disabled = false,
  ...props 
}) => {

  const baseStyles = 'inline-block px-4 py-2 rounded';

  const variantStyles = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    link: 'bg-transparent text-blue-500 hover:text-blue-600',
  };

  const disabledStyles = disabled
    ? 'opacity-50 cursor-not-allowed' // Apply these styles when the button is disabled
    : 'cursor-pointer';

  const buttonStyles = `${baseStyles} ${variantStyles[variant]}`;

  return (
    <button className={`${disabledStyles} ${buttonStyles} ${props.className ?? ''}`} {...props}>{children}</button>
  )
}

export default Button