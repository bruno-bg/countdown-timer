document.addEventListener('DOMContentLoaded', function() {
  const timeInput = document.getElementById("timeInput");
  const messageInput = document.getElementById("messageInput");
  const charCount = document.getElementById("charCount");
  const defineBtn = document.getElementById("defineBtn");
  const formSection = document.getElementById("formSection");
  const timerSection = document.getElementById("timerSection");
  const startBtn = document.getElementById("startBtn");
  const pauseBtn = document.getElementById("pauseBtn");
  const resetBtn = document.getElementById("resetBtn");
  const settingsBtn = document.getElementById("settingsBtn");
  const messageSection = document.getElementById("messageSection");

  // Elementos do timer
  const timeR = document.getElementById("timeR");
  const yourMsg = document.querySelector(".yourMsg");

  // Elementos do timer anterior
  const finalMessage = document.getElementById("finalMessage");
  // const newTimerBtn = document.getElementById("newTimerBtn");

  // Elementos do timer digital e círculos SVG
  const hours = document.getElementById("hours");
  const minutes = document.getElementById("minutes");
  const seconds = document.getElementById("seconds");
  const hh = document.getElementById("hh");
  const mm = document.getElementById("mm");
  const ss = document.getElementById("ss");

  let totalSeconds = 0;
  let initialSeconds = 0;
  let interval = null;
  let horaAlvoString = "";


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





  // Botão de definir tempo e mensagem do formulário
  defineBtn.addEventListener("click", () => {
    if (!timeInput.value || !messageInput.value) {
      console.log(`Preencha o tempo e a mensagem! ${timeInput.value} ${messageInput.value}`);
      return;
    }

    // Validações
    const [hh, mm, ss] = timeInput.value.split(":").map(Number);
    totalSeconds = hh * 3600 + mm * 60 + ss;
    initialSeconds = totalSeconds;

    if (isNaN(totalSeconds) || totalSeconds <= 0) {
      console.log("Tempo inválido!");
      return;
    }

    hours.innerHTML = hh + "<br><span>Horas</span>";
    minutes.innerHTML = mm + "<br><span>Minutos</span>";
    seconds.innerHTML = ss + "<br><span>Segundos</span>";

    // Validações OK
    formSection.classList.add("hidden");
    timeR.classList.remove("hidden");
  });

  // Botão start o timer
  startBtn.addEventListener("click", () => {

    clearInterval(interval);
    horaAlvoString = timeInput.value;


    const [h, m, s] = timeInput.value.split(":").map(Number);
    totalSeconds = h * 3600 + m * 60 + s;
    initialSeconds = totalSeconds;


    interval = setInterval(() => {

      totalSeconds--;

      if (totalSeconds <= 0) {
        // if (diferenca <= 0) {
        clearInterval(interval);
        document.getElementById("time").style.display = "none";
        document.getElementById("formSection").style.display = "none";
        document.querySelector(".yourMsg").style.display = "block";
        return;
      }

      const h = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
      const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
      const s = String(totalSeconds % 60).padStart(2, "0");

      // Atualiza o display do timer
      hours.innerHTML = h + "<br><span>Horas</span>";
      minutes.innerHTML = m + "<br><span>Minutos</span>";
      seconds.innerHTML = s + "<br><span>Segundos</span>";

      hh.style.strokeDashoffset = 440 - (440 * h) / 24;
      mm.style.strokeDashoffset = 440 - (440 * m) / 60;
      ss.style.strokeDashoffset = 440 - (440 * s) / 60;

    }, 1000);

    // Atualiza o display do timer
    // timerSection.classList.add("hidden");
    // messageSection.classList.remove("hidden");
    // finalMessage.textContent = messageInput.value;

    startBtn.classList.add("hidden");
    pauseBtn.classList.remove("hidden");
  });


// Botões de pausa
pauseBtn.addEventListener("click", () => {
  clearInterval(interval);
  pauseBtn.classList.add("hidden");
  startBtn.classList.remove("hidden");
});


// Botão de reset
resetBtn.addEventListener("click", () => {

  horaAlvoString = "00:00:00"; // Resetando a hora alvo para 00:00:00
  clearInterval(interval);
  timeInput.value = "";
  messageInput.value = "";

  pauseBtn.classList.add("hidden");
  startBtn.classList.remove("hidden");
});








// Botão de redefinir para as configurações
settingsBtn.addEventListener("click", resetToSettings);
// newTimerBtn.addEventListener("click", resetToSettings);






function resetToSettings() {

  horaAlvoString = "00:00:00"; // Resetando a hora alvo para 00:00:00
  clearInterval(interval);
  timeInput.value = "";
  messageInput.value = "";

  // messageInput.value = "";
  // timeInput.value = "";
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
});
