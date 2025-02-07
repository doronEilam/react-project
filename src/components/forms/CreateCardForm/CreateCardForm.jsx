import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Paper,
  Grid,
  Button,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { cardsService } from "../../../services/cardsService";
import { CreateCardFormFields } from "./CreateCardFormFields";
import { INITIAL_FORM_STATE, formatCardData } from "./formUtils";
import { validateForm } from "./validations";
import axios from "axios";

const CreateCardForm = ({ cardId, isEditMode }) => {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCardData = async () => {
      if (isEditMode && cardId) {
        try {
          setIsLoading(true);
          const response = await axios.get(
            `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${cardId}`
          );
          
          const card = response.data;
          setFormData({
            title: card.title,
            subtitle: card.subtitle,
            description: card.description,
            phone: card.phone,
            email: card.email,
            web: card.web,
            imageUrl: card.image.url,
            imageAlt: card.image.alt,
            state: card.address.state,
            country: card.address.country,
            city: card.address.city,
            street: card.address.street,
            houseNumber: card.address.houseNumber,
            zip: card.address.zip,
          });
        } catch (error) {
          setError("Failed to fetch card data");
          console.error("Error fetching card:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchCardData();
  }, [isEditMode, cardId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleCancel = () => {
    if (
      window.confirm(
        "Are you sure you want to cancel? All changes will be lost"
      )
    ) {
      navigate("/my-cards");
    }
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset the form?")) {
      setFormData(isEditMode ? formData : INITIAL_FORM_STATE);
      setFormErrors({});
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please log in to continue");
      return;
    }

    try {
      setIsLoading(true);
      const cardData = formatCardData(formData);

      if (isEditMode) {
        await axios.put(
          `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${cardId}`,
          cardData,
          {
            headers: {
              'x-auth-token': token
            }
          }
        );
        alert("Card updated successfully!");
      } else {
        await cardsService.createCard(cardData);
        alert("Card created successfully!");
      }
      
      navigate("/my-cards");
    } catch (error) {
      setError(error.response?.data?.message || `Failed to ${isEditMode ? 'update' : 'create'} card`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ width: "100%", mb: 4 }}>
      <Paper elevation={3}>
        <Grid container spacing={2} sx={{ p: 3 }}>
          {error && (
            <Grid item xs={12}>
              <Alert severity="error">{error}</Alert>
            </Grid>
          )}

          <Grid item xs={12}>
            <Box component="form" onSubmit={handleSubmit}>
              <CreateCardFormFields
                formData={formData}
                handleChange={handleChange}
                formErrors={formErrors}
              />

              {/* Buttons */}
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  justifyContent: "flex-end",
                  mt: 2,
                }}
              >
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleCancel}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleReset}
                  disabled={isLoading}
                >
                  Reset
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <CircularProgress size={24} />
                  ) : isEditMode ? (
                    "Save Changes"
                  ) : (
                    "Create Card"
                  )}
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default CreateCardForm;