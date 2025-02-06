import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import { authService } from "../../services/authService";
import RegisterFormFields from "../../components/forms/RegisterForm/RegisterFormFields";
import { validateForm } from "../../components/forms/RegisterForm/validations";
import {
  initialFormData,
  handleFormChange,
} from "../../components/forms/RegisterForm/formUtils";

const Register = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState(initialFormData);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setIsLoading(true);
    try {
      await authService.register(formData);
      navigate("/login");
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        submit: error.message || "Registration failed. Please try again.",
      }));
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (
      window.confirm("Are you sure you want to cancel? All data will be lost.")
    ) {
      navigate("/");
    }
  };

  const onChange = (e) => {
    handleFormChange(e, formData, setFormData);
    // Clear errors for the changed field
    const fieldName = e.target.name.split(".")[1] || e.target.name;
    if (errors[fieldName]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ width: "100%", my: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Box
            sx={{
              mb: 3,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h4" component="h1">
              Register
            </Typography>
            {isLoading && <CircularProgress size={24} />}
          </Box>

          {errors.submit && (
            <Typography
              color="error"
              sx={{
                mb: 2,
                p: 2,
                bgcolor: "error.light",
                borderRadius: 1,
              }}
            >
              {errors.submit}
            </Typography>
          )}

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <RegisterFormFields
              formData={formData}
              handleChange={onChange}
              errors={errors}
            />

            <Box
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: "flex-end",
                mt: 4,
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
                variant="contained"
                color="primary"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Registering..." : "Register"}
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Register;
