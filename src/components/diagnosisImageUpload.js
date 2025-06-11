export function setupDiagnosisImageUpload({
  fileInput,
  previewImage,
  uploadButton,
  onUpload,
}) {
  uploadButton.addEventListener("click", () => fileInput.click());

  fileInput.addEventListener("change", async () => {
    const file = fileInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      previewImage.src = reader.result;
      previewImage.classList.remove("hidden");
    };
    reader.readAsDataURL(file);

    onUpload(file); // biarkan presenter yg handle API
  });
}
