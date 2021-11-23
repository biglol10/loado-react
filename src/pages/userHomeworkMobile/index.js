import React, { useState, useEffect } from "react";
import "./index.css";
import AddCharacterMobile from "../components/characterRelated/AddCharacterMobile";

import { Segment, Grid, Icon, Dimmer, Loader, Popup } from "semantic-ui-react";
import RestValueMobile from "../components/userHomework/RestValueMobile";
import CharacterAvatar from "../components/characterRelated/CharacterAvatar";
import {
  ChaosDunValue,
  GuardianDunValue,
  EponaValue,
  WeeklyGuardian,
} from "../components/userHomework/DungeonAndEpona";
import {
  AbyssDun2,
  ArgosRaid,
  BaltanRaid,
  BiakissRaid,
  KukseitnRaid,
  AbrelRaid,
} from "../components/userHomework/AbyssAndRaid";
import axios from "axios";
import cookie from "js-cookie";

import { ToastContainer } from "react-toastify";
import { useHistory } from "react-router-dom";

import { backendUrl, axiosConfigAuth } from "../components/util/ConstVar";
import {
  viewDataMain,
  applyChangesUtil,
  alarmRestValueUtil,
  toastMessage,
  getUserCheckBoxConfiguration,
  changeUserCheckBoxConfiguration,
} from "../components/util/ViewDataUtil";
import AddAndChange from "../components/userHomework/AddAndChange";
import PaginationComp from "../components/userHomework/PaginationComp";
import SettingChange from "../components/userHomework/SettingChange";
import AlarmAndNoteMobile from "../components/userHomework/AlarmAndNoteMobile";
import { showContentPopupValue } from "../components/util/ContentDefinition";
import PerIdNote from "../components/userHomework/PerIdNote";

