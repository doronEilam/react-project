import React, { useEffect, useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Box,
  Button,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { cardsService } from "../services/cardsService";
import { useNavigate } from "react-router-dom";

const BusinessCard = ({ card, onUpdate, isMyCard }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const isUserLocal = localStorage.getItem("user");
  const navigate = useNavigate();

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

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
  };

  const handleDeleteConfirm = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please log in to delete cards");
        return;
      }

      const response = await axios.delete(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${card._id}`,
        {
          headers: {
            'x-auth-token': token
          }
        }
      );

      if (response.status === 200) {
        setDeleteDialogOpen(false);
        if (onUpdate) onUpdate();
      }
    } catch (error) {
      console.error("Error deleting card:", error);
      alert(error.response?.data?.message || "Failed to delete card");
    }
  };

  const handleEdit = () => {
    navigate(`/EditCard/${card._id}`);
  };

  return (
    <Card sx={{ maxWidth: 345, position: "relative" }}>
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
        <Box sx={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
          width: "100%",
          px: 1 
        }}>
          <Box sx={{ display: "flex", gap: 1 }}>
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
          
          {isMyCard && (
            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton 
                size="small" 
                onClick={handleEdit}
                sx={{ color: "primary.main" }}
              >
                <EditIcon />
              </IconButton>
              <IconButton 
                size="small" 
                onClick={handleDeleteClick}
                sx={{ color: "error.main" }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          )}
        </Box>
      </CardActions>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">
          Delete Card
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to delete "{card.title}"? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default BusinessCard;