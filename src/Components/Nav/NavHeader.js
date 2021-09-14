import React, { useState } from 'react';
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
import { backendUrl, axiosConfig } from '../Utils/ConstVar';

import HistoryModal from '../Nav/HistoryModal';
import ChangePosition from '../HomeSubComp/ChangePosition';

function NavHeader() {
  let userIdString = cookie.get('loadoUserCookie');
  let userValue = userIdString && JSON.parse(userIdString);
  const history = useHistory();

  const [showUpdateHistoryModal, setShowUpdateHistoryModal] = useState(false);
  const [changeRowModal, setChangeRowModal] = useState(false);
  const [open, setOpen] = useState(false);

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

  return (
    <>
      <Menu
        style={{
          backgroundColor: 'lightcoral',
          height: '6vh',
          borderRadius: '0px',
        }}
        borderless
      >
        <Menu.Item>
          <Header
            size='large'
            style={{ marginRight: '150px', marginLeft: '50px', color: 'white' }}
          >
            <span style={{ fontStyle: 'italic' }}>
              <Icon name='game' />
              LoaDo
            </span>
          </Header>
        </Menu.Item>
        <Menu.Item>
          <Header
            size='small'
            style={{ color: 'white', padding: '0 50px', cursor: 'pointer' }}
            onClick={() =>
              window.open(
                'https://github.com/biglol10/loado-react/blob/main/README.md'
              )
            }
          >
            <Icon name='list ul' />
            기능소개
          </Header>
        </Menu.Item>
        <Menu.Item>
          <Header
            size='small'
            style={{ color: 'white', padding: '0 50px', cursor: 'pointer' }}
            onClick={() => setShowUpdateHistoryModal(!showUpdateHistoryModal)}
          >
            <Icon name='cube' />
            작업 내역
          </Header>
        </Menu.Item>
        <Menu.Item>
          <Header
            size='small'
            style={{ color: 'white', padding: '0 50px', cursor: 'pointer' }}
            onClick={() => restValueBatch()}
          >
            <Icon name='box' />
            휴식게이지반영
          </Header>
        </Menu.Item>
        <Menu.Item style={{ marginLeft: 'auto', marginRight: '50px' }}>
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
            <p>케릭터 순서를 바꾸시겠습니까?</p>
            <Button
              color='blue'
              content='순서변경'
              onClick={openChangeRowModal}
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

export default NavHeader;
