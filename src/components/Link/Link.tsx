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
        textDecoration: 'none',
        marginRight: '1rem',
        background: isActive ? '#b24900' : 'none',
      })}
    >
      {children}
    </ReactLink>
  );
};

export default Link;
