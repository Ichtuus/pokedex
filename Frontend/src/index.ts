// LINK polyfill
import "whatwg-fetch"; // for IE
import "core-js/stable";
import "regenerator-runtime/runtime";

// LINK global style
import "./style/_global.module.css";

import { wrap } from "./core/component";
import observedAttributes from "./utils";

customElements.define(
  "poke-card",
  wrap(
    () => import("./components/poke-card/poke-card"),
    "PokeCard",
    observedAttributes
  )
);
customElements.define(
  "poke-search",
  wrap(
    () => import("./components/poke-search/poke-search"),
    "PokeSearch",
    observedAttributes
  )
);

const App = async () => {
  const template = `
    <main>
      <poke-search></poke-search>
      <poke-card></poke-card>
    </main>  
  `;

  document.getElementById("app")!.innerHTML = await template;
};

export default App();
