import { Pokemon } from "@/types/pokeapi";

async function getPokemon(url: string): Promise<Pokemon> {
  return await fetch(url).then((response: any) => response.data);
}

export default {
  getPokemon,
};
