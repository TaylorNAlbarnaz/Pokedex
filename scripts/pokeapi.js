const pokeapi = {};

let next;
let previous;

class Pokemon {
    number;
    name;
    type;
    types = [];
    photo;
}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeapi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeapi.getPokemon = (url = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=3`) => {
    return fetch(url)
        .then((res) => res.json())
        .then((json) => {
            next = json.next;
            previous = json.previous;
            return json.results
        })
        .then((pokemons) => pokemons.map(pokeapi.getPokemonDetail))
        .then((requests) => Promise.all(requests))
        .then((pokeDetails) => pokeDetails)
}