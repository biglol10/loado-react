import React, { useState } from "react";
import {
  Modal,
  Image,
  Header,
  Segment,
  Divider,
  Button,
  Icon,
} from "semantic-ui-react";
import { axiosConfigAuth, backendUrl } from "../util/ConstVar";
import { imageItemMatch } from "../../../_data/itemImageMatch";
import { css } from "@emotion/react";

import ReactApexChart from "react-apexcharts";
import TextField from "@mui/material/TextField";
import HashLoader from "react-spinners/HashLoader";
import axios from "axios";
import cookie from "js-cookie";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import koLocale from "date-fns/locale/ko";
import moment from "moment";

function MonthlyTrendView({
  itemName,
  viewMonthlyModal,
  setViewMonthlyModal,
  dataApply,
  dataApply2,
  type,
}) {
  const [firstLoad, setFirstLoad] = useState(true);
  const [dateValue, setDateValue] = useState(moment().format("YYYY/MM/01"));
  const [itemPriceTrend, setItemPriceTrend] = useState();
  const [loadingState, setLoadingState] = useState(false);

  const searchItemMonthlyTrend = async () => {
    setFirstLoad(false);
    setLoadingState(true);
    setItemPriceTrend([]);
    const daysInMonth = moment(dateValue).daysInMonth();
    const dateStartParam = moment(dateValue).format("YYYY-MM-01");
    const dateEndParam = moment(dateValue).format(`YYYY-MM-${daysInMonth}`);

    await axios
      .post(
        `${backendUrl}/loado/api/itemPrice/getItemCollectionPrice`,
        {
          userItemCollection: [itemName],
          dateStartParam,
          dateEndParam,
        },
        axiosConfigAuth(cookie.get("loadoUserToken"))
      )
      .then((response) => {
        if (response.data.success) {
          console.log(response.data.itemCollectionPrice[itemName]);
          setItemPriceTrend([...response.data.itemCollectionPrice[itemName]]);
        } else {
          alert("데이터 조회에 실패했습니다");
        }
      });

    setLoadingState(false);
  };

  const cssOverride = css`
    display: block;
    maring: 0 auto;
    border-color: red;
  `;

  const ReturnChart = () => (
    <ReactApexChart
      options={dataApply(itemName, itemPriceTrend, true)}
      series={dataApply2(itemName, itemPriceTrend)}
      type="line"
      height={350}
      style={{
        marginLeft: "5px",
        marginRight: "5px",
        display: "block",
      }}
    />
  );

  const ReturnChartMobile = () => {
    if (itemPriceTrend.length < 11) {
      return (
        <ReactApexChart
          options={dataApply(itemName, itemPriceTrend, true)}
          series={dataApply2(itemName, itemPriceTrend)}
          type="line"
          height={350}
          style={{
            marginLeft: "5px",
            marginRight: "5px",
            display: "block",
          }}
        />
      );
    } else if (itemPriceTrend.length < 21) {
      const halfIndex = Math.ceil(itemPriceTrend.length / 2);
      const firstHalf = itemPriceTrend.filter((item, idx) => idx <= halfIndex);
      const nextHalf = itemPriceTrend.filter((item, idx) => idx > halfIndex);

      return (
        <>
          <ReactApexChart
            options={dataApply(itemName, firstHalf, true)}
            series={dataApply2(itemName, firstHalf)}
            type="line"
            height={350}
            style={{
              marginLeft: "5px",
              marginRight: "5px",
              display: "block",
            }}
          />
          <br />
          <ReactApexChart
            options={dataApply(itemName, nextHalf, true)}
            series={dataApply2(itemName, nextHalf)}
            type="line"
            height={350}
            style={{
              marginLeft: "5px",
              marginRight: "5px",
              display: "block",
            }}
          />
        </>
      );
    } else {
      const divideIndex = Math.ceil(itemPriceTrend.length / 3);

      const firstDivide = itemPriceTrend.filter(
        (item, idx) => idx < divideIndex
      );
      const nextDivide = itemPriceTrend.filter(
        (item, idx) => idx >= divideIndex && idx < divideIndex * 2
      );
      const finalDivide = itemPriceTrend.filter(
        (item, idx) => idx >= divideIndex * 2
      );

      return (
        <>
          <ReactApexChart
            options={dataApply(itemName, firstDivide, true)}
            series={dataApply2(itemName, firstDivide)}
            type="line"
            height={350}
            style={{
              marginLeft: "5px",
              marginRight: "5px",
              display: "block",
            }}
          />
          <br />
          <ReactApexChart
            options={dataApply(itemName, nextDivide, true)}
            series={dataApply2(itemName, nextDivide)}
            type="line"
            height={350}
            style={{
              marginLeft: "5px",
              marginRight: "5px",
              display: "block",
            }}
          />
          <br />
          <ReactApexChart
            options={dataApply(itemName, finalDivide, true)}
            series={dataApply2(itemName, finalDivide)}
            type="line"
            height={350}
            style={{
              marginLeft: "5px",
              marginRight: "5px",
              display: "block",
            }}
          />
        </>
      );
    }
  };

  return (
    <Modal
      open={viewMonthlyModal}
      closeIcon
      closeOnDimmerClick
      onClose={() => setViewMonthlyModal(false)}
      size="large"
    >
      <Modal.Content style={{ backgroundColor: "#D5F5E3" }}>
        <div style={{ display: "flex" }}>
          <LocalizationProvider dateAdapter={AdapterDateFns} locale={koLocale}>
            <DatePicker
              id="monthPickerUniqueId"
              views={["month"]}
              label="날짜"
              minDate={new Date("2022/01/01")}
              maxDate={new Date(moment())}
              value={moment(dateValue).format("YYYY/MM/01")}
              onChange={(newValue) => {
                setDateValue(moment(newValue).format("YYYY/MM/01"));
              }}
              renderInput={(params) => {
                const paramDateValue = params.inputProps.value.substring(0, 7);
                params.inputProps.value = `${moment(paramDateValue).format(
                  "YYYY"
                )}년 ${moment(paramDateValue).format("MM")}월`;
                return <TextField {...params} helperText={null} />;
              }}
            />
          </LocalizationProvider>
          <Button
            color="orange"
            style={{ marginLeft: `${type !== "mobile" ? "50px" : "10px"}` }}
            onClick={searchItemMonthlyTrend}
          >
            <Icon name="search" />
            조회
          </Button>
        </div>
        <Divider />
        {!firstLoad && loadingState ? (
          <HashLoader
            color="#e71989"
            loading={loadingState}
            css={cssOverride}
            size={80}
          />
        ) : itemPriceTrend && itemPriceTrend.length > 0 ? (
          <Segment
            style={{
              marginLeft: "5px",
              marginRight: "5px",
              display: "block",
            }}
          >
            <Header
              as="h4"
              style={{
                cursor: "pointer",
                marginLeft: "30px",
              }}
              className="noselect"
            >
              {itemName.indexOf("각인서") > -1 ? (
                <Image src="./images/loa_icons/legendBook.PNG" avatar />
              ) : (
                <Image
                  src={
                    imageItemMatch[
                      itemName
                        .replaceAll("(", "")
                        .replaceAll(")", "")
                        .replaceAll(":", "")
                        .replaceAll(" ", "")
                    ]
                  }
                  avatar
                />
              )}
              {itemName}
            </Header>
            {type === "mobile" ? ReturnChartMobile() : ReturnChart()}
            {/* <ReactApexChart
              options={dataApply(itemName, itemPriceTrend, true)}
              series={dataApply2(itemName, itemPriceTrend)}
              type="line"
              height={350}
              style={{
                marginLeft: "5px",
                marginRight: "5px",
                display: "block",
              }}
            /> */}
          </Segment>
        ) : (
          <span></span>
        )}
      </Modal.Content>
    </Modal>
  );
}

export default MonthlyTrendView;
