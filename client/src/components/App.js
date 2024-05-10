import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm"; // Corrected import path for RegisterForm

const Wrapper = styled.div`
  text-align: center;
  padding: 20px;
`;

const Footer = styled.footer`
  margin-top: 20px;
`;

const HomePage = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} /> {/* Add route for the RegisterForm component */}
      </Routes>
      <Wrapper>

        <Footer>
          <p>Terms of Service | Privacy Policy</p>
        </Footer>
      </Wrapper>
    </Router>
  );
};

export default HomePage;