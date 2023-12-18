const cityNameInput = document.getElementById('cityName');
const btn = document.getElementById("btn")
const forecastInfo = document.getElementById('forecastInfo');

const iconesClima = {
    "céu limpo": "./icone-ceu-limpo.png",
    "céu pouco nublado" : "./icone-pouco-nublado.png", 
    "algumas nuvens": "./icone-algumas-nuvens.png",
    "nuvens dispersas": "./icone-nuvens-dispersas.png",
    "nublado": "./icone-nublado.png",
    "nevoeiro" : "./icone-nevoeiro.png",
    "chuva fraca": "./icone-chuva-leve.png",
    "chuva moderada": "./icone-chuva-moderada.png",
    "chuva pesada": "./icone-chuva-pesada.png",
    "chuva forte": "./icone-chuva-pesada.png",
    "neve fraca": "./icone-neve-leve.png",
    "neve moderada": "./icone-neve-moderada.png",
    "neve pesada": "./icone-neve-pesada.png",
    "tempestade": "./icone-tempestade.png",
    "trovoadas": "./icone-trovoada.png",
    "tornado": "./icone-tornado.png",
    "ventos fortes": "./icone-vento.png",
    "garoa": "./icone-garoa.png",
    "rajadas de vento": "./icone-vento.png",
    "geada": "./icone-geada.png",
    "nuvens quebradas" : "./icone-nuvens-quebradas.png",
    "névoa" : "./icone-nevoa"
    // ... e assim por diante para todas as condições climáticas que você deseja lida
};




cityNameInput.addEventListener('keypress', (e) => {
    if (e.keyCode === 13) {
        const cityName = cityNameInput.value; // Captura o valor digitado no input
        pesquisar(cityName);
        forecastInfo.style.display ='none' // Chama a função pesquisar com o valor do cityName
    }
});

btn.addEventListener('click', (e) =>{
        const cityName = cityNameInput.value; // Captura o valor digitado no input
        pesquisar(cityName);
        forecastInfo.style.display ='none' // Chama a função pesquisar com o valor do cityName
})

function pesquisar(cityName) {
    // Obtendo dados atuais
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=599ce6e286d50f5903ebd39f8ade2ec6&units=metric&lang=pt`)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => console.error('Erro ao buscar dados:', error));

    // Obtendo previsão do tempo de 5 dias (por exemplo)
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=599ce6e286d50f5903ebd39f8ade2ec6&units=metric&lang=pt`)
        .then(response => response.json())
        .then(data => {
            displayForecast(data);
        })
        .catch(error => console.error('Erro ao buscar previsão do tempo:', error));
}

function displayForecast(data) { 
    forecastInfo.innerHTML = '<h2>Previsão do Tempo (5 dias):</h2><br>';
    for (let i = 0; i < data.list.length; i += 8) { 
        const forecast = data.list[i];
        const forecastDate = new Date(forecast.dt * 1000); 
        const forecastTemp = forecast.main.temp;
        

        const forecastItem = document.createElement('div');
        forecastItem.classList.add('forecast-item');
        const condition = forecast.weather[0].description;
        const iconeClima = iconesClima[condition];

        forecastItem.innerHTML = `
            <div class='textos'>
                <img class = 'imagem-foreInfo' src = '${iconeClima}'>
                <p>Data: ${forecastDate.toLocaleDateString()}</p>
                <p>Temperatura: ${forecastTemp}°C</p>
                <p>Condição: ${condition}</p>
            </div>
        `;
        forecastInfo.appendChild(forecastItem);
    }

    const btnVirar = document.getElementById("btn-virar");
    btnVirar.addEventListener('click', (e) => {
        forecastInfo.style.display = "flex"
    })
}

function displayWeather(data) {
    const weatherInfo = document.getElementById('weatherInfo');
    const condicao = data.weather[0].description
    const icones = iconesClima[condicao]
    weatherInfo.innerHTML = `
        
        <div class = 'textos'>
            <h2>Cidade: ${data.name}</h2> <br>
            <img src = ${icones} class='imagem-weaInfo'>
            <p>Temperatura: ${data.main.temp}°C</p><br>
            <p>Sensação térmica: ${data.main.feels_like}°C</p><br>
            <p>Condição: ${condicao}</p><br>
            <p>Umidade: ${data.main.humidity}%</p>
        </div>
        `;
        
        const infos = document.getElementById("infos")
        infos.style.display = "flex"
       // infos.style.opacity = 1
    }

