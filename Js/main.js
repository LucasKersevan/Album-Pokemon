import { fetchPokemon } from "./api.js";

const album = document.getElementById("album");
const emptySlots = 151;
const savedData = JSON.parse(localStorage.getItem("albumData")) || [];

// Inicializar álbum
function initAlbum() {
  for (let i = 0; i < emptySlots; i++) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.index = i;

    const savedPokemon = savedData.find((item) => item.index === i);
    if (savedPokemon) {
      renderPokemon(card, savedPokemon.image, savedPokemon.name);
    }

    card.addEventListener("click", () => handleCardClick(card, i));
    album.appendChild(card);
  }
}

// Renderizar Pokémon en una carta
function renderPokemon(card, image, name) {
  card.innerHTML = `<img src="${image}" alt="${name}" />`;
  card.classList.add("filled");
}

// Manejar clics en las cartas
async function handleCardClick(card, index) {
  if (!card.classList.contains("filled")) {
    const input = document.createElement("input");
    input.type = "number";
    input.placeholder = "ID del Pokémon (1-151)";
    card.appendChild(input);
    input.addEventListener("change", async () => {
      const pokemonId = input.value;
      try {
        const data = await fetchPokemon(pokemonId);
        const image = data.sprites.other["official-artwork"].front_default;
        const name = data.name;

        if (image) {
          renderPokemon(card, image, name);
          savedData.push({ index, name, image });
          localStorage.setItem("albumData", JSON.stringify(savedData));
        }
      } catch (error) {
        showError(card, error.message);
      } finally {
        card.removeChild(input);
      }
    });
  } else {
    card.innerHTML = "";
    card.classList.remove("filled");
    const idx = savedData.findIndex((item) => item.index === index);
    if (idx !== -1) savedData.splice(idx, 1);
    localStorage.setItem("albumData", JSON.stringify(savedData));
  }
}

// Mostrar errores en el DOM
function showError(card, message) {
  const errorDiv = document.createElement("div");
  errorDiv.textContent = message;
  errorDiv.className = "error";
  card.appendChild(errorDiv);
  setTimeout(() => errorDiv.remove(), 3000);
}

// Iniciar la aplicación
initAlbum();
