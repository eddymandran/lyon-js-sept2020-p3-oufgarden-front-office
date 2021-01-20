import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Select from 'react-select';

import { getCollection, makeEntityAdder } from '../services/API';
import './style/TimeSlots.scss';

const TimeSlot = () => {
  const { register, handleSubmit } = useForm();
  const [timeSelection, setTimeSelection] = useState('');
  const [timeSelectionChoice, setTimeSelectionChoice] = useState([]);
  /*  const {
    params: {
      match: { id },
    },
  } = props; */

  useEffect(() => {
    getCollection('timeSlots').then((data) => {
      setTimeSelection(data);
    });
  }, []);
  let options = [];
  try {
    options = timeSelection.map((e) => {
      return {
        value: e.id,
        label: `${e.start_time} - ${e.end_time}`,
      };
    });
  } catch (err) {
    console.log(err);
  }
  // Waiting for the API routes to be build
  const onSubmit = async (data) => {
    const newData = {
      time_slot_id: timeSelectionChoice.value,
      /* garden_id: id, */
      // a cabler une fois les routes OK
      ...data,
    };
    console.log(newData);

    await makeEntityAdder('reservation')(newData);
    setTimeSelectionChoice([]);
  };
  // Waiting for the API routes to be build

  const handleChange = (e) => {
    if (!e) {
      setTimeSelectionChoice([]);
    } else {
      setTimeSelectionChoice(e);
    }
  };

  return (
    <div className="timeSlotsContainer">
      <h3>Merci de réserver votre créneaux parmis les horaires disponibles</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="inputTimeSlots">
          <label htmlFor="Date">
            <input type="date" name="reservation_date" ref={register} />
          </label>
        </div>
        <Select
          className="selectTimeSlots"
          options={options}
          onChange={(e) => handleChange(e)}
        />
        <button type="submit">Réserver !</button>
      </form>
    </div>
  );
};

export default TimeSlot;
