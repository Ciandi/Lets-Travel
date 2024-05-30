import React, { useState } from "react";
import {
  Container,
  ContentContainer,
  Title,
  Form,
  Input,
  Button,
  Error,
  Success,
} from "./styles";

const RegisterForm = ({ onSubmit }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [registered, setRegistered] = useState(false); // Track registration success

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");

    // Sending a request to the server to register user if password do matches
    try {
      const response = await fetch("/addUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, confirmPassword }),
      });

      if (!response.ok) {
        const responseData = await response.json();
        setError(responseData.message || "Registration failed");
        return;
      }

      setRegistered(true);
      console.log("Registration successful");
    } catch (error) {
      setError("An error occurred. Please try again.");
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
          {/* Display error message if there's an error */}
          {error && <Error>{error}</Error>}
          {/* Display success message if registration is successful */}
          {registered && <Success>Registration successful!</Success>}
        </Form>
      </ContentContainer>
    </Container>
  );
};

export default RegisterForm;
