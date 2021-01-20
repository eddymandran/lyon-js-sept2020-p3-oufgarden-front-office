import React, { useState } from 'react';
import { makeEntityAdder } from '../services/API';

const CommentForm = () => {
  const [commentMessage, setCommentMessage] = useState('');

  const handleFieldChange = (event) => {
    const message = event.target.value;
    setCommentMessage(message);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const postComment = makeEntityAdder('comments');
    postComment({ message: commentMessage, article_id: 6 }).then(console.log);
  };

  return (
    <div className="Comment-form">
      <form method="post">
        <div className="form-message">
          <textarea
            onChange={handleFieldChange}
            value={commentMessage}
            className="form-message"
            placeholder="Your Comment"
            name="message"
          />
        </div>

        <button
          type="button"
          onClick={(e) => {
            onSubmit(e);
          }}
        >
          Envoyer
        </button>
      </form>
    </div>
  );
};

export default CommentForm;
