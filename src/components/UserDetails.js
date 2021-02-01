/* eslint-disable no-nested-ternary */

import React, { useEffect, useState } from 'react';
import { MdEmail, MdAccountCircle } from 'react-icons/md';
import {
  FaBirthdayCake,
  FaPhone,
  FaRegCalendarAlt,
  FaLeaf,
} from 'react-icons/fa';
import { IconContext } from 'react-icons';
import { useToasts } from 'react-toast-notifications';

import dayjs from 'dayjs';
import API, { getCollection } from '../services/API';
import history from '../history';
import './style/UserDetails.scss';

const today = dayjs();

const URL = process.env.REACT_APP_API_BASE_URL;

const MemberDetail = (props) => {
  const [userDetails, setUserDetails] = useState();
  const [gardenList, setGardenList] = useState([]);
  const [gardenArray, setGardenArray] = useState([]);

  useEffect(() => {
    getCollection('currentUser').then((data) => {
      setUserDetails(() => ({
        ...data,
        birthdate: dayjs(data.birthdate).format('YYYY-MM-DD'),
        membership_start: dayjs(data.membership_start).format('YYYY-MM-DD'),
        user_creation: dayjs(data.user_creation).format('YYYY-MM-DD'),
      }));
      setGardenArray(() =>
        data.garden_id_concat
          ? data.garden_id_concat.split(',').map((gardenId) => +gardenId)
          : []
      );
    });
  }, []);

  useEffect(() => {
    getCollection('garden').then((data) => setGardenList(data));
  }, []);

  const { addToast } = useToasts();
  const logout = async () => {
    try {
      await API.get('/login');
      addToast('Déconnecté avec succès !', {
        appearance: 'success',
        autoDismiss: true,
      });
      history.push('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {userDetails && (
        <div className="member-detail-container">
          <IconContext.Provider value={{ className: 'react-icons' }}>
            <div className="top-section">
              <div className="user-avatar-container">
                <img
                  className="user-avatar"
                  alt="utilisateur"
                  src={`${URL}/${userDetails.picture_url}`}
                />
              </div>
              <h2 className="name">
                {userDetails.firstname} {userDetails.lastname}
              </h2>
              <div className="is-admin">
                {userDetails.is_admin === 1 ? 'Admin' : ''}
              </div>
              <div
                className="edit-button"
                onClick={() => props.history.push('/user/edition')}
              >
                Mettre à jour
              </div>
            </div>

            <div className="user-infos">
              <div className="contact">
                <h3>
                  <MdAccountCircle size={25} style={{ marginRight: '5px' }} />
                  Informations personnelles
                </h3>
                <p className="vertical-align">
                  <MdEmail size={18} style={{ marginRight: '5px' }} />
                  {userDetails.email}
                </p>
                <p className="vertical-align">
                  <FaPhone size={18} style={{ marginRight: '5px' }} />
                  {userDetails.phone}
                </p>
                <p className="vertical-align">
                  <FaBirthdayCake size={18} style={{ marginRight: '5px' }} />
                  {dayjs(userDetails.birthdate).format('DD/MM/YYYY')}
                </p>
              </div>

              <div className="garden-infos">
                <h3>
                  <FaLeaf size={25} style={{ marginRight: '5px' }} />
                  Jardins associés
                </h3>
                {gardenArray.length > 0 ? (
                  gardenList
                    .filter((garden) => gardenArray.includes(garden.id))
                    .map((garden) => <p>{garden.name}</p>)
                ) : (
                  <p>Aucun jardin associé actuellement</p>
                )}
              </div>
              <div className="membership-infos">
                <h3>
                  <FaRegCalendarAlt size={25} style={{ marginRight: '5px' }} />
                  Adhésion
                </h3>
                <p>
                  <span className="emph">Adhérent.e depuis le </span>{' '}
                  {dayjs(userDetails.membership_start).format('DD/MM/YYYY')}
                </p>
                <p>
                  <span className="emph">Adhésion à renouveler dans </span>
                  <span
                    className={
                      dayjs(userDetails.membership_start)
                        .add(1, 'year')
                        .diff(today, 'days') < 30
                        ? 'alert'
                        : 'ok'
                    }
                  >
                    {' '}
                    {dayjs(userDetails.membership_start)
                      .add(1, 'year')
                      .diff(today, 'days')}{' '}
                    jours
                  </span>
                </p>
              </div>
            </div>
            <div className="deconexion-button" onClick={logout}>
              Déconnexion
            </div>
          </IconContext.Provider>
        </div>
      )}
    </>
  );
};
export default MemberDetail;
