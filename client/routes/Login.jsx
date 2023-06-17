import React, { useEffect, useState } from 'react';

function Login(){

  function handleClick() {
    console.log('Button Clicked!');
    // interact with the backend in order to determine whether or not the login in was successful
  }

  return (
    <div className='center'>
      <h1 className="header">Twexter</h1>
      <div className='center'>
        {/* eventually make this a button that follows a link */}
        {/* <button className='element' onClick={}>Log In</button> */}
        <a href="https://github.com/organizations/axolomehsterz/settings/applications/2234692">Log In</a>
      </div>
    </div>
  )
};

export default Login;