function CharacterToDoRowMobile({ limit, type }) {
  const [userTodoData, setUserTodoData] = useState([]);

  const [addCharacterModal, setAddCharacterModal] = useState(false);

  const [loading, setLoading] = useState(false);

  const [activePage, setActivePage] = useState(1);

  const [pagination, setPagination] = useState(0);

  const [viewByCheckBox, setViewByCheckBox] = useState();

  const history = useHistory();

  const addCharacter = () => {
    setAddCharacterModal(true);
  };

  const closeAddCharacter = () => {
    setAddCharacterModal(false);
  };

  const viewPage = async (minusOne = false, plusOne = false, plusPage = 0) => {
    setLoading(true);
    setUserTodoData([]);

    const resultData = await viewDataMain(
      minusOne,
      plusOne,
      plusPage,
      limit,
      activePage,
      setActivePage,
      cookie.get("loadoUserToken")
    );

    if (resultData.success) {
      setUserTodoData(resultData.viewData.data);
      setPagination(resultData.setPage);
    } else {
      toastMessage("데이터를 불러오지 못했습니다", "error", "mobile");
    }
    setLoading(false);
  };

  const applyChanges = async () => {
    setLoading(true);

    let submitData = userTodoData.filter(
      (item) => item.attributeChanged === true
    );

    const applyResult = await applyChangesUtil(
      submitData,
      cookie.get("loadoUserToken")
    );

    setLoading(false);
    if (applyResult) {
      toastMessage("일부 변경사항이 제대로 반영되지 않았습니다", "error");
    }
    viewPage();
  };

  const pageChange = async (event, data) => {
    setLoading(true);
    setActivePage(data.activePage);

    // 샙트님 이거 2페이지에 있는 캐릭터 바꾸면 1페이지 같은 자리 있는것두 바뀌는거 같아여
    // 이거 안 해주면 현재 페이지에서 바꾼 ID위치의 정보가 그대로 남아서 사용자에게 모든 페이지의 변경사항이 반영되는 것처럼 보임
    setUserTodoData([]);

    await axios
      .get(
        `${backendUrl}/loado/api/homeworks?limit=${limit}&page=${data.activePage}`,
        axiosConfigAuth(cookie.get("loadoUserToken"))
      )
      .then((response) => {
        setUserTodoData(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        toastMessage("데이터를 불러오지 못했습니다", "error");
        setLoading(false);
      });
  };

  const changeUserCheckBoxConfigurationFunction = async (viewByCheckBox) => {
    const result = await changeUserCheckBoxConfiguration(
      viewByCheckBox,
      cookie.get("loadoUserToken")
    );
    if (result) {
      setViewByCheckBox(viewByCheckBox);
    }
  };

  // for alarm animation
  const [alarmTrue, setAlarmTrue] = useState(true);

  // for note per list
  const [showNote, setShowNote] = useState(false);

  const alarmRestValue = (todoList) => {
    const alarmDataResult = alarmRestValueUtil(todoList, alarmTrue);
    setUserTodoData(alarmDataResult.alarmList);
    setAlarmTrue(alarmDataResult.alarm);
  };

  // if no user cookie then redirect to login page
  useEffect(() => {
    let loginCookie = cookie.get("loadoUserToken");
    !loginCookie && history.push("/login");
  }, []);

  useEffect(() => {
    viewPage();

    async function callUsersCheckBoxValue() {
      const resultData = await getUserCheckBoxConfiguration(
        cookie.get("loadoUserToken")
      );
      setViewByCheckBox(resultData);
    }
    callUsersCheckBoxValue();
  }, []);

  return (
    <>
      {loading ? (
        <Segment
          className="fullPage"
          style={{ height: "94vh", border: "none" }}
        >
          <Dimmer active>
            <Loader size="big">로딩중</Loader>
          </Dimmer>
        </Segment>
      ) : (
        <Segment id="mobileMainPageSegment">
          <PaginationComp
            pagination={pagination}
            activePage={activePage}
            pageChange={pageChange}
            deviceType="mobile"
          />
          <div
            style={{
              display: "flex",
              marginTop: "20px",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <SettingChange
              viewByCheckBox={viewByCheckBox}
              changeUserCheckBoxConfigurationFunction={
                changeUserCheckBoxConfigurationFunction
              }
              deviceType="mobile"
            />
            <AddAndChange
              addCharacter={addCharacter}
              applyChanges={applyChanges}
              style={{ fontSize: "5px" }}
            />
          </div>
          <Segment basic id="mobileSegmentGrid">
            <Grid columns={limit + 1}>
              <Grid.Row
                style={{
                  borderBottom: !showNote && "0.05rem inset ivory",
                }}
              >
                <Grid.Column className="contentColumn">
                  <AlarmAndNoteMobile
                    alarmTrue={alarmTrue}
                    alarmRestValue={alarmRestValue}
                    userTodoData={userTodoData}
                    showNote={showNote}
                    setShowNote={setShowNote}
                  />
                </Grid.Column>
                {userTodoData.map((item, idx) => (
                  <CharacterAvatar
                    itemId={item._id}
                    character={item.character}
                    characterName={item.characterName}
                    attributeChanged={item.attributeChanged}
                    weeklyAttributeChanged={item.weeklyAttributeChanged}
                    axiosConfigAuth={axiosConfigAuth}
                    viewPage={viewPage}
                    alarmCharacter={item.alarmCharacter}
                    limit={limit}
                    dontChange={item.dontChange}
                    userTodoData={userTodoData}
                    setUserTodoData={setUserTodoData}
                    deviceType="mobile"
                  />
                ))}
              </Grid.Row>
              {showNote && (
                <Grid.Row
                  style={{
                    padding: 0,
                    borderBottom: "0.05rem inset ivory",
                    paddingBottom: "7px",
                  }}
                >
                  <Grid.Column />
                  {userTodoData.map((item, idx) => (
                    <PerIdNote
                      item={item}
                      userTodoData={userTodoData}
                      setUserTodoData={setUserTodoData}
                      deviceType="mobile"
                    />
                  ))}
                </Grid.Row>
              )}
              <Grid.Row className="eachRow">
                <Grid.Column className="contentColumn">
                  <Popup
                    on="click"
                    pinned
                    trigger={
                      <Icon
                        name="calendar check outline"
                        style={{ fontSize: "21px" }}
                      />
                    }
                    content={showContentPopupValue("휴식게이지")[1]}
                    id="clickPopup"
                  />
                </Grid.Column>
                {userTodoData.map((item, idx) => (
                  <RestValueMobile
                    item={item}
                    userTodoData={userTodoData}
                    setUserTodoData={setUserTodoData}
                  />
                ))}
              </Grid.Row>
              <Grid.Row className="eachRow">
                <Grid.Column className="contentColumn">
                  <Popup
                    on="click"
                    pinned
                    trigger={showContentPopupValue("카오스던전")[0]}
                    content={showContentPopupValue("카오스던전")[1]}
                    id="clickPopup"
                  />
                </Grid.Column>
                {userTodoData.map((item, idx) => (
                  <ChaosDunValue
                    chaosItem={item}
                    userTodoData={userTodoData}
                    setUserTodoData={setUserTodoData}
                    viewByCheckBox={viewByCheckBox}
                  />
                ))}
              </Grid.Row>
              <Grid.Row className="eachRow">
                <Grid.Column className="contentColumn">
                  <Popup
                    on="click"
                    pinned
                    trigger={showContentPopupValue("가디언던전")[0]}
                    content={showContentPopupValue("가디언던전")[1]}
                    id="clickPopup"
                  />
                </Grid.Column>
                {userTodoData.map((item, idx) => (
                  <GuardianDunValue
                    guardianItem={item}
                    userTodoData={userTodoData}
                    setUserTodoData={setUserTodoData}
                    viewByCheckBox={viewByCheckBox}
                  />
                ))}
              </Grid.Row>
              <Grid.Row className="eachRow">
                <Grid.Column className="contentColumn">
                  <Popup
                    on="click"
                    pinned
                    trigger={showContentPopupValue("에포나")[0]}
                    content={showContentPopupValue("에포나")[1]}
                    id="clickPopup"
                  />
                </Grid.Column>
                {userTodoData.map((item, idx) => (
                  <EponaValue
                    eponaItem={item}
                    userTodoData={userTodoData}
                    setUserTodoData={setUserTodoData}
                    viewByCheckBox={viewByCheckBox}
                  />
                ))}
              </Grid.Row>
              <Grid.Row className="eachRow">
                <Grid.Column className="contentColumn">
                  <Popup
                    on="click"
                    pinned
                    trigger={showContentPopupValue("주간가디언")[0]}
                    content={showContentPopupValue("주간가디언")[1]}
                    id="clickPopup"
                  />
                </Grid.Column>
                {userTodoData.map((item, idx) => (
                  <WeeklyGuardian
                    weeklyGuardianItem={item}
                    userTodoData={userTodoData}
                    setUserTodoData={setUserTodoData}
                    viewByCheckBox={viewByCheckBox}
                  />
                ))}
              </Grid.Row>
              <Grid.Row className="eachRow">
                <Grid.Column className="contentColumn">
                  <Popup
                    on="click"
                    pinned
                    trigger={showContentPopupValue("어비스던전")[0]}
                    content={showContentPopupValue("어비스던전")[1]}
                    id="clickPopup"
                  />
                </Grid.Column>
                {userTodoData.map((item, idx) => (
                  <AbyssDun2
                    abyssDun2Item={item}
                    userTodoData={userTodoData}
                    setUserTodoData={setUserTodoData}
                  />
                ))}
              </Grid.Row>
              <Grid.Row className="eachRow">
                <Grid.Column className="contentColumn">
                  <Popup
                    on="click"
                    pinned
                    trigger={showContentPopupValue("아르고스")[0]}
                    content={showContentPopupValue("아르고스")[1]}
                    id="clickPopup"
                  />
                </Grid.Column>
                {userTodoData.map((item, idx) => (
                  <ArgosRaid
                    argosRaidItem={item}
                    userTodoData={userTodoData}
                    setUserTodoData={setUserTodoData}
                  />
                ))}
              </Grid.Row>
              <Grid.Row className="eachRow baltanRow">
                <Grid.Column className="contentColumn">
                  <Popup
                    on="click"
                    pinned
                    trigger={showContentPopupValue("발탄")[0]}
                    content={showContentPopupValue("발탄")[1]}
                    id="clickPopup"
                  />
                </Grid.Column>
                {userTodoData.map((item, idx) => (
                  <BaltanRaid
                    baltanRaidItem={item}
                    userTodoData={userTodoData}
                    setUserTodoData={setUserTodoData}
                  />
                ))}
              </Grid.Row>
              <Grid.Row className="eachRow">
                <Grid.Column className="contentColumn">
                  <Popup
                    on="click"
                    pinned
                    trigger={showContentPopupValue("비아키스")[0]}
                    content={showContentPopupValue("비아키스")[1]}
                    id="clickPopup"
                  />
                </Grid.Column>
                {userTodoData.map((item, idx) => (
                  <BiakissRaid
                    biakissRaidItem={item}
                    userTodoData={userTodoData}
                    setUserTodoData={setUserTodoData}
                  />
                ))}
              </Grid.Row>
              <Grid.Row className="eachRow">
                <Grid.Column className="contentColumn">
                  <Popup
                    on="click"
                    pinned
                    trigger={showContentPopupValue("쿠크세이튼")[0]}
                    content={showContentPopupValue("쿠크세이튼")[1]}
                    id="clickPopup"
                  />
                </Grid.Column>
                {userTodoData.map((item, idx) => (
                  <KukseitnRaid
                    kukseitnRaidItem={item}
                    userTodoData={userTodoData}
                    setUserTodoData={setUserTodoData}
                  />
                ))}
              </Grid.Row>
              <Grid.Row className="abrelRow">
                <Grid.Column className="contentColumn">
                  <Popup
                    on="click"
                    pinned
                    trigger={showContentPopupValue("아브렐슈드")[0]}
                    content={showContentPopupValue("아브렐슈드")[1]}
                    id="clickPopup"
                  />
                </Grid.Column>
                {userTodoData.map((item, idx) => (
                  <AbrelRaid
                    abrelRaidItem={item}
                    userTodoData={userTodoData}
                    setUserTodoData={setUserTodoData}
                  />
                ))}
              </Grid.Row>
            </Grid>
          </Segment>
        </Segment>
      )}

      {addCharacterModal && (
        <AddCharacterMobile
          addCharacterModal={addCharacterModal}
          closeAddCharacter={closeAddCharacter}
          userTodoData={userTodoData}
          axiosConfigAuth={axiosConfigAuth}
          viewPage={viewPage}
          limit={limit}
        />
      )}
      <ToastContainer autoClose={3000} />
    </>
  );
}

export default CharacterToDoRowMobile;
