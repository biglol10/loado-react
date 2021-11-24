import React, { useState, useEffect } from "react";
import { Grid, TextArea, Icon } from "semantic-ui-react";

function PerIdNote({ item, userTodoData, setUserTodoData, deviceType }) {
  const [showTextArea, setShowTextArea] = useState(false);
  const [textValue, setTextValue] = useState(item.note);

  const dontChangeCharacter = (id, theText) => {
    const indexValue = userTodoData.findIndex((anItem) => {
      return anItem._id === id;
    });
    let newArr = [...userTodoData];
    newArr[indexValue]["note"] = theText;
    newArr[indexValue]["attributeChanged"] = true;
    setUserTodoData(newArr);
  };

  const changeText = (event) => {
    if (event.target.value.length > 20) return;
    setTextValue(event.target.value);
    dontChangeCharacter(item._id, event.target.value);
  };

  return (
    <Grid.Column>
      {!showTextArea ? (
        <>
          {item.note}{" "}
          <Icon
            inverted
            name="pencil square"
            color="pink"
            onClick={() => setShowTextArea(!showTextArea)}
            style={{ cursor: "pointer" }}
          />
        </>
      ) : deviceType === "mobile" ? (
        <TextArea
          style={{ width: "100%" }}
          value={textValue}
          onChange={(event) => changeText(event)}
        />
      ) : (
        <TextArea value={textValue} onChange={(event) => changeText(event)} />
      )}
    </Grid.Column>
  );
}

export default PerIdNote;
