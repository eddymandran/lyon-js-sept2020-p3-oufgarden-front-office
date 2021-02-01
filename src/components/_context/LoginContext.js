import React, { useEffect, createContext, useState } from 'react';
import useLocalStorage from 'use-local-storage';

import { getCollection } from '../../services/API';

export const LoginContext = createContext();

export const LoginProvider = (props) => {
  const [isLogged, setIsLogged] = useLocalStorage('isLogged', false);
  const [userDetails, setUserDetails] = useState([]);
  const { children } = props;

  useEffect(() => {
    setIsLogged(false);
    getCollection('currentUser').then((infos) => {
      setIsLogged(true);
      setUserDetails(infos);
    });
  }, []);
  return (
    <LoginContext.Provider value={{ isLogged, setIsLogged, userDetails }}>
      {children}
    </LoginContext.Provider>
  );
};
