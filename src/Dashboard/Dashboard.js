import React from "react";
import "../Components/Home/CharacterToDo.css";
import { Segment, Grid } from "semantic-ui-react";

function Dashboard() {
  return (
    <Segment className="fullPage" style={{ height: "94vh", border: "none" }}>
      <Grid columns={2}>
        <Grid.Column>
          <span>dd</span>
        </Grid.Column>
        <Grid.Column>
          <span>asdf</span>
        </Grid.Column>
      </Grid>
    </Segment>
  );
}

export default Dashboard;
