import React, { useEffect, useState } from "react";
import { Grid, Container, Typography, Box } from "@mui/material";
import BusinessCard from "../components/BusinessCard";
import { cardsService } from "../services/cardsService";
import { useSearch } from "../contexts/SearchContext";

const Home = () => {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { searchQuery } = useSearch();

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      setIsLoading(true);
      const data = await cardsService.getAll();
      setCards(data);
    } catch (error) {
      setError(error.message);
      console.error("Error fetching cards:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredCards = cards.filter((card) => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      card.title?.toLowerCase().includes(searchTerm) ||
      card.subtitle?.toLowerCase().includes(searchTerm) ||
      card.description?.toLowerCase().includes(searchTerm) ||
      card.phone?.includes(searchTerm) ||
      card.email?.toLowerCase().includes(searchTerm) ||
      card.address?.city?.toLowerCase().includes(searchTerm) ||
      card.address?.street?.toLowerCase().includes(searchTerm)
    );
  });

  if (isLoading) {
    return (
      <Container>
        <Box sx={{ textAlign: "center", py: 4 }}>
          <Typography>Loading cards...</Typography>
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Box sx={{ py: 4 }}>
          <Typography color="error">Error: {error}</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Business Cards
        </Typography>
        {searchQuery && (
          <Typography color="text.secondary" gutterBottom>
            {filteredCards.length} results for "{searchQuery}"
          </Typography>
        )}
      </Box>

      {filteredCards.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 4 }}>
          <Typography color="text.secondary">
            {searchQuery
              ? `No cards match your search for "${searchQuery}"`
              : "No cards available."}
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filteredCards.map((card) => (
            <Grid item xs={12} sm={6} md={4} key={card._id}>
              <BusinessCard card={card} onUpdate={fetchCards} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Home;
