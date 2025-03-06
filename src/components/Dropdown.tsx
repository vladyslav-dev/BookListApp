import useOnClickOutside from '@/hooks/useClickOutside'
import { 
    ComponentPropsWithoutRef, 
    PropsWithChildren, 
    createContext, 
    useContext, 
    useState,
    FC
} from 'react'

interface DropdownContextType {
    isOpen: boolean
    toggle: () => void
    close: () => void
}

const DropdownContext = createContext<DropdownContextType | null>(null)

interface DropdownProps extends ComponentPropsWithoutRef<"div"> {}

interface DropdownComponent extends FC<DropdownProps> {
    Button: typeof DropdownButton;
    Menu: typeof DropdownMenu;
    Item: typeof DropdownItem;
}

const Dropdown: DropdownComponent = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => setIsOpen(!isOpen)
    const close = () => setIsOpen(false)

    const conatinerRef = useOnClickOutside(close)

    return (
        <span ref={conatinerRef}>
            <DropdownContext.Provider value={{ isOpen, toggle, close }}>
                {children}
            </DropdownContext.Provider>
        </span>
    )
}

const DropdownButton: FC<PropsWithChildren<{}>> = ({ children }) => {
    const { toggle } = useContext(DropdownContext)!

    return <button onClick={toggle} className='px-4 py-2 bg-blue-500 text-white rounded cursor-pointer'>{children}</button>
}

const DropdownMenu: FC<PropsWithChildren<{}>> = ({ children }) => {
    const { isOpen } = useContext(DropdownContext)!
    
    return isOpen ? <div className='absolute mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg'>{children}</div> : null
}

const DropdownItem: FC<PropsWithChildren<{
    onClick: () => void
}>> = ({ children, onClick }) => {
    const { close } = useContext(DropdownContext)!
    const handleClick = () => {
        onClick()
        close()
    }
    return <div className='px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer' onClick={handleClick}>{children}</div>
}

Dropdown.Button = DropdownButton;
Dropdown.Menu = DropdownMenu;
Dropdown.Item = DropdownItem;

export default Dropdown