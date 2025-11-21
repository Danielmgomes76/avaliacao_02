/**
 * Plano_de_saude.js
 * * Código JavaScript criado para calculadora de preço de plano de saúde,
 * Está incluso:
 * 1. Cálculo e exibição do IMC.
 * 2. Aceitação de vírgula ou ponto como separador decimal.
 * 3. Função para limpar campos (Novo Cálculo).
 */

function fatorComorbidade(imc) {
    if (imc < 18.5) return 10;
    if (imc < 25) return 1;
    if (imc < 30) return 6;
    if (imc < 35) return 10;
    if (imc < 40) return 20;
    return 30;
}

function classificarIMC(imc) {
    if (imc < 18.5) return "Abaixo do peso";
    if (imc < 25) return "Peso normal";
    if (imc < 30) return "Sobrepeso";
    if (imc < 35) return "Obesidade Grau I";
    if (imc < 40) return "Obesidade Grau II";
    return "Obesidade Grau III (Mórbida)";
}

// ------------------------------------------------
// FUNÇÃO PARA NOVO CÁLCULO (Limpar Campos)
// ------------------------------------------------
function limparCampos() {
    // 1. Limpa os campos de input
    document.getElementById("nome").value = "";
    document.getElementById("idade").value = "";
    document.getElementById("peso").value = "";
    document.getElementById("altura").value = "";

    // 2. Limpa a área de resultado
    document.getElementById("resultado").innerHTML = "";

    // Coloca o foco (cursor) de volta no primeiro campo
    document.getElementById("nome").focus();
}

// ------------------------------------------------
// FUNÇÃO PRINCIPAL DE CÁLCULO
// ------------------------------------------------
function calcular() {
    const nome = document.getElementById("nome").value.trim();
    const idade = parseInt(document.getElementById("idade").value);
    
    // Aceita virgulo ou ponto , para não ter problema com a maneira que a pessoa incluir os dados, Substituindo a vírgula por ponto antes do parseFloat.

    const peso_str = document.getElementById("peso").value.replace(',', '.');
    const altura_str = document.getElementById("altura").value.replace(',', '.');

    const peso = parseFloat(peso_str);
    const altura = parseFloat(altura_str);

    if (!nome || isNaN(idade) || isNaN(peso) || isNaN(altura) || idade <= 0 || peso <= 0 || altura <= 0) {
        alert("Preencha todos os campos corretamente.");
        return;
    }

    const imc = peso / (altura * altura);
    const imc10 = imc / 10;
    const fator = fatorComorbidade(imc);
    const classificacao = classificarIMC(imc);

    // Cálculos de Planos.
    const a_basico = 100 + (idade * 10 * imc10);
    const a_standard = (150 + (idade * 15)) * imc10;
    const a_premium = (200 - (imc * 10) + (idade * 20)) * imc10;

    const b_basico = 100 + (fator * 10 * imc10);
    const b_standard = (150 + (fator * 15)) * imc10;
    const b_premium = (200 - (imc * 10) + (fator * 20)) * imc10;

    const planos = [
        { nome: "Básico", A: a_basico, B: b_basico },
        { nome: "Standard", A: a_standard, B: b_standard },
        { nome: "Premium", A: a_premium, B: b_premium }
    ];

    let tabela = `<h2>Resultado para: ${nome}</h2>`;
    
    // EXIBIÇÃO DO IMC: Valor e Classificação
    tabela += `<p>
        <strong>IMC: ${imc.toFixed(2)}</strong> 
        (Classificação: ${classificacao})
    </p>`;
    
    tabela += `<table><tr><th>Plano</th><th>Operadora A (R$)</th><th>Operadora B (R$)</th><th>Mais Vantajoso</th></tr>`;

    planos.forEach(plano => {
        const melhor = plano.A < plano.B ? "A" : "B";
        tabela += `<tr>
            <td>${plano.nome}</td>
            <td>R$ ${plano.A.toFixed(2)}</td>
            <td>R$ ${plano.B.toFixed(2)}</td>
            <td>Operadora ${melhor}</td>
        </tr>`;
    });

    tabela += `</table>`;
    
    document.getElementById("resultado").innerHTML = tabela;
}