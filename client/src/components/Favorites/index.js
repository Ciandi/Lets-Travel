import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {
  Container,
  Title,
  HotelCard,
  HotelImageWrapper,
  HotelImage,
  HotelButton,
  FavoriteButton,
  ErrorMessage,
} from './styles.js'; 
import { LoggedInUserContext } from '../../contexts/LoggedInUserContext'; 

const Favorites = () => {
  const { loggedInUser } = useContext(LoggedInUserContext); 

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const handleFavorite = async (hotel) => {
    try {
   
      const isFavorite = favorites.some((favHotel) => favHotel.id === hotel.id);
      const updatedFavorites = isFavorite
        ? favorites.filter((favHotel) => favHotel.id !== hotel.id)
        : [...favorites, hotel];
      setFavorites(updatedFavorites);

    
      await axios.post(`/favorites/${loggedInUser.username}`, { favorites: updatedFavorites }); 
    } catch (error) {
      console.error('Error updating favorites:', error);
      setError(error.message);
    }
  };

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`/favorites/${loggedInUser.username}`); 
        setFavorites(response.data.favorites);
      } catch (error) {
        console.error('Error fetching favorites:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [loggedInUser]);

  return (
    <Container>
      <Title>Favorites</Title>
      {loading && <p>Loading...</p>}
      {error && <ErrorMessage>Error: {error}</ErrorMessage>}
      {favorites.map((hotel, index) => (
        <HotelCard key={index}>
          <h2>{hotel.name}</h2>
          <HotelImageWrapper>
            {hotel.imageUrls.map((imageUrl, i) => (
              <HotelImage
                key={i}
                src={imageUrl}
                alt={`Hotel ${index + 1} Image ${i + 1}`}
              />
            ))}
          </HotelImageWrapper>
          <p>Stars: {hotel.stars}</p>
          <p>Address: {hotel.address}</p>
          <p>Distance: {hotel.distance}</p>
          <p>Price: {hotel.price}</p>
          <p>Total with Taxes: {hotel.totalWithTaxes}</p>
          <HotelButton>
            <a
              href={hotel.websiteLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit Website
            </a>
          </HotelButton>
          <FavoriteButton
            isFavorite={favorites.some((favHotel) => favHotel.id === hotel.id)}
            onClick={() => handleFavorite(hotel)}
          >
            {favorites.some((favHotel) => favHotel.id === hotel.id)
              ? 'Unfavorite'
              : 'Favorite'}
          </FavoriteButton>
        </HotelCard>
      ))}
    </Container>
  );
};

export default Favorites;
