import React, { useState } from "react";
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

const CreateCardForm = () => {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

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
        "Are you sure you want to cancel? All entered data will be lost"
      )
    ) {
      setFormData(INITIAL_FORM_STATE);
      navigate("/");
    }
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset the form?")) {
      setFormData(INITIAL_FORM_STATE);
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
      setError("Please log in to create a card");
      return;
    }

    try {
      setIsLoading(true);
      const cardData = formatCardData(formData);
      await cardsService.createCard(cardData);
      alert("Card created successfully!");
      navigate("/");
    } catch (error) {
      setError(error.message || "Failed to create card");
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
                  {isLoading ? <CircularProgress size={24} /> : "Create Card"}
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
