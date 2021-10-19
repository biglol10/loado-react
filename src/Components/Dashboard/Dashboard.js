import React, { useState, useEffect } from 'react';
import '../Home/CharacterToDo.css';
import { Segment, Grid } from 'semantic-ui-react';
import { Line } from 'react-chartjs-2';
import cookie from 'js-cookie';
import { getLoadoLogs } from '../Utils/ViewDataUtil';

import './Dashboard.css';

function Dashboard() {
  const [lineLabels, setlineLabels] = useState();
  const [lineData, setlineData] = useState();

  useEffect(() => {
    async function getLoadoLogsFunction() {
      let resultData = await getLoadoLogs(cookie.get('loadoUserToken'));
      if (!resultData) return;
      resultData.log.sort(function (a, b) {
        const keyA = new Date(a.dateValue);
        const keyB = new Date(b.dateValue);
        // Compare the 2 dates
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
      });
      const labels = [];
      const data = [];
      resultData.log.map((item) => {
        labels.push(item.dateValue);
        data.push(item.count);
      });
      setlineLabels(labels);
      setlineData(data);
    }
    getLoadoLogsFunction();
  }, []);

  const data = {
    labels: lineLabels,
    datasets: [
      {
        label: '',
        data: lineData,
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      title: {
        display: true,
        text: '이용 현황',
      },
    },
  };
  return (
    <Segment
      className='fullPage'
      style={{ height: '94vh', border: 'none', backgroundColor: '#384862' }}
    >
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column>
            <span>asdf</span>
          </Grid.Column>
          <Grid.Column
            style={{
              height: '350px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div
              style={{ width: '90%', height: '100%', backgroundColor: 'white' }}
            >
              <Line data={data} options={options} className='lineGraph' />
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
}

export default Dashboard;
