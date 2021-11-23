import React, { useState, useEffect, useRef } from "react";
import {
  Modal,
  Icon,
  Image,
  Header,
  Input,
  Label,
  List,
  Button,
  Dropdown,
  Segment,
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
  const mobileInputRef = useRef();

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
          viewPage(false, true, response.data.totalLength);
        } else {
          viewPage(false, false);
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

  // for mobile
  const [fullList, setFullList] = useState([]);
  const [mobileDropDownList, setMobileDropDownList] = useState([]);
  useEffect(() => {
    const aList = [];
    for (var key in characterCdn) {
      const addItem = {
        key,
        text: characterKorean[key],
        value: key,
        image: { avatar: true, src: characterCdn[key] },
      };
      aList.push(addItem);
    }
    setFullList(aList);
    setMobileDropDownList(aList);
    if (mobileInputRef.current) mobileInputRef.current.focus();
  }, [selectCharacterModal]);
  const filterDropDown = (event, data) => {
    if (!data.value) {
      setMobileDropDownList(fullList);
      return;
    }

    const filteredList = fullList.filter((item) => {
      return item.text.indexOf(data.value) > -1;
    });
    setMobileDropDownList(filteredList);
  };

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
      {selectCharacterModal && (
        <Modal
          open={selectCharacterModal}
          onClose={closeSelectCharacter}
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
            클래스선택
          </Modal.Header>
          <Modal.Content style={{ backgroundColor: "#384862", color: "white" }}>
            <Segment>
              <Input
                icon="search"
                iconPosition="left"
                className="search"
                ref={mobileInputRef}
                onChange={(event, data) => filterDropDown(event, data)}
              />
              <br />
              <Dropdown open={true}>
                <Dropdown.Menu>
                  <Dropdown.Header icon="tags" content="직업" />
                  <Dropdown.Menu scrolling>
                    {mobileDropDownList.map((option) => (
                      <Dropdown.Item
                        key={option.value}
                        {...option}
                        onClick={(event, data) => {
                          setSelectedCharacter(data.value);
                          setSelectCharacterModal(false);
                        }}
                      />
                    ))}
                  </Dropdown.Menu>
                </Dropdown.Menu>
              </Dropdown>
            </Segment>
          </Modal.Content>
        </Modal>
      )}
      <ToastContainer autoClose={3000} />
    </>
  );
}

export default AddCharacter;
