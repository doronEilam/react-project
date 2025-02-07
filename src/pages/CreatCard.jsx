import React from "react";
import { Container, Typography } from "@mui/material";
import CreateCardForm from "../components/forms/CreateCardForm/CreateCardForm";
import { useParams } from "react-router-dom";

const CreateCard = () => {
  const { id } = useParams();
  const isEditMode=Boolean(id);

  return (
    <Container>
      <Typography variant="h4" gutterBottom sx={{ mt: 3, mb: 4 }}>
        {isEditMode ?"Edit Business Card ":"  Business Card Creation"}
      </Typography>
      <CreateCardForm cardId={id} isEditMode={isEditMode} />
    </Container>
  );
};

export default CreateCard;
