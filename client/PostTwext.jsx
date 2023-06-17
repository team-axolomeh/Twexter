import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

function PostTwext(props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentCount, updateWordCount] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState();

  const wordCounter = (string) => {
    if (!string) return 0;
    const array = string.split(' ');
    return array.length;
  };

  const handleKeyPress = (e) => {
    let result = wordCounter(e.target.value) - 1;
    if (result < 0) result = 0;
    setWordCount(result);
  };
  async function handleClick() {

    // const wordCount = (string) => {
    //   const array = string.split(' ');
    //   return array.length;
    // };

    // useEffect(() => {

    // } []);

    const element = document.querySelector('#new-twext-content');
    const twextContent = element.value;
    console.log(twextContent);

    //TODO: Check if 500 words
    //Count number of words
    //If < 500 return
    const wordCount = wordCounter(twextContent);
    console.log('wordCount', wordCount);
    if (wordCount < 500) {
      console.log('twext does not have enough words');
      setErrorMessage('Twext must have a minimum of 500 words')
      return;
    }
    setErrorMessage("");
    const username = searchParams.get('user');
    //if (!username) return;
    const body = {
      username: username,
      twextContent: twextContent,
    };
    const response = await fetch('/twext', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const json = await response.json();
    console.log(json);
    console.log('response FROM POST REQUEST', response);
  }

  return (
    <div id="post-twext">
      <div id="twext-input">
        <textarea onChange={handleKeyPress} id="new-twext-content"></textarea>
      </div>
      <div id="post-button-container">
        <button onClick={handleClick}>Post Twext</button>
        <p>{wordCount} / 500 </p>
        {errorMessage ? <p id="error-message">{errorMessage}</p> : null}
      </div>
    </div>
  );
}

export default PostTwext;

//TODO: store twext content on:
//req.body.twextContent
