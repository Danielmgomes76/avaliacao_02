const CAMPOS_OBRIGATORIOS = [
    'nome',
    'empresa',
    'email',
    'telefone',
    'mensagem'
];
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contato-form');
    form.addEventListener('submit', function (event) {
        let formularioValido = true;
        CAMPOS_OBRIGATORIOS.forEach(idCampo => {
            const campo = document.getElementById(idCampo);
            const valor = campo.value.trim();
            if (valor === '') {
                campo.classList.add('campo-erro');
                formularioValido = false;
            } else {
                campo.classList.remove('campo-erro');
            }
        });
        const emailCampo = document.getElementById('email');
        const emailValor = emailCampo.value.trim();
        if (emailValor !== '' && !regexEmail.test(emailValor)) {
            alert("Email inválido! Insira um email válido.");
            console.log("Email inválido detectado:", emailValor);
            emailCampo.classList.add('campo-erro');
            formularioValido = false;
        } else if (emailValor !== '') {
            emailCampo.classList.remove('campo-erro');
        }
        if (!formularioValido) {
            event.preventDefault();
            alert("Atenção! Preencha todos os campos obrigatórios para enviar sua solicitação de parceria.");
        }
        if (formularioValido) {
            const receberSubmit = document.querySelector('#contato-form');
            if (receberSubmit) {
                alert("Formulário enviado com sucesso! Em breve entraremos em contato.");
            }
        }
    });
});
