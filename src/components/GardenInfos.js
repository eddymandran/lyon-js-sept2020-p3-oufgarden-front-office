import React, { useEffect, useState } from 'react';
import './style/GardenInfos.scss';
import { Link } from 'react-router-dom';
/* import jardinAction from '../images/jardin-active.png'; */

import { getEntity, getCollection } from '../services/API';

const GardenInfos = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  const { id } = props.match.params;
  const [gardenInfos, setGardenInfos] = useState([]);
  const [actionList, setActionList] = useState([]);
  /*   const [gardenActionFeed, setgardenActionFeed] = useState([]); */

  useEffect(() => {
    getEntity('garden', id).then((elem) => {
      setGardenInfos(elem);
      console.log(elem);
    });
  }, []);

  useEffect(() => {
    getCollection('actions').then((elem) => {
      setActionList(elem);
      console.log(elem);
    });
  }, []);

  /*   useEffect(() => {
    getCollection(`garden/${id}/actionFeed`).then((elem) => {
      setgardenActionFeed(elem);
      console.log(gardenActionFeed);
    });
  }, []); */

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
              <div key={e.id} className={`action${e.id}`}>
                <Link to={`/garden/${gardenInfos.id}/action/${e.id}`}>
                  <div className="logoAction" type="image" alt="action" />
                </Link>
              </div>
            );
          })}
        </div>
        {/* {gardenActionFeed.map((e) => {
          return (
            <div key={e.id} className="gardenActionRow">
              <div className="gardenActionInfos">
                <p className="gardenNameAction" alt="jardin">
                  {e.name}
                </p>
              </div>
            </div>
          );
        })} */}
      </div>
    </div>
  );
};
export default GardenInfos;
