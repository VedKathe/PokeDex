import MultiSelectDropdown from "../MultiSelectDropdown";
import Card from "../Card";
import { useEffect, useState } from "react";
const types = ["normal", "fighting", "flying", "poison", "ground", "rock", "bug", "ghost", "steel", "fire", "water", "grass", "electric", "psychic", "ice", "dragon", "dark", "fairy", "stellar", "unknown", "shadow"]
import Multiselect from 'multiselect-react-dropdown';
import RangeSlider from '../RangeSlider'

export default function Index({ pokemons, loading, handleOnChange, handletypefilter }) {

    const [statsFilter, setStatsFilter] = useState([])
    const [pokemonName, setpokemonName] = useState(pokemons)

    if (loading) {
        return <h2>Loading...</h2>

    }

    function onSelectionChange(list) {
        handletypefilter(list);
    }

    function handleStatsFilter(list) {
        setStatsFilter(list)
    }

    useEffect(() => {


        async function pokemonGetData() {
            const result = await Promise.all(await pokemons.map(async (value) => {
                const pokemondata = await fetch(value.url);
                if (!pokemondata.ok) {
                    throw new Error('Failed to fetch data');
                }
                const pokemonfulldata = await pokemondata.json();

                const result =
                    pokemonfulldata.stats.map((value, index) => {
                        if (value.base_stat > statsFilter[index][0] && value.base_stat < statsFilter[index][1]) {
                            return true;
                        }
                    })

                // Check if all elements in result are false
                const finalResult = result.some(value => value === true);
                    if(finalResult){
                        return pokemonfulldata.name
                    }
                
            })
            )
            setpokemonName(pokemons.filter((value,index)=>{
                return value.name === result[index]
            }));
            
        }

        pokemonGetData()
    }, [pokemons, statsFilter])

    return (
        <>
            {/* Serach and Filters */}
            <div className="flex flex-row justify-between pt-3">

                <div className="w-2/4 max-sm:w-full">
                    <label className="block">
                        <span className=" after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700 mb-1">
                            Search by
                        </span>
                        <input onChange={handleOnChange} type="text" name="search" className=" px-3 py-3 bg-[#C9DDE2] border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Name or Number" />
                    </label>


                </div>

                <div className="w-2/4  flex justify-evenly items-center ">
                    <div className="flex flex-row justify-between w-11/12  max-md:hidden">
                        <div className="">
                            <span className=" block text-sm font-medium text-slate-700 mb-1">
                                Type
                            </span>
                            <div className="w-full bg-while">

                                <MultiSelectDropdown options={types} name={"Types"} onSelectionChange={handletypefilter} />
                            </div>

                        </div>

                        <label className="block">
                            <span className=" block text-sm font-medium text-slate-700 mb-1">
                                Gender
                            </span>
                            <MultiSelectDropdown options={["Male", "Female"]} name={"Gender"} />
                        </label>

                        <label className="block">
                            <span className=" block text-sm font-medium text-slate-700 mb-1">
                                Stats
                            </span>
                            <RangeSlider name={"Stats"} setStatsfilter={handleStatsFilter} />
                        </label>
                    </div>
                    <div className="hidden  max-md:inline-block">
                        <button className="bg-[#5D5F7E]  text-white px-4 py-2 rounded-md ">Search</button>
                    </div>
                </div>



            </div>

            {/* Card Display */}
            <div className=" pt-3 grid grid-cols-6 gap-10  max-sm:grid-cols-2 max-sm:gap-2 mt-3">

                {
                    pokemonName.map((pokemon, i) => {
                        return (
                            <div className=" flex justify-center items-center" key={i} >

                                <Card pokemon={pokemon} pokemonlist={pokemons} statsFilter={statsFilter} />

                            </div>
                        );
                    })

                }

            </div>
        </>
    )
}