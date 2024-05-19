import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Navbar from "./components/NavigationBar";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";


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
      <div>
        {/* Pass loggedInUser and logOut to NavigationBar */}
        <Navbar />
        <Routes>
          <Route path="/" element={null} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
        </Routes>
      </div>
      <Wrapper>
        <Footer>
          <p>Terms of Service | Privacy Policy</p>
        </Footer>
      </Wrapper>
    </Router>
  );
};

export default HomePage;
