import React, { useState, useContext } from 'react';
import { LoggedInUserContext } from '../../contexts/LoggedInUserContext';
import { Container, Form, Message } from './styles';

const ChangePassword = () => {
    const { loggedInUser } = useContext(LoggedInUserContext);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
  
    const handleChangePassword = async (e) => {
      e.preventDefault();
  
      if (!loggedInUser) {
        setMessage('You need to be logged in to change your password.');
        return;
      }
  
      try {
        const response = await fetch('/changePassword', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: loggedInUser.username,
            currentPassword,
            newPassword,
          }),
        });
  
        const result = await response.json();
        if (response.ok) {
          setMessage(result.message);
        } else {
          setMessage(result.message);
        }
      } catch (error) {
        setMessage('Error changing password');
      }
    };
  

  return (
    <Container>
      <h1>Change Password</h1>
      <Form onSubmit={handleChangePassword}>
        <div>
          <label>
            Current Password:
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            New Password:
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">Change Password</button>
      </Form>
      {message && <Message>{message}</Message>}
    </Container>
  );
};

export default ChangePassword;
