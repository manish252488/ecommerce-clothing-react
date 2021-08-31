import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
export default function RoleBasedComponent(props){
    const auth = useSelector(({Auth})=>Auth);
    const isAuthenticated = auth?.isAuthenticated;
    const role = auth?.role;
    if(isAuthenticated && role === props.role){
        return props?.children
    }
    else return <></>;
}

RoleBasedComponent.propTypes={
    role: PropTypes.string
}
RoleBasedComponent.defaultProps={
    role: "guest"
}