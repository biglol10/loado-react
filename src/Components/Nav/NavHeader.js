import React, { useState } from "react";
import { Menu, Header, Icon, Popup, Button, Modal } from "semantic-ui-react";
import cookie from "js-cookie";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { backendUrl, axiosConfig } from "../Utils/ConstVar";

function NavHeader() {
  let userIdString = cookie.get("loadoUserCookie");
  let userValue = userIdString && JSON.parse(userIdString);
  const history = useHistory();

  const [showUpdateHistoryModal, setShowUpdateHistoryModal] = useState(false);

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
          <Header
            size="small"
            style={{ color: "white", padding: "0 50px", cursor: "pointer" }}
            onClick={() =>
              window.open(
                "https://github.com/biglol10/loado-react/blob/main/README.md"
              )
            }
          >
            <Icon name="list ul" />
            기능소개
          </Header>
        </Menu.Item>
        <Menu.Item>
          <Header
            size="small"
            style={{ color: "white", padding: "0 50px", cursor: "pointer" }}
            onClick={() => setShowUpdateHistoryModal(!showUpdateHistoryModal)}
          >
            <Icon name="cube" />
            작업 내역
          </Header>
        </Menu.Item>
        <Menu.Item>
          <Header
            size="small"
            style={{ color: "white", padding: "0 50px", cursor: "pointer" }}
            onClick={() => restValueBatch()}
          >
            <Icon name="box" />
            휴식게이지반영
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

      {showUpdateHistoryModal && (
        <Modal
          open={showUpdateHistoryModal}
          onClose={() => setShowUpdateHistoryModal(false)}
          closeOnDimmerClick
        >
          <Modal.Header
            style={{
              backgroundColor: "#384862",
              color: "white",
              borderBottom: "1px solid white",
            }}
          >
            작업 내역 __ (이 팝업은 조금 더 보기 편하게 개편될 것입니다)
          </Modal.Header>
          <Modal.Content>
            <p>
              <span style={{ fontWeight: "bold", marginRight: "20px" }}>
                2021-09-06
              </span>
              직업명 오타 수정 : 아르라카 {"->"} 아르카나
            </p>
            <p>
              <span style={{ fontWeight: "bold", marginRight: "20px" }}>
                2021-09-07
              </span>
              가입 시 암호화 관련 설명 추가
            </p>
            <p>
              <span style={{ fontWeight: "bold", marginRight: "20px" }}>
                2021-09-08
              </span>
              케릭터명 입력 후 엔터 이벤트를 등록하기 위해 [케릭터 추가] 팝업
              등장 내부로직 수정
            </p>
            <p>
              <span style={{ fontWeight: "bold", marginRight: "20px" }}>
                2021-09-09
              </span>
              (버튼이 안 보이는 분들을 위해) 케릭터 추가 기능에서 클래스 선택 및
              케릭터명 입력 후 엔터 시 케릭터가 추가되는 기능 추가
            </p>
            <p>
              <span style={{ fontWeight: "bold", marginRight: "20px" }}>
                2021-09-10
              </span>
              유지보수 및 코드 분석을 위해 내부 코드 리팩토링 진행 및 간결하게
              수정
            </p>
            <p>
              <span style={{ fontWeight: "bold", marginRight: "20px" }}>
                2021-09-12
              </span>
              9월10일 업데이트 후 첫 로그인 시 화면에 아무것도 안 뜨던 현상
              수정, 컨탠츠에 마우스 올리면 행의 색갈이 바뀌도록 수정
            </p>
            <p>
              <span style={{ fontWeight: "bold", marginRight: "20px" }}>
                2021-09-12
              </span>
              카던, 가디언, 에포나에 숫자로 선택할 필요없이 체크로 선택하여
              저장하기 가능토록 수정
            </p>
          </Modal.Content>
        </Modal>
      )}
    </>
  );
}

export default NavHeader;
