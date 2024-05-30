import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Title,
  InputWrapper,
  Button,
  ErrorMessage,
  HotelCard,
  HotelImageWrapper,
  HotelImage,
  HotelButton,
  FavoriteButton,
} from "./styles";
import { LoggedInUserContext } from "../../contexts/LoggedInUserContext";

const Hotels = () => {
  const { loggedInUser } = useContext(LoggedInUserContext);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hotels, setHotels] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [today, setToday] = useState("");

  //Up to date 
  useEffect(() => {
    const todayDate = new Date().toISOString().split("T")[0];
    const tomorrowDate = new Date();
    tomorrowDate.setDate(tomorrowDate.getDate() + 1);
    const tomorrowStr = tomorrowDate.toISOString().split("T")[0];

    setToday(todayDate);
    setCheckIn(todayDate);
    setCheckOut(tomorrowStr);
  }, []);

  //API for hotel search, set destination montreal
  const fetchHotelSearch = async () => {
    const options = {
      method: "GET",
      url: "https://sky-scanner3.p.rapidapi.com/hotels/search",
      params: {
        entityId: "27536613", // Montreal's entityId from the JSON
        checkin: checkIn,
        checkout: checkOut,
      },
      headers: {
        "X-RapidAPI-Key": "8b8891d246msh6e19dacfb8aeed2p1b22fejsn9e8bf6c7893d",
        "X-RapidAPI-Host": "sky-scanner3.p.rapidapi.com",
      },
    };

    try {
      setLoading(true);
      setError(null);
      const response = await axios.request(options);
      console.log("Search response data:", response.data);
      const hotelCards = response.data.data.results.hotelCards || [];
      if (!Array.isArray(hotelCards)) {
        throw new Error("hotelCards is not an array");
      }
      // Slice 2 for now only, too many api request
      const hotelsWithDetails = await fetchHotelDetails(hotelCards.slice(0, 2));
      setHotels(hotelsWithDetails);
    } catch (error) {
      console.error("Error fetching search data:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  //API for hotel detail
  const fetchHotelDetails = async (hotelCards) => {
    const detailsOptions = {
      method: "GET",
      url: "https://sky-scanner3.p.rapidapi.com/hotels/detail",
      headers: {
        "X-RapidAPI-Key": "8b8891d246msh6e19dacfb8aeed2p1b22fejsn9e8bf6c7893d",
        "X-RapidAPI-Host": "sky-scanner3.p.rapidapi.com",
      },
    };

    //API for hotel prices and websitelink
    const pricesOptions = {
      method: "GET",
      url: "https://sky-scanner3.p.rapidapi.com/hotels/prices",
      headers: {
        "X-RapidAPI-Key": "8b8891d246msh6e19dacfb8aeed2p1b22fejsn9e8bf6c7893d",
        "X-RapidAPI-Host": "sky-scanner3.p.rapidapi.com",
      },
    };

    // Map and display each hotelcards
    try {
      const hotelDetailsPromises = hotelCards.map(async (hotel) => {
        const detailsResponse = await axios.request({
          ...detailsOptions,
          params: { id: hotel.id },
        });
        const pricesResponse = await axios.request({
          ...pricesOptions,
          params: {
            hotelId: hotel.hotelId,
            checkin: checkIn,
            checkout: checkOut,
          },
        });

        const imageUrls = hotel.images || [];


        //important data for each hotelCard
        return {
          id: hotel.id,
          name: detailsResponse.data.data.general.name,
          stars: detailsResponse.data.data.general.stars,
          address: detailsResponse.data.data.location.address,
          distance: detailsResponse.data.data.distance,
          price: pricesResponse.data.data.cheapestPrice
            ? pricesResponse.data.data.cheapestPrice.price
            : null,
          totalWithTaxes: pricesResponse.data.data.cheapestPrice
            ? pricesResponse.data.data.cheapestPrice.totalWithTaxes
            : null,
          imageUrls: imageUrls,
          websiteLink: pricesResponse.data.data.metaInfo.rates[0].deeplink
        };
      });

      return await Promise.all(hotelDetailsPromises);
    } catch (error) {
      console.error("Error fetching hotel details:", error);
      setError(error.message);
      return [];
    }
  };

  //Date checkin to be before datecheckout
  const handleSearch = async () => {
    if (new Date(checkOut) <= new Date(checkIn)) {
      setError("Checkout date must be later than check-in date.");
      return;
    }
    setError(null);
    await fetchHotelSearch();
  };

  //Add favorite and delete favorite endpoint
  const handleFavorite = async (hotel) => {
    try {
      if (!loggedInUser) {
        return;
      }
  
      const isFavorite = favorites.some((fav) => fav.id === hotel.id);
      const endpoint = isFavorite ? "/deleteFavorite" : "/addFavorite";
      
      const response = await axios.post(endpoint, {
        username: loggedInUser.username,
        hotel: {
          id: hotel.id,
          name: hotel.name,
          stars: hotel.stars,
          address: hotel.address,
          distance: hotel.distance,
          price: hotel.price,
          totalWithTaxes: hotel.totalWithTaxes,
          imageUrls: hotel.imageUrls,
          websiteLink: hotel.websiteLink,
        },
      });
  
      if (response.status === 200) {
        setFavorites((prevFavorites) =>
          isFavorite
            ? prevFavorites.filter((fav) => fav.id !== hotel.id)
            : [...prevFavorites, hotel]
        );
      }
    } catch (error) {
      console.error("Error handling favorite:", error);
    }
  };
  

  //since in localhost3000, set default http://
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


  return (
    <Container>
      <Title>Hotel Search</Title>
      <InputWrapper>
        <label>Check-In Date:</label>
        <input
          type="date"
          value={checkIn}
          min={today}
          onChange={(e) => {
            setCheckIn(e.target.value);
            if (new Date(checkOut) <= new Date(e.target.value)) {
              const newCheckOut = new Date(e.target.value);
              newCheckOut.setDate(newCheckOut.getDate() + 1);
              setCheckOut(newCheckOut.toISOString().split("T")[0]);
            }
          }}
        />
      </InputWrapper>
      <InputWrapper>
        <label>Check-Out Date:</label>
        <input
          type="date"
          value={checkOut}
          min={checkIn}
          onChange={(e) => setCheckOut(e.target.value)}
        />
      </InputWrapper>
      <Button onClick={handleSearch}>Search Hotels</Button>
      {loading && <p>Loading...</p>}
      {error && <ErrorMessage>Error: {error}</ErrorMessage>}
      {hotels.map((hotel, index) => (
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
            {/* formatDeeplink to be added here */}
            <a
              href={formatDeeplink(hotel.websiteLink)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit Website
            </a>
          </HotelButton>
          <FavoriteButton onClick={() => handleFavorite(hotel)}>
            {favorites.some((fav) => fav.id === hotel.id)
              ? "Unfavorite"
              : "Favorite"}
          </FavoriteButton>
        </HotelCard>
      ))}
    </Container>
  );
};

export default Hotels;
