import React, { useEffect, useState } from "react";

function Twext(props) {
  return (
    <div id="twext">
      <h3>
        {props.author} - {props.date}
      </h3>
      <p>{props.text}</p>
      <div id="twext-footer">
        <div id="flex-button"></div>
        <div id="retwext-button"></div>
        <div id="comment-button"></div>
      </div>
    </div>
  );
}

export default Twext;
