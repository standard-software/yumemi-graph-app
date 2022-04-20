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

const API_KEY = "-"

function App() {

  const [refreshPref, setRefreshPref] = useState(false);
  const [refreshGraph, setRefreshGraph] = useState(false);

  const [prefArray, setPrefArray] = useState([
    {prefCode: '1', prefName: '北海道', checked: false},
    {prefCode: '2', prefName: '青森', checked: true},
    {prefCode: '3', prefName: '岩手', checked: false},
  ]);

  useEffect(() => {
    console.log('useEffect 1');
    if (refreshPref === false) { return; }
    fetch(
      `https://opendata.resas-portal.go.jp/api/v1/prefectures`,
      {
        headers: {"x-api-key": API_KEY}
      }).then(res => {
      // console.log({res});
      return res.json();
    }).then(json => {
      console.log({json});
      const result = [];
      for (const {prefCode, prefName} of json.result) {
        result.push({prefCode, prefName, checked: false});
      }
      setPrefArray(result);
    });
    setRefreshPref(false);
  }, [refreshPref])

  useEffect(() => {
    console.log('useEffect 2');
    if (refreshGraph === false) { return; }

    const f = async () => {

      const results = [];

      for (const {prefName, prefCode, checked} of prefArray) {
        if (!checked) { continue; }

        console.log({prefName, prefCode, checked})

        const parameter = `prefCode=${prefCode}`;

        results.push(
          fetch(
            `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-1&${parameter}`,
            {
              headers: {"x-api-key": API_KEY}
            }).then(res => {
            // console.log({res});
            return res.json();
          }).then(json => {
            console.log({json});
            // const result = [];
            // for (const {prefName} of json.result) {
            //   result.push({prefName, checked: false});
            // }
            // setPrefArray(result);
          })
        );
      }
      await Promise.all(results)
      console.log(`after Promise.all`);

      setRefreshGraph(false);
    };
    f();

  }, [prefArray, refreshGraph])

  return (
    <div className="App">
      <header className="App-header">
        <div onClick={() => {
          setRefreshPref(true);
        }}>
          都道府県
        </div>
        <div style={{    overflowY: 'scroll', height: '200px'}}>
        {prefArray.map(({prefName, checked}) => {
          // console.log({prefName, checked})
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
        <div onClick={() => {
          setRefreshGraph(true);
        }}>
          グラフ
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
