import React, { useEffect, useState, useContext } from 'react';
import './style/GardenInfos.scss';
import { Link } from 'react-router-dom';
import { UserContext } from './Contexts/UserContextProvider';

import { getCollection } from '../services/API';

const GardenInfos = (props) => {
  const {
    match: {
      params: { id },
    },
  } = props;

  const [actionList, setActionList] = useState([]);
  const { gardenInfos } = useContext(UserContext);
  useEffect(() => {
    getCollection('actions').then((elem) => {
      setActionList(elem);
    });
  }, []);

  return (
    <div className="garden-list-container-infos">
      <div key={gardenInfos.id} className="garden-row-infos">
        <div className="whitebar-infos">
          <div className="back-home-infos">
            <Link className="link-back-feed-garden" to="/garden">
              <div className="back-arrow-infos" />
              <div className="retour-infos">Retour</div>
            </Link>
          </div>
        </div>
        <img
          className="imgGarden-infos"
          src={gardenInfos.picture}
          alt="jardin"
        />
        <div className="detailsGarden">
          <h3>{gardenInfos.name}</h3>
          <p>{gardenInfos.description}</p>
          <p>Exposition : {gardenInfos.exposition}</p>
          <p>Adresse : {gardenInfos.address_id}</p>
        </div>
        <div className="gardenAction">
          {actionList.map((e) => {
            return (
              <Link
                to={`/garden/${id}/action/${e.id}`}
                className={`action${e.id}`}
              >
                <div
                  key={e.id}
                  type="image"
                  alt="action"
                  contentEditable="false"
                  data-placeholder={e.name}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default GardenInfos;
