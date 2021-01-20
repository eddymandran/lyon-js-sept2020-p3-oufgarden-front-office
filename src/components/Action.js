/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import './style/Action.scss';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import { getCollection, makeEntityAdder } from '../services/API';

const Action = (/* props */) => {
  // eslint-disable-next-line react/destructuring-assignment
  const { handleSubmit, control } = useForm();
  const [gardenAction, setgardenAction] = useState([]);
  const [inputList, setInputList] = useState([
    {
      date: '',
      time: '',
      description: '',
    },
  ]);

  useEffect(() => {
    getCollection('action').then((elem) => {
      setgardenAction(elem);
      console.log(elem);
    });
  }, []);

  const options = gardenAction.map((elem) => {
    return {
      value: elem.id,
      label: elem.name,
    };
  });

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const deepCopyList = _.cloneDeep(inputList);
    // const list = [...inputList]; careful, this does not work for nested arrays + it's a shallow copy
    deepCopyList[index][name] = value;
    setInputList(deepCopyList);
  };

  const handleAddClick = () => {
    const deepCopyList = _.cloneDeep(inputList);
    deepCopyList.push({
      date: '',
      time: '',
      description: '',
    });
    setInputList(deepCopyList);
  };

  const onSubmit = (data, e) => {
    const newData = {
      date: data.date,
      time: data.time,
      description: data.description,
      /* zone_details:
        inputList.length === 1 &&
        inputList[0].zone_name === '' &&
        inputList[0].type === ''
          ? []
          : inputList, */
    };

    const formData = new FormData();
    // We use JSON.stringify here to send neste object in formdata
    formData.append('newData', JSON.stringify(newData));

    makeEntityAdder('action')(formData)
      // .then((elem) => {
      //   console.log(elem);
      // })
      .catch((err) => console.log(err.response.data))
      .then(() => {
        e.target.reset();
        setInputList([
          {
            date: '',
            time: '',
            description: '',
          },
        ]);
      });
    /* .then(() => props.history.push('/garden')); */
  };

  return (
    <div className="garden-list-action">
      <h3 className="actionTitle">Je viens de :</h3>
      <div key={gardenAction.id} className="action-row">
        <form className="formContainer" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="actionGarden">
            {inputList.map((x, i) => {
              return (
                // not the best solution for the key but could not find another one - do not replace with Math.random()
                <div className="actionGarden" key={inputList.id}>
                  <Controller
                    name="action"
                    control={control}
                    defaultValue=""
                    render={({ onChange, value }) => (
                      <Select
                        options={options}
                        onChange={(e) => {
                          onChange(e);
                        }}
                        value={value}
                        isMulti
                      />
                    )}
                  />

                  <input
                    className="date"
                    name="date"
                    type="date"
                    placeholder="date d'action"
                    value={x.date}
                    onChange={(e) => handleInputChange(e, i)}
                  />
                  <input
                    className="time"
                    name="heure"
                    type="time"
                    placeholder="heure"
                    value={x.time}
                    onChange={(e) => handleInputChange(e, i)}
                  />
                  <div className="inputGroup">
                    <input id="radio1" name="radio" type="radio" />
                    <label htmlFor="radio1">Yes</label>
                  </div>
                  <textarea
                    className="description"
                    name="description"
                    type="text"
                    placeholder="Description de la zone"
                    value={x.description}
                    onChange={(e) => handleInputChange(e, i)}
                  />
                  <div className="btn-box">
                    {inputList.length - 1 === i && (
                      <button
                        className="btnBox"
                        type="button"
                        onClick={handleAddClick}
                      >
                        Ajouter
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </label>
        </form>
        <button
          type="button"
          className="sendButton" /* onClick={handleCreate} */
        >
          Créer
        </button>
      </div>
    </div>
  );
};

export default Action;
