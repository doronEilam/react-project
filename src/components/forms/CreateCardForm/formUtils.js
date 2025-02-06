export const INITIAL_FORM_STATE = {
  title: "",
  subtitle: "",
  description: "",
  phone: "",
  email: "",
  web: "",
  imageUrl: "",
  imageAlt: "",
  state: "",
  country: "",
  city: "",
  street: "",
  houseNumber: "",
  zip: "",
};

export const formatCardData = (formData) => ({
  title: formData.title,
  subtitle: formData.subtitle,
  description: formData.description,
  phone: formData.phone,
  email: formData.email,
  web: formData.web,
  image: {
    url: formData.imageUrl,
    alt: formData.imageAlt,
  },
  address: {
    state: formData.state,
    country: formData.country,
    city: formData.city,
    street: formData.street,
    houseNumber: formData.houseNumber ? parseInt(formData.houseNumber) : 0,
    zip: formData.zip ? parseInt(formData.zip) : 0,
  },
});
