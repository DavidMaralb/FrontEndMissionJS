const pokeCard = document.querySelector('[data-poke-card]');
const pokeName = document.querySelector('[data-poke-name]');
const pokeImg = document.querySelector('[data-poke-img]');
const pokeImgContainer = document.querySelector('[data-poke-img-container]');
const pokeId = document.querySelector('[data-poke-id]');
const pokeTypes = document.querySelector('[data-poke-types]');
const pokeStats = document.querySelector('[data-poke-stats]');
const PokeStadistic = document.getElementById('PokeStadistic');
const PokeStadisticDrawObj = document.getElementById('PokeStadisticDraw');

const typeColors = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    default: '#2A1A1F',
};


const searchPokemon = event => {
    event.preventDefault();
    const { value } = event.target.pokemon;
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
        .then(data => data.json())
        .then(response => renderPokemonData(response))
        .catch(renderNotFound())
}

const renderPokemonData = data => {
    const sprite =  data.sprites.front_default;
    const { stats, types } = data;
    var PokemonEstadistics = [];

    pokeName.textContent = data.name;
    pokeImg.setAttribute('src', sprite);
    pokeId.textContent = `Nº ${data.id}`;
    renderPokemonTypes(types);
    PokemonEstadistics = renderPokemonStats(stats);
    if (PokemonEstadistics.length>1)
    {
        RGraph.Clear(PokeStadisticDrawObj);
        PokeStadisticDrawObj.className = "bg-light";
        PokeStadistic.style.display = "";
        DrawStadistics(PokemonEstadistics);
    }
}

const renderPokemonTypes = types => {
    pokeTypes.innerHTML = '';
    types.forEach(type => {
        const typeTextElement = document.createElement("P");
        typeTextElement.style.background = typeColors[type.type.name];
        typeTextElement.className = "fs-5";
        typeTextElement.textContent = type.type.name;
        pokeTypes.appendChild(typeTextElement);
    });
}

const renderPokemonStats = stats => {    
    var arrayValues = [];
    pokeStats.innerHTML = ''
    stats.forEach(stat => {
        const statElement = document.createElement("div");
        const statElementName = document.createElement("div");
        const statElementAmount = document.createElement("div");
        statElementName.textContent = stat.stat.name;
        statElementAmount.textContent = stat.base_stat;
        arrayValues.push(stat.base_stat);
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        pokeStats.appendChild(statElement);
    });

    return arrayValues;
}

const renderNotFound = () => {
    var PokemonEstadistics = [0,0,0,0,0,0];
    pokeName.textContent = 'No encontrado';
    pokeImg.setAttribute('src', './img/noencontrado.jpg');
    pokeImg.style.background =  '#fff';
    pokeTypes.innerHTML = '';
    pokeStats.innerHTML = '';
    pokeId.textContent = '';
    PokeStadistic.style.display = "none";
}

const DrawStadistics = (PokeStatisdics) => {
    rose = new RGraph.Rose({
        id: 'PokeStadisticDraw',
        data: PokeStatisdics,
        options: {
            labels: ['HP','Attack','Defense','Special Attack','Special Defense','Speed']
        }
    });

    rose.draw().responsive([
        {maxWidth: null,width:600,height:400,options:{textSize:12},css:{'float':'right'}},
        {maxWidth: 700,width:400,height:300,options:{textSize:10},css:{'float':'none'}}
    ]);
}