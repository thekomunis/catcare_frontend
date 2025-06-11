import { navigate } from "./routes.js";
import { createNavbar, highlightActiveNav } from "./components/navbar.js";
import { createFooter } from "./components/footer.js";

function setupSPA() {
  window.addEventListener("DOMContentLoaded", () => {
    document.getElementById("navbar").appendChild(createNavbar());
    document.getElementById("footer").appendChild(createFooter());

    navigate(location.pathname).then(() => {
      highlightActiveNav();
    });

    document.body.addEventListener("click", (e) => {
      const link = e.target.closest("a[data-link]");
      if (link) {
        e.preventDefault();
        history.pushState(null, "", link.href);
        navigate(location.pathname).then(() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
          highlightActiveNav();
        });
      }
    });

    window.addEventListener("popstate", () => {
      navigate(location.pathname).then(() => {
        highlightActiveNav();
      });
    });
  });
}

setupSPA();
