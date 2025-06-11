export default class AuthModel {
  constructor() {
    this.baseURL = import.meta.env.VITE_API_URL;
  }

  async login(email, password) {
    const response = await fetch(`${this.baseURL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || "Login failed");
    }

    return await response.json();
  }

  async register(name, email, password) {
    const response = await fetch(`${this.baseURL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || "Registration failed");
    }

    return await response.json();
  }
}
