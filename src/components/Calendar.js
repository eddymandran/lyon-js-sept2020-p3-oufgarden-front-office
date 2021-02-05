import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import './style/Calendar.scss';
import { getEntity } from '../services/API';

const localizer = momentLocalizer(moment);

const MyCalendar = (props) => {
  /*   const [myReservations, setMyReservations] = useState([]);
   */ const [gardenReservations, setGardenReservations] = useState([]);
  const [events, setEvents] = useState([]);
  const {
    match: {
      params: { id },
    },
  } = props;
  /*  useEffect(() => {
    getEntity('reservation', id).then((data) => {
      setMyReservations(data);
    });
  }, []); */
  useEffect(() => {
    getEntity('reservation/multiple', id).then((data) => {
      setGardenReservations(data);
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
          title: `${elem.firstname} ${elem.lastname} ${elem.name}`,
          ressources: `${elem.name}`,
        };
      })
    );
  }, [gardenReservations]);
  return (
    <div className="calendar-container">
      <Calendar
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultDate={moment().toDate()}
        localizer={localizer}
        views={['month', 'day', 'agenda']}
        min={new Date(2017, 10, 0, 8, 0, 0)}
        max={new Date(2017, 10, 0, 22, 0, 0)}
      />
    </div>
  );
};

export default MyCalendar;
