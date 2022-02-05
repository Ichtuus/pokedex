import html from "./poke-search.html";
import style from "./_poke-search.module.scss";
import { IWebComponent } from "@/type/index";
import { Component } from "../../core/decorator";

import pokemonApi from "../../api/pokemon/index";
import cache from "../../api/pokemon/cache";
import { PokeApiUrls } from "../../api/pokemon/urls";
import { Pokemon } from "../../types/pokeapi";

@Component({
  html: html,
  style: style,
  properties: ["prop"],
})
export class PokeSearch implements IWebComponent {
  get prop() {
    console.log("prop read");
    return "";
  }

  set prop(value: string) {
    console.log("prop written, new value", value);
  }

  constructor(private $el: HTMLElement) {}

  /**
   * Invoked each time the custom element is appended into a document-connected element.
   * This will happen each time the node is moved, and may happen before the element's contents have been fully parsed.
   */
  connectedCallback() {
    console.log("hello-world2 connected ");
    // this.$el.querySelector("#test")?.addEventListener("click", () => {
    //   console.log("call api");
    //   pokemonApi.getPokemon("https://pokeapi.co/api/v2/pokemon?limit=1118&offset=20");
    // });

    // let search = "";
    this.searchPokemon();
    // this.$el.querySelector(".search-field")?.addEventListener("input", () => {
    //   search = (<HTMLInputElement>text).value;
    //   console.log(search);
    //   this.searchPokemon(search);
    // });
  }

  searchPokemon() {
    let existingCache!: Pokemon;
    cache.getCacheIfExist(PokeApiUrls.ALL_POKEMON, "pokemon").then((cache) => {
      if (cache) {
        existingCache = cache;
      }
    });

    this.$el
      .querySelector(".search-submit")
      ?.addEventListener("click", async () => {
        let currentResearch = (<HTMLInputElement>(
          this.$el.querySelector(".search-field")
        )).value;

        console.log(currentResearch);

        let neededPokemon = [];

        if (existingCache) {
          neededPokemon = existingCache.results.filter(
            (pokemon) => pokemon.name == currentResearch
          );
        } else {
          const data = await pokemonApi.getPokemon();

          neededPokemon = data.results.filter(
            (pokemon) => pokemon.name == currentResearch
          );
        }

        const pokemon = await pokemonApi.getPokemonSpecies(
          neededPokemon[0].name
        );

        cache.createCache(PokeApiUrls.ALL_POKEMON, "pokemon");
        console.log("pokemon", pokemon);
      });
  }

  /**
   * Invoked each time the custom element is disconnected from the document's DOM.
   */
  disconnectedCallback() {
    console.log("hello-world disconnected");
  }

  /**
   * Invoked each time the custom element is moved to a new document.
   */
  adoptedCallback() {
    console.log("hello-world moved");
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
