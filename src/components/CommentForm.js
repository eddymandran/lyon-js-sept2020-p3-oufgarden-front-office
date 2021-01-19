// import React, { useState, useEffect } from 'react';
// import { makeEntityAdder } from '../services/API';

// const CommentForm = ({ articleId }) => {
//   const [commentMessage, setCommentMessage] = useState([]);

//   const handleFieldChange = (event) => {
//     const message = event.target;
//     setCommentMessage(message);
//   };

//   const onSubmit = (e) => {
//     e.preventDefault();
//     const data = makeEntityAdder('comment').then((data) => data.json());
//     setComment(data);
//   };

//   return (
//     <div className="Comment-form">
//       <form method="post">
//         <div className="form-message">
//           <textarea
//             onChange={handleFieldChange}
//             value={comment.message}
//             className="form-message"
//             placeholder="Your Comment"
//             name="message"
//           />
//         </div>

//         <button
//           type="button"
//           onClick={(e) => {
//             onSubmit(e);
//           }}
//         >
//           Envoyer
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CommentForm;
