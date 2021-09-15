import React, { useState, useEffect } from 'react';
import { Modal, Grid, Image, Header, Label } from 'semantic-ui-react';
import cookie from 'js-cookie';
import { characterCdn, characterKorean } from '../../_data/characterDefinition';

import { allViewDataMain, applyChangesUtil } from '../Utils/ViewDataUtil';

function ChangePosition({ changeRowModal, setChangeRowModal }) {
  const [userTodoData, setUserTodoData] = useState();
  const [labelText, setLabelText] = useState('저장');

  const [changedIndexArr, setChangedIndexArr] = useState([]);

  const saveChanges = async () => {
    setLabelText('저장중입니다');
    // ES6 distinct values
    const distinctIndexData = Array.from(new Set(changedIndexArr));
    const sendData = userTodoData.filter((item, index) =>
      distinctIndexData.includes(index)
    );
    const applyResult = await applyChangesUtil(
      sendData,
      cookie.get('loadoUserToken')
    );

    if (applyResult) {
      setLabelText('저장에 실패했습니다');
      return;
    }
    window.location.reload();
  };

  useEffect(() => {
    async function callData() {
      const resultData = await allViewDataMain(cookie.get('loadoUserToken'));
      console.log(resultData.viewData.data);
      setUserTodoData(resultData.viewData.data);
    }
    callData();
  }, []);

  let dragStartIndex;

  useEffect(() => {
    function dragStart() {
      dragStartIndex = +this.getAttribute('data-index');
    }

    function dragOver(e) {
      //   console.log("Event: ", "dragover");
      //   nothing happens and the reason
      // for that is basically the drag over event is getting in the way.
      // So we want the read the only reason I have drag over here is to prevent the default action.
      e.preventDefault();
    }

    function dragDrop() {
      const dragEndIndex = +this.getAttribute('data-index');
      swapItems(dragStartIndex, dragEndIndex);
      this.classList.remove('over');
    }

    function dragEnter() {
      this.classList.add('over');
    }
    function dragLeave() {
      this.classList.remove('over');
    }

    // Swap list iteams that are drag and drop
    function swapItems(fromIndex, toIndex) {
      const itemFrom = userTodoData[fromIndex - 1];
      const itemTo = userTodoData[toIndex - 1];

      const itemFromIdx = itemFrom.idx;
      const itemToIdx = itemTo.idx;

      itemFrom.idx = itemToIdx;
      itemTo.idx = itemFromIdx;

      userTodoData[fromIndex - 1] = itemTo;
      userTodoData[toIndex - 1] = itemFrom;

      changedIndexArr.push(fromIndex - 1);
      changedIndexArr.push(toIndex - 1);
      setChangedIndexArr(changedIndexArr);

      console.log(changedIndexArr);

      setUserTodoData([]); // 정보가 남아서 초기화
      setUserTodoData(userTodoData);
    }

    if (userTodoData) {
      const draggables = document.querySelectorAll('.draggable');

      draggables.forEach((draggable) => {
        draggable.addEventListener('dragstart', dragStart);
        draggable.addEventListener('dragover', dragOver);
        draggable.addEventListener('drop', dragDrop);
        draggable.addEventListener('dragenter', dragEnter);
        draggable.addEventListener('dragleave', dragLeave);
      });

      return () => {
        draggables.forEach((draggable) => {
          draggable.removeEventListener('dragstart', dragStart);
          draggable.addEventListener('dragover', dragOver);
          draggable.addEventListener('drop', dragDrop);
          draggable.addEventListener('dragenter', dragEnter);
          draggable.addEventListener('dragleave', dragLeave);
        });
      };
    }
  }, [userTodoData]);

  return (
    <Modal
      open={changeRowModal}
      onClose={() => setChangeRowModal(false)}
      closeOnDimmerClick
      size='tiny'
    >
      <Modal.Header
        style={{
          backgroundColor: '#384862',
          color: 'white',
          borderBottom: '1px solid white',
        }}
      >
        케릭터 순서변경
        {userTodoData && (
          <Label
            as='a'
            color='orange'
            ribbon
            style={{ marginLeft: '80px' }}
            onClick={saveChanges}
          >
            {labelText}
          </Label>
        )}
      </Modal.Header>
      <Modal.Content style={{ backgroundColor: 'lavender' }}>
        <Grid columns={10}>
          {userTodoData &&
            userTodoData
              .sort(function (a, b) {
                return a['idx'] - b['idx'];
              })
              .map((item, index) => (
                <Grid.Row
                  className='draggable'
                  draggable={true}
                  data-index={item.idx}
                  style={{ borderBottom: '1px solid rgb(56, 72, 98)' }}
                >
                  <Grid.Column width={7}>
                    <Header as='h5'>
                      <span style={{ marginRight: '20px' }}>{index + 1}.</span>
                      <Image avatar src={characterCdn[item.character]} />{' '}
                      <span style={{ marginLeft: '10px' }}>
                        {item.characterName}
                      </span>
                    </Header>
                  </Grid.Column>
                </Grid.Row>
              ))}
        </Grid>
      </Modal.Content>
    </Modal>
  );
}

export default ChangePosition;
