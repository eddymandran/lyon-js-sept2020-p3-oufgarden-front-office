import React from 'react';
import './style/Comment.scss';

import dayjs from 'dayjs';

const Comment = ({ avatar, firstname, lastname, date, comment }) => {
  return (
    <div className="comment">
      <div className="all-comment">
        <div className="show-comment">
          <div className="show-comment-details-user">
            <img
              className="show-comment-avatar"
              alt="utilisateur"
              src={avatar}
            />
            <div className="show-comment-name">{`${firstname} ${lastname}`}</div>
            <div className="show-comment-date">
              {dayjs(date).format('DD/MM/YYYY, HH:mm')}
            </div>
          </div>
          <div className="show-comment-message">{comment}</div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
