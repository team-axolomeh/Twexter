import React, { useEffect, useState } from 'react';

function Feed(){

  function handleClick() {
    console.log('Button Clicked!');
    // interact with the backend in order to determine whether or not the login in was successful
  }

  return (
    <div className='center'>
      <h1 className="header">Twexter</h1>
      <h2 className="header">Feed Goes Here!</h2>
    </div>
  )
};

export default Feed;