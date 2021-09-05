import React, { useState, useEffect } from 'react';
import './CharacterToDo.css';
import AddCharacter from '../Utils/AddCharacter';

import {
  Header,
  Button,
  Segment,
  Grid,
  Container,
  Icon,
  Dimmer,
  Loader,
  Pagination,
  Image,
  Divider,
} from 'semantic-ui-react';
import RestValue from '../GridItem/RestValue';
import CharacterAvatar from './CharacterAvatar';
import PerIdNote from './PerIdNote';
import {
  ChaosDunValue,
  GuardianDunValue,
  EponaValue,
  WeeklyGuardian,
} from '../GridItem/DungeonAndEpona';
import {
  AbyssDun2,
  AbyssRaid,
  RehearsalAndDejavu,
  ArgosRaid,
  BaltanRaid,
  BiakissRaid,
  KukseitnRaid,
  AbrelRaid,
} from '../GridItem/AbyssAndRaid';
import axios from 'axios';
import cookie from 'js-cookie';

import { ToastContainer, toast } from 'react-toastify';
import { Link, useHistory } from 'react-router-dom';

import backendUrl from '../Utils/ConstVar';

function CharacterToDoRow({ limit, type }) {
  const todayDate = new Date(Date.now());
  const today = `${todayDate.getFullYear()}-${
    todayDate.getMonth() + 1
  }-${todayDate.getDate()}`;

  const [userTodoData, setUserTodoData] = useState([]);

  const [addCharacterModal, setAddCharacterModal] = useState(false);

  const [loading, setLoading] = useState(false);

  const [activePage, setActivePage] = useState(1);

  const [pagination, setPagination] = useState(0);

  const history = useHistory();

  const addCharacter = () => {
    setAddCharacterModal(true);
  };

  const closeAddCharacter = () => {
    setAddCharacterModal(false);
  };

  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${cookie.get('loadoUserToken')}`,
    },
  };

  const viewPage = async (minusOne = false, plusOne = false, plusPage = 0) => {
    setLoading(true);
    setUserTodoData([]);

    let searchString = `${backendUrl}/loado/api/homeworks?limit=${limit}&page=${activePage}`;
    if (minusOne) {
      searchString = `${backendUrl}/loado/api/homeworks?limit=${limit}&page=${
        activePage - 1
      }`;
      setActivePage(activePage - 1);
    } else if (plusOne) {
      searchString = `${backendUrl}/loado/api/homeworks?limit=${limit}&page=${
        Math.floor(plusPage / limit) + 1
      }`;
      setActivePage(Math.floor(plusPage / limit) + 1);
    }

    await axios
      .get(searchString, axiosConfig)
      .then((response) => {
        setUserTodoData(response.data.data);

        const totalLength = response.data.totalLength;
        if (totalLength) {
          const totalPage =
            totalLength / limit - Math.floor(totalLength / limit) > 0
              ? Math.floor(totalLength / limit) + 1
              : Math.floor(totalLength / limit);
          setPagination(totalPage);
        } else {
          setPagination(1);
        }
        setLoading(false);
      })
      .catch((err) => {
        toast.error('데이터를 불러오지 못했습니다', {
          position: toast.POSITION.BOTTOM_LEFT,
        });
        setLoading(false);
      });
  };

  const applyChanges = async () => {
    setLoading(true);
    let errorOccured = false;

    let submitData = userTodoData.filter(
      (item) => item.attributeChanged === true
    );

    for (let index = 0; index < submitData.length; index++) {
      await axios
        .put(
          `${backendUrl}/loado/api/homeworks/${submitData[index]._id}`,
          {
            data: submitData[index],
          },
          axiosConfig
        )
        .then((response) => {})
        .catch((err) => {
          errorOccured = true;
        });
    }
    // let weeklySubmitData = userTodoData.filter(
    //   (item) => item.weeklyAttributeChanged === true
    // );
    // if (weeklySubmitData.length !== 0) {
    //   await axios
    //     .put(
    //       `${backendUrl}/loado/api/homeworks/${weeklySubmitData[0]._id}`,
    //       {
    //         data: weeklySubmitData[0],
    //       },
    //       axiosConfig
    //     )
    //     .then((response) => {})
    //     .catch((err) => {
    //       errorOccured = true;
    //     });
    // }
    setLoading(false);
    if (errorOccured) {
      toast.error('일부 변경사항이 제대로 반영되지 않았습니다', {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    }
    viewPage();
  };

  const pageChange = async (event, data) => {
    setLoading(true);
    setActivePage(data.activePage);

    // 샙트님 이거 2페이지에 있는 캐릭터 바꾸면 1페이지 같은 자리 있는것두 바뀌는거 같아여
    // 이거 안 해주면 현재 페이지에서 바꾼 ID위치의 정보가 그대로 남아서 사용자에게 모든 페이지의 변경사항이 반영되는 것처럼 보임
    setUserTodoData([]);

    await axios
      .get(
        `${backendUrl}/loado/api/homeworks?limit=${limit}&page=${data.activePage}`,
        axiosConfig
      )
      .then((response) => {
        setUserTodoData(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error('데이터를 불러오지 못했습니다', {
          position: toast.POSITION.BOTTOM_LEFT,
        });
        setLoading(false);
      });
  };

  // for alarm animation
  const [alarmTrue, setAlarmTrue] = useState(true);

  // for note per list
  const [showNote, setShowNote] = useState(false);

  const alarmRestValue = (todoList) => {
    // 알람 중지
    if (!alarmTrue) {
      const alarmList1 = todoList.map((item, idx) => {
        item.alarmCharacter = false;
        return item;
      });
      setUserTodoData(alarmList1);
      setAlarmTrue(true);
    }
    // 알람 온
    else {
      const alarmList = todoList.map((item, idx) => {
        if (
          item.chaosRestValue >= 40 ||
          item.guardianRestValue >= 40 ||
          item.eponaRestValue >= 60
        ) {
          item.alarmCharacter = true;
        }
        return item;
      });
      setUserTodoData(alarmList);
      setAlarmTrue(false);
    }
  };

  // if no user cookie then redirect to login page
  useEffect(() => {
    let loginCookie = cookie.get('loadoUserToken');
    !loginCookie && history.push('/login');
  }, []);

  useEffect(() => {
    viewPage();
  }, []);

  return (
    <>
      {loading ? (
        <Segment
          className='fullPage'
          style={{ height: '94vh', border: 'none' }}
        >
          <Dimmer active>
            <Loader size='big'>로딩중</Loader>
          </Dimmer>
        </Segment>
      ) : (
        <Grid className='fullPage'>
          <Container
            style={{ width: '95%', marginLeft: '2.5%', marginRight: '2.5%' }}
          >
            <Grid.Column width={16}>
              <Segment
                basic
                className='contentHeader'
                style={{ marginBottom: '0px' }}
              >
                <div className='headerValueStart'>
                  <Header
                    size='medium'
                    style={{ color: 'white', paddingTop: '5px' }}
                  >
                    {today}{' '}
                    {type === 'computer' && (
                      <span style={{ marginLeft: '30px' }}>
                        금일 06:00 ~ 명일 05:59
                      </span>
                    )}
                  </Header>
                </div>
                <div className='headerValueCenter'>
                  <Pagination
                    // defaultActivePage={1}
                    firstItem={null}
                    lastItem={null}
                    pointing
                    secondary
                    totalPages={pagination}
                    activePage={activePage}
                    onPageChange={(event, data) => pageChange(event, data)}
                  />
                </div>
                <div className='headerValueEnd'>
                  <Button inverted color='olive' onClick={addCharacter}>
                    케릭터 추가
                  </Button>
                  <Button inverted color='red' onClick={applyChanges}>
                    변경사항 저장
                  </Button>
                </div>
              </Segment>
              <Segment
                basic
                style={{ backgroundColor: 'dimgray', marginTop: '0px' }}
              >
                <Grid columns={limit + 1}>
                  <Grid.Row
                    style={{ borderBottom: !showNote && '0.05rem inset ivory' }}
                  >
                    <Grid.Column className='contentColumn'>
                      {/* padding got from <Button/> */}
                      <Header
                        as='h4'
                        style={{
                          color: 'white',
                          display: 'flex',
                          padding: '.78571429em 1.5em .78571429em',
                        }}
                      >
                        <div>
                          <Icon
                            className='iconClass'
                            name={alarmTrue ? 'alarm' : 'alarm mute'}
                            onClick={() => alarmRestValue(userTodoData)}
                          />
                          {'  //  '}
                          <Icon
                            className='iconClass'
                            name={
                              !showNote
                                ? 'sticky note outline'
                                : 'angle double up'
                            }
                            onClick={() => setShowNote(!showNote)}
                          />
                        </div>
                      </Header>
                    </Grid.Column>
                    {userTodoData.map((item, idx) => (
                      <CharacterAvatar
                        itemId={item._id}
                        character={item.character}
                        characterName={item.characterName}
                        attributeChanged={item.attributeChanged}
                        weeklyAttributeChanged={item.weeklyAttributeChanged}
                        axiosConfig={axiosConfig}
                        viewPage={viewPage}
                        alarmCharacter={item.alarmCharacter}
                        limit={limit}
                        dontChange={item.dontChange}
                        userTodoData={userTodoData}
                        setUserTodoData={setUserTodoData}
                      />
                    ))}
                  </Grid.Row>
                  {showNote && (
                    <Grid.Row
                      style={{
                        padding: 0,
                        borderBottom: '0.05rem inset ivory',
                        paddingBottom: '7px',
                      }}
                    >
                      <Grid.Column />
                      {userTodoData.map((item, idx) => (
                        <PerIdNote
                          item={item}
                          userTodoData={userTodoData}
                          setUserTodoData={setUserTodoData}
                        />
                      ))}
                    </Grid.Row>
                  )}
                  <Grid.Row className='eachRow'>
                    <Grid.Column className='contentColumn'>
                      <Icon name='calendar check outline' />
                      휴식게이지
                    </Grid.Column>
                    {userTodoData.map((item, idx) => (
                      <RestValue
                        item={item}
                        userTodoData={userTodoData}
                        setUserTodoData={setUserTodoData}
                      />
                    ))}
                  </Grid.Row>
                  <Grid.Row className='eachRow'>
                    <Grid.Column className='contentColumn'>
                      <div>
                        <Image
                          src='./images/loa_icons/chaosDun.png'
                          avatar
                          className='contentImage'
                        />
                        <span>카오스던전</span>
                      </div>
                    </Grid.Column>
                    {userTodoData.map((item, idx) => (
                      <ChaosDunValue
                        chaosItem={item}
                        userTodoData={userTodoData}
                        setUserTodoData={setUserTodoData}
                      />
                    ))}
                  </Grid.Row>
                  <Grid.Row className='eachRow'>
                    <Grid.Column className='contentColumn'>
                      <div>
                        <Image
                          src='./images/loa_icons/guardianDun.png'
                          avatar
                          className='contentImage'
                        />
                        <span>가디언토벌</span>
                      </div>
                    </Grid.Column>
                    {userTodoData.map((item, idx) => (
                      <GuardianDunValue
                        guardianItem={item}
                        userTodoData={userTodoData}
                        setUserTodoData={setUserTodoData}
                      />
                    ))}
                  </Grid.Row>
                  <Grid.Row className='eachRow'>
                    <Grid.Column className='contentColumn'>
                      <div>
                        <Image
                          src='./images/loa_icons/epona.png'
                          avatar
                          className='contentImage'
                        />
                        <span>에포나</span>
                      </div>
                    </Grid.Column>
                    {userTodoData.map((item, idx) => (
                      <EponaValue
                        eponaItem={item}
                        userTodoData={userTodoData}
                        setUserTodoData={setUserTodoData}
                      />
                    ))}
                  </Grid.Row>
                  <Grid.Row className='eachRow'>
                    <Grid.Column className='contentColumn'>
                      <div>
                        <Image
                          src='./images/loa_icons/guardianDun.png'
                          avatar
                          className='contentImage'
                        />
                        <span>주간가디언</span>
                      </div>
                    </Grid.Column>
                    {userTodoData.map((item, idx) => (
                      <WeeklyGuardian
                        weeklyGuardianItem={item}
                        userTodoData={userTodoData}
                        setUserTodoData={setUserTodoData}
                      />
                    ))}
                  </Grid.Row>
                  <Grid.Row className='eachRow'>
                    <Grid.Column className='contentColumn'>
                      <div>
                        <Image
                          src='./images/loa_icons/abyss2types.png'
                          avatar
                          className='contentImage'
                        />
                        <span>오레하2종</span>
                      </div>
                    </Grid.Column>
                    {userTodoData.map((item, idx) => (
                      <AbyssDun2
                        abyssDun2Item={item}
                        userTodoData={userTodoData}
                        setUserTodoData={setUserTodoData}
                      />
                    ))}
                  </Grid.Row>
                  {/* 원정대 주간 컨탠츠는 안 보이게 하기로 결정 */}
                  {/* <Grid.Row className="eachRow">
                    <Grid.Column className="contentColumn">
                      <div>
                        <Image
                          src="./images/loa_icons/abyssWeekly.png"
                          avatar
                          className="contentImage"
                        />
                        <span>어비스레이드</span>
                      </div>
                    </Grid.Column>
                    {userTodoData.map((item, idx) => (
                      <AbyssRaid
                        idx={idx}
                        abyssRaidItem={item}
                        userTodoData={userTodoData}
                        setUserTodoData={setUserTodoData}
                      />
                    ))}
                  </Grid.Row>
                  <Grid.Row className="eachRow">
                    <Grid.Column className="contentColumn">
                      <div>
                        <Image
                          src="./images/loa_icons/rehearsal.png"
                          avatar
                          className="contentImage"
                        />
                        <span>리허설, 데쟈뷰</span>
                      </div>
                    </Grid.Column>
                    {userTodoData.map((item, idx) => (
                      <RehearsalAndDejavu
                        rehearsalAndDejavuItem={item}
                        idx={idx}
                        userTodoData={userTodoData}
                        setUserTodoData={setUserTodoData}
                      />
                    ))}
                  </Grid.Row> */}
                  <Grid.Row className='eachRow'>
                    <Grid.Column className='contentColumn'>
                      <div>
                        <Image
                          src='./images/loa_icons/argos.png'
                          avatar
                          className='contentImage'
                        />
                        <span>아르고스</span>
                      </div>
                    </Grid.Column>
                    {userTodoData.map((item, idx) => (
                      <ArgosRaid
                        argosRaidItem={item}
                        userTodoData={userTodoData}
                        setUserTodoData={setUserTodoData}
                      />
                    ))}
                  </Grid.Row>
                  <Grid.Row className='eachRow'>
                    <Grid.Column className='contentColumn'>
                      <div>
                        <Image
                          src='./images/loa_icons/baltan.png'
                          avatar
                          className='contentImage'
                        />
                        <span>발탄</span>
                      </div>
                    </Grid.Column>
                    {userTodoData.map((item, idx) => (
                      <BaltanRaid
                        baltanRaidItem={item}
                        userTodoData={userTodoData}
                        setUserTodoData={setUserTodoData}
                      />
                    ))}
                  </Grid.Row>
                  <Grid.Row className='eachRow'>
                    <Grid.Column className='contentColumn'>
                      <div>
                        <Image
                          src='./images/loa_icons/biakiss.png'
                          avatar
                          className='contentImage'
                        />
                        <span>비아키스</span>
                      </div>
                    </Grid.Column>
                    {userTodoData.map((item, idx) => (
                      <BiakissRaid
                        biakissRaidItem={item}
                        userTodoData={userTodoData}
                        setUserTodoData={setUserTodoData}
                      />
                    ))}
                  </Grid.Row>
                  <Grid.Row className='eachRow'>
                    <Grid.Column className='contentColumn'>
                      <div>
                        <Image
                          src='./images/loa_icons/kukuseitn.png'
                          avatar
                          className='contentImage'
                        />
                        <span>쿠크세이튼</span>
                      </div>
                    </Grid.Column>
                    {userTodoData.map((item, idx) => (
                      <KukseitnRaid
                        kukseitnRaidItem={item}
                        userTodoData={userTodoData}
                        setUserTodoData={setUserTodoData}
                      />
                    ))}
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column className='contentColumn'>
                      <div>
                        <Image
                          src='./images/loa_icons/abrel.png'
                          avatar
                          className='contentImage'
                        />
                        <span>아브렐슈드</span>
                      </div>
                    </Grid.Column>
                    {userTodoData.map((item, idx) => (
                      <AbrelRaid
                        abrelRaidItem={item}
                        userTodoData={userTodoData}
                        setUserTodoData={setUserTodoData}
                      />
                    ))}
                  </Grid.Row>
                </Grid>
              </Segment>
            </Grid.Column>
          </Container>
        </Grid>
      )}

      <AddCharacter
        addCharacterModal={addCharacterModal}
        closeAddCharacter={closeAddCharacter}
        userTodoData={userTodoData}
        axiosConfig={axiosConfig}
        viewPage={viewPage}
        limit={limit}
      />
      <ToastContainer autoClose={3000} />
    </>
  );
}

export default CharacterToDoRow;
