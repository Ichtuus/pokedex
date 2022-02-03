import html from "./poke-search.html";
import style from "./_poke-search.module.scss";
import { IWebComponent } from "@/type/index";
import { Component } from "../../core/decorator";

import pokemonApi from "../../api/pokemon/index";

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
    const textContainer = this.$el.querySelector(".show-clicked-btn");

    this.$el.querySelector("#test")?.addEventListener("click", () => {
      console.log("call api");
      pokemonApi.getPokemon("https://pokeapi.co/api/v2/pokemon/1");
    });
    this.$el.querySelector(".btn-to-click")?.addEventListener("click", () => {
      if (textContainer) {
        textContainer.innerHTML = "clicked!!";
      }
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
