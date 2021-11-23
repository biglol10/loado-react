import React, { useState, useEffect } from "react";
import { Grid, Modal, Image, Button } from "semantic-ui-react";
import TextField from "@material-ui/core/TextField";
import { characterCdn } from "../../../_data/characterDefinition";

function RestValueMobile({ item, userTodoData, setUserTodoData }) {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    let element = document.getElementById(item._id);
    const rightclickEvent = element.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      setShowModal(true);
    });
    return () => {
      element.removeEventListener("contextmenu", rightclickEvent);
    };
  });

  // if you use setShowModal directly in Modal onClose, react will throw error
  const closeModal = () => {
    setShowModal(false);
  };

  const [chaosRestValue, setChaosRestValue] = useState(item.chaosRestValue);
  const [guardianRestValue, setGuardianRestValue] = useState(
    item.guardianRestValue
  );
  const [eponaRestValue, setEponaRestValue] = useState(item.eponaRestValue);

  const [chaosRestValueChange, setChaosRestValueChange] = useState(
    item.chaosRestValue
  );
  const [guardianRestValueChange, setGuardianRestValueChange] = useState(
    item.guardianRestValue
  );
  const [eponaRestValueChange, setEponaRestValueChange] = useState(
    item.eponaRestValue
  );

  const valueChange = (e) => {
    e.preventDefault();
    if (e.target.id === "chaosChange") {
      const changedValue = e.target.value;
      const valueOutput =
        chaosRestValueChange + (changedValue - chaosRestValueChange) * 10;
      if (valueOutput < 0) setChaosRestValueChange(0);
      else if (0 <= valueOutput && valueOutput <= 100)
        setChaosRestValueChange(valueOutput);
      else setChaosRestValueChange(100);

      return;
    }
    if (e.target.id === "guardianChange") {
      const changedValue = e.target.value;
      const valueOutput =
        guardianRestValueChange + (changedValue - guardianRestValueChange) * 10;
      if (valueOutput < 0) setGuardianRestValueChange(0);
      else if (0 <= valueOutput && valueOutput <= 100)
        setGuardianRestValueChange(valueOutput);
      else setGuardianRestValueChange(100);

      return;
    }
    if (e.target.id === "eponaChange") {
      const changedValue = e.target.value;
      const valueOutput =
        eponaRestValueChange + (changedValue - eponaRestValueChange) * 10;
      if (valueOutput < 0) setEponaRestValueChange(0);
      else if (0 <= valueOutput && valueOutput <= 100)
        setEponaRestValueChange(valueOutput);
      else setEponaRestValueChange(100);

      return;
    }
  };

  const confirmValue = () => {
    const indexValue = userTodoData.findIndex((anItem) => {
      return anItem._id === item._id;
    });
    let newArr = [...userTodoData];
    newArr[indexValue]["chaosRestValue"] = chaosRestValueChange;
    newArr[indexValue]["guardianRestValue"] = guardianRestValueChange;
    newArr[indexValue]["eponaRestValue"] = eponaRestValueChange;
    newArr[indexValue]["attributeChanged"] = true;
    setUserTodoData(newArr);
    closeModal();
  };

  return (
    <>
      <Grid.Column id={item._id}>
        카오스: {item.chaosRestValue}
        <br />
        가디언: {item.guardianRestValue}
        <br />
        에포나: {item.eponaRestValue}
      </Grid.Column>
      <Modal
        size="mini"
        open={showModal}
        onClose={closeModal}
        closeIcon
        closeOnDimmerClick
      >
        <Modal.Header>
          <Image src={characterCdn[item.character]} size="mini" avatar />
          {item.characterName}
        </Modal.Header>
        <Modal.Content>
          <TextField
            id="chaosChange"
            type="number"
            label="카오스던전"
            onChange={(e) => valueChange(e)}
            value={chaosRestValueChange}
          />
          <TextField
            id="guardianChange"
            type="number"
            label="가디언토벌"
            onChange={(e) => valueChange(e)}
            value={guardianRestValueChange}
          />
          <TextField
            id="eponaChange"
            type="number"
            label="에포나"
            onChange={(e) => valueChange(e)}
            value={eponaRestValueChange}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={closeModal}>
            취소
          </Button>
          <Button positive onClick={confirmValue}>
            확인
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
}

export default RestValueMobile;
