import DiagnosisModel from "../models/DiagnosisModel.js";
import DiagnosisView from "../views/DiagnosisView.js";
import { showDiagnosisModal } from "../components/ModalDiagnosisForm.js";

export default class DiagnosisPresenter {
  constructor() {
    this.model = new DiagnosisModel();
    this.view = new DiagnosisView();
    this.init();
  }

  init() {
    this.view.renderContent();
    setTimeout(() => {
      this.view.bindImageUpload((file) => this.handleImageUpload(file));
      this.view.bindModalTrigger(() => this.openModal());
    }, 0);
  }

  async handleImageUpload(file) {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?.id || null;

      const result = await this.model.predictImage(file, userId);
      this.view.showImageResult(result);
    } catch (error) {
      this.view.notify("Image diagnosis failed. Please try again.");
    }
  }

  async handleFormSubmit(data) {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?.id || null;

      const result = await this.model.predict({ userId, data });

      this.view.showFormResult(data, result);
      return result;
    } catch (error) {
      this.view.notify("Form prediction failed.");
      throw error;
    }
  }

  openModal() {
    showDiagnosisModal({ onSubmit: (data) => this.handleFormSubmit(data) });
  }
}
