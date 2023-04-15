import { all } from 'redux-saga/effects';
import { watchTaskActions } from './taskSagas';
import { watchEventActions } from './eventSagas';

export default function* rootSaga() {
    yield all([watchTaskActions(), watchEventActions()]);
}