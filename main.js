import countries_data from "./countries_data.js";

const countries = countries_data;

const doc = document;

const subtitle = doc.querySelector('.subtitle');
subtitle.textContent = 'Currently, we have 250 countries';

const graphTitle = doc.querySelector('.graph-title');
const graphWrapper = doc.querySelector('.graph-wrapper');


const containerGral = doc.querySelector('#container-gral');
const population = doc.querySelector('.population');
const languages = doc.querySelector('.languages');



const mostSpokenLanguages = () => {

    let recuento = {};
  countries.forEach((item) => {
    let idioma = item.languages;
    idioma.forEach((idioma) => {
      if(recuento[idioma]){
        recuento[idioma]++;
      }else{
        recuento[idioma] = 1;
      }
    })
  })
  let objetoDeIdiomas = Object.keys(recuento).map(item => ({
    lenguage: item,
    count: recuento[item]
  }))
  let objetoOrdenado = objetoDeIdiomas.sort((a, b) => a.count <  b.count ? 1 : -1).slice(0, 11);



containerGral.innerHTML = ''
for(let resultado in objetoOrdenado){
containerGral.innerHTML += `<div class="name">
						<div class="col-1">${objetoOrdenado[resultado].lenguage}</div>
						<div class="col-2"><progress max="100" value="${objetoOrdenado[resultado].count}"></progress></div>
						<div class="col-3"><p>${objetoOrdenado[resultado].count}</div>
					</div>
`


}
graphWrapper.textContent = '10 Most spoken languages in the world';
graphTitle.appendChild(graphWrapper);
graphTitle.style.background = '#F3F3F3'

}

const obtenerPoblacion = () => {
  
  let poblacion = [];
countries.forEach((item) => {
  let pais = item.name;
  let cantidad = item.population;
  poblacion.push({nombre: pais, numeros: cantidad});

})
let poblacionGeneral = poblacion.sort((a, b ) => a.numeros < b.numeros ? 1 : -1).slice(0, 11);

let worldNumber = 0;
let full = 100

for(let i = 0; i < poblacion.length; i++){
  worldNumber += poblacion[i].numeros
 
  containerGral.innerHTML = `
            <div class="world">
						  <div class="world-1"><p>World</p></div>
						  <div class="world-2"><progress max="100" value="${full}"></progress></div>
						  <div class="world-3"><p>${worldNumber.toLocaleString('en-Us')}</div>
					  </div>`


}

poblacionGeneral.forEach((item) => {
  
  
  const poblacionPaises = item.numeros;
  let porcentajePoblacion = ((poblacionPaises * full) / worldNumber).toFixed(2);
  
containerGral.innerHTML +=   
`<div class="name">
    <div class="col-1">${item.nombre}</div>
    <div class="col-2"><progress max="100" value="${Number(porcentajePoblacion)}"></progress></div>
    <div class="col-3">${poblacionPaises.toLocaleString("en-US")}</div>
  </div>
</div>`

})


graphWrapper.textContent = '10 Most populated countries in the world';
graphTitle.appendChild(graphWrapper);
graphTitle.style.background = 'white'

}
  

languages.addEventListener('click', mostSpokenLanguages)

population.addEventListener('click', obtenerPoblacion)

