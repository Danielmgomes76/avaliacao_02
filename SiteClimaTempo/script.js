// Mapeamento de Weather Code (WMO) para descrição textual em português
// Referência: https://www.open-meteo.com/en/docs
function obterDescricaoClima(code) {
    if (code === 0) return "Céu Limpo ☀️";
    if (code >= 1 && code <= 3) return "Parcialmente Nublado 🌥️";
    if (code === 45 || code === 48) return "Nevoeiro / Névoa 🌫️";
    if (code >= 51 && code <= 55) return "Chuvisco Leve a Intenso 🌧️";
    if (code >= 61 && code <= 65) return "Chuva Moderada a Forte 💧";
    if (code >= 71 && code <= 75) return "Neve Leve a Forte ❄️";
    if (code >= 80 && code <= 82) return "Pancadas de Chuva Fortes ⛈️";
    if (code >= 95 && code <= 99) return "Tempestade com Granizo ⚡";
    return "Condição Desconhecida";
}

// Função principal para buscar o clima
async function buscarClima() {
    var cidadeInput = document.getElementById("city-input");
    var cidadeNome = cidadeInput.value.trim();

    var statusElement = document.getElementById("status-message");
    var resultadoElement = document.getElementById("weather-result");

    // Limpar resultados e mensagens anteriores
    statusElement.textContent = "";
    resultadoElement.style.display = "none";
    
    if (cidadeNome === "") {
        statusElement.textContent = "⚠️ Por favor, digite o nome de uma cidade.";
        return;
    }

    // Mostrar mensagem de carregamento (simples, sem animação)
    statusElement.textContent = "Buscando dados... ⏳";

    try {
        // 1. CHAMA A API DE GEOCODING
        var geoUrl = "https://geocoding-api.open-meteo.com/v1/search?name=" + encodeURIComponent(cidadeNome) + "&count=1&language=pt&format=json";
        
        var geoResponse = await fetch(geoUrl);
        if (!geoResponse.ok) {
            throw new Error("Falha na busca de coordenadas. Status: " + geoResponse.status);
        }
        
        var geoData = await geoResponse.json();

        // Verifica se encontrou a cidade
        if (!geoData.results || geoData.results.length === 0) {
            statusElement.textContent = "❌ Cidade não encontrada. Tente um nome diferente.";
            return;
        }

        var localizacao = geoData.results[0];
        var lat = localizacao.latitude;
        var lon = localizacao.longitude;
        var nomeCompleto = localizacao.name + ", " + localizacao.country;

        // 2. CHAMA A API DE CLIMA
        var climaUrl = "https://api.open-meteo.com/v1/forecast?latitude=" + lat + "&longitude=" + lon + "&current=temperature_2m,apparent_temperature,relative_humidity_2m,weather_code&timezone=auto";

        var climaResponse = await fetch(climaUrl);
        if (!climaResponse.ok) {
            throw new Error("Falha ao obter dados do clima. Status: " + climaResponse.status);
        }

        var climaData = await climaResponse.json();

        // 3. EXIBE AS INFORMAÇÕES
        var current = climaData.current;
        
        document.getElementById("city-name").textContent = nomeCompleto;
        document.getElementById("temperature").textContent = current.temperature_2m + " °C";
        document.getElementById("apparent-temperature").textContent = current.apparent_temperature + " °C";
        document.getElementById("humidity").textContent = current.relative_humidity_2m + " %";
        document.getElementById("weather-description").textContent = obterDescricaoClima(current.weather_code);

        // Limpa a mensagem de status e mostra o resultado
        statusElement.textContent = "✅ Dados atualizados.";
        resultadoElement.style.display = "block";

    } catch (erro) {
        // 4. TRATA ERROS (Ex: falha de rede, problema na API)
        console.error("Erro na consulta de clima:", erro);
        statusElement.textContent = "🚨 Erro ao buscar clima: " + erro.message;
        resultadoElement.style.display = "none";
    }
}

// Configura o evento do botão de busca
function inicializar() {
    var searchButton = document.getElementById("search-button");
    // 'addEventListener' é o método padrão para configurar eventos
    searchButton.addEventListener("click", buscarClima);
}

// Chama a função de inicialização quando o DOM estiver totalmente carregado
document.addEventListener("DOMContentLoaded", inicializar);