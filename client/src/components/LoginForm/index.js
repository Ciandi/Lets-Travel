import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const ContentContainer = styled.div`
  max-width: 400px;
  padding: 20px;
  text-align: center;
  border: 2px solid #ccc; /* Add border properties */
  border-radius: 8px; /* Add border radius for rounded corners */
`;

const Title = styled.h1`
  font-size: 32px;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 8px 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

const Error = styled.div`
  color: red;
  margin-top: 0.5rem;
`;

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('fetching');

    try {
      const res = await fetch('/loginUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (res.status === 200) {
        setStatus('idle');
        // Handle successful login here, e.g., redirect or store token
      } else {
        setStatus('idle');
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      setStatus('idle');
      setError('An error occurred, please try again later.');
    }
  };

  return (
    <Container>
      <ContentContainer>
        <Title>Let's Travel!</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={status === 'fetching'}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={status === 'fetching'}
          />
          <Button type="submit" disabled={status === 'fetching'}>
            {status === 'fetching' ? 'Logging In...' : 'Login'}
          </Button>
          {error && <Error>{error}</Error>}
        </Form>
      </ContentContainer>
    </Container>
  );
};

export default LoginForm;
