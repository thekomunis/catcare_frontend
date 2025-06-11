import AuthModel from "../models/AuthModel.js";
import AuthView from "../views/AuthView.js";
import { navigate } from "../routes.js";

export default class RegisterPresenter {
  constructor() {
    this.model = new AuthModel();
    this.view = new AuthView("register");

    this.init();
  }

  init() {
    this.view.renderContent();
    this.view.bindSubmitHandler((data) => this.handleRegister(data));
  }

  async handleRegister({ name, email, password }) {
    this.view.showLoader();
    try {
      const user = await this.model.register(name, email, password);
      localStorage.setItem("user", JSON.stringify(user));
      this.view.showMessage("Registration successful!");
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      this.view.showMessage(err.message, false);
    } finally {
      this.view.hideLoader();
    }
  }
}
