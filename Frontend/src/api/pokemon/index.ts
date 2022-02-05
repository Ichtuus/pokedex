import { Pokemon } from "@/types/pokeapi";
import { PokeApiUrls } from "./urls";

async function getPokemon(): Promise<Pokemon> {
  return await fetch(PokeApiUrls.ALL_POKEMON).then((response: any) => {
    return response.json();
  });
}

async function getPokemonSpecies(name: string) {
  return await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`).then(
    (response: any) => {
      return response.json();
    }
  );
}

export default {
  getPokemon,
  getPokemonSpecies,
};
