import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';

/* Pages */
import Dashboard from '@/pages/Dashboard'
import BookForm from '@/pages/BookForm'

const router = createBrowserRouter([
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/book-form',
    element: <BookForm />,
  },
  {
    path: '*',
    element: <Navigate to='/dashboard' />,
  },
])

const AppRouter = () => (
  <RouterProvider router={router} />
)

export default AppRouter