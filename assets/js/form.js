// Preencher campo data com a data atual (formato dd/mm/aaaa)
function getDataAtual() {
    const hoje = new Date();
    const dia = String(hoje.getDate()).padStart(2, '0');
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const ano = hoje.getFullYear();
    return `${dia}/${mes}/${ano}`;
}

// Máscara para data dd/mm/aaaa
function maskData(value) {
    value = value.replace(/\D/g, "");
    if (value.length > 2) value = value.replace(/^(\d{2})(\d)/g, "$1/$2");
    if (value.length > 5) value = value.replace(/^(\d{2})\/(\d{2})(\d)/g, "$1/$2/$3");
    return value.slice(0, 10);
}

// Máscara para hora hh:mm:ss
function maskHora(value) {
    value = value.replace(/\D/g, "");
    if (value.length > 2) value = value.replace(/^(\d{2})(\d)/g, "$1:$2");
    if (value.length > 5) value = value.replace(/^(\d{2}):(\d{2})(\d)/g, "$1:$2:$3");
    return value.slice(0, 8);
}

document.addEventListener('DOMContentLoaded', function() {
    const dataInput = document.getElementById('data');
    const horaInput = document.getElementById('hora');
    const mensagemInput = document.getElementById('mensagem');
    const caracteresRestantes = document.getElementById('caracteresRestantes');
    const form = document.getElementById('countdownForm');

    // Preencher data atual
    dataInput.value = getDataAtual();

    // Máscara para data
    dataInput.addEventListener('input', function(e) {
        this.value = maskData(this.value);
    });

    // Máscara para hora
    horaInput.addEventListener('input', function(e) {
        this.value = maskHora(this.value);
    });

    // Atualizar caracteres restantes
    mensagemInput.addEventListener('input', function() {
        const restante = 150 - mensagemInput.value.length;
        caracteresRestantes.textContent = `${restante} caracteres restantes`;
    });

   // Validação do formulário
form.addEventListener('submit', function(e) {
    e.preventDefault();
    // Validação da data (dd/mm/aaaa)
    const dataRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!dataRegex.test(dataInput.value)) {
        Swal.fire('Data inválida!', 'Por favor, use o formato correto: <b>dd/mm/aaaa</b>', 'error');
        return;
    }
    // Validação da hora (hh:mm:ss)
    const horaRegex = /^\d{2}:\d{2}:\d{2}$/;
    if (!horaRegex.test(horaInput.value)) {
        Swal.fire('Hora inválida!', 'Por favor, use o formato correto: <b>hh:mm:ss</b>', 'error');
        return;
    }
    // Validação da mensagem
    if (mensagemInput.value.trim() === '' || mensagemInput.value.length > 150) {
        Swal.fire('Erro', 'Mensagem obrigatória e deve ter até 150 caracteres.', 'error');
        return;
    }
    // Se tudo ok
    Swal.fire('Sucesso', 'Formulário enviado com sucesso!', 'success');
    // Aqui você pode manipular os dados do formulário como quiser
});
}); 