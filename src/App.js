import './App.css';

function App() {

  const prefArray = ['北海道', '青森', '岩手'];

  fetch(
    `https://opendata.resas-portal.go.jp/api/v1/prefectures`,
    {
      headers: {"x-api-key": "-"}
    }).then(res => {
    console.log({res});
    return res.json();
  }).then(json => {
    console.log({json});
  });

  return (
    <div className="App">
      <header className="App-header">
        <div>
          都道府県
        </div>
        {prefArray.map(pref => {
          return (<>
            {pref}<br />
          </>)
        })}
      </header>
    </div>
  );
}

export default App;
