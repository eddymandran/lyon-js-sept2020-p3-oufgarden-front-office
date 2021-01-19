import React, { useState, useEffect } from 'react';
import { getCollection } from '../services/API';
import Comment from './Comment';

const CommentList = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getCollection('comment').then((elem) => {
      setComments(elem);
    });
  }, []);

  return (
    <div className="commentList">
      {comments.map((e) => (
        <Comment key={e.id} comment={e.message} />
      ))}
    </div>
  );
};

export default CommentList;
