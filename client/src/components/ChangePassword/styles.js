import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 300px;

  label {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  input {
    padding: 8px;
    margin-top: 5px;
    width: 100%;
  }

  button {
    padding: 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
    margin-top: 10px;
  }

  button:hover {
    background-color: #45a049;
  }
`;

export const Message = styled.p`
  color: red;
  margin-top: 10px;
`;
