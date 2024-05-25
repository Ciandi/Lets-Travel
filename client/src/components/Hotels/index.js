// import React, { useState } from "react";
// import axios from "axios";
// import {
//   Container,
//   Title,
//   InputWrapper,
//   Button,
//   ErrorMessage,
//   HotelCard,
//   HotelImageWrapper,
//   HotelImage,
//   HotelButton,
//   FavoriteButton
// } from "./styles";

// const Hotels = () => {
//   const [checkIn, setCheckIn] = useState("2024-05-23");
//   const [checkOut, setCheckOut] = useState("2024-05-24");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [hotels, setHotels] = useState([]);
//   const [favorites, setFavorites] = useState([]);

//   const fetchHotelSearch = async () => {
//     const options = {
//       method: "GET",
//       url: "https://sky-scanner3.p.rapidapi.com/hotels/search",
//       params: {
//         entityId: "27536613", // Montreal's entityId from the JSON
//         checkin: checkIn,
//         checkout: checkOut,
//       },
//       headers: {
//         "X-RapidAPI-Key": "d11920e9a8msh4bd749acb435e23p168356jsnf4455a8795c6",
//         "X-RapidAPI-Host": "sky-scanner3.p.rapidapi.com",
//       },
//     };

//     try {
//       setLoading(true);
//       setError(null);
//       const response = await axios.request(options);
//       console.log("Search response data:", response.data);
//       const hotelCards = response.data.data.results.hotelCards || [];
//       if (!Array.isArray(hotelCards)) {
//         throw new Error("hotelCards is not an array");
//       }
//       const hotelsWithDetails = await fetchHotelDetails(hotelCards);
//       setHotels(hotelsWithDetails);
//     } catch (error) {
//       console.error("Error fetching search data:", error);
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchHotelDetails = async (hotelCards) => {
//     const detailsOptions = {
//       method: "GET",
//       url: "https://sky-scanner3.p.rapidapi.com/hotels/detail",
//       headers: {
//         "X-RapidAPI-Key": "d11920e9a8msh4bd749acb435e23p168356jsnf4455a8795c6",
//         "X-RapidAPI-Host": "sky-scanner3.p.rapidapi.com",
//       },
//     };

//     const pricesOptions = {
//       method: "GET",
//       url: "https://sky-scanner3.p.rapidapi.com/hotels/prices",
//       headers: {
//         "X-RapidAPI-Key": "d11920e9a8msh4bd749acb435e23p168356jsnf4455a8795c6",
//         "X-RapidAPI-Host": "sky-scanner3.p.rapidapi.com",
//       },
//     };

//     try {
//       const hotelDetailsPromises = hotelCards.map(async (hotel) => {
//         const detailsResponse = await axios.request({
//           ...detailsOptions,
//           params: { id: hotel.id },
//         });
//         const pricesResponse = await axios.request({
//           ...pricesOptions,
//           params: {
//             hotelId: hotel.hotelId,
//             checkin: checkIn,
//             checkout: checkOut,
//           },
//         });

//         // Additional: Get the image URLs and website link from the hotel card
//         const imageUrls = hotel.images || [];
//         const websiteLink = pricesResponse.data.data.rates[0].deeplink || "";

//         return {
//           id: hotel.id, 
//           name: detailsResponse.data.data.general.name,
//           stars: detailsResponse.data.data.general.stars,
//           address: detailsResponse.data.data.location.address,
//           distance: detailsResponse.data.data.distance,
//           price: pricesResponse.data.data.cheapestPrice.price,
//           totalWithTaxes: pricesResponse.data.data.cheapestPrice.totalWithTaxes,
//           imageUrls: imageUrls,
//           websiteLink: websiteLink, 
//         };
//       });

//       return await Promise.all(hotelDetailsPromises);
//     } catch (error) {
//       console.error("Error fetching hotel details:", error);
//       setError(error.message);
//       return [];
//     }
//   };

//   const handleSearch = async () => {
//     await fetchHotelSearch();
//   };

//   const handleFavorite = (hotel) => {
//     setFavorites((prevFavorites) => {
//       if (prevFavorites.some((fav) => fav.id === hotel.id)) {
//         return prevFavorites.filter((fav) => fav.id !== hotel.id);
//       } else {
//         return [...prevFavorites, hotel];
//       }
//     });
//   };

//   return (
//     <Container>
//       <Title>Hotel Search</Title>
//       <InputWrapper>
//         <label>Check-In Date:</label>
//         <input
//           type="date"
//           value={checkIn}
//           onChange={(e) => setCheckIn(e.target.value)}
//         />
//       </InputWrapper>
//       <InputWrapper>
//         <label>Check-Out Date:</label>
//         <input
//           type="date"
//           value={checkOut}
//           onChange={(e) => setCheckOut(e.target.value)}
//         />
//       </InputWrapper>
//       <Button onClick={handleSearch}>Search Hotels</Button>
//       {loading && <p>Loading...</p>}
//       {error && <ErrorMessage>Error: {error}</ErrorMessage>}
//       {hotels.map((hotel, index) => (
//         <HotelCard key={index}>
//           <h2>{hotel.name}</h2>
//           <HotelImageWrapper>
//             {hotel.imageUrls.map((imageUrl, i) => (
//               <HotelImage
//                 key={i}
//                 src={imageUrl}
//                 alt={`Hotel ${index + 1} Image ${i + 1}`}
//               />
//             ))}
//           </HotelImageWrapper>
//           <p>Stars: {hotel.stars}</p>
//           <p>Address: {hotel.address}</p>
//           <p>Distance: {hotel.distance}</p>
//           <p>Price: {hotel.price}</p>
//           <p>Total with Taxes: {hotel.totalWithTaxes}</p>
//           <HotelButton>
//             <a
//               href={hotel.websiteLink}
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               Visit Website
//             </a>
//           </HotelButton>
//           <FavoriteButton
//             isFavorite={favorites.some((fav) => fav.id === hotel.id)}
//             onClick={() => handleFavorite(hotel)}
//           >
//             {favorites.some((fav) => fav.id === hotel.id)
//               ? "Unfavorite"
//               : "Favorite"}
//           </FavoriteButton>
//         </HotelCard>
//       ))}
//     </Container>
//   );
// };

// export default Hotels;

import React, { useState, useContext } from "react";
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
  const [checkIn, setCheckIn] = useState("2024-05-25");
  const [checkOut, setCheckOut] = useState("2024-05-26");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hotels, setHotels] = useState([]);
  const [favorites, setFavorites] = useState([]);

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
        "X-RapidAPI-Key": "affa7075b1msh36357168ea8763dp18b567jsna2e5f8c6e4f3",
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
      const hotelsWithDetails = await fetchHotelDetails(hotelCards.slice(0, 2)); // Limit to first two hotels
      setHotels(hotelsWithDetails);
    } catch (error) {
      console.error("Error fetching search data:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchHotelDetails = async (hotelCards) => {
    const detailsOptions = {
      method: "GET",
      url: "https://sky-scanner3.p.rapidapi.com/hotels/detail",
      headers: {
        "X-RapidAPI-Key": "affa7075b1msh36357168ea8763dp18b567jsna2e5f8c6e4f3",
        "X-RapidAPI-Host": "sky-scanner3.p.rapidapi.com",
      },
    };

    const pricesOptions = {
      method: "GET",
      url: "https://sky-scanner3.p.rapidapi.com/hotels/prices",
      headers: {
        "X-RapidAPI-Key": "affa7075b1msh36357168ea8763dp18b567jsna2e5f8c6e4f3",
        "X-RapidAPI-Host": "sky-scanner3.p.rapidapi.com",
      },
    };

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
        const rates = pricesResponse.data.data.rates || [];
        let websiteLink = rates.length > 0 ? rates[0].deeplink : "";

  
        if (
          websiteLink &&
          !websiteLink.startsWith("http://") &&
          !websiteLink.startsWith("https://")
        ) {
          websiteLink = "https://" + websiteLink;
        }

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
          websiteLink: websiteLink,
        };
      });

      return await Promise.all(hotelDetailsPromises);
    } catch (error) {
      console.error("Error fetching hotel details:", error);
      setError(error.message);
      return [];
    }
  };

  const handleSearch = async () => {
    await fetchHotelSearch();
  };

  const handleFavorite = async (hotel) => {
    try {
      if (!loggedInUser) {

        return;
      }

      const response = await axios.post("/addFavorite", {
        username: loggedInUser.username,
        hotelId: hotel.id,
      });
      if (response.status === 200) {
        setFavorites((prevFavorites) =>
          prevFavorites.some((fav) => fav.id === hotel.id)
            ? prevFavorites.filter((fav) => fav.id !== hotel.id)
            : [...prevFavorites, hotel]
        );
      }
    } catch (error) {
      console.error("Error handling favorite:", error);
    }
  };

  return (
    <Container>
      <Title>Hotel Search</Title>
      <InputWrapper>
        <label>Check-In Date:</label>
        <input
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
        />
      </InputWrapper>
      <InputWrapper>
        <label>Check-Out Date:</label>
        <input
          type="date"
          value={checkOut}
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
            <a
              href={hotel.websiteLink}
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
