import React, { useState, useEffect } from 'react';
import {
  Container,
  Title,
  HotelCard,
  HotelImageWrapper,
  HotelImage,
  HotelButton,
  FavoriteButton
} from './styles';

const Favorites = ({ username }) => {
  //states to store favorites,loading and error
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    //fetch favorites request depending of user, backendpoint
    const fetchFavorites = async () => {
      try {
        const response = await fetch(`/getFavorites/${username}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setFavorites(data.favorites || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [username]);

  // Delete favorite handle 
  const handleFavorite = async (bookmark) => {
    try {
      const isFavorite = favorites.some((fav) => fav.id === bookmark.id);
      const endpoint = isFavorite ? "/deleteFavorite" : "/addFavorite";
      
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: username,
          bookmark: bookmark
        })
      });

      if (response.ok) {
        if (isFavorite) {
          setFavorites(favorites.filter((fav) => fav.id !== bookmark.id));
        } else {
          setFavorites([...favorites, bookmark]);
        }
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error handling favorite:", error);
    }
  };

  //Format the link because of localhost
  const formatDeeplink = (deeplink) => {
    if (
      deeplink &&
      !deeplink.startsWith("http://") &&
      !deeplink.startsWith("https://")
    ) {
      return "https://" + deeplink;
    }
    return deeplink;
  };

  //Display loading data message
  if (loading) return <div>Loading...</div>;
  //Display Error data message
  if (error) return <div>Error: {error}</div>;

  return (
    <Container>
      <Title>Favorite Hotels</Title>
      {favorites.length === 0 ? (
        <p>No favorite Hotel found.</p>
      ) : (
        favorites.map((bookmark, index) => (
          <HotelCard key={index}>
            <h2>{bookmark.name}</h2>
            <HotelImageWrapper>
              {bookmark.imageUrls && bookmark.imageUrls.length > 0 ? (
                bookmark.imageUrls.map((url, i) => (
                  <HotelImage key={i} src={url} alt={bookmark.name} />
                ))
              ) : (
                <p>No images available</p>
              )}
            </HotelImageWrapper>
            <p>Stars: {bookmark.stars || "N/A"}</p>
            <p>Address: {bookmark.address || "N/A"}</p>
            <p>Distance: {bookmark.distance || "N/A"}</p>
            <HotelButton>
              <a href={formatDeeplink(bookmark.websiteLink)} target="_blank" rel="noopener noreferrer">
                Visit Website
              </a>
            </HotelButton>
            <FavoriteButton onClick={() => handleFavorite(bookmark)}>
              {favorites.some((fav) => fav.id === bookmark.id)
                ? "Unfavorite"
                : "Favorite"}
            </FavoriteButton>
          </HotelCard>
        ))
      )}
    </Container>
  );
};

export default Favorites;
