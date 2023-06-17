import React, { useEffect, useState } from 'react';
import Feed from './routes/Feed.jsx';
import Login from './routes/Login.jsx';
import ErrorPage from './routes/ErrorPage.jsx';
import './styles.css';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';

function App() {
  const [text, setText] = useState();

  useEffect(() => {
    async function getData() {
      const result = await fetch('/api');
      const text = await result.text();
      // setText(text);
    }
    getData();
  }, []);

  return (
    // Specify Routes in Here
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
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/login" element={<Login />} />
        <Route path="error" element={<ErrorPage />} />
      </Routes>
      <footer>
        Created by{' '}
        <a href="https://github.com/axolomehsterz">the axolomehsterz</a> 💪
      </footer>
      <Link to="/error">Click me</Link>
    </div>
  );
}

export default App;
