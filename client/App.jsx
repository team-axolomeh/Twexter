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
      <h1>Welcome to Twexter!</h1>
      </header>
      <Feed />
    </div>
  )
}

export default App;