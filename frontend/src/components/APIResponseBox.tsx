import * as React from 'react';
import { Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { IState } from '../types';

const APIResponseBox: React.FC = () => {
    const JWT = useSelector<IState, string>(state => state.JWT);
    const APIResponse = useSelector<IState, string>(state => state.APIResponse);

    return (
        <>
            {APIResponse && JWT && (
                <>
                    <Typography
                        className="apiResponseTitle"
                        variant="h6"
                        component="h6"
                    >
                        API response:
                    </Typography>
                    <div id="apiResponse" className="apiResponse">
                        {APIResponse}
                    </div>
                </>
            )}
        </>
    );
};

export default APIResponseBox;
