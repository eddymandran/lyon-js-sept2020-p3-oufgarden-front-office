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
      {actionToFeedWithFullDate.map((action, i) => {
        return (
          // eslint-disable-next-line react/no-array-index-key
          <div key={i} className="rowsWithActionsFromZone">
            <p>
              {action.name}: {action.firstname} {action.lastname}{' '}
              {action.fullDate}
            </p>
          </div>
        );
      })}{' '}
      {actionToFeedWithFullDate.length === 0 && (
        <p>Aucune action effectuée au cours des 7 derniers jours</p>
      )}
    </div>
  );
};

export default FetchActionToZones;
