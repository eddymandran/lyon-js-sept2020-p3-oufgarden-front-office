import React, { createContext, useState, useEffect } from 'react';
import { getCollection } from '../../services/API';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [gardenInfos, setGardenInfos] = useState([]);

  useEffect(() => {
    getCollection('garden').then((data) => {
      setGardenInfos(data);
    });
  }, []);
  return (
    <UserContext.Provider value={{ gardenInfos }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
