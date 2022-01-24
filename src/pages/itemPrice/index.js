import React, { useState, useEffect } from 'react';
import { Container, Header, Icon, Image, Button } from 'semantic-ui-react';
import ReactApexChart from 'react-apexcharts';

import {
  backendUrl,
  axiosConfigAuth,
  getLineColorFromImage,
  numberWithCommas,
} from '../components/util/ConstVar';
import AddItemToView from '../components/ItemPrice/AddItemToView';

import axios from 'axios';
import cookie from 'js-cookie';
import moment from 'moment';

function ItemPrice() {
  const [addItemTrend, setAddItemTrend] = useState(false);

  const [userItemCollection, setUserItemCollection] = useState([]);
  const [loadingState, setLoadingState] = useState(false);

  const [itemPriceTrend, setItemPriceTrend] = useState();

  const closeAddItemTrend = () => {
    setAddItemTrend(false);
  };

  const searchItemCollection = () => {
    axios
      .get(
        `${backendUrl}/loado/api/itemPrice/userItemInterest`,
        axiosConfigAuth(cookie.get('loadoUserToken'))
      )
      .then((response) => {
        if (response.data.success) {
          setUserItemCollection(
            response.data.userInterest.map((item) => item.replaceAll('I_', ''))
          );
        }
      })
      .catch((err) => {
        console.log('error');
        console.log(err);
      });
  };

  useEffect(() => {
    searchItemCollection();
  }, []);

  useEffect(() => {
    console.log('userItemCollection is');
    console.log(userItemCollection);
    if (userItemCollection.length !== 0) {
      axios
        .post(
          `${backendUrl}/loado/api/itemPrice/getItemCollectionPrice`,
          {
            userItemCollection,
          },
          axiosConfigAuth(cookie.get('loadoUserToken'))
        )
        .then((response) => {
          if (response.data.success) {
            console.log('response success');
            console.log(response.data.itemCollectionPrice);
            setUserItemCollection(userItemCollection);
            setItemPriceTrend(response.data.itemCollectionPrice);
            setLoadingState(true);
          }
        });
    }
  }, [userItemCollection]);

  const dataApply = (key, dataArr) => {
    if (!dataArr || dataArr.length === 0) return;

    let minusOneDateValue = '';
    if (dataArr.length < 2) {
      minusOneDateValue = moment(dataArr[0].createdDttm)
        .add(-1, 'days')
        .format('YYYY-MM-DD');
      dataArr.push({
        createdDttm: minusOneDateValue,
        itemPriceAverage: 0,
      });
      dataArr = dataArr.sort((a, b) => a.itemPriceAverage - b.itemPriceAverage);
      console.log('멸화');
      console.log(dataArr);
    }

    let max = Math.max.apply(
      null,
      dataArr.map((item) => item.itemPriceAverage)
    );
    let min = Math.min.apply(
      null,
      dataArr.map((item) => item.itemPriceAverage)
    );

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
        height: 350,
        type: 'line',
        dropShadow: {
          enabled: true,
          color: '#000',
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
      colors: [getLineColorFromImage(), '#545454'],
      dataLabels: {
        enabled: true,
        enabledOnSeries: undefined,
        formatter: function (val, opts) {
          return numberWithCommas(Math.floor(val));
        },
      },
      stroke: {
        curve: 'smooth',
      },
      title: {
        text: `${key.replaceAll('I_', '')}`,
        align: 'left',
      },
      grid: {
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      markers: {
        size: 1,
      },
      xaxis: {
        categories: dataArr.map((item) => item.createdDttm.substring(5)),
        title: {
          text: '날짜',
        },
      },
      yaxis: {
        title: {
          text: 'Gold',
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
        position: 'top',
        horizontalAlign: 'right',
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

  return (
    <>
      <Container
        style={{
          backgroundColor: '#384862',
          margin: '0px !important',
          height: '94vh',
          width: '100%',
        }}
      >
        <Container
          style={{
            backgroundColor: '#384862',
            margin: '0px !important',
            width: '100%',
          }}
        >
          <div style={{ paddingTop: '15px' }}>
            <Header as='h2' icon textAlign='center' color='orange'>
              <Image src='./images/loa_icons/goldImage2.png' avatar />
              <Header.Content>아이템시세</Header.Content>
            </Header>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <Button inverted color='teal' onClick={() => setAddItemTrend(true)}>
              아이템 추가
            </Button>
            <Button
              inverted
              color='olive'
              onClick={() => searchItemCollection()}
            >
              조회
            </Button>
          </div>

          <br />
          <br />

          <div
            style={{
              width: '90%',
              backgroundColor: 'white',
              margin: '0 auto',
              textAlign: 'center',
            }}
          >
            {loadingState &&
              userItemCollection &&
              itemPriceTrend &&
              userItemCollection.map((item, idx) => (
                <ReactApexChart
                  options={dataApply(item, itemPriceTrend[item])}
                  series={dataApply2(item, itemPriceTrend[item])}
                  type='line'
                  height={350}
                  style={{
                    marginLeft: '5px',
                    marginRight: '5px',
                    width: '30%',
                    display: 'inline-block',
                  }}
                />
              ))}
          </div>
        </Container>
      </Container>
      {addItemTrend && (
        <AddItemToView
          addItemPriceModal={addItemTrend}
          setAddItemTrend={setAddItemTrend}
          axiosConfigAuth={axiosConfigAuth}
          closeAddItemTrend={closeAddItemTrend}
          setUserItemCollection={setUserItemCollection}
          setLoadingState={setLoadingState}
        />
      )}
    </>
  );
}

export default ItemPrice;
