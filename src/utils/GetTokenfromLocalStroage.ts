const GetTokenfromLocalStroage = () => {
  const token = localStorage.getItem('accessToken');
  if (token === null || token === undefined) {
    return null;
  }
  return token;
};

export default GetTokenfromLocalStroage;
