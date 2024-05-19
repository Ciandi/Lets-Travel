import React, { useState } from 'react';
import { Container, ContentContainer, Title, Form, Input, Button, Error, Success } from './styles';

const RegisterForm = ({ onSubmit }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [registered, setRegistered] = useState(false); // Track registration success

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setError('');

    try {
      const response = await fetch('/addUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, confirmPassword }),
      });

      if (!response.ok) {
        const responseData = await response.json();
        setError(responseData.message || 'Registration failed');
        return; // Added to stop further execution
      }

      // Set registration success state
      setRegistered(true);
      console.log('Registration successful');
    } catch (error) {
      setError('An error occurred. Please try again.'); // Fallback error message
    }
  };

  return (
    <Container>
      <ContentContainer>
        <Title>Register</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button type="submit">Register</Button>
          {error && <Error>{error}</Error>}
          {registered && <Success>Registration successful!</Success>}
        </Form>
      </ContentContainer>
    </Container>
  );
};

export default RegisterForm;
