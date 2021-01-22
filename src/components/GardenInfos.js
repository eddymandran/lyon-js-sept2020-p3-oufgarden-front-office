import React, { useEffect, useState } from 'react';
import './style/GardenInfos.scss';
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
    <div className="garden-list-container">
      <div key={gardenInfos.id} className="garden-row">
        <p>{gardenInfos.name}</p>
        <p>{gardenInfos.descrption}</p>
        <p>{gardenInfos.exposition}</p>
        <p>{gardenInfos.address}</p>
        <img className="imgGarden" src={gardenInfos.url} alt="jardin" />
      </div>
    </div>
  );
};
export default GardenInfos;
