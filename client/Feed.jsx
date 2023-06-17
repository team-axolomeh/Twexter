import React, { useEffect, useState } from 'react';
import data from '../twextMockData';
import Twext from './Twext';
import { v4 as uuidv4 } from 'uuid';

function Feed() {
  const [text, setText] = useState();
  const [twextList, setTwextList] = useState();

  useEffect(() => {
    async function getTwexts() {
      //TODO: Switch to backend data
      const response = data;
      setTwextList(
        response.map((twext) => {
          return (
            <Twext
              key={uuidv4()}
              text={twext.text}
              date={twext.date.toGMTString()}
              author={twext.author}
            />
          );
        })
      );
    }
    getTwexts();
  }, []);
  return (
    <div id="feed">
      {twextList}
    </div>
  );
}

export default Feed;
