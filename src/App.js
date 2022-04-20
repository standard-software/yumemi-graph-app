import logo from './logo.svg';
import './App.css';

function App() {

  const prefArray = ['北海道', '青森', '岩手'];

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
