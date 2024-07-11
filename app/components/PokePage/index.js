import MultiSelectDropdown from "../MultiSelectDropdown";
import Card from "../Card";
const COUNTRIES = ["Austria", "Belgium", "Croatia", "Bulgaria", "Cyprus", "Czech Republic", "Denmark", "Estonia", "Finland", "France", "Germany", "Greece", "Hungary", "Ireland", "Italy", "Latvia", "Lithuania", "Luxembourg", "Malta", "Netherlands", "Poland", "Portugal", "Romania", "Slovakia", "Slovenia", "Spain", "Sweden", "Ukraine"];


export default function Index({ pokemons , loading }) {
    if (loading){
        return <h2>Loading...</h2>
    }
    return (
        <>
            {/* Serach and Filters */}
            <div className="flex flex-row justify-between pt-3">

                <div className="w-2/4 max-sm:w-full">
                    <label className="block">
                        <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                            Search by
                        </span>
                        <input type="email" name="email" className=" px-3 py-3 bg-[#C9DDE2] border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Name or Number" />
                    </label>


                </div>

                <div className="w-2/4  flex justify-evenly items-center ">
                    <div className="flex flex-row justify-between w-11/12  max-md:hidden">
                        <label className="block">
                            <span className=" block text-sm font-medium text-slate-700">
                                Type
                            </span>
                            <MultiSelectDropdown formFieldName={"countries"} options={COUNTRIES} />
                        </label>

                        <label className="block">
                            <span className=" block text-sm font-medium text-slate-700">
                                Gender
                            </span>
                            <MultiSelectDropdown formFieldName={"countries"} options={COUNTRIES} />
                        </label>

                        <label className="block">
                            <span className=" block text-sm font-medium text-slate-700">
                                Stats
                            </span>
                            <MultiSelectDropdown formFieldName={"countries"} options={COUNTRIES} />
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
                    pokemons.map((pokemon, i) => {
                        return (
                            <div className=" flex justify-center items-center" key={i} >
                                {
                                    console.log(pokemon)
                                }
                                <Card pokemon={pokemon} />

                            </div>
                        );
                    })

                }

            </div>
        </>
    )
}