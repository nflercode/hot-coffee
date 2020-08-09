import React from 'react';

function App() {
  fetch('https://api.nfler.se/arguments').then(data => data.json(), (err) => console.error(err)).then(a => console.log(JSON.stringify(a)));
  fetch('https://api.nfler.se/fun').then(data => data.json(), (err) => console.error(err)).then(a => console.log(JSON.stringify(a)));
  return (
    <div className="App">
      <header className="App-header">
        <h1>nfler - arguing is healthy</h1>
        <span>The one and only</span>
      </header>
    </div>
  );
}

export default App;
