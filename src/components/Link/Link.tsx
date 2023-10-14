import React, { ReactElement } from 'react';
import { NavLink as ReactLink } from 'react-router-dom';

type LinkType = {
  children: ReactElement;
  to: string;
};

const Link: React.FC<LinkType> = ({ children, to }) => {
  return (
    <ReactLink
      to={to}
      style={({ isActive }) => ({
        color: 'black',
        textDecoration: 'none',
        marginRight: '1rem',
        background: isActive ? '#d93226' : 'none',
      })}
    >
      {children}
    </ReactLink>
  );
};

export default Link;
