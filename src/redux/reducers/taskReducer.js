import { actionTypes } from '../actions/taskActions';

const initialState = {
    tasks: [],
    loading: false,
    error: null
};

const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_TASKS_REQUEST:
        case actionTypes.CREATE_TASK_REQUEST:
        case actionTypes.DELETE_TASK_REQUEST:
            return { ...state, loading: true };

        case actionTypes.FETCH_TASKS_SUCCESS:
            return { ...state, tasks: action.payload, loading: false };

        case actionTypes.CREATE_TASK_SUCCESS:
            return { ...state, tasks: [...state.tasks, action.payload], loading: false };

        case actionTypes.DELETE_TASK_SUCCESS:
            return { ...state, tasks: state.tasks.filter((task) => task.id !== action.payload), loading: false };

        case actionTypes.FETCH_TASKS_FAILURE:
        case actionTypes.CREATE_TASK_FAILURE:
        case actionTypes.DELETE_TASK_FAILURE:
            return { ...state, error: action.payload, loading: false };

        default:
            return state;
    }
};

export default taskReducer;