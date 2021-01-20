/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import './style/Action.scss';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import { getCollection, makeEntityAdder } from '../services/API';

const Action = (props) => {
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
    getCollection('actions').then((elem) => {
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

  /*   const onSubmit = async (data) => {
    const newData = {
      date: data.date,
      time: data.time,
      description: data.description,
      ...data,
    };
    console.log(newData);
    await makeEntityAdder('action')(newData);
    setInputList([]);
  }; 
 */
  const onSubmit = (data, e) => {
    const newData = {
      date: data.date,
      time: data.time,
      description: data.description,
    };
    console.log(data);

    makeEntityAdder('action')(newData)
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
      })
      .then(() => props.history.push('/garden'));
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
                    name="time"
                    type="time"
                    placeholder="time"
                    value={x.time}
                    onChange={(e) => handleInputChange(e, i)}
                  />
                  <div className="inputGroup">
                    <input id="radio1" name="radio" type="radio" />
                    <label htmlFor="radio1" />
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
          <button
            type="button"
            className="sendButton" /* onClick={handleCreate} */
          >
            Créer
          </button>
        </form>
      </div>
    </div>
  );
};

export default Action;
