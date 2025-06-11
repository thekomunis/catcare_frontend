import HomeView from "./views/HomeView.js";
import AboutView from "./views/AboutView.js";
import AuthView from "./views/AuthView.js";
import { highlightActiveNav } from "./components/navbar.js";

// Ini fungsi utama yg dipanggil dari app.js
export async function navigate(path) {
  const handler = routes[path] || NotFoundView;

  await handler();
  highlightActiveNav();
}

// Saat popstate (back/forward)
window.addEventListener("popstate", () => {
  navigate(window.location.pathname);
});

function showAlertAndRedirect(message, redirectPath) {
  const text = document.getElementById("notificationText");
  const box = document.getElementById("notification");

  if (text && box) {
    text.textContent = message;
    box.classList.add("show");
    setTimeout(() => {
      box.classList.remove("show");
      navigate(redirectPath);
    }, 2000);
  } else {
    navigate(redirectPath); // fallback kalau belum render view
  }
}

// Define route ke presenter
const routes = {
  "/": async () => {
    const { default: HomePresenter } = await import(
      "./presenters/HomePresenter.js"
    );
    new HomePresenter(new HomeView());
  },
  "/diagnosis": () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      showAlertAndRedirect(
        "You must be logged in to access Diagnosis",
        "/login"
      );
      return;
    }
    return new DiagnosisPresenter();
  },
  "/about": async () => {
    const { default: AboutPresenter } = await import(
      "./presenters/AboutPresenter.js"
    );
    new AboutPresenter(new AboutView());
  },
  "/login": async () => {
    const { default: LoginPresenter } = await import(
      "./presenters/LoginPresenter.js"
    );
    new LoginPresenter(new AuthView());
  },
  "/register": async () => {
    const { default: RegisterPresenter } = await import(
      "./presenters/RegisterPresenter.js"
    );
    new RegisterPresenter(new AuthView());
  },
};
