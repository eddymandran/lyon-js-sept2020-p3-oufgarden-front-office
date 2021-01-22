import React, { useEffect, useState } from 'react';
import './style/GardenInfos.scss';
import { Link } from 'react-router-dom';
import { getEntity } from '../services/API';

const GardenInfos = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  const { id } = props.match.params;
  const [gardenInfos, setGardenInfos] = useState([]);

  useEffect(() => {
    getEntity('garden', id).then((elem) => {
      setGardenInfos(elem);
      console.log(elem);
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
        <img className="imgGarden" src={gardenInfos.picture} alt="jardin" />
        <div className="detailsGarden">
          <h3>{gardenInfos.name}</h3>
          <p>{gardenInfos.description}</p>
          <p>Exposition : {gardenInfos.exposition}</p>
          <p>Adresse : {gardenInfos.address}</p>
        </div>
      </div>
    </div>
  );
};
export default GardenInfos;
