import * as React from 'react';
import { Button, TextField, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { iCourse, IState, iUser } from '../types';
import { setAPIResponse, setSelectedCourse } from '../actions';

const DetailForm: React.FC = () => {
    const dispatch = useDispatch();
    const selectedCourse = useSelector<IState, iCourse | null>(
        state => state.selectedCourse
    );
    const selectedUser = useSelector<IState, iUser | null>(
        state => state.selectedUser
    );
    const JWT = useSelector<IState, string>(state => state.JWT);
    const selectedCourseName = useSelector<IState, string>(
        state => state.selectedCourseName
    );

    const changeInput = React.useCallback(
        (event, item) => {
            let updatedCourse: iCourse;
            switch (item) {
                case 'credits':
                    updatedCourse = {
                        credits: event.target.value,
                        id: selectedCourse!.id,
                        name: selectedCourse!.name,
                        teachers: selectedCourse!.teachers,
                        time_slot: selectedCourse!.time_slot,
                    };
                    dispatch(setSelectedCourse(updatedCourse));
                    break;
                case 'name':
                    updatedCourse = {
                        credits: selectedCourse!.credits,
                        id: selectedCourse!.id,
                        name: event.target.value,
                        teachers: selectedCourse!.teachers,
                        time_slot: selectedCourse!.time_slot,
                    };
                    dispatch(setSelectedCourse(updatedCourse));
                    break;
                case 'teachers':
                    updatedCourse = {
                        credits: selectedCourse!.credits,
                        id: selectedCourse!.id,
                        name: selectedCourse!.name,
                        teachers: event.target.value.split(','),
                        time_slot: selectedCourse!.time_slot,
                    };
                    dispatch(setSelectedCourse(updatedCourse));
                    break;
                case 'time_slot':
                    updatedCourse = {
                        credits: selectedCourse!.credits,
                        id: selectedCourse!.id,
                        name: selectedCourse!.name,
                        teachers: selectedCourse!.teachers,
                        time_slot: event.target.value.split(','),
                    };
                    dispatch(setSelectedCourse(updatedCourse));
                    break;
            }
        },
        [selectedCourse, dispatch]
    );

    const updateCourse = React.useCallback(() => {
        if (selectedCourse && selectedCourseName !== '') {
            let responseAPI: string;
            const data = { course: selectedCourseName, data: selectedCourse };
            fetch('http://course.localhost/course_update', {
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
    }, [selectedCourse, JWT, selectedCourseName, dispatch]);

    return (
        <>
            {JWT && (selectedCourse || selectedUser) && (
                <Typography variant="h6" component="h6" style={{ margin: '0' }}>
                    {selectedCourse && selectedUser === null
                        ? 'Course detail:'
                        : selectedUser &&
                          selectedCourse === null &&
                          'User detail:'}
                </Typography>
            )}
            {JWT && selectedCourse && selectedUser === null && (
                <>
                    <form
                        className="courseDetail"
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            className="courseInput"
                            label="Course name"
                            value={selectedCourse.name}
                            variant="outlined"
                            onChange={event => changeInput(event, 'name')}
                        />
                        <br />
                        <TextField
                            className="courseInput"
                            label="Course credits"
                            value={selectedCourse.credits}
                            variant="outlined"
                            onChange={event => changeInput(event, 'credits')}
                        />
                        <br />
                        <TextField
                            className="courseInput"
                            label="Course teachers"
                            value={selectedCourse.teachers}
                            variant="outlined"
                            onChange={event => changeInput(event, 'teachers')}
                        />
                        <br />
                        <TextField
                            label="Course time slots"
                            value={selectedCourse.time_slot}
                            variant="outlined"
                            onChange={event => changeInput(event, 'time_slot')}
                        />
                        <br />
                        <div style={{ textAlign: 'center' }}>
                            <Button
                                variant="contained"
                                color="primary"
                                className="button"
                                onClick={() => updateCourse()}
                                style={{ marginTop: '10pt' }}
                            >
                                Update course
                            </Button>
                        </div>
                    </form>
                </>
            )}
            {JWT && selectedUser && selectedCourse === null && (
                <form className="courseDetail" noValidate autoComplete="off">
                    <TextField
                        className="courseInput"
                        label="User name"
                        value={selectedUser.name}
                        variant="outlined"
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <br />
                    <TextField
                        className="courseInput"
                        label="User role"
                        value={selectedUser.role}
                        variant="outlined"
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <br />
                    <TextField
                        className="courseInput"
                        label="User courses"
                        value={selectedUser.course}
                        variant="outlined"
                        InputProps={{
                            readOnly: true,
                        }}
                        defaultValue="none"
                    />
                    <br />
                </form>
            )}
        </>
    );
};

export default DetailForm;
