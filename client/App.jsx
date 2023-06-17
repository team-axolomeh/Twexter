import React, { useEffect, useState } from 'react';
import Feed from './Feed.jsx';
import './styles.css';

function App() {

  const [text, setText] = useState();

  useEffect(() => {
    async function getData() {
      const result = await fetch('/api');
      const text = await result.text();
      // setText(text);
    }
    getData();
  }, [])

  return (
    <div className="App">
      <header>
      <div id="logo">
        <img src="./logo.png" />
      </div>
      <h1>Welcome to Twexter!</h1>
      <div id="logo">
        <img src="./logo.png" />
      </div>
      </header>
      <Feed />
      <footer>
        Created by <a href="https://github.com/axolomehsterz">the axolomehsterz</a> 💪
      </footer>
    </div>
  )
}

export default App;