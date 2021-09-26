import React, { useEffect } from 'react';
import { Modal, Grid } from 'semantic-ui-react';
import './HistoryModal.css';

function HistoryModal({
  showUpdateHistoryModal,
  setShowUpdateHistoryModal,
  setNoticeAlert,
  changeNotificationToFalse,
}) {
  useEffect(() => {
    changeNotificationToFalse();
    setNoticeAlert(false);
  }, []);
  return (
    <Modal
      open={showUpdateHistoryModal}
      onClose={() => setShowUpdateHistoryModal(false)}
      closeOnDimmerClick
    >
      <Modal.Header
        className='modalHeader'
        style={{
          backgroundColor: '#384862',
          color: 'white',
          borderBottom: '1px solid white',
        }}
      >
        작업/업데이트 내역
      </Modal.Header>
      <Modal.Content>
        <Grid>
          <Grid.Row style={{ padding: '10px 0px' }}>
            <Grid.Column className='updateItemDate' width={2}>
              2021-09-06
            </Grid.Column>
            <Grid.Column width={14}>
              직업명 오타 수정 : 아르라카 {'->'} 아르카나
            </Grid.Column>
          </Grid.Row>
          <Grid.Row style={{ padding: '10px 0px' }}>
            <Grid.Column className='updateItemDate' width={2}>
              2021-09-07
            </Grid.Column>
            <Grid.Column width={14}>가입 시 암호화 관련 설명 추가</Grid.Column>
          </Grid.Row>
          <Grid.Row style={{ padding: '10px 0px' }}>
            <Grid.Column className='updateItemDate' width={2}>
              2021-09-08
            </Grid.Column>
            <Grid.Column width={14}>
              케릭터명 입력 후 엔터 이벤트를 등록하기 위해 [케릭터 추가] 팝업
              등장 내부로직 수정
            </Grid.Column>
          </Grid.Row>
          <Grid.Row style={{ padding: '10px 0px' }}>
            <Grid.Column className='updateItemDate' width={2}>
              2021-09-09
            </Grid.Column>
            <Grid.Column width={14}>
              (버튼이 안 보이는 분들을 위해) 케릭터 추가 기능에서 클래스 선택 및
              케릭터명 입력 후 엔터 시 케릭터가 추가되는 기능 추가
            </Grid.Column>
          </Grid.Row>
          <Grid.Row style={{ padding: '10px 0px' }}>
            <Grid.Column className='updateItemDate' width={2}>
              2021-09-10
            </Grid.Column>
            <Grid.Column width={14}>
              유지보수 및 코드 분석을 위해 내부 코드 리팩토링 진행 및 간결하게
              수정
            </Grid.Column>
          </Grid.Row>
          <Grid.Row style={{ padding: '10px 0px' }}>
            <Grid.Column className='updateItemDate' width={2}>
              2021-09-12
            </Grid.Column>
            <Grid.Column width={14}>
              1. 9월10일 업데이트 후 첫 로그인 시 화면에 아무것도 안 뜨던 현상
              수정, 컨탠츠에 마우스 올리면 행의 색갈이 바뀌도록 수정
              <br />
              2. 카던, 가디언, 에포나에 숫자로 선택할 필요없이 체크로 선택하여
              저장하기 가능토록 수정
            </Grid.Column>
          </Grid.Row>
          <Grid.Row style={{ padding: '10px 0px' }}>
            <Grid.Column className='updateItemDate' width={2}>
              2021-09-16
            </Grid.Column>
            <Grid.Column width={14}>
              1. 케릭터 순서 변경 기능 추가 (우측 상단 이름 클릭 후 순서변경)
              <br />
              2. 깜빡거림으로 사용자가 업데이트 내용을 확인할 수 있도록 추가 및
              작업 내역 확인 후 깜빡거림 멈추는 기능 추가
            </Grid.Column>
          </Grid.Row>
          <Grid.Row style={{ padding: '10px 0px' }}>
            <Grid.Column className='updateItemDate' width={2}>
              2021-09-21
            </Grid.Column>
            <Grid.Column width={14}>
              어플리케이션 업그레이드 비용 지불 및 다음날부터 내부에서 06시
              휴식게이지 반영되도록 수정 (잘 안될 수도 있음), 안되면
              개인휴식게이지반영 적용 요청
            </Grid.Column>
          </Grid.Row>
          <Grid.Row style={{ padding: '10px 0px' }}>
            <Grid.Column className='updateItemDate' width={2}>
              2021-09-22
            </Grid.Column>
            <Grid.Column width={14}>작업/업데이트 내역 화면 수정</Grid.Column>
          </Grid.Row>
          <Grid.Row style={{ padding: '10px 0px' }}>
            <Grid.Column className='updateItemDate' width={2}>
              2021-09-26
            </Grid.Column>
            <Grid.Column width={14}>모바일웹 기능 개발</Grid.Column>
          </Grid.Row>
        </Grid>
      </Modal.Content>
    </Modal>
  );
}

export default HistoryModal;
