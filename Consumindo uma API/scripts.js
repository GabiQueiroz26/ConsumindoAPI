// EndPoint -> o acesso inicial a API
let url = "https://restcountries.com/v3.1/all";

let nomePaises = document.querySelector("#nomePaises");
let escolhePaises = document.querySelector("#escolhePaises");

// Fazendo uma requisição
console.log("Fazendo a requisição...");
fetch(url)
    .then(resposta => resposta.json())
    .then(paises => exibePaises(paises))
    .catch(erro => console.error(erro));

function exibePaises(paises) {
    let html = `
        <option value=""></option>
    `;

    for (let pais of paises) {
        html += `
            <option value="${pais.name.common}">${pais.name.common}</option>
        `;
    }

    nomePaises.insertAdjacentHTML("beforeend", html);

    function infoPaises(infoPais) {
        if (infoPais) {
            let moedas = infoPais.currencies
            let keys = Object.keys(moedas)

            let nameCurrencies = '';

            for (let i = 0; i < keys.length; i++) {
                const nameMoedas = moedas[keys[i]].name;

                if (i > 0) {
                    nameCurrencies += ', ';
                }

                nameCurrencies += nameMoedas;
            }

            let idiomas = infoPais.languages
            let key = Object.keys(idiomas)

            let nameLanguages = '';

            for (let i = 0; i < key.length; i++) {
                const nameIdiomas = idiomas[key[i]];

                if (i > 0) {
                    nameLanguages += ', ';
                }

                nameLanguages += nameIdiomas;
            }

            // Exibe as informações dos países
            escolhePaises.innerHTML = `
                <div id="pais">
                    <div id="nome">
                        <h1>${infoPais.name.common}</h1>
                    </div>
                    <br>
                    <div id="bandeira">
                        <img src="${infoPais.flags.png}" />
                    </div>
                    <div id="dados-pais">
                        <div id="capital">
                            <a><strong>Capital:</strong> ${infoPais.capital}</a>
                        </div>
                        <div id="continente">
                            <a><strong>Continente:</strong> ${infoPais.continents}<a>
                        </div>
                        <div id="populacao">
                            <a><strong>População:</strong> ${infoPais.population} habitantes</a>
                        </div>
                        <div id="area">
                            <a><strong>Área:</strong> ${infoPais.area} km²</a>
                        </div>
                        <div id="moeda">
                            <a><strong>Moeda:</strong> ${nameCurrencies}</a>
                        </div>
                        <div id="idioma">
                            <a><strong>Idioma:</strong> ${nameLanguages}</a>
                        </div>
                        <div id="fronteira">
                        <a><strong>Países que fazem fronteira</strong>: ${infoPais.borders}</a>
                    </div>
                    </div>
                </div>
            `;
        } else {
            escolhePaises.innerHTML = "";
        }
    }

    nomePaises.addEventListener("change", function () {
        let buscaPais = this.value;

        if (buscaPais) {

            let infoPais = paises.find(pais => pais.name.common === buscaPais);

            if (infoPais) {
                infoPaises(infoPais);

 
                let fronteira = document.querySelector("#fronteira");
                fronteira.addEventListener("click", function () {
                    let paisVizinho = fronteira;
                    let infoPaisVizinho = paises.find(pais => pais.name.cca2 == paisVizinho);
                    infoPaises(infoPaisVizinho);

                    nomePaises.value = paisVizinho;
                });
            }
        }   
    });
}
