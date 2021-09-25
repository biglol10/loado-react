import React from 'react';
import { Header, Label, Icon } from 'semantic-ui-react';

function AlarmAndNoteMobile({
  alarmTrue,
  alarmRestValue,
  userTodoData,
  showNote,
  setShowNote,
}) {
  return (
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
      </div>
    </Header>
  );
}

export default AlarmAndNoteMobile;
