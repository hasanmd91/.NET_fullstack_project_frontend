import React from 'react';
import useAppSelector from '../hooks/useAppSelector';

const Home = () => {
  const { currentUser } = useAppSelector((state) => state.user);

  console.log(currentUser);

  return <div>Home</div>;
};

export default Home;
