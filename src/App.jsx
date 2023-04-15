import React, { useState, useEffect } from 'react';
import EventBar from './components/EventBar';
import TaskBox from './components/TaskBox';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEventsRequest } from './redux/actions/taskActions';
import './App.css';
import './components/event.css';
import './components/task.css';

function App() {
  const dispatch = useDispatch()
  const events = useSelector((state) => state.events.events);
  const [currentEvent, setCurrentEvent] = useState(null);

  useEffect(() => {
    dispatch(fetchEventsRequest());
  }, [dispatch]);

  useEffect(() => {
    if (events.length > 0) {
      setCurrentEvent(events[0]);
    }
  }, [events]);

  return (
    <div className='App'>
      <EventBar
        events={events}
        currentEvent={currentEvent}
        setCurrentEvent={setCurrentEvent}
      />
      {currentEvent && (
        <TaskBox
          events={events}
          currentEvent={currentEvent}
          setCurrentEvent={setCurrentEvent}
        />
      )}
    </div>
  );
}

export default App;

// const initEvent = useMemo(() => [
  //   {
  //     title: 'Event',
  //     ['To do']: [],
  //     ['In progress']: [],
  //     ['Completed']: [],
  //   },
  // ], []);

  // const [events, setEvents] = useState(() => {
  //   return localStorage.getItem('events')
  //     ? JSON.parse(localStorage.getItem('events'))
  //     : initEvent;
  // });

  // const [currentEvent, setCurrentEvent] = useState(events[0]);

  // const updateEvents = useCallback(async () => {
  //   try {
  //     if (!events.length) {
  //       await localStorage.setItem('events', JSON.stringify(initEvent));
  //       setEvents(JSON.parse(localStorage.getItem('events')));
  //     } else {
  //       await localStorage.setItem('events', JSON.stringify(events));
  //     }
  //   } catch (e) {
  //     console.error('Failed to modify events!');
  //   }
  // }, [events]);

  // // Set localStorage
  // useEffect(() => {
  //   updateEvents();
  // }, [events]);
