import React, { useState } from "react";
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
import backendUrl from "../Utils/ConstVar";

function Register() {
  const history = useHistory();
  const [loginMessage, setLoginMessage] = useState("회원가입");
  const [user, setUser] = useState({
    id: "",
    password: "",
    name: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const axiosConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `${backendUrl}/loado/api/users/register`,
        {
          userId: user.id,
          password: user.password,
          name: user.name,
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
        setLoginMessage(err.response.data.error);
      });
  };

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
              <Form.Input
                fluid
                icon="quote left"
                iconPosition="left"
                placeholder="이름"
                name="name"
                onChange={handleChange}
                value={user.name}
              />

              <Button color="teal" fluid size="large" type="submit">
                가입
              </Button>
            </Segment>
          </Form>
          <Message>비밀번호를 잊어버리시면 복구가 불가능합니다</Message>
        </Grid.Column>
      </Grid>
    </>
  );
}

export default Register;
