import html from "./poke-search.html";
import style from "./_poke-search.module.scss";
import { IWebComponent } from "@/type/index";
import { Component } from "../../core/decorator";

import { PokeApiUrls } from "../../api/pokemon/urls";
import { Pokemon } from "../../types/pokeapi";
import { frToEnPokemonName, enToFrPokemonName } from "../../utils/pokemon-name";

import pokemonApi from "../../api/pokemon/index";
import cache from "../../api/pokemon/cache";
import { hasFrBrowser, detectLanguage } from "../../utils/iso-language";

@Component({
  html: html,
  style: style,
  properties: ["prop"],
})
export class PokeSearch implements IWebComponent {
  static observedAttributes() {
    // return an array containing the names of the attributes you want to observe
  }

  constructor(private $el: HTMLElement) {
    // this._items = [];
  }
  // get _items() {
  //   console.log("prop read");
  //   return this._items;
  // }

  // set _items(value: any) {
  //   console.log("prop written, new value", value);
  //   this._items = value;
  // }

  /**
   * Invoked each time the custom element is appended into a document-connected element.
   * This will happen each time the node is moved, and may happen before the element's contents have been fully parsed.
   */
  connectedCallback() {
    console.log("poke-search connected ");
    this.searchPokemon();
  }

  searchPokemon() {
    let existingCache!: Pokemon;

    this.$el
      .querySelector(".search-submit")
      ?.addEventListener("click", async () => {
        let currentResearch = (<HTMLInputElement>(
          this.$el.querySelector(".search-field")
        )).value;

        // Translate user research in to english word because Pokeapi just support english language
        if (hasFrBrowser(navigator.language)) {
          if (detectLanguage(currentResearch)?.en) {
            // Needed if user use english translation with fr browser
            const { fr }: any = enToFrPokemonName(currentResearch);
            currentResearch = fr;
          }
          const { en }: any = frToEnPokemonName(currentResearch);
          currentResearch = en;
        }

        // Promise to get cache
        cache
          .getCacheIfExist(PokeApiUrls.ALL_POKEMON, "pokemon")
          .then((cache) => {
            if (cache) {
              existingCache = cache;
            }
          });

        let neededPokemon = [];

        // Optimize ressource api call with caching system
        if (existingCache) {
          neededPokemon = this.getCurrentResearch(
            existingCache,
            currentResearch.toLowerCase()
          );
        } else {
          const response = await pokemonApi.getPokemon();
          neededPokemon = this.getCurrentResearch(
            response,
            currentResearch.toLowerCase()
          );
        }

        const pokemon = await pokemonApi.getPokemonSpecies(
          neededPokemon[0].name
        );

        // Create cache if not exist
        if (!(await caches.has("pokemon"))) {
          cache.createCache(PokeApiUrls.ALL_POKEMON, "pokemon");
        }
        console.log("pokemon", pokemon);
      });
  }

  getCurrentResearch(existing: any, current: any) {
    try {
      return existing.results.filter((pokemon: any) => pokemon.name == current);
    } catch (error) {
      console.error("Something wen't wrong when research pokemon", error);
    }
  }

  /**
   * Invoked each time the custom element is disconnected from the document's DOM.
   */
  disconnectedCallback() {
    console.log("poke-search disconnected");
  }

  /**
   * Invoked each time the custom element is moved to a new document.
   */
  adoptedCallback() {
    console.log("poke-search moved");
  }

  /**
   * Invoked each time one of the custom element's attributes is added, removed, or changed.
   * Which attributes to notice change for is specified in a static get observedAttributes method
   *
   * @param name
   * @param oldValue
   * @param newValue
   */
  attributeChangedCallback(name: string, oldValue: any, newValue: any) {
    console.log(
      `${name} changed, oldValue: ${oldValue}, newValue: ${newValue}`
    );
  }
}

// Ref.: https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements
