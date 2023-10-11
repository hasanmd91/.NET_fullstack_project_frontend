import React, { useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import useAppDispatch from '../Hooks/useAppDispatch';
import { getLogedUserAsync } from '../redux/methods/authMethod';
import GetTokenfromLocalStroage from '../utils/GetTokenfromLocalStroage';
import Footer from './Footer';

const Root: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const Token = GetTokenfromLocalStroage();

    if (!Token) {
      return;
    } else {
      dispatch(getLogedUserAsync(Token));
    }
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Root;
