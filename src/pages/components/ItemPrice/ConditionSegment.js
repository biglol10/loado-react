import React, { useState } from 'react';

import { Button, Segment } from 'semantic-ui-react';
import moment from 'moment';
import TextField from '@mui/material/TextField';

function ConditionSegment({ setAddItemTrend, searchItemCollection, type }) {
  const [dateValue, setDateValue] = useState({
    startDate: moment().add(-6, 'days').format('YYYY-MM-DD'),
    endDate: moment().format('YYYY-MM-DD'),
  });

  const changeDate = (value, type) => {
    if (type === 'startDate') {
      if (dateValue.endDate < value) return;
      setDateValue({ ...dateValue, startDate: value });
    } else {
      if (dateValue.startDate > value) return;
      setDateValue({ ...dateValue, endDate: value });
    }
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <Button
          inverted
          color='teal'
          onClick={() => setAddItemTrend(true)}
          style={{ height: '50%' }}
        >
          아이템 추가
        </Button>

        {type !== 'mobile' && (
          <Segment>
            <TextField
              id='startDate'
              label='시작일자'
              type='date'
              InputLabelProps={{
                shrink: true,
              }}
              value={dateValue.startDate}
              onChange={(event) => changeDate(event.target.value, 'startDate')}
            />

            <TextField
              id='endDate'
              label='종료일자'
              type='date'
              InputLabelProps={{
                shrink: true,
              }}
              value={dateValue.endDate}
              onChange={(event) => changeDate(event.target.value, 'endDate')}
            />
          </Segment>
        )}

        <Button
          inverted
          color='olive'
          onClick={() =>
            searchItemCollection(dateValue.startDate, dateValue.endDate)
          }
          style={{ height: '50%' }}
        >
          조회
        </Button>
      </div>
      {type === 'mobile' && (
        <Segment style={{ display: 'flex', justifyContent: 'center' }}>
          <TextField
            id='startDate'
            label='시작일자'
            type='date'
            InputLabelProps={{
              shrink: true,
            }}
            value={dateValue.startDate}
            onChange={(event) => changeDate(event.target.value, 'startDate')}
          />

          <TextField
            id='endDate'
            label='종료일자'
            type='date'
            InputLabelProps={{
              shrink: true,
            }}
            value={dateValue.endDate}
            onChange={(event) => changeDate(event.target.value, 'endDate')}
          />
        </Segment>
      )}
    </>
  );
}

export default ConditionSegment;
