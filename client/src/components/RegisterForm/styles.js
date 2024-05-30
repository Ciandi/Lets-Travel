import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

export const ContentContainer = styled.div`
  max-width: 400px;
  padding: 20px;
  text-align: center;
  border: 2px solid #ccc; 
  border-radius: 8px; 
`;

export const Title = styled.h1`
  font-size: 32px;
  margin-bottom: 20px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Input = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

export const Button = styled.button`
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

export const Error = styled.div`
  color: red;
  margin-top: 10px;
`;

export const Success = styled.div`
  color: green;
  margin-top: 10px; 
`;
