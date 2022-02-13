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
          <Grid.Row style={{ padding: '10px 0px' }}>
            <Grid.Column className='updateItemDate' width={2}>
              2022-02-13
            </Grid.Column>
            <Grid.Column width={14}>
              1. 날짜 조건 추가 (최대 2주 간격조회 가능)... 자잘한 기능을 더
              수정할 예정
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Modal.Content>
    </Modal>
  );
}

export default HistoryModal;
