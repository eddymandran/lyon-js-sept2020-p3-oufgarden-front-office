import React, { useState, useEffect } from 'react';
import { getCollection } from '../services/API';

const Feed = () => {
  const [articles, setArticles] = useState([]);
  const [articlesFiltered, setArticlesFiltered] = useState([]);

  useEffect(() => {
    getCollection('articles').then((data) => setArticles(data));
  }, []);

  useEffect(() => {
    const articleToFilter = () => {
      articles
        .filter((article) => {
          if (
            // article.garden_id === user.garden_id ||
            article.garden_id === null
          ) {
            return true;
          }
          return false;
        })
        .map((article) => {
          return article.article_id;
        });
    };
    setArticlesFiltered(articleToFilter);
  }, []);

  return (
    <div className="articlesList">
      {articlesFiltered.map((e) => {
        return (
          <div key={e.id} className="Articles">
            <div className="articlesInfo">
              <p>
                {e.title} {e.image} {e.text}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Feed;
