import React, { useState, useEffect } from "react";
import {
  Modal,
  Grid,
  Image,
  Table,
  Header,
  Segment,
  Button,
  Icon,
} from "semantic-ui-react";
import axios from "axios";
import cookie from "js-cookie";

import "./AddItemToView.css";

import { imageItemMatch } from "../../../_data/itemImageMatch";
import { axiosConfigAuth, backendUrl } from "../util/ConstVar";
import { numberWithCommas } from "../../components/util/ConstVar";
import MonthlyTrendView from "./MonthlyTrendView";

import "./FullTrendView.css";

function FullTrendView({
  seeFullLogTrendModal,
  itemName,
  closeFullLogTrendItem,
  dataApply,
  dataApply2,
  type,
}) {
  const closeModal = () => {
    closeFullLogTrendItem();
  };

  const [loading, setLoading] = useState(false);
  const [itemPriceLog, setItemPriceLog] = useState([]);
  const [statValue, setStatValue] = useState({
    averageValue: 0,
    medianValue: 0,
  });
  const [viewMonthlyModal, setViewMonthlyModal] = useState(false);

  useEffect(() => {
    setLoading(true);

    const dateStartParam = localStorage.getItem("itemSearchStartDate");
    const dateEndParam = localStorage.getItem("itemSearchEndDate");

    axios
      .get(
        `${backendUrl}/loado/api/itemPrice/getItemPrice/${itemName}/${dateStartParam}/${dateEndParam}`,
        axiosConfigAuth(cookie.get("loadoUserToken"))
      )
      .then((response) => {
        if (response.data.success) {
          console.log(response.data);
          setItemPriceLog(response.data.itemPriceLog);

          setStatValue({
            averageValue: response.data.averageValue,
            medianValue: response.data.medianValue,
          });
          setLoading(false);
        }
      });
  }, [itemName]);

  const ReturnTable = (item) => {
    return (
      <>
        <Table.Row>
          <Table.Cell rowSpan={itemPriceLog[item].length}>{item}</Table.Cell>
          <Table.Cell class="tableCell" textAlign="center">
            {itemPriceLog[item][0].createdDttm.substring(11, 13)}{" "}
            <span style={{ color: "#138D75" }}>시</span>
          </Table.Cell>
          <Table.Cell class="tableCell" textAlign="center">
            {numberWithCommas(itemPriceLog[item][0].itemPrice)}
            <span style={{ color: "#F1C40F", marginLeft: "2px" }}>G</span>
          </Table.Cell>
        </Table.Row>
        {itemPriceLog[item].map(
          (item2, index2) =>
            index2 !== 0 && (
              <Table.Row>
                <Table.Cell class="tableCell" textAlign="center">
                  {item2.createdDttm.substring(11, 13)}{" "}
                  <span style={{ color: "#138D75" }}>시</span>
                </Table.Cell>
                <Table.Cell class="tableCell" textAlign="center">
                  {numberWithCommas(item2.itemPrice)}
                  <span style={{ color: "#F1C40F", marginLeft: "2px" }}>G</span>
                </Table.Cell>
              </Table.Row>
            )
        )}
      </>
    );
  };

  const ReturnMobileTable = (item) => {
    return (
      <>
        <Table.Row>
          <Table.Cell>
            <Image src="./images/loa_icons/timeIcon.PNG" avatar />
            {item.substring(5)}
          </Table.Cell>
          <Table.Cell>
            <Image src="./images/loa_icons/goldImage2.PNG" avatar />
            가격
          </Table.Cell>
        </Table.Row>
        {itemPriceLog[item].map((item2, index2) => (
          <Table.Row>
            <Table.Cell class="tableCell" textAlign="center">
              {item2.createdDttm.substring(11, 13)}{" "}
              <span style={{ color: "#138D75" }}>시</span>
            </Table.Cell>
            <Table.Cell class="tableCell" textAlign="center">
              {numberWithCommas(item2.itemPrice)}
              <span style={{ color: "#F1C40F", marginLeft: "2px" }}>G</span>
            </Table.Cell>
          </Table.Row>
        ))}
      </>
    );
  };

  return (
    <>
      <Modal
        open={seeFullLogTrendModal}
        onClose={closeModal}
        closeIcon
        closeOnDimmerClick
        size="tiny"
        style={{
          height: "600px",
          overflowY: "auto",
        }}
      >
        <Modal.Content id="modalContent">
          {type !== "mobile" ? (
            <Grid>
              <Grid.Column width={12}>
                <Table basic="very" celled>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>
                        {itemName.indexOf("각인서") > -1 ? (
                          <Image
                            src="./images/loa_icons/legendBook.PNG"
                            avatar
                          />
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
                      </Table.HeaderCell>
                      <Table.HeaderCell>
                        <Image src="./images/loa_icons/timeIcon.PNG" avatar />
                        시간
                      </Table.HeaderCell>
                      <Table.HeaderCell>
                        <Image src="./images/loa_icons/goldImage2.PNG" avatar />
                        가격
                      </Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    {!loading &&
                      Object.keys(itemPriceLog).map((item) =>
                        ReturnTable(item)
                      )}
                  </Table.Body>
                </Table>
              </Grid.Column>
              <Grid.Column width={4} style={{ paddingTop: "100px" }}>
                <Segment>
                  <Header as="h4" className="summaryHeader">
                    전체평균
                  </Header>
                  <Header as="h4" className="summaryHeader">
                    {numberWithCommas(statValue.averageValue)}
                    <span className="goldSpan">G</span>
                  </Header>
                </Segment>
                <Segment>
                  <Header as="h4" className="summaryHeader">
                    중앙값
                  </Header>
                  <Header as="h4" className="summaryHeader">
                    {numberWithCommas(statValue.medianValue)}
                    <span className="goldSpan">G</span>
                  </Header>
                </Segment>
                <Button
                  color="orange"
                  onClick={() => setViewMonthlyModal(true)}
                >
                  <Icon name="line graph" />
                  월별
                  <br />
                  트랜드
                </Button>
              </Grid.Column>
            </Grid>
          ) : (
            <>
              <h3>
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
              </h3>

              <div id="mobileSummary">
                <div className="mobileSummaryHeaderSegment">
                  <Header as="h4" className="summaryHeader">
                    전체평균
                  </Header>
                  <Header as="h4" className="summaryHeader">
                    {numberWithCommas(statValue.averageValue)}
                    &nbsp;
                    <span className="goldSpan">G</span>
                  </Header>
                </div>
                <div className="mobileSummaryHeaderSegment">
                  <Header as="h4" className="summaryHeader">
                    중앙값
                  </Header>
                  <Header as="h4" className="summaryHeader">
                    {numberWithCommas(statValue.medianValue)}
                    &nbsp;
                    <span className="goldSpan">G</span>
                  </Header>
                </div>
              </div>

              <div id="mobileTableDiv">
                <Table
                  unstackable
                  className="mobileTableDivTrendTable"
                  style={{ backgroundColor: "#d5f5e3" }}
                >
                  <Table.Body>
                    {Object.keys(itemPriceLog).map((item) =>
                      ReturnMobileTable(item)
                    )}
                  </Table.Body>
                </Table>
              </div>
            </>
          )}
        </Modal.Content>
      </Modal>

      {viewMonthlyModal && (
        <MonthlyTrendView
          itemName={itemName}
          viewMonthlyModal={viewMonthlyModal}
          setViewMonthlyModal={setViewMonthlyModal}
          dataApply={dataApply}
          dataApply2={dataApply2}
          type={type}
        />
      )}
    </>
  );
}

export default FullTrendView;
