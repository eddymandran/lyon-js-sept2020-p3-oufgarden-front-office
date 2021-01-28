import React from 'react';
import Comment from './Comment';
import './style/CommentList.scss';
import './style/Comment.scss';

const URL = process.env.REACT_APP_API_BASE_URL;

const CommentList = ({ article, comments }) => {
  return (
    <div className="commentList">
      <div className="show-comments">
        {comments.map((e) => (
          <Comment
            key={e.id}
            articleId={article}
            avatar={`${URL}/${e.picture_url}`}
            firstname={e.firstname}
            lastname={e.lastname}
            date={e.date}
            comment={e.message}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentList;
