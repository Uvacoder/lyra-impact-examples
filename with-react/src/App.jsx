import { useEffect, useState } from "react";
import impact from "@mateonunez/lyra-impact/dist/node/esm";
import { search as lyraSearch } from "@nearform/lyra";

function App() {
  const [lyra, setLyra] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchPokemon, setSearchPokemon] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    impact(
      "https://raw.githubusercontent.com/nearform/lyra/main/packages/examples/with-react/public/pokedex.json",
      {
        property: "pokemon",
      }
    )
      .then(setLyra)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (search) {
      const { hits } = lyraSearch(lyra, {
        term: search,
        properties: ["name"],
      });

      if (hits.length && !hits.some((x) => !x)) {
        setSearchPokemon([...new Set(hits)]);
      } else {
        setSearchPokemon([]);
      }
    }
  }, [search]);

  return (
    <main>
      <div className="flex w-full justify-center font-sans">
        <div className="ma">
          <h1>Lyra Impact with React</h1>

          <div className="w-full h-8">
            <input
              className="w-full h-full border-rounded border-1 border-gray-500 pl-2"
              type="text"
              placeholder="Find a Pokemon..."
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {!isLoading && (
            <div className="grid mt-4">
              {searchPokemon.map((pokemon) => (
                <div className="grid grid-cols-2 my-2" key={pokemon.name}>
                  <img src={pokemon.img} />

                  <div>
                    <h2>{pokemon.name}</h2>
                    <p>{pokemon.type.join(", ")}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default App;
