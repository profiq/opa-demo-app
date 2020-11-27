import * as React from 'react';
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../types';
import {
    setAPIResponse,
    setJWT,
    setSelectedCourse,
    setSelectedUser,
} from '../actions';

const UserButtons: React.FC = () => {
    const dispatch = useDispatch();
    const selectedUserName = useSelector<IState, string>(
        state => state.selectedUserName
    );
    const JWT = useSelector<IState, string>(state => state.JWT);

    const getJWT = React.useCallback(() => {
        if (selectedUserName.length > 0) {
            let responseAPI: string;
            const data = { user: selectedUserName };
            fetch('http://auth.localhost/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    user: selectedUserName,
                },
                body: JSON.stringify(data),
            })
                .then(response => {
                    responseAPI = response.status + ' ' + response.statusText;
                    return response.json();
                })
                .then(data => {
                    dispatch(setAPIResponse(responseAPI + ' JWT: ' + data.JWT));
                    dispatch(setJWT(data.JWT));
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    }, [selectedUserName, dispatch]);

    const getUser = React.useCallback(() => {
        if (selectedUserName.length > 0) {
            const data = { user: selectedUserName };
            fetch('http://user.localhost/user_detail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
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
                    dispatch(setSelectedUser(data));
                    dispatch(setSelectedCourse(null));
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    }, [selectedUserName, dispatch]);

    return (
        <>
            <Button
                variant="contained"
                color="primary"
                className="getJWT button"
                onClick={() => getJWT()}
            >
                GET JWT
            </Button>
            {selectedUserName && JWT && (
                <Button
                    variant="contained"
                    color="primary"
                    className="getUser button"
                    onClick={() => getUser()}
                >
                    GET USER
                </Button>
            )}
        </>
    );
};

export default UserButtons;
