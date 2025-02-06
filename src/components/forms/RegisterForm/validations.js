export const validateForm = (formData) => {
  const newErrors = {};

  if (
    !formData.name.first ||
    formData.name.first.length < 2 ||
    formData.name.first.length > 256
  ) {
    newErrors.firstName = "First name must be between 2 and 256 characters";
  }

  if (
    !formData.name.last ||
    formData.name.last.length < 2 ||
    formData.name.last.length > 256
  ) {
    newErrors.lastName = "Last name must be between 2 and 256 characters";
  }

  const phoneRegex = /^0[2-9]\d{7,8}$/;
  if (!formData.phone || !phoneRegex.test(formData.phone)) {
    newErrors.phone = "Please enter a valid Israeli phone number";
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!formData.email || !emailRegex.test(formData.email)) {
    newErrors.email = "Please enter a valid email address";
  }

  if (
    !formData.password ||
    formData.password.length < 7 ||
    formData.password.length > 20
  ) {
    newErrors.password = "Password must be between 7 and 20 characters";
  }

  const requiredAddressFields = ["country", "city", "street", "houseNumber"];
  requiredAddressFields.forEach((field) => {
    if (!formData.address[field]) {
      newErrors[`address_${field}`] = `${
        field.charAt(0).toUpperCase() + field.slice(1)
      } is required`;
    }
  });

  return newErrors;
};
