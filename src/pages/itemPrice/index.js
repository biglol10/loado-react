import React, { useState, useEffect } from "react";
import { Container, Header, Icon, Image, Button } from "semantic-ui-react";
import ReactApexChart from "react-apexcharts";

import AddItemToView from "../components/ItemPrice/AddItemToView";

function ItemPrice() {
  const [addItemTrend, setAddItemTrend] = useState(false);

  const testVar = {
    series: [
      {
        name: "High - 2013",
        data: [28, 29, 33, 36, 32, 32, 33],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        dropShadow: {
          enabled: true,
          color: "#000",
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2,
        },
        toolbar: {
          show: false,
          tools: {
            zoom: false,
            zoomin: false,
            zoomout: false,
          },
        },
      },
      colors: ["#77B6EA", "#545454"],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        text: "Average High & Low Temperature",
        align: "left",
      },
      grid: {
        borderColor: "#e7e7e7",
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      markers: {
        size: 1,
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        title: {
          text: "Month",
        },
      },
      yaxis: {
        title: {
          text: "Temperature",
        },
        min: 5,
        max: 40,
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
    },
  };

  return (
    <>
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
          }}
        >
          <div style={{ paddingTop: "15px" }}>
            <Header as="h2" icon textAlign="center" color="orange">
              <Image src="./images/loa_icons/goldImage.png" />
              <Header.Content>아이템시세</Header.Content>
            </Header>
          </div>

          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <Button inverted color="teal" onClick={() => setAddItemTrend(true)}>
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
              backgroundColor: "white",
              margin: "0 auto",
              display: "flex",
              flexFlow: "row wrap",
              justifyContent: "space-around",
            }}
          >
            <ReactApexChart
              options={testVar.options}
              series={testVar.series}
              type="line"
              height={350}
              width={300}
            />
          </div>
        </Container>
      </Container>
      <AddItemToView
        addItemPriceModal={addItemTrend}
        setAddItemTrend={setAddItemTrend}
      />
    </>
  );
}

export default ItemPrice;
