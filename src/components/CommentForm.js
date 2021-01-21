import React from 'react';
import './style/CommentForm.scss';

const CommentForm = ({ onSubmit, setCommentMessage, commentMessage }) => {
  const handleFieldChange = (event) => {
    const message = event.target.value;
    setCommentMessage(message);
  };

  return (
    <div className="Comment-form">
      <form method="post" className="post">
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
          className="comment-button"
          onClick={(e) => {
            onSubmit(e);
          }}
        >
          Commenter
        </button>
      </form>
    </div>
  );
};

export default CommentForm;
