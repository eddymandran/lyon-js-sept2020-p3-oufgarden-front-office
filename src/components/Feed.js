import React, { useState, useEffect /* useContext  */ } from 'react';
import { Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import { getCollection } from '../services/API';
import './style/Feed.scss';

/* import { UserContext } from './Contexts/UserContextProvider'; */

const Feed = () => {
  /*  const { userDetails } = useContext(UserContext); */

  const [articles, setArticles] = useState([]);
  const [articlesFiltered, setArticlesFiltered] = useState([]);
  const [tagList, setTagList] = useState([]);
  const [allTags, setAllTags] = useState([]);

  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    getCollection('articles').then((elem) => {
      setArticles(elem);
      console.log(elem);
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

  const handleFavorite = () => {
    setFavorite(!favorite);
  };

  return (
    <div className="containerFeed">
      <input className="searchBar" />
      {/* <button type="button" className="buttonPres">
        Like
      </button> */}
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
                  <div key={e.id} className="articlesRow">
                    <div className="articlesInfos">
                      <img className="imgArticle" src={e.url} alt="jardin" />
                      <div className="text">{ReactHtmlParser(e.title)}</div>
                    </div>
                  </div>
                );
              })
          : articles.map((e) => {
              return (
                <div key={e.id} className="articlesRow">
                  <div className="articlesInfos">
                    <Link to={`/articles/${e.id}`}>
                      <div
                        className="likeButton"
                        onClick={() => {
                          handleFavorite();
                        }}
                        onKeyPress={() => {
                          handleFavorite();
                        }}
                        role="button"
                        tabIndex={0}
                      >
                        ♥
                      </div>
                      <img className="imgArticle" src={e.url} alt="jardin" />
                      <div className="text">{ReactHtmlParser(e.title)}</div>
                    </Link>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
};
export default Feed;
