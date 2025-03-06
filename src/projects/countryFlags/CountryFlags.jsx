import axios from "axios";
import { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
const CountryFlags = () => {
  const [flagData, setFlagData] = useState([]);
  const [search,setSearch]=useState("");
  //const [regionSearch,setRegionSearch]=useState("");
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState(null);

  const countryFlagData = async () => {
    try {
      const countryApi = await axios.get("https://restcountries.com/v3.1/all");
      //console.log(countryApi.data);
      setFlagData(countryApi.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error);
    }
  };
  
  useEffect(() => {
    countryFlagData();
  }, []);


  //Search Functionality

  const searchData = flagData.filter((curCountry)=>curCountry.name.common.toLowerCase().includes(search.toLowerCase()));
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
                  placeholder="search by country name"  value={search} onChange={(e)=>setSearch(e.target.value)}
                />
                <IoIosSearch className=" text-lg absolute left-1 top-1" />
              </div>
            </div>
            <div className="md:text-end text-slate-500">
              {/* <select className="border border-slate-300 py-1 px-2 pe-10"  onChange={(e)=>setRegionSearch(e.target.value)}>
                <option>Fliter By Region</option>
                {
                    searchData.map((item)=>{
                        return(
                            <option value={item.region}>{item.region}</option>
                        )
                    })
                }
              </select> */}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 my-10">
            
            {
                loading ? <h1 className="text-3xl font-bold text-center col-span-4">Loading....</h1> : null
            }
            {
                    error ? <h1 className="text-3xl font-bold text-center text-red-500 col-span-4">{error.message}</h1> : null
                }
            
            {searchData.map((item,index) => {
                {
                    error ? <h1 className="text-3xl font-bold text-center text-red-700">{error.message}</h1> : null
                }
              return (
                <div className="rounded-lg border border-slate-200 shadow-md shadow-slate-200/50" key={index}>
                  <div className=" ">
                    <img
                      src={item.flags.svg}
                      className="rounded-t-lg h-62 w-full object-cover"
                      alt=""
                    />
                  </div>
                  <div className="py-6 px-3 text-slate-600">
                    <h2 className="text-xl font-medium mb-3">
                      {item.name.common}
                    </h2>
                    <p className="font-medium">
                      Population :
                      <span className="text-slate-500 font-normal ms-1">
                        {item.population}
                      </span>
                    </p>
                    <p className="font-medium">
                      Region :
                      <span className="text-slate-500 font-normal ms-1">{item.region}</span>
                    </p>
                    <p className="font-medium">
                      Capital :
                      <span className="text-slate-500 font-normal ms-1">{item.capital}</span>
                    </p>
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
export default CountryFlags;
