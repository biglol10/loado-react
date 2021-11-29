import React, { useState, useEffect } from "react";
import "./userHomework.css";
import AddCharacter from "../components/characterRelated/AddCharacter";

import {
  Segment,
  Grid,
  Container,
  Icon,
  Dimmer,
  Loader,
} from "semantic-ui-react";
import RestValue from "../components/userHomework/RestValue";
import CharacterAvatar from "../components/characterRelated/CharacterAvatar";
import PerIdNote from "../components/userHomework/PerIdNote";
import DungeonAndEpona from "../components/userHomework/DungeonAndEpona";
import WeeklyRaidContents from "../components/userHomework/WeeklyRaidContents";

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
import AlarmAndNote from "../components/userHomework/AlarmAndNote";

function CharacterToDoRow({ limit, type }) {
  const todayDate = new Date(Date.now());

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

  const viewPage = async (theActivePage, plusPage = 0) => {
    setLoading(true);
    setUserTodoData([]);

    const resultData = await viewDataMain(
      limit,
      theActivePage,
      setActivePage,
      cookie.get("loadoUserToken")
    );

    if (resultData.success) {
      setUserTodoData(resultData.viewData.data);
      setPagination(resultData.setPage);
    } else {
      toastMessage("데이터를 불러오지 못했습니다", "error");
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
        <Segment id="gridSegment">
          <Grid className="fullPage">
            <Container id="gridContainer">
              <Grid.Column width={16}>
                <Segment
                  basic
                  className="contentHeader"
                  style={{ marginBottom: "0px" }}
                >
                  <SettingChange
                    viewByCheckBox={viewByCheckBox}
                    setViewByCheckBox={setViewByCheckBox}
                    changeUserCheckBoxConfigurationFunction={
                      changeUserCheckBoxConfigurationFunction
                    }
                  />
                  <PaginationComp
                    pagination={pagination}
                    activePage={activePage}
                    pageChange={pageChange}
                  />
                  <AddAndChange
                    addCharacter={addCharacter}
                    applyChanges={applyChanges}
                  />
                </Segment>
                <Segment
                  basic
                  style={{ backgroundColor: "dimgray", marginTop: "0px" }}
                >
                  <Grid columns={limit + 1}>
                    <Grid.Row
                      style={{
                        borderBottom: !showNote && "0.05rem inset ivory",
                      }}
                    >
                      <Grid.Column className="contentColumn">
                        <AlarmAndNote
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
                          activePage={activePage}
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
                          />
                        ))}
                      </Grid.Row>
                    )}
                    <Grid.Row className="eachRow">
                      <Grid.Column className="contentColumn">
                        <Icon name="calendar check outline" />
                        휴식게이지
                      </Grid.Column>
                      {userTodoData.map((item, idx) => (
                        <RestValue
                          item={item}
                          userTodoData={userTodoData}
                          setUserTodoData={setUserTodoData}
                        />
                      ))}
                    </Grid.Row>
                    {Array.from([
                      "카오스던전",
                      "가디언토벌",
                      "에포나",
                      "주간가디언",
                    ]).map((item, idx) => (
                      <DungeonAndEpona
                        content={item}
                        userTodoData={userTodoData}
                        setUserTodoData={setUserTodoData}
                        viewByCheckBox={viewByCheckBox}
                      />
                    ))}

                    {Array.from([
                      "오레하2종",
                      "아르고스",
                      "발탄",
                      "비아키스",
                      "쿠크세이튼",
                      "아브렐슈드",
                    ]).map((item, idx) => (
                      <WeeklyRaidContents
                        content={item}
                        userTodoData={userTodoData}
                        setUserTodoData={setUserTodoData}
                        viewByCheckBox={viewByCheckBox}
                      />
                    ))}

                    {/* 원정대 주간 컨탠츠는 안 보이게 하기로 결정 */}
                    {/* <Grid.Row className="eachRow">
                    <Grid.Column className="contentColumn">
                      <div>
                        <Image
                          src="./images/loa_icons/abyssWeekly.png"
                          avatar
                          className="contentImage"
                        />
                        <span>어비스레이드</span>
                      </div>
                    </Grid.Column>
                    {userTodoData.map((item, idx) => (
                      <AbyssRaid
                        idx={idx}
                        abyssRaidItem={item}
                        userTodoData={userTodoData}
                        setUserTodoData={setUserTodoData}
                      />
                    ))}
                  </Grid.Row>
                  <Grid.Row className="eachRow">
                    <Grid.Column className="contentColumn">
                      <div>
                        <Image
                          src="./images/loa_icons/rehearsal.png"
                          avatar
                          className="contentImage"
                        />
                        <span>리허설, 데쟈뷰</span>
                      </div>
                    </Grid.Column>
                    {userTodoData.map((item, idx) => (
                      <RehearsalAndDejavu
                        rehearsalAndDejavuItem={item}
                        idx={idx}
                        userTodoData={userTodoData}
                        setUserTodoData={setUserTodoData}
                      />
                    ))}
                  </Grid.Row> */}
                  </Grid>
                </Segment>
              </Grid.Column>
            </Container>
          </Grid>
        </Segment>
      )}

      {addCharacterModal && (
        <AddCharacter
          addCharacterModal={addCharacterModal}
          closeAddCharacter={closeAddCharacter}
          userTodoData={userTodoData}
          axiosConfigAuth={axiosConfigAuth}
          viewPage={viewPage}
          limit={limit}
          activePage={activePage}
        />
      )}
      <ToastContainer autoClose={3000} />
    </>
  );
}

export default CharacterToDoRow;
