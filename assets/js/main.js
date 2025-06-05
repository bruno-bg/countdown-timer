let days = document.getElementById('days');
let hours = document.getElementById('hours');
let minutes = document.getElementById('minutes');
let seconds = document.getElementById('seconds');

let dd = document.getElementById('dd');
let hh = document.getElementById('hh');
let mm = document.getElementById('mm');
let ss = document.getElementById('ss');


// INICIO - Exemplo automático, caso queira pode ser feito com uma data específica
const today = new Date();
const mes = today.getMonth() + 1;
const dia = today.getDate();
const ano = today.getFullYear();
const dataFormatada = `${mes}/${dia}/${ano}`;


// const maisCincoDias = new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000);
// const month = maisCincoDias.getMonth() + 1;
// const day = maisCincoDias.getDate();
// const year = maisCincoDias.getFullYear();
// const formattedDate = `${month}/${day}/${year}`;

//Automático (adicionado 5 dias da data atual)
// let endDate = formattedDate;
// FIM - Exemplo automático, caso queira pode ser feito com uma data específica


// Exemplo de como adicionar 1 minuto à hora atual e formatar
const horaAtual = new Date();
const horaComUmMinuto = new Date(horaAtual.getTime() + 1 * 60 * 1000);

// Função para formatar a hora no formato HH:mm:ss
function formatarHora(data) {
    const horas = String(data.getHours()).padStart(2, '0');
    const minutos = String(data.getMinutes()).padStart(2, '0');
    const segundos = String(data.getSeconds()).padStart(2, '0');
    return `${horas}:${minutos}:${segundos}`;
}

console.log('Hora atual:', formatarHora(horaAtual));
console.log('Hora + 1 minuto:', formatarHora(horaComUmMinuto));

// Data manual 
// Formato da data mm/dd/yyyy e o formato da hora hh:mm:ss
let endDate = `${dataFormatada} ${formatarHora(horaComUmMinuto)}`;

let x = setInterval(function () {
    let now = new Date(endDate).getTime();
    let countDown = new Date().getTime();
    let distance = now - countDown;

    // cálculo do tempo por dias, horas, minutos e segundos
    let d = Math.floor(distance / (1000 * 60 * 60 * 24));
    let h = Math.floor((distance % (1000 * 60 * 60 * 24)) /
        (1000 * 60 * 60));
    let m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let s = Math.floor((distance % (1000 * 60)) / (1000));

    // saída do resultado do elemento com a id
    days.innerHTML = d + "<br><span>Dias</span>";
    hours.innerHTML = h + "<br><span>Horas</span>";
    minutes.innerHTML = m + "<br><span>Minutos</span>";
    seconds.innerHTML = s + "<br><span>Segundos</span>";

    // Animação da stroke
    // 365 dia no ano
    dd.style.strokeDashoffset = 440 - (440 * d) / 365;
    // 24 horas por dia
    hh.style.strokeDashoffset = 440 - (440 * h) / 24;
    // 60 minutos por hora
    mm.style.strokeDashoffset = 440 - (440 * m) / 60;
    // 60 segundos por minuto
    ss.style.strokeDashoffset = 440 - (440 * s) / 60;

    // Finalizada a contagem exibe uma mensagem
    // Esta mensagem está na linha 46 do index.html
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("time").style.display = "none";
        document.querySelector(".yourMsg").style.display = "block";
    }

})