import * as React from 'react';
import { List, ListItem, ListItemText, ListSubheader } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { IState } from '../types';
import useCourses from '../hooks/useCourses';

interface IProps {
    selectedCourseIndex: number | null;
    setSelectedCourseIndex: (index: number) => void;
}

const CoursesList: React.FC<IProps> = ({
    selectedCourseIndex,
    setSelectedCourseIndex,
}) => {
    const { courses } = useCourses();
    const selectedCourseName = useSelector<IState, string>(
        state => state.selectedCourseName
    );

    const handleCourses = (index: number) => {
        if (index !== null) {
            setSelectedCourseIndex(index);
        }
    };

    return (
        <List
            className="courses"
            aria-labelledby="nested-list"
            subheader={
                <ListSubheader className="coursesHeader" id="nested-list">
                    Courses
                </ListSubheader>
            }
        >
            {courses.length > 0 ? (
                courses.map((course: string, index) => (
                    <ListItem
                        id={course}
                        key={course}
                        className={
                            course === selectedCourseName
                                ? 'course selectedItemMenu'
                                : 'course'
                        }
                        button
                        selected={selectedCourseIndex === index}
                        onClick={() => handleCourses(index)}
                    >
                        <ListItemText primary={course} />
                    </ListItem>
                ))
            ) : (
                <ListItem button>
                    <ListItemText primary="Courses not found" />
                </ListItem>
            )}
        </List>
    );
};

export default CoursesList;
