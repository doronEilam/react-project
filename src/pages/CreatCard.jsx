import React from "react";
import { Container, Typography } from "@mui/material";
import CreateCardForm from "../components/forms/CreateCardForm/CreateCardForm";

const CreateCard = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom sx={{ mt: 3, mb: 4 }}>
        Business Card Creation
      </Typography>
      <CreateCardForm />
    </Container>
  );
};

export default CreateCard;
