import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/styles/index.css'
import AppRouter from '@/AppRouter.tsx'
import Layout from './components/Layout'
import { ToastProvider } from './components/ui/Toast'

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <Layout>
      <ToastProvider>
        <AppRouter />
      </ToastProvider>
    </Layout>
  // </StrictMode>,
)