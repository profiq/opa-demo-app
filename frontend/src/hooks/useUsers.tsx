import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUsers, setUsersRole } from '../actions';
import { IState } from '../types';

const useUsers = () => {
    const dispatch = useDispatch();
    const users = useSelector<IState, any[]>(state => state.users);
    const usersRole = useSelector<IState, any[]>(state => state.usersRole);

    const refetchUsers = React.useCallback(() => {
        fetch('http://user.localhost/all_users', { method: 'GET' })
            .then(response => response.json())
            .then(data => {
                dispatch(setUsers(data.users));
                dispatch(setUsersRole(data.roles));
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [dispatch]);

    React.useEffect(() => {
        if (users.length === 0) {
            refetchUsers();
        }
    }, [refetchUsers, users]);

    return { refetchUsers, users, usersRole };
};

export default useUsers;
