import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Message } from './styles';
import { LoggedInUserContext } from '../../contexts/LoggedInUserContext';

const Profile = () => {
  const { loggedInUser, logOut } = useContext(LoggedInUserContext);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  //if no users, display this
  if (!loggedInUser) {
    return <Container><p>You need to log in to view this page.</p></Container>;
  }

  //navigate differnet route if change password
  const goToChangePassword = () => {
    navigate('/profile/changepassword');
  };

  //delete account request from backend
  const handleDeleteAccount = async () => {
    try {
      const response = await fetch('/deleteUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: loggedInUser.username }),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage(result.message);
        logOut();
        navigate('/');
      } else {
        setMessage(result.message);
      }
    } catch (error) {
        console.error('Error deleting account:', error); 
      setMessage('Error deleting account');
    }
  };

  return (
    <Container>
      <h1>{loggedInUser.username}</h1>
      <Button onClick={goToChangePassword}>Change Password</Button>
      <Button onClick={handleDeleteAccount}>Delete Account</Button>
      {message && <Message>{message}</Message>}
    </Container>
  );
};

export default Profile;
