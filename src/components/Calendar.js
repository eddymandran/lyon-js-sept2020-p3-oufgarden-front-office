import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import './style/Calendar.scss';
import { getEntity } from '../services/API';

const localizer = momentLocalizer(moment);

const MyCalendar = (props) => {
  const [gardenReservations, setGardenReservations] = useState([]);
  const [garden, setGarden] = useState([]);
  const [events, setEvents] = useState([]);
  const {
    match: {
      params: { id },
    },
  } = props;

  useEffect(() => {
    getEntity('reservation/multiple', id).then((data) => {
      setGardenReservations(data);
    });
  }, []);
  useEffect(() => {
    getEntity('garden', id).then((data) => {
      setGarden(data);
    });
  }, []);

  useEffect(() => {
    setEvents(
      gardenReservations.map((elem) => {
        return {
          ...elem,
          start: moment(
            `${elem.date.split('T')[0]} ${elem.start_time}`,
            'YYYY-MM-DD hh:mm:ss'
          )
            .add(1, 'days')
            .toDate(),
          end: moment(
            `${elem.date.split('T')[0]} ${elem.end_time}`,
            'YYYY-MM-DD hh:mm:ss'
          )
            .add(1, 'days')
            .toDate(),
          title: `${elem.firstname} ${elem.lastname}  ${elem.start_time} - ${elem.end_time}`,
        };
      })
    );

  }, [gardenReservations]);

  return (
    <>
      {garden && (
        <div className="garden-title-calendar">
          <h1>{garden.name}</h1>
        </div>
      )}
      <div className="calendar-container">
        <Calendar
          events={events}
          startAccessor="start"
          endAccessor="end"
          // eslint-disable-next-line react/jsx-boolean-value
          popup={true}
          defaultDate={moment().toDate()}
          localizer={localizer}
          views={['month', 'day', 'agenda']}
          min={new Date(2017, 10, 0, 8, 0, 0)}
          max={new Date(2017, 10, 0, 22, 0, 0)}
        />
      </div>
    </>
  );
};

export default MyCalendar;
