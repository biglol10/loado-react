import React, { useState, useEffect } from 'react';
import {
  Menu,
  Header,
  Icon,
  Popup,
  Button,
  Modal,
  Divider,
} from 'semantic-ui-react';
import cookie from 'js-cookie';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { backendUrl, axiosConfig, axiosConfigAuth } from '../Utils/ConstVar';

import HistoryModal from '../Nav/HistoryModal';
import ChangePosition from '../HomeSubComp/ChangePosition';

import './NavHeader.css';

function NavHeaderMobile() {
  let userIdString = cookie.get('loadoUserCookie');
  let userValue = userIdString && JSON.parse(userIdString);
  const history = useHistory();

  const [showUpdateHistoryModal, setShowUpdateHistoryModal] = useState(false);
  const [changeRowModal, setChangeRowModal] = useState(false);
  const [open, setOpen] = useState(false);

  const [noticeAlert, setNoticeAlert] = useState(false);

  const [mobileSize, setMobileSize] = useState(false);

  const logoutUser = (userId) => {
    cookie.set('loginId', userId);
    cookie.remove('loadoUserCookie');
    cookie.remove('loadoUserToken');
    cookie.remove('token');
    history.push('/login');
  };

  const restValueBatch = async () => {
    let searchString = `${backendUrl}/loado/api/homeworks/loadoupdatepersonal`;
    axios
      .post(searchString, {}, axiosConfig)
      .then((response) => {
        window.location.reload();
      })
      .catch((err) => {
        alert('휴식게이지를 반영하지 못했습니다');
      });
  };

  const openChangeRowModal = () => {
    setOpen(false);
    setChangeRowModal(true);
  };

  const changeNotificationToFalse = async () => {
    await axios
      .post(
        `${backendUrl}/loado/api/users/changeNotification`,
        {},
        axiosConfigAuth(cookie.get('loadoUserToken'))
      )
      .then((response) => {
        if (response.data.success) return;
      })
      .catch((err) => {
        return;
      });
  };

  useEffect(() => {
    async function checkNewlyUpdate() {
      const axiosResult = await axios
        .post(
          `${backendUrl}/loado/api/users/checkNotification`,
          {},
          axiosConfigAuth(cookie.get('loadoUserToken'))
        )
        .then((response) => {
          if (response.data.success) setNoticeAlert(response.data.newNotice);
        })
        .catch((err) => {
          setNoticeAlert(false);
        });
    }
    checkNewlyUpdate();
  }, []);

  return (
    <>
      <Menu
        style={{
          background: '-webkit-linear-gradient(right, #da0050, #8e2b88)',
          height: '6vh',
          borderRadius: '0px',
          marginBottom: '0px',
          width: '100%',
        }}
        borderless
      >
        <Menu.Item>
          <Header
            size='large'
            id='navTitleMobile'
            onClick={() =>
              window.open(
                'https://github.com/biglol10/loado-react/blob/main/README.md'
              )
            }
          >
            <span style={{ fontStyle: 'italic' }}>
              <Icon name='game' />
              LoaDo
            </span>
          </Header>
        </Menu.Item>
        <Menu.Item style={{ marginLeft: 'auto' }}>
          <Popup
            on='click'
            position='top right'
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={
              <Header
                size='small'
                style={{
                  color: 'white',
                  padding: '0 50px',
                  display: 'flex',
                  cursor: 'pointer',
                }}
              >
                <Icon name='user' />
                {userValue && userValue.userName}
              </Header>
            }
          >
            <p>개인휴식게이지 반영</p>
            <Button
              color='teal'
              content='휴게반영'
              onClick={() => restValueBatch()}
            />
            <Divider />
            <p>로그아웃 하시겠습니까?</p>
            <Button
              color='red'
              content='로그아웃'
              onClick={() => logoutUser(userValue.userId)}
            />
          </Popup>
        </Menu.Item>
      </Menu>

      {showUpdateHistoryModal && (
        <HistoryModal
          showUpdateHistoryModal={showUpdateHistoryModal}
          setShowUpdateHistoryModal={setShowUpdateHistoryModal}
          setNoticeAlert={setNoticeAlert}
          changeNotificationToFalse={changeNotificationToFalse}
        />
      )}

      {changeRowModal && (
        <ChangePosition
          changeRowModal={changeRowModal}
          setChangeRowModal={setChangeRowModal}
        />
      )}
    </>
  );
}

export default NavHeaderMobile;
