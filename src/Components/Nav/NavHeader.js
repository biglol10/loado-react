import React from "react";
import { Menu, Header, Icon, Popup, Button } from "semantic-ui-react";
import cookie from "js-cookie";
import { useHistory } from "react-router-dom";

function NavHeader() {
  let userIdString = cookie.get("loadoUserCookie");
  let userValue = userIdString && JSON.parse(userIdString);
  const history = useHistory();

  const logoutUser = (userId) => {
    cookie.set("loginId", userId);
    cookie.remove("loadoUserCookie");
    cookie.remove("token");
    history.push("/login");
  };

  return (
    <>
      <Menu
        style={{
          backgroundColor: "lightcoral",
          height: "6vh",
          borderRadius: "0px",
        }}
        borderless
      >
        <Menu.Item>
          <Header
            size="large"
            style={{ marginRight: "150px", marginLeft: "50px", color: "white" }}
          >
            <span style={{ fontStyle: "italic" }}>
              <Icon name="game" />
              LoaDo
            </span>
          </Header>
        </Menu.Item>
        <Menu.Item>
          <Header size="small" style={{ color: "white", padding: "0 50px" }}>
            <Icon name="list ul" />
            ToDo
          </Header>
        </Menu.Item>
        <Menu.Item style={{ marginLeft: "auto", marginRight: "50px" }}>
          <Popup
            on="click"
            position="top right"
            trigger={
              <Header
                size="small"
                style={{
                  color: "white",
                  padding: "0 50px",
                  display: "flex",
                  cursor: "pointer",
                }}
              >
                <Icon name="user" />
                {userValue && userValue.userName}
              </Header>
            }
          >
            <p>로그아웃 하시겠습니까?</p>
            <Button
              color="red"
              content="로그아웃"
              onClick={() => logoutUser(userValue.userId)}
            />
          </Popup>
        </Menu.Item>
      </Menu>
    </>
  );
}

export default NavHeader;
