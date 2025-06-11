export function showDiagnosisModal({ onSubmit }) {
  const modal = document.createElement("div");
  modal.id = "diagnosisModal";
  modal.style.position = "fixed";
  modal.style.top = "0";
  modal.style.left = "0";
  modal.style.width = "100vw";
  modal.style.height = "100vh";
  modal.style.background = "rgba(0, 0, 0, 0.5)";
  modal.style.display = "flex";
  modal.style.justifyContent = "center";
  modal.style.alignItems = "center";
  modal.style.zIndex = "9999";

  modal.innerHTML = `
    <div class="diagnosis-card" style="max-height: 90vh; overflow-y: auto; position: relative;">
      <div class="sticky top-0 mb-4 p-4 bg-white shadow-lg rounded-lg z-10" style="width: 20rem;">
        <button id="closeDiagnosis">×</button>
        <h2>CatCare - Diagnosis</h2>
      </div>
      <form id="diagnosisForm">
        ${["Age", "Weight", "Heart_Rate"]
          .map(
            (field) =>
              `<label for="${field}">${field.replace(
                "_",
                " "
              )}</label><input type="number" id="${field}" required />`
          )
          .join("")}

        <label for="Gender">Gender</label>
        <select id="Gender" required>
          <option value="" disabled selected>Choice</option>
          <option value="1">Male</option>
          <option value="0">Female</option>
        </select>

        <label>Symptoms (max 4)</label>
        <div class="symptoms-container mb-4">
          ${[
            "No appetite",
            "Vomiting",
            "Diarrhea",
            "Watery eyes",
            "Sneezing / Coughing",
            "Lethargy",
            "Weight loss",
            "Skin irritation",
          ]
            .map(
              (symptom, i) =>
                `<label><input type="checkbox" class="symptom-checkbox" value="${
                  i + 1
                }" /> ${symptom}</label>`
            )
            .join("")}
        </div>

        ${["Duration", "Body_Temperature"]
          .map(
            (field) =>
              `<label for="${field}">${field.replace(
                "_",
                " "
              )}</label><input type="number" id="${field}" required />`
          )
          .join("")}

        ${[
          "Appetite_Loss",
          "Vomiting",
          "Diarrhea",
          "Coughing",
          "Labored_Breathing",
          "Lameness",
          "Skin_Lesions",
          "Nasal_Discharge",
          "Eye_Discharge",
        ]
          .map(
            (field) => `
            <label for="${field}">${field.replace("_", " ")}</label>
            <select id="${field}" required>
              <option value="" disabled selected>Choice</option>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>`
          )
          .join("")}

        <label for="Breed">Breed</label>
        <select id="Breed" required>
          <option value="" disabled selected>Choice</option>
          <option value="0">Labrador</option>
          <option value="1">Siamese</option>
          <option value="2">Holstein</option>
          <option value="3">Beagle</option>
          <option value="4">Persian</option>
        </select>

        <button type="submit">Diagnose</button>
      </form>
    </div>
  `;

  document.body.appendChild(modal);

  document.getElementById("closeDiagnosis").addEventListener("click", () => {
    modal.remove();
  });

  const form = modal.querySelector("#diagnosisForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = {
      Breed: Number(form.querySelector("#Breed").value),
      Age: Number(form.querySelector("#Age").value),
      Gender: Number(form.querySelector("#Gender").value),
      Weight: Number(form.querySelector("#Weight").value),
    };

    const checkedSymptoms = [
      ...form.querySelectorAll(".symptom-checkbox:checked"),
    ].map((cb) => Number(cb.value));

    if (checkedSymptoms.length === 0) {
      alert("Please select at least one symptom.");
      return;
    }

    for (let i = 0; i < 4; i++) {
      data[`Symptom_${i + 1}`] = checkedSymptoms[i] || 0;
    }

    [
      "Duration",
      "Appetite_Loss",
      "Vomiting",
      "Diarrhea",
      "Coughing",
      "Labored_Breathing",
      "Lameness",
      "Skin_Lesions",
      "Nasal_Discharge",
      "Eye_Discharge",
      "Body_Temperature",
      "Heart_Rate",
    ].forEach((key) => {
      data[key] = Number(form.querySelector(`#${key}`).value);
    });

    if (typeof onSubmit === "function") onSubmit(data);
    modal.remove();
  });
}
