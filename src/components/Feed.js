import React, { useState, useEffect /* useContext  */ } from 'react';
import { getCollection } from '../services/API';
/* import { UserContext } from './Contexts/UserContextProvider'; */

const ListArticles = () => {
  /*  const { userDetails } = useContext(UserContext); */

  const [articles, setArticles] = useState([]);
  const [articlesFiltered, setArticlesFiltered] = useState([]);
  const [tagList, setTagList] = useState([]);
  const [allTags, setAllTags] = useState([]);

  useEffect(() => {
    getCollection('articles').then((elem) => {
      setArticles(elem);
    });
  }, []);

  useEffect(() => {
    getCollection('tags').then((data) => setAllTags(data));
  }, []);

  useEffect(() => {
    getCollection('tagToArticle').then((result) => {
      const articleToFilter = result
        .filter((article) => {
          if (tagList.includes(article.tag_id)) {
            return true;
          }
          return false;
        })
        .map((article) => {
          return article.article_id;
        });
      setArticlesFiltered(articleToFilter);
    });
  }, [tagList]);

  const handleTagList = (target) => {
    if (tagList.includes(+target.id)) {
      const newTagList = tagList.filter((item) => item !== +target.id);
      setTagList(newTagList);
    } else {
      setTagList((prevState) => [...prevState, +target.id]);
    }
  };

  return (
    <div>
      <div className="filterContainer">
        {allTags &&
          allTags.map((tag) => {
            return (
              <div key={tag.id}>
                <button
                  type="button"
                  className="filterButton"
                  id={tag.id}
                  onClick={(e) => handleTagList(e.target)}
                >
                  {tag.name}
                </button>
              </div>
            );
          })}
      </div>
      <div className="articleListContainer">
        {articlesFiltered.length > 0
          ? articles
              .filter((article) => {
                if (articlesFiltered.includes(article.id)) {
                  return true;
                }
                return false;
              })
              .map((e) => {
                return (
                  <div key={e.id} className="ArticlesRow">
                    <div className="articlesInfos">
                      <p>
                        {e.title} {e.image} {e.text}
                      </p>
                    </div>
                  </div>
                );
              })
          : articles.map((e) => {
              return (
                <div key={e.id} className="ArticlesRow">
                  <div className="articlesInfos">
                    <p>
                      {e.title} {e.image} {e.text}
                    </p>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
};
export default ListArticles;

/* const Feed = () => {
  const [articles, setArticles] = useState([]);
  const [articlesFiltered, setArticlesFiltered] = useState([]);

/* filtrer appartion des articles 
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

export default Feed; */
