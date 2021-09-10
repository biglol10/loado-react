import axios from 'axios';
import { backendUrl, axiosConfigAuth } from './ConstVar';
import { toast } from 'react-toastify';

async function viewDataMain(
  minusOne,
  plusOne,
  plusPage,
  limit,
  activePage,
  setActivePage
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
    .get(searchString, axiosConfigAuth)
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

async function applyChangesUtil(submitData) {
  let errorOccured = false;

  for (let index = 0; index < submitData.length; index++) {
    await axios
      .put(
        `${backendUrl}/loado/api/homeworks/${submitData[index]._id}`,
        {
          data: submitData[index],
        },
        axiosConfigAuth
      )
      .then((response) => {})
      .catch((err) => {
        errorOccured = true;
      });
  }
  return errorOccured;
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

function toastMessage(msg, type) {
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

export { viewDataMain, applyChangesUtil, alarmRestValueUtil, toastMessage };
