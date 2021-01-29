/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import { MdKeyboardBackspace } from 'react-icons/md';
import { IconContext } from 'react-icons';
import Select from 'react-select';
import dayjs from 'dayjs';

import { getCollection, makeEntityUpdater } from '../services/API';

import './style/UserEdition.scss';

import AvatarEdition from './AvatarEdition';

// const URL = process.env.REACT_APP_API_BASE_URL;
const passwordRegex = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);

const UserEdition = (props) => {
  const [userToEdit, setUserToEdit] = useState(undefined);

  const [data, setData] = useState({
    id: undefined,
    gender_marker: undefined,
    lastname: undefined,
    firstname: undefined,
    birthdate: undefined,
    membership_start: undefined,
    email: undefined,
    emailConfirmation: undefined,
    phone: undefined,
    password: undefined, // not using the crypted password, but can send a new one
    passwordConfirmation: undefined,
  });

  const { addToast } = useToasts();

  // getting the initial values for a user
  useEffect(() => {
    getCollection('currentUser').then((userData) => {
      setUserToEdit(() => ({
        ...userData,
        birthdate: dayjs(userData.birthdate).format('YYYY-MM-DD'),
        membership_start: dayjs(userData.membership_start).format('YYYY-MM-DD'),
        user_creation: dayjs(userData.user_creation).format('YYYY-MM-DD'),
      }));
    });
  }, []);

  useEffect(() => {
    if (userToEdit) {
      setData((prevState) => ({
        ...prevState,
        id: userToEdit.id,
        gender_marker: userToEdit.gender_marker,
        lastname: userToEdit.lastname,
        firstname: userToEdit.firstname,
        birthdate: dayjs(userToEdit.birthdate).format('YYYY-MM-DD'),

        email: userToEdit.email,
        emailConfirmation: userToEdit.emailConfirmation,
        phone: userToEdit.phone,
      }));
    }
  }, [userToEdit]);

  const onSubmit = async (e) => {
    e.preventDefault();
    // data is updated to add the array with garden ids, before submit

    // here add data validation
    const newData = { ...data };

    if (newData.password === '') {
      delete newData.password;
      delete newData.passwordConfirmation;
    }

    if (newData.password !== newData.passwordConfirmation) {
      addToast('Le mot de passe doit être identique à la confirmation', {
        appearance: 'error',
        autoDismiss: true,
      });
      return;
    }

    const formData = new FormData();
    formData.append('data', JSON.stringify(newData));

    try {
      await makeEntityUpdater('users')(userToEdit.id, formData)
        .then(() => {
          setUserToEdit([]);
        })
        .then(() => {
          props.history.push('/user');
        });
      addToast('Profil mis à jour avec succès', {
        appearance: 'success',
        autoDismiss: true,
      });
    } catch (err) {
      addToast('Erreur lors de la mise à jour', {
        appearance: 'error',
        autoDismiss: true,
      });
    }
  };

  const handleBack = () => {
    props.history.push(`/user`);
  };

  return (
    <div>
      <div className="user-edition-container">
        <div className="title">
          <IconContext.Provider value={{ className: 'react-icons' }}>
            <MdKeyboardBackspace
              size={30}
              style={{ cursor: 'pointer' }}
              onClick={() => {
                handleBack();
              }}
            />
          </IconContext.Provider>
          <h3>Edition d'un membre</h3>
        </div>

        {userToEdit && <AvatarEdition id={userToEdit.id} />}

        {userToEdit && data && (
          <form className="main-form" onSubmit={onSubmit}>
            <p className="alert">
              Attention, à l'exception du mot de passe, l'envoi d'un champ vide
              efface les données existantes dans la base de données
            </p>

            <div className="styling-inputs">
              <label htmlFor="gender_marker">
                Civilité
                <select
                  required
                  className="select-gender"
                  name="gender_marker"
                  value={data.gender_marker}
                  onChange={(e) =>
                    setData((prevState) => ({
                      ...prevState,
                      gender_marker: e.target.value,
                    }))
                  }
                >
                  <option value="madame">Mme</option>
                  <option value="monsieur">M.</option>
                  <option value="inconnu">Non précisé</option>
                </select>
              </label>
            </div>

            <div className="styling-inputs">
              <label htmlFor="lastname">
                Nom
                <input
                  required
                  type="text"
                  name="lastname"
                  value={data.lastname}
                  onChange={(e) =>
                    setData((prevState) => ({
                      ...prevState,
                      lastname: e.target.value,
                    }))
                  }
                />
              </label>
            </div>

            <div className="styling-inputs">
              <label htmlFor="firstname">
                Prénom
                <input
                  required
                  type="text"
                  name="firstname"
                  value={data.firstname}
                  onChange={(e) =>
                    setData((prevState) => ({
                      ...prevState,
                      firstname: e.target.value,
                    }))
                  }
                />
              </label>
            </div>

            <div className="styling-inputs">
              <label htmlFor="birthdate">
                Date de naissance
                <input
                  type="date"
                  name="birthdate"
                  value={data.birthdate}
                  onChange={(e) =>
                    setData((prevState) => ({
                      ...prevState,
                      birthdate: e.target.value,
                    }))
                  }
                />
              </label>
            </div>

            <div className="styling-inputs">
              <label htmlFor="email">
                E-mail
                <input
                  required
                  id="email"
                  name="email"
                  type="email"
                  placeholder="example@mail.com"
                  value={data.email}
                  onChange={(e) =>
                    setData((prevState) => ({
                      ...prevState,
                      email: e.target.value,
                    }))
                  }
                />
              </label>
            </div>
            <div className="styling-inputs">
              <label htmlFor="phone">
                Téléphone
                <input
                  type="text"
                  name="phone"
                  value={data.phone}
                  onChange={(e) =>
                    setData((prevState) => ({
                      ...prevState,
                      phone: e.target.value,
                    }))
                  }
                />
              </label>
            </div>

            <div className="styling-inputs">
              <label htmlFor="password">
                Nouveau mot de passe
                <input
                  type="password"
                  name="password"
                  placeholder="******"
                  value={data.password}
                  onChange={(e) =>
                    setData((prevState) => ({
                      ...prevState,
                      password: e.target.value,
                    }))
                  }
                />
              </label>
              {data.password && !passwordRegex.test(data.password) && (
                <p>
                  Le mot de passe doit faire au moins 8 caractères et contenir
                  au moins une lettre et un chiffre
                </p>
              )}
            </div>
            <div className="styling-inputs">
              <label htmlFor="passwordConfirmation">
                Confirmation du nouveau mot de passe
                <input
                  style={{
                    boxShadow:
                      data.password !== data.passwordConfirmation
                        ? '2px 2px 2px red'
                        : '',
                  }}
                  id="passwordConfirmation"
                  name="passwordConfirmation"
                  type="password"
                  placeholder="******"
                  value={data.passwordConfirmation}
                  onChange={(e) =>
                    setData((prevState) => ({
                      ...prevState,
                      passwordConfirmation: e.target.value,
                    }))
                  }
                />
              </label>
            </div>

            <div className="submitFormBtn">
              <input type="submit" value="Mettre à jour" />
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
export default UserEdition;
