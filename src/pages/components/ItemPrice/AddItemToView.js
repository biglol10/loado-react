import React, { useState, useEffect } from 'react';
import {
  Modal,
  Icon,
  Grid,
  Image,
  Input,
  Label,
  Button,
  Divider,
  Segment,
} from 'semantic-ui-react';
import axios from 'axios';
import cookie from 'js-cookie';

import './AddItemToView.css';

import { imageItemMatch, itemList } from '../../../_data/itemImageMatch';
import { backendUrl } from '../util/ConstVar';

function AddItemToView({
  addItemPriceModal,
  setAddItemTrend,
  axiosConfigAuth,
  closeAddItemTrend,
  searchItemCollection,
}) {
  const [itemSearch, setItemSearch] = useState('');
  const [itemListState, setItemListState] = useState(itemList);
  const [itemCollection, setItemCollection] = useState([]);
  const [saveLoading, setSaveLoading] = useState(false);

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
  };

  const closeModal = () => {
    setItemSearch('');
    setItemListState([]);
    setItemCollection([]);

    const startDate = localStorage.getItem('itemSearchStartDate');
    const endDate = localStorage.getItem('itemSearchEndDate');

    searchItemCollection(startDate, endDate);
    closeAddItemTrend();
  };

  useEffect(() => {
    axios
      .get(
        `${backendUrl}/loado/api/itemPrice/userItemInterest`,
        axiosConfigAuth(cookie.get('loadoUserToken'))
      )
      .then((response) => {
        if (response.data.success) {
          setItemCollection(response.data.userInterest);
        }
      })
      .catch((err) => {
        console.log('error');
        console.log(err);
      });
  }, []);

  useEffect(() => {
    itemSearchChange(itemSearch);
  }, [itemCollection]);

  const saveUserItem = () => {
    setSaveLoading(true);
    const postData = {
      itemCollection: itemCollection,
    };
    axios
      .post(
        `${backendUrl}/loado/api/itemPrice/userItemInterest`,
        postData,
        axiosConfigAuth(cookie.get('loadoUserToken'))
      )
      .then((response) => {
        setSaveLoading(false);
        closeModal();
      })
      .catch((err) => {
        setSaveLoading(false);
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
        <Modal.Content style={{ backgroundColor: 'white' }}>
          <Segment className='noselect selectedItemSegment'>
            {itemCollection?.map((itemName) => (
              <Label
                as='a'
                style={{ margin: '1px 2px' }}
                data-item_name={itemName}
                onClick={(e) => deleteItemCollection(e)}
              >
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
                {itemName.replaceAll('I_', '')}
                <Icon name='delete' />
              </Label>
            ))}
          </Segment>

          <Divider />
          <Grid
            style={{
              width: '101%',
              marginRight: '0px !important',
            }}
          >
            <Grid.Row>
              <Grid.Column width={13}>
                <Input
                  icon='search'
                  placeholder='아이템 검색'
                  value={itemSearch}
                  onChange={(e) => itemSearchChange(e.target.value)}
                  style={{ width: '100%', height: '38px' }}
                />
              </Grid.Column>
              <Grid.Column width={3} style={{ paddingRight: '0px' }}>
                <Button
                  inverted
                  color='purple'
                  style={{ width: '100%', height: '38px', padding: '10px' }}
                  onClick={() => saveUserItem()}
                >
                  {!saveLoading ? (
                    <Icon name='check' />
                  ) : (
                    <Icon name='upload' />
                  )}
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Divider />
          <Segment.Group raised className='noselect itemListSegment'>
            <ul
              id='itemList'
              style={{ listStyle: 'none', display: 'block', cursor: 'pointer' }}
            >
              <Divider hidden />
              {itemListState
                .sort((a, b) => a.idx - b.idx)
                .map((item, idx) => (
                  <>
                    <li onClick={() => addItemCollection(item.item, item.idx)}>
                      <div className='title'>
                        <span style={{ fontWeight: 'bold', fontSize: 'large' }}>
                          {item.item.indexOf('각인서') > -1 ? (
                            <Image
                              src='./images/loa_icons/legendBook.PNG'
                              avatar
                            />
                          ) : (
                            <Image
                              src={
                                imageItemMatch[
                                  item.item
                                    .replaceAll('(', '')
                                    .replaceAll(')', '')
                                    .replaceAll(':', '')
                                    .replaceAll(' ', '')
                                ]
                              }
                              avatar
                            />
                          )}
                          {item.item.replaceAll('I_', '')}
                        </span>
                      </div>
                      <Icon
                        className='itemAdd'
                        size='large'
                        name='add circle'
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
