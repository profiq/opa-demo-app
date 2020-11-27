import { iCourse, iUser } from './types';

export const setUsers = (users: string[]) => ({
    payload: users,
    type: 'SET_USERS',
});

export const setUsersRole = (usersRole: string[]) => ({
    payload: usersRole,
    type: 'SET_USERS_ROLE',
});

export const setCourses = (courses: string[]) => ({
    payload: courses,
    type: 'SET_COURSES',
});

export const setSelectedUserName = (selectedUserName: string) => ({
    payload: selectedUserName,
    type: 'SET_SELECTED_USER_NAME',
});

export const setSelectedUser = (selectedUser: iUser | null) => ({
    payload: selectedUser,
    type: 'SET_SELECTED_USER',
});

export const setSelectedCourseName = (selectedCourseName: string) => ({
    payload: selectedCourseName,
    type: 'SET_SELECTED_COURSE_NAME',
});

export const setSelectedCourse = (selectedCourse: iCourse | null) => ({
    payload: selectedCourse,
    type: 'SET_SELECTED_COURSE',
});

export const setJWT = (JWT: string) => ({
    payload: JWT,
    type: 'SET_JWT',
});

export const setAPIResponse = (APIResponse: string) => ({
    payload: APIResponse,
    type: 'SET_API_RESPONSE',
});
