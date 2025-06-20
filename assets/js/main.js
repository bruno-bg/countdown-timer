document.addEventListener('DOMContentLoaded', function () {
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

    formSection.classList.add("hidden");
    timeR.classList.remove("hidden");
  });

  // Botão start o timer
  startBtn.addEventListener("click", () => {

    clearInterval(interval);

    interval = setInterval(() => {

      totalSeconds--;

      if (totalSeconds < 0) {
        clearInterval(interval);
        document.getElementById("time").style.display = "none";
        document.getElementById("formSection").style.display = "none";
        document.querySelector(".yourMsg").style.display = "block";
        return;
      }

      const h = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
      const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
      const s = String(totalSeconds % 60).padStart(2, "0");

      hours.innerHTML = h + "<br><span>Horas</span>";
      minutes.innerHTML = m + "<br><span>Minutos</span>";
      seconds.innerHTML = s + "<br><span>Segundos</span>";

      hh.style.strokeDashoffset = 440 - (440 * h) / 24;
      mm.style.strokeDashoffset = 440 - (440 * m) / 60;
      ss.style.strokeDashoffset = 440 - (440 * s) / 60;

    }, 1000);

    startBtn.classList.add("hidden");
    pauseBtn.classList.remove("hidden");

    console.log("start do timer está pronto!");
  });

  // Botão de reset do timer - volta para o tempo inicial
  resetBtn.addEventListener("click", () => {

    clearInterval(interval);

    totalSeconds = initialSeconds;

    const hReset = String(Math.floor(initialSeconds / 3600)).padStart(2, "0");
    const mReset = String(Math.floor((initialSeconds % 3600) / 60)).padStart(2, "0");
    const sReset = String(initialSeconds % 60).padStart(2, "0");

    hours.innerHTML = hReset + "<br><span>Horas</span>";
    minutes.innerHTML = mReset + "<br><span>Minutos</span>";
    seconds.innerHTML = sReset + "<br><span>Segundos</span>";

    hh.style.strokeDashoffset = 440 - (440 * hReset) / 24;
    mm.style.strokeDashoffset = 440 - (440 * mReset) / 60;
    ss.style.strokeDashoffset = 440 - (440 * sReset) / 60;

    pauseBtn.classList.add("hidden");
    startBtn.classList.remove("hidden");

    console.log("reset do timer está pronto!");
  });

  // Botões de pausa
  pauseBtn.addEventListener("click", () => {
    clearInterval(interval);
    pauseBtn.classList.add("hidden");
    startBtn.classList.remove("hidden");

    console.log("Timer pausado.");
  });

  function resetToSettings() {
    clearInterval(interval);

    // Oculta o timer e exibe o formulário
    timeR.classList.add("hidden");
    formSection.classList.remove("hidden");

    // Limpa os campos do formulário
    timeInput.value = "";
    messageInput.value = "";
    charCount.textContent = "200 caracteres restantes";

    // Reseta completamente o estado do timer
    totalSeconds = 0;
    initialSeconds = 0;

    // Reseta o display do timer para o estado inicial
    hours.innerHTML = "00<br><span>Horas</span>";
    minutes.innerHTML = "00<br><span>Minutos</span>";
    seconds.innerHTML = "00<br><span>Segundos</span>";

    // Reseta os círculos SVG
    hh.style.strokeDashoffset = 440;
    mm.style.strokeDashoffset = 440;
    ss.style.strokeDashoffset = 440;

    // Reseta os botões de controle
    pauseBtn.classList.add("hidden");
    startBtn.classList.remove("hidden");

    console.log("Timer redefinido, retornando ao formulário.");
  }

  // Botão de redefinir para as configurações
  settingsBtn.addEventListener("click", resetToSettings);

});
