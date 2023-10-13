const SaveAccessToken = (accessToken: string) => {
  localStorage.setItem('accessToken', accessToken);
};

export default SaveAccessToken;
