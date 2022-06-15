$(document).ready(function () {
    carregarMatrizCompetitividade();
    carregarMatrizParticao();
});

carregarMatrizParticao = function()
{
    $.ajax({
        url: "https://api-inteligenciamercado.herokuapp.com/api/v1/matrizParticipacao/getMatriz?ano=2022&lista_cod_ies=1817%2C%201487%2C%205403%20%2C%201232%2C%201491",
        method: 'GET',
        dataType: "json",
        contentType: " application/json",
        headers: { "access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUzNjUyMGZhLWJiN2YtNTA1NS05ZjYyLTlhYjc2YjA5OTYwNSIsImNvZGUiOiI3NTIzMzhhNi04YzFmLTQ2NDEtOTljZS04MDgwZTcyYTViNzEiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NTUwNzI4MTgsImV4cCI6MTY1NTY3NzYxOH0.lUnmOEUlyWXkAPGDQ16F_S8paSU_5QvxHiVNivp7Ckk" }
        //data: JSON.stringify({ "msg": msg }),
    }).done(function (resp) {
        var matriz = resp.data.matriz;
        let ies = [];
        let dadosSaleShare = [];
        let dadosMarketSale = [];
        let cores = [];
        for (var i = 0; i < matriz.length; i++) {
            ies[i] = matriz[i].nome;
            dadosSaleShare[i] = matriz[i].sale_share;
            dadosMarketSale[i] = matriz[i].market_sale;
            cores[i] = getRandomColor();
        }   
        const dataSS = {
            labels:ies,
            datasets: [{
                label: "Dados",
                data: dadosSaleShare,
                backgroundColor: cores,
                hoverOffset: 5
            }]
        };     
        const configSS = {
            type: 'pie',
            data: dataSS,
        };

        const dataMS = {
            labels:ies,
            datasets: [{
                label: "Dados",
                data: dadosMarketSale,
                backgroundColor: cores,
                hoverOffset: 5
            }]
        };     
        const configMS = {
            type: 'pie',
            data: dataMS,
        };
        
        new Chart(
            document.getElementById('chartSaleShare'),
            configSS
        );

        new Chart(
            document.getElementById('chartMarketSale'),
            configMS
        );
    });
}

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

carregarMatrizCompetitividade = function () {
    $.ajax({
        url: "https://api-inteligenciamercado.herokuapp.com/api/v1/matrizCompetitividade/getAll?page=1",
        method: 'GET',
        dataType: "json",
        contentType: " application/json",
        headers: { "access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUzNjUyMGZhLWJiN2YtNTA1NS05ZjYyLTlhYjc2YjA5OTYwNSIsImNvZGUiOiI3NTIzMzhhNi04YzFmLTQ2NDEtOTljZS04MDgwZTcyYTViNzEiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NTUwNzI4MTgsImV4cCI6MTY1NTY3NzYxOH0.lUnmOEUlyWXkAPGDQ16F_S8paSU_5QvxHiVNivp7Ckk" }
        //data: JSON.stringify({ "msg": msg }),
    }).done(function (resp) {
        var igc = [];
        var precos = [];
        var concorrente = [];
        var cores = [];               
        console.log(resp);
        for (var i = 0; i < resp.data.length; i++) {     
            var cor = getRandomColor();
            igc[i] = resp.data[i].igc_continuo;
            precos[i] = resp.data[i].preco_medio;
            concorrente[i] = resp.data[i].concorrente;    
            cores[i] = cor;        
        }
        var concorrencia = {
            label: "Preço médio",
            backgroundColor: cores,
            borderColor: cores,
            data: precos,
        }
        
        var concorrenciaigc = {
            label: "IGC",
            backgroundColor: cores,
            borderColor: cores,
            data: igc,
        }

        const config = {
            type: 'bar',
            data: {
                labels: concorrente,
                datasets: [concorrencia]
            },
            options: {
                scales: {
                    y: {
                        //beginAtZero: true,
                        min:100.0,
                        max:1000.0,
                        //stepSize:0.5
                    }
                }
            }
        };

        const configIGC = {
            type: 'line',
            data: {
                labels: concorrente,
                datasets: [concorrenciaigc]
            },
            options: {
                scales: {
                    y: {
                        //beginAtZero: true,
                       // min:100.0,
                       // max:1000.0,
                        //stepSize:0.5
                    }
                }
            }
        };
        
        new Chart(
            document.getElementById('chartCompetitividade'),
            config
        );

        new Chart(
            document.getElementById('chartPosicionamento'),
            configIGC
        );
    });
}

