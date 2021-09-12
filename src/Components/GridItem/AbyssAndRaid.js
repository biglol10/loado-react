import React, { useState } from 'react';
import { Grid, Checkbox, Dropdown, Label } from 'semantic-ui-react';

const changeDatafunction = (
  event,
  data,
  setItem,
  userTodoData,
  setUserTodoData,
  findIndexItem,
  changeItem
) => {
  setItem(data.checked);
  const indexValue = userTodoData.findIndex((anItem) => {
    return anItem._id === findIndexItem._id;
  });
  let newArr = [...userTodoData];
  newArr[indexValue][changeItem] = data.checked;
  let attrChanged =
    changeItem === 'abyssDungeonWeekly'
      ? 'weeklyAttributeChanged'
      : 'attributeChanged';
  newArr[indexValue][attrChanged] = true;
  setUserTodoData(newArr);
};

function AbyssDun2({ abyssDun2Item, userTodoData, setUserTodoData }) {
  const [abyssDun2, setAbyssDun2] = useState(abyssDun2Item.abyssDungeon2);

  return (
    <Grid.Column>
      <Checkbox
        name='AbyssDun2'
        onChange={(event, data) =>
          changeDatafunction(
            event,
            data,
            setAbyssDun2,
            userTodoData,
            setUserTodoData,
            abyssDun2Item,
            'abyssDungeon2'
          )
        }
        checked={abyssDun2}
      />
    </Grid.Column>
  );
}

function AbyssRaid({ idx, abyssRaidItem, userTodoData, setUserTodoData }) {
  const [abyssRaid, setAbyssRaid] = useState(abyssRaidItem.abyssDungeonWeekly);

  return (
    idx === 0 && (
      <Grid.Column style={{ display: 'flex' }}>
        <Checkbox
          name='AbyssRaid'
          onChange={(event, data) =>
            changeDatafunction(
              event,
              data,
              setAbyssRaid,
              userTodoData,
              setUserTodoData,
              abyssRaidItem,
              'abyssDungeonWeekly'
            )
          }
          checked={abyssRaid}
        />
      </Grid.Column>
    )
  );
}

function RehearsalAndDejavu({
  rehearsalAndDejavuItem,
  userTodoData,
  setUserTodoData,
  idx,
}) {
  const options_combo1 = [
    { key: 'kukuseitn', text: '쿠크리허설', value: 'kukuseitn' },
    { key: 'abrel', text: '아브렐데쟈뷰', value: 'abrel' },
  ];
  const [rehearsalAndDejavu, setRehearsalAndDejavu] = useState(
    rehearsalAndDejavuItem.rehearsalAndDejavu
  );

  const changeData = (event, data) => {
    setRehearsalAndDejavu(data.value);
    const indexValue = userTodoData.findIndex((anItem) => {
      return anItem._id === rehearsalAndDejavuItem._id;
    });
    let newArr = [...userTodoData];
    newArr[indexValue].rehearsalAndDejavu = data.value;
    newArr[indexValue].weeklyAttributeChanged = true;
    setUserTodoData(newArr);
  };

  return (
    idx === 0 && (
      <>
        <Grid.Column width={3}>
          <Dropdown
            placeholder='쿠크/아브렐'
            fluid
            multiple
            selection
            options={options_combo1}
            value={rehearsalAndDejavu}
            onChange={(event, data) => changeData(event, data)}
          />
        </Grid.Column>
      </>
    )
  );
}

function ArgosRaid({ argosRaidItem, userTodoData, setUserTodoData }) {
  const [argosRaid, setArgosRaid] = useState(argosRaidItem.argos);

  return (
    <Grid.Column>
      <Checkbox
        name='ArgosRaid'
        onChange={(event, data) =>
          changeDatafunction(
            event,
            data,
            setArgosRaid,
            userTodoData,
            setUserTodoData,
            argosRaidItem,
            'argos'
          )
        }
        checked={argosRaid}
      />
    </Grid.Column>
  );
}

function BaltanRaid({ baltanRaidItem, userTodoData, setUserTodoData }) {
  const [baltanRaid, setBaltanRaid] = useState(baltanRaidItem.baltan);

  return (
    <Grid.Column>
      <Checkbox
        name='BaltanRaid'
        onChange={(event, data) =>
          changeDatafunction(
            event,
            data,
            setBaltanRaid,
            userTodoData,
            setUserTodoData,
            baltanRaidItem,
            'baltan'
          )
        }
        checked={baltanRaid}
      />
    </Grid.Column>
  );
}

function BiakissRaid({ biakissRaidItem, userTodoData, setUserTodoData }) {
  const [biakissRaid, setBiakissRaid] = useState(biakissRaidItem.biakiss);

  return (
    <Grid.Column>
      <Checkbox
        name='BiakissRaid'
        onChange={(event, data) =>
          changeDatafunction(
            event,
            data,
            setBiakissRaid,
            userTodoData,
            setUserTodoData,
            biakissRaidItem,
            'biakiss'
          )
        }
        checked={biakissRaid}
      />
    </Grid.Column>
  );
}

function KukseitnRaid({ kukseitnRaidItem, userTodoData, setUserTodoData }) {
  const [kukseitnRaid, setKukseitnRaid] = useState(kukseitnRaidItem.kukuseitn);

  return (
    <Grid.Column>
      <Checkbox
        name='KukseitnRaid'
        onChange={(event, data) =>
          changeDatafunction(
            event,
            data,
            setKukseitnRaid,
            userTodoData,
            setUserTodoData,
            kukseitnRaidItem,
            'kukuseitn'
          )
        }
        checked={kukseitnRaid}
      />
    </Grid.Column>
  );
}

function AbrelRaid({ abrelRaidItem, userTodoData, setUserTodoData }) {
  const [abrelRaid, setAbrelRaid] = useState(abrelRaidItem.abrel);

  return (
    <Grid.Column>
      <Checkbox
        name='AbrelRaid'
        onChange={(event, data) =>
          changeDatafunction(
            event,
            data,
            setAbrelRaid,
            userTodoData,
            setUserTodoData,
            abrelRaidItem,
            'abrel'
          )
        }
        checked={abrelRaid}
      />
    </Grid.Column>
  );
}

export {
  AbyssDun2,
  AbyssRaid,
  RehearsalAndDejavu,
  ArgosRaid,
  BaltanRaid,
  BiakissRaid,
  KukseitnRaid,
  AbrelRaid,
};
