import * as React from 'react';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { Button, Menu, MenuItem, Typography } from '@material-ui/core';
import useUsers from '../hooks/useUsers';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../types';
import {
    setJWT,
    setSelectedCourse,
    setSelectedCourseName,
    setSelectedUser,
    setSelectedUserName,
} from '../actions';

const UsersList: React.FC = () => {
    const dispatch = useDispatch();
    const { users, usersRole } = useUsers();
    const selectedUserName = useSelector<IState, string>(
        state => state.selectedUserName
    );

    const cleanUpStates = React.useCallback(() => {
        dispatch(setJWT(''));
        dispatch(setSelectedCourseName(''));
        dispatch(setSelectedCourse(null));
        dispatch(setSelectedUserName(''));
        dispatch(setSelectedUser(null));
    }, [dispatch]);

    const [anchorMenuEl, setAnchorMenuEl] = React.useState<null | HTMLElement>(
        null
    );

    const handleDropdown = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorMenuEl(event.currentTarget);
    };

    const handleDropdownClose = React.useCallback(() => {
        setAnchorMenuEl(null);
        cleanUpStates();
    }, [cleanUpStates]);

    const handleUserListChange = React.useCallback(
        (user: any) => {
            handleDropdownClose();
            dispatch(setSelectedUserName(user));
        },
        [handleDropdownClose, dispatch]
    );

    return (
        <>
            <Typography variant="h6" component="h6" style={{ margin: '0' }}>
                Selected user:
            </Typography>
            <Button
                aria-controls="usersDropdown"
                aria-haspopup="true"
                className="usersDropdown"
                onClick={handleDropdown}
            >
                {selectedUserName.length > 0 ? selectedUserName : ''}
                <ArrowDropDownIcon className="usersDropdownArrow" />
            </Button>
            <Menu
                id="usersDropdown"
                anchorEl={anchorMenuEl}
                keepMounted
                open={Boolean(anchorMenuEl)}
                onClose={handleDropdownClose}
            >
                {users.length > 0 ? (
                    users.map((user: string, index) => (
                        <MenuItem
                            key={user}
                            onClick={() => handleUserListChange(user)}
                        >
                            {user} ({usersRole[index]})
                        </MenuItem>
                    ))
                ) : (
                    <MenuItem onClick={handleDropdownClose}>
                        Users not found
                    </MenuItem>
                )}
            </Menu>
        </>
    );
};

export default UsersList;
