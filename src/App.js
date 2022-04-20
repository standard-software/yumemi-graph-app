import './App.css';
import React, { useState } from 'react';

function App() {

  const [prefArray, setPrefArray] = useState([]);

  fetch(
    `https://opendata.resas-portal.go.jp/api/v1/prefectures`,
    {
      headers: {"x-api-key": "-"}
    }).then(res => {
    // console.log({res});
    return res.json();
  }).then(json => {
    // console.log({json});
    const result = [];
    for (const {prefCode, prefName} of json.result) {
      result.push(prefName)
    }
    setPrefArray(result);
  });

  return (
    <div className="App">
      <header className="App-header">
        <div>
          都道府県
        </div>
        <div style={{    overflowY: 'scroll', height: '200px'}}>
        {prefArray.map(pref => {
          return (<>
            {pref}<br />
          </>)
        })}
        </div>
      </header>
    </div>
  );
}

export default App;
