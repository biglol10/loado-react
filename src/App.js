import "./App.css";
import "semantic-ui-css/semantic.min.css";
import "react-toastify/dist/ReactToastify.css";
import "cropperjs/dist/cropper.css";
import { Grid, Segment } from "semantic-ui-react";
import NavHeader from "./pages/navHeader/web/NavHeader";
import NavHeaderMobile from "./pages/navHeader/mobile/NavHeaderMobile";
import CharacterToDoRow from "./pages/userHomework/index";
import CharacterToDoRowMobile from "./pages/userHomeworkMobile/index";
import Login from "./pages/login/index";
import Register from "./pages/register/index";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createMedia } from "@artsy/fresnel";
import Dashboard from "./pages/dashboard/index";
import ItemPrice from "./pages/itemPrice/index";

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
              <Media between={["zero", "tablet"]}>
                <Segment
                  style={{
                    backgroundColor: "#384862",
                    padding: "0px",
                    border: "none",
                    height: "100%",
                    width: "100%",
                  }}
                >
                  <NavHeaderMobile />
                  <CharacterToDoRowMobile
                    limit={3}
                    type="mobile"
                    style={{ padding: "0px" }}
                  />
                </Segment>
              </Media>
              <Media between={["tablet", "computer"]}>
                <Segment id="biggerThanTablet">
                  <NavHeader />
                  <CharacterToDoRow limit={6} type="mobile" />
                </Segment>
              </Media>
              <Media greaterThanOrEqual="computer">
                <Segment id="biggerThanTablet">
                  <NavHeader />
                  <CharacterToDoRow limit={8} type="computer" />
                </Segment>
              </Media>
              {/* <Grid stackable style={{ border: "none" }}>
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
                      <CharacterToDoRowMobile limit={4} type="mobile" />
                    </Media>
                    <Media between={["tablet", "computer"]}>
                      <CharacterToDoRow limit={6} type="mobile" />
                    </Media>
                    <Media greaterThanOrEqual="computer">
                      <CharacterToDoRow limit={8} type="computer" />
                    </Media>
                  </Grid.Column>
                </Grid.Row>
              </Grid> */}
            </>
          </Route>
          <Route path="/dashboard">
            <NavHeader />
            <Dashboard />
          </Route>
          <Route path="/itemPrice">
            <NavHeader />
            <ItemPrice />
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
