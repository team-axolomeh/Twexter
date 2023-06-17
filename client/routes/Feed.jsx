import React, { useEffect, useState } from 'react';
import data from '../../twextMockData';
import Twext from './../Twext';
import { v4 as uuidv4 } from 'uuid';
import PostTwext from "../PostTwext";

function Feed() {
  const [text, setText] = useState();
  const [twextList, setTwextList] = useState();

  useEffect(() => {
    async function getTwexts() {
      //TODO: Switch to backend data
      
      //Lorem ipsum
      //const response = data;
      const response = await fetch('/twext');
      console.log(response)
      const json = await response.json();
      console.log(json)



      setTwextList(
        json.result.map((twext) => {
          return (
            <Twext
              key={uuidv4()}
              text={twext.content}
              author={twext.username}
            />
          );
        })
      );
    }
    getTwexts();
  }, []);
  return (
    <div id="feed">
      <h2>Post new Twext</h2>
      <PostTwext />
      {twextList}
    </div>
  );
}

export default Feed;
