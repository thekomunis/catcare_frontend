export default class DiagnosisView {
  constructor() {
    this.imageInput = document.getElementById("catImage");
    this.imagePreview = document.getElementById("imagePreview");
    this.uploadButton = document.getElementById("uploadBtn");
    this.resultBox = document.getElementById("result");
    this.notification = document.getElementById("notification");
    this.notificationText = document.getElementById("notificationText");
    this.modalTrigger = document.getElementById("openDiagnosis");
  }

  bindImageUpload(callback) {
    this.uploadButton.addEventListener("click", () => this.imageInput.click());
    this.imageInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview.src = reader.result;
        this.imagePreview.classList.remove("hidden");
        callback(file);
      };
      reader.readAsDataURL(file);
    });
  }

  bindModalTrigger(callback) {
    this.modalTrigger.addEventListener("click", (e) => {
      e.preventDefault();
      callback();
    });
  }

  showFormResult(data, result) {
    const section = document.getElementById("formDiagnosisSection");
    section.classList.remove("hidden");
    section.innerHTML = `
    <div class="card p-6 rounded-xl shadow border border-gray-200">
      <h2 class="text-2xl font-bold text-green-700 mb-4">📝 Diagnosis via Form</h2>
      <!-- isi ringkasan seperti sebelumnya -->
      <div class="mt-4">
        <p><strong>Diagnosis:</strong> ${result.prediction}</p>
        <p><strong>Description:</strong> ${result.description}</p>
        <p><strong>Treatment:</strong> ${result.treatment}</p>
      </div>
    </div>
  `;
  }

  showImageResult(data) {
    const section = document.getElementById("imageDiagnosisSection");
    section.classList.remove("hidden");
    section.innerHTML = `
    <div class="card p-6 rounded-xl shadow border border-gray-200">
      <h2 class="text-2xl font-bold text-blue-700 mb-4">📷 Diagnosis via Image</h2>
      <div class="text-center">
        <p class="text-xl font-bold">${data.prediction}</p>
        <p class="text-sm text-gray-600">Confidence: ${data.confidence}</p>
        <p class="mt-2">${data.treatment_suggestion}</p>
      </div>
    </div>
  `;
  }

  notify(msg) {
    this.notificationText.textContent = msg;
    this.notification.classList.add("show");
    setTimeout(() => {
      this.notification.classList.remove("show");
    }, 3000);
  }

  bindFormSubmit(callback) {
    const form = document.getElementById("diagnosisForm");
    if (!form) {
      console.error("⛔ Form diagnosis tidak ditemukan.");
      return;
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      callback(data);
    });
  }

  showLoader() {
    document.getElementById("loader").classList.remove("hidden");
  }

  hideLoader() {
    document.getElementById("loader").classList.add("hidden");
  }

  renderContent() {
    const container = document.querySelector("main");

    if (!container) {
      console.error("Main container not found!");
      return;
    }

    container.innerHTML = `
    <div id="loader" class="hidden fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
      <div class="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-20 w-20 border-t-blue-600 animate-spin"></div>
    </div>

    <div class="container mx-auto px-4">
      <div class="bg-white rounded-2xl shadow-xl p-10 flex flex-col items-center gap-6 border border-[color:var(--color-border)]">
        <div class="flex flex-col items-center gap-4 mb-8">
          <img src="/cat-icon.png" alt="CatCare Logo" class="h-20 w-20 mb-2 drop-shadow-lg transform hover:scale-105 transition-transform duration-300" />
          <h1 class="text-4xl font-extrabold text-[color:var(--color-darkblue)] tracking-tight">CatCare</h1>
          <p class="text-[color:var(--color-darkblue)] text-center text-lg font-semibold opacity-80">
            Cat Disease Diagnosis
          </p>
        </div>

        <form id="diagnosisForm" class="flex flex-col gap-5 w-full items-center">
          <div class="flex flex-col gap-3 w-full max-w-sm items-center">
            <label for="catImage" class="block text-base font-bold text-[color:var(--color-darkblue)] mb-1 self-start">
              Cat Photo
            </label>
            <div class="upload-area w-full flex flex-col items-center cursor-pointer transition-all duration-300">
              <img id="imagePreview" class="hidden h-36 w-36 object-cover rounded-xl mb-3 border-2 border-[color:var(--color-border)] shadow-lg mb-4" />
              <input id="catImage" name="catImage" type="file" accept="image/*" class="hidden" />
              <button type="button" id="uploadBtn" class="btn-primary flex items-center gap-2 w-full justify-center text-base py-2 min-h-0">
                Upload Photo
              </button>
              <p class="text-sm text-[color:var(--color-darkblue)] mt-2 opacity-70">
                Drag & Drop or Click to Select Image
              </p>
            </div>
            <p id="imageError" class="hidden text-sm text-red-600 mt-1"></p>
          </div>
          <div id="imageDiagnosisSection" class="mt-10 hidden w-full"></div>
          <div class="border-b border-[color:var(--color-border)] w-full py-4 px-2 mb-4"></div>
          OR
          <div class="border-b border-[color:var(--color-border)] w-full py-4 px-2 mb-4"></div>

          <div class="w-full flex justify-center">
            <button id="openDiagnosis" type="button" class="btn-primary w-full max-w-sm px-6 py-2 text-base font-bold min-h-0">
              Diagnose
            </button>
          </div>
        </form>
        <div id="formDiagnosisSection" class="mt-10 hidden w-full"></div>

        <div id="result" class="mt-8 hidden w-full">
          <div class="card flex flex-col items-center gap-4 p-6">
            <div class="w-14 h-14 rounded-full bg-[color:var(--color-peach)] flex items-center justify-center shadow-md mb-2">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <h2 class="text-2xl font-semibold text-[color:var(--color-darkblue)] mb-2">
              Diagnosis Result
            </h2>
          </div>
        </div>

        <div id="notification" class="notification">
          <div class="bg-[color:var(--color-peach)] text-white px-6 py-4 rounded-xl shadow-xl">
            <p id="notificationText"></p>
          </div>
        </div>
      </div>
    </div>
  `;

    // Setelah inject, re-bind element ke property instance
    this.imageInput = document.getElementById("catImage");
    this.imagePreview = document.getElementById("imagePreview");
    this.uploadButton = document.getElementById("uploadBtn");
    this.resultBox = document.getElementById("result");
    this.notification = document.getElementById("notification");
    this.notificationText = document.getElementById("notificationText");
    this.modalTrigger = document.getElementById("openDiagnosis");
  }
}
