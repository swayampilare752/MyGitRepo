const pokemonContainer = document.getElementById("pokemonContainer");
let allPokemon = [];

// Fetch Pokémon list on page load
window.onload = async function () {
    await fetchAllPokemon();
};

// Type color mapping for all Pokémon types
const typeColors = {
    grass: "grass", fire: "fire", electric: "electric", water: "water",
    bug: "bug", normal: "normal", flying: "flying", fighting: "fighting",
    poison: "poison", rock: "rock", ground: "ground", psychic: "psychic",
    ghost: "ghost", ice: "ice", dragon: "dragon", dark: "dark",
    steel: "steel", fairy: "fairy"
};

// Fetch Pokémon Data
async function fetchAllPokemon() {
    try {
        let response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50");
        let data = await response.json();
        
        allPokemon = await Promise.all(
            data.results.map(async (pokemon) => {
                let res = await fetch(pokemon.url);
                let details = await res.json();
                return {
                    name: details.name,
                    image: details.sprites.front_default,
                    type: details.types.map(t => t.type.name),
                    abilities: details.abilities.map(a => a.ability.name),
                };
            })
        );

        displayPokemon(allPokemon);
    } catch (error) {
        console.error("Error fetching Pokémon data:", error);
    }
}

// Display Pokémon
function displayPokemon(pokemonList) {
    pokemonContainer.innerHTML = "";
    pokemonList.forEach(pokemon => {
        let card = document.createElement("div");
        let mainType = pokemon.type[0]; // Use the first type as primary
        let cardClass = typeColors[mainType] || "default";

        card.classList.add("pokemon-card", cardClass);
        card.innerHTML = `
            <div class="front">
                <img src="${pokemon.image}" alt="${pokemon.name}">
                <h3>${pokemon.name}</h3>
                <p>Type: ${pokemon.type.join(", ")}</p>
            </div>
            <div class="back">
                <h3>${pokemon.name}</h3>
                <p>Abilities: ${pokemon.abilities.join(", ")}</p>
            </div>
        `;
        card.addEventListener("click", () => card.classList.toggle("flipped"));
        pokemonContainer.appendChild(card);
    });
}

// Filter Pokémon by Type
async function filterByType() {
    let selectedType = document.getElementById("typeFilter").value;
    if (!selectedType) {
        displayPokemon(allPokemon);
        return;
    }

    let response = await fetch(`https://pokeapi.co/api/v2/type/${selectedType}`);
    let data = await response.json();

    let filteredPokemon = allPokemon.filter(pokemon => 
        data.pokemon.some(p => p.pokemon.name === pokemon.name)
    );

    displayPokemon(filteredPokemon);
}

// Reset Filter
function resetFilter() {
    document.getElementById("typeFilter").value = "";
    document.getElementById("searchBox").value = "";
    displayPokemon(allPokemon);
}

// Search Pokémon by Name
function searchPokemon() {
    let query = document.getElementById("searchBox").value.toLowerCase();
    let filteredPokemon = allPokemon.filter(pokemon => pokemon.name.includes(query));
    displayPokemon(filteredPokemon);
}
