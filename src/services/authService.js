import { apiClient } from "./api";
import { jwtDecode } from "jwt-decode";

export const authService = {
  login: async (email, password) => {
    try {
      const { data } = await apiClient.post("/users/login", {
        email,
        password,
      });
      if (data) {
        localStorage.setItem("token", data);
        localStorage.setItem("user", JSON.stringify(jwtDecode(data)));
        return data;
      }
    } catch (error) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
  },

  register: async ({
    name,
    phone,
    email,
    password,
    image,
    address,
    isBusiness,
  }) => {
    try {
      const { data } = await apiClient.post("/users", {
        name: {
          first: name.first,
          middle: name.middle || "",
          last: name.last,
        },
        phone,
        email,
        password,
        image: {
          url: image.url,
          alt: image.alt,
        },
        address: {
          state: address.state || "",
          country: address.country,
          city: address.city,
          street: address.street,
          zip: address.zip,
          houseNumber: address.houseNumber,
        },
        isBusiness,
      });

      if (data) {
        return { success: true };
      }
    } catch (error) {
      throw new Error(error.response?.data?.message || "Registration failed");
    }
  },
  setUser: (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    window.dispatchEvent(new Event("auth-change"));
  },
  getUserById: async (userId) => {
    try {
      const { data } = await apiClient.get(`/users/${userId}`);
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to get user");
    }
  },

  getAllUsers: async () => {
    try {
      const { data } = await apiClient.get("/users");
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to get users");
    }
  },

  updateUser: async (userId, userData) => {
    try {
      const { data } = await apiClient.put(`/users/${userId}`, {
        name: {
          first: userData.name.first,
          middle: userData.name.middle || "",
          last: userData.name.last,
        },
        phone: userData.phone,
        image: {
          url: userData.image.url,
          alt: userData.image.alt,
        },
        address: {
          state: userData.address.state || "",
          country: userData.address.country,
          city: userData.address.city,
          street: userData.address.street,
          zip: userData.address.zip,
          houseNumber: userData.address.houseNumber,
        },
      });
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to update user");
    }
  },

  deleteUser: async (userId) => {
    try {
      const { data } = await apiClient.delete(`/users/${userId}`);
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to delete user");
    }
  },

  updateBusinessStatus: async (userId) => {
    try {
      const { data } = await apiClient.patch(`/users/${userId}`);
      return data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to update business status"
      );
    }
  },

  getUser: () => {
    try {
      const token = localStorage.getItem("token");
      return token ? jwtDecode(token) : null;
    } catch {
      return null;
    }
  },

  isLoggedIn: () => {
    try {
      const token = localStorage.getItem("token");
      return !!token;
    } catch {
      return false;
    }
  },

  isAdmin: () => {
    try {
      const user = authService.getUser();
      return user?.isAdmin || false;
    } catch {
      return false;
    }
  },

  isBusiness: () => {
    try {
      const user = authService.getUser();
      return user?.isBusiness || false;
    } catch {
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("cardfavorite");
    window.location.reload();
  },
};

export default authService;
