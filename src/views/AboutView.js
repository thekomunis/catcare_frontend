export default class AboutView {
  constructor() {
    this.container = document.querySelector("main");
  }

  renderContent() {
    this.container.innerHTML = `
      <div class="container mx-auto px-4">
        <div class="flex flex-col items-center justify-center min-h-[80vh] bg-[color:var(--color-lightergray)] px-2 py-8">
          <div class="max-w-2xl w-full mx-auto">
            <div class="bg-white rounded-2xl shadow-xl p-10 flex flex-col items-center gap-6 border border-[color:var(--color-border)]">
              <img src="/cat-icon.png" alt="CatCare Logo" class="h-20 w-20 mb-2 drop-shadow" />
              <h1 class="text-4xl font-extrabold text-[color:var(--color-darkblue)] mb-4 text-center">About CatCare</h1>
              <div class="text-[color:var(--color-darkblue)] text-lg opacity-90 text-justify space-y-4">
                <p>
                  CatCare is a digital platform specifically designed to help cat owners better understand their pet's health. Through data-driven symptom detection and artificial intelligence technology, CatCare provides quick and accurate analysis of potential diseases or health conditions your cat may be experiencing.
                </p>
                <p>
                  We understand that cats often hide signs of illness, and delays in treatment can seriously impact their health. Therefore, CatCare serves as an initial solution to detect symptoms early, provide follow-up advice, and help you make better decisions before taking your cat to the veterinarian.
                </p>
                <p>
                  With a user-friendly interface and reliable information, CatCare aims to be the best digital health assistant for every cat owner. Because we believe, a healthy cat is a happy cat.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
