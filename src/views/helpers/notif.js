document.addEventListener("DOMContentLoaded", () => {
  const authModal = document.createElement("div");
  authModal.id = "authModal";
  authModal.className = "relative z-30 hidden";
  authModal.innerHTML = `
    <div class="fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity"></div>
  
    <div class="fixed inset-0 z-10 overflow-y-auto">
      <div class="flex justify-center text-center items-center p-0">
        <div
          class="relative transform overflow-hidden rounded-lg bg-white/20 text-left shadow-xl transition-all my-20 max-w-lg p-6">
          <div class="flex items-start">
            <div id="iconContainer" class="flex flex-shrink-0 items-center justify-center rounded-full bg-mainpurple/70 mx-0 size-10">
              <div id="iconSvg">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                  aria-hidden="true" class="size-6 text-white">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.25-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z" />
                </svg>
              </div>
            </div>
            <div class="ml-4 mt-0 text-left">
              <h3 id="modalTitle" class="text-xl font-bold leading-6  urbanist-bold text-lightpurple" id="modal-title">Warning!</h3>
              <div class="mt-2">
                <p id="modalText" class="text-lg text-white/70 urbanist-regular leading-5">No account found linked to this email! <br> If you don't have an account, please sign up!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(authModal);

  window.showModal = function (title, message, bgColor, type) {
    const modalTitle = authModal.querySelector("#modalTitle");
    const modalText = authModal.querySelector("#modalText");
    const iconContainer = authModal.querySelector("#iconContainer");
    const iconSvg = authModal.querySelector("#iconSvg");

    modalTitle.textContent = title;
    modalText.innerHTML = message;
    iconContainer.className = `flex flex-shrink-0 items-center justify-center rounded-full ${bgColor} size-10`;

    iconSvg.innerHTML =
      type === "success"
        ? `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-white">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
          </svg>`
        : `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-white">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.25-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z" />
          </svg>`;

    authModal.classList.remove("hidden", "opacity-0");
    authModal.classList.add("flex", "opacity-100");

    setTimeout(() => {
      authModal.classList.add("opacity-0");
      setTimeout(() => {
        authModal.classList.add("hidden");
      }, 500);
    }, 2000);
  };
});
