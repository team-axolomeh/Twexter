import React, { useEffect, useState } from 'react';

function Twext(props) {

  return (
    <div id="twext">
      <h3>{props.author} - {props.date}
      </h3>
      <p>{props.text}</p>
    </div>
  )
}

export default Twext;