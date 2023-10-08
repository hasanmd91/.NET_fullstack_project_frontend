import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Home from './pages/Home';
import Root from './pages/Root';
import ProductList from './pages/ProductList';
import ProductDetails from './pages/ProductDetails';
import Login from './pages/Login';
import UserRegister from './pages/UserRegister';
import WishList from './pages/WishList';
import Cart from './pages/Cart';
import About from './pages/About';
import AdminDashbord from './pages/AdminDashbord';
import AdminAuthGurd from './utils/AdminAuthGurd';
import CustomerAuthGurd from './utils/CustomerAuthGurd';
import Profile from './pages/Profile';

const App = () => {
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
          path: '/wishlist',
          element: <WishList />,
        },
        {
          path: '/admindashbord',
          element: (
            <AdminAuthGurd>
              <AdminDashbord />
            </AdminAuthGurd>
          ),
        },

        {
          path: '/profile',
          element: (
            <CustomerAuthGurd>
              <Profile />
            </CustomerAuthGurd>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
