import React, { useState } from "react";
import { Grid, Dropdown } from "semantic-ui-react";

function ChaosDunValue({ chaosItem, userTodoData, setUserTodoData }) {
  const options = [
    { key: `${chaosItem._id}_1`, text: "0회", value: 0 },
    { key: `${chaosItem._id}_2`, text: "1회", value: 1 },
    { key: `${chaosItem._id}_3`, text: "2회", value: 2 },
  ];

  const [chaosData, setChaosData] = useState(chaosItem.chaosDone);

  const changeData = (event, data) => {
    setChaosData(data.value);
    const indexValue = userTodoData.findIndex((anItem) => {
      return anItem._id === chaosItem._id;
    });
    let newArr = [...userTodoData];
    newArr[indexValue].chaosDone = data.value;
    newArr[indexValue]["attributeChanged"] = true;
    setUserTodoData(newArr);
  };

  return (
    <Grid.Column style={{ paddingTop: "1px" }}>
      <Dropdown
        options={options}
        name="chaosDun"
        onChange={(event, data) => changeData(event, data)}
        value={chaosData}
      />
    </Grid.Column>
  );
}

function GuardianDunValue({ guardianItem, userTodoData, setUserTodoData }) {
  const options = [
    { key: `${guardianItem._id}_1`, text: "0회", value: 0 },
    { key: `${guardianItem._id}_2`, text: "1회", value: 1 },
    { key: `${guardianItem._id}_3`, text: "2회", value: 2 },
  ];

  const [guardianData, setGuardianData] = useState(guardianItem.guardianDone);

  const changeData = (event, data) => {
    setGuardianData(data.value);
    const indexValue = userTodoData.findIndex((anItem) => {
      return anItem._id === guardianItem._id;
    });
    let newArr = [...userTodoData];
    newArr[indexValue].guardianDone = data.value;
    newArr[indexValue]["attributeChanged"] = true;
    setUserTodoData(newArr);
  };

  return (
    <Grid.Column style={{ paddingTop: "1px" }}>
      <Dropdown
        options={options}
        name="guardianDun"
        onChange={(event, data) => changeData(event, data)}
        value={guardianData}
      />
    </Grid.Column>
  );
}

function EponaValue({ eponaItem, userTodoData, setUserTodoData }) {
  const options = [
    { key: `${eponaItem._id}_1`, text: "0회", value: 0 },
    { key: `${eponaItem._id}_2`, text: "1회", value: 1 },
    { key: `${eponaItem._id}_3`, text: "2회", value: 2 },
    { key: `${eponaItem._id}_4`, text: "3회", value: 3 },
  ];

  const [eponaData, setEponaData] = useState(eponaItem.eponaDone);

  const changeData = (event, data) => {
    setEponaData(data.value);
    const indexValue = userTodoData.findIndex((anItem) => {
      return anItem._id === eponaItem._id;
    });
    let newArr = [...userTodoData];
    newArr[indexValue].eponaDone = data.value;
    newArr[indexValue]["attributeChanged"] = true;
    setUserTodoData(newArr);
  };

  return (
    <Grid.Column>
      <Dropdown
        options={options}
        name="epona"
        onChange={(event, data) => changeData(event, data)}
        value={eponaData}
      />
    </Grid.Column>
  );
}

function WeeklyGuardian({ weeklyGuardianItem, userTodoData, setUserTodoData }) {
  const options = [
    { key: `${weeklyGuardianItem._id}_1`, text: "0회", value: 0 },
    { key: `${weeklyGuardianItem._id}_2`, text: "1회", value: 1 },
    { key: `${weeklyGuardianItem._id}_3`, text: "2회", value: 2 },
    { key: `${weeklyGuardianItem._id}_4`, text: "3회", value: 3 },
  ];

  const [weeklyGuardianData, setWeeklyGuardianData] = useState(
    weeklyGuardianItem.guardianWeeklyDone
  );

  const changeData = (event, data) => {
    setWeeklyGuardianData(data.value);
    const indexValue = userTodoData.findIndex((anItem) => {
      return anItem._id === weeklyGuardianItem._id;
    });
    let newArr = [...userTodoData];
    newArr[indexValue].guardianWeeklyDone = data.value;
    newArr[indexValue]["attributeChanged"] = true;
    setUserTodoData(newArr);
  };

  return (
    <Grid.Column>
      <Dropdown
        options={options}
        name="weeklyGuardian"
        onChange={(event, data) => changeData(event, data)}
        value={weeklyGuardianData}
      />
    </Grid.Column>
  );
}

export { ChaosDunValue, GuardianDunValue, EponaValue, WeeklyGuardian };
