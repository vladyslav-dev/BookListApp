import { FC, InputHTMLAttributes, PropsWithChildren } from 'react'

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    className?: string;
}

const TextField: FC<PropsWithChildren<TextFieldProps>> = ({ 
    label, 
    error, 
    className, 
    children,
    ...props 
}) => {
    return (
        <div className="mb-4">
            {label && (
                <label htmlFor={props.id} className="block text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}
            <input
                {...props}
                className={`mt-1 block w-full px-3 py-2 border ${
                error ? 'border-red-500' : 'border-gray-300'
                } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                className || ''
                }`}
            />
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
            {children}
        </div>
    );
};

export default TextField