const GetTokenfromLocalStroage = () => {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    return null;
  }
  return token;
};

export default GetTokenfromLocalStroage;
