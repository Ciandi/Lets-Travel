import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Navbar from "./components/NavigationBar";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Profile from "./components/Profile"; 
import ChangePassword from './components/ChangePassword';
import Hotels from "./components/Hotels";
import Favorites from "./components/Favorites";
import { LoggedInUserContext } from "./contexts/LoggedInUserContext";


const Wrapper = styled.div`
  text-align: center;
  padding: 20px;
`;

const Footer = styled.footer`
  margin-top: 20px;
`;

const Message = styled.div`
  font-size: 36px;
  font-weight: bold;
  margin-top: 50px;
  display: flex;
  justify-content: center;
`;

const HomePage = () => {
  const { loggedInUser } = useContext(LoggedInUserContext);

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          {loggedInUser ? (
            <>
              <Route path="/" element={<Hotels />} />
              <Route path="/favorites" element={<Favorites username={loggedInUser.username} />} />
              <Route path="/profile" element={<Profile />} />  
              <Route path="/profile/changepassword" element={<ChangePassword />} /> 
            </>
          ) : (
            <Route
              path="/"
              element={<Message>Please sign in to use the API!</Message>}
            />
          )}
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
        </Routes>
      </div>
      <Wrapper>
        <Footer>
      
        </Footer>
      </Wrapper>
    </Router>
  );
};

export default HomePage;
