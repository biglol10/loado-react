import React from 'react';
import { Header, Label, Icon } from 'semantic-ui-react';

function SettingChange({ viewByCheckBox, setViewByCheckBox, deviceType }) {
  const todayDate = new Date(Date.now());
  const today = `${todayDate.getFullYear()}-${
    todayDate.getMonth() + 1
  }-${todayDate.getDate()}`;

  return (
    <div className='headerValueStart'>
      <Header size='medium' style={{ color: 'white', paddingTop: '5px' }}>
        {deviceType !== 'mobile' && today}{' '}
        <Label
          as='a'
          basic
          image
          style={{ marginLeft: '30px' }}
          onClick={() => setViewByCheckBox(!viewByCheckBox)}
        >
          {!viewByCheckBox ? (
            <>
              <Icon name='checkmark box' />
              {deviceType !== 'mobile' && '로 보기'}
            </>
          ) : (
            <>
              <Icon name='angle double down' />
              {deviceType !== 'mobile' && '로 보기'}
            </>
          )}
        </Label>
      </Header>
    </div>
  );
}

export default SettingChange;
