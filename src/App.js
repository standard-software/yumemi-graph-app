import './App.css';
import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

const optionsHighcharts = {
  title: {
    text: '総人口推移'
  },
  series: [
    {
      data: [1, 2, 3],
    },
    {
      data: [3, 2, 1],
    }
  ]
}

function App() {

  const [refreshData, setRefreshData] = useState(false);

  const [prefArray, setPrefArray] = useState([
    {prefName: '北海道', checked: false},
    {prefName: '青森', checked: true},
    {prefName: '岩手', checked: false},
  ]);

  useEffect(() => {
    console.log('useEffect');
    if (refreshData === false) { return; }
    fetch(
      `https://opendata.resas-portal.go.jp/api/v1/prefectures`,
      {
        headers: {"x-api-key": "-"}
      }).then(res => {
      // console.log({res});
      return res.json();
    }).then(json => {
      console.log({json});
      const result = [];
      for (const {prefName} of json.result) {
        result.push({prefName, checked: false});
      }
      setPrefArray(result);
    });
    setRefreshData(false);
  }, [refreshData])

  return (
    <div className="App">
      <header className="App-header">
        <div onClick={() => {
          console.log('都道府県');
          setRefreshData(true);
        }}>
          都道府県
        </div>
        <div style={{    overflowY: 'scroll', height: '200px'}}>
        {prefArray.map(({prefName, checked}) => {
          console.log({prefName, checked})
          return (<>
            <label>
              <input
                type="checkbox"
                value="js"
                onChange={() => {
                  const _prefArray = [...prefArray];
                  const index = _prefArray.findIndex(d => d.prefName === prefName);
                  const checked = !_prefArray[index].checked;
                  _prefArray[index] = { prefName, checked };
                  setPrefArray(_prefArray);
                }}
                {...{checked}}
              />
              {prefName}
          </label>
          </>)
        })}
        </div>
        <HighchartsReact
          highcharts={Highcharts}
          options={optionsHighcharts}
        />
      </header>
    </div>
  );
}

export default App;
