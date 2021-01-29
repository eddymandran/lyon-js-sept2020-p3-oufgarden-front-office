/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import './style/Action.scss';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import { getCollection, getEntity, makeEntityAdder } from '../services/API';

const Action = (props) => {
  const { register, handleSubmit, control } = useForm();
  const [gardenAction, setGardenAction] = useState([]);
  const [gardenZone, setGardenZone] = useState([]);
  const [gardenInfos, setGardenInfos] = useState([]);
  const [actionName, setActionName] = useState([]);
  const {
    match: {
      params: { id },
    },
  } = props;
  const {
    match: {
      params: { gardenId },
    },
  } = props;
  useEffect(() => {
    getEntity('garden', gardenId).then((data) => {
      setGardenInfos(data);
    });
  }, []);

  useEffect(() => {
    if (gardenInfos) {
      getCollection(`garden/${gardenId}/zones`).then((elem) => {
        setGardenZone(elem);
      });
    }
  }, [gardenInfos]);

  useEffect(() => {
    getCollection('actions').then((elem) => {
      setGardenAction(elem);
    });
  }, []);

  useEffect(() => {
    setActionName(gardenAction.filter((action) => action.id === +id));
  }, [gardenAction]);

  const zoneOption = gardenZone.map((elem) => {
    return {
      value: elem.id,
      label: `${elem.name}`,
    };
  });
  const onSubmit = async (data, e) => {
    const newData = {
      ...data,
      action_id: id,
      zone_id: data.zone.value,
    };

    try {
      await makeEntityAdder(
        `garden/${gardenId}/zones/${data.zone.value}/actionFeed`
      )(newData)
        .then(() => {
          setGardenAction([]);
          setGardenZone([]);
        })
        .then(() => {
          props.history.push(`/garden/${gardenId}`);
        });
    } catch (err) {
      console.log(err);
    }
    e.target.reset();
  };

  return (
    <>
      {actionName.length > 0 && (
        <div className="garden-list-action">
          <h3 className="actionTitle">Action: {actionName[0].name}</h3>
          <div key={gardenAction.id} className="action-row">
            <form className="formContainer" onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="actionGarden">
                <div className="actionGarden" key={gardenAction.id}>
                  <label htmlFor="selectAction">
                    <input
                      id="arroser"
                      name="arroser"
                      type="hidden"
                      value={gardenAction.id}
                    />
                  </label>
                  <label htmlFor="date">
                    Date :
                    <input
                      className="date"
                      name="date"
                      type="date"
                      placeholder="date d'action"
                      ref={register({ required: true })}
                    />
                  </label>
                  <label htmlFor="time">
                    Heure :
                    <input
                      className="time"
                      name="time"
                      type="time"
                      placeholder="time"
                      ref={register({ required: true })}
                    />
                  </label>
                  <label className="labelZone" htmlFor="zone">
                    Zone où vous avez agi
                    <Controller
                      as={Select}
                      options={zoneOption}
                      name="zone"
                      isClearable
                      control={control}
                      rules={{ required: true }}
                    />
                  </label>
                  <textarea
                    className="description"
                    name="description"
                    type="text"
                    placeholder="commentaire"
                    ref={register}
                  />
                  <input
                    type="submit"
                    className="sendButton"
                    value="Enregistrer"
                  />
                </div>
              </label>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Action;
