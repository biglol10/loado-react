import React, { useState, useEffect } from "react";
import { Menu, Header, Icon, Popup, Button, Divider } from "semantic-ui-react";
import cookie from "js-cookie";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { backendUrl, axiosConfig, axiosConfigAuth } from "../Utils/ConstVar";

import HistoryModal from "../Nav/HistoryModal";
import ChangePosition from "../HomeSubComp/ChangePosition";
import ProfileModal from "../Utils/ProfileModal";

import "./NavHeader.css";

function NavHeader() {
  let userIdString = cookie.get("loadoUserCookie");
  let userValue = userIdString && JSON.parse(userIdString);
  const history = useHistory();

  const [showUpdateHistoryModal, setShowUpdateHistoryModal] = useState(false);
  const [changeRowModal, setChangeRowModal] = useState(false);
  const [profileModal, setProfileModal] = useState(false);
  const [open, setOpen] = useState(false);

  const [noticeAlert, setNoticeAlert] = useState(false);

  const logoutUser = (userId) => {
    cookie.set("loginId", userId);
    cookie.remove("loadoUserCookie");
    cookie.remove("loadoUserToken");
    cookie.remove("token");
    history.push("/login");
  };

  const restValueBatch = async () => {
    let searchString = `${backendUrl}/loado/api/homeworks/loadoupdatepersonal`;
    axios
      .post(searchString, {}, axiosConfig)
      .then((response) => {
        window.location.reload();
      })
      .catch((err) => {
        alert("휴식게이지를 반영하지 못했습니다");
      });
  };

  const openChangeRowModal = () => {
    setOpen(false);
    setChangeRowModal(true);
  };

  const openProfileModal = () => {
    setOpen(false);
    setProfileModal(true);
  };

  const changeNotificationToFalse = async () => {
    await axios
      .post(
        `${backendUrl}/loado/api/users/changeNotification`,
        {},
        axiosConfigAuth(cookie.get("loadoUserToken"))
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
          axiosConfigAuth(cookie.get("loadoUserToken"))
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
          backgroundColor: "lightcoral",
          height: "6vh",
          borderRadius: "0px",
          marginBottom: "0px",
        }}
        borderless
      >
        <Menu.Item>
          <Header
            size="large"
            id="navTitle"
            onClick={() =>
              window.open(
                "https://github.com/biglol10/loado-react/blob/main/README.md"
              )
            }
          >
            <span style={{ fontStyle: "italic" }}>
              <Icon name="game" />
              LoaDo
            </span>
          </Header>
        </Menu.Item>
        <Menu.Item>
          <Header
            size="small"
            onClick={() => setShowUpdateHistoryModal(!showUpdateHistoryModal)}
            className={noticeAlert ? "newNoticeAlert headerItem" : "headerItem"}
          >
            <Icon name="cube" />
            작업 내역
          </Header>
        </Menu.Item>
        <Menu.Item>
          <Header
            size="small"
            className="headerItem"
            onClick={() => restValueBatch()}
          >
            <Icon name="box" />
            휴식게이지반영
          </Header>
        </Menu.Item>
        <Menu.Item className="personIconItem">
          <Popup
            on="click"
            position="top right"
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={
              <Header size="small" className="personIcon">
                <Icon name="user" />
                {userValue && userValue.userName}
              </Header>
            }
          >
            <p>프로필 이미지를 바꾸시겠습니까?</p>
            <Button
              color="violet"
              content="프로필변경"
              onClick={openProfileModal}
            />
            <Divider />
            <p>케릭터 순서를 바꾸시겠습니까?</p>
            <Button
              color="blue"
              content="순서변경"
              onClick={openChangeRowModal}
            />
            <Divider />
            <p>로그아웃 하시겠습니까?</p>
            <Button
              color="red"
              content="로그아웃"
              onClick={() => logoutUser(userValue.userId)}
            />
          </Popup>
        </Menu.Item>
      </Menu>

      {profileModal && <ProfileModal />}

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

export default NavHeader;
