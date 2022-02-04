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
          {/* <Grid.Row style={{ padding: "10px 0px" }}>
            <Grid.Column className="updateItemDate" width={2}>
              2021-09-06
            </Grid.Column>
            <Grid.Column width={14}>
              직업명 오타 수정 : 아르라카 {"->"} 아르카나
            </Grid.Column>
          </Grid.Row>
          <Grid.Row style={{ padding: "10px 0px" }}>
            <Grid.Column className="updateItemDate" width={2}>
              2021-09-07
            </Grid.Column>
            <Grid.Column width={14}>가입 시 암호화 관련 설명 추가</Grid.Column>
          </Grid.Row> */}
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
          <Grid.Row style={{ padding: '10px 0px' }}>
            <Grid.Column className='updateItemDate' width={2}>
              2021-09-27
            </Grid.Column>
            <Grid.Column width={14}>
              아무나 06시 초기화를 할 수 없도록 암호화 진행. 즉, 소스 공개 가능
            </Grid.Column>
          </Grid.Row>
          <Grid.Row style={{ padding: '10px 0px' }}>
            <Grid.Column className='updateItemDate' width={2}>
              2021-09-28
            </Grid.Column>
            <Grid.Column width={14}>
              1. <span style={{ color: 'red' }}>[버그픽스]</span> 순서변경에서
              버그가 발생하던 부분 해결. 사용자가 1회 케릭터 추가 또는 삭제 한번
              해줘야 모든게 제대로 작동
              <br />
              2. 아이폰으로 접속 시 강제 줌인 되는 현상 수정
            </Grid.Column>
          </Grid.Row>
          <Grid.Row style={{ padding: '10px 0px' }}>
            <Grid.Column className='updateItemDate' width={2}>
              2021-09-30
            </Grid.Column>
            <Grid.Column width={14}>
              1. 모바일 노트 기록 기능 추가
              <br />
              2. 숫자체크 또는 체크박스 사용자설정 유지하는 기능 개발완료
            </Grid.Column>
          </Grid.Row>
          <Grid.Row style={{ padding: '10px 0px' }}>
            <Grid.Column className='updateItemDate' width={2}>
              2021-10-09
            </Grid.Column>
            <Grid.Column width={14}>
              이제 자신의 프로필 사진을 변경해보세요!!! 계정명을 클릭해서 프로필
              이미지를 자르고 업로드 하실 수 있습니다
            </Grid.Column>
          </Grid.Row>
          <Grid.Row style={{ padding: '10px 0px' }}>
            <Grid.Column className='updateItemDate' width={2}>
              2021-10-28
            </Grid.Column>
            <Grid.Column width={14}>
              특정 상황에서 페이징처리가 제대로 되지 않던 상황을 픽스했습니다
            </Grid.Column>
          </Grid.Row>
          <Grid.Row style={{ padding: '10px 0px' }}>
            <Grid.Column className='updateItemDate' width={2}>
              2022-02-04
            </Grid.Column>
            <Grid.Column width={14}>
              1. 아이폰, 맥OS에서 정상 작동되게 수정,
              <br />
              2. [멈출 수 없는 충동 각인서] 추가
              <br />
              3. 한 페이지에 즉구가격이 전부 "-" 로 되어있을 때 발생하던 에러
              수정했습니다 (페이지이동처리)
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Modal.Content>
    </Modal>
  );
}

export default HistoryModal;
