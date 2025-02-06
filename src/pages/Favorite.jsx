import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  CircularProgress,
  Box,
} from "@mui/material";
import BusinessCard from "../components/BusinessCard";
import { cardsService } from "../services/cardsService";

const Favorite = () => {
  const [favoriteCards, setFavoriteCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavoriteCards = async () => {
      try {
        setIsLoading(true);
        const favoriteIdsString = localStorage.getItem("cardfavorite");

        if (!favoriteIdsString) {
          setFavoriteCards([]);
          return;
        }

        const favoriteIds = JSON.parse(favoriteIdsString);

        if (!Array.isArray(favoriteIds)) {
          throw new Error("Invalid favorite cards data structure");
        }

        const cardsPromises = favoriteIds.map((id) => cardsService.getCard(id));
        const cards = await Promise.all(cardsPromises);

        setFavoriteCards(cards);
      } catch (error) {
        console.error("Error fetching favorite cards:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavoriteCards();
  }, []);

  if (isLoading) {
    return (
      <Container>
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography color="error" sx={{ py: 4 }}>
          Error: {error}
        </Typography>
      </Container>
    );
  }

  if (favoriteCards.length === 0) {
    return (
      <Container>
        <Typography variant="h5" sx={{ py: 4, textAlign: "center" }}>
          No favorite cards yet
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        My Favorite Cards
      </Typography>
      <Grid container spacing={3}>
        {favoriteCards.map((card) => (
          <Grid item xs={12} sm={6} md={4} key={card._id}>
            <BusinessCard card={card} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Favorite;
