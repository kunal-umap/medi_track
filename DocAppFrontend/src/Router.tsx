import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import LoginSignup from './pages/LoginSignup/LoginSignup';


const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    children : [
      
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
