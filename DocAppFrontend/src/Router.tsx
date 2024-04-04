import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import LoginSignup from './pages/LoginSignup/LoginSignup';
import HomePage from './pages/HomePage/HomePage';
import { ColorSchemeToggle } from './components/ColorSchemeToggle/ColorSchemeToggle';


const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage/>,
    children : [
      {
        path: '/',
        element: <ColorSchemeToggle/>
      }
      
    ]
  },
  {
    path: '/login-signup',
    element: <LoginSignup/> ,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
