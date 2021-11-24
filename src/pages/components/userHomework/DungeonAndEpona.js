import React from "react";
import { Grid, Image } from "semantic-ui-react";

import {
  ChaosDunValue,
  GuardianDunValue,
  EponaValue,
  WeeklyGuardian,
} from "./DungeonAndEponaUtil";

import contentKeyKorToEng from "../../../_data/contentDefinition";

function DungeonAndEpona({
  content,
  userTodoData,
  setUserTodoData,
  viewByCheckBox,
}) {
  return (
    <Grid.Row className="eachRow">
      <Grid.Column className="contentColumn">
        <div>
          <Image
            src={`./images/loa_icons/${contentKeyKorToEng[content]}.png`}
            avatar
            className="contentImage"
          />
          <span>{content}</span>
        </div>
      </Grid.Column>
      {content === "카오스던전" &&
        userTodoData.map((item, idx) => (
          <ChaosDunValue
            chaosItem={item}
            userTodoData={userTodoData}
            setUserTodoData={setUserTodoData}
            viewByCheckBox={viewByCheckBox}
          />
        ))}
      {content === "가디언토벌" &&
        userTodoData.map((item, idx) => (
          <GuardianDunValue
            guardianItem={item}
            userTodoData={userTodoData}
            setUserTodoData={setUserTodoData}
            viewByCheckBox={viewByCheckBox}
          />
        ))}
      {content === "에포나" &&
        userTodoData.map((item, idx) => (
          <EponaValue
            eponaItem={item}
            userTodoData={userTodoData}
            setUserTodoData={setUserTodoData}
            viewByCheckBox={viewByCheckBox}
          />
        ))}
      {content === "주간가디언" &&
        userTodoData.map((item, idx) => (
          <WeeklyGuardian
            weeklyGuardianItem={item}
            userTodoData={userTodoData}
            setUserTodoData={setUserTodoData}
            viewByCheckBox={viewByCheckBox}
          />
        ))}
    </Grid.Row>
  );
}

export default DungeonAndEpona;
