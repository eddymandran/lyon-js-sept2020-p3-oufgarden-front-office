import React, { useEffect, useState } from 'react';

import { getCollection } from '../services/API';

const FetchActionToZones = ({ gardenId, gardenZone }) => {
  const [actionToFeed, setActionToFeed] = useState([]);
  const [actionToFeedWithFullDate, setActionToFeedWithFullDate] = useState([]);

  useEffect(() => {
    getCollection(`garden/${gardenId}/zones/${gardenZone}/actionFeed`).then(
      (data) => {
        setActionToFeed(data);
      }
    );
  }, []);
  useEffect(() => {
    if (actionToFeed.length > 0) {
      setActionToFeedWithFullDate(
        actionToFeed.map((elem) => {
          return {
            ...elem,
            fullDate: `${elem.date.split('T')[0]} ${elem.time}`,
          };
        })
      );
    }
  }, [actionToFeed]);

  return (
    <div>
      {actionToFeedWithFullDate.map((action) => {
        return (
          <div className="rowsWithActionsFromZone">
            <p>
              {action.name}: {action.firstname} {action.lastname}{' '}
              {action.fullDate}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default FetchActionToZones;
