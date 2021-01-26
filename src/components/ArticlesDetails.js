import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import {
  getEntity,
  makeEntityAdder,
  getCollection,
  makeEntityDeleter,
} from '../services/API';
import './style/ArticlesDetails.scss';
import CommentForm from './CommentForm';
import CommentList from './CommentList';

const ArticlesDetails = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  const { id } = props.match.params;
  const [articlesDetails, setArticlesDetails] = useState(undefined);
  const [commentMessage, setCommentMessage] = useState('');
  const [comments, setComments] = useState([]);

  const [favorite, setFavorite] = useState([]);
  const [favoriteId, setFavoriteId] = useState(false);

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

  useEffect(() => {
    getCollection('articles/favorites').then((data) => setFavorite(data));
  }, []);

  useEffect(() => {
    if (favorite && favorite.length > 0) {
      setFavoriteId(favorite.map((elem) => elem.article_id));
    }
    if (favorite && favorite.length === 0) {
      setFavoriteId([]);
    }
  }, [favorite]);

  const handleFavorite = () => {
    /* if (favoriteId && favoriteId.includes(+id)) {
      API.delete('articles/favorites', { article_id: id }).then(() => {
        setFavorite();
      }); */
    if (favoriteId && favoriteId.includes(+id)) {
      makeEntityDeleter('articles/favorites')(id).then(() => {
        getCollection('articles/favorites').then((data) => setFavorite(data));
      });
    } else {
      makeEntityAdder('articles/favorites')({ article_id: id }).then(() => {
        getCollection('articles/favorites').then((data) => setFavorite(data));
      });
    }
  };
  console.log(favoriteId, id, favorite);
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
          <div
            role="button"
            className="like-Button"
            onClick={() => {
              handleFavorite();
            }}
            onKeyPress={() => {
              handleFavorite();
            }}
            aria-label="Boutton favori"
            tabIndex={0}
          />
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
