const getTokenfromLocalStroage = () => {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    return null;
  }
  return token;
};

export default getTokenfromLocalStroage;
