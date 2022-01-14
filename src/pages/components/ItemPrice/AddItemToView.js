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

import "./AddItemToView.css";

import { imageItemMatch, itemList } from "../../../_data/itemImageMatch";

function AddItemToView({ addItemPriceModal, setAddItemTrend }) {
  const closeModal = () => {
    setAddItemTrend(false);
  };

  const [itemSearch, setItemSearch] = useState("");
  const [itemListState, setItemListState] = useState(itemList);
  const [itemCollection, setItemCollection] = useState([]);

  const itemSearchChange = (textValue) => {
    if (textValue.length === 0) {
      setItemListState(itemListState);
    } else {
      setItemListState(
        itemListState.filter((item) => item.indexOf(textValue) >= 0)
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
    itemListState.push(itemList.filter((item) => item.item === item_name)[0]);
    setItemListState(itemListState);
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
          <Segment className="noselect">
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
                {itemName}
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
                >
                  저장
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Divider />
          <Segment.Group
            raised
            style={{
              backgroundColor: "#A3E4D7",
              height: "600px",
              overflowY: "auto",
            }}
            className="noselect"
          >
            <ul id="itemList" style={{ listStyle: "none", display: "block" }}>
              <Divider hidden />
              {itemListState
                .sort((a, b) => a.idx - b.idx)
                .map((item, idx) => (
                  <>
                    <li onClick={() => addItemCollection(item.item, item.idx)}>
                      <div class="title">
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
                          {item.item}
                        </span>
                      </div>
                      <Icon class="itemAdd" size="large" name="add circle" />
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
