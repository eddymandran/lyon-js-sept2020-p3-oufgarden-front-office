import React, { useEffect, useState } from 'react';
import './style/Navbar.scss';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import history from '../history';
import { getCollection } from '../services/API';

const Navbar = () => {
  const [myGardenId, setMyGardenId] = useState([]);
  useEffect(() => {
    getCollection('garden').then((elem) => {
      setMyGardenId(elem[0].id);
    });
  }, []);
  if (history.location.pathname === '/') {
    return false;
  }
  return (
    <div className="menu">
      <ul>
        <Link to="/articles">
          <div className="articles" />
        </Link>

        <Link to={`/garden/${myGardenId}/calendar`}>
          <div className="calendar" />
        </Link>

        <Link to="/garden">
          <div className="jardin" />
        </Link>
        <Link to="/user">
          <div className="user" />
        </Link>
      </ul>
    </div>
  );
};

export default withRouter(Navbar);
