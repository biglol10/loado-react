import React, { useState, useEffect } from "react";
import axios from "axios";
import cookie from "js-cookie";

import { ToastContainer } from "react-toastify";
import { useHistory } from "react-router-dom";
import {
  Segment,
  Grid,
  Container,
  Icon,
  Dimmer,
  Loader,
} from "semantic-ui-react";

// subComponents
import AddCharacter from "../components/characterRelated/AddCharacter";
import RestValue from "../components/userHomework/RestValue";
import CharacterAvatar from "../components/characterRelated/CharacterAvatar";
import PerIdNote from "../components/userHomework/PerIdNote";
import DungeonAndEpona from "../components/userHomework/DungeonAndEpona";
import WeeklyRaidContents from "../components/userHomework/WeeklyRaidContents";
import AddAndChange from "../components/userHomework/AddAndChange";
import PaginationComp from "../components/userHomework/PaginationComp";
import SettingChange from "../components/userHomework/SettingChange";
import AlarmAndNote from "../components/userHomework/AlarmAndNote";

// util functions
import {
  viewDataMain,
  applyChangesUtil,
  alarmRestValueUtil,
  toastMessage,
  getUserCheckBoxConfiguration,
  changeUserCheckBoxConfiguration,
} from "../components/util/ViewDataUtil";

import { backendUrl, axiosConfigAuth } from "../components/util/ConstVar";

import "./userHomework.css";

function CharacterToDoRow({ limit }) {
  const [userTodoData, setUserTodoData] = useState([]);

  const [addCharacterModal, setAddCharacterModal] = useState(false);

  const [loading, setLoading] = useState(false);

  const [activePage, setActivePage] = useState(1);

  const [pagination, setPagination] = useState(0);

  const [viewByCheckBox, setViewByCheckBox] = useState();

  // for alarm animation
  const [alarmTrue, setAlarmTrue] = useState(true);

  // for note per list
  const [showNote, setShowNote] = useState(false);

  const history = useHistory();

  const addCharacter = () => {
    setAddCharacterModal(true);
  };

  const closeAddCharacter = () => {
    setAddCharacterModal(false);
  };

  const viewPage = async (theActivePage = "") => {
    setLoading(true);
    setUserTodoData([]);

    const resultData = await viewDataMain(
      limit,
      theActivePage ? theActivePage : activePage,
      setActivePage,
      cookie.get("loadoUserToken")
    );

    if (resultData.success) {
      setUserTodoData(resultData.viewData.data);
      setPagination(resultData.setPage);
    } else {
      toastMessage("???????????? ???????????? ???????????????", "error");
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
      toastMessage("?????? ??????????????? ????????? ???????????? ???????????????", "error");
    }
    viewPage();
  };

  const pageChange = async (event, data) => {
    setLoading(true);
    // ????????? ?????? 2???????????? ?????? ????????? ????????? 1????????? ?????? ?????? ???????????? ???????????? ?????????
    // ?????? ??? ????????? ?????? ??????????????? ?????? ID????????? ????????? ????????? ????????? ??????????????? ?????? ???????????? ??????????????? ???????????? ????????? ??????
    setUserTodoData([]);
    setActivePage(data.activePage);

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
        toastMessage("???????????? ???????????? ???????????????", "error");
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
            <Loader size="big">?????????</Loader>
          </Dimmer>
        </Segment>
      ) : (
        <>
          <Segment id="settingsAndPagination">
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

          <Segment id="homeworkSegment">
            <Grid columns={limit + 1}>
              <Grid.Row className={`${!showNote && "characterListRow"}`}>
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
                <Grid.Row className="characterListNoteRow">
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
                  ???????????????
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
                "???????????????",
                "???????????????",
                "?????????",
                "???????????????",
              ]).map((item, idx) => (
                <DungeonAndEpona
                  content={item}
                  userTodoData={userTodoData}
                  setUserTodoData={setUserTodoData}
                  viewByCheckBox={viewByCheckBox}
                />
              ))}
              {Array.from([
                "?????????6???",
                "??????3???",
                "?????????2???",
                "????????????",
                "??????",
                "????????????",
                "???????????????",
                "???????????????",
              ]).map((item, idx) => (
                <WeeklyRaidContents
                  content={item}
                  userTodoData={userTodoData}
                  setUserTodoData={setUserTodoData}
                  viewByCheckBox={viewByCheckBox}
                />
              ))}
              {/* ????????? ?????? ???????????? ??? ????????? ????????? ?????? */}
              {/* <Grid.Row className="eachRow">
                    <Grid.Column className="contentColumn">
                      <div>
                        <Image
                          src="./images/loa_icons/abyssWeekly.png"
                          avatar
                          className="contentImage"
                        />
                        <span>??????????????????</span>
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
                        <span>?????????, ?????????</span>
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
        </>
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
