import React from "react";
import {
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
  Typography,
} from "@mui/material";

export const RegisterFormFields = ({ formData, handleChange, errors }) => {
  const renderTextField = (name, label, options = {}) => (
    <TextField
      fullWidth
      label={label}
      name={name}
      value={name.split(".").reduce((obj, key) => obj[key], formData)}
      onChange={handleChange}
      error={!!errors[name.split(".")[1]]}
      helperText={errors[name.split(".")[1]]}
      {...options}
    />
  );

  return (
    <Grid container spacing={2}>
      {/* Personal Information */}
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Personal Information
        </Typography>
      </Grid>

      <Grid item xs={12} sm={6}>
        {renderTextField("name.first", "First Name")}
      </Grid>
      <Grid item xs={12} sm={6}>
        {renderTextField("name.middle", "Middle Name")}
      </Grid>
      <Grid item xs={12} sm={6}>
        {renderTextField("name.last", "Last Name")}
      </Grid>
      <Grid item xs={12} sm={6}>
        {renderTextField("phone", "Phone")}
      </Grid>
      <Grid item xs={12} sm={6}>
        {renderTextField("email", "Email")}
      </Grid>
      <Grid item xs={12} sm={6}>
        {renderTextField("password", "Password", { type: "password" })}
      </Grid>

      {/* Image Information */}
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Profile Image
        </Typography>
      </Grid>

      <Grid item xs={12} sm={6}>
        {renderTextField("image.url", "Image URL")}
      </Grid>
      <Grid item xs={12} sm={6}>
        {renderTextField("image.alt", "Image Alt Text")}
      </Grid>

      {/* Address Information */}
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Address
        </Typography>
      </Grid>

      <Grid item xs={12} sm={6}>
        {renderTextField("address.state", "State")}
      </Grid>
      <Grid item xs={12} sm={6}>
        {renderTextField("address.country", "Country")}
      </Grid>
      <Grid item xs={12} sm={6}>
        {renderTextField("address.city", "City")}
      </Grid>
      <Grid item xs={12} sm={6}>
        {renderTextField("address.street", "Street")}
      </Grid>
      <Grid item xs={12} sm={6}>
        {renderTextField("address.houseNumber", "House Number")}
      </Grid>
      <Grid item xs={12} sm={6}>
        {renderTextField("address.zip", "Zip Code")}
      </Grid>

      {/* Business Account Checkbox */}
      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.isBusiness}
              onChange={handleChange}
              name="isBusiness"
              color="primary"
            />
          }
          label="Register as Business Account"
        />
      </Grid>

      {/* Error Messages */}
      {Object.keys(errors).map(
        (key) =>
          errors[key] && (
            <Grid item xs={12} key={key}>
              <Typography color="error" variant="caption">
                {errors[key]}
              </Typography>
            </Grid>
          )
      )}
    </Grid>
  );
};

export default RegisterFormFields;
