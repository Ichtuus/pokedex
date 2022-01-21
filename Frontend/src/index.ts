// LINK polyfill
import "whatwg-fetch"; // for IE
import "core-js/stable";
import "regenerator-runtime/runtime";

// LINK global style
// import "./style/_global.module.css";

// import "./components/_pokedex.module.scss"

import { wrap } from "./core/component";
import observedAttributesHelloworld from "./utils";

customElements.define(
  "hello-world",
  wrap(
    () => import("./components/employee-card"),
    "EmployeeCard",
    observedAttributesHelloworld
  )
);

const App = async () => {
  const template = `
    <main>
      <hello-world></hello-world>
    </main>  
  `;

  document.getElementById("app")!.innerHTML = await template;
};

export default App();
