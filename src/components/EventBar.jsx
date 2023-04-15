import React, { useCallback, useEffect } from 'react';
import AddEventButton from './AddEventButton';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEventsRequest, createEventRequest } from '../redux/actions/taskActions';

const EventBar = ({ currentEvent, setCurrentEvent, events }) => {

  const dispatch = useDispatch();
  // const events = useSelector((state) => state.events.events);

  useEffect(() => {
    dispatch(fetchEventsRequest());
  }, [dispatch]);

  const handleAdd = useCallback(() => {
    // ...
    const title = prompt('Enter the Title:').trim();
    if (!title) {
      return;
    }

    const foundEvent = events?.some((event) => event.title.toLowerCase() === title.toLowerCase());
    if (foundEvent) {
      alert('Event Already Existed');
      return;
    }

    // console.log(events, title.toLowerCase());
    dispatch(createEventRequest({ title, 'To do': [], 'In progress': [], 'Completed': [] }));
  }, [dispatch, events]);


  // const handleAdd = useCallback(() => {
  //   const title = prompt('Enter the Title:');
  //   // Prevent Duplicated
  //   if (
  //     events?.find((event) => event.title.toLowerCase() === title.toLowerCase())
  //   ) {
  //     alert('Event Already Existed');
  //     return;
  //   }
  //   // Add new event
  //   if (title)
  //     setEvents((prev) => [
  //       ...prev,
  //       {
  //         title,
  //         ['To do']: [],
  //         ['In progress']: [],
  //         ['Completed']: [],
  //       },
  //     ]);
  //     console.log(events)
  // }, [events, setEvents]);

  return (
    <div className='event-bar'>
      <h1 className='event-bar-title'>Kanban</h1>
      <AddEventButton handleClick={handleAdd} />
      <div className='event-container'>
        {events.map((item) => (
          <div
            key={item.title}
            className={`event over-hide ${currentEvent.title === item.title ? 'selected-event' : ''
              }`}
            onClick={() => setCurrentEvent(item)}
          >
            {item.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventBar;
