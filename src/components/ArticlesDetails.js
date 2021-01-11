import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import { getEntity } from '../services/API';

const ArticlesDetails = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  const { id } = props.match.params;
  const [articlesDetails, setArticlesDetails] = useState([]);

  useEffect(() => {
    getEntity('articles', id).then((elem) => {
      setArticlesDetails(elem);
      console.log(elem);
    });
  }, []);

  return (
    <div className="articleDetailsPage">
      <div className="back-home">
        <Link to="/feed">Back to feed</Link>
      </div>
      <div className="articles">
        <div className="articlesInfos">
          <img className="imgArticle" src={articlesDetails.url} alt="jardin" />
          <div className="text">
            {ReactHtmlParser(articlesDetails.title)}
            <br />
            {ReactHtmlParser(articlesDetails.content)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlesDetails;
