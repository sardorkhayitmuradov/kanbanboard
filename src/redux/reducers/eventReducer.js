import { actionTypes } from '../actions/taskActions';

const initialState = {
    events: [
        // {
        //     id: 1,
        //     title: "Event",
        //     todo: [],
        //     inProgress: [],
        //     completed: [],
        // },
    ],
    loading: false,
    error: null,
};

const eventReducer = (state = initialState, action) => {
    switch (action.type) {
        // ...
        case actionTypes.FETCH_EVENTS_REQUEST:
        case actionTypes.CREATE_EVENT_REQUEST:
        case actionTypes.DELETE_EVENT_REQUEST:
            return { ...state, loading: true };
        case actionTypes.FETCH_EVENTS_SUCCESS:
            return { ...state, events: action.payload, loading: false };
        case actionTypes.CREATE_EVENT_SUCCESS:
            return { ...state, events: [...state.events, action.payload], loading: false };
        case actionTypes.DELETE_EVENT_SUCCESS:
            return { ...state, events: state.events.filter((event) => event.id !== action.payload), loading: false };
        case actionTypes.FETCH_EVENTS_FAILURE:
        case actionTypes.CREATE_EVENT_FAILURE:
        case actionTypes.DELETE_EVENT_FAILURE:
            return { ...state, error: action.payload, loading: false };


        case actionTypes.FETCH_TASKS_REQUEST:
        case actionTypes.CREATE_TASK_REQUEST:
        case actionTypes.DELETE_TASK_REQUEST:
        case actionTypes.UPDATE_TASK_REQUEST:
            return { ...state, loading: true };

        case actionTypes.FETCH_TASKS_SUCCESS:
        case actionTypes.FETCH_TASKS_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case actionTypes.CREATE_TASK_SUCCESS: {
            const newTask = action.payload.task;
            const eventId = action.payload.eventId;
            const category = action.payload.category;

            const updatedEvents = state.events.map((event) => {
                if (event.id === eventId) {
                    return { ...event, [category]: [...event[category], newTask] };
                }
                return event;
            });

            return { ...state, events: updatedEvents, loading: false };
        }

        case actionTypes.DELETE_TASK_SUCCESS: {
            const taskId = action.payload.taskId;
            const eventId = action.payload.eventId;
            const category = action.payload.category;

            const updatedEvents = state.events.map((event) => {
                if (event.id === eventId) {
                    const updatedTasks = event[category].filter(task => task.id !== taskId);
                    return { ...event, [category]: updatedTasks };
                }
                return event;
            });

            return { ...state, events: updatedEvents, loading: false };
        }

        case actionTypes.UPDATE_TASK_SUCCESS: {
            const updatedTask = action.payload.task;
            const eventId = action.payload.eventId;
            const category = action.payload.category;

            const updatedEvents = state.events.map((event) => {
                if (event.id === eventId) {
                    const updatedTasks = event[category].map((task) => {
                        if (task.id === updatedTask.id) {
                            return updatedTask;
                        }
                        return task;
                    });

                    return { ...event, [category]: updatedTasks };
                }
                return event;
            });

            return { ...state, events: updatedEvents, loading: false };
        }

        case actionTypes.CREATE_TASK_FAILURE:
        case actionTypes.DELETE_TASK_FAILURE:
        case actionTypes.UPDATE_TASK_FAILURE:
            return { ...state, error: action.payload, loading: false };
        default:
            return state;
    }
};

export default eventReducer;