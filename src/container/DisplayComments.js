import React from "react";
import "./DisplayComments.css";

const DisplayComments = ({ comment }) => {
  console.log(comment);
  return (
    <div className="container">
      <div>
        <p> {comment.name}</p>
        <br></br>
      </div>
    </div>
  );
};

export default DisplayComments;
