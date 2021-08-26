import React, { useState, useEffect } from "react";
import { Grid, Image, Icon, Popup } from "semantic-ui-react";
import { characterCdn } from "../../_data/characterDefinition";
import axios from "axios";
import cookie from "js-cookie";
import "./CharacterAvatarCss.css";
import backendUrl from "../Utils/ConstVar";

function CharacterAvatar({
  itemId,
  character,
  characterName,
  attributeChanged,
  weeklyAttributeChanged,
  axiosConfig,
  viewPage,
  alarmCharacter,
  limit,
}) {
  const [deleteIcon, showDeleteIcon] = useState(false);

  const [alarmState, setAlarmState] = useState("");

  const deleteCharacter = (id) => {
    // console.log(id);
    // const indexValue = userTodoData.findIndex((anItem) => {
    //   return anItem._id === id;
    // });
    // let newArr = [...userTodoData];
    // newArr.splice(indexValue, 1);
    // setUserTodoData(newArr);
    // showDeleteIcon(false);

    axios
      .delete(`${backendUrl}/loado/api/homeworks/${itemId}`, axiosConfig)
      .then((response) => {
        if (
          response.data.totalLength > 0 &&
          response.data.totalLength % limit === 0
        ) {
          viewPage(true, false);
        } else {
          viewPage(false, false);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
    showDeleteIcon(false);
  };

  return (
    <>
      <Grid.Column>
        <Image
          src={characterCdn[character]}
          size="mini"
          avatar
          onClick={() => showDeleteIcon(!deleteIcon)}
        />
        <span
          onClick={() => showDeleteIcon(!deleteIcon)}
          className={alarmCharacter ? "alarmLight" : ""}
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
            content={`'${characterName}'에 대한 정보를 삭제하시겠습니까?`}
          />
        )}
      </Grid.Column>
    </>
  );
}

export default CharacterAvatar;
