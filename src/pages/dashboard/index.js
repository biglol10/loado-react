import React, { useState, useEffect } from "react";
import "../userHomework/userHomework.css";
import { Segment, Grid, Header, Icon } from "semantic-ui-react";
import { Line, Bar } from "react-chartjs-2";
import cookie from "js-cookie";
import { getLoadoLogs } from "../components/util/ViewDataUtil";

import "./dashboard.css";

import { characterKorean } from "../../_data/characterDefinition";

function Dashboard() {
  const [lineLabels, setlineLabels] = useState();
  const [lineData, setlineData] = useState();
  const [barLabels, setBarLabels] = useState();
  const [barData, setBarData] = useState();

  const [userCount, setUserCount] = useState();
  const [userLoadoCount, setUserLoadoCount] = useState();
  const [loadologs, setLoadoLogs] = useState();

  useEffect(() => {
    async function getLoadoLogsFunction() {
      let resultData = await getLoadoLogs(cookie.get("loadoUserToken"));
      if (!resultData) return;
      resultData.log.sort(function (a, b) {
        const keyA = new Date(a.dateValue);
        const keyB = new Date(b.dateValue);
        // Compare the 2 dates
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
      });
      const labels = [];
      const data = [];
      resultData.log.map((item) => {
        labels.push(item.dateValue);
        data.push(item.count);
      });
      setlineLabels(labels);
      setlineData(data);

      setUserCount(resultData.userCount);
      setUserLoadoCount(resultData.hwCount);
      setLoadoLogs(resultData.logsCount);

      const barLabels = [];
      const barData = [];

      resultData.jobGroupingResult.map((item, idx) => {
        // if (idx > 15) return;
        barLabels.push(characterKorean[item._id]);
        barData.push(item.characterCount);
      });

      setBarLabels(barLabels);
      setBarData(barData);
    }
    getLoadoLogsFunction();
  }, []);

  const chartjsLineData = {
    labels: lineLabels,
    datasets: [
      {
        label: "",
        data: lineData,
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  };

  const chartjsLineOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      title: {
        display: true,
        text: "이용 현황",
      },
    },
  };

  const chartjsBarData = {
    labels: barLabels,
    datasets: [
      {
        label: "",
        data: barData,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartjsBarOptions = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
    plugins: {
      title: {
        display: true,
        text: "직업 현황",
      },
    },
  };

  const data = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <Segment className="fullPage" id="dashboardPage" style={{ border: "none" }}>
      <Grid columns={2} style={{ display: "none" }}>
        <Grid.Row>
          <Grid.Column style={{ margin: "auto", textAlign: "center" }}>
            <Header as="h2" className="dashboardHeader">
              <Icon name="users" />
              등록된 사용자 수 : {userCount} 명
            </Header>
            <Header as="h2" className="dashboardHeader">
              <Icon name="book" />
              등록된 숙제 수 : {userLoadoCount} 개
            </Header>
            <Header as="h2" className="dashboardHeader">
              <Icon name="pencil square" />
              일주일 로그 수 : {loadologs} 개
            </Header>
          </Grid.Column>
          <Grid.Column className="lineGraphAreaColumn">
            <div id="lineGraphArea">
              <Line
                data={chartjsLineData}
                options={chartjsLineOptions}
                className="lineGraph"
              />
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <br />
      <div
        style={{
          height: "500px",
          width: "60%",
          backgroundColor: "white",
          margin: "0 auto",
        }}
      >
        <Bar
          data={chartjsBarData}
          options={chartjsBarOptions}
          className="lineGraph"
        />
      </div>
    </Segment>
  );
}

export default Dashboard;
