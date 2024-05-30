import styled from 'styled-components';

export const Container = styled.div`
  text-align: center;
  margin: 20px auto;
  max-width: 800px;
`;

export const Title = styled.h1`
  margin-bottom: 20px;
`;

export const InputWrapper = styled.div`
  margin-bottom: 10px;
`;

export const Button = styled.button`
  margin: 10px 10px;
`;

export const ErrorMessage = styled.p`
  color: red;
`;

export const HotelCard = styled.div`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin: 10px 0;
`;

export const HotelImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;

export const HotelImage = styled.img`
  max-width: 150px;
  margin: 0 10px;
`;

export const HotelButton = styled.button`
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

export const FavoriteButton = styled.button`
  margin-top: 10px;
  padding: 8px 16px;
  background-color: ${props => (props.isFavorite ? 'red' : '#28a745')};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${props => (props.isFavorite ? '#cc0000' : '#218838')};
  }
`;
