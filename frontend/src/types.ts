export interface IState {
    users: string[];
    usersRole: string[];
    courses: string[];
    selectedUserName: string;
    selectedUser: iUser | null;
    selectedCourseName: string;
    selectedCourse: iCourse | null;
    JWT: string;
    APIResponse: string;
}

export interface iUser {
    course: string[];
    name: string;
    role: string;
}

export interface iCourse {
    credits: number;
    id: number;
    name: string;
    teachers: string[];
    time_slot: number[];
}
