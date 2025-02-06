export const validateForm = (formData) => {
  const errors = {};

  const requiredFields = [
    "title",
    "description",
    "phone",
    "email",
    "country",
    "city",
    "street",
  ];

  requiredFields.forEach((field) => {
    if (!formData[field]) {
      errors[field] = "This field is required";
    }
  });

  if (formData.email && !formData.email.includes("@")) {
    errors.email = "Please enter a valid email address";
  }

  if (formData.phone && !/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
    errors.phone = "Please enter a valid 10-digit phone number";
  }

  return errors;
};
