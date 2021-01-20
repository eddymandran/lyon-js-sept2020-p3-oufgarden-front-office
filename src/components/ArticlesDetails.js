import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import { getEntity } from '../services/API';
import './style/ArticlesDetails.scss';

const ArticlesDetails = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  const { id } = props.match.params;
  const [articlesDetails, setArticlesDetails] = useState([]);

  useEffect(() => {
    getEntity('articles', id).then((elem) => {
      setArticlesDetails(elem);
    });
  }, []);

  return (
    <div className="articleDetailsPage">
      {/* <div className="articlesInfos"> */}
      <img
        className="imgArticleDetails"
        src={articlesDetails.url}
        alt="jardin"
      />
      <div className="whitebar">
        <div className="back-home">
          <Link to="/feed">Retour</Link>
        </div>
      </div>
      <div className="fullText">
        <div className="title">{ReactHtmlParser(articlesDetails.title)}</div>
        <div className="content">
          {ReactHtmlParser(articlesDetails.content)}
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default ArticlesDetails;
