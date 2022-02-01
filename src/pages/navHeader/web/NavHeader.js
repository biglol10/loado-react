import React, { useState, useEffect } from "react";
import {
  Menu,
  Header,
  Icon,
  Popup,
  Button,
  Divider,
  Image,
  Card,
  Label,
} from "semantic-ui-react";
import cookie from "js-cookie";
import { useHistory } from "react-router-dom";
import axios from "axios";
import {
  backendUrl,
  axiosConfig,
  axiosConfigAuth,
} from "../../components/util/ConstVar";

import HistoryModal from "../../components/updatehistory/HistoryModal";
import ChangePosition from "../../components/characterRelated/ChangePosition";
import ProfileModal from "../../components/util/ProfileModal";

import "./NavHeader.css";

function NavHeader() {
  let userIdString = cookie.get("loadoUserCookie");
  let userValue = userIdString && JSON.parse(userIdString);
  const history = useHistory();

  const [accountUser, setAccountUser] = useState(null);

  const [showUpdateHistoryModal, setShowUpdateHistoryModal] = useState(false);
  const [changeRowModal, setChangeRowModal] = useState(false);
  const [profileModal, setProfileModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [openAdditionalMenu, setOpenAdditionalMenu] = useState(false);

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
          if (response.data.success) {
            setNoticeAlert(response.data.user.newNotice);
            setAccountUser(response.data.user);
          }
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
          background: "-webkit-linear-gradient(right, #da0050, #8e2b88)",
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
          <Popup
            on="click"
            position="top right"
            onClose={() => setOpenAdditionalMenu(false)}
            onOpen={() => setOpenAdditionalMenu(true)}
            open={openAdditionalMenu}
            trigger={
              <Header size="small" className="headerItem">
                <Icon name="chevron circle down" />
                추가기능
              </Header>
            }
          >
            <Menu vertical>
              <Menu.Item
                name="inbox"
                onClick={() => history.push("/itemPrice")}
              >
                <Label color="teal">
                  <Icon name="line graph" />
                </Label>
                아이템시세
              </Menu.Item>
              <Menu.Item
                name="inbox"
                onClick={() => history.push("/itemPrice")}
              >
                <Label color="red">
                  <Icon name="play" />
                </Label>
                강화시뮬레이션
              </Menu.Item>
            </Menu>
          </Popup>
        </Menu.Item>

        {/* <Menu.Item>
          <Header
            size='small'
            className='headerItem'
            onClick={() => restValueBatch()}
          >
            <Icon name='box' />
            휴식게이지반영
          </Header>
        </Menu.Item> */}
        {/* {accountUser?.role === "admin" && (
          <Menu.Item>
            <Header
              size="small"
              className="headerItem"
              onClick={() => history.push("/dashboard")}
            >
              <Icon name="dashboard" />
              대시보드
            </Header>
          </Menu.Item>
        )} */}

        <Menu.Item>
          <Header
            size="small"
            className="headerItem"
            onClick={() => history.push("/dashboard")}
          >
            <Icon name="dashboard" />
            대시보드
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
                {accountUser?.profilePic ? (
                  <div>
                    <Image src={accountUser.profilePic} avatar />
                    <span style={{ color: "white" }}>{userValue.userName}</span>
                  </div>
                ) : (
                  <>
                    <Icon name="user" />
                    {userValue && userValue.userName}
                  </>
                )}
              </Header>
            }
          >
            <Card>
              <Image
                avatar
                // style={{ height: '70px', width: '70px', objectFit: 'cover' }}
                src={
                  accountUser?.profilePic
                    ? accountUser.profilePic
                    : "https://react.semantic-ui.com/images/wireframe/image.png"
                }
                style={{
                  margin: "0 auto",
                  height: "150px",
                  width: "150px",
                  borderRadius: "500rem !important",
                }}
                id="profilePicId"
              />
              <Card.Content>
                <Card.Header>{userValue && userValue.userName}</Card.Header>
                <Divider hidden />
                <Card.Description>
                  <p style={{ fontWeight: "bold" }}>
                    프로필 이미지를 바꾸시겠습니까?
                  </p>
                  <Button
                    color="violet"
                    content="프로필변경"
                    onClick={openProfileModal}
                  />
                  <Divider />
                  <p style={{ fontWeight: "bold" }}>
                    케릭터 순서를 바꾸시겠습니까?
                  </p>
                  <Button
                    color="blue"
                    content="순서변경"
                    onClick={openChangeRowModal}
                  />
                  <Divider />
                  <p style={{ fontWeight: "bold" }}>로그아웃 하시겠습니까?</p>
                  <Button
                    color="red"
                    content="로그아웃"
                    onClick={() => logoutUser(userValue.userId)}
                  />
                </Card.Description>
              </Card.Content>
            </Card>
          </Popup>
        </Menu.Item>
      </Menu>

      {profileModal && (
        <ProfileModal
          profileModal={profileModal}
          setProfileModal={setProfileModal}
          profilePic={accountUser?.profilePic}
        />
      )}

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
