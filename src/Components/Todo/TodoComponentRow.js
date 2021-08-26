import React, { useState, useEffect } from "react";
import { Grid, Image, Dropdown, Checkbox, Card, Icon } from "semantic-ui-react";
import TextField from "@material-ui/core/TextField";
import "./TodoComponent.css";

function TodoComponent({
  listId,
  userTodoData,
  setUserTodoData,
  iconId,
  setIconId,
  setChangedList,
  thisItemChanged,
}) {
  const [chaosRestValue, setChaosRestValue] = useState(
    userTodoData.chaosRestValue
  );
  const [guardianRestValue, setGuardianRestValue] = useState(
    userTodoData.guardianRestValue
  );
  const [eponaRestValue, setEponaRestValue] = useState(
    userTodoData.eponaRestValue
  );

  const [chaosRestValueChange, setChaosRestValueChange] = useState(
    userTodoData.chaosRestValue
  );
  const [guardianRestValueChange, setGuardianRestValueChange] = useState(
    userTodoData.guardianRestValue
  );
  const [eponaRestValueChange, setEponaRestValueChange] = useState(
    userTodoData.eponaRestValue
  );

  const options_2 = [
    { key: 1, text: "0회", value: 0 },
    { key: 2, text: "1회", value: 1 },
    { key: 3, text: "2회", value: 2 },
  ];
  const options_3 = [
    { key: 4, text: "0회", value: 0 },
    { key: 5, text: "1회", value: 1 },
    { key: 6, text: "2회", value: 2 },
    { key: 7, text: "3회", value: 3 },
  ];
  const options_combo1 = [
    { key: "3types", text: "어비스레이드", value: "3types" },
    { key: "kukuseitn", text: "쿠크리허설", value: "kukuseitn" },
    { key: "abrel", text: "아브렐데쟈뷰", value: "abrel" },
  ];
  const changeData = (event, data) => {
    console.log(data);
  };

  const [showRail, setShowRail] = useState(false);

  useEffect(() => {
    setShowRail(listId === iconId);
    setChaosRestValueChange(chaosRestValue);
    setGuardianRestValueChange(guardianRestValue);
    setEponaRestValueChange(eponaRestValue);
  }, [iconId]);

  useEffect(() => {
    let element = document.getElementById(listId);
    const rightclickEvent = element.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      //   console.log(`listId is ${listId} and iconId is ${iconId}`);
      if (listId === iconId) {
        setIconId("");
      } else {
        setIconId(listId);
      }
    });
    return () => {
      element.removeEventListener("contextmenu", rightclickEvent);
    };
  });

  const handleIconClick = (e) => {
    // console.log(`listId is ${listId} and iconId is ${iconId}`);
    if (e.target.id === "closeIcon") {
      setIconId("");
      setChaosRestValueChange(chaosRestValue);
      setGuardianRestValueChange(guardianRestValue);
      setEponaRestValueChange(eponaRestValue);
    } else if (e.target.id === "checkIcon") {
      setIconId("");
      setChaosRestValue(chaosRestValueChange);
      setGuardianRestValue(guardianRestValueChange);
      setEponaRestValue(eponaRestValueChange);
      setChangedList(listId);
    }
  };

  const valueChange = (e) => {
    e.preventDefault();
    if (e.target.id === "chaosChange") {
      const changedValue = e.target.value;
      const valueOutput =
        chaosRestValueChange + (changedValue - chaosRestValueChange) * 10;
      if (valueOutput < 0) setChaosRestValueChange(0);
      else if (0 <= valueOutput && 100 >= valueOutput)
        setChaosRestValueChange(valueOutput);
      else setChaosRestValueChange(100);

      return;
    }
    if (e.target.id === "guardianChange") {
      const changedValue = e.target.value;
      const valueOutput =
        guardianRestValueChange + (changedValue - guardianRestValueChange) * 10;
      if (valueOutput < 0) setGuardianRestValueChange(0);
      else if (0 <= valueOutput && 100 >= valueOutput)
        setGuardianRestValueChange(valueOutput);
      else setGuardianRestValueChange(100);

      return;
    }
    if (e.target.id === "eponaChange") {
      const changedValue = e.target.value;
      const valueOutput =
        eponaRestValueChange + (changedValue - eponaRestValueChange) * 10;
      if (valueOutput < 0) setEponaRestValueChange(0);
      else if (0 <= valueOutput && 100 >= valueOutput)
        setEponaRestValueChange(valueOutput);
      else setEponaRestValueChange(100);

      return;
    }
  };

  return (
    <Grid.Row className={thisItemChanged}>
      <Grid.Column id={listId} style={{ width: "150px" }}>
        <Image
          src="https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/lancemaster_s.png"
          size="mini"
          avatar
        />
        <br />
        {userTodoData.characterName}
      </Grid.Column>
      <Grid.Column width={2} style={{ position: "relative" }}>
        카던: {chaosRestValue}
        <br />
        가디언: {guardianRestValue}
        <br />
        에포나: {eponaRestValue}
        {showRail && (
          <Card
            className="eachCard"
            style={{
              position: "absolute",
              top: "0px",
              right: "-10px",
              zIndex: "99",
              backgroundColor: "antiquewhite",
            }}
          >
            <Card.Header
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div>
                <Image
                  src="https://cdn-lostark.game.onstove.com/2018/obt/assets/images/common/thumb/lancemaster_s.png"
                  size="mini"
                  avatar
                />
                <span style={{ marginLeft: "5px", color: "maroon" }}>
                  {userTodoData.characterName}
                </span>
              </div>
              <div>
                <Icon
                  id="closeIcon"
                  name="close"
                  size="large"
                  color="red"
                  className="iconButton"
                  onClick={(e) => handleIconClick(e)}
                />
                <Icon
                  id="checkIcon"
                  className="iconButton"
                  name="check"
                  size="large"
                  color="green"
                  onClick={(e) => handleIconClick(e)}
                />
              </div>
            </Card.Header>
            <Card.Content>
              <TextField
                id="chaosChange"
                type="number"
                label="카오스던전"
                onChange={(e) => valueChange(e)}
                value={chaosRestValueChange}
              ></TextField>
              <TextField
                id="guardianChange"
                type="number"
                label="가디언토벌"
                onChange={(e) => valueChange(e)}
                value={guardianRestValueChange}
              />
              <TextField
                id="eponaChange"
                type="number"
                label="에포나"
                onChange={(e) => valueChange(e)}
                value={eponaRestValueChange}
              />
            </Card.Content>
          </Card>
        )}
      </Grid.Column>
      <Grid.Column width={12}>
        <Grid columns="equal">
          <Grid.Row>
            <Grid.Column>
              <Dropdown
                text="0회"
                options={options_2}
                name="chaosDun"
                onChange={(event, data) => changeData(event, data)}
              />
            </Grid.Column>
            <Grid.Column>
              <Dropdown
                text="0회"
                options={options_2}
                name="guardianDun"
                onChange={(event, data) => changeData(event, data)}
              />
            </Grid.Column>
            <Grid.Column>
              <Dropdown
                text="0회"
                options={options_3}
                name="epona"
                onChange={(event, data) => changeData(event, data)}
              />
            </Grid.Column>
            <Grid.Column>
              <Checkbox
                name="guardianRaid"
                onChange={(event, data) => changeData(event, data)}
              />
            </Grid.Column>
            <Grid.Column>
              <Checkbox
                name="AbyssDun2"
                onChange={(event, data) => changeData(event, data)}
              />
              {/* <Dropdown
                placeholder="어비스던전"
                fluid
                multiple
                selection
                options={options_combo1}
              /> */}
            </Grid.Column>
            <Grid.Column width={2}>
              <Dropdown
                placeholder="주간던전"
                fluid
                multiple
                selection
                options={options_combo1}
              />
            </Grid.Column>
            <Grid.Column>
              <Checkbox
                name="argos"
                onChange={(event, data) => changeData(event, data)}
              />
            </Grid.Column>
            <Grid.Column>
              <Checkbox
                name="baltan"
                onChange={(event, data) => changeData(event, data)}
              />
            </Grid.Column>
            <Grid.Column>
              <Checkbox
                name="biakiss"
                onChange={(event, data) => changeData(event, data)}
              />
            </Grid.Column>
            <Grid.Column>
              <Checkbox
                name="kukuseitn"
                onChange={(event, data) => changeData(event, data)}
              />
            </Grid.Column>
            <Grid.Column>
              <Checkbox
                name="abrel"
                onChange={(event, data) => changeData(event, data)}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Grid.Column>
    </Grid.Row>
  );
}

export default TodoComponent;
