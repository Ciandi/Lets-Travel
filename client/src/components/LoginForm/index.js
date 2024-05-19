import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  ContentContainer,
  Title,
  Form,
  Input,
  Button,
  Error,
} from "./styles";
import { LoggedInUserContext } from "../../contexts/LoggedInUserContext";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { logIn } = useContext(LoggedInUserContext); // Access logIn function from context

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("fetching");

    try {
      const res = await fetch("/loginUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      console.log(data)

      if (res.status === 200) {
        setStatus("idle");
        logIn(data.user);
        navigate("/");
      } else {
        setStatus("idle");
        setError(data.message || "Login failed");
      }
    } catch (error) {
      console.log(error.message)
      setStatus("idle");
      setError("An error occurred, please try again later.");
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
            disabled={status === "fetching"}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={status === "fetching"}
          />
          <Button type="submit" disabled={status === "fetching"}>
            {status === "fetching" ? "Logging In..." : "Login"}
          </Button>
          {error && <Error>{error}</Error>}
        </Form>
      </ContentContainer>
    </Container>
  );
};

export default LoginForm;
