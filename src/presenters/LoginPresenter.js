import AuthModel from "../models/AuthModel.js";
import AuthView from "../views/AuthView.js";
import { navigate } from "../routes.js";

export default class LoginPresenter {
  constructor() {
    this.model = new AuthModel();
    this.view = new AuthView("login");

    this.init();
  }

  init() {
    this.view.renderContent();
    this.view.bindSubmitHandler((data) => this.handleLogin(data));
  }

  async handleLogin({ email, password }) {
    this.view.showLoader();
    try {
      const user = await this.model.login(email, password);
      localStorage.setItem("user", JSON.stringify(user));
      this.view.showMessage("Login successful!");
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      this.view.showMessage(err.message, false);
    } finally {
      this.view.hideLoader();
    }
  }
}
