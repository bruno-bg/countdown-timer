const timeInput = document.getElementById("timeInput");
    const messageInput = document.getElementById("messageInput");
    const charCount = document.getElementById("charCount");
    const defineBtn = document.getElementById("defineBtn");
    const formSection = document.getElementById("formSection");
    const timerSection = document.getElementById("timerSection");
    const timerDisplay = document.getElementById("timerDisplay");
    const startBtn = document.getElementById("startBtn");
    const pauseBtn = document.getElementById("pauseBtn");
    const resetBtn = document.getElementById("resetBtn");
    const settingsBtn = document.getElementById("settingsBtn");
    const messageSection = document.getElementById("messageSection");
    const finalMessage = document.getElementById("finalMessage");
    const newTimerBtn = document.getElementById("newTimerBtn");

    let totalSeconds = 0;
    let initialSeconds = 0;
    let interval = null;

    // Máscara de tempo (hh:mm:ss)
    timeInput.addEventListener("input", (e) => {
      let v = e.target.value.replace(/[^0-9]/g, "");
      if (v.length >= 6) {
        e.target.value = v.replace(/(\d{2})(\d{2})(\d{2})/, "$1:$2:$3");
      } else if (v.length >= 4) {
        e.target.value = v.replace(/(\d{2})(\d{2})/, "$1:$2");
      }
    });

    // Contador de caracteres
    messageInput.addEventListener("input", () => {
      const remaining = 200 - messageInput.value.length;
      charCount.textContent = `${remaining} caracteres restantes`;
    });

    defineBtn.addEventListener("click", () => {
      if (!timeInput.value || !messageInput.value) {
        alert("Preencha o tempo e a mensagem!");
        return;
      }

      //olhar
      const [hh, mm, ss] = timeInput.value.split(":").map(Number);
      totalSeconds = hh * 3600 + mm * 60 + ss;
      initialSeconds = totalSeconds;
      //olhar
      if (isNaN(totalSeconds) || totalSeconds <= 0) {
        alert("Tempo inválido!");
        return;
      }

      console.log("foi");

    //   updateTimerDisplay();
      formSection.classList.add("hidden");
      timeR.classList.remove("hidden");
    });

    startBtn.addEventListener("click", () => {
      interval = setInterval(() => {
        totalSeconds--;
        updateTimerDisplay();
        if (totalSeconds <= 0) {
          clearInterval(interval);
          timerSection.classList.add("hidden");
          messageSection.classList.remove("hidden");
          finalMessage.textContent = messageInput.value;
        }
      }, 1000);
      startBtn.classList.add("hidden");
      pauseBtn.classList.remove("hidden");
    });

    pauseBtn.addEventListener("click", () => {
      clearInterval(interval);
      pauseBtn.classList.add("hidden");
      startBtn.classList.remove("hidden");
    });

    resetBtn.addEventListener("click", () => {
      clearInterval(interval);
      totalSeconds = initialSeconds;
      updateTimerDisplay();
      pauseBtn.classList.add("hidden");
      startBtn.classList.remove("hidden");
    });

    settingsBtn.addEventListener("click", resetToSettings);
    newTimerBtn.addEventListener("click", resetToSettings);

    function resetToSettings() {
      clearInterval(interval);
      totalSeconds = 0;
      initialSeconds = 0;
      messageInput.value = "";
      timeInput.value = "";
      charCount.textContent = "200 caracteres restantes";
      formSection.classList.remove("hidden");
      timeR.classList.add("hidden");
      messageSection.classList.add("hidden");
    }

    function updateTimerDisplay() {
      const h = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
      const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
      const s = String(totalSeconds % 60).padStart(2, "0");
      timerDisplay.textContent = `${h}:${m}:${s}`;
    }
