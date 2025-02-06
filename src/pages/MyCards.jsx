import { useEffect, useState } from "react";
import { Grid, Container, Typography, Box, Alert } from "@mui/material";
import BusinessCard from "../components/BusinessCard";
import { useSearch } from "../contexts/SearchContext";
import axios from "axios";

export default function MyCards() {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { searchQuery } = useSearch();
  console.log("from my card", searchQuery);
  const handleGetAllCards = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Check if user exists
      const userStr = localStorage.getItem("user");
      if (!userStr) {
        setError("Please log in to view your cards");
        return;
      }

      const userObj = JSON.parse(userStr);
      const userId = userObj._id;

      if (!userId) {
        setError("User ID not found");
        return;
      }

      const response = await axios.get(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards"
      );

      if (!response.data) {
        setError("No data received from server");
        return;
      }

      const userCards = response.data.filter((card) => card.user_id === userId);
      setCards(userCards);
    } catch (error) {
      console.error("Error fetching cards:", error);
      setError(error.response?.data?.message || "Failed to fetch cards");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetAllCards();
  }, []);

  const filteredCards = cards.filter(
    (card) =>
      Object.values(card)
        .join(" ")
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      card.address?.city?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.address?.street?.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
          <Typography variant="body1">
            Please try refreshing the page or logging in again.
          </Typography>
        </Box>
      </Container>
    );
  }

  if (cards.length === 0) {
    return (
      <Container>
        <Box sx={{ textAlign: "center", py: 4 }}>
          <Typography variant="h6" color="text.secondary">
            You haven't created any cards yet.
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Cards
      </Typography>

      {searchQuery && filteredCards.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 4 }}>
          <Typography color="text.secondary">
            No cards match your search for "{searchQuery}"
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={2}>
          {filteredCards.map((card) => (
            <Grid item xs={12} sm={6} md={4} key={card._id}>
              <BusinessCard card={card} onUpdate={handleGetAllCards} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
