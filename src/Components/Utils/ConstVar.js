import cookie from 'js-cookie';

const backendUrl = 'https://loado-app.herokuapp.com';
// const backendUrl = "https://loado-backend.herokuapp.com";
// const backendUrl = 'http://localhost:5000';

const axiosConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
};

const axiosConfigAuth = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${cookie.get('loadoUserToken')}`,
  },
};

export { backendUrl, axiosConfig, axiosConfigAuth };
