import AboutView from "../views/AboutView.js";

export default class AboutPresenter {
  constructor() {
    this.view = new AboutView();
    this.init();
  }

  init() {
    this.view.renderContent();
  }
}
