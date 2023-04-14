import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { actionTypes } from '../actions/taskActions';

const apiUrl = 'http://localhost:5000/tasks';

function* fetchTasks() {
    try {
        const response = yield call(axios.get, apiUrl);
        yield put({ type: actionTypes.FETCH_TASKS_SUCCESS, payload: response.data });
    } catch (error) {
        yield put({ type: actionTypes.FETCH_TASKS_FAILURE, payload: error.message });
    }
}

function* createTask(action) {
    try {
        const response = yield call(axios.post, apiUrl, action.payload);
        yield put({ type: actionTypes.CREATE_TASK_SUCCESS, payload: response.data });
    } catch (error) {
        yield put({ type: actionTypes.CREATE_TASK_FAILURE, payload: error.message });
    }
}

function* deleteTask(action) {
    try {
        yield call(axios.delete, `${apiUrl}/${action.payload}`);
        yield put({ type: actionTypes.DELETE_TASK_SUCCESS, payload: action.payload });
    } catch (error) {
        yield put({ type: actionTypes.DELETE_TASK_FAILURE, payload: error.message });
    }
}

export function* watchTaskActions() {
    yield takeEvery(actionTypes.FETCH_TASKS_REQUEST, fetchTasks);
    yield takeEvery(actionTypes.CREATE_TASK_REQUEST, createTask);
    yield takeEvery(actionTypes.DELETE_TASK_REQUEST, deleteTask);
}