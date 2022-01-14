import React from "react";
import { Grid, Image } from "semantic-ui-react";

import {
  AbyssDun6Types,
  AbyssDun3Nakwon,
  AbyssDun2,
  ArgosRaid,
  BaltanRaid,
  BiakissRaid,
  KukseitnRaid,
  AbrelRaid,
} from "./AbyssAndRaid";

import contentKeyKorToEng from "../../../_data/contentDefinition";

function WeeklyRaidContents({ content, userTodoData, setUserTodoData }) {
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
      {content === "어비스6종" &&
        userTodoData.map((item, idx) => (
          <AbyssDun6Types
            abyssDun6TypesItem={item}
            userTodoData={userTodoData}
            setUserTodoData={setUserTodoData}
          />
        ))}
      {content === "낙원3종" &&
        userTodoData.map((item, idx) => (
          <AbyssDun3Nakwon
            abyssDun3NakwonItem={item}
            userTodoData={userTodoData}
            setUserTodoData={setUserTodoData}
          />
        ))}
      {content === "오레하2종" &&
        userTodoData.map((item, idx) => (
          <AbyssDun2
            abyssDun2Item={item}
            userTodoData={userTodoData}
            setUserTodoData={setUserTodoData}
          />
        ))}
      {content === "아르고스" &&
        userTodoData.map((item, idx) => (
          <ArgosRaid
            argosRaidItem={item}
            userTodoData={userTodoData}
            setUserTodoData={setUserTodoData}
          />
        ))}
      {content === "발탄" &&
        userTodoData.map((item, idx) => (
          <BaltanRaid
            baltanRaidItem={item}
            userTodoData={userTodoData}
            setUserTodoData={setUserTodoData}
          />
        ))}
      {content === "비아키스" &&
        userTodoData.map((item, idx) => (
          <BiakissRaid
            biakissRaidItem={item}
            userTodoData={userTodoData}
            setUserTodoData={setUserTodoData}
          />
        ))}
      {content === "쿠크세이튼" &&
        userTodoData.map((item, idx) => (
          <KukseitnRaid
            kukseitnRaidItem={item}
            userTodoData={userTodoData}
            setUserTodoData={setUserTodoData}
          />
        ))}
      {content === "아브렐슈드" &&
        userTodoData.map((item, idx) => (
          <AbrelRaid
            abrelRaidItem={item}
            userTodoData={userTodoData}
            setUserTodoData={setUserTodoData}
          />
        ))}
    </Grid.Row>
  );
}

export default WeeklyRaidContents;
