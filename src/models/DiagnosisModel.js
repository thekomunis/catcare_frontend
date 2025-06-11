export default class DiagnosisModel {
  async predict(payload) {
    const response = await fetch("http://localhost:3000/predict", {
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
    formData.append("userId", userId); // kirim userId juga

    const res = await fetch("http://localhost:3000/predict-image", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) throw new Error("Failed to predict image");
    return res.json();
  }
}
