import { all } from 'redux-saga/effects';
import { watchTaskActions } from './taskSagas';

export default function* rootSaga() {
    yield all([
        watchTaskActions()
    ]);
}