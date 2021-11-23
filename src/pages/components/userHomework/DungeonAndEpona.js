import React, { useState } from 'react';
import { Grid, Dropdown, Checkbox } from 'semantic-ui-react';

function changeArr(arr, match, dataValue, type) {
  const indexValue = arr.findIndex((anItem) => {
    return anItem._id === match;
  });
  let newArr = [...arr];
  newArr[indexValue][type] = dataValue;
  newArr[indexValue]['attributeChanged'] = true;
  return newArr;
}

function ChaosDunValue({
  chaosItem,
  userTodoData,
  setUserTodoData,
  viewByCheckBox,
}) {
  const options = [
    { key: `${chaosItem._id}_1`, text: '0회', value: 0 },
    { key: `${chaosItem._id}_2`, text: '1회', value: 1 },
    { key: `${chaosItem._id}_3`, text: '2회', value: 2 },
  ];

  const [chaosData, setChaosData] = useState(chaosItem.chaosDone);

  // 체크박스로 숙제를 체크하고 싶다는 피드백에 따라 작성
  const [chaosDataChecked, setChaosDataChecked] = useState(
    chaosItem.chaosDone === 2 ? true : false
  );

  const changeData = (event, data) => {
    setChaosData(data.value);
    const newArr = changeArr(
      userTodoData,
      chaosItem._id,
      data.value,
      'chaosDone'
    );
    setUserTodoData(newArr);
  };

  // 체크박스용
  const changeDataChecked = (event, data) => {
    setChaosDataChecked(data.checked);
    if (data.checked) changeData(event, { value: 2 });
    else changeData(event, { value: 0 });
  };

  return (
    <Grid.Column style={{ paddingTop: '1px' }}>
      {!viewByCheckBox ? (
        <Dropdown
          options={options}
          name='chaosDun'
          onChange={(event, data) => changeData(event, data)}
          value={chaosData}
        />
      ) : (
        // 체크박스용
        <Checkbox
          name='chaosDun'
          onChange={(event, data) => changeDataChecked(event, data)}
          checked={chaosDataChecked}
          value={chaosDataChecked}
        />
      )}
    </Grid.Column>
  );
}

function GuardianDunValue({
  guardianItem,
  userTodoData,
  setUserTodoData,
  viewByCheckBox,
}) {
  const options = [
    { key: `${guardianItem._id}_1`, text: '0회', value: 0 },
    { key: `${guardianItem._id}_2`, text: '1회', value: 1 },
    { key: `${guardianItem._id}_3`, text: '2회', value: 2 },
  ];

  const [guardianData, setGuardianData] = useState(guardianItem.guardianDone);

  const [guardianDataChecked, setGuardianDataChecked] = useState(
    guardianItem.guardianDone === 2 ? true : false
  );

  const changeData = (event, data) => {
    setGuardianData(data.value);
    const newArr = changeArr(
      userTodoData,
      guardianItem._id,
      data.value,
      'guardianDone'
    );
    setUserTodoData(newArr);
  };

  // 체크박스용
  const changeDataChecked = (event, data) => {
    setGuardianDataChecked(data.checked);
    if (data.checked) changeData(event, { value: 2 });
    else changeData(event, { value: 0 });
  };

  return (
    <Grid.Column style={{ paddingTop: '1px' }}>
      {!viewByCheckBox ? (
        <Dropdown
          options={options}
          name='guardianDun'
          onChange={(event, data) => changeData(event, data)}
          value={guardianData}
        />
      ) : (
        <Checkbox
          name='guardianDun'
          onChange={(event, data) => changeDataChecked(event, data)}
          checked={guardianDataChecked}
          value={guardianDataChecked}
        />
      )}
    </Grid.Column>
  );
}

function EponaValue({
  eponaItem,
  userTodoData,
  setUserTodoData,
  viewByCheckBox,
}) {
  const options = [
    { key: `${eponaItem._id}_1`, text: '0회', value: 0 },
    { key: `${eponaItem._id}_2`, text: '1회', value: 1 },
    { key: `${eponaItem._id}_3`, text: '2회', value: 2 },
    { key: `${eponaItem._id}_4`, text: '3회', value: 3 },
  ];

  const [eponaData, setEponaData] = useState(eponaItem.eponaDone);

  const [eponaDataChecked, setEponaDataChecked] = useState(
    eponaItem.eponaDone === 3 ? true : false
  );

  const changeData = (event, data) => {
    setEponaData(data.value);
    const newArr = changeArr(
      userTodoData,
      eponaItem._id,
      data.value,
      'eponaDone'
    );
    setUserTodoData(newArr);
  };

  // 체크박스용
  const changeDataChecked = (event, data) => {
    setEponaDataChecked(data.checked);
    if (data.checked) changeData(event, { value: 3 });
    else changeData(event, { value: 0 });
  };

  return (
    <Grid.Column>
      {!viewByCheckBox ? (
        <Dropdown
          options={options}
          name='epona'
          onChange={(event, data) => changeData(event, data)}
          value={eponaData}
        />
      ) : (
        <Checkbox
          name='epona'
          onChange={(event, data) => changeDataChecked(event, data)}
          checked={eponaDataChecked}
          value={eponaDataChecked}
        />
      )}
    </Grid.Column>
  );
}

// Currently not used for nicer view
function WeeklyGuardian({
  weeklyGuardianItem,
  userTodoData,
  setUserTodoData,
  viewByCheckBox,
}) {
  const options = [
    { key: `${weeklyGuardianItem._id}_1`, text: '0회', value: 0 },
    { key: `${weeklyGuardianItem._id}_2`, text: '1회', value: 1 },
    { key: `${weeklyGuardianItem._id}_3`, text: '2회', value: 2 },
    { key: `${weeklyGuardianItem._id}_4`, text: '3회', value: 3 },
  ];

  const [weeklyGuardianData, setWeeklyGuardianData] = useState(
    weeklyGuardianItem.guardianWeeklyDone
  );

  const [weeklyGuardianDataChecked, setWeeklyGuardianDataChecked] = useState(
    weeklyGuardianItem.guardianWeeklyDone === 3 ? true : false
  );

  const changeData = (event, data) => {
    setWeeklyGuardianData(data.value);
    const indexValue = userTodoData.findIndex((anItem) => {
      return anItem._id === weeklyGuardianItem._id;
    });
    let newArr = [...userTodoData];
    newArr[indexValue].guardianWeeklyDone = data.value;
    newArr[indexValue]['attributeChanged'] = true;
    setUserTodoData(newArr);
  };

  // 체크박스용
  const changeDataChecked = (event, data) => {
    setWeeklyGuardianDataChecked(data.checked);
    if (data.checked) changeData(event, { value: 3 });
    else changeData(event, { value: 0 });
  };

  return (
    <Grid.Column>
      {!viewByCheckBox ? (
        <Dropdown
          options={options}
          name='weeklyGuardian'
          onChange={(event, data) => changeData(event, data)}
          value={weeklyGuardianData}
        />
      ) : (
        <Checkbox
          name='weeklyGuardian'
          onChange={(event, data) => changeDataChecked(event, data)}
          checked={weeklyGuardianDataChecked}
          value={weeklyGuardianDataChecked}
        />
      )}
    </Grid.Column>
  );
}

export { ChaosDunValue, GuardianDunValue, EponaValue, WeeklyGuardian };
