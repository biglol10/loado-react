import "./App.css";
import "semantic-ui-css/semantic.min.css";
import "react-toastify/dist/ReactToastify.css";
import { Grid } from "semantic-ui-react";
import NavHeader from "./Components/Nav/NavHeader";
import CharacterToDo from "./Components/Home/CharacterToDo";
import CharacterToDoRow from "./Components/Home/CharacterToDoRow";
import Login from "./Components/Home/Login";
import Register from "./Components/Home/Register";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createMedia } from "@artsy/fresnel";

const AppMedia = createMedia({
  breakpoints: { zero: 0, mobile: 549, tablet: 850, computer: 1080 },
});

const mediaStyles = AppMedia.createMediaStyle();
const { Media, MediaContextProvider } = AppMedia;

function App() {
  return (
    <MediaContextProvider>
      <Router>
        <Switch>
          <Route path="/userhomework">
            <>
              <Grid stackable style={{ border: "none" }}>
                <Grid.Row
                  style={{
                    paddingBottom: "0rem",
                    background: "lightCoral",
                  }}
                >
                  <Grid.Column style={{ border: "none" }}>
                    <NavHeader />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row
                  style={{
                    paddingBottom: "0rem",
                    paddingTop: "0rem",
                    height: "94vh",
                    backgroundColor: "#384862",
                  }}
                >
                  <Grid.Column>
                    <Media between={["zero", "tablet"]}>
                      <CharacterToDoRow limit={4} type="mobile" />
                    </Media>
                    <Media between={["tablet", "computer"]}>
                      <CharacterToDoRow limit={6} type="mobile" />
                    </Media>
                    <Media greaterThanOrEqual="computer">
                      <CharacterToDoRow limit={8} type="computer" />
                    </Media>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </>
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/" exact>
            <Login />
          </Route>
        </Switch>
      </Router>
    </MediaContextProvider>
  );
}

export default App;
