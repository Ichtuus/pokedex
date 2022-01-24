// LINK polyfill
import "whatwg-fetch"; // for IE
import "core-js/stable";
import "regenerator-runtime/runtime";

// LINK global style
import "./style/_global.module.css";

import { wrap } from "./core/component";
import observedAttributes from "./utils";

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
    </main>  
  `;

  document.getElementById("app")!.innerHTML = await template;
};

export default App();
