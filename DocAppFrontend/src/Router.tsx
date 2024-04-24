import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import LoginSignup from './pages/LoginSignup/LoginSignup';
import HomePage from './pages/HomePage/HomePage';
import { ColorSchemeToggle } from './components/ColorSchemeToggle/ColorSchemeToggle';
import MedicalReport from './pages/MedicalReport/MedicalReport';
import AddReport from './pages/AddReport/AddReport';
import Diseasepredict from './pages/DiseasePredict/Diseasepredict';


const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage/>,
    children : [
      {
        path: '/theme',
        element: <ColorSchemeToggle/>
      },
      {
        path: '/',
        element: <MedicalReport/>
      },
      {
        path: '/add-report',
        element: <AddReport />
      },
      {
        path: '/disease_predict',
        element: <Diseasepredict />
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
