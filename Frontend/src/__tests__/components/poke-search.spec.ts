import { PokeSearch } from "../../components/poke-search/poke-search";

jest.mock("../../core/decorator");

describe("Validator", () => {
  const mockElement = document.createElement("");

  const Search = new PokeSearch(mockElement);
  console.log("searhc", Search);
});
