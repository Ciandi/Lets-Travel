import React, { useContext } from 'react';
import { Nav, NavLink } from './styles';
import { LoggedInUserContext } from '../../contexts/LoggedInUserContext';

const NavigationBar = () => {
  const { loggedInUser, logOut } = useContext(LoggedInUserContext);

  return (
    <Nav>
      <div>
        <NavLink to="/">Home</NavLink>
      </div>
      <div style={{ marginLeft: 'auto' }}>
        {loggedInUser ? (
          <>
            <span style={{ marginRight: '10px' }}>Welcome, {loggedInUser.username}</span>
            <button onClick={logOut}>Logout</button>
          </>
        ) : (
          <>
            <NavLink to="/register">Register</NavLink>
            <NavLink to="/login">Login</NavLink>
          </>
        )}
      </div>
    </Nav>
  );
};

export default NavigationBar;
