import React, { useState, useEffect } from 'react';
import { Modal, Grid, Image, Table, Header, Segment } from 'semantic-ui-react';
import axios from 'axios';
import cookie from 'js-cookie';

import './AddItemToView.css';

import { imageItemMatch } from '../../../_data/itemImageMatch';
import { axiosConfigAuth, backendUrl } from '../util/ConstVar';
import { numberWithCommas } from '../../components/util/ConstVar';

import './FullTrendView.css';

function FullTrendView({
  seeFullLogTrendModal,
  itemName,
  closeFullLogTrendItem,
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

  useEffect(() => {
    setLoading(false);
    axios
      .get(
        `${backendUrl}/loado/api/itemPrice/getItemPrice/${itemName}`,
        axiosConfigAuth(cookie.get('loadoUserToken'))
      )
      .then((response) => {
        if (response.data.success) {
          setItemPriceLog(response.data.itemPriceLog);
          // setStatValue({
          //   ...statValue,
          //   averageValue: response.data.averageValue,
          // });
          // setStatValue({
          //   ...statValue,
          //   medianValue: response.data.medianValue,
          // });
          setStatValue({
            averageValue: response.data.averageValue,
            medianValue: response.data.medianValue,
          });
          setLoading(true);
        }
      });
  }, [itemName]);

  const ReturnTable = (item) => {
    return (
      <>
        <Table.Row>
          <Table.Cell rowSpan={itemPriceLog[item].length}>{item}</Table.Cell>
          <Table.Cell class='tableCell' textAlign='center'>
            {itemPriceLog[item][0].createdDttm.substring(11, 13)}{' '}
            <span style={{ color: '#138D75' }}>시</span>
          </Table.Cell>
          <Table.Cell class='tableCell' textAlign='center'>
            {numberWithCommas(itemPriceLog[item][0].itemPrice)}
            <span style={{ color: '#F1C40F', marginLeft: '2px' }}>G</span>
          </Table.Cell>
        </Table.Row>
        {itemPriceLog[item].map((item2, index2) => {
          if (index2 != 0) {
            return (
              <Table.Row>
                <Table.Cell class='tableCell' textAlign='center'>
                  {item2.createdDttm.substring(11, 13)}{' '}
                  <span style={{ color: '#138D75' }}>시</span>
                </Table.Cell>
                <Table.Cell class='tableCell' textAlign='center'>
                  {numberWithCommas(item2.itemPrice)}
                  <span style={{ color: '#F1C40F', marginLeft: '2px' }}>G</span>
                </Table.Cell>
              </Table.Row>
            );
          }
        })}
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
        size='tiny'
        style={{
          height: '600px',
          overflowY: 'auto',
        }}
      >
        <Modal.Content style={{ backgroundColor: '#D5F5E3' }}>
          <Grid>
            <Grid.Column width={12}>
              <Table basic='very' celled>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>
                      {itemName.indexOf('각인서') > -1 ? (
                        <Image src='./images/loa_icons/legendBook.PNG' avatar />
                      ) : (
                        <Image
                          src={
                            imageItemMatch[
                              itemName
                                .replaceAll('(', '')
                                .replaceAll(')', '')
                                .replaceAll(':', '')
                                .replaceAll(' ', '')
                            ]
                          }
                          avatar
                        />
                      )}
                      {itemName}
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                      <Image src='./images/loa_icons/timeIcon.PNG' avatar />
                      시간
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                      <Image src='./images/loa_icons/goldImage2.PNG' avatar />
                      가격
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {loading &&
                    Object.keys(itemPriceLog).map((item) => ReturnTable(item))}
                </Table.Body>
              </Table>
            </Grid.Column>
            <Grid.Column width={4} style={{ paddingTop: '100px' }}>
              <Segment>
                <Header as='h4' style={{ borderBottom: '1px solid red' }}>
                  전체평균
                </Header>
                <Header as='h4' style={{ borderBottom: '1px solid red' }}>
                  {numberWithCommas(statValue.averageValue)}
                  <span style={{ color: '#F1C40F', marginLeft: '2px' }}>G</span>
                </Header>
              </Segment>
              <Segment>
                <Header as='h4' style={{ borderBottom: '1px solid red' }}>
                  중앙값
                </Header>
                <Header as='h4' style={{ borderBottom: '1px solid red' }}>
                  {numberWithCommas(statValue.medianValue)}
                  <span style={{ color: '#F1C40F', marginLeft: '2px' }}>G</span>
                </Header>
              </Segment>
            </Grid.Column>
          </Grid>
        </Modal.Content>
      </Modal>
    </>
  );
}

export default FullTrendView;
