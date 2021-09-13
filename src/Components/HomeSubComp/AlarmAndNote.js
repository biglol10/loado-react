import React from "react";
import { Header, Label, Icon } from "semantic-ui-react";

function AlarmAndNote({
  alarmTrue,
  alarmRestValue,
  userTodoData,
  showNote,
  setShowNote,
}) {
  return (
    <Header
      as="h4"
      style={{
        color: "white",
        display: "flex",
        padding: ".78571429em 1.5em .78571429em",
      }}
    >
      <div>
        <Icon
          className="iconClass"
          name={alarmTrue ? "alarm" : "alarm mute"}
          onClick={() => alarmRestValue(userTodoData)}
        />
        {"  //  "}
        <Icon
          className="iconClass"
          name={!showNote ? "sticky note outline" : "angle double up"}
          onClick={() => setShowNote(!showNote)}
        />
      </div>
    </Header>
  );
}

export default AlarmAndNote;
