const backendUrl = process.env.REACT_APP_BACKENDURL;

const axiosConfig = {
  headers: {
    "Content-Type": "application/json",
  },
};

const axiosConfigAuth = (userCookie) => {
  const bearer = `Bearer ${userCookie}`;
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: bearer,
    },
  };
};

export { backendUrl, axiosConfig, axiosConfigAuth };
