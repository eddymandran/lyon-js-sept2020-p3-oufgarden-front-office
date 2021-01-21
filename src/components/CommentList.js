import React from 'react';
import Comment from './Comment';
import './style/CommentList.scss';
import './style/Comment.scss';

const CommentList = ({ article, comments }) => {
  return (
    <div className="commentList">
      <div className="show-comments">
        {comments.map((e) => (
          <Comment key={e.id} articleId={article} comment={e.message} />
        ))}
      </div>
    </div>
  );
};

export default CommentList;
