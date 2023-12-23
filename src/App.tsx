import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';

import Home from './pages/Home';
import Root from './pages/Root';
import ProductList from './pages/ProductList';
import ProductDetails from './pages/ProductDetails';
import Login from './pages/Login';
import UserRegister from './pages/UserRegister';
import Cart from './pages/Cart';
import About from './pages/About';
import AdminDashbord from './pages/AdminDashbord';
import AdminAuthGuard from './components/AuthGuards/AdminAuthGuard';
import CustomerAuthGuard from './components/AuthGuards/CustomerAuthGuard';
import Profile from './pages/Profile';

const App = () => {
  const methods = useForm();

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      children: [
        {
          path: '',
          element: <Home />,
        },
        {
          path: '/about',
          element: <About />,
        },
        {
          path: '/products',
          element: <ProductList />,
        },
        {
          path: '/products/:id',
          element: <ProductDetails />,
        },
        {
          path: '/login',
          element: <Login />,
        },
        {
          path: '/register',
          element: <UserRegister />,
        },
        {
          path: '/cart',
          element: <Cart />,
        },
        {
          path: '/admidashbord',
          element: <AdminDashbord />,
        },
      ],
    },
  ]);

  return (
    <FormProvider {...methods}>
      <RouterProvider router={router} />;
    </FormProvider>
  );
};

export default App;
