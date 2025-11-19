function fatorComorbidade(imc) {
  if (imc < 18.5) return 10;
  if (imc < 25) return 1;
  if (imc < 30) return 6;
  if (imc < 35) return 10;
  if (imc < 40) return 20;
  return 30;
}

function calcular() {
  const nome = document.getElementById("nome").value.trim();
  const idade = parseInt(document.getElementById("idade").value);
  const peso = parseFloat(document.getElementById("peso").value);
  const altura = parseFloat(document.getElementById("altura").value);

  if (!nome || isNaN(idade) || isNaN(peso) || isNaN(altura) || idade <= 0 || peso <= 0 || altura <= 0) {
    alert("Preencha todos os campos corretamente.");
    return;
  }

  const imc = peso / (altura * altura);
  const imc10 = imc / 10;
  const fator = fatorComorbidade(imc);

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
  document.getElementById("resultado").innerHTML = tabela;
  tabela += `<table><tr><th>Plano</th><th>Operadora A (R$)</th><th>Operadora B (R$)</th><th>Mais Vantajoso</th></tr>`;

  planos.forEach(plano => {
    const melhor = plano.A < plano.B ? "A" : "B";
    tabela += `<tr>
      <td>${plano.nome}</td>
      <td>${plano.A.toFixed(2)}</td>
      <td>${plano.B.toFixed(2)}</td>
      <td>Operadora ${melhor}</td>
    </tr>`;
  });

  tabela += `</table>`;
  document.getElementById("resultado").innerHTML = tabela;
}
