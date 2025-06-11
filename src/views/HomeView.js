export default class HomeView {
  constructor() {
    this.navbarContainer = document.getElementById("navbar");
    this.footerContainer = document.getElementById("footer");
    this.container = document.querySelector("main");
  }

  renderNavbar(navbarElement) {
    if (this.navbarContainer) {
      this.navbarContainer.innerHTML = "";
      this.navbarContainer.appendChild(navbarElement);
    }
  }

  renderFooter(footerElement) {
    if (this.footerContainer) {
      this.footerContainer.innerHTML = "";
      this.footerContainer.appendChild(footerElement);
    }
  }

  renderContent() {
    this.container.innerHTML = `
      <section class="w-full max-w-6xl mx-auto">
        <!-- Hero Section -->
        <div class="card mb-12">
          <div class="flex flex-col md:flex-row items-center gap-12">
            <div class="flex-1 flex flex-col justify-center gap-6">
              <h1 class="text-4xl md:text-5xl font-bold text-[color:var(--color-darkblue)] leading-tight">
                Your Cat's Health <br />
                <span class="text-[color:var(--color-peach)]">Comes First</span>
              </h1>
              <p class="text-lg text-[color:var(--color-darkblue)] leading-relaxed opacity-80">
                With CatCare, you can get a free early diagnosis of your cat's health online.
              </p>
              <div class="flex flex-col sm:flex-row gap-4">
                <a href="/diagnosis" data-link class="btn-primary text-center">Start Checkup</a>
              </div>
            </div>
            <div class="flex-1 flex flex-col items-center justify-center relative">
              <img src="/cat-home.png" alt="CatCare Home Illustration" class="h-64 w-64 object-contain transform hover:scale-105 transition-transform duration-300 mb-10" />
              <div class="absolute bottom-0 right-0 md:static md:mt-4 text-right">
                <span class="text-base md:text-lg text-[color:var(--color-darkblue)] font-medium opacity-60">
                  A caring partner for your cat's health journey
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Features Section -->
        <div id="features" class="grid grid-cols-1 md:grid-cols-3 gap-8">
          ${this.featureCard(
            "Quick Diagnosis",
            "Get instant insights about your cat's health condition through our advanced AI system.",
            `<path stroke-linecap="round" stroke-linejoin="round" d="M6 3v7a6 6 0 0012 0V3m-6 13v2a2 2 0 104 0v-2m-4 0a2 2 0 01-4 0v-2" />`
          )}

          ${this.featureCard(
            "24/7 Available",
            "Access our service anytime, anywhere. Your cat's health doesn't wait for business hours.",
            `<circle cx="12" cy="12" r="10" /><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6l4 2" />`
          )}

          ${this.featureCard(
            "Expert Knowledge",
            "Powered by veterinary expertise and machine learning for accurate results.",
            `<path stroke-linecap="round" stroke-linejoin="round" d="M12 20h9M12 4h9m-9 0a2 2 0 00-2 2v12a2 2 0 002 2m0-16a2 2 0 012 2v12a2 2 0 01-2 2" />`
          )}
        </div>

        <!-- How It Works -->
        <div class="my-16">
          <h2 class="text-3xl font-bold text-[color:var(--color-darkblue)] text-center mb-8">How It Works</h2>
          <div class="grid md:grid-cols-3 gap-8">
            ${this.howItWorksStep(
              "Upload Cat Photo",
              "Upload a clear image of your cat to let our AI scan for skin symptoms."
            )}
            ${this.howItWorksStep(
              "Fill Out Symptoms",
              "Provide details like age, weight, and observed symptoms."
            )}
            ${this.howItWorksStep(
              "Get Diagnosis",
              "Receive instant prediction and care recommendations tailored to your cat."
            )}
          </div>
        </div>

        <!-- Testimonials -->
        <div class="my-16 bg-[color:var(--color-lightblue)] rounded-xl p-8 shadow">
          <h2 class="text-2xl font-bold text-center text-[color:var(--color-darkblue)] mb-6">What Users Say</h2>
          <div class="flex flex-col md:flex-row gap-6 justify-center">
            ${this.testimonialCard(
              "Steven Lie & Kayla",
              "Thanks to CatCare, I knew something was wrong early. Miko is all better now!"
            )}
            ${this.testimonialCard(
              "Peter & Gwen",
              "The diagnosis process was straightforward and the recommendations were precise. Highly satisfied!"
            )}
          </div>
        </div>

        <!-- Final CTA -->
        <div class="my-16 text-center">
          <h2 class="text-2xl font-bold text-[color:var(--color-darkblue)] mb-4">Worried about your cat?</h2>
          <p class="text-[color:var(--color-darkblue)] opacity-70 mb-6">Let CatCare give you a quick, reliable diagnosis.</p>
          <a href="/diagnosis" data-link class="btn-primary text-lg px-6 py-3">Start Diagnosis</a>
        </div>
      </section>
    `;
  }

  featureCard(title, desc, iconPath) {
    return `
      <div class="card">
        <div class="flex flex-col items-center text-center gap-4">
          <div class="w-12 h-12 rounded-full bg-[color:var(--color-peach)] flex items-center justify-center shadow-md">
            <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              ${iconPath}
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-[color:var(--color-darkblue)]">${title}</h3>
          <p class="text-[color:var(--color-darkblue)] opacity-70">${desc}</p>
        </div>
      </div>
    `;
  }

  howItWorksStep(title, desc) {
    return `
      <div class="card p-6 flex flex-col gap-4 items-start">
        <div class="w-10 h-10 rounded-full bg-[color:var(--color-peach)] flex items-center justify-center text-white font-bold text-lg shadow">
          ✓
        </div>
        <h3 class="text-lg font-semibold text-[color:var(--color-darkblue)]">${title}</h3>
        <p class="text-[color:var(--color-darkblue)] opacity-70">${desc}</p>
      </div>
    `;
  }

  testimonialCard(name, comment) {
    return `
      <div class="bg-white rounded-lg p-4 shadow-md w-full md:w-1/2">
        <p class="text-sm italic text-[color:var(--color-darkblue)]">"${comment}"</p>
        <p class="mt-2 text-right text-sm font-semibold text-[color:var(--color-peach)]">- ${name}</p>
      </div>
    `;
  }

  bindStartCheckup(handler) {
    const btn = document.querySelector('a[data-link][href="/diagnosis"]');
    if (btn) btn.addEventListener("click", handler);
  }

  bindLearnMore() {
    const btn = document.querySelector('a[data-link][href="/#features"]');
    if (btn) {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.querySelector("#features");
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      });
    }
  }
}
