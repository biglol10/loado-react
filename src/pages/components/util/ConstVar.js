const backendUrl = process.env.REACT_APP_BACKENDURL;

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

const numberWithCommas = (x) => {
  return x ? x.toLocaleString('en-US') : 0;
};

const getLineColorFromImage = () => {
  const array = [
    '#C0392B',
    '#E74C3C',
    '#9B59B6',
    '#8E44AD',
    '#2980B9',
    '#3498DB',
    '#1ABC9C',
    '#16A085',
    '#27AE60',
    '#2ECC71',
    '#F1C40F',
    '#F39C12',
    '#E67E22',
    '#7F8C8D',
    '#34495E',
    '#2C3E50',
  ];
  const randomColor = array[Math.floor(Math.random() * array.length)];
  return randomColor;
};

export {
  backendUrl,
  axiosConfig,
  axiosConfigAuth,
  getLineColorFromImage,
  numberWithCommas,
};
