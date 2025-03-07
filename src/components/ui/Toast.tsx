import { createContext, FC, PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { v4 as uuidv4 } from 'uuid';

type ToastType = 'success' | 'error';

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
}

interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type: ToastType) => void;
}

export const ToastContext = createContext<ToastContextType | null>(null);

export const ToastProvider: FC<PropsWithChildren> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (message: string, type: ToastType) => {
    const id = uuidv4();
    setToasts((prevToasts) => [...prevToasts, { id, message, type }]);

    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }, 3000);
  };

  const removeToast = useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className='fixed bottom-4 right-4 z-50'>
        {toasts.map((toast) => (
          <Toast key={toast.id} message={toast.message} type={toast.type} onClose={() => removeToast(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
    useEffect(() => {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
  
      return () => clearTimeout(timer);
    }, [onClose]);
  
    const bgColor = type === 'success' ? 'bg-green-600' : 'bg-red-600';
    const progressColor = type === 'success' ? 'bg-green-300' : 'bg-red-300';
  
    return createPortal(
        <div className={`fixed top-4 right-4 p-4 rounded-md text-white ${bgColor} shadow-lg animate-toast`}>
          {message}
          <div className='absolute bottom-0 left-0 h-1 bg-white/50 w-full rounded-b-md overflow-hidden'>
            <div className={`h-full ${progressColor} animate-progress`}></div>
          </div>
        </div>,
        document.getElementById('toaster-root')!
    );
};