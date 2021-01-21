/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import './style/Action.scss';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import { getCollection, makeEntityAdder } from '../services/API';

const Action = (props) => {
  const {
    match: {
      params: { id },
    },
  } = props;

  const { register, handleSubmit, control } = useForm();
  const [gardenAction, setgardenAction] = useState([]);
  const [gardenZone, setgardenZone] = useState([]);

  useEffect(() => {
    getCollection('actions').then((elem) => {
      setgardenAction(elem);
    });
  }, []);

  useEffect(() => {
    getCollection(`garden/${id}/zones`).then((elem) => {
      setgardenZone(elem);
      console.log(gardenZone);
    });
  }, []);

  const gardenOptions = gardenAction.map((elem) => {
    return {
      value: elem.id,
      label: `${elem.name}`,
    };
  });
  const zoneOption = gardenZone.map((elem) => {
    return {
      value: elem.id,
      label: `${elem.name}`,
    };
  });
  const onSubmit = async (data, e) => {
    const newData = {
      ...data,
      action_id: data.action.value,
      zone_id: data.zone.value,
    };

    try {
      await makeEntityAdder(`garden/${id}/zones/${data.zone.value}/actionFeed`)(
        newData
      )
        .then(() => {
          setgardenAction([]);
          setgardenZone([]);
        })
        .then(() => {
          props.history.push('/garden');
        });
    } catch (err) {
      console.log(err);
    }
    e.target.reset();
  };

  return (
    <div className="garden-list-action">
      <h3 className="actionTitle">Je viens de :</h3>
      <div key={gardenAction.id} className="action-row">
        <form className="formContainer" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="actionGarden">
            <div className="actionGarden" key={gardenAction.id}>
              <label htmlFor="selectAction">
                Selectionner votre action :
                <Controller
                  as={Select}
                  options={gardenOptions}
                  name="action"
                  isClearable
                  control={control}
                />
              </label>
              <label htmlFor="date">
                Date :
                <input
                  className="date"
                  name="date"
                  type="date"
                  placeholder="date d'action"
                  ref={register}
                />
              </label>
              <label htmlFor="time">
                Heure :
                <input
                  className="time"
                  name="time"
                  type="time"
                  placeholder="time"
                  ref={register}
                />
              </label>
              <label htmlFor="zone">
                Zone où vous avez agi
                <Controller
                  as={Select}
                  options={zoneOption}
                  name="zone"
                  isClearable
                  control={control}
                />
              </label>
              <textarea
                className="description"
                name="description"
                type="text"
                placeholder="commentaire"
                ref={register}
              />
              <input type="submit" className="sendButton" value="Creer" />
            </div>
          </label>
        </form>
      </div>
    </div>
  );
};

export default Action;
