import React from 'react';
import { NavLink } from 'react-router';

const MyLink = ({to,children,className}) => {
    return (
        <NavLink
              to={to}
              className={({ isActive }) => (isActive ? "text-purple-600" : `${className} font-semibold`)}
            >
              {children}
            </NavLink>
    );
};

export default MyLink;