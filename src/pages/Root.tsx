import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import Footer from './Footer';
import Navbar from '../components/Navbar/Navbar';
import useAppDispatch from '../Hooks/useAppDispatch';
import { getLogedUserAsync } from '../redux/thunks/authMethod';
import GetTokenfromLocalStroage from '../utils/GetTokenfromLocalStroage';

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
