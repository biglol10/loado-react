const backendUrl = 'https://loado-app.herokuapp.com';
// const backendUrl = 'https://loado-backend.herokuapp.com';
// const backendUrl = "http://localhost:5000";

const axiosConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
};

const axiosConfigAuth = (userCookie) => {
  const bearer = `Bearer ${userCookie}`;
  return {
    headers: {
      'Content-Type': 'application/json',
      Authorization: bearer,
    },
  };
};

export { backendUrl, axiosConfig, axiosConfigAuth };
