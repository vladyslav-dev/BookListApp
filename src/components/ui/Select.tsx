import { FC, SelectHTMLAttributes, useState } from 'react';
import TextField from '@/components/ui/TextField';
import useOnClickOutside from '@/hooks/useClickOutside';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    name?: string;
    label?: string;
    error?: string;
    defaultValue?: string;
    options: { value: string; label: string }[];
    className?: string;
}

const Select: FC<SelectProps> = ({ label, error, options, className, name, defaultValue, ...props }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [inputValue, setInputValue] = useState(defaultValue)
    const [filteredOptions, setFilteredOptions] = useState(options)
    const outsideRef = useOnClickOutside(() => setIsOpen(false))

    const getFilteredOptions = (value?: string) => {
        if (!value) return options;
        return options.filter((option) =>
            option.label.toLowerCase().includes(value.toLowerCase())
        );
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value)
    
        const filtered = getFilteredOptions(value)
        
        setFilteredOptions(filtered)
    
        setIsOpen(filtered.length > 0)
    };

    const handleSelect = (option: { value: string; label: string }) => {
        setInputValue(option.label)
        setIsOpen(false)
    };

    const handleInputFocus = () => {
        const filtered = getFilteredOptions(inputValue)
        setIsOpen(filtered.length > 0)
    }

    return (
        <div className='mb-4 relative'>
            {label && (
                <label htmlFor={props.id} className='block text-sm font-medium text-gray-700'>
                    {label}
                </label>
            )}
            <div ref={outsideRef}>
                <TextField
                    name={name}
                    value={inputValue}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    className={`mt-1 block w-full px-3 py-2 border ${
                    error ? 'border-red-500' : 'border-gray-300'
                    } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                    className || ''
                    }`}
                >
                    {isOpen && (
                        <div className='absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto'>
                        {filteredOptions.map((option) => (
                            <div
                                key={option.value}
                                className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
                                onClick={() => handleSelect(option)}
                            >
                            {option.label}
                            </div>
                        ))}
                        </div>
                    )}
                </TextField>
            </div>
            {error && <p className='mt-1 text-sm text-red-500'>{error}</p>}
        </div>
    );
};

export default Select