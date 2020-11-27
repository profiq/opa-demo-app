import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCourses } from '../actions';
import { IState } from '../types';

const useCourses = () => {
    const dispatch = useDispatch();
    const courses = useSelector<IState, any[]>(state => state.courses);

    const refetchCourses = React.useCallback(() => {
        fetch('http://course.localhost/all_courses', { method: 'GET' })
            .then(response => response.json())
            .then(data => {
                dispatch(setCourses(data.courses));
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [dispatch]);

    React.useEffect(() => {
        if (courses.length === 0) {
            refetchCourses();
        }
    }, [refetchCourses, courses]);

    return { refetchCourses, courses };
};

export default useCourses;
