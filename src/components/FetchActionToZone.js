import React, { useEffect, useState } from 'react';
import { getCollection } from '../services/API';

const FetchActionToZones = ({ gardenId, gardenZone }) => {
  const [actionToFeed, setActionToFeed] = useState([]);
  useEffect(() => {
    if (gardenZone.length > 0) {
      gardenZone.map((elem) => {
        return getCollection(
          `garden/${gardenId}/zones/${elem.id}/actionFeed`
        ).then((data) => {
          setActionToFeed((prevState) => [...prevState, data]);
        });
      });
    }
  }, [gardenZone]);

  console.log(actionToFeed);
  console.log(gardenZone);
  return (
    <div>
      <p>TEST</p>
    </div>
  );
};

export default FetchActionToZones;
