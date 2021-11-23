import React, { useState, useEffect, useRef, innerRef } from "react";
import {
  Modal,
  Icon,
  Grid,
  Image,
  Header,
  Input,
  Label,
  List,
  Button,
} from "semantic-ui-react";
import { characterCdn, characterKorean } from "../../../_data/characterDefinition";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import { backendUrl } from "../util/ConstVar";
import cookie from "js-cookie";

import "./AddCharacter.css";

function AddCharacter({
  addCharacterModal,
  closeAddCharacter,
  userTodoData,
  axiosConfigAuth,
  viewPage,
  limit,
  activePage,
}) {
  const [selectCharacterModal, setSelectCharacterModal] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState("");
  const [characterName, setCharacterName] = useState("");
  const [chaosRestValue, setChaosRestValue] = useState(0);
  const [guardianRestValue, setGuardianRestValue] = useState(0);
  const [eponaRestValue, setEponaRestValue] = useState(0);
  const regex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/;
  const regexNumber = /^[0-9]+$/;

  const inputRef = useRef();
  const buttonRef = useRef();

  const closeSelectCharacter = () => setSelectCharacterModal(false);

  const modalShow = () => {
    setSelectCharacterModal(true);
  };

  const classSelected = (event) => {
    let selectedClass;
    if (event.target.className.indexOf("image") > 0) {
      selectedClass = event.target.dataset.options;
    } else {
      selectedClass = event.target.className.split(" ")[2];
    }
    setSelectedCharacter(selectedClass);
    setSelectCharacterModal(false);
    inputRef.current.focus();
  };

  const closeAddCharacterModal = () => {
    setSelectedCharacter("");
    setCharacterName("");
    setChaosRestValue(0);
    setGuardianRestValue(0);
    setEponaRestValue(0);
    closeAddCharacter();
  };

  const changeInputCharName = (event, data) => {
    const insertedValue = data.value;
    if (insertedValue.length === 0) {
      setCharacterName("");
      return;
    }
    if (!regex.test(insertedValue) || insertedValue.length > 12) return;
    setCharacterName(insertedValue);
  };

  const changeRestValue = (event, data) => {
    event.preventDefault();
    if (!regexNumber.test(event.target.value)) return;
    if (event.target.id === "chaosChange") {
      const changedValue = event.target.value;
      const valueOutput = chaosRestValue + (changedValue - chaosRestValue) * 10;
      if (valueOutput < 0) setChaosRestValue(0);
      else if (0 <= valueOutput && valueOutput <= 100)
        setChaosRestValue(valueOutput);
      else setChaosRestValue(100);
    }
    if (event.target.id === "guardianChange") {
      const changedValue = event.target.value;
      const valueOutput =
        guardianRestValue + (changedValue - guardianRestValue) * 10;
      if (valueOutput < 0) setGuardianRestValue(0);
      else if (0 <= valueOutput && valueOutput <= 100)
        setGuardianRestValue(valueOutput);
      else setGuardianRestValue(100);
    }
    if (event.target.id === "eponaChange") {
      const changedValue = event.target.value;
      const valueOutput = eponaRestValue + (changedValue - eponaRestValue) * 10;
      if (valueOutput < 0) setEponaRestValue(0);
      else if (0 <= valueOutput && valueOutput <= 100)
        setEponaRestValue(valueOutput);
      else setEponaRestValue(100);
    }
  };

  const confirmAddCharacter = () => {
    const createdData = {
      // _id: "5d725a037b292f5f8ceff795",
      // user: "5d7a514b5d2c12c7449be042",
      character: selectedCharacter,
      characterName: characterName,
      date: Date.now(),
      // idx: 2,
      chaosRestValue,
      guardianRestValue,
      eponaRestValue,
      chaosDone: 0,
      guardianDone: 0,
      eponaDone: 0,
      guardianWeeklyDone: 0,
      abyssDungeon2: false,
      // abyssDungeonWeekly: true,
      // rehearsalAndDejavu: ["kukuseitn", "abrel"],
      argos: false,
      baltan: false,
      biakiss: false,
      kukuseitn: false,
      abrel: false,
      attributeChanged: false,
      weeklyAttributeChanged: false,
      createdAt: Date.now(),
    };
    axios
      .post(
        `${backendUrl}/loado/api/homeworks`,
        createdData,
        axiosConfigAuth(cookie.get("loadoUserToken"))
      )
      .then((response) => {
        // setUserTodoData([...userTodoData, response.data.data]);
        if (
          response.data.totalLength > 0 &&
          userTodoData.length % limit === 0
        ) {
          activePage = Math.floor(response.data.totalLength / limit) + 1;
          viewPage(activePage);
        } else {
          viewPage(activePage);
        }
        closeAddCharacterModal();
      })
      .catch((err) => {
        toast.error(err.response.data.error, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
        closeAddCharacterModal();
      });
  };

  useEffect(() => {
    const classElements = document.getElementsByClassName(
      "characterClassContent"
    );
    let eventAdd;
    for (let index = 0; index < classElements.length; index++) {
      eventAdd = classElements[index].addEventListener("click", (event) => {
        classSelected(event);
      });
    }
    return () => {
      for (let index = 0; index < classElements.length; index++) {
        classElements[index].removeEventListener("click", eventAdd);
      }
    };
  });

  useEffect(() => {
    const element = document.getElementById("characterNameInputId");
    const enterEvent = element.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        if (buttonRef.current) buttonRef.current.click();
      }
    });
    return () => {
      element.removeEventListener("keypress", enterEvent);
    };
  }, []);

  return (
    <>
      <Modal
        size="mini"
        open={addCharacterModal}
        onClose={closeAddCharacterModal}
        closeIcon
        closeOnDimmerClick
        // centered={false}
      >
        <Modal.Content style={{ backgroundColor: "dimgray" }}>
          <Header className="itemHeader" as="h4">
            {!selectedCharacter ? (
              <>
                <span className="itemHeaderAttribute1">클래스:</span>
                <Icon
                  name="add square"
                  size="large"
                  color="white"
                  onClick={modalShow}
                  style={{ cursor: "pointer" }}
                />
              </>
            ) : (
              <>
                <span className="itemHeaderAttribute2">클래스:</span>
                <span onClick={() => setSelectCharacterModal(true)}>
                  <Image
                    src={characterCdn[selectedCharacter]}
                    size="mini"
                    avatar
                  />
                  {characterKorean[selectedCharacter]}
                </span>
              </>
            )}
          </Header>
          <Header className="itemHeader" as="h4">
            <span style={{ marginRight: "40px" }}>케릭명:</span>
            <Input
              transparent
              placeholder="케릭터명"
              style={{ color: "white" }}
              className="charNameInput"
              value={characterName}
              ref={inputRef}
              id="characterNameInputId"
              onChange={(event, data) => changeInputCharName(event, data)}
            />
          </Header>
          <Header className="itemHeaderRest" as="h4">
            <List divided selection>
              <List.Item>
                <Label horizontal>카오스던전</Label>
                <Input
                  transparent
                  style={{ color: "white" }}
                  className="charNameInput"
                  value={chaosRestValue}
                  id="chaosChange"
                  onChange={(event, data) => changeRestValue(event, data)}
                />
              </List.Item>
              <List.Item>
                <Label horizontal>가디언던전</Label>
                <Input
                  transparent
                  style={{ color: "white" }}
                  className="charNameInput"
                  value={guardianRestValue}
                  id="guardianChange"
                  onChange={(event, data) => changeRestValue(event, data)}
                />
              </List.Item>
              <List.Item>
                <Label horizontal>에포나</Label>
                <Input
                  transparent
                  style={{ color: "white" }}
                  className="charNameInput"
                  value={eponaRestValue}
                  id="eponaChange"
                  onChange={(event, data) => changeRestValue(event, data)}
                />
              </List.Item>
            </List>
          </Header>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              circular
              color="google plus"
              icon="cancel"
              onClick={closeAddCharacterModal}
            />
            <Button
              circular
              color="twitter"
              icon="check"
              onClick={confirmAddCharacter}
            />
            <button
              ref={buttonRef}
              onClick={confirmAddCharacter}
              style={{ display: "none" }}
            />
          </div>
        </Modal.Content>
      </Modal>
      <Modal
        open={selectCharacterModal}
        onClose={closeSelectCharacter}
        closeOnDimmerClick
        // centered={false}
        className="classSelectModal"
      >
        <Modal.Header
          style={{
            backgroundColor: "#384862",
            color: "white",
            borderBottom: "1px solid white",
          }}
        >
          클래스
        </Modal.Header>
        <Modal.Content style={{ backgroundColor: "#384862", color: "white" }}>
          <Grid columns={6}>
            <Grid.Row>
              <Grid.Column className="characterClassHeader">
                <Header as="h4" style={{ marginTop: "6px", color: "white" }}>
                  전사
                </Header>
              </Grid.Column>
              <Grid.Column
                className="characterClassContent berserker"
                name="berserker"
              >
                <Image
                  src={characterCdn.berserker}
                  size="mini"
                  avatar
                  data-options="berserker"
                />
                버서커
              </Grid.Column>
              <Grid.Column className="characterClassContent warlord">
                <Image
                  src={characterCdn.warlord}
                  size="mini"
                  avatar
                  data-options="warlord"
                />
                워로드
              </Grid.Column>
              <Grid.Column className="characterClassContent destroyer">
                <Image
                  src={characterCdn.destroyer}
                  size="mini"
                  avatar
                  data-options="destroyer"
                />
                디스트로이어
              </Grid.Column>
              <Grid.Column className="characterClassContent holyknight">
                <Image
                  src={characterCdn.holyknight}
                  size="mini"
                  avatar
                  data-options="holyknight"
                />
                홀리나이트
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column className="characterClassHeader">
                <Header as="h4" style={{ marginTop: "6px", color: "white" }}>
                  무도가
                </Header>
              </Grid.Column>
              <Grid.Column className="characterClassContent battlemaster">
                <Image
                  src={characterCdn.battlemaster}
                  size="mini"
                  avatar
                  data-options="battlemaster"
                />
                배틀마스터
              </Grid.Column>
              <Grid.Column className="characterClassContent infighter">
                <Image
                  src={characterCdn.infighter}
                  size="mini"
                  avatar
                  data-options="infighter"
                />
                인파이터
              </Grid.Column>
              <Grid.Column className="characterClassContent soulmaster">
                <Image
                  src={characterCdn.soulmaster}
                  size="mini"
                  avatar
                  data-options="soulmaster"
                />
                기공사
              </Grid.Column>
              <Grid.Column className="characterClassContent lancemaster">
                <Image
                  src={characterCdn.lancemaster}
                  size="mini"
                  avatar
                  data-options="lancemaster"
                />
                창술사
              </Grid.Column>
              <Grid.Column className="characterClassContent striker">
                <Image
                  src={characterCdn.striker}
                  size="mini"
                  avatar
                  data-options="striker"
                />
                스트라이커
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column className="characterClassHeader">
                <Header as="h4" style={{ marginTop: "6px", color: "white" }}>
                  헌터
                </Header>
              </Grid.Column>
              <Grid.Column className="characterClassContent devilhunter">
                <Image
                  src={characterCdn.devilhunter}
                  size="mini"
                  avatar
                  data-options="devilhunter"
                />
                데빌헌터
              </Grid.Column>
              <Grid.Column className="characterClassContent blaster">
                <Image
                  src={characterCdn.blaster}
                  size="mini"
                  avatar
                  data-options="blaster"
                />
                블래스터
              </Grid.Column>
              <Grid.Column className="characterClassContent hawkeye">
                <Image
                  src={characterCdn.hawkeye}
                  size="mini"
                  avatar
                  data-options="hawkeye"
                />
                호크아이
              </Grid.Column>
              <Grid.Column className="characterClassContent scouter">
                <Image
                  src={characterCdn.scouter}
                  size="mini"
                  avatar
                  data-options="scouter"
                />
                스카우터
              </Grid.Column>
              <Grid.Column className="characterClassContent gunslinger">
                <Image
                  src={characterCdn.gunslinger}
                  size="mini"
                  avatar
                  data-options="gunslinger"
                />
                건슬링어
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column className="characterClassHeader">
                <Header as="h4" style={{ marginTop: "6px", color: "white" }}>
                  마법사
                </Header>
              </Grid.Column>
              <Grid.Column className="characterClassContent summoner">
                <Image
                  src={characterCdn.summoner}
                  size="mini"
                  avatar
                  data-options="summoner"
                />
                서머너
              </Grid.Column>
              <Grid.Column className="characterClassContent arcana">
                <Image
                  src={characterCdn.arcana}
                  size="mini"
                  avatar
                  data-options="arcana"
                />
                아르카나
              </Grid.Column>
              <Grid.Column className="characterClassContent bard">
                <Image
                  src={characterCdn.bard}
                  size="mini"
                  avatar
                  data-options="bard"
                />
                바드
              </Grid.Column>
              <Grid.Column className="characterClassContent sorceress">
                <Image
                  src={characterCdn.sorceress}
                  size="mini"
                  avatar
                  data-options="sorceress"
                />
                소서리스
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column className="characterClassHeader">
                <Header as="h4" style={{ marginTop: "6px", color: "white" }}>
                  암살자
                </Header>
              </Grid.Column>
              <Grid.Column className="characterClassContent blade">
                <Image
                  src={characterCdn.blade}
                  size="mini"
                  avatar
                  data-options="blade"
                />
                블레이드
              </Grid.Column>
              <Grid.Column className="characterClassContent demonic">
                <Image
                  src={characterCdn.demonic}
                  size="mini"
                  avatar
                  data-options="demonic"
                />
                데모닉
              </Grid.Column>
              <Grid.Column className="characterClassContent reaper">
                <Image
                  src={characterCdn.reaper}
                  size="mini"
                  avatar
                  data-options="reaper"
                />
                리퍼
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Modal.Content>
      </Modal>
      <ToastContainer autoClose={3000} />
    </>
  );
}

export default AddCharacter;
