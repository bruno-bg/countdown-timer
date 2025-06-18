let horaAlvoString = tempo; // Hora alvo no formato HH:mm:ss

function iniciarCountdown(horaAlvoString) {
  const agora = new Date();
  
  // Constrói a data/hora de destino com base na hora informada
  const [h, m, s] = horaAlvoString.split(":").map(Number);
  const alvo = new Date(agora);
  alvo.setHours(h, m, s, 0); // Define hora, minuto, segundo, milissegundo

  // Atualiza o countdown a cada segundo
  const interval = setInterval(() => {
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
}

// Inicia a contagem regressiva para às 17h
iniciarCountdown(horaAlvoString);
