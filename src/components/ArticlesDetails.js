import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import { getEntity, makeEntityAdder, getCollection } from '../services/API';
import './style/ArticlesDetails.scss';
import CommentForm from './CommentForm';
import CommentList from './CommentList';

const ArticlesDetails = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  const { id } = props.match.params;
  const [articlesDetails, setArticlesDetails] = useState(undefined);
  const [commentMessage, setCommentMessage] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getEntity('articles', id).then((elem) => {
      setArticlesDetails(elem);
    });
  }, []);

  useEffect(() => {
    getCollection('comments', { article_id: id }).then((elem) => {
      setComments(elem);
    });
  }, [commentMessage]);

  const onSubmit = async (e) => {
    e.preventDefault();
    await makeEntityAdder('comments')({
      message: commentMessage,
      article_id: id,
    }).then(() => {
      setCommentMessage('');
      setComments(comments);
      return null;
    });
  };

  return (
    <div className="articleDetailsPage">
      {articlesDetails && (
        <div className="articlesDetails">
          <img
            className="imgArticleDetails"
            src={`http://localhost:5000/${articlesDetails.row.url}`}
            alt="jardin"
          />
          <div className="whitebar">
            <div className="back-home">
              <Link className="link-back-feed" to="/feed">
                <div className="back-arrow" />
                <div className="retour">Retour</div>
              </Link>
            </div>
          </div>
          <div className="article-tags">
            {articlesDetails.tag.map((t) => {
              return (
                <div key={t.id}>
                  <div className="tag-of-article">{t.name}</div>
                </div>
              );
            })}
          </div>
          <div className="fullText">
            <div className="title">{articlesDetails.row.title}</div>
            <div className="content">
              {ReactHtmlParser(articlesDetails.row.content)}
            </div>
          </div>
        </div>
      )}
      <div className="commentaires">
        <div className="comments-title">
          <div className="speech-bubble" />
          <h4>Commentaires</h4>
        </div>
        <CommentList comments={comments} setComments={setComments} />
        <CommentForm
          id={id}
          onSubmit={onSubmit}
          commentMessage={commentMessage}
          setCommentMessage={setCommentMessage}
        />
      </div>
    </div>
  );
};

export default ArticlesDetails;
