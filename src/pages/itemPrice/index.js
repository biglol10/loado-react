import React from "react";
import { Container, Header, Icon, Image, Button } from "semantic-ui-react";

function ItemPrice() {
  return (
    <Container
      style={{
        backgroundColor: "#384862",
        margin: "0px !important",
        height: "94vh",
        width: "100%",
      }}
    >
      <Container
        style={{
          backgroundColor: "#384862",
          margin: "0px !important",
          width: "100%",
          color: "white",
        }}
      >
        <div style={{ paddingTop: "15px" }}>
          <Header as="h2" icon textAlign="center" color="orange">
            <Image src="./images/loa_icons/goldImage.png" />
            <Header.Content>아이템시세</Header.Content>
          </Header>
        </div>

        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <Button inverted color="teal">
            아이템 추가
          </Button>
          <Button inverted color="olive">
            조회
          </Button>
        </div>

        <br />
        <br />

        <div
          style={{
            width: "90%",
            backgroundColor: "red",
            height: "200px",
            margin: "0 auto",
          }}
        ></div>
      </Container>
    </Container>
  );
}

export default ItemPrice;
