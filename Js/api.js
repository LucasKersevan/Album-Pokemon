// api.js: Maneja las llamadas a la API
export async function fetchPokemon(pokemonId) {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId.toLowerCase()}`);
      if (!response.ok) throw new Error("No se encontró el Pokémon.");
      return await response.json();
    } catch (error) {
      throw new Error("Error al obtener el Pokémon: " + error.message);
    }
  }
  