import React, { useEffect, useState } from 'react';

function ErrorPage(){

  function handleClick() {
    console.log('Button Clicked!');
    // interact with the backend in order to determine whether or not the login in was successful
  }

  return (
    <div className='center'>
      <h1 className="header">Error!</h1>
    </div>
  )
};

export default ErrorPage;