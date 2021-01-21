import React from 'react';
import './style/Comment.scss';

const Comment = ({ comment }) => {
  return (
    <div className="comment">
      <div className="all-comment">
        {/* <img
        className="avatar-comment"
        // src={userDetails.avatar}
        // alt={userDetails.name}
      /> */}

        <div className="show-comment">
          {/* <h6 className="avatar-name">{userDetails.name}</h6> */}
          {comment}
        </div>
      </div>
    </div>
  );
};

export default Comment;
