/**
 * Plano_de_saude.js
 * Conforme atividade para compor a AV2, nesse Código foi implementado JS, criado para compor a calculadora de preço de plano de saúde.
 * Está incluso:
 * 1. Preechimento de dados do Cliente 
 * 2. Cálculo e exibição do IMC.
 * 3. Aceitação de vírgula ou ponto como separador decimal.
 * 4. Função para limpar campos (Novo Cálculo).**/
 
/**Começamos com a função auxiliar para determinar o risco de saúde baseados no IMC **/
function fatorComorbidade(imc) {
/** Aqui foi definido o multimplicador de risco. Quanto maior IMC, maior o fator usado na operadora B */    
    if (imc < 18.5) return 10;
    if (imc < 25) return 1;
    if (imc < 30) return 6;
    if (imc < 35) return 10;
    if (imc < 40) return 20;
    return 30;
}
/** Na função abaixo , tratei para que ela traduzisse o numero IMC para uma categoria textual */
function classificarIMC(imc) {
    if (imc < 18.5) return "Abaixo do peso";
    if (imc < 25) return "Peso normal";
    if (imc < 30) return "Sobrepeso";
    if (imc < 35) return "Obesidade Grau I";
    if (imc < 40) return "Obesidade Grau II";
    return "Obesidade Grau III (Mórbida)";
}

// ------------------------------------------------
// FUNÇÃO PARA NOVO CÁLCULO (Limpar Campos).
// ------------------------------------------------
/** Essa função criada, reseta a interface para que o usuário possa realizar várias simulações sem ter que recarregar a página */
function limparCampos() {

    // 1. Limpa os campos de input
    document.getElementById("nome").value = "";
    document.getElementById("idade").value = "";
    document.getElementById("peso").value = "";
    document.getElementById("altura").value = "";

    // 2. Limpa a área de resultado
    document.getElementById("resultado").innerHTML = "";

    /** Coloca o foco (cursor) de volta no primeiro campo, não tendo que o usuário defina através do mouse o inicio do preenchimento*/
    document.getElementById("nome").focus();
}

// ------------------------------------------------
// FUNÇÃO PRINCIPAL DE CÁLCULO
// ------------------------------------------------

/** Função principal que ao acionada pelo botão realiza o caúculo */
function calcular() {
    const nome = document.getElementById("nome").value.trim();
    const idade = parseInt(document.getElementById("idade").value);
    
    /**  Para não ocorrer erro na inclusão de dados pelo usuário, fiz esse tratamento para aceitar tanto ponto quandovírgula.*/

    const peso_str = document.getElementById("peso").value.replace(',', '.');
    const altura_str = document.getElementById("altura").value.replace(',', '.');

    /** foi feito para converter string tratadas para números decimais */
    const peso = parseFloat(peso_str);
    const altura = parseFloat(altura_str);

    /** validação dos campos, caso alguma coisa errada, alerta ao usuário */
    if (!nome || isNaN(idade) || isNaN(peso) || isNaN(altura) || idade <= 0 || peso <= 0 || altura <= 0) {
        alert("Preencha todos os campos corretamente.");
        return;
    }

    /**  Cálculos de IMC.*/
    const imc = peso / (altura * altura);
    const imc10 = imc / 10;
    const fator = fatorComorbidade(imc);
    const classificacao = classificarIMC(imc);

    /** Calculo do preço de cada plano */
    /** Calculo Operadora A */
    const a_basico = 100 + (idade * 10 * imc10);
    const a_standard = (150 + (idade * 15)) * imc10;
    const a_premium = (200 - (imc * 10) + (idade * 20)) * imc10;
    /** Calculo do preço operadora B */
    const b_basico = 100 + (fator * 10 * imc10);
    const b_standard = (150 + (fator * 15)) * imc10;
    const b_premium = (200 - (imc * 10) + (fator * 20)) * imc10;

    /** Armazena os resultados em uma Array de objetos para facilitar a criação de tabelas mais a frente */
    const planos = [
        { nome: "Básico", A: a_basico, B: b_basico },
        { nome: "Standard", A: a_standard, B: b_standard },
        { nome: "Premium", A: a_premium, B: b_premium }
    ];

    let tabela = `<h2>Resultado para: ${nome}</h2>`;
    
    /**  EXIBIÇÃO DO IMC: Valor e Classificação*/
    tabela += `<p>
        <strong>IMC: ${imc.toFixed(2)}</strong> 
        (Classificação: ${classificacao})
    </p>`;
    
    /** Cabeçalho da tabela */
    tabela += `<table><tr><th>Plano</th><th>Operadora A (R$)</th><th>Operadora B (R$)</th><th>Mais Vantajoso</th></tr>`;

    /** Iteração: Usamos um loop ForEach para percorrer os planos , comparar os preços e decidir o melhor linha a linha */
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
    
    /** Aqui finalizei inserindo o HTML gerado dentro da Div 'Resultado' na tela do Usuário */
    document.getElementById("resultado").innerHTML = tabela;
}