import { apiClient } from "./api";

export const cardsService = {
  createCard: async ({
    title,
    subtitle,
    description,
    phone,
    email,
    web,
    image,
    address,
  }) => {
    try {
      const { data } = await apiClient.post("/cards", {
        title,
        subtitle,
        description,
        phone,
        email,
        web,
        image: {
          url: image.url,
          alt: image.alt,
        },
        address: {
          state: address.state || "",
          country: address.country,
          city: address.city,
          street: address.street,
          houseNumber: address.houseNumber,
          zip: address.zip,
        },
      });
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to create card");
    }
  },

  getAll: async () => {
    try {
      const { data } = await apiClient.get("/cards");
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to get cards");
    }
  },

  getCard: async (cardId) => {
    try {
      const { data } = await apiClient.get(`/cards/${cardId}`);
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to get card");
    }
  },

  getMyCards: async () => {
    try {
      const { data } = await apiClient.get("/cards/my-cards");
      return data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to get your cards"
      );
    }
  },

  updateCard: async (
    cardId,
    { title, subtitle, description, phone, email, web, image, address }
  ) => {
    try {
      const { data } = await apiClient.put(`/cards/${cardId}`, {
        title,
        subtitle,
        description,
        phone,
        email,
        web,
        image: {
          url: image.url,
          alt: image.alt,
        },
        address: {
          state: address.state || "",
          country: address.country,
          city: address.city,
          street: address.street,
          houseNumber: address.houseNumber,
          zip: address.zip,
        },
      });
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to update card");
    }
  },

  deleteCard: async (cardId) => {
    try {
      const { data } = await apiClient.delete(`/cards/${cardId}`);
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to delete card");
    }
  },

  likeCard: async (cardId) => {
    try {
      const { data } = await apiClient.patch(`/cards/${cardId}`);
      return data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to like/unlike card"
      );
    }
  },

  updateBizNumber: async (cardId, bizNumber) => {
    try {
      const { data } = await apiClient.patch(`/cards/${cardId}`, { bizNumber });
      return data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to update business number"
      );
    }
  },
};

export default cardsService;
