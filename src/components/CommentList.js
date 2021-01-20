import React, { useState, useEffect } from 'react';
import { getCollection } from '../services/API';
import Comment from './Comment';

const CommentList = ({ article }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getCollection('comments', { article_id: 6 }).then((elem) => {
      setComments(elem);
    });
  }, []);

  return (
    <div className="commentList">
      {comments.map((e) => (
        <Comment key={e.id} articleId={article} comment={e.message} />
      ))}
    </div>
  );
};

export default CommentList;
