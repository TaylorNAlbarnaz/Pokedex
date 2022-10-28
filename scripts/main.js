const pokeHolder = document.getElementsByClassName('pokeholder')[0];
const previousButton = document.getElementById('left_button');
const nextButton = document.getElementById('right_button');
const counter = document.getElementById('counter');

const pokeCards = document.getElementsByClassName('pokemon');
let page = 1;

function loadPokemon(url) {
    pokeapi.getPokemon(url)
        .then((pokemon) => {
            for (i=0; i<pokeCards.length; i++) {
                pokeCards[i].innerHTML = `
                <div class="pokeimg">
                <img src="${pokemon[i].photo}"/>
                </div>
                <div class="pokeinfo">
                    <div class="poketypes">
                        <button>Grass</button>
                        <button>Water</button>
                    </div>
                    <h2>${pokemon[i].name}</h2>
                </div> 
                `
            }
        })
}

loadPokemon();

nextButton.addEventListener('click', ()=> {
    if (next !== null && page < 167) {
        loadPokemon(next)
        page++;
        counter.innerHTML = page;
    }
})

previousButton.addEventListener('click', ()=> {
    if (previous !== null) {
        loadPokemon(previous)
        page--;
        counter.innerHTML = page;
    }
})