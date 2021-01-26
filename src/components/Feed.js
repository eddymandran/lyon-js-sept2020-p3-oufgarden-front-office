/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect /* useContext  */ } from 'react';
import { Link } from 'react-router-dom';
// import ReactHtmlParser from 'react-html-parser';
import Select from 'react-select';
import { getCollection } from '../services/API';
import './style/Feed.scss';

/* import { UserContext } from './Contexts/UserContextProvider'; */
const URL = process.env.REACT_APP_API_BASE_URL;

const Feed = () => {
  const [articles, setArticles] = useState([]);
  const [articlesFiltered, setArticlesFiltered] = useState([]);
  const [tagList, setTagList] = useState([]);
  const [allTags, setAllTags] = useState([]);

  const [favorite, setFavorite] = useState([]);
  const [favoriteId, setFavoriteId] = useState(false);
  const [showFavoriteList, setShowFavoriteList] = useState(false);

  useEffect(() => {
    getCollection('articles').then((elem) => {
      setArticles(elem);
    });
  }, []);

  const articleOption = articles.map((elem) => {
    return {
      value: elem.id,
      label: `${elem.title}`,
    };
  });

  const handleSelectArticleChange = (elem) => {
    if (!elem) {
      setArticlesFiltered([]);
    } else {
      setArticlesFiltered(elem.map((e) => e.value));
    }
  };

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

  useEffect(() => {
    getCollection('articles/favorites').then((data) => setFavorite(data));
  }, []);

  useEffect(() => {
    if (favorite.length > 0) {
      setFavoriteId(favorite.map((elem) => elem.article_id));
    }
  }, [favorite]);
  console.log(favoriteId);
  console.log(favorite);

  const handleFavoriteList = () => {
    setShowFavoriteList(!showFavoriteList);
  };
  console.log(showFavoriteList);

  // const handleFavorite = () => {
  //   if (favoriteId && favoriteId.includes(id)) {
  //     API.delete('articles/favorites', { article_id: id }).then(() => {
  //       setFavorite();
  //     });
  //   } else {
  //     makeEntityAdder('articles/favorites')({ article_id: id }).then(() => {
  //       setFavorite();
  //     });
  //   }
  // };

  return (
    <div className="containerFeed">
      <div className="searchArticleSelect">
        <Select
          isMulti
          name="articles"
          placeholder="rechercher votre articles"
          options={articleOption}
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={(e) => {
            handleSelectArticleChange(e);
          }}
        />
      </div>
      <div className="filterContainer">
        <button
          type="button"
          className="buttonPres"
          onClick={() => handleFavoriteList()}
        />
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
        {showFavoriteList &&
          favorite.map((e) => {
            return (
              <div key={e.article_id} className="articlesRow">
                <Link to={`/articles/${e.article_id}`}>
                  <div className="articlesInfos">
                    <img
                      className="imgArticle"
                      src={`${URL}/${e.article_url}`}
                      alt="jardin"
                    />
                    <div className="text">{e.article_title}</div>
                  </div>
                </Link>
              </div>
            );
          })}
        {!showFavoriteList && (
          <>
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
                      <div key={e.id} className="articlesRow" favorite={false}>
                        <Link to={`/articles/${e.id}`}>
                          <div className="articlesInfos">
                            <img
                              className="imgArticle"
                              src={`${URL}/${e.article_url}`}
                              alt="jardin"
                            />
                            <div className="text">{e.title}</div>
                          </div>
                        </Link>
                      </div>
                    );
                  })
              : articles.map((e) => {
                  return (
                    <div key={e.id} className="articlesRow">
                      <Link
                        className="Link-to-articleDetails"
                        to={`/articles/${e.id}`}
                      >
                        <div className="articlesInfos">
                          <div
                            className="likeButton"
                            // onClick={(e) => {
                            //   handleFavorite(e.id);
                            // }}
                            // onKeyPress={(e) => {
                            //   handleFavorite(e.id);
                            // }}
                            // role="button"
                            // tabIndex={0}
                          />
                          <img
                            className="imgArticle"
                            src={`${URL}/${e.article_url}`}
                            alt="jardin"
                          />
                          <div className="text">{e.title}</div>
                        </div>
                      </Link>
                    </div>
                  );
                })}
          </>
        )}
      </div>
    </div>
  );
};
export default Feed;
