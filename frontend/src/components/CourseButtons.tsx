import * as React from 'react';
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { iCourse, IState } from '../types';
import useCourses from '../hooks/useCourses';
import {
    setAPIResponse,
    setSelectedCourse,
    setSelectedCourseName,
    setSelectedUser,
} from '../actions';

interface IProps {
    selectedCourseIndex: number | null;
}

const CourseButtons: React.FC<IProps> = ({ selectedCourseIndex }) => {
    const dispatch = useDispatch();
    const { courses } = useCourses();
    const JWT = useSelector<IState, string>(state => state.JWT);
    const selectedCourse = useSelector<IState, iCourse | null>(
        state => state.selectedCourse
    );
    const selectedCourseName = useSelector<IState, string>(
        state => state.selectedCourseName
    );
    const selectedUserName = useSelector<IState, string>(
        state => state.selectedUserName
    );

    const getCourse = React.useCallback(() => {
        if (selectedCourseIndex !== null) {
            dispatch(setSelectedCourseName(courses[selectedCourseIndex]));
            const data = { course: courses[selectedCourseIndex] };
            fetch('http://course.localhost/course_detail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    course: courses[selectedCourseIndex],
                    authorization: JWT,
                },
                body: JSON.stringify(data),
            })
                .then(response => {
                    dispatch(
                        setAPIResponse(
                            response.status + ' ' + response.statusText
                        )
                    );
                    return response.json();
                })
                .then(data => {
                    dispatch(setSelectedCourse(data));
                    dispatch(setSelectedUser(null));
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    }, [selectedCourseIndex, courses, JWT, dispatch]);

    const enrollCourse = React.useCallback(() => {
        if (selectedCourse && selectedCourseName !== '') {
            let responseAPI: string;
            const data = { user: selectedUserName, course: selectedCourseName };
            fetch('http://enroll.localhost/enroll_course', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    course: selectedCourseName,
                    authorization: JWT,
                },
                body: JSON.stringify(data),
            })
                .then(response => {
                    responseAPI = response.status + ' ' + response.statusText;
                    return response.json();
                })
                .then(data => {
                    dispatch(
                        setAPIResponse(responseAPI + ' info: ' + data.info)
                    );
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    }, [selectedCourse, JWT, selectedCourseName, selectedUserName, dispatch]);

    return (
        <>
            {selectedUserName && selectedCourseIndex !== null && JWT && (
                <div>
                    <Button
                        variant="contained"
                        color="primary"
                        className="button"
                        onClick={() => getCourse()}
                    >
                        Get course
                    </Button>
                </div>
            )}
            {selectedCourse && JWT && (
                <div>
                    <Button
                        variant="contained"
                        color="primary"
                        className="button"
                        onClick={() => enrollCourse()}
                    >
                        Enroll course
                    </Button>
                </div>
            )}
        </>
    );
};

export default CourseButtons;
