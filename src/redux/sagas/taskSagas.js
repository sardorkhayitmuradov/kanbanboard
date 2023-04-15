import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { actionTypes } from '../actions/taskActions';

const apiUrl = 'http://localhost:3000/events';

function* fetchTasks() {
  try {
    const response = yield call(axios.get, apiUrl);
    yield put({
      type: actionTypes.FETCH_TASKS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: actionTypes.FETCH_TASKS_FAILURE,
      payload: error.message,
    });
  }
}

function* createTask(action) {
  try {
    // Fetch the existing event
    const eventResponse = yield call(
      axios.get,
      `${apiUrl}/${action.payload.eventId}`
    );
    const event = eventResponse.data;
    console.log(action.payload);

    // Create a new task
    const task = {
      id: Date.now(), // You can generate a unique ID for the new task, here I'm using the current timestamp
      title: action.payload.task.title,
      description: action.payload.task.description,
    };

    // Add the new task to the appropriate category
    const updatedEvent = {
      ...event,
      [action.payload.category]: [...event[action.payload.category], task],
    };

    // Update the event on the server
    const updateResponse = yield call(
      axios.put,
      `${apiUrl}/${action.payload.eventId}`,
      updatedEvent
    );

    yield put({
      type: actionTypes.CREATE_TASK_SUCCESS,
      payload: { ...updateResponse.data },
    });
  } catch (error) {
    yield put({
      type: actionTypes.CREATE_TASK_FAILURE,
      payload: error.message,
    });
  }
}

function* deleteTask(action) {
  try {
    const { taskId, category, eventId } = action.payload;
    const eventResponse = yield call(axios.get, `${apiUrl}/${eventId}`);
    const event = eventResponse.data;

    const updatedEvent = {
      ...event,
      [category]: event[category].filter((task) => task.id !== taskId),
    };

    yield call(axios.put, `${apiUrl}/${eventId}`, updatedEvent);

    yield put({
      type: actionTypes.DELETE_TASK_SUCCESS,
      payload: { taskId, category, eventId },
    });
  } catch (error) {
    yield put({
      type: actionTypes.DELETE_TASK_FAILURE,
      payload: error.message,
    });
  }
}

function* updateTask(action) {
  try {
    const { task, category, eventId } = action.payload;
    const eventResponse = yield call(axios.get, `${apiUrl}/${eventId}`);
    const event = eventResponse.data;

    const updatedEvent = {
      ...event,
      [category]: event[category].map((t) => (t.id === task.id ? task : t)),
    };

    yield call(axios.put, `${apiUrl}/${eventId}`, updatedEvent);

    yield put({
      type: actionTypes.UPDATE_TASK_SUCCESS,
      payload: { task, category, eventId },
    });
  } catch (error) {
    yield put({
      type: actionTypes.UPDATE_TASK_FAILURE,
      payload: error.message,
    });
  }
}

export function* watchTaskActions() {
  yield takeEvery(actionTypes.FETCH_TASKS_REQUEST, fetchTasks);
  yield takeEvery(actionTypes.CREATE_TASK_REQUEST, createTask);
  yield takeEvery(actionTypes.DELETE_TASK_REQUEST, deleteTask);
  yield takeEvery(actionTypes.UPDATE_TASK_REQUEST, updateTask);
}
