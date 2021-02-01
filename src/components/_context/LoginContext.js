import React, { useEffect, createContext } from 'react';
import useLocalStorage from 'use-local-storage';

import { getCollection } from '../../services/API';

export const LoginContext = createContext();

export const LoginProvider = (props) => {
  const [isLogged, setIsLogged] = useLocalStorage('isLogged', false);
  const { children } = props;

  useEffect(() => {
    setIsLogged(false);
    getCollection('currentUser').then(() => {
      setIsLogged(true);
    });
  }, []);
  return (
    <LoginContext.Provider value={{ isLogged, setIsLogged }}>
      {children}
    </LoginContext.Provider>
  );
};
