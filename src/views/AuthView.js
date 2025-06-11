export default class AuthView {
  constructor(type = "login") {
    this.type = type; // "login" atau "register"
    this.container = document.querySelector("main");
  }

  renderContent() {
    if (!this.container) return;

    const isLogin = this.type === "login";
    const title = isLogin ? "Sign in to CatCare" : "Create a CatCare Account";
    const subtitle = isLogin
      ? "Access your account and keep your cat healthy"
      : "Register to start diagnosing your cat's health";
    const altAction = isLogin
      ? `Don't have an account? <a href="/register" data-link class="text-[color:var(--color-peach)] hover:underline font-semibold">Register</a>`
      : `Already have an account? <a href="/login" data-link class="text-[color:var(--color-peach)] hover:underline font-semibold">Sign In</a>`;
    const formId = isLogin ? "loginForm" : "registerForm";
    const messageId = isLogin ? "loginMessage" : "registerMessage";

    this.container.innerHTML = `
      <div class="container mx-auto px-4 flex justify-center items-center min-h-[80vh]">
        <div class="glass-card max-w-md w-full flex flex-col items-center gap-8 p-12 relative">
          <div class="flex flex-col items-center gap-2">
            <div class="mb-2 flex items-center justify-center rounded-full bg-white shadow-lg border-4 border-[color:var(--color-peach)]" style="width: 90px; height: 90px">
              <img src="/cat-icon.png" alt="CatCare Logo" class="h-16 w-16 drop-shadow" />
            </div>
            <h1 class="text-3xl font-extrabold text-[color:var(--color-darkblue)] text-center">${title}</h1>
            <p class="text-[color:var(--color-darkblue)] text-center opacity-70 text-base">${subtitle}</p>
          </div>
          <form id="${formId}" class="space-y-6 w-full">
            ${
              !isLogin
                ? `
              <input name="name" required placeholder="Name" class="input-glass" />
            `
                : ""
            }
            <input name="email" type="email" required placeholder="Email" class="input-glass" />
            <input name="password" type="password" required placeholder="Password" class="input-glass" />
            <button type="submit" class="btn-glass">${
              isLogin ? "Sign In" : "Register"
            }</button>
          </form>
          <p class="text-center text-sm text-[color:var(--color-darkblue)] mt-2 opacity-70">${altAction}</p>
          <div id="${messageId}" class="mt-2 text-center text-sm"></div>
        </div>
      </div>
    `;
  }

  bindSubmitHandler(callback) {
    const form = document.getElementById(`${this.type}Form`);
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        callback(Object.fromEntries(formData));
      });
    }
  }

  showMessage(msg, success = true) {
    const messageEl = document.getElementById(`${this.type}Message`);
    if (!messageEl) return;
    messageEl.textContent = msg;
    messageEl.className = `mt-4 text-center text-sm ${
      success ? "text-green-600" : "text-red-600"
    }`;
  }
}
