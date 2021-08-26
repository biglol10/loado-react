import React, { useState } from "react";
import "./CharacterToDo.css";
import { Header, Button, Segment, Grid, Container } from "semantic-ui-react";
import TodoComponent from "../Todo/TodoComponent";
import todoData from "../../_data/todoData.js";

function CharacterToDo() {
  const todayDate = new Date(Date.now());
  const today = `${todayDate.getFullYear()}-${
    todayDate.getMonth() + 1
  }-${todayDate.getDate()}`;

  const [userTodoData, setUserTodoData] = useState(todoData);

  const [iconId, setIconId] = useState("");

  const [changedList, setChangedList] = useState([]);

  return (
    <>
      <Grid className="fullPage">
        <Container
          style={{ width: "95%", marginLeft: "2.5%", marginRight: "2.5%" }}
        >
          <Grid.Column width={16}>
            <Segment basic style={{ marginBottom: "0px" }}>
              <Header
                size="huge"
                style={{ color: "deepskyblue", textAlign: "center" }}
              >
                로아 숙제관리
              </Header>
            </Segment>
            <Segment basic className="contentHeader">
              <div className="headerValueStart">
                <Header size="medium" style={{ color: "white" }}>
                  {today}{" "}
                  <span style={{ marginLeft: "40px" }}>
                    금일 06:00 ~ 명일 05:59
                  </span>
                </Header>
              </div>
              <div className="headerValueEnd">
                <Button inverted color="red">
                  변경사항 저장
                </Button>
              </div>
            </Segment>
            <Segment basic style={{ backgroundColor: "slategrey" }}>
              <Grid columns={16}>
                <Grid.Row style={{ borderBottom: "0.05rem inset ivory" }}>
                  <Grid.Column style={{ width: "150px" }}></Grid.Column>
                  <Grid.Column width={2}>휴식게이지</Grid.Column>
                  <Grid.Column width={12}>
                    <Grid columns="equal">
                      <Grid.Row>
                        <Grid.Column>카오스던전</Grid.Column>
                        <Grid.Column>가디언토벌</Grid.Column>
                        <Grid.Column>에포나</Grid.Column>
                        <Grid.Column>가디언레이드</Grid.Column>
                        <Grid.Column>어비스2종</Grid.Column>
                        <Grid.Column width={2}>주간던전</Grid.Column>
                        <Grid.Column>아르고스</Grid.Column>
                        <Grid.Column>발탄</Grid.Column>
                        <Grid.Column>비아키스</Grid.Column>
                        <Grid.Column>쿠크세이튼</Grid.Column>
                        <Grid.Column>아브렐슈드</Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </Grid.Column>
                </Grid.Row>
                {userTodoData.map((item, idx) => (
                  <TodoComponent
                    listId={item._id}
                    userTodoData={item}
                    setUserTodoData={setUserTodoData}
                    iconId={iconId}
                    setIconId={setIconId}
                    setChangedList={setChangedList}
                    thisItemChanged={
                      changedList.includes(item._id)
                        ? "thisItemChanged"
                        : "thisItemNotChanged"
                    }
                  />
                ))}
              </Grid>
            </Segment>
          </Grid.Column>
        </Container>
      </Grid>
    </>
  );
}

export default CharacterToDo;
