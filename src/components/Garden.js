import React, { useEffect, useState } from 'react';
import './style/Garden.scss';
import { Link } from 'react-router-dom';
import { getCollection } from '../services/API';

const Garden = () => {
  const [gardenList, setGardenList] = useState([]);

  useEffect(() => {
    getCollection('garden').then((elem) => {
      setGardenList(elem);
    });
  }, []);

  return (
    <div className="garden-list-container">
      {gardenList.map((e) => {
        return (
          <div key={e.id} className="garden-row">
            <div className="garden-infos">
              <p>{e.name}</p>
              <Link to={`/garden/${e.id}/action`}>
                <button type="button" className="action">
                  Action sur le jardin
                </button>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Garden;
