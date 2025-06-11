export default class HomePresenter {
  constructor(view) {
    this.view = view;
    this.init();
  }

  async init() {
    const { createNavbar } = await import("../components/navbar.js");
    const { createFooter } = await import("../components/footer.js");

    this.view.renderNavbar(createNavbar());
    this.view.renderFooter(createFooter());
    this.view.renderContent();

    this.view.bindStartCheckup(() => {
      console.log("Start Checkup clicked");
    });
  }
}
