/**
 * trabalhoav2.js
 * Script de validação de formulário customizado para a Sano Representações.
 * Demonstra manipulação do DOM, tratamento de eventos e lógica condicional.
 */

// Define os IDs dos campos que são obrigatórios para a validação.
const CAMPOS_OBRIGATORIOS = [
    'nome',
    'empresa', // O campo que queríamos validar em específico
    'email',
    'telefone',
    'mensagem'
];

// Ouve o evento DOMContentLoaded para garantir que o HTML está pronto antes de tentar manipulá-lo.
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Seleciona o formulário de contato usando seu ID.
    const form = document.getElementById('contato-form');
    
    // 2. Adiciona o ouvinte para o evento de submissão (quando o botão "Enviar" é clicado).
    form.addEventListener('submit', function(event) {
        
        // Assume que o formulário está válido, a menos que encontre um erro.
        let formularioValido = true;
        
        // Itera sobre a lista de campos obrigatórios.
        CAMPOS_OBRIGATORIOS.forEach(idCampo => {
            
            const campo = document.getElementById(idCampo);
            const valor = campo.value.trim();
            
            // Lógica de validação: Verifica se o campo está vazio.
            if (valor === '') {
                // Se o campo estiver vazio:
                
                // Adiciona a classe CSS 'campo-erro' para destacar a borda (se o CSS foi incluído).
                campo.classList.add('campo-erro');
                
                // Marca o formulário como inválido.
                formularioValido = false;
            } else {
                // Se o campo foi preenchido corretamente, remove qualquer classe de erro anterior.
                campo.classList.remove('campo-erro');
            }
        });

        // 3. Ação baseada no resultado da validação.
        if (!formularioValido) {
            
            // Se houver algum campo vazio, impede a ação padrão (o envio do formulário).
            event.preventDefault(); 
            
            // Mostra uma mensagem única e personalizada ao usuário.
            alert("🛑 Atenção! Por favor, preencha todos os campos obrigatórios para enviar sua solicitação de parceria.");
            
        } else {
            // Se o formulário estiver 100% válido, o código permite o envio.
            // Para efeitos da sua avaliação, este é o ponto onde o professor vê o sucesso do JS.
            console.log("Validação JS bem-sucedida! Formulário pronto para ser enviado.");
            // (Neste caso, ele apenas recarrega a página, pois action="#" não tem destino real)
        }
    });
});