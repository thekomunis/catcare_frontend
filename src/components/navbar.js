import { navigate } from "../routes.js"; // pastikan ini bener path-nya

export function createNavbar() {
  const navbar = document.createElement("nav");
  navbar.className =
    "bg-white shadow-md sticky top-0 z-50 w-full border-b border-[color:var(--color-lightgray)] transition-all duration-300";

  const path = window.location.pathname;

  navbar.innerHTML = `
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center h-16">
        <a href="/" data-link class="flex items-center gap-2">
          <img src="/cat-icon.png" alt="CatCare Logo" class="h-10 w-10" />
          <span class="font-extrabold text-xl text-[color:var(--color-darkblue)] tracking-tight">CatCare</span>
        </a>

        <div class="hidden md:flex items-center space-x-6" id="navLinks">
          ${createNavLink("/", "Home", path)}
          ${createNavLink("/diagnosis", "Diagnosis", path)}
          ${createNavLink("/about", "About", path)}
          <div id="authArea" class="flex items-center space-x-2"></div>
        </div>

        <button id="mobileMenuButton" class="md:hidden text-[color:var(--color-darkblue)] hover:text-[color:var(--color-peach)] transition-colors">
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <div id="mobileMenu" class="hidden md:hidden py-4 bg-white border-t border-[color:var(--color-lightgray)] rounded-b-lg shadow-lg">
        <div class="flex flex-col space-y-4" id="mobileNavLinks">
          ${createNavLink("/", "Home", path)}
          ${createNavLink("/diagnosis", "Diagnosis", path)}
          ${createNavLink("/about", "About", path)}
          <div id="mobileAuthArea" class="flex flex-col space-y-2"></div>
        </div>
      </div>
    </div>
  `;

  // Toggle mobile menu
  navbar.querySelector("#mobileMenuButton").addEventListener("click", () => {
    navbar.querySelector("#mobileMenu").classList.toggle("hidden");
  });

  // SPA NAVIGATION
  navbar.querySelectorAll("a[data-link]").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const href = link.getAttribute("href");
      history.pushState(null, "", href);
      window.dispatchEvent(new PopStateEvent("popstate"));
    });
  });

  // AUTH AREA render (localStorage "user")
  const user = JSON.parse(localStorage.getItem("user"));
  const desktopAuth = navbar.querySelector("#authArea");
  const mobileAuth = navbar.querySelector("#mobileAuthArea");

  if (user) {
    desktopAuth.innerHTML = `
      <span class="text-[color:var(--color-darkblue)] font-medium">Hi, ${user.name}</span>
      <button id="logoutBtn" class="text-sm text-red-600 underline">Logout</button>
    `;
    mobileAuth.innerHTML = `
      <span class="text-[color:var(--color-darkblue)] font-medium">Hi, ${user.name}</span>
      <button id="mobileLogoutBtn" class="text-sm text-red-600 underline">Logout</button>
    `;

    navbar.querySelectorAll("#logoutBtn, #mobileLogoutBtn").forEach((btn) =>
      btn.addEventListener("click", () => {
        localStorage.removeItem("user");
        navigate("/");
      })
    );
  } else {
    desktopAuth.innerHTML = `
      <a href="/login" data-link class="nav-link ${
        path === "/login" ? "nav-link-active" : ""
      }">Login</a>
      <a href="/register" data-link class="btn-primary text-sm">Register</a>
    `;
    mobileAuth.innerHTML = `
      <a href="/login" data-link class="nav-link ${
        path === "/login" ? "nav-link-active" : ""
      }">Login</a>
      <a href="/register" data-link class="btn-primary text-sm">Register</a>
    `;
  }

  return navbar;
}

function createNavLink(href, label, currentPath) {
  const isActive =
    href === "/"
      ? currentPath === "/"
      : currentPath.startsWith(href) && href !== "/";
  return `<a href="${href}" data-link class="nav-link ${
    isActive ? "nav-link-active" : ""
  }">${label}</a>`;
}

export function highlightActiveNav() {
  const links = document.querySelectorAll("a[data-link]");
  links.forEach((link) => {
    if (link.pathname === location.pathname) {
      link.classList.add("nav-link-active");
    } else {
      link.classList.remove("nav-link-active");
    }
  });
}
