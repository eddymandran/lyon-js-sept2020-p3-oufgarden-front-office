import React, { useEffect, useState } from 'react';
import './style/Navbar.scss';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import history from '../history';
import { getCollection } from '../services/API';

const Navbar = () => {
  const [myGarden, setMyGarden] = useState([]);
  useEffect(() => {
    getCollection('garden').then((elem) => {
      setMyGarden(elem);
    });
  }, []);
  if (history.location.pathname === '/') {
    return false;
  }
  console.log(myGarden);

  return (
    <div className="menu">
      <ul>
        <Link to="/articles">
          <div className="articles" />
        </Link>
        <Link to={`garden/${myGarden.id}/calendar`}>
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
