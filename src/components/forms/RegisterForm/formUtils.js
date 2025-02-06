export const initialFormData = {
  name: {
    first: "",
    middle: "",
    last: "",
  },
  phone: "",
  email: "",
  password: "",
  image: {
    url: "https://cdn.pixabay.com/photo/2016/04/01/10/11/avatar-1299805_960_720.png",
    alt: "user avatar",
  },
  address: {
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",
  },
  isBusiness: false,
};

export const handleFormChange = (e, formData, setFormData) => {
  const { name, value, type, checked } = e.target;

  if (type === "checkbox") {
    setFormData((prev) => ({
      ...prev,
      isBusiness: checked,
    }));
    return;
  }

  const fieldPath = name.split(".");
  if (fieldPath.length === 1) {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  } else {
    const [parent, child] = fieldPath;
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [child]: value,
      },
    }));
  }
};
