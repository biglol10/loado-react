import React from 'react';
import { Modal } from 'semantic-ui-react';

function HistoryModal({ showUpdateHistoryModal, setShowUpdateHistoryModal }) {
  return (
    <Modal
      open={showUpdateHistoryModal}
      onClose={() => setShowUpdateHistoryModal(false)}
      closeOnDimmerClick
    >
      <Modal.Header
        style={{
          backgroundColor: '#384862',
          color: 'white',
          borderBottom: '1px solid white',
        }}
      >
        작업 내역 __ (이 팝업은 조금 더 보기 편하게 개편될 것입니다)
      </Modal.Header>
      <Modal.Content>
        <p>
          <span style={{ fontWeight: 'bold', marginRight: '20px' }}>
            2021-09-06
          </span>
          직업명 오타 수정 : 아르라카 {'->'} 아르카나
        </p>
        <p>
          <span style={{ fontWeight: 'bold', marginRight: '20px' }}>
            2021-09-07
          </span>
          가입 시 암호화 관련 설명 추가
        </p>
        <p>
          <span style={{ fontWeight: 'bold', marginRight: '20px' }}>
            2021-09-08
          </span>
          케릭터명 입력 후 엔터 이벤트를 등록하기 위해 [케릭터 추가] 팝업 등장
          내부로직 수정
        </p>
        <p>
          <span style={{ fontWeight: 'bold', marginRight: '20px' }}>
            2021-09-09
          </span>
          (버튼이 안 보이는 분들을 위해) 케릭터 추가 기능에서 클래스 선택 및
          케릭터명 입력 후 엔터 시 케릭터가 추가되는 기능 추가
        </p>
        <p>
          <span style={{ fontWeight: 'bold', marginRight: '20px' }}>
            2021-09-10
          </span>
          유지보수 및 코드 분석을 위해 내부 코드 리팩토링 진행 및 간결하게 수정
        </p>
        <p>
          <span style={{ fontWeight: 'bold', marginRight: '20px' }}>
            2021-09-12
          </span>
          9월10일 업데이트 후 첫 로그인 시 화면에 아무것도 안 뜨던 현상 수정,
          컨탠츠에 마우스 올리면 행의 색갈이 바뀌도록 수정
        </p>
        <p>
          <span style={{ fontWeight: 'bold', marginRight: '20px' }}>
            2021-09-12
          </span>
          카던, 가디언, 에포나에 숫자로 선택할 필요없이 체크로 선택하여 저장하기
          가능토록 수정
        </p>
        <p>
          <span style={{ fontWeight: 'bold', marginRight: '20px' }}>
            2021-09-16
          </span>
          케릭터 순서 변경 기능 추가 (우측 상단 이름 클릭 후 순서변경)
        </p>
      </Modal.Content>
    </Modal>
  );
}

export default HistoryModal;
