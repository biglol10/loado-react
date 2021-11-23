import React from "react";
import { Button } from "semantic-ui-react";

function AddAndChange({ addCharacter, applyChanges }) {
  return (
    <div className="headerValueEnd">
      <Button inverted color="olive" onClick={addCharacter}>
        케릭터 추가
      </Button>
      <Button inverted color="red" onClick={applyChanges}>
        변경사항 저장
      </Button>
    </div>
  );
}

export default AddAndChange;
