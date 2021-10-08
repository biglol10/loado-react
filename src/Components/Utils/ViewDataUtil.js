import axios from 'axios';
import { backendUrl, axiosConfigAuth } from './ConstVar';
import { toast } from 'react-toastify';

async function viewDataMain(
  minusOne,
  plusOne,
  plusPage,
  limit,
  activePage,
  setActivePage,
  userCookie
) {
  let searchString = `${backendUrl}/loado/api/homeworks?limit=${limit}&page=${activePage}`;

  if (minusOne) {
    searchString = `${backendUrl}/loado/api/homeworks?limit=${limit}&page=${
      activePage - 1
    }`;
    setActivePage(activePage - 1);
  } else if (plusOne) {
    searchString = `${backendUrl}/loado/api/homeworks?limit=${limit}&page=${
      Math.floor(plusPage / limit) + 1
    }`;
    setActivePage(Math.floor(plusPage / limit) + 1);
  }

  const axiosResult = await axios
    .get(searchString, axiosConfigAuth(userCookie))
    .then((response) => {
      const totalLength = response.data.totalLength;
      let setPage = 0;
      if (totalLength) {
        const totalPage =
          totalLength / limit - Math.floor(totalLength / limit) > 0
            ? Math.floor(totalLength / limit) + 1
            : Math.floor(totalLength / limit);
        setPage = totalPage;
      } else {
        setPage = 1;
      }
      return {
        viewData: response.data,
        success: true,
        setPage,
      };
    })
    .catch((err) => {
      return {
        viewData: [],
        success: true,
        setPage: 1,
      };
    });
  return axiosResult;
}

async function allViewDataMain(userCookie) {
  let searchString = `${backendUrl}/loado/api/homeworks/getAllHomework`;
  const axiosResult = await axios
    .get(searchString, axiosConfigAuth(userCookie))
    .then((response) => {
      return {
        viewData: response.data,
        success: true,
        dataLength: response.data.totalLength,
      };
    });
  return axiosResult;
}

async function applyChangesUtil(submitData, userCookie) {
  let errorOccured = false;

  for (let index = 0; index < submitData.length; index++) {
    await axios
      .put(
        `${backendUrl}/loado/api/homeworks/${submitData[index]._id}`,
        {
          data: submitData[index],
        },
        axiosConfigAuth(userCookie)
      )
      .then((response) => {})
      .catch((err) => {
        errorOccured = true;
      });
  }
  return errorOccured;
}

async function getUserCheckBoxConfiguration(userCookie) {
  const result = await axios
    .get(
      `${backendUrl}/loado/api/userConfigure/viewbycheckbox`,
      axiosConfigAuth(userCookie)
    )
    .then((response) => {
      return response.data.viewByCheckBox;
    })
    .catch((err) => {
      return false;
    });
  return result;
}

async function changeUserCheckBoxConfiguration(viewByCheckBox, userCookie) {
  const result = await axios
    .put(
      `${backendUrl}/loado/api/userConfigure/viewbycheckbox`,
      {
        viewByCheckBox,
      },
      axiosConfigAuth(userCookie)
    )
    .then((response) => {
      return response.data.success;
    })
    .catch((err) => {
      return false;
    });
  return result;
}

function alarmRestValueUtil(todoList, alarmTrue) {
  let alarmList = [];
  let alarm = false;

  // 알람 중지
  if (!alarmTrue) {
    alarmList = todoList.map((item, idx) => {
      item.alarmCharacter = false;
      return item;
    });
    alarm = true;
  }
  // 알람 온
  else {
    alarmList = todoList.map((item, idx) => {
      if (
        item.chaosRestValue >= 40 ||
        item.guardianRestValue >= 40 ||
        item.eponaRestValue >= 60
      ) {
        item.alarmCharacter = true;
      }
      return item;
    });
    alarm = false;
  }
  return {
    alarmList,
    alarm,
  };
}

function toastMessage(msg, type, deviceType = 'notMobile') {
  if (deviceType === 'mobile') {
    alert('came to mobile');
    if (type === 'error') {
      return toast.error(msg, {
        position: toast.POSITION.TOP_LEFT,
      });
    } else if (type === 'info') {
      return toast.info(msg, {
        position: toast.POSITION.TOP_LEFT,
      });
    }
  } else {
    alert('came to not mobile');
    if (type === 'error') {
      return toast.error(msg, {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    } else if (type === 'info') {
      return toast.info(msg, {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    }
  }
}

async function updateProfilePic(profilePic, userCookie) {
  const result = await axios
    .post(
      `${backendUrl}/loado/api/userConfigure/uploadProfilePic`,
      {
        profilePic,
      },
      axiosConfigAuth(userCookie)
    )
    .then((response) => {
      return response.data.success;
    })
    .catch((err) => {
      return false;
    });
  return result;
}

function waitForSomeTime(timeToDelay) {
  return new Promise((resolve) => setTimeout(resolve, timeToDelay));
}

export {
  viewDataMain,
  allViewDataMain,
  applyChangesUtil,
  alarmRestValueUtil,
  toastMessage,
  getUserCheckBoxConfiguration,
  changeUserCheckBoxConfiguration,
  updateProfilePic,
  waitForSomeTime,
};
