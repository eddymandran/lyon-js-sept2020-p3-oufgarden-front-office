import React, { useEffect, useState } from 'react';
import { getCollection } from '../services/API';

const FetchActionToZones = ({ gardenId, gardenZone }) => {
  const [actionToFeed, setActionToFeed] = useState([]);

  useEffect(() => {
    getCollection(`garden/${gardenId}/zones/${gardenZone}/actionFeed`).then(
      (data) => {
        setActionToFeed(data);
      }
    );
  }, []);
  console.log(actionToFeed);
  return (
    <div>
      {actionToFeed.map((action) => {
        return (
          <div className="rowsWithActionsFromZone">
            <p>{action.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default FetchActionToZones;
