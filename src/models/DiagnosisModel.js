export default class DiagnosisModel {
  constructor() {
    this.baseURL = import.meta.env.VITE_API_URL;
  }

  async predict(payload) {
    const response = await fetch(`${this.baseURL}/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload), // payload = { userId, data }
    });

    if (!response.ok) throw new Error("Prediction failed");
    return await response.json();
  }

  async predictImage(file, userId) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", userId);

    const response = await fetch(`${this.baseURL}/predict-image`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) throw new Error("Failed to predict image");
    return await response.json();
  }
}
