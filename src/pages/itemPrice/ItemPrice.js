import React, { useState, useEffect } from "react";
import { Container, Header, Image, Segment } from "semantic-ui-react";
import ReactApexChart from "react-apexcharts";

import {
  backendUrl,
  axiosConfigAuth,
  getLineColorFromImage,
  numberWithCommas,
} from "../components/util/ConstVar";
import AddItemToView from "../components/ItemPrice/AddItemToView";
import FullTrendView from "../components/ItemPrice/FullTrendView";
import ConditionSegment from "../components/ItemPrice/ConditionSegment";
import { imageItemMatch } from "../../_data/itemImageMatch";

import axios from "axios";
import cookie from "js-cookie";
import moment from "moment";

import "./ItemPrice.css";

function ItemPrice({ type }) {
  const [addItemTrend, setAddItemTrend] = useState(false);
  const [seeFullLogTrendModal, setSeeFullLogTrendModal] = useState(false);
  const [fullLogTrendItem, setFullLogTrendItem] = useState("");

  const [userItemCollection, setUserItemCollection] = useState([]);
  const [loadingState, setLoadingState] = useState(false);

  const [itemPriceTrend, setItemPriceTrend] = useState();

  const [dateValue, setDateValue] = useState({
    startDate: moment().add(-6, "days").format("YYYY-MM-DD"),
    endDate: moment().format("YYYY-MM-DD"),
  });

  const closeAddItemTrend = () => {
    setAddItemTrend(false);
  };

  const closeFullLogTrendItem = () => {
    setSeeFullLogTrendModal(false);
  };

  useEffect(() => {
    searchItemCollection();
  }, []);

  const searchItemCollection = (
    startDate = moment().add(-6, "days").format("YYYY-MM-DD"),
    endDate = moment().format("YYYY-MM-DD")
  ) => {
    setLoadingState(false);

    const startDateMoment = moment(startDate);
    const endDateMoment = moment(endDate);
    const diff = endDateMoment.diff(startDateMoment, "days");

    if (diff > 13) {
      alert("2주를 넘을 수 없습니다");
      setLoadingState(true);
      return;
    }

    setDateValue({ startDate, endDate });

    axios
      .get(
        `${backendUrl}/loado/api/itemPrice/userItemInterest`,
        axiosConfigAuth(cookie.get("loadoUserToken"))
      )
      .then((response) => {
        if (response.data.success) {
          setUserItemCollection(response.data.userInterest);
        }
      })
      .catch((err) => {
        alert("에러가 발생했습니다");
      });
  };

  useEffect(() => {
    if (userItemCollection.length !== 0) {
      const dateStartParam = dateValue.startDate;
      const dateEndParam = dateValue.endDate;
      axios
        .post(
          `${backendUrl}/loado/api/itemPrice/getItemCollectionPrice`,
          {
            userItemCollection,
            dateStartParam,
            dateEndParam,
          },
          axiosConfigAuth(cookie.get("loadoUserToken"))
        )
        .then((response) => {
          if (response.data.success) {
            setUserItemCollection(userItemCollection);
            setItemPriceTrend(response.data.itemCollectionPrice);
            setLoadingState(true);
          }
        });
    }
  }, [userItemCollection]);

  const dataApply = (
    key,
    dataArr,
    monthlyView = false,
    deviceType = "computer",
    maxValue = 0,
    minValue = 0
  ) => {
    if (!dataArr || dataArr.length === 0) return;

    const createdDttmValueCut = !monthlyView ? 5 : 8;

    let minusOneDateValue = "";
    if (dataArr.length < 2) {
      minusOneDateValue = moment(dataArr[0].createdDttm)
        .add(-1, "days")
        .format("YYYY-MM-DD");
      dataArr.push({
        createdDttm: minusOneDateValue,
        itemPriceAverage: 0,
      });
      dataArr = dataArr.sort((a, b) => a.itemPriceAverage - b.itemPriceAverage);
    }

    // let max =
    //   deviceType !== "mobile"
    //     ? Math.max.apply(
    //         null,
    //         dataArr.map((item) => item.itemPriceAverage)
    //       )
    //     : maxValue;
    // let min =
    //   deviceType !== "mobile"
    //     ? Math.min.apply(
    //         null,
    //         dataArr.map((item) => item.itemPriceAverage)
    //       )
    //     : minValue;

    let max = Math.max.apply(
      null,
      dataArr.map((item) => item.itemPriceAverage)
    );

    let min = Math.min.apply(
      null,
      dataArr.map((item) => item.itemPriceAverage)
    );

    if (deviceType === "mobile" && monthlyView === true) {
      console.log(`max: ${max} and min: ${min}`);
      console.log(dataArr);
    }

    if (max === min) {
      max =
        max.toString().length === 1
          ? max + 5
          : max.toString().length === 2
          ? max + 10
          : max + 20;
      min =
        max.toString().length === 1
          ? max - 5
          : max.toString().length === 2
          ? max - 10
          : max - 20;
    }

    const valueDiff = max - min;

    const interval = valueDiff / 7;

    const options = {
      chart: {
        height: 300,
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
      colors: [getLineColorFromImage(), "#545454"],
      dataLabels: {
        enabled: true,
        enabledOnSeries: undefined,
        formatter: function (val, opts) {
          return numberWithCommas(Math.floor(val));
        },
      },
      stroke: {
        curve: "smooth",
      },
      // title: {
      //   text: '${key.replaceAll("I_", "")}',
      //   align: "left",
      // },
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
        categories: dataArr.map((item) =>
          item.createdDttm.substring(createdDttmValueCut)
        ),
        title: {
          text: "",
        },
      },
      yaxis: {
        title: {
          text: "Gold",
        },
        labels: {
          formatter: function (val, index) {
            return numberWithCommas(Math.floor(val));
          },
        },
        min: Math.floor(min - interval) < 0 ? 0 : Math.floor(min - interval),
        max: Math.floor(max + interval),
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
    };

    return options;
  };

  const dataApply2 = (key, dataArr) => {
    if (!dataArr || dataArr.length === 0) return;

    const series = [
      {
        name: key,
        data: dataArr.map((item) => item.itemPriceAverage),
      },
    ];

    return series;
  };

  const seeFullLog = (itemName) => {
    setFullLogTrendItem("");
    setFullLogTrendItem(itemName);
    setSeeFullLogTrendModal(true);
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
        id="itemPriceContainer"
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
              <Image src="./images/loa_icons/goldImage2.PNG" avatar />
              <Header.Content>아이템시세</Header.Content>
            </Header>
          </div>

          <ConditionSegment
            setAddItemTrend={setAddItemTrend}
            searchItemCollection={searchItemCollection}
            type={type}
          />

          <br />
          <br />

          <div
            style={{
              width: "90%",
              backgroundColor: "rgb(56, 72, 98)",
              margin: "0 auto",
              textAlign: "center",
              border: `${type !== "mobile" && "10px solid bisque"}`,
              borderRadius: "5px",
            }}
          >
            {loadingState &&
              userItemCollection &&
              itemPriceTrend &&
              userItemCollection.map(
                (item, idx) =>
                  itemPriceTrend[item] && (
                    <Segment
                      style={{
                        marginLeft: "5px",
                        marginRight: "5px",
                        width: `${type === "mobile" ? "100%" : "30%"}`,
                        display: "inline-block",
                      }}
                    >
                      <Header
                        as="h4"
                        style={{ marginBottom: "3px", cursor: "pointer" }}
                        onClick={() => seeFullLog(item)}
                        className="noselect"
                      >
                        {item.indexOf("각인서") > -1 ? (
                          <Image
                            src="./images/loa_icons/legendBook.PNG"
                            avatar
                          />
                        ) : (
                          <Image
                            src={
                              imageItemMatch[
                                item
                                  .replaceAll("(", "")
                                  .replaceAll(")", "")
                                  .replaceAll(":", "")
                                  .replaceAll(" ", "")
                              ]
                            }
                            avatar
                          />
                        )}
                        {item}
                      </Header>
                      <ReactApexChart
                        options={dataApply(item, itemPriceTrend[item])}
                        series={dataApply2(item, itemPriceTrend[item])}
                        type="line"
                        height={350}
                        style={{
                          marginLeft: "5px",
                          marginRight: "5px",
                          width: "100%",
                          display: "inline-block",
                        }}
                      />
                    </Segment>
                  )
              )}
          </div>
        </Container>
      </Container>
      {addItemTrend && (
        <AddItemToView
          addItemPriceModal={addItemTrend}
          setAddItemTrend={setAddItemTrend}
          axiosConfigAuth={axiosConfigAuth}
          closeAddItemTrend={closeAddItemTrend}
          searchItemCollection={searchItemCollection}
        />
      )}
      {seeFullLogTrendModal && fullLogTrendItem && (
        <FullTrendView
          seeFullLogTrendModal={seeFullLogTrendModal}
          itemName={fullLogTrendItem}
          closeFullLogTrendItem={closeFullLogTrendItem}
          dataApply={dataApply}
          dataApply2={dataApply2}
          type={type}
        />
      )}
    </>
  );
}

export default ItemPrice;
