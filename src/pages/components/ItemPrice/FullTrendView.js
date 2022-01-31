import React, { useState, useEffect } from "react";
import {
  Modal,
  Icon,
  Grid,
  Image,
  Table,
} from "semantic-ui-react";
import axios from "axios";
import cookie from "js-cookie";

import "./AddItemToView.css";

import { imageItemMatch, itemList } from "../../../_data/itemImageMatch";
import { backendUrl } from "../util/ConstVar";

function FullTrendView({
  seeFullLogTrendModal,
  itemName,
  closeFullLogTrendItem,
}) {
  const closeModal = () => {
    closeFullLogTrendItem();
  };

  return (
    <>
      <Modal
        open={seeFullLogTrendModal}
        onClose={closeModal}
        closeIcon
        closeOnDimmerClick
        size="tiny"
      >
        <Modal.Content>
          <Grid>
            <Grid.Column width={5}>
              
            </Grid.Column>
          </Grid>
          <Table basic="very" celled collapsing>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>
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
                </Table.HeaderCell>
                <Table.HeaderCell>가격</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
          </Table>
        </Modal.Content>
      </Modal>
    </>
  );
}

export default FullTrendView;
