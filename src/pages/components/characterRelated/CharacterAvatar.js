import React, { useState, useEffect } from "react";
import { Grid, Image, Icon, Popup } from "semantic-ui-react";
import { characterCdn } from "../../../_data/characterDefinition";
import axios from "axios";
import cookie from "js-cookie";
import "./CharacterAvatar.css";
import { backendUrl } from "../util/ConstVar";

function CharacterAvatar({
  itemId,
  character,
  characterName,
  attributeChanged,
  weeklyAttributeChanged,
  axiosConfigAuth,
  viewPage,
  alarmCharacter,
  limit,
  dontChange,
  userTodoData,
  setUserTodoData,
  deviceType,
  activePage,
  setActivePage
}) {
  const [deleteIcon, showDeleteIcon] = useState(false);

  const [showDontChange, setShowDontChange] = useState(false);

  const [dontChangeState, setDontChangeState] = useState(dontChange);

  const [alarmState, setAlarmState] = useState("");

  const deleteCharacter = (id) => {
    // const indexValue = userTodoData.findIndex((anItem) => {
    //   return anItem._id === id;
    // });
    // let newArr = [...userTodoData];
    // newArr.splice(indexValue, 1);
    // setUserTodoData(newArr);
    // showDeleteIcon(false);

    axios
      .delete(
        `${backendUrl}/loado/api/homeworks/${itemId}`,
        axiosConfigAuth(cookie.get("loadoUserToken"))
      )
      .then((response) => {
        if (
          response.data.totalLength > 0 &&
          response.data.totalLength % limit === 0
        ) {
          if (activePage <= response.data.totalLength / limit) {
            viewPage(activePage);
          } else if (activePage > response.data.totalLength / limit) {
            activePage = response.data.totalLength / limit;
            viewPage(activePage);
          }
        } else {
          viewPage(activePage);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
    showDeleteIcon(false);
  };

  const dontChangeCharacter = (id) => {
    const indexValue = userTodoData.findIndex((anItem) => {
      return anItem._id === id;
    });
    let newArr = [...userTodoData];
    newArr[indexValue].dontChange = !dontChange;
    newArr[indexValue]["attributeChanged"] = true;
    setDontChangeState(!dontChangeState);
    setUserTodoData(newArr);
    showDeleteIcon(false);
  };

  // ?????? 1??? ???????????? useEffect??? []??? ???????????? ?????? ????????? ?????????????????? ??????... ????????? [] ????????? ???
  useEffect(() => {
    let element = document.getElementById(`${itemId}_${characterName}`);
    const rightclickEvent = element.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      setShowDontChange(!showDontChange);
    });
    return () => {
      element.removeEventListener("contextmenu", rightclickEvent);
    };
  });

  return (
    <>
      <Grid.Column>
        <Image
          src={characterCdn[character]}
          size="mini"
          avatar
          onClick={() => showDeleteIcon(!deleteIcon)}
        />
        {deviceType === "mobile" && <br />}
        <span
          onClick={() => showDeleteIcon(!deleteIcon)}
          className={alarmCharacter ? "alarmLight" : ""}
          id={`${itemId}_${characterName}`}
          data-options={itemId}
        >
          {characterName}
        </span>
        {(attributeChanged || weeklyAttributeChanged) && (
          <Icon
            name="edit"
            size="small"
            style={{ color: "springgreen", marginLeft: "3px" }}
          />
        )}
        {deleteIcon && (
          <Popup
            trigger={
              <Icon
                name="trash"
                color="red"
                style={{ cursor: "pointer", marginLeft: "1px" }}
                onClick={() => deleteCharacter(itemId)}
              />
            }
            content={`'${characterName}'??? ?????? ????????? ?????????????????????????`}
          />
        )}
        {showDontChange && (
          <Popup
            trigger={
              <Icon
                name={dontChangeState ? "bell" : "bell slash"}
                color="yellow"
                style={{ cursor: "pointer", marginLeft: "1px" }}
                onClick={() => dontChangeCharacter(itemId)}
              />
            }
            content={
              dontChangeState
                ? `'${characterName}' ??????????????? ????????????`
                : `'${characterName}' ??????????????? ??????`
            }
          />
        )}
      </Grid.Column>
    </>
  );
}

export default CharacterAvatar;
