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


let horaAlvoString = ""; // Hora alvo no formato HH:mm:ss


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
    // alert("Preencha o tempo e a mensagem!");
    console.log(`Preencha o tempo e a mensagem! ${timeInput.value} ${messageInput.value}`);
    return;
  }




  //olhar
  const [hh, mm, ss] = timeInput.value.split(":").map(Number);
  totalSeconds = hh * 3600 + mm * 60 + ss;
  initialSeconds = totalSeconds;
  //olhar
  if (isNaN(totalSeconds) || totalSeconds <= 0) {
    // alert("Tempo inválido!");
    console.log("Tempo inválido!");
    return;
  }

  //   updateTimerDisplay();
  formSection.classList.add("hidden");
  timeR.classList.remove("hidden");
});

startBtn.addEventListener("click", () => {
  


clearInterval(interval);
  horaAlvoString = timeInput.value;

  const agora = new Date();

  // Constrói a data/hora de destino com base na hora informada
  const [h, m, s] = horaAlvoString.split(":").map(Number);
  const alvo = new Date(agora);
  alvo.setHours(h, m, s, 0); // Define hora, minuto, segundo, milissegundo

  // Atualiza o countdown a cada segundo
  interval = setInterval(() => {
    const agora = new Date();
    const diferenca = alvo.getTime() - agora.getTime();

    if (diferenca <= 0) {
      clearInterval(interval);
      document.getElementById("time").style.display = "none";
      document.getElementById("formSection").style.display = "none";
      document.querySelector(".yourMsg").style.display = "block";
      return;
    }

    const h = Math.floor(diferenca / (1000 * 60 * 60));
    const m = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diferenca % (1000 * 60)) / 1000);


    hours.innerHTML = h + "<br><span>Horas</span>";
    minutes.innerHTML = m + "<br><span>Minutos</span>";
    seconds.innerHTML = s + "<br><span>Segundos</span>";

    hh.style.strokeDashoffset = 440 - (440 * h) / 24;
    mm.style.strokeDashoffset = 440 - (440 * m) / 60;
    ss.style.strokeDashoffset = 440 - (440 * s) / 60;

  }, 1000);




  timerSection.classList.add("hidden");
  messageSection.classList.remove("hidden");
  finalMessage.textContent = messageInput.value;
  //   }
  // }, 1000);
  startBtn.classList.add("hidden");
  pauseBtn.classList.remove("hidden");
});


pauseBtn.addEventListener("click", () => {
  clearInterval(interval);
  pauseBtn.classList.add("hidden");
  startBtn.classList.remove("hidden");
});

resetBtn.addEventListener("click", () => {

  horaAlvoString = "00:00:00"; // Resetando a hora alvo para 00:00:00
  clearInterval(interval);
  timeInput.value = "";
  messageInput.value = "";



  // clearInterval(interval);
  // totalSeconds = initialSeconds;
  // updateTimerDisplay();





  pauseBtn.classList.add("hidden");
  startBtn.classList.remove("hidden");
});

settingsBtn.addEventListener("click", resetToSettings);
// newTimerBtn.addEventListener("click", resetToSettings);

function resetToSettings() {


  // clearInterval(interval);
  // totalSeconds = 0;
  // initialSeconds = 0;



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
