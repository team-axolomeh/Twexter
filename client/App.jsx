import React, { useEffect, useState } from 'react';

function App() {

  const [text, setText] = useState();

  useEffect(() => {
    async function getData() {
      const result = await fetch('/api');
      const text = await result.text();
      setText(text);
    }
    getData();
  }, [])

  return (
    <div>
      <h1>Welcome to Twexter!</h1>
      <h2>{text}</h2>
    </div>
  )
}

export default App;