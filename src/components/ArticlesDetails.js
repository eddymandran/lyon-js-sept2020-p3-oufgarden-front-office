import React, { useEffect, useState, useRef } from 'react';
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

const URL = process.env.REACT_APP_API_BASE_URL;

const ArticlesDetails = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  const { id } = props.match.params;
  const [articlesDetails, setArticlesDetails] = useState(undefined);
  const [commentMessage, setCommentMessage] = useState('');
  const [comments, setComments] = useState([]);

  const [favorite, setFavorite] = useState([]);
  const [favoriteId, setFavoriteId] = useState(false);

  const buttonFavorite = useRef(null);

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

  const handleFavorite = (target) => {
    if (favoriteId && favoriteId.includes(+id)) {
      makeEntityDeleter('articles/favorites')(id).then(() => {
        getCollection('articles/favorites').then((data) => setFavorite(data));
        target.classList.toggle('selected-like-article');
      });
    } else {
      makeEntityAdder('articles/favorites')({ article_id: id }).then(() => {
        getCollection('articles/favorites').then((data) => setFavorite(data));
        target.classList.toggle('selected-like-article');
      });
    }
  };

  useEffect(() => {
    if (articlesDetails) {
      if (favoriteId && favoriteId.includes(+id)) {
        if (
          !buttonFavorite.current.classList.contains('selected-like-article')
        ) {
          buttonFavorite.current.classList.add('selected-like-article');
        }
      } else if (favoriteId && !favoriteId.includes(+id)) {
        if (
          buttonFavorite.current.classList.contains('selected-like-article')
        ) {
          buttonFavorite.current.classList.remove('selected-like-article');
        }
      }
    }
  }, [favoriteId, articlesDetails]);

  return (
    <div className="articleDetailsPage">
      {articlesDetails && (
        <div className="articlesDetails">
          <img
            className="imgArticleDetails"
            src={`${URL}/${articlesDetails.row.url}`}
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
            ref={buttonFavorite}
            onClick={(e) => {
              handleFavorite(e.target);
            }}
            onKeyPress={(e) => {
              handleFavorite(e.target);
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
