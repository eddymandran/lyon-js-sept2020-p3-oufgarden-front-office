/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useEffect, useState } from 'react';
import './style/Navbar.scss';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import history from '../history';
import { getCollection } from '../services/API';

const Navbar = (props) => {
  const [myGardenId, setMyGardenId] = useState(undefined);

  const handleGetMyCalendar = () => {
    getCollection('garden').then((elem) => {
      setMyGardenId(elem[0].id);
    });
  };
  useEffect(() => {
    if (myGardenId) {
      props.history.push(`/garden/${myGardenId}/calendar`);
    }
  }, [myGardenId]);
  if (history.location.pathname === '/') {
    return false;
  }
  return (
    <div className="menu">
      <ul>
        <Link to="/feed">
          <div className="articles" />
        </Link>
        <div className="calendar" onClick={handleGetMyCalendar} />
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
