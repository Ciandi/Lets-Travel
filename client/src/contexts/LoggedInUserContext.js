import React, { createContext, useState, useEffect } from 'react';

export const LoggedInUserContext = createContext();

export const LoggedInUserProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    // Load user from local storage on component mount
    const savedUser = localStorage.getItem('loggedInUser');
    if (savedUser) {
      setLoggedInUser(JSON.parse(savedUser));
    }
  }, []);

  const logIn = (user) => {
    // Save user to state and local storage
    setLoggedInUser(user);
    localStorage.setItem('loggedInUser', JSON.stringify(user));
  };

  const logOut = () => {
    // Clear user from state and local storage
    setLoggedInUser(null);
    localStorage.removeItem('loggedInUser');
  };

  return (
    <LoggedInUserContext.Provider value={{ loggedInUser, logIn, logOut }}>
      {children}
    </LoggedInUserContext.Provider>
  );
};
