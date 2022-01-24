import React, { useState, useEffect, useRef, innerRef } from "react";
import {
  Modal,
  Icon,
  Grid,
  Image,
  Header,
  Input,
  Label,
  List,
  Button,
  Divider,
  Segment,
  Container,
} from "semantic-ui-react";
import axios from "axios";
import cookie from "js-cookie";

import "./AddItemToView.css";

import { imageItemMatch, itemList } from "../../../_data/itemImageMatch";
import { backendUrl } from "../util/ConstVar";

function AddItemToView({
  addItemPriceModal,
  setAddItemTrend,
  axiosConfigAuth,
  closeAddItemTrend,
  setUserItemCollection,
  setLoadingState,
}) {
  const [itemSearch, setItemSearch] = useState("");
  const [buttonText, setButtonText] = useState("저장");
  const [itemListState, setItemListState] = useState(itemList);
  const [itemCollection, setItemCollection] = useState([]);

  useEffect(() => {
    setLoadingState(false);
  }, []);

  const itemSearchChange = (textValue) => {
    if (textValue.length === 0) {
      setItemListState(
        itemList.filter((item) => !itemCollection.includes(item.item))
      );
    } else {
      setItemListState(
        itemList.filter(
          (item) =>
            !itemCollection.includes(item.item) &&
            item.item.indexOf(textValue) >= 0
        )
      );
    }
    setItemSearch(textValue);
  };

  const addItemCollection = (itemName) => {
    setItemListState(itemListState.filter((item) => item.item !== itemName));
    itemCollection.push(itemName);
    setItemCollection(itemCollection);
  };

  const deleteItemCollection = (e) => {
    const { item_name } = e.currentTarget.dataset;
    setItemCollection(itemCollection.filter((item) => item !== item_name));
    // itemSearchChange(itemSearch);
    // itemListState.push(itemList.filter((item) => item.item === item_name)[0]);
    // setItemListState(itemListState);
  };

  const closeModal = () => {
    setItemSearch("");
    setItemListState([]);
    setItemCollection([]);
    setUserItemCollection(itemCollection);
    closeAddItemTrend();
  };

  useEffect(() => {
    axios
      .get(
        `${backendUrl}/loado/api/itemPrice/userItemInterest`,
        axiosConfigAuth(cookie.get("loadoUserToken"))
      )
      .then((response) => {
        if (response.data.success) {
          setItemCollection(response.data.userInterest);
        }
      })
      .catch((err) => {
        console.log("error");
        console.log(err);
      });
  }, []);

  useEffect(() => {
    itemSearchChange(itemSearch);
  }, [itemCollection]);

  const saveUserItem = () => {
    setButtonText("저장중");
    const postData = {
      itemCollection: itemCollection,
    };
    axios
      .post(
        `${backendUrl}/loado/api/itemPrice/userItemInterest`,
        postData,
        axiosConfigAuth(cookie.get("loadoUserToken"))
      )
      .then((response) => {
        console.log("success");
        setButtonText("저장");
        closeModal();
      })
      .catch((err) => {
        console.log("fail");
        console.log(err);
        setButtonText("실패");
      });
  };

  return (
    <>
      <Modal
        open={addItemPriceModal}
        onClose={closeModal}
        closeIcon
        closeOnDimmerClick
      >
        <Modal.Content style={{ backgroundColor: "white" }}>
          <Segment className="noselect selectedItemSegment">
            {itemCollection?.map((itemName) => (
              <Label
                as="a"
                style={{ margin: "1px 2px" }}
                data-item_name={itemName}
                onClick={(e) => deleteItemCollection(e)}
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
                {itemName.replaceAll("I_", "")}
                <Icon name="delete" />
              </Label>
            ))}
          </Segment>

          <Divider />
          <Grid
            style={{
              width: "101%",
              marginRight: "0px !important",
            }}
          >
            <Grid.Row>
              <Grid.Column width={14}>
                <Input
                  icon="search"
                  placeholder="아이템 검색"
                  value={itemSearch}
                  onChange={(e) => itemSearchChange(e.target.value)}
                  style={{ width: "100%", height: "38px" }}
                />
              </Grid.Column>
              <Grid.Column width={2} style={{ paddingRight: "0px" }}>
                <Button
                  inverted
                  color="purple"
                  style={{ width: "100%", height: "38px" }}
                  onClick={() => saveUserItem()}
                >
                  {buttonText}
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Divider />
          <Segment.Group raised className="noselect itemListSegment">
            <ul
              id="itemList"
              style={{ listStyle: "none", display: "block", cursor: "pointer" }}
            >
              <Divider hidden />
              {itemListState
                .sort((a, b) => a.idx - b.idx)
                .map((item, idx) => (
                  <>
                    <li onClick={() => addItemCollection(item.item, item.idx)}>
                      <div className="title">
                        <span style={{ fontWeight: "bold", fontSize: "large" }}>
                          {item.item.indexOf("각인서") > -1 ? (
                            <Image
                              src="./images/loa_icons/legendBook.PNG"
                              avatar
                            />
                          ) : (
                            <Image
                              src={
                                imageItemMatch[
                                  item.item
                                    .replaceAll("(", "")
                                    .replaceAll(")", "")
                                    .replaceAll(":", "")
                                    .replaceAll(" ", "")
                                ]
                              }
                              avatar
                            />
                          )}
                          {item.item.replaceAll("I_", "")}
                        </span>
                      </div>
                      <Icon
                        className="itemAdd"
                        size="large"
                        name="add circle"
                      />
                    </li>
                    {idx === itemListState.length - 1 ? (
                      <Divider hidden />
                    ) : (
                      <Divider />
                    )}
                  </>
                ))}
            </ul>
          </Segment.Group>
        </Modal.Content>
      </Modal>
    </>
  );
}

export default AddItemToView;
