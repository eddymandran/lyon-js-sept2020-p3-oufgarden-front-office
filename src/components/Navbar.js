/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useContext, useEffect, useState } from 'react';
import './style/Navbar.scss';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import history from '../history';
import { getCollection } from '../services/API';
import { LoginContext } from './_context/LoginContext';

const URL = process.env.REACT_APP_API_BASE_URL;

const Navbar = (props) => {
  const [myGardenId, setMyGardenId] = useState(undefined);
  const { userDetails } = useContext(LoginContext);
  const handleGetMyCalendar = () => {
    getCollection('garden').then((elem) => {
      setMyGardenId(elem[0].id);
    });
  };
  useEffect(() => {
    if (myGardenId) {
      props.history.push(`/garden/${myGardenId}/calendar`);
      setMyGardenId(undefined);
    }
  }, [myGardenId]);
  if (history.location.pathname === '/') {
    return false;
  }

  console.log(userDetails.picture_url);

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
          <div className="user">
            <img alt="myuser" src={`${URL}/${userDetails.picture_url}`} />
          </div>
        </Link>
      </ul>
    </div>
  );
};

export default withRouter(Navbar);
