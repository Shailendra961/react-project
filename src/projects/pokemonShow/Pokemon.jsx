import axios from "axios";
import { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
const Pokemon = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState();
  const [search,setSearch]=useState("");

  const API = "https://pokeapi.co/api/v2/pokemon?limit=300";

  const fetchPokemon = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      //console.log(data.results);

      const detailPokemonData = data.results.map(async (curPokemon) => {
        //console.log(curPokemon.url);
        const res = await fetch(curPokemon.url);
        const data = await res.json();
        return data;
      });
      const detailedResponse = await Promise.all(detailPokemonData);
      setPokemonData(detailedResponse);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

// Search Funcationalty

  const searchData = pokemonData.filter((curPokemon)=>curPokemon.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <>
      <section>
        <div className="container mx-auto px-5 md:px-10">
          <div className="md:grid grid-cols-2 gap-4 my-10">
            <div>
              <div className="relative text-slate-500">
                <input
                  type="text"
                  className="border border-slate-400 focus:outline-none p-1 px-2 ps-6 -mt-5 placeholder:text-slate-400"
                  placeholder="search by name" value={search} onChange={(e)=>setSearch(e.target.value)}
                />
                <IoIosSearch className=" text-lg absolute left-1 top-1" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 my-10">
            {
                loading ? <h1 className="text-3xl font-bold text-center col-span-4">Loading....</h1> : null
            }
            {
                error ? <h1 className="text-3xl font-bold text-center text-red-500 col-span-4">{error.message}</h1> : null
            }
            {
              searchData.map((curPokemon) => {
              return (
                <div className="rounded-lg border border-slate-200 shadow-md shadow-slate-200/50" key={curPokemon.id}>
                  <div className="bg-indigo-50 hover:bg-indigo-100 py-5">
                    <img
                      src={curPokemon.sprites.other.dream_world.front_default}
                      className="rounded-t-lg h-32 w-full "
                      alt=""
                    />
                  </div>
                  <div className=" px-3 text-slate-600">
                    

                    <div className="flex justify-between border-b border-slate-300 pb-2 mb-3 mt-4 font-medium">
                      <div><h2 className="text-xl text-indigo-600 font-medium mb-3 underline">{curPokemon.name.toUpperCase()}</h2></div>
                      <div className="text-slate-500 font-normal ms-1">
                        <div className="px-4 pt-1 pb-2 bg-indigo-500 border-indigo-500 text-white rounded-md">
                        {
                          curPokemon.types.map((curType)=>curType.type.name).join(", ")
                        }
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between border-b border-slate-300 pb-2 mb-3 font-medium">
                      <div>Height</div>
                      <div className="text-slate-500 font-normal ms-1 bg-indigo-100 px-2 rounded-md">{curPokemon.height}</div>
                    </div>
                    <div className="flex justify-between border-b border-slate-300 pb-2 mb-3 font-medium">
                      <div>Weight</div>
                      <div className="text-slate-500 font-normal ms-1 bg-indigo-100 px-2 rounded-md">{curPokemon.weight}</div>
                    </div>
                    <div className="flex justify-between pb-2 mb-3 font-medium">
                      <div>Speed</div>
                      <div className="text-slate-500 font-normal ms-1 bg-indigo-100 px-2 rounded-md">{curPokemon.stats[5].base_stat}</div>
                    </div>                    
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};
export default Pokemon;
