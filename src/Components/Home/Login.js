import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from "semantic-ui-react";
import axios from "axios";
import cookie from "js-cookie";
import { Link, useHistory } from "react-router-dom";
import { backendUrl, axiosConfig } from "../Utils/ConstVar";

function Login() {
  console.log("sadfasdfasf");
  console.log(process.env.REACT_APP_BACKENDURL);
  const history = useHistory();
  const [loginMessage, setLoginMessage] = useState("로그인이 필요합니다");
  const [user, setUser] = useState({
    id: cookie.get("loginId") ? cookie.get("loginId") : "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `${backendUrl}/loado/api/users/login`,
        {
          userId: user.id,
          password: user.password,
        },
        axiosConfig
      )
      .then((response) => {
        if (response.data.success) {
          const token = response.data.token;
          cookie.set("loadoUserToken", token);
          const userCookie = {
            userId: user.id,
            userName: response.data.userName,
          };
          cookie.set("loadoUserCookie", JSON.stringify(userCookie));
          history.push("/userhomework");
        }
      })
      .catch((err) => {
        // console.log(err.request);
        // console.log(err.response);
        // console.log(err.message);
        setLoginMessage(err.response.data.error);
      });
  };

  useEffect(() => {
    let loginCookie = cookie.get("loadoUserToken");
    loginCookie && history.push("/userhomework");
  }, []);

  return (
    <>
      <Grid
        textAlign="center"
        style={{ height: "100vh", marginTop: "0", backgroundColor: "dimgray" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 500 }}>
          <Header as="h2" textAlign="center" style={{ color: "white" }}>
            <Image src="https://react.semantic-ui.com/logo.png" />{" "}
            {loginMessage}
          </Header>
          <Form size="large" onSubmit={handleSubmit}>
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="ID"
                name="id"
                onChange={handleChange}
                value={user.id}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="비밀번호"
                type="password"
                name="password"
                onChange={handleChange}
              />

              <Button color="teal" fluid size="large" type="submit">
                로그인
              </Button>
            </Segment>
          </Form>
          <Message>
            계정이 없으신가요?{" "}
            <a href="#" onClick={() => history.push("/register")}>
              가입
            </a>
          </Message>
        </Grid.Column>
      </Grid>
    </>
  );
}

export default Login;
