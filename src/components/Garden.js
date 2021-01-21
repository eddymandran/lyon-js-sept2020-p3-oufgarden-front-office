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
            <p>{e.name}</p>
            <Link to={`/garden/${e.id}/action`}>
              <button type="button" className="actionButton">
                Action sur le jardin
              </button>
            </Link>
            <Link to={`/garden/${e.id}/timeslots`}>
              <button type="button" className="actionButton">
                Reserver un creneaux
              </button>
            </Link>
            <Link to={`/garden/${e.id}`}>
              <button type="button" className="infosGarden">
                Infos du jardin
              </button>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Garden;
