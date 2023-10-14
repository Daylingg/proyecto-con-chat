import React from 'react';
import PropTypes from 'prop-types';

import {  Navigate } from 'react-router-dom';


export const PrivateRoute = ({
    isAuthenticated,children
    //component: Component,
    //...rest
}) => {

    return (
        ( isAuthenticated )
        ? children //muestro o renderizo sus hijos
            : <Navigate to='/auth/login' />
        
    )
}

PrivateRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    //component: PropTypes.func.isRequired
}
