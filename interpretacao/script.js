function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function trocarFormulario() {
    const servico = document.getElementById('tipoServico').value;
    const formInt = document.getElementById('form-interpretacao');
    const formTrad = document.getElementById('form-traducao');
    const resultado = document.getElementById('resultado');

    formInt.classList.add('hidden');
    formTrad.classList.add('hidden');
    resultado.classList.add('hidden');

    if (servico === 'interpretacao') {
        formInt.classList.remove('hidden');
    } else if (servico === 'traducao') {
        formTrad.classList.remove('hidden');
    }
}

function calcularInterpretacao() {
    const tipoEvento = document.getElementById('int-tipo').value;
    const minutos = parseFloat(document.getElementById('int-tempo').value);
    const gravado = document.getElementById('int-gravado').value;

    if (isNaN(minutos) || minutos <= 0) {
        alert("Por favor, digite um tempo válido.");
        return;
    }

    let valorHoraBase = 144.00;
    
    if (tipoEvento === 'artistico') {
        valorHoraBase = 192.00;
    }

    let qtdProfissionais = 1;
    if (minutos > 60) {
        qtdProfissionais = 2;
    }

    const horasCobradas = minutos / 60;

    const totalHorasValor = (valorHoraBase * horasCobradas) * qtdProfissionais;


    let porcentagemImagem = 0;
    let valorImagem = 0;

    if (gravado === 'sim') {
        porcentagemImagem = 10;
        valorImagem = totalHorasValor * 0.10;
    }

    const valorTotal = totalHorasValor + valorImagem;
    const imposto = valorTotal * 0.155; 

    mostrarResultado([
        { label: "Valor da hora (por intérprete)", valor: formatarMoeda(valorHoraBase) },
        { label: "Quantidade de intérpretes", valor: qtdProfissionais },
        { label: "Tempo total (horas)", valor: horasCobradas.toFixed(2) + "h" },
        { label: "Valor base (Horas x Profissionais)", valor: formatarMoeda(totalHorasValor) },
        { label: "Acréscimo Direito de Imagem", valor: porcentagemImagem + "%" },
        { label: "Valor do Direito de Imagem", valor: formatarMoeda(valorImagem) },
        { label: "Impostos (15,5%)", valor: formatarMoeda(imposto) },
        { label: "TOTAL A PAGAR", valor: formatarMoeda(valorTotal), destaque: true }
    ]);
}

function calcularTraducao() {
    const tipoMaterial = document.getElementById('trad-tipo').value; // 'conteudo' ou 'propaganda'
    const minutos = parseFloat(document.getElementById('trad-tempo').value);
    const temLegenda = document.getElementById('trad-legenda').value;

    if (isNaN(minutos) || minutos <= 0) {
        alert("Por favor, digite um tempo válido.");
        return;
    }

    let valorPorMinuto = 0;

    if (tipoMaterial === 'propaganda') {
        valorPorMinuto = 250.00;
    } else {
        if (temLegenda === 'sim') {
            valorPorMinuto = 96.00;
        } else {
            valorPorMinuto = 60.00;
        }
    }

    const valorBase = valorPorMinuto * minutos;

    const porcentagemImagem = 30;
    const valorImagem = valorBase * 0.30;

    const valorTotal = valorBase + valorImagem;
    const imposto = valorTotal * 0.155;

    mostrarResultado([
        { label: "Valor do minuto", valor: formatarMoeda(valorPorMinuto) },
        { label: "Tempo total (minutos)", valor: minutos + " min" },
        { label: "Valor base", valor: formatarMoeda(valorBase) },
        { label: "Acréscimo Direito de Imagem", valor: porcentagemImagem + "%" },
        { label: "Valor do Direito de Imagem", valor: formatarMoeda(valorImagem) },
        { label: "Impostos (15,5%)", valor: formatarMoeda(imposto) },
        { label: "TOTAL A PAGAR", valor: formatarMoeda(valorTotal), destaque: true }
    ]);
}

function mostrarResultado(itens) {
    const divResultado = document.getElementById('resultado');
    const divLista = document.getElementById('lista-resultados');
    
    divLista.innerHTML = '';

    itens.forEach(item => {
        const div = document.createElement('div');
        
        if (item.destaque) {
            div.className = 'resultado-total';
            div.innerHTML = `${item.label}: ${item.valor}`;
        } else {
            div.className = 'resultado-item';
            div.innerHTML = `<span>${item.label}</span> <strong>${item.valor}</strong>`;
        }
        
        divLista.appendChild(div);
    });

    divResultado.classList.remove('hidden');
}
