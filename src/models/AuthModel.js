import axios from "axios";

export default class AuthModel {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
    });
  }

  async login(email, password) {
    try {
      const res = await this.api.post("/login", { email, password });
      return res.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || "Login failed");
    }
  }

  async register(name, email, password) {
    try {
      const res = await this.api.post("/register", { name, email, password });
      return res.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || "Registration failed");
    }
  }
}
