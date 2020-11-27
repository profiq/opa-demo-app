import { IState } from './types';

const initialState = {
    users: [],
    usersRole: [],
    courses: [],
    selectedUserName: '',
    selectedUser: null,
    selectedCourseName: '',
    selectedCourse: null,
    JWT: '',
    APIResponse: '',
};

const rootReducer = (state: IState = initialState, action: any): IState => {
    switch (action.type) {
        case 'SET_USERS':
            return { ...state, users: action.payload };
        case 'SET_USERS_ROLE':
            return { ...state, usersRole: action.payload };
        case 'SET_COURSES':
            return { ...state, courses: action.payload };
        case 'SET_SELECTED_USER_NAME':
            return { ...state, selectedUserName: action.payload };
        case 'SET_SELECTED_USER':
            return { ...state, selectedUser: action.payload };
        case 'SET_SELECTED_COURSE_NAME':
            return { ...state, selectedCourseName: action.payload };
        case 'SET_SELECTED_COURSE':
            return { ...state, selectedCourse: action.payload };
        case 'SET_JWT':
            return { ...state, JWT: action.payload };
        case 'SET_API_RESPONSE':
            return { ...state, APIResponse: action.payload };
        default:
            return state;
    }
};

export default rootReducer;
