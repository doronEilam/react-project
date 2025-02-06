import React, { useEffect, useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Box,
  Button,
  Typography,
} from "@mui/material";
import {
  Phone as PhoneIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
} from "@mui/icons-material";
import { cardsService } from "../services/cardsService";

const BusinessCard = ({ card }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const isUserLocal = localStorage.getItem("user");

  useEffect(() => {
    const checkIsFavorite = () => {
      try {
        const cardFavorite = JSON.parse(localStorage.getItem("cardfavorite"));
        if (cardFavorite) {
          setIsFavorite(cardFavorite.includes(card._id));
        }
      } catch (error) {
        console.error(error);
      }
    };
    checkIsFavorite();
  }, [card._id]);

  const handleFavorite = async () => {
    const getTokenLocal = localStorage.getItem("token");

    if (!getTokenLocal) {
      alert("Please log in to add to favorites");
      return;
    }

    try {
      await cardsService.likeCard(card._id);

      let favorite = [];
      try {
        favorite = JSON.parse(localStorage.getItem("cardfavorite")) || [];
      } catch {
        localStorage.setItem("cardfavorite", JSON.stringify(favorite));
      }

      const isCurrentFavorite = favorite.includes(card._id);
      if (isCurrentFavorite) {
        const newFavorite = favorite.filter((id) => id !== card._id);
        localStorage.setItem("cardfavorite", JSON.stringify(newFavorite));
      } else {
        favorite.push(card._id);
        localStorage.setItem("cardfavorite", JSON.stringify(favorite));
      }

      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Error updating favorite:", error);
    }
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={card.image.url}
        title={card.image.alt}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {card.title}
        </Typography>
        <Typography gutterBottom variant="h6" component="p">
          {card.subtitle}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {card.description}
        </Typography>
        <Box sx={{ height: "0.4px", width: "100%", bgcolor: "gray", my: 1 }} />
        <ul>
          <li>
            <Typography component="span" sx={{ fontWeight: "bold" }}>
              Phone:
            </Typography>{" "}
            {card.phone}
          </li>
          <li>
            <Typography component="span" sx={{ fontWeight: "bold" }}>
              Address:
            </Typography>{" "}
            {`${card.address.street} ${card.address.houseNumber} ${card.address.city}`}
          </li>
          <li>
            <Typography component="span" sx={{ fontWeight: "bold" }}>
              Card Number:
            </Typography>{" "}
            {card.bizNumber}
          </li>
        </ul>
      </CardContent>
      <CardActions>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
          <PhoneIcon />
          {isUserLocal && (
            <Button
              size="small"
              onClick={handleFavorite}
              sx={{
                outline: "none",
                border: "none",
                bgcolor: "transparent",
                cursor: "pointer",
                "&:focus": {
                  outline: "none",
                  boxShadow: "none",
                },
                "&:hover": {
                  bgcolor: "transparent",
                },
                minWidth: "auto",
                p: 0,
              }}
            >
              {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </Button>
          )}
        </Box>
      </CardActions>
    </Card>
  );
};

export default BusinessCard;
