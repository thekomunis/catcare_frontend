import axios from "axios";

export default class DiagnosisModel {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
    });
  }

  async predict(payload) {
    try {
      const res = await this.api.post("/predict", payload);
      return res.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || "Prediction failed");
    }
  }

  async predictImage(file, userId) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", userId);

    try {
      const res = await this.api.post("/predict-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || "Failed to predict image");
    }
  }
}
