import React, { useContext } from 'react';
import { Nav, NavLink } from './styles';
import { LoggedInUserContext } from '../../contexts/LoggedInUserContext';
import { useNavigate } from 'react-router-dom';

const NavigationBar = () => {
  const { loggedInUser, logOut } = useContext(LoggedInUserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut();
    navigate('/');
  };

  return (
    <Nav>
      <div>
        <NavLink to="/">Home</NavLink>
      </div>
      <div style={{ marginLeft: 'auto' }}>
        {loggedInUser ? (
          <>
            <span style={{ marginRight: '10px' }}>Welcome, {loggedInUser.username}</span>
            <NavLink to="/profile" style={{ marginRight: '10px' }}>Profile</NavLink>
            <NavLink to="/favorites" style={{ marginRight: '10px' }}>Favorites</NavLink>
            <NavLink to="/" onClick={handleLogout}>Logout</NavLink>
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
