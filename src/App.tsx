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
import AdminDashbord from './pages/AdminPages/Dashbord';
import AdminAuthGuard from './components/AuthGuards/AdminAuthGuard';
import CustomerAuthGuard from './components/AuthGuards/CustomerAuthGuard';
import Profile from './pages/UserPages/Profile';
import AdminRoot from './pages/AdminPages/AdminRoot';
import AddCategory from './pages/AdminPages/AddCategory';
import CategoryList from './pages/AdminPages/CategoryList';
import AdminProductList from './pages/AdminPages/ProductList';
import Checkout from './pages/Checkout';
import OrderList from './pages/AdminPages/OrderList';
import UserList from './pages/AdminPages/UserList';

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
          path: '/checkout',
          element: <Checkout />,
        },
        {
          path: '/admidashbord',
          element: (
            <AdminAuthGuard>
              <AdminRoot />
            </AdminAuthGuard>
          ),

          children: [
            { index: true, element: <AdminDashbord /> },
            { path: 'addCategory', element: <AddCategory /> },
            { path: 'allCategory', element: <CategoryList /> },
            { path: 'allproduct', element: <AdminProductList /> },
            { path: 'allOrders/', element: <OrderList /> },
            { path: 'allUserList/', element: <UserList /> },
          ],
        },
        {
          path: '/profile/:id',
          element: (
            <CustomerAuthGuard>
              <Profile />
            </CustomerAuthGuard>
          ),
        },
      ],
    },
  ]);

  return (
    <FormProvider {...methods}>
      <RouterProvider router={router} />
    </FormProvider>
  );
};

export default App;